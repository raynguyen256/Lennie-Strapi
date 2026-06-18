# Testing Deployment Log — Phương án 1 (Render + Neon Postgres + Cloudinary)

> **Status: ĐÃ HOÀN THÀNH** — Backend deployed lên Render, Cloudinary configured. Frontend (Vercel) chưa deploy.
> Last updated: 2026-06-19

---

## Kiến trúc tổng quan

```
[Next.js Frontend]          [Strapi Backend]          [External Services]
 Vercel (chưa deploy)  →   Render.com Free Tier   →   Neon.tech Postgres
                                                    →   Cloudinary (media)
```

| Layer | Service | Plan | Ghi chú |
|-------|---------|------|---------|
| Frontend | Vercel | Free Hobby | Chưa deploy, Next.js 16 App Router |
| Backend | Render.com | Free Web Service | Sleep sau 15 phút, cold start ~30-50s |
| Database | Neon.tech | Free Serverless | Không hết hạn, `sslmode=require` |
| Media | Cloudinary | Free (25GB) | Thay thế local filesystem (ephemeral trên Render) |

---

## Thông tin tài khoản & credentials

> ⚠️ File này ở trong git repo (private). Secrets thực (Neon password, Render secrets) lưu tại `~/Desktop/lennie-render.env` trên máy dev. Chỉ lưu thông tin công khai và tham chiếu ở đây.

### GitHub repo
- URL: https://github.com/raynguyen256/Lennie-Strapi (private)
- Default branch: `master` (đã đổi từ `main` — `main` branch rỗng, code ở `master`)
- Monorepo structure: `backend/` + `frontend/`

### Render.com
- Service type: Web Service
- Root Directory: `backend`
- Build command: `npm install` *(không chạy `npm run build` — build artifacts đã commit vào git)*
- Start command: `npm start`
- Region: Singapore (hoặc Oregon — kiểm tra trên dashboard)
- URL dạng: `https://<service-name>.onrender.com`

### Neon.tech
- Project: Lennie Strapi Staging
- Database: `neondb`
- User: `neondb_owner`
- Connection string format: `postgresql://neondb_owner:<password>@<host>.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Full connection string**: xem `~/Desktop/lennie-render.env` (file local, không commit)

### Cloudinary
- Cloud name: `dzxrn3zmk`
- API key: `947345543459211`
- API secret: `SsfltnH30-f-O5cRk3kPMMBhQUU`
- Free tier: 25GB storage, 25GB bandwidth/tháng
- Dashboard: https://cloudinary.com/console

---

## Env vars trên Render (đầy đủ)

Paste trực tiếp vào Render dashboard → Environment tab:

```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_URL=<xem ~/Desktop/lennie-render.env>
DATABASE_SSL=false
CORS_ORIGINS=http://localhost:3000
CLOUDINARY_NAME=dzxrn3zmk
CLOUDINARY_KEY=947345543459211
CLOUDINARY_SECRET=SsfltnH30-f-O5cRk3kPMMBhQUU
APP_KEYS=<xem ~/Desktop/lennie-render.env>
API_TOKEN_SALT=<xem ~/Desktop/lennie-render.env>
ADMIN_JWT_SECRET=<xem ~/Desktop/lennie-render.env>
TRANSFER_TOKEN_SALT=<xem ~/Desktop/lennie-render.env>
JWT_SECRET=<xem ~/Desktop/lennie-render.env>
ENCRYPTION_KEY=<xem ~/Desktop/lennie-render.env>
```

> Sau khi có Vercel URL, cập nhật: `CORS_ORIGINS=https://<vercel-app>.vercel.app,http://localhost:3000`

---

## Code changes đã thực hiện

### 1. `backend/config/middlewares.js` — CORS env-driven
**Lý do:** Origin hardcode không hoạt động với Vercel domain động.

```js
module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGINS', ['http://localhost:3000']),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 2. `frontend/next.config.mjs` — `images.remotePatterns` động
**Lý do:** Hardcode `localhost:1337` vỡ khi Next.js chạy trên Vercel (hostname Render khác).

```js
const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", ""),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
      new URL("http://localhost:1337/uploads/**"),
    ],
  },
};

export default nextConfig;
```

### 3. `backend/config/plugins.js` — Cloudinary upload provider
**Lý do:** Render free tier có ephemeral filesystem → file upload mất sau mỗi lần restart/sleep.

```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

### 4. `backend/.gitignore` — bỏ exclude thư mục `build/`
**Lý do:** Render free tier (512MB RAM) bị OOM kill khi chạy `strapi build`. Giải pháp: build locally trên Mac, commit `build/` vào git.

```gitignore
# build — commented out so pre-built admin panel can be committed for Render deployment
# build
```

### 5. `backend/package.json` — thêm `pg` driver
**Lý do:** Strapi không bundle sẵn driver Postgres, phải cài thủ công.

```bash
npm install pg --save
```

### 6. `backend/.env.example` — document env vars cho production

```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=<base64>,<base64>,<base64>,<base64>
API_TOKEN_SALT=<base64>
ADMIN_JWT_SECRET=<base64>
TRANSFER_TOKEN_SALT=<base64>
JWT_SECRET=<base64>
ENCRYPTION_KEY=<base64>
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
DATABASE_SSL=false
CORS_ORIGINS=https://<vercel-app>.vercel.app,http://localhost:3000
CLOUDINARY_NAME=<cloud_name>
CLOUDINARY_KEY=<api_key>
CLOUDINARY_SECRET=<api_secret>
```

