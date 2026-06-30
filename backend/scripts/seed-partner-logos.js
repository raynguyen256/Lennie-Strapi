/**
 * Partner Brand Logo Upload
 *
 * Uploads the 49 cropped/transparent partner-brand logos (extracted from the
 * client's "Logo nhãn hàng.png" sheet) and upserts api::partner-brand.partner-brand
 * entries: matches existing entries by name (case-insensitive), updates their
 * `logo`, creates any that don't exist yet, in the original sheet order.
 *
 * Idempotent — safe to re-run (re-uploads + re-attaches the logo each time).
 *
 * Usage (run from inside backend/, against whichever DB your .env points to —
 * local dev DB or production, so make sure NODE_ENV / .env are pointed at the
 * right place before running):
 *
 *   node scripts/seed-partner-logos.js
 *
 *   # Preview without writing:
 *   DRY_RUN=1 node scripts/seed-partner-logos.js
 */

const path = require('path');
const fs = require('fs');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const DRY_RUN = process.env.DRY_RUN === '1';
const LOGOS_DIR = path.join(__dirname, '..', '..', 'frontend', 'public', 'assets', 'partner-logos');

const MIME_TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

// slug (filename stem) -> display name, in original sheet order (row-major)
const BRANDS = [
  ['biologique-recherche', 'Biologique Recherche'],
  ['teoxane', 'Teoxane'],
  ['neova', 'Neova'],
  ['vi-derm', 'VI Derm Beauty'],
  ['image-skincare', 'Image Skincare'],
  ['simildiet', 'Simildiet Laboratorios'],
  ['ekseption', 'Ekseption'],
  ['christina', 'Christina'],
  ['comfort-zone', 'Comfort Zone'],
  ['decaar', 'Décaar'],
  ['celestetic', 'Celestetic'],
  ['swiss-line', 'Swiss Line'],
  ['ivatherm', 'Ivatherm'],
  ['zo-skin-health', 'ZO Skin Health'],
  ['biotrade', 'Biotrade Cosmeceuticals'],
  ['biojuve', 'BIOJUVE'],
  ['profiderm', 'ProfiDerm Professional'],
  ['nescens', 'Nescens'],
  ['clinicare', 'CliniCare'],
  ['hush-and-hush', 'Hush & Hush'],
  ['psa', 'PSA'],
  ['nanomd', 'NanoMD'],
  ['mona-frema', 'Mona Frema'],
  ['frezyderm', 'Frezyderm'],
  ['swissclinical', 'SwissClinical'],
  ['osmosis', 'Osmosis MD'],
  ['revision', 'Revision Skincare'],
  ['anteage', 'AnteAGE'],
  ['pressensa', 'Pressensa'],
  ['phasilab', 'Phasilab'],
  ['payot', 'Payot'],
  ['priori', 'Priori'],
  ['age-stop', 'A.G.E. Stop'],
  ['hydrinity', 'Hydrinity'],
  ['colorescience', 'Colorescience'],
  ['md-ceuticals', 'MD:Ceuticals'],
  ['femi', 'Femi Medical Dermatology'],
  ['orgahue', 'Orgahue'],
  ['postquam', 'postQuam Professional'],
  ['fetocell', 'FetoCell'],
  ['marcys', "Marcy's Monte Carlo"],
  ['valmont', 'Valmont'],
  ['neoderma', 'Neoderma'],
  ['verso', 'Verso'],
  ['inopharm', 'inoPharm Institute of Beauty'],
  ['theramid', 'Theramid'],
  ['chantelle', 'Chantelle Sydney'],
  ['juliette-armand', 'Juliette Armand'],
  ['larimide', 'Larimide'],
];

async function uploadAsset(strapi, slug) {
  const filePath = path.join(LOGOS_DIR, `${slug}.png`);
  if (!fs.existsSync(filePath)) {
    strapi.log.warn(`[partner-logos] file not found, skipping: ${filePath}`);
    return null;
  }
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimetype = MIME_TYPES[ext] || 'application/octet-stream';
  const fileData = {
    filepath: filePath,
    path: filePath,
    originalFilename: path.basename(filePath),
    name: path.basename(filePath),
    mimetype,
    type: mimetype,
    size: stats.size,
  };
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({ data: {}, files: fileData });
  return uploaded;
}

async function run() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  let created = 0, updated = 0, skipped = 0;

  for (let i = 0; i < BRANDS.length; i++) {
    const [slug, name] = BRANDS[i];
    const existing = await app.documents('api::partner-brand.partner-brand').findFirst({
      filters: { name: { $eqi: name } },
    });

    if (DRY_RUN) {
      console.log(`[dry-run] ${existing ? 'would update' : 'would create'} "${name}" <- ${slug}.png (order ${i})`);
      continue;
    }

    const logo = await uploadAsset(app, slug);
    if (!logo) {
      skipped++;
      continue;
    }

    if (existing) {
      await app.documents('api::partner-brand.partner-brand').update({
        documentId: existing.documentId,
        data: { logo: logo.id, order: i },
        status: 'published',
      });
      console.log(`✓ updated  "${name}"`);
      updated++;
    } else {
      await app.documents('api::partner-brand.partner-brand').create({
        data: { name, logo: logo.id, order: i },
        status: 'published',
      });
      console.log(`✓ created  "${name}"`);
      created++;
    }
  }

  await app.destroy();
  console.log('\n─────────────────────────────');
  console.log(DRY_RUN ? `(DRY_RUN) ${BRANDS.length} brand(s) previewed` : `Done. ${created} created, ${updated} updated, ${skipped} skipped`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
