# Lennie SkinLab — Implementation Backlog (Strapi + Next.js)

> Cập nhật: 2026-06-11
> Mục đích: checklist thực thi đủ chi tiết để dev/agent khác có thể bắt tay vào làm tiếp

---

## 0. Đã hoàn thành

- [x] Scaffold Strapi backend (`Lennie-Strapi/backend/`, `--skip-cloud`, SQLite)
- [x] Scaffold Next.js frontend (`Lennie-Strapi/frontend/`, App Router, Tailwind v4)
- [x] Port design tokens vào `frontend/src/app/globals.css`
- [x] Build `src/lib/icons.jsx`, `src/lib/hooks.js`, `src/lib/data.js`
- [x] Copy assets vào `frontend/public/assets/`
- [x] Build shared chrome components (Navbar, Footer, FloatingActions, CartToast, SectionHead, PartnerStrip, CTABand, StatStrip, PageHero, ConsultForm, ConsultSection, FaqAccordion, QuickFaqSection, BookingModal, QuizModal)
- [x] Build home page section components (Hero, StatsBar, ProductShelf, Services, PartnerMarquee, AboutUsHome, MantraSection, About, Testimonials, Blog)
- [x] Compose home page trong `src/app/page.js`
- [x] Setup `.claude/launch.json` cho preview dev server

---

## 1. Input lock

- [ ] Xác nhận logo source và bộ font final (hiện dùng Spectral + Plus Jakarta Sans)
- [ ] Xác nhận hotline, Zalo, Messenger, email nhận lead, địa chỉ, map URL, giờ mở cửa
- [ ] Chốt danh sách dịch vụ MVP (dùng để seed collection `service`)
- [ ] Chốt danh sách sản phẩm MVP cho catalog (seed collection `product`)
- [ ] Chốt founder bio, credentials, trust proof (single type `founder`)
- [ ] Chốt testimonial và before/after được phép public (seed `testimonial`, `skin-result`)
- [ ] Chốt nội dung team members (seed `team-member`)

---

## 2. Strapi backend foundation

- [x] Confirm cấu hình self-host: SQLite cho dev (`backend/.env` + `config/database.js`); ghi chú nâng cấp Postgres để sau khi cập nhật `plugin-list.md`
- [x] Tạo collection types: `service`, `product`, `testimonial`, `skin-result`, `faq`, `blog-post`, `team-member`, `partner-brand`
- [x] Tạo relation/category collection types: `service-category`, `skin-concern`, `result-type`, `testimonial-topic`, `faq-category`, `product-tag`
- [x] Tạo components: `shared.cta`, `shared.opening-hours`, `home.stat`, `home.mantra-card`, `home.service-slide`, `home.hero-slide`
- [x] Tạo single types: `general-setting`, `contact-info`, `homepage`, `founder`
- [x] Cấu hình Users & Permissions: bật `find`/`findOne` public cho mọi collection/single type ở mục trên (qua `src/index.js` bootstrap)
- [x] Seed data mẫu khớp `frontend/src/lib/data.js` (productData, servicesSlides, partnerBrands, mantraCards, teamData, reviewsData, faqs, servicesForBooking) qua `src/seed.js`, idempotent, kèm upload ảnh từ `frontend/public/assets/`

---

## 3. Frontend data layer

- [x] Tạo `frontend/src/lib/strapi.js` (fetch wrapper, đọc `NEXT_PUBLIC_STRAPI_URL` từ env, helper `getStrapiMedia`, `fetchAPI`, và getter cho từng content type)
- [x] Tạo `frontend/.env.local` với `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`
- [x] Cấu hình `next.config.mjs` cho phép `next/image` load từ domain Strapi (`images.remotePatterns`)
- [x] Định nghĩa convention: page (server component) fetch data → truyền props xuống client components hiện có (Hero, ProductShelf, Services, ...) — áp dụng ở mục 5

---

## 4. Page build (trang con còn lại)

