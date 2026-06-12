# Lennie SkinLab — Development Plan (Strapi + Next.js)

> Cập nhật: 2026-06-11
> Status: **ACTIVE**
> Hướng build: `Strapi v5 self-hosted (SQLite → Postgres) + Next.js 16 App Router + Tailwind v4`

---

## 1. Tóm tắt triển khai

Dự án tiếp tục đi theo hướng **rebuild mới hoàn toàn**, nay đổi sang stack headless. Ưu tiên giữ nguyên từ kế hoạch trước:

- marketing-first
- hybrid content (structured content qua Strapi + editorial qua rich text)
- single build sprint cho phần frontend hiện tại (home page đã xong, các trang con là backlog)
- shop MVP ở mức catalog
- booking MVP ở mức lead form (Messenger/Zalo/Hotline) + staff confirm

Mục tiêu của phase hiện tại: chuẩn hóa lại toàn bộ planning docs cho stack mới, định nghĩa Strapi content model khớp với UI đã build, rồi nối frontend (hiện đang dùng `data.js` tĩnh) vào Strapi API.

---

## 2. Quyết định đã chốt

### Stack

- **Backend:** Strapi v5.48.0, JavaScript, self-hosted (`--skip-cloud`), SQLite (`better-sqlite3`) cho dev — có path nâng cấp Postgres cho production
- **Frontend:** Next.js 16.2.9 (App Router, JS, Turbopack), React 19.2.4, Tailwind CSS v4 (`@theme inline`)
- Node engines: `>=20.0.0 <=24.x.x`

> ⚠️ Ràng buộc cứng: **Strapi phải self-host được** (VPS/Docker riêng). Không dùng Strapi Cloud, không phụ thuộc tính năng chỉ có trên cloud.

### Governance

- Dev/AI quản lý:
  - Next.js components, pages, layout, design system (`globals.css`, `src/components/`)
  - Strapi content-type/component/single-type schema (code trong `backend/src/api`, `backend/src/components`)
  - API client layer (`frontend/src/lib/strapi.js`)
- Client quản lý:
  - Toàn bộ nội dung qua **Strapi Admin**: services, products, testimonials, skin results, FAQ, blog posts, team members, partner brands
  - Single types: thông tin chung (hotline, CTA, social), contact info, homepage content, founder content
  - Media library (ảnh sản phẩm, dịch vụ, blog, team, before/after)

### MVP behavior

- Home, Booking, Contact: layout/component cố định, chỉ field nội dung lấy từ Strapi
- About: semi-flexible (founder + team lấy từ Strapi, bố cục cố định)
- Shop: archive (`/shop`) + single product (`/shop/[slug]`), chưa có checkout/giỏ hàng thật (cart hiện là UI demo)
- Booking: `ConsultForm` (đã build) — gửi thông tin qua Messenger, không cần backend booking riêng ở MVP

---

## 3. Tình trạng hiện tại (2026-06-11)

### Đã hoàn thành

- **Backend:** Strapi project scaffold tại `Lennie-Strapi/backend/` (`--skip-cloud`, SQLite) — chưa có content type nào
- **Frontend:**
  - Design tokens (màu, font, spacing, animation) đã port vào `frontend/src/app/globals.css`
  - `src/lib/icons.jsx`, `src/lib/hooks.js` (useReveal, useCountUp, useDragScroll), `src/lib/data.js` (data tĩnh cho home page)
  - Toàn bộ assets từ design handoff đã copy vào `frontend/public/assets/`
  - Shared chrome components: `Navbar`, `Footer`, `FloatingActions`, `CartToast`, `SectionHead`, `PartnerStrip`, `CTABand`, `StatStrip`, `PageHero`, `ConsultForm`, `ConsultSection`, `FaqAccordion`, `QuickFaqSection`, `BookingModal`, `QuizModal`
  - Home page section components: `Hero`, `StatsBar`, `ProductShelf`, `Services`, `PartnerMarquee`, `AboutUsHome`, `MantraSection`, `About`, `Testimonials`, `Blog`
  - `src/app/page.js` đã compose đầy đủ home page theo đúng thứ tự thiết kế (AppB pattern)
  - Preview/dev tooling: `.claude/launch.json` ở project root, dev server chạy được qua `npm run dev --prefix Lennie-Strapi/frontend`
- Bộ planning docs này (`Lennie-Strapi/plan/`) thay thế `04_wordpress/plan/`
- **Strapi backend**: collection types, components, single types, permissions và seed data đã hoàn tất (mục 2 `implementation-backlog.md`)
- **Frontend data layer**: `lib/strapi.js`, `.env.local`, `next.config.mjs` đã setup; home page đã chuyển sang fetch Strapi qua `home-content.js` (mục 3, 5 `implementation-backlog.md`)
- **Page build (Phase 3) hoàn tất**: `/about`, `/services` + `/services/[slug]`, `/shop` + `/shop/[slug]`, `/blog` + `/blog/[slug]`, `/booking`, `/testimonials`, `/contact` — đều fetch Strapi qua `lib/page-content.js`, fallback `data.js` khi rỗng/down, RichText cho body/description, đã smoke-QA qua browser (không lỗi console). Chi tiết xem mục 4 `implementation-backlog.md`. Trong quá trình build đã fix một bug populate trong `lib/strapi.js` (`SERVICE_POPULATE.relatedFaqs`) khiến `/services/[slug]` luôn 404

