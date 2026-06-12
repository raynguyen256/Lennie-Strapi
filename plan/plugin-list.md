# Lennie SkinLab — Stack Components & Self-host Integrations

> Cập nhật: 2026-06-11
> Status: **ACTIVE**
> Thay thế "Danh sách Plugin" bản WordPress — Strapi/Next.js không dùng hệ plugin WordPress

---

## 1. Core stack

| # | Thành phần | Vai trò | Ghi chú |
|---|---|---|---|
| 1 | **Strapi v5 (self-hosted)** | Headless CMS / API | `--skip-cloud`, JS template |
| 2 | **SQLite (`better-sqlite3`)** | Database (dev) | Production: cân nhắc Postgres |
| 3 | **Next.js 16 (App Router)** | Frontend | Turbopack, React 19 |
| 4 | **Tailwind CSS v4** | Styling / design tokens | `globals.css` |

---

## 2. Custom code layer

| Thành phần | Vị trí | Vai trò |
|---|---|---|
| Content-types/components/single-types | `backend/src/api/`, `backend/src/components/` | Schema cho service, product, testimonial, skin-result, faq, blog-post, team-member, partner-brand, settings |
| API client | `frontend/src/lib/strapi.js` (cần tạo) | Fetch wrapper tới Strapi REST API |
| Data tĩnh / fallback | `frontend/src/lib/data.js` | Giữ tạm làm seed reference & fallback khi Strapi chưa có data |
| Hooks/icons | `frontend/src/lib/hooks.js`, `frontend/src/lib/icons.jsx` | Đã build, không đổi theo CMS |

---

## 3. Strapi plugins (built-in, không cần cài thêm cho MVP)

| Plugin | Vai trò |
|---|---|
| Users & Permissions | Bật public read API cho content types |
| Media Library | Upload provider local cho dev |
| Content Manager / Content-Type Builder | Quản lý schema qua Admin UI |

### Cân nhắc thêm (không bắt buộc MVP)

| Plugin | Khi nào cần |
|---|---|
| `@strapi/provider-upload-aws-s3` (hoặc S3-compatible: MinIO, Cloudflare R2, DigitalOcean Spaces) | Khi self-host production cần storage ảnh tách khỏi server, hoặc cần CDN |
| Email provider (SMTP) | Nếu sau này cần Strapi gửi email (vd thông báo lead form) — MVP dùng Messenger/Zalo nên chưa cần |
| i18n | Nếu cần đa ngôn ngữ — hiện chỉ tiếng Việt |

---

## 4. Lead capture MVP

- **Không cần plugin form riêng** — `ConsultForm` (đã build trong `frontend/src/components/chrome/ConsultForm.jsx`) build sẵn message và mở Messenger (`https://m.me/lennie.skinlab`)
- CTA dự phòng: Zalo, Hotline lấy từ `general-setting`

---

## 5. Self-host deployment checklist

| Hạng mục | Khuyến nghị |
|---|---|
| Hosting | VPS (vd Ubuntu) hoặc Docker Compose (1 container Strapi + 1 container Next.js + DB) |
| Reverse proxy | Caddy hoặc Nginx — TLS (Let's Encrypt), route `/admin` + `/api` → Strapi, route còn lại → Next.js |
| Process manager | `pm2` hoặc systemd (nếu không dùng Docker) cho cả Strapi và Next.js |
| Database | SQLite file cho traffic thấp; nâng cấp Postgres nếu cần concurrency tốt hơn |
| Backup | Backup file SQLite định kỳ (hoặc `pg_dump` nếu Postgres) + backup thư mục `public/uploads` (media) |
| Env/secrets | `.env` riêng cho từng môi trường, **không commit** secrets (APP_KEYS, JWT_SECRET, API tokens) |
| Build | `npm run build` cho cả backend (Strapi build admin) và frontend (Next.js production build) |
| Strapi Admin | Đặt sau auth/role chuẩn, có thể giới hạn IP truy cập `/admin` qua reverse proxy nếu cần thêm bảo mật |

---

## 6. Không dùng

| Tool | Lý do |
|---|---|
| Strapi Cloud | Ràng buộc cứng: phải self-host |
| Visual builder (Elementor, v.v.) | Không liên quan stack headless |
| Booking plugin phức tạp | MVP chỉ cần lead form + kênh liên hệ |
| WooCommerce | Thay bằng collection `product` trong Strapi (catalog-only ở MVP) |

---

## 7. Thứ tự setup khi bắt đầu dev backend

1. Tạo content-types/components/single-types theo `content-model.md` (qua Content-Type Builder hoặc code trực tiếp)
2. Cấu hình Users & Permissions (public `find`/`findOne`)
3. Seed data mẫu khớp `data.js`
4. Tạo `frontend/src/lib/strapi.js` + `.env.local`
5. Cấu hình `next.config` cho ảnh từ Strapi
6. Wiring từng page/component sang API