- [x] `/about` — founder + team (dùng `PageHero`, `SectionHead`). Tạo `src/lib/page-content.js` (`getAboutContent`) + `app/about/page.js` (server) + `components/about/AboutView.jsx` (client). Tái dùng `About`, `MantraSection`, `PartnerStrip`, `ConsultSection` từ home. QA bằng screenshot: hero, founder bio, team carousel, mantra cards, partner strip, consult form, footer — không lỗi console.
- [x] `/services` (archive) + `/services/[slug]` (single). `getServicesArchive`/`getServiceDetail` trong `page-content.js` + `app/services/page.js` + `components/services/ServicesView.jsx` (grid dịch vụ + filter), `app/services/[slug]/page.js` + `components/services/ServiceDetailView.jsx` (hero, body RichText, info grid, FAQ accordion, sticky CTA card). **Fix quan trọng**: sửa `SERVICE_POPULATE.populate.relatedFaqs` trong `src/lib/strapi.js` từ `{ populate: { answer: true } }` → `true` — Strapi v5 reject deep-populate trên field Blocks, lỗi này khiến `getServiceBySlug` luôn trả `null` (404 toàn bộ trang chi tiết dịch vụ) trước khi fix. QA 2 dịch vụ, không lỗi console.
- [x] `/shop` (archive) + `/shop/[slug]` (single product). `getShopArchive`/`getProductDetail` + `app/shop/page.js` + `components/shop/ShopView.jsx` (filter theo tag, add-to-cart + `CartToast`), `app/shop/[slug]/page.js` + `components/shop/ProductDetailView.jsx` (ảnh, mô tả RichText, sản phẩm liên quan, add-to-cart). Thêm `slug` cho 4 sản phẩm fallback trong `lib/data.js` khớp `slugify()` của `backend/src/seed.js`. QA add-to-cart: badge giỏ hàng tăng đúng "1", không lỗi console.
- [x] `/blog` (archive) + `/blog/[slug]` (single post). `getBlogArchive`/`getBlogDetail` + `app/blog/page.js` + `components/blog/BlogView.jsx` (grid bài viết), `app/blog/[slug]/page.js` + `components/blog/BlogDetailView.jsx` (cover, body RichText, bài viết liên quan). QA 1 bài viết đầy đủ — hero, nội dung, related posts, consult form, không lỗi console.
- [x] `/booking` — dùng `ConsultForm`/`BookingModal` pattern, danh sách dịch vụ từ `service`. `getBookingContent` + `app/booking/page.js` + `components/booking/BookingView.jsx`: lưới chọn dịch vụ (click để chọn → khóa "Dịch vụ muốn đăng ký" trong `ConsultSection`), block hotline/địa chỉ/Messenger/Zalo nhanh. QA: chọn dịch vụ → label khóa đúng trong form, không lỗi console.
- [x] `/testimonials` — archive từ `testimonial`. `getTestimonialsArchive` + `app/testimonials/page.js` + `components/testimonials/TestimonialsView.jsx`: lưới flip-card (tái dùng class `.flip-card`/`.flip-inner`/`.flip-face`/`.flip-back` có sẵn trong `globals.css`, dùng lại style từ `home/Testimonials.jsx` nhưng dạng grid tĩnh thay vì marquee). QA hiển thị 4 review, không lỗi console.
- [x] `/contact` — từ `contact-info`. `getContactContent` + `app/contact/page.js` + `components/contact/ContactView.jsx`: thông tin địa chỉ/hotline/email/giờ mở cửa/social, thẻ "bản đồ" link ra Google Maps, `ConsultSection`. QA, không lỗi console.

---

## 5. Content wiring

- [x] Thay từng import từ `data.js` trong home page bằng fetch Strapi: `src/app/page.js` giờ là async server component gọi `getHomeContent()` (`src/lib/home-content.js`), truyền `content` xuống `HomeView` (client) → props cho `Hero`, `StatsBar`, `ProductShelf`, `Services`, `PartnerMarquee`, `MantraSection`, `About`, `Testimonials`, `QuickFaqSection`. `data.js` giữ nguyên làm fallback khi Strapi rỗng/down (xử lý trong `home-content.js`)
- [x] Đảm bảo ảnh Strapi media hiển thị đúng: `getStrapiMedia()` trả URL tuyệt đối từ Strapi, hiển thị qua thẻ `<img>` (theo convention hiện có của các component, không dùng `next/image`); `next.config.mjs` đã cấu hình `images.remotePatterns` sẵn nếu sau này chuyển sang `next/image`. Đã QA bằng screenshot: hero image, product images, service slide images, partner brands, mantra cards, founder portrait, team photos, testimonial photos đều load đúng từ `localhost:1337/uploads/...`
- [x] Đảm bảo rich text render đúng: FAQ answer (Strapi Blocks) → `blocksToText()` → hiển thị plain text trong `FaqAccordion`, đã QA trên trang chủ. Service body / blog post body / product description giờ render qua `RichText.jsx` (Blocks → heading/list/quote/code/paragraph) trên `/services/[slug]`, `/blog/[slug]`, `/shop/[slug]` — đã QA bằng screenshot, fallback về text/đoạn văn tĩnh khi field rỗng

---

## 6. QA và launch prep

- [ ] Hoàn tất browser QA home page: Testimonials, About (team carousel), Blog, ConsultSection, QuickFaqSection, Footer, QuizModal, BookingModal
- [ ] Review responsive tất cả trang mới
- [ ] Test fetch lỗi/loading state (Strapi down, content rỗng)
- [ ] Test CTA Messenger/Zalo/Hotline hoạt động đúng
- [ ] Review heading structure, slug, metadata (Next.js Metadata API) cho SEO baseline
- [ ] Chuẩn bị checklist self-host deploy (xem `plugin-list.md`)
