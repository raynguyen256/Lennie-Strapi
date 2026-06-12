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

### 2.1 Schema extension cho Phase 3 redo (2026-06-12)

- [x] `service-category`: thêm `icon` (string) — lucide icon name cho category chip + `DetailHero` badge
- [x] `service`: thêm `tagline`, `priceNote` (string), `flagship` (boolean), `forWhom`/`problems`/`includes`/`results` (json array string), `steps` (json array `{title, desc}`)
- [x] `product`: thêm `type` (string), `skinTypes` (json array string), `rating` (decimal), `reviews` (integer), `oldPrice` (string)
- [x] `blog-post`: thêm `author`, `readTime` (string), `featured` (boolean)
- [x] Collection type mới `branch` (`name`, `tag`, `address`, `note`, `phone`, `hours`, `draftAndPublish: false`) — theo pattern `service-category`, kèm controller/route/service boilerplate
- [x] `src/index.js`: thêm `'branch'` vào `COLLECTION_PERMISSIONS` (public find/findOne)
- [x] `src/seed.js` + `src/seed-data/*.js`: mở rộng seed — 30 services / 6 category (kèm field mới), 10 products (kèm `type`/`skinTypes`/`rating`/`reviews`/`oldPrice`), 6 blog posts (kèm `author`/`readTime`/`featured`), 3 branches; idempotent

---

## 3. Frontend data layer

- [x] Tạo `frontend/src/lib/strapi.js` (fetch wrapper, đọc `NEXT_PUBLIC_STRAPI_URL` từ env, helper `getStrapiMedia`, `fetchAPI`, và getter cho từng content type)
- [x] Tạo `frontend/.env.local` với `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`
- [x] Cấu hình `next.config.mjs` cho phép `next/image` load từ domain Strapi (`images.remotePatterns`)
- [x] Định nghĩa convention: page (server component) fetch data → truyền props xuống client components hiện có (Hero, ProductShelf, Services, ...) — áp dụng ở mục 5
- [x] Thêm `getBranches()` trong `strapi.js` (fetch collection `branch`, sort `name:asc`) — dùng cho `getBranchesContent()` trong `page-content.js`

---

## 4. Page build (trang con còn lại)

> **2026-06-12 — Redo toàn bộ mục 4** theo `Web Lennie Design/js/page-*.jsx` (xem `plan/README.md` —
> 2 folder handoff cũ `03_design_assets/design-handoff/web-lennie-2026-06-08` và `-2026-06-11` đã bị
> tham chiếu nhầm ở lần build trước, dẫn đến output lệch design). Mỗi route được rebuild
> section-by-section, các sub-component mới sống cạnh view trong `components/<route>/`. Component
> chrome mới dùng chung: `DetailHero.jsx`, `BranchesList.jsx` (mục 1.x/3 ở trên). Toàn bộ đã qua
> `eslint` + `next build` (11 routes compile OK) sau mỗi group, commit riêng trong `frontend/.git`.

- [x] `/about` (commit `eb0d934`) — founder + team + brand story + values + timeline. New:
  `components/about/AboutStory.jsx`, `AboutValues.jsx` (4 `brandValues`), `AboutFounder.jsx`
  (`founderTimeline`), `AboutTeam.jsx` (drag-scroll carousel). Compose: `PageHero` → `AboutStory` →
  `StatStrip` → `AboutValues` → `AboutFounder` → `AboutTeam` → `PartnerStrip` → `CTABand`. Dropped
  `MantraSection`/generic `About`/`ConsultSection` (không có trong design `/about`).
- [x] `/services` + `/services/[slug]` (commit `ecb1d0a`) — `getServicesArchive`/`getServiceDetail`
  surfaces field mới (`tagline`, `priceNote`, `flagship`, `forWhom`, `problems`, `steps`,
  `includes`, `results`, `category.icon`) + related services (cùng category). New:
  `components/services/ServicesIntro.jsx`, `ServicesApproach.jsx`, `ServiceCategoryFilters.jsx`,
  `ServiceRow.jsx`, `ServicesCatalog.jsx` (client filter+pagination), `ServiceForWhomProblems.jsx`,
  `ServiceSteps.jsx`, `ServiceIncludesResults.jsx`, `ServiceBookingSidebar.jsx`,
  `RelatedServices.jsx`. `/services` compose: `PageHero` → `ServicesIntro` → `ServicesApproach` →
  `ServicesCatalog` (category filter + `ServiceRow` list, paginated) → FAQ (`SectionHead`+
  `FaqAccordion`) → `ConsultSection` → `CTABand`. `/services/[slug]` compose: `DetailHero` (group
  badge+icon, tagline, duration) → body content + `ServiceForWhomProblems`/`ServiceSteps`/
  `ServiceIncludesResults` + `ServiceBookingSidebar` (sticky) → FAQ → `RelatedServices` →
  `ConsultSection` → `CTABand`.
