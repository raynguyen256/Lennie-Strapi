/**
 * Cloudinary Migration Script
 *
 * Uploads local Strapi media files to Cloudinary, matching by filename stem
 * (since local files and Neon DB records may have different hashes from separate
 * upload sessions). Updates DB records in-place so content references (IDs) work.
 *
 * Usage (run from inside backend/ directory):
 *
 *   DATABASE_URL="postgresql://..." \
 *   CLOUDINARY_NAME="dzxrn3zmk" \
 *   CLOUDINARY_KEY="947345543459211" \
 *   CLOUDINARY_SECRET="SsfltnH30-f-O5cRk3kPMMBhQUU" \
 *   node scripts/migrate-to-cloudinary.js
 *
 *   # Preview without writing:
 *   DRY_RUN=1 DATABASE_URL="..." ... node scripts/migrate-to-cloudinary.js
 */

const { Client } = require('pg');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────────────

const DATABASE_URL    = process.env.DATABASE_URL;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_KEY  = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');
const DRY_RUN = process.env.DRY_RUN === '1';

if (!DATABASE_URL || !CLOUDINARY_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
  console.error('Missing required env vars: DATABASE_URL, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});

// ─── Build local file index (stem → filepath) ────────────────────────────────
// Local files: "clinic_treatment_2f186cd564.png"
// Stem:        "clinic_treatment"   (everything before last underscore+hash)
// Also index format-prefixed files: "large_clinic_treatment_2f186cd564.png"
//   Format: "large", stem: "clinic_treatment"

const HASH_PATTERN = /^(.+?)_([0-9a-f]{10})(\.[^.]+)$/;
const FORMAT_PREFIXES = ['thumbnail', 'small', 'medium', 'large'];
const FORMAT_PREFIX_RE = new RegExp(`^(${FORMAT_PREFIXES.join('|')})_(.+)`);

function buildLocalIndex() {
  const originals = {};   // stem → absolute path
  const formats = {};     // `${formatName}::${stem}` → absolute path

  for (const filename of fs.readdirSync(UPLOADS_DIR)) {
    const m = filename.match(HASH_PATTERN);
    if (!m) continue;                      // .gitkeep, etc.
    const [, nameWithMaybePrefix, , ext] = m;

    const fmtMatch = nameWithMaybePrefix.match(FORMAT_PREFIX_RE);
    if (fmtMatch) {
      const [, fmtName, stem] = fmtMatch;
      const key = `${fmtName}::${stem}`;
      if (!formats[key]) formats[key] = path.join(UPLOADS_DIR, filename);
    } else {
      const stem = nameWithMaybePrefix;
      if (!originals[stem]) originals[stem] = path.join(UPLOADS_DIR, filename);
    }
  }
  return { originals, formats };
}

// Convert DB name "clinic-treatment.png" → stem "clinic_treatment"
function nameToStem(dbName) {
  return path.basename(dbName, path.extname(dbName)).replace(/-/g, '_');
}

// ─── Upload ───────────────────────────────────────────────────────────────────

async function upload(localPath, publicId) {
  return cloudinary.uploader.upload(localPath, {
    public_id: publicId,
    resource_type: 'auto',
    overwrite: true,
    invalidate: true,
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function migrate() {
  console.log('Building local file index…');
  const { originals, formats: localFormats } = buildLocalIndex();
  console.log(`  ${Object.keys(originals).length} original stems, ${Object.keys(localFormats).length} format variants\n`);

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  console.log('Connected to Neon Postgres');

  const { rows: files } = await client.query(`
    SELECT id, name, hash, ext, url, formats, provider, mime
    FROM files
    WHERE provider = 'local' OR url LIKE '/uploads/%'
    ORDER BY id
  `);
  console.log(`Found ${files.length} DB record(s) to migrate\n`);
  if (DRY_RUN) console.log('DRY_RUN mode — no DB writes\n');

  let success = 0, skipped = 0, errors = 0;

  for (const file of files) {
    const stem = nameToStem(file.name);
    const label = `[${file.id}] ${file.name} (stem: ${stem})`;
    const localPath = originals[stem];

    if (!localPath) {
      console.log(`SKIP ${label} — no local file found for stem "${stem}"`);
      skipped++;
      continue;
    }

    try {
      // 1. Upload original
      if (DRY_RUN) {
        console.log(`✓ ${label}\n  local src: ${localPath}\n  (DRY_RUN — skipping Cloudinary upload)`);
        success++;
        continue;
      }
      const result = await upload(localPath, file.hash);
      const newUrl = result.secure_url;
      const providerMeta = JSON.stringify({
        public_id: result.public_id,
        resource_type: result.resource_type,
      });

      // 2. Upload format variants
      let newFormats = null;
      if (file.formats) {
        const fmtObj = typeof file.formats === 'string'
          ? JSON.parse(file.formats)
          : file.formats;

        newFormats = {};
        for (const [sizeName, sizeData] of Object.entries(fmtObj)) {
          const fmtKey = `${sizeName}::${stem}`;
          const fmtPath = localFormats[fmtKey];
          const fmtPublicId = `${sizeName}_${file.hash}`;

          if (fmtPath) {
            const fmtResult = await upload(fmtPath, fmtPublicId);
            newFormats[sizeName] = {
              ...sizeData,
              url: fmtResult.secure_url,
              provider_metadata: {
                public_id: fmtResult.public_id,
                resource_type: fmtResult.resource_type,
              },
            };
          } else {
            // format file not found locally — keep structure but note it
            newFormats[sizeName] = { ...sizeData };
            console.log(`  WARN: format "${sizeName}" not found for stem "${stem}"`);
          }
        }
      }

      // 3. Write to DB
      if (!DRY_RUN) {
        await client.query(
          `UPDATE files
           SET url=$1, provider='cloudinary', provider_metadata=$2, formats=$3
           WHERE id=$4`,
          [newUrl, providerMeta, newFormats ? JSON.stringify(newFormats) : file.formats, file.id]
        );
      }

      console.log(`✓ ${label}`);
      console.log(`  local src:  ${localPath}`);
      console.log(`  cloudinary: ${newUrl}`);
      success++;
    } catch (err) {
      console.error(`✗ ${label} — ${err.message}`);
      errors++;
    }
  }

  await client.end();
  console.log('\n─────────────────────────────');
  console.log(`Done. ✓ ${success} migrated | ⊘ ${skipped} skipped | ✗ ${errors} errors`);
  if (DRY_RUN) console.log('(DRY_RUN — no changes written to DB)');
}

migrate().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
