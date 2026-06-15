# Testing Deployment Plan — Phương án 1 (Vercel + Render Free + Neon Postgres)

> Status: ĐANG REVIEW — chưa thực hiện. Cần xác nhận trước khi code/deploy.

## Context

Cần một môi trường staging để test nhanh các thay đổi của Strapi backend + Next.js frontend trong quá trình dev, với chi phí thấp nhất (mục tiêu 0đ). Oracle free tier không còn dùng được. Phương án chọn:

- **Frontend (Next.js)** → **Vercel** (free Hobby plan) — mỗi push tự deploy + preview URL riêng cho branch/PR
- **Backend (Strapi)** → **Render.com Free Web Service** — free nhưng sleep sau ~15 phút không hoạt động (cold start ~30-50s)
- **Database** → **Neon.tech Free Postgres** (serverless, không hết hạn như free Postgres của Render) — thay cho SQLite dev hiện tại

**Lộ trình tương lai (ghi chú, không làm ngay):** Khi cần một URL staging ổn định để demo cho khách (không cold-start), chuyển backend sang VPS nhỏ (~100-150k/tháng, ví dụ Contabo/Vietnix) chạy Docker — frontend vẫn giữ Vercel free vì Vercel xử lý Next.js SSR tốt hơn tự host.

---

## Code changes trong repo

### 1. `backend/config/middlewares.js` — CORS env-driven

Hiện tại là array tĩnh dùng `strapi::cors` mặc định (chỉ check Host header, không cho phép origin khác như Vercel domain). Đổi thành function nhận `env`, custom config cho `strapi::cors`:

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

→ Sau này chỉ cần set env var `CORS_ORIGINS` trên Render (comma-separated), không cần sửa code khi đổi domain Vercel.

### 2. `frontend/next.config.mjs` — `images.remotePatterns` động theo `NEXT_PUBLIC_STRAPI_URL`

Hiện tại hardcode `http://localhost:1337/uploads/**`, sẽ vỡ khi deploy lên Render domain khác. Sửa thành đọc từ env var, vẫn giữ localhost cho dev:

```js
const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337");

/** @type {import('next').NextConfig} */
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

### 3. Tạo `backend/.env.example` — document đầy đủ env vars cần cho production

Liệt kê: `NODE_ENV`, `HOST`, `PORT`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, `DATABASE_CLIENT=postgres`, `DATABASE_URL` (Neon connection string), `DATABASE_SSL=true`, `CORS_ORIGINS`.

### 4. Tạo `frontend/.env.example`

`NEXT_PUBLIC_STRAPI_URL=https://<render-app>.onrender.com`

---

## Setup external accounts (không phải code, làm theo thứ tự khi thực thi)

1. **Neon.tech**: tạo project free → lấy connection string dạng `postgresql://user:pass@ep-xxxx.region.neon.tech/dbname?sslmode=require`
2. **Render.com**: tạo Web Service mới từ GitHub repo, **Root Directory = `backend`**
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Env vars: theo `.env.example` ở trên — **regenerate** các secret (`APP_KEYS`, `*_SALT`, `*_SECRET`, `ENCRYPTION_KEY`) bằng `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"`, KHÔNG copy y nguyên từ `.env` dev
   - `CORS_ORIGINS` tạm để placeholder, cập nhật sau khi có URL Vercel
3. **Vercel**: import repo, **Root Directory = `frontend`**
   - Env var: `NEXT_PUBLIC_STRAPI_URL=https://<ten-app>.onrender.com`
4. Quay lại Render, update `CORS_ORIGINS=https://<ten-app>.vercel.app,http://localhost:3000`, restart service

**Rủi ro cần lưu ý:** Render free tier có 512MB RAM — `strapi build` (build admin panel) có thể chạm giới hạn memory. Nếu build fail vì OOM, fallback: thêm `NODE_OPTIONS=--max-old-space-size=460` vào build command, hoặc dùng Railway ($5 trial credit) thay Render cho lần đầu test.

---

## Optional (khuyến nghị nhưng không bắt buộc): Persistent media uploads

Render free tier có ephemeral filesystem — file upload qua Strapi admin (`public/uploads`) sẽ **mất khi container restart/sleep**. Với site có nhiều ảnh sản phẩm, điều này gây khó test liên tục.

Giải pháp free: **Cloudinary free tier** + `@strapi/provider-upload-cloudinary`
- `npm install @strapi/provider-upload-cloudinary` trong `backend/`
- Thêm config vào `backend/config/plugins.js`:
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
      },
    },
  });
  ```
- Set 3 env vars tương ứng trên Render từ Cloudinary dashboard (free account)

Có thể bỏ qua bước này ban đầu nếu chỉ test layout/API nhanh, làm sau khi cần test nội dung media ổn định.

---

## Verification

1. Local: chạy `npm run build` ở cả `frontend/` và `backend/` để confirm 2 file config sửa không gây lỗi build
2. Sau deploy: mở URL Vercel → kiểm tra trang load, mở DevTools Console — không có lỗi CORS khi gọi `/api/...`
3. Kiểm tra ảnh từ Strapi (`/uploads/...`) hiển thị qua `next/image` đúng (test `remotePatterns` mới)
4. Đăng nhập Strapi admin trên URL Render (`https://<ten-app>.onrender.com/admin`), tạo/sửa 1 entry, kiểm tra hiển thị trên frontend
5. Test cold-start: đợi >15 phút không truy cập Render, gọi lại API, xác nhận vẫn hoạt động (chỉ chậm lần đầu)
