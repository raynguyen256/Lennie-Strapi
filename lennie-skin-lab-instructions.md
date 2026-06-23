# 🧴 Lennie Skin Lab — Project Instructions (Strapi + Next.js)

> Bản adapt từ `lennie-skin-lab-instructions.md` ở root project, cập nhật cho stack Strapi (self-hosted) + Next.js
> Cập nhật: 2026-06-11

## Project Overview

**Project:** Rebuild website Lennie Skin Lab
**CMS:** Strapi (self-hosted, headless) + Next.js (App Router) làm frontend
**Business type:** Skincare clinic kết hợp bán sản phẩm
**Goals:** Brand awareness + Lead capture + Product catalog + Portfolio dịch vụ + Content SEO blog

---

## Stack Decision (Updated 2026-06-11)

### Current stack direction

- **Backend:** `Strapi v5.48.0`, self-hosted (`--skip-cloud`), SQLite cho dev (path nâng cấp Postgres cho production)
- **Frontend:** `Next.js 16.2.9` (App Router, JS, Turbopack), `React 19.2.4`, `Tailwind CSS v4`
- **Lead capture (2026-06-23):** `ConsultForm`/`BookingModal` ghi vào Strapi (`contact-lead`) qua `frontend/src/app/api/leads/route.js`, song song vẫn mở Messenger với message soạn sẵn (dual-channel) — không còn chỉ là MVP Messenger-only
- **Shop / checkout (2026-06-23):** đơn từ `/checkout` ghi vào Strapi (`order`) qua `frontend/src/app/api/orders/route.js`; collection `product` vẫn catalog-first nhưng đơn hàng nay là bản ghi thật, không còn chỉ tồn tại trong localStorage
- **Booking tại cơ sở (2026-06-23):** `BookingForm` ghi vào Strapi (`booking`) qua `frontend/src/app/api/bookings/route.js`
- **Newsletter (2026-06-23):** form ở Footer ghi vào Strapi (`newsletter-subscriber`) qua `frontend/src/app/api/newsletter/route.js`
- **Ghi dữ liệu (write path):** không mở public `create` trên Strapi — Next.js Route Handlers giữ `STRAPI_API_TOKEN` (server-only) và proxy ghi sang Strapi; có rate-limit theo IP (in-memory, xem `frontend/src/lib/rateLimit.js`)
- **Thông báo nội bộ:** khi có order/booking/contact-lead/newsletter-subscriber mới, Strapi lifecycle `afterCreate` gọi `backend/src/utils/notify.js` để bắn tin qua Zalo OA / Messenger cho nhân viên — token/recipient cấu hình trong Strapi admin ở trang Single Type **Notification Setting** (`api::notification-setting.notification-setting`), không qua env var. Nếu chưa cấu hình, notify tự động no-op, không ảnh hưởng việc tạo bản ghi.

> ⚠️ Ràng buộc cứng: **Strapi phải self-host được**. Không dùng Strapi Cloud, không phụ thuộc tính năng chỉ-cloud.

### Architectural rule

Implementation đi theo hướng:

- `Next.js` lo design system (`globals.css`), components, pages, routing, rich content rendering
- `Strapi` lo content-type schema, content storage, media library, API, quyền truy cập (Users & Permissions)
- API client (`frontend/src/lib/strapi.js`) là lớp trung gian duy nhất giữa Next.js và Strapi
- Không dùng visual builder làm stack active

### Editing rule

Client non-tech **không** nên sửa code Next.js hay schema Strapi.

Client nên sửa (qua Strapi Admin):

- dịch vụ (`service`)
- sản phẩm (`product`)
- bài blog (`blog-post`)
- feedback (`testimonial`)
- before / after (`skin-result`)
- FAQ (`faq`)
- team (`team-member`), partner brands (`partner-brand`)
- hotline, CTA links, địa chỉ/giờ mở cửa (`general-setting`, `contact-info`)
- founder summary (`founder`)
- homepage content (`homepage`)
- media (Strapi Media Library)

---

## Client Info

