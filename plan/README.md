# Lennie SkinLab — Planning Folder (Strapi + Next.js)

> Planning active cho hướng rebuild bằng headless CMS
> Cập nhật: 2026-06-11
> Stack active: `Strapi v5 (self-host, SQLite) + Next.js 16 (App Router) + Tailwind v4`

## Mục tiêu của folder này

- Chốt spec trước khi hoặc trong khi dev `Lennie-Strapi/backend` (Strapi) và `Lennie-Strapi/frontend` (Next.js)
- Gom toàn bộ decision quan trọng vào một chỗ
- Thay thế bộ planning cũ ở `04_wordpress/plan/` (đã archive, không còn active)

## Thứ tự đọc ưu tiên

1. `development-plan.md`
2. `implementation-backlog.md`
3. `input-checklist.md`
4. `template-map.md`
5. `theme-config.md`
6. `content-model.md`
7. `plugin-list.md`
8. `editor-theme-style-guide.md`
9. `qa-uat-checklist.md`

## Quy ước

- Mọi planning docs active tiếp theo đặt trong `Lennie-Strapi/plan/`
- Nếu thiếu thông tin, ghi rõ `[PLACEHOLDER - cần client cung cấp]`
- Design reference duy nhất: `Lennie-Strapi/Web Lennie Design/` — gồm:
  - `README.md` — hướng dẫn đọc handoff (từ Claude Design)
  - `chats/` — chat transcript thiết kế (chat1-4.md), đọc trước để hiểu design intent
  - `js/` — chrome.jsx, app-v2.jsx, app.jsx, sections-1/1b/2/3/4.jsx, lib.jsx, theme.js, data-pages.jsx, data-services.jsx, spa-router.jsx
  - `js/page-*.jsx` — JSX riêng từng trang con (page-about, page-services, page-service-detail, page-shop, page-product, page-blog, page-blog-post, page-booking, page-testimonials, page-contact) — dùng làm tham chiếu chính khi build các route trong `implementation-backlog.md` mục 4
  - `*.html`, `assets/`, `screenshots/`, `references/`, `uploads/` — HTML standalone + assets gốc
  - Chỉ dùng để map sang component/route/content model, không phải production source
- Bộ planning WordPress cũ ở `04_wordpress/plan/` không còn active, giữ lại làm tài liệu tham khảo lịch sử (content-model gốc là nguồn cho việc thiết kế Strapi schema)
- `lennie-skin-lab-instructions.md` và `AGENTS.md` ở root project mô tả stack WordPress cũ; bản cập nhật cho stack Strapi+Next.js nằm tại `Lennie-Strapi/lennie-skin-lab-instructions.md` và `Lennie-Strapi/AGENTS.md`
