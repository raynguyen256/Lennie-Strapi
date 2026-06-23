# Lennie SkinLab

Website marketing cho phòng khám da liễu Lennie SkinLab — stack headless CMS: **Strapi v5** (backend) + **Next.js 16 App Router** (frontend).

---

## Cấu trúc repo

```
Lennie-Strapi/
├── backend/        # Strapi v5 (API, content types, seed data)
├── frontend/       # Next.js 16 App Router
├── plan/           # Planning docs (content model, backlog, dev plan...)
└── Web Lennie Design/  # Design reference (JSX handoff, assets)
```

Mỗi thư mục `backend/` và `frontend/` là một git repo riêng.

---

## Stack

| Layer | Công nghệ |
|---|---|
| CMS / API | Strapi v5.48 · JavaScript · SQLite (dev) → Postgres (prod) |
| Frontend | Next.js 16.2.9 · App Router · React 19 · Tailwind CSS v4 |
| Node | `>=20.0.0 <=24.x.x` |

---

## Cài đặt

### 1. Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

Strapi chạy tại `http://localhost:1337`.  
Lần đầu khởi động: truy cập `http://localhost:1337/admin` để tạo tài khoản admin.  
Seed data mẫu chạy tự động khi server boot (idempotent — chỉ chạy 1 lần nếu chưa có data).

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại `http://localhost:3000`.

Tạo file `frontend/.env.local` nếu chưa có:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## Routes

| Route | Mô tả |
|---|---|
| `/` | Trang chủ |
| `/about` | Về chúng tôi (brand story, founder, team) |
| `/services` | Danh sách dịch vụ (filter theo category) |
| `/services/[slug]` | Chi tiết dịch vụ |
| `/shop` | Catalog sản phẩm (filter, sort, quick-view) |
| `/shop/[slug]` | Chi tiết sản phẩm |
| `/blog` | Blog da liễu (featured + category filter) |
| `/blog/[slug]` | Bài viết chi tiết |
| `/booking` | Đặt lịch (Messenger/Zalo + form trực tiếp) |
| `/testimonials` | Đánh giá khách hàng + before/after |
| `/contact` | Liên hệ + bản đồ + FAQ |

---

## Content model (Strapi)

**Collection types** (client nhập qua Strapi Admin):

- `service`, `service-category` — dịch vụ điều trị (30 entries mẫu, 6 categories)
- `product`, `product-tag` — sản phẩm catalog (10 entries mẫu)
- `blog-post`, `faq`, `faq-category` — nội dung editorial
- `testimonial`, `skin-result`, `testimonial-topic` — đánh giá & kết quả
- `team-member`, `partner-brand` — về chúng tôi
- `branch` — hệ thống cơ sở (HCM / Hà Nội / Online)

**Single types**:

- `general-setting` — hotline, Zalo, Messenger, social links
- `contact-info` — địa chỉ, email, giờ mở cửa, maps URL
- `homepage` — nội dung trang chủ (hero, mantra, stats)
- `founder` — thông tin founder

Chi tiết field xem [`plan/content-model.md`](plan/content-model.md).

---

## Seed data

Seed chạy tự động khi Strapi boot lần đầu. Nguồn data nằm tại:

```
backend/src/seed.js
backend/src/seed-data/
  services.js     # 30 services / 6 categories
  products.js     # 10 sản phẩm
  blog-posts.js   # 6 bài viết
  branches.js     # 3 cơ sở
```

Để chạy lại seed từ đầu (khi cần load schema mới hoặc expanded data):

```bash
# 1. Dừng backend dev server
# 2. Xóa DB
rm backend/.tmp/data.db
# 3. Khởi động lại — seed chạy tự động
cd backend && npm run develop
# 4. Đăng ký lại admin account tại http://localhost:1337/admin
```

---

## Frontend data layer

- `frontend/src/lib/strapi.js` — fetch wrapper, helper `getStrapiMedia()`, getter cho từng content type
- `frontend/src/lib/page-content.js` — server-side getters cho từng route, fallback về `data.js` khi Strapi rỗng/down
- `frontend/src/lib/data.js` — static fallback data (cũng chứa UI-only constants: `productTypes`, `BOOK_SLOTS`, `brandValues`, `founderTimeline`...)

---

## Cấu trúc component

```
frontend/src/components/
├── chrome/         # Shared: Navbar, Footer, PageHero, DetailHero,
│                   #         SectionHead, CTABand, StatStrip, BranchesList...
├── home/           # Hero, StatsBar, ProductShelf, Services...
├── about/          # AboutStory, AboutValues, AboutFounder, AboutTeam
├── services/       # ServicesApproach, ServiceRow, ServicesCatalog...
├── shop/           # ShopFilters, ShopProductCard, ProductGallery...
├── blog/           # BlogFeaturedCard, BlogCategoryFilters...
├── booking/        # BookingModes, BookingForm
├── testimonials/   # TestimonialsFeaturedQuote, TrustChannels
└── contact/        # ContactQuickChannels
```

---

## Build production

```bash
cd frontend
npx next build
```

Tất cả 11 routes biên dịch thành công (8 static, 3 dynamic slug routes).

---

## Chạy bằng Docker Compose (local)

Yêu cầu: Docker Desktop hoặc Docker Engine + Compose plugin.

```bash
docker compose up -d --build
```

Service local:

- Frontend: `http://localhost:3000`
- Strapi: `http://localhost:1337`
- Strapi Admin: `http://localhost:1337/admin`

Compose dùng:

- `backend/.env` cho Strapi local SQLite
- volume `strapi_data` để persist SQLite DB
- volume `strapi_uploads` để persist media uploads

Các lệnh hay dùng:

```bash
docker compose logs -f
docker compose ps
docker compose down
```

Nếu muốn override URL public của Strapi khi build frontend image:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 docker compose up -d --build
```

---

## Placeholder content cần client xác nhận

Một số trường trong seed data dùng placeholder — cần client thay thế trước khi go-live:

- Địa chỉ chi nhánh Hà Nội (`[PLACEHOLDER - địa chỉ cụ thể]`)
- Ảnh team member (`/assets/team/placeholder-*.jpg`)
- Body một số bài blog (dùng excerpt làm nội dung tạm)
- Hotline / Zalo / Messenger URL thực tế (thay trong Strapi Admin → General Setting)

---

## Tài liệu thêm

- [`plan/development-plan.md`](plan/development-plan.md) — tổng quan kiến trúc & quyết định stack
- [`plan/implementation-backlog.md`](plan/implementation-backlog.md) — lịch sử build + trạng thái từng mục
- [`plan/content-model.md`](plan/content-model.md) — đặc tả đầy đủ content types & fields
- [`plan/input-checklist.md`](plan/input-checklist.md) — danh sách input cần client cung cấp
- [`plan/qa-uat-checklist.md`](plan/qa-uat-checklist.md) — checklist QA trước launch