```text
Client name:      Lennie Skin Lab
Founder:          Thạc sĩ – Dược sĩ Hoàng Hồng Thắm
Năm thành lập:    2019
Website cũ:       [Chưa cung cấp]
Staging URL:      [Chưa có]
Production URL:   [Chưa có]
GA4 Property:     [Chưa có]
Kênh liên lạc:    Facebook cá nhân Founder, Fanpage Lennie Skinlab
```

---

## Brand Identity

### Định vị thương hiệu

**3 từ mô tả Lennie:** Thấu hiểu · Chữa lành · Tinh tế
**Giá trị cốt lõi:** Cá nhân hoá · Chuyên môn · Minh bạch · Bền vững

**Mô tả thương hiệu:**
Lennie SkinLab là thương hiệu chuyên sâu trong lĩnh vực chăm sóc và phục hồi làn da theo triết lý **cá nhân hóa**. Không áp dụng một routine hay phác đồ chung, mỗi làn da được đọc vị chuyên sâu và được xây dựng liệu trình riêng phù hợp từng cơ địa và thời điểm.

### USP

1. Cá nhân hóa chuyên sâu
2. Chuyên môn cao về hoạt chất & phục hồi
3. Theo dõi trực tiếp bởi Founder
4. Minh bạch & tối ưu chi phí
5. Mô hình theo dõi từ xa toàn cầu
6. 50+ brand dược mỹ phẩm đối tác

### Brand visual

| Yếu tố | Thông tin |
|---|---|
| Logo | Có — cần file gốc |
| Màu chính | `#5789B7`, `#87C1E9` (đã port vào `frontend/src/app/globals.css` làm `brand-blue`/`brand-teal`) |
| Màu phụ | `#FFFFFF` |
| Font production | Spectral + Plus Jakarta Sans (đã cấu hình trong `globals.css`) |
| Font accent | NVN Motherland Signature Regular |
| Tone cảm xúc | Professional · Trustworthy · Premium · Clean |

> Chưa nhận đủ brand guideline và logo source gốc.

---

## Target Audience

- Nữ 25–45, thu nhập cao, quan tâm da mụn và nám
- Nhóm trẻ: da mụn, dầu, phục hồi da tổn thương
- Nhóm trung niên: nám, lão hoá, chống nhăn
- Thị trường: Việt Nam + kiều bào quốc tế

---

## Business Model

### Dịch vụ

- Thiết kế routine skincare cá nhân hoá — **flagship**
- Theo dõi và tinh chỉnh xuyên suốt
- Điều trị tại cơ sở và tư vấn từ xa

> Giá và menu dịch vụ đầy đủ vẫn còn thiếu — quản lý qua collection `service` trong Strapi khi có data.

### Sản phẩm

- Sản phẩm nhập khẩu từ các brand đối tác
- Shop MVP đi theo hướng **catalog first** — collection `product` trong Strapi
- SKU đầy đủ chưa có

### Booking / lead capture

#### Hiện tại (từ 2026-06-23)

- `ConsultForm`/`BookingModal` thu thập tên, loại da, dịch vụ quan tâm, SĐT → ghi vào Strapi (`contact-lead`, có field `source` phân biệt contact-page/booking-modal) qua `/api/leads`, **đồng thời** vẫn build message → mở Messenger (dual-channel, không thay thế nhau)
- `BookingForm` (đặt lịch tại cơ sở) ghi vào Strapi (`booking`) qua `/api/bookings`, lưu snapshot service/branch + optional relation tới `service`/`branch` để truy vết
- `/checkout` ghi đơn vào Strapi (`order`) qua `/api/orders`, sinh mã đơn server-side
- Newsletter (Footer) ghi vào Strapi (`newsletter-subscriber`) qua `/api/newsletter`
- Tất cả 4 write-path trên đi qua Next.js Route Handler (giữ `STRAPI_API_TOKEN` server-only), **không** mở public `create` trên Strapi; có rate-limit theo IP
- Khi có bản ghi mới, Strapi lifecycle gọi `notify.js` bắn thông báo Zalo OA / Messenger cho nhân viên — cấu hình token tại trang admin **Notification Setting** (single type), chưa cấu hình thì no-op an toàn
- CTA sang Messenger / Zalo / Hotline (từ `general-setting`) vẫn giữ nguyên như kênh dự phòng