### 7. `frontend/.env.example` — tạo mới

```
NEXT_PUBLIC_STRAPI_URL=https://<render-app>.onrender.com
```

### 8. `frontend/.gitignore` — allow commit `.env.example`
**Lý do:** `.env*` pattern trong gitignore block cả `.env.example`.

```gitignore
.env*
!.env.example   ← thêm dòng này
```

---

## Git commit history (theo thứ tự thực hiện)

| Commit | Nội dung |
|--------|----------|
| `fad64ae` | Pre-build Strapi admin panel để tránh OOM trên Render |
| `1238edc` | Thêm `pg` driver cho PostgreSQL |
| `e9799d7` | Rebuild admin sau khi thêm pg |
| `1e6ec63` | CORS env-driven + dynamic remotePatterns + pg driver + .env.example |
| `84db43b` | Thêm Cloudinary upload provider |
| `9566dc9` | Rebuild admin panel với Cloudinary provider |

---

## Lỗi gặp phải và cách fix

### Lỗi 1: Render "Exited with status 1" (deploy đầu tiên)
- **Nguyên nhân:** Thiếu `pg` package — Strapi dùng Postgres nhưng không có driver
- **Fix:** `npm install pg --save` trong `backend/`, commit `package.json` + `package-lock.json`

### Lỗi 2: Render "Exited with status 134 while building"
- **Nguyên nhân:** OOM kill — `strapi build` cần ~700MB RAM, Render free chỉ có 512MB
- **Fix:**
  1. Bỏ comment `build` trong `backend/.gitignore`
  2. Build locally: `NODE_ENV=production npm run build` trong `backend/`
  3. Commit thư mục `backend/build/` vào git
  4. Đổi Render build command thành `npm install` (không có `npm run build`)

### Lỗi 3: `git add backend/build` báo "pathspec did not match"
- **Nguyên nhân:** Chạy lệnh từ bên trong thư mục `backend/` thay vì từ root repo
- **Fix:** Chạy từ root repo: `git add backend/build`

### Lỗi 4: Render "Exited with status 1" (sau khi fix OOM)
- **Nguyên nhân:** Vẫn thiếu `pg` — build artifacts từ trước khi thêm pg
- **Fix:** Rebuild admin panel sau khi `npm install pg`

### Lỗi 5: GitHub default branch là `main` (rỗng)
- **Nguyên nhân:** Code đang ở `master`, GitHub default branch là `main` — Render kéo nhầm branch
- **Fix:** GitHub repo Settings → Branches → đổi default branch sang `master`

### Lỗi 6: Media Library hiển thị 62 ảnh bị broken (checkerboard)
- **Nguyên nhân:** Render ephemeral filesystem — file trong `public/uploads/` mất sau mỗi restart/sleep. Database (Neon) vẫn có records nhưng file vật lý không còn
- **Fix:** Cài Cloudinary provider (xem code change #3 ở trên). Sau khi cấu hình, cần:
  1. Xóa hết 62 record broken trong Media Library
  2. Upload lại file ảnh → lưu lên Cloudinary vĩnh viễn

---

## Quy trình redeploy (cho lần sau)

Khi có code change cần deploy lên Render:

```bash
# 1. Vào thư mục backend
cd backend

# 2. Build admin panel locally (bắt buộc — Render không đủ RAM)
NODE_ENV=production npm run build

# 3. Commit tất cả thay đổi bao gồm build/
cd ..
git add backend/
git commit -m "chore: rebuild + <mô tả thay đổi>"
git push origin master

# → Render tự động redeploy sau khi push
```

> **Lưu ý:** Nếu chỉ thay đổi frontend hoặc content type schema (không đụng code admin), không cần rebuild. Chỉ rebuild khi thêm plugin hoặc thay đổi liên quan đến Strapi admin panel.

---

## Việc còn lại (TODO)

- [ ] **Deploy frontend lên Vercel**
  1. Import repo `raynguyen256/Lennie-Strapi` vào Vercel
  2. Root Directory: `frontend`
  3. Set env var: `NEXT_PUBLIC_STRAPI_URL=https://<render-service>.onrender.com`
  4. Deploy → lấy URL Vercel

- [ ] **Cập nhật CORS_ORIGINS trên Render** sau khi có Vercel URL:
  `CORS_ORIGINS=https://<vercel-app>.vercel.app,http://localhost:3000`

- [ ] **Upload lại 62 ảnh** vào Strapi Media Library (xóa records cũ → upload mới → Cloudinary lưu)

- [ ] **Verify Cloudinary hoạt động**: upload 1 ảnh test → vào Cloudinary dashboard kiểm tra ảnh xuất hiện

---

## Lộ trình tương lai

Khi cần staging ổn định để demo (không cold-start):
- Chuyển backend sang VPS nhỏ (~100-150k/tháng: Contabo, Vietnix, hoặc Oracle E2.1.Micro)
- Chạy Strapi trong Docker + Caddy reverse proxy (xem `plan/oracle-free-tier-deployment-plan.md`)
- Frontend vẫn giữ Vercel free — Vercel xử lý Next.js SSR tốt hơn tự host
