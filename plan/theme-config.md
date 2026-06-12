# Lennie SkinLab — Tech & Design Config (Strapi + Next.js)

> Cập nhật: 2026-06-11
> Status: **ACTIVE**
> Thay thế "Theme Configuration cho Block Theme" của bản WordPress

---

## 1. Base settings

| Setting | Giá trị |
|---|---|
| Ngôn ngữ nội dung | Tiếng Việt |
| Timezone | Asia/Ho_Chi_Minh |
| Routing | Next.js App Router (`src/app/`) |
| Trang chủ | `/` (`src/app/page.js`) |
| Blog | `/blog` (chưa tạo) |

---

## 2. Stack versions

### Backend (`Lennie-Strapi/backend/`)

- Strapi `5.48.0`, JavaScript template, `--skip-cloud` (self-hosted)
- DB: `better-sqlite3 12.8.0` (dev) — production: cân nhắc Postgres (xem `plugin-list.md`)
- Node: `>=20.0.0 <=24.x.x`

### Frontend (`Lennie-Strapi/frontend/`)

- Next.js `16.2.9` (App Router, JS, Turbopack)
- React `19.2.4` / React DOM `19.2.4`
- Tailwind CSS `v4` (`@tailwindcss/postcss`, `@theme inline` directive trong `globals.css`)

---

## 3. Layout system

### Widths

| Token | Giá trị |
|---|---|
| Content narrow | `720px` |
| Content default | `840px` |
| Content wide | `1200px` |
| Full bleed | `100%` |

### Breakpoints (Tailwind defaults + custom nếu cần)

| Device | Breakpoint |
|---|---|
| Desktop | `1280px+` |
| Laptop | `1024px` |
| Tablet | `768px` |
| Mobile | `480px` |

---

## 4. Design tokens — đã implement trong `frontend/src/app/globals.css`

> File `globals.css` là **source of truth**. Bảng dưới đây là tài liệu tham chiếu, không phải nơi định nghĩa.

### Colors

| Token | Hex | Tailwind class |
|---|---|---|
| brand-blue | `#5789B7` | `text-brand-blue`, `bg-brand-blue`, ... |
| brand-teal | `#87C1E9` | `text-brand-teal` |
| brand-blue-light | `#F0F6FC` | `bg-brand-blue-light` |
| mist | `#F4F9FD` | `bg-mist` |
| light-bg | `#EAF2FA` | `bg-light-bg` |
| teal-soft | `#EEF6FC` | `bg-teal-soft` |
| ink | `#2C4A6F` | `text-ink` |
| ink-2 | `#486A91` | `text-ink-2` |
| ink-3 | `#7EA6CE` | `text-ink-3` |
| divider | `#DCEAF5` | `border-divider` |

### Typography

| Role | Font | Ghi chú |
|---|---|---|
| Heading (H1/H2/H3) | Spectral | weight 300-600 tuỳ cấp |
| Body / label | Plus Jakarta Sans | weight 400-800 |

### Spacing / Radius / Shadow

- Spacing scale: xs(4px) → 4xl(96px), giữ theo chuẩn Tailwind + custom nếu cần khớp design handoff
- Radius: sm(6px) / md(12px) / lg(20px)
- Shadow soft: `0 20px 60px rgba(44, 74, 111, 0.08)`

### Animations (đã có trong `globals.css`)

- `kenburns`, `reveal` (x5 variants), `reveal-card`, `reveal-x-l`, `reveal-x-r`, `marquee`, `marquee-slow`, `flip-card`, `modal-fade`, `modal-pop`

---

## 5. Strapi schema strategy

- Content types định nghĩa bằng code trong `backend/src/api/<name>/content-types/<name>/schema.json` (qua Strapi Admin lúc dev, commit schema vào git)
- Components trong `backend/src/components/<category>/<name>.json`
- Single types tương tự content-types nhưng `kind: "singleType"`
- Permissions (Users & Permissions plugin) cấu hình qua Admin → Settings → Roles → Public, bật `find`/`findOne` cho từng content type cần public

---

## 6. Page editing model (Strapi Admin)

| Page | Editing model |
|---|---|
| Home | Single type `homepage` với field cố định (hero, statsBar, mantraCards, servicesSlides) — client sửa giá trị field, không thêm/xoá section |
| About | `founder` (field cố định) + collection `team-member` (thêm/xoá thành viên tự do) |
| Booking/Contact | Field cố định trong `general-setting`/`contact-info`, không có vùng tự do |
| Service/Blog single | `body` là rich text — editorial flexibility cao hơn |

---

## 7. Booking strategy (giữ nguyên MVP)

- Lead capture: `ConsultForm` (đã build) → mở Messenger với message soạn sẵn
- CTA dự phòng: Zalo, Hotline (từ `general-setting`)
- Chưa làm trong sprint này: booking theo khung giờ, calendar sync, thanh toán/đặt cọc online