### Còn thiếu / backlog

- Mục 1 — Input lock: chờ client cung cấp business info thật (hotline/Zalo/Messenger/địa chỉ/giờ mở cửa, menu dịch vụ + giá, danh sách sản phẩm, founder/team proof, testimonials/before-after được phép public, logo gốc + brand guideline)
- Browser QA cho home page chưa hoàn tất 100% (Testimonials, About team carousel, Blog, ConsultSection, QuickFaqSection, Footer, modals chưa verify)
- Mục 6 — QA/launch prep: review responsive cho các trang mới, test fetch lỗi/loading khi Strapi down, test CTA Messenger/Zalo/Hotline, SEO baseline (heading/slug/metadata)
- Self-host deployment (Strapi + reverse proxy + DB) chưa setup

---

## 4. Việc user cần chuẩn bị

### Business inputs

- menu dịch vụ thật
- danh sách sản phẩm MVP (brand, tên, giá, ảnh, mô tả)
- founder/team proof (bio, ảnh, credentials)
- testimonials/before-after được phép public
- contact/business data (hotline, Zalo, Messenger, địa chỉ, giờ mở cửa, maps URL)
- brand assets (logo gốc, font nếu khác hiện tại)

### Cách nhập liệu

Khác với bản WordPress (file skeleton trong `02_content/`), nội dung structured ở stack này nhập trực tiếp qua **Strapi Admin** sau khi content types được tạo (xem `content-model.md`). Nếu chưa có content thật, seed data mẫu lấy từ `frontend/src/lib/data.js` để giữ UI hoạt động.

---

## 5. Việc agent cần làm

### Phase 1 — Backend foundation (Strapi)

- Tạo collection types, components, single types theo `content-model.md`
- Cấu hình Users & Permissions: bật `find`/`findOne` public cho các collection/single type cần hiển thị ra frontend
- Seed data mẫu khớp với `data.js` hiện tại để frontend chuyển sang API không bị "trống nội dung"

### Phase 2 — Frontend data layer

- Tạo `frontend/src/lib/strapi.js` (fetch wrapper, base URL từ `NEXT_PUBLIC_STRAPI_URL`)
- Cấu hình `next.config` cho phép load ảnh từ domain Strapi (media library)
- Định nghĩa pattern fetch: Server Components fetch trực tiếp, Client Components nhận data qua props

### Phase 3 — Page build (trang con còn lại)

- `/about`, `/services`, `/services/[slug]`, `/shop`, `/shop/[slug]`, `/blog`, `/blog/[slug]`, `/booking`, `/testimonials`, `/contact`
- Map từ design handoff (`data-pages.jsx`, `sections-2.jsx`, `sections-3.jsx`) sang component Next.js, tái dùng `PageHero`, `SectionHead`, `CTABand`, v.v.

### Phase 4 — Content wiring

- Thay từng import từ `data.js` bằng fetch Strapi tương ứng (giữ `data.js` làm fallback/seed reference, không xoá ngay)
- Đảm bảo ảnh, rich text, relation hiển thị đúng

### Phase 5 — QA/UAT

- Hoàn tất browser QA cho home page (phần còn thiếu ở mục 3)
- QA các trang mới theo `qa-uat-checklist.md`

### Phase 6 — Self-host deployment prep

- Checklist deploy Strapi self-host (DB, env, reverse proxy, build Next.js) — chi tiết ở `plugin-list.md`

---

## 6. Sprint flow khuyến nghị

1. **Strapi schema build** (content types, components, single types, permissions, seed) — ✅ done
2. **Frontend API layer** (lib/strapi.js, env config, image domain) — ✅ done
3. **Page build** (các trang con còn lại) — ✅ done (2026-06-11)
4. **Content wiring** (chuyển home page + trang mới sang dùng Strapi API) — ✅ done (page-content.js cho trang con, home-content.js cho home)
5. **QA + deploy prep** — ⏳ còn lại: browser QA home page 100%, QA responsive/SEO trang mới, self-host deploy checklist; song song chờ Mục 1 Input lock

---

## 7. Deliverables trong repo

- `Lennie-Strapi/plan/development-plan.md`
- `Lennie-Strapi/plan/implementation-backlog.md`
- `Lennie-Strapi/plan/input-checklist.md`
- `Lennie-Strapi/plan/template-map.md`
- `Lennie-Strapi/plan/theme-config.md`
- `Lennie-Strapi/plan/content-model.md`
- `Lennie-Strapi/plan/plugin-list.md`
- `Lennie-Strapi/plan/editor-theme-style-guide.md`
- `Lennie-Strapi/plan/qa-uat-checklist.md`
- `Lennie-Strapi/AGENTS.md`, `Lennie-Strapi/lennie-skin-lab-instructions.md`
- Strapi content-types/components/single-types code trong `Lennie-Strapi/backend/src/`
- API client trong `Lennie-Strapi/frontend/src/lib/strapi.js`

---

## 8. Acceptance baseline

- Docs active không còn mô tả stack WordPress/Gutenberg/WooCommerce/ACF như stack hiện hành
- Content model Strapi khớp 1-1 với data đang hiển thị trên home page
- Frontend chạy được với data từ Strapi (ít nhất home page)
- Backlog đủ chi tiết để agent/dev khác tiếp tục các trang con
- Có hướng dẫn rõ cho self-host deployment