#### Phase sau

- Cân nhắc trang "tra cứu đơn hàng" công khai (hiện chưa có read-back cho khách)
- Khi đã có Zalo OA / FB Page thật, vào Strapi admin điền token vào **Notification Setting** để bật thông báo

---

## Website Architecture

```text
Home (/)
├── About (/about)
├── Services (/services)
│   ├── Service archive
│   └── Single service (/services/[slug])
├── Shop (/shop)
│   ├── Product archive
│   └── Single product (/shop/[slug])
├── Blog (/blog)
│   ├── Archive
│   └── Single post (/blog/[slug])
├── Booking (/booking)
├── Testimonials (/testimonials)
└── Contact (/contact)
```

Trạng thái hiện tại (2026-06-11): toàn bộ route trên đã build và smoke-QA xong (Home + About/Services/Shop/Blog/Booking/Testimonials/Contact, mục 4 trong `Lennie-Strapi/plan/implementation-backlog.md`). Còn lại: QA responsive/SEO/launch prep (mục 6) và chờ business input thật từ client (mục 1 — Input lock).

---

## Content Guidelines

### Tone of voice

- Chuyên nghiệp, tinh tế nhưng gần gũi
- Dùng "bạn"
- Nhấn mạnh cá nhân hóa và chuyên môn khoa học
- Không hứa hẹn kết quả tuyệt đối
- Không dùng ngôn ngữ kiểu "số 1", "rẻ nhất", "hàng đầu Việt Nam"

### Key messages

- Lennie đọc vị làn da trước khi đề xuất routine
- Không có routine chung cho tất cả
- Chăm da là hành trình dài
- Minh bạch về sản phẩm, chi phí, khả năng cải thiện

---

## Development Workflow

## Source of truth

Khi bắt đầu task mới trong `Lennie-Strapi/`, ưu tiên đọc:

1. `Lennie-Strapi/AGENTS.md`
2. `Lennie-Strapi/lennie-skin-lab-instructions.md` (file này)
3. `Lennie-Strapi/plan/development-plan.md`
4. `Lennie-Strapi/plan/implementation-backlog.md`
5. `Lennie-Strapi/plan/content-model.md`
6. `Lennie-Strapi/plan/template-map.md`
7. `00_brief/reference-sites.md`, `00_brief/client-questionnaire.md` (context business gốc, không đổi theo stack)

## Design reference

`Lennie-Strapi/Web Lennie Design/` là **reference duy nhất cho design** (component/page/layout), không phải production source:

- `README.md` — hướng dẫn coding agent đọc handoff (từ Claude Design)
- `chats/` — chat transcript thiết kế (chat1-4.md) — đọc để hiểu design intent, nơi user và design assistant đã chốt layout/copy
- `js/` — chrome.jsx, app-v2.jsx, app.jsx, sections-1/1b/2/3/4.jsx, lib.jsx, theme.js, data-pages.jsx, data-services.jsx, spa-router.jsx
- `js/page-*.jsx` — JSX riêng cho từng route backlog: page-about, page-services, page-service-detail, page-shop, page-product, page-blog, page-blog-post, page-booking, page-testimonials, page-contact
- `*.html`, `assets/`, `screenshots/`, `references/`, `uploads/`

Khi agent cần đối chiếu layout, section order, rhythm, copy blocks, product shelf, service card, blog card hoặc visual hierarchy, hãy đọc `chats/` trước để hiểu intent, sau đó đọc `js/page-*.jsx`/HTML tương ứng trước khi map sang component Next.js + content model Strapi. Khi build route mới ở Phase 3 (`/about`, `/services`, `/services/[slug]`, `/shop`, `/shop/[slug]`, `/blog`, `/blog/[slug]`, `/booking`, `/testimonials`, `/contact`), đọc trực tiếp `js/page-*.jsx` tương ứng.

## Build principles

1. Không hardcode nội dung quan trọng vào component nếu có thể đưa thành field Strapi
2. Client non-tech chỉ chỉnh nội dung qua Strapi Admin, không động vào component/schema code
3. Tách rõ:
   - design system (`globals.css`, component Next.js)
   - content schema (Strapi content-types/components/single-types)
   - structured content (collections trong Strapi)
   - editorial content (rich text: service body, blog body, FAQ answer)