- [x] `/shop` + `/shop/[slug]` (commit `4a2ede4`) — `mapProduct`/`getShopArchive`/`getProductDetail`
  surface `type`, `skinTypes`, `rating`, `reviews`, `oldPrice`. New:
  `components/shop/ShopFilters.jsx` (type/skinType/price-band sidebar + "phân tích da" CTA),
  `ShopSortBar.jsx`, `ShopProductCard.jsx` (rating stars + quick-view hover), `ShopCatalog.jsx`
  (client filter/sort/pagination), `ProductQuickViewModal.jsx`, `ShopPagination.jsx`,
  `ProductGallery.jsx`, `ProductRating.jsx`, `ProductQuantitySelector.jsx`, `ProductTabs.jsx`
  (Mô tả/Cách dùng/Thông tin), `ProductTrustBadges.jsx`. `/shop` compose: `PageHero` →
  `ShopFilters` + `ShopSortBar` + paginated `ShopProductCard` grid + `ProductQuickViewModal` →
  `PartnerStrip` → `ConsultSection`. `/shop/[slug]` compose: breadcrumb → `ProductGallery` + info
  column (`ProductRating`, giá/`oldPrice`, `ProductQuantitySelector`, add-to-cart + Messenger CTA,
  `ProductTrustBadges`) → `ProductTabs` → related products (4-up) → `CTABand`. Giữ `CartToast`.
- [x] `/blog` + `/blog/[slug]` (commit `ff7c8b0`) — `mapBlogPost`/`getBlogArchive`/`getBlogDetail`
  surface `author`, `readTime`, `featured`, category-aware `related` (`computeRelatedPosts`). New:
  `components/blog/BlogFeaturedCard.jsx` (spotlight bài `featured`), `BlogCategoryFilters.jsx`,
  `BlogCard.jsx`, `BlogList.jsx` (client category filter), `BlogExcerptLede.jsx`,
  `BlogAuthorShare.jsx`. `/blog` compose: `PageHero` → `BlogFeaturedCard` → `BlogList` → `CTABand`
  (custom copy, `secondaryHref="/services"`). `/blog/[slug]` compose: `DetailHero` (category badge,
  centered title, author/date/readTime meta) → `BlogExcerptLede` → `RichText` body → 
  `BlogAuthorShare` → related posts grid (`bg-brand-blue-light`) → `ConsultSection`. Dropped
  `ConsultSection` từ `/blog` (không có trong design).
- [x] `/booking`, `/testimonials`, `/contact` (commit `c46667a`) —
  - `/booking`: `getBookingContent` không đổi shape. New: `components/booking/BookingModes.jsx`
    (Mode 1 Messenger/Zalo, Mode 2 form/hotline), `BookingForm.jsx` (service/branch/date/`BOOK_SLOTS`
    time/name/phone/notes + success summary + reset). Compose: `PageHero` (copy mới) →
    `BookingModes` → giữ lưới chọn dịch vụ bước 1 (built-only, feed `BookingForm` qua
    `defaultService`) → `BookingForm` + `BranchesList` (từ `getBranchesContent()`) → `CTABand`
    (custom, `onOpenBooking` mở quiz). `Navbar active="contact"` (theo design's `PageShell
    active="contact"` cho `/booking`).
  - `/testimonials`: New: `components/testimonials/TestimonialsFeaturedQuote.jsx` (spotlight
    `reviews[1]`), `TrustChannels.jsx` (3 trust signal). Compose: `PageHero` (copy mới,
    `model-glow.png`) → `StatStrip` → `TestimonialsFeaturedQuote` → `SectionHead` + flip-card grid
    `sm:2 lg:4` (`h-[390px]`) + disclaimer → `TrustChannels` → `CTABand` (custom, thay
    `ConsultSection`).
  - `/contact`: `getContactContent` thêm `faqs` (via `getFaqsList()`). New:
    `components/contact/ContactQuickChannels.jsx` (Messenger/Zalo/Email 3-card). Compose: `PageHero`
    (copy mới, SLA 24-48h) → `ContactQuickChannels` → 2-col (`SectionHead` "Gửi lời nhắn" + trust
    signal + image card + giữ social Fb/Ig/Tk | `ConsultForm`) → `BranchesList` (`variant="light"`)
    + map-link card (giữ nguyên markup map cũ) → FAQ (`SectionHead`+`FaqAccordion`) → `CTABand`.

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
