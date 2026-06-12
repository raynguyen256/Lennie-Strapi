## Lennie SkinLab — Working Instructions (Strapi + Next.js)

> Bản adapt từ `AGENTS.md` ở root project, cập nhật cho stack Strapi (self-hosted) + Next.js
> Cập nhật: 2026-06-11

## Primary Project Instruction

File chi tiết cần được xem là source of truth cho subproject này:

- `Lennie-Strapi/lennie-skin-lab-instructions.md`

---

## Stack Decision

### Active stack

- **Backend:** Strapi v5 (self-hosted, `--skip-cloud`), SQLite cho dev
- **Frontend:** Next.js 16 (App Router, JS), React 19, Tailwind CSS v4
- CSS/JS, design tokens nằm trong `frontend/src/app/globals.css`

### Working rule

- **Strapi phải self-host được — không dùng Strapi Cloud, không phụ thuộc tính năng chỉ-cloud**
- Dev/AI quản lý: Next.js components/pages/layout/design system, Strapi content-type/component/single-type schema (code), API client (`frontend/src/lib/strapi.js`)
- Client non-tech quản lý: nội dung structured + media qua **Strapi Admin** (xem `plan/content-model.md`)
- Dữ liệu site-wide (hotline, social, founder, contact, hero...) phải nằm trong Strapi single types, không hardcode trong component
- Không tạo lại stack WordPress/Gutenberg/WooCommerce/ACF — các tài liệu ở `04_wordpress/plan/` chỉ còn giá trị tham khảo lịch sử (đặc biệt content-model gốc dùng để thiết kế Strapi schema)

---

## What To Read First

Khi bắt đầu task mới trong `Lennie-Strapi/`, luôn đọc trước nếu có:

1. `Lennie-Strapi/lennie-skin-lab-instructions.md`
2. `Lennie-Strapi/plan/development-plan.md`
3. `Lennie-Strapi/plan/implementation-backlog.md`
4. `Lennie-Strapi/plan/content-model.md`
5. `Lennie-Strapi/plan/template-map.md`
6. `00_brief/reference-sites.md`, `00_brief/client-questionnaire.md` (context business, không đổi theo stack)
7. `Lennie-Strapi/Web Lennie Design/chats/` (design intent) và `js/` nếu task cần dựng hoặc đối chiếu layout/component — đặc biệt `page-*.jsx` (page-about, page-services, page-service-detail, page-shop, page-product, page-blog, page-blog-post, page-booking, page-testimonials, page-contact) khi build các route backlog

---

## Output Expectations

- Planning docs: `Lennie-Strapi/plan/`
- Frontend code: `Lennie-Strapi/frontend/src/` (components trong `components/chrome/` dùng chung, `components/home/` riêng trang chủ; data/hooks/icons trong `lib/`)
- Backend schema: `Lennie-Strapi/backend/src/api/`, `Lennie-Strapi/backend/src/components/`
- `Lennie-Strapi/Web Lennie Design/` (gồm `project/` + `chats/` + `README.md`) là design reference duy nhất, không phải production source
- Nếu thiếu thông tin, ghi `[PLACEHOLDER - cần client cung cấp]`

---

## Lưu ý kỹ thuật

- `Lennie-Strapi/frontend/AGENTS.md` và `CLAUDE.md` là file riêng cảnh báo về breaking changes của bản Next.js đang dùng — **không ghi đè/xoá**, đọc trước khi sửa code Next.js nếu gặp API lạ
- Preview/dev server chạy qua `.claude/launch.json` ở root project (`npm run dev --prefix Lennie-Strapi/frontend`)

---

## Archive

Bộ planning WordPress cũ (đã ngừng active) nằm tại:

- `04_wordpress/plan/`
- `06_review/archive-instructions/2026-06-10-builder-reset/`