4. Blog dùng rich text/blocks trong Strapi
5. Content-type/component schema nằm trong codebase, version control được (`backend/src/api`, `backend/src/components`)
6. Home, Booking và Contact phải có layout cố định — chỉ field nội dung thay đổi qua Strapi

## Phases

### Phase 1 — Backend foundation

- Tạo content-types/components/single-types theo `content-model.md`
- Cấu hình permissions, seed data mẫu khớp `data.js`

### Phase 2 — Frontend data layer

- `lib/strapi.js`, env config, `next.config` cho ảnh Strapi

### Phase 3 — Page build

- Các trang con: About, Services, Shop, Blog, Booking, Testimonials, Contact

### Phase 4 — Content wiring

- Chuyển home page + trang mới từ `data.js` sang Strapi API

### Phase 5 — QA + handoff

- Responsive review
- Content-editing safety (Strapi Admin)
- Lead form flow (Messenger/Zalo/Hotline)
- SEO baseline
- Self-host deployment checklist

---

## Output Rules

1. Mỗi task phải có output file/component cụ thể
2. Nếu thiếu thông tin, ghi rõ `[PLACEHOLDER - cần client cung cấp]`
3. Planning docs active: `Lennie-Strapi/plan/`
4. Frontend code: `Lennie-Strapi/frontend/src/`
5. Backend schema: `Lennie-Strapi/backend/src/api/`, `Lennie-Strapi/backend/src/components/`
6. `Lennie-Strapi/Web Lennie Design/` là design reference duy nhất (JSX handoff + `chats/` design intent), không phải production source
7. Bộ planning WordPress cũ ở `04_wordpress/plan/` không còn active — chỉ tham khảo lịch sử (đặc biệt content-model gốc)

---

## Folder Direction

```text
Lennie-Strapi/
├── AGENTS.md
├── lennie-skin-lab-instructions.md
├── plan/
│   ├── README.md
│   ├── development-plan.md
│   ├── implementation-backlog.md
│   ├── input-checklist.md
│   ├── template-map.md
│   ├── theme-config.md
│   ├── content-model.md
│   ├── plugin-list.md
│   ├── editor-theme-style-guide.md
│   └── qa-uat-checklist.md
├── backend/        # Strapi (self-hosted)
│   └── src/api/, src/components/
├── frontend/       # Next.js
│   ├── AGENTS.md, CLAUDE.md   # cảnh báo Next.js version riêng — không xoá
│   └── src/app/, src/components/, src/lib/
└── Web Lennie Design/   # design reference duy nhất (handoff từ Claude Design)
    ├── README.md, chats/   # hướng dẫn + chat transcript design intent
    ├── *.html, assets/, screenshots/, references/, uploads/
    └── js/             # chrome.jsx, sections-*.jsx, lib.jsx, theme.js, data-*.jsx, page-*.jsx (1 file/route backlog)
```

---

## Current Sprint / Active Tasks

- [x] Build home page (Next.js) đầy đủ theo design handoff
- [ ] Hoàn tất browser QA home page (Testimonials, About team carousel, Blog, ConsultSection, QuickFaqSection, Footer, modals)
- [x] Định nghĩa Strapi content types/components/single-types (`content-model.md`)
- [x] Tạo API client frontend (`lib/strapi.js`) và wiring home page sang Strapi
- [x] Build các trang con còn lại (About, Services, Shop, Blog, Booking, Testimonials, Contact) — xem mục 4 `implementation-backlog.md`
- [ ] QA responsive + SEO baseline cho các trang mới (mục 6 `implementation-backlog.md`)
- [ ] Input lock: chờ client cung cấp business info thật (mục 1 `implementation-backlog.md`)
- [ ] Self-host deployment checklist

---

## Archive Note

Snapshot docs cũ (WordPress) trước khi reset hướng triển khai được lưu tại:

- `04_wordpress/plan/`
- `06_review/archive-instructions/2026-06-10-builder-reset/`
