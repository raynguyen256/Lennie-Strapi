# Lennie SkinLab — Route / Content Map (Next.js + Strapi)

> Cập nhật: 2026-06-11
> Mục đích: map rõ route Next.js nào lấy data từ đâu trong Strapi, phần nào editable qua Admin
> Thay thế khái niệm "template WordPress" bằng "route + component Next.js"

---

## 1. Site-wide

| Khu vực | Component | Editable qua Strapi | Nguồn dữ liệu |
|---|---|---|---|
| Header/Nav | `src/components/chrome/Navbar.jsx` | Một phần | `general-setting` (CTA, hotline) |
| Footer | `src/components/chrome/Footer.jsx` | Một phần | `general-setting` + `contact-info` |
| Floating actions | `src/components/chrome/FloatingActions.jsx` | Một phần | `general-setting` (Zalo/Messenger/hotline) |
| 404 / not-found | `src/app/not-found.js` (chưa tạo) | Không | static |

---

## 2. Native pages (Home, About, Booking, Contact)

| Page | Route | Editable | Nguồn dữ liệu |
|---|---|---|---|
| Home | `/` (`src/app/page.js`) | Giới hạn — content qua Admin, layout cố định | `homepage` (hero, statsBar, mantraCards, servicesSlides, partnerBrands) + `service`/`product`/`testimonial`/`faq`/`blog-post` collections |
| About | `/about` (chưa tạo) | Một phần | `founder` + `team-member` collection |
| Booking | `/booking` (chưa tạo) | Giới hạn | `service` (subset có `price`) + `general-setting` (Messenger link) qua `ConsultForm` |
| Contact | `/contact` (chưa tạo) | Giới hạn | `contact-info` |

---

## 3. Content-driven routes

| Route | Hình thức | Editable | Nguồn dữ liệu |
|---|---|---|---|
| `/services` | archive | Không (list tự động) | Collection `service` |
| `/services/[slug]` | single | Có body | `service` (hero/meta từ fields, body rich text, `relatedResults`/`relatedFaqs` từ relations) |
| `/shop` | archive | Không | Collection `product` |
| `/shop/[slug]` | single | Có description | `product` |
| `/blog` | archive | Không | Collection `blog-post` |
| `/blog/[slug]` | single | Có body | `blog-post` (rich text/blocks) |
| `/testimonials` | archive | Không | Collection `testimonial` |

---

## 4. Locked vs editable

### Layout cố định (Dev/AI quản lý)

- Home, Booking, Contact: bố cục component Next.js cố định — client chỉ sửa **nội dung field**, không sửa cấu trúc
- Header, Footer, FloatingActions: cố định, chỉ data (CTA, contact info) lấy từ Strapi

### Vùng editable cho client (qua Strapi Admin)

- Tất cả nội dung trong các collection/single types liệt kê ở mục 2-3
- Rich text: `service.body`, `blog-post.body`, `faq.answer`
- Media: ảnh sản phẩm/dịch vụ/blog/team/testimonial/before-after

---

## 5. Default implementation choices

- MVP: fetch trực tiếp từ Strapi mỗi request (Server Components, `cache: "no-store"` hoặc `revalidate` ngắn) — chưa cần ISR/webhook revalidation phức tạp
- `testimonial`/`skin-result`: chưa có route single riêng ở MVP, hiển thị dạng archive/section
- `faq`: collection riêng, dùng lại ở nhiều nơi (`QuickFaqSection` trên home, có thể thêm ở `/services/[slug]` qua `relatedFaqs`)
- Ảnh từ Strapi media: cần whitelist domain trong `next.config` (`images.remotePatterns`)
