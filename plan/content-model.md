# Lennie SkinLab — Content Model cho Strapi

> Cập nhật: 2026-06-12
> Status: **ACTIVE**
> Thay thế nội dung tương ứng trong `04_wordpress/plan/content-model.md` (CPT/Taxonomy/ACF/Options → Strapi Collection Types/Components/Single Types)

---

## 1. Mục tiêu

Tạo lớp dữ liệu có cấu trúc trong Strapi để:

- Next.js fetch và render toàn bộ trang (home + các trang con) không hardcode nội dung
- Client (non-tech) chỉnh nội dung qua Strapi Admin mà không động vào code Next.js
- Content scale được cho service, product, social proof, blog và editorial

---

## 2. Phân loại content

### Structured content (Collection Types / Single Types)

- services, products, testimonials, skin results, FAQ, blog posts, team members, partner brands
- site-wide settings: hotline, social, founder, contact, homepage hero/sections

### Editorial content

- blog post body (rich text / Strapi Blocks)
- service body (rich text)

### System-managed content (không nằm trong Strapi)

- Next.js layout, navigation, design tokens
- component logic (quiz routine generator, animation hooks)

---

## 3. Collection Types

### `service`

- Mục đích: dịch vụ/treatment/package — tương đương CPT `service` cũ
- Fields:
  - `title` (string, required)
  - `slug` (uid, từ title)
  - `eyebrow` (string) — label nhỏ phía trên title (ví dụ "ROUTINE LÂM SÀNG CÁ NHÂN HÓA")
  - `intro` (text) — mô tả ngắn dùng cho card/slide
  - `body` (rich text / blocks) — nội dung chi tiết cho trang single
  - `heroImage` (media, single)
  - `outcomeSummary` (text)
  - `duration`, `format`, `followUp` (string) — labels hiển thị ở meta
  - `suitableFor` (text)
  - `primaryCta` (component `shared.cta`)
  - `secondaryCta` (component `shared.cta`)
  - `price` (string, optional — vd "750.000đ" hoặc "Tư vấn miễn phí", dùng cho `servicesForBooking`)
  - `category` (relation, many-to-one → `service-category`)
  - `skinConcerns` (relation, many-to-many → `skin-concern`)
  - `relatedResults` (relation, many-to-many → `skin-result`)
  - `relatedFaqs` (relation, many-to-many → `faq`)
  - `featuredOnHome` (boolean) — đánh dấu service xuất hiện trong slider `Services` ở home
  - `tagline` (string) — **mới (2026-06-12)**, subline cho hero `/services/[slug]`
  - `priceNote` (string) — **mới**, vd "/ buổi"
  - `flagship` (boolean, default false) — **mới**, đánh dấu dịch vụ chủ lực
  - `forWhom` (json — array string) — **mới**, "Dành cho ai"
  - `problems` (json — array string) — **mới**, vấn đề da giải quyết
  - `steps` (json — array `{title, desc}`) — **mới**, quy trình thực hiện
  - `includes` (json — array string) — **mới**, danh sách hạng mục đi kèm
  - `results` (json — array string) — **mới**, kết quả kỳ vọng

### `product`

- Mục đích: sản phẩm catalog (MVP) — **mới**, tương ứng `productData` trong `data.js`
- Fields:
  - `name` (string, required)
  - `slug` (uid)
  - `brand` (string) — vd "Hydrinity · USA"
  - `tag` (string) — vd "Phục hồi · Cấp nước"
  - `price` (string)
  - `image` (media, single)
  - `badge` (string, optional) — vd "Bán chạy", "Mới", "−15%"
  - `description` (rich text, optional — cho trang single product)
  - `tags` (relation, many-to-many → `product-tag`) — thay cho `cats` array (`#XEMTẤTCẢ`, `#BÁNCHẠY`, ...)
  - `status` (enumeration: `catalog`, `available`) — catalog-only vs có thể bán
  - `type` (string) — **mới (2026-06-12)**, vd "Serum", "Toner" (khớp filter `productTypes`)
  - `skinTypes` (json — array string) — **mới**, khớp filter `skinTypes`
  - `rating` (decimal) — **mới**, điểm đánh giá trung bình
  - `reviews` (integer) — **mới**, số lượt đánh giá
  - `oldPrice` (string, optional) — **mới**, giá gốc trước giảm

### `testimonial`

- Mục đích: social proof / review — tương đương CPT `testimonial` cũ, field theo `reviewsData`
- Fields:
  - `name` (string, required)
  - `caseType` (string) — vd "Phục hồi mụn mủ"
  - `stars` (integer, 1-5)
  - `quote` (text)
  - `photo` (media, single)
  - `improvement` (string)
  - `beforeState` (string)
  - `afterState` (string)
  - `duration` (string)
  - `expertNote` (text)
  - `featured` (boolean)
  - `sourceLabel`, `sourceUrl` (string, optional)
  - `relatedServices` (relation, many-to-many → `service`)
  - `topic` (relation, many-to-one → `testimonial-topic`)

### `skin-result`

- Mục đích: before/after, case study — tương đương CPT `skin_result` cũ
- Fields:
  - `title` (string)
  - `beforeImage`, `afterImage` (media, single)
  - `timeframe` (string)
  - `caseSummary` (text)
  - `treatmentSteps` (rich text hoặc component repeatable)
  - `disclaimer` (text)
  - `featured` (boolean)
  - `skinConcerns` (relation, many-to-many → `skin-concern`)
  - `resultType` (relation, many-to-one → `result-type`)
  - `relatedServices` (relation, many-to-many → `service`)

### `faq`

- Mục đích: FAQ tái sử dụng nhiều page — tương đương CPT `faq_item` cũ, field theo `faqs`
- Fields:
  - `question` (string, required) — `q`
  - `answer` (rich text) — `a`
  - `shortLabel` (string, optional)
  - `featured` (boolean)
  - `category` (relation, many-to-one → `faq-category`)
  - `relatedServices` (relation, many-to-many → `service`)

### `blog-post`

- Mục đích: bài viết blog — **mới**, cho component `Blog` và trang `/blog`
- Fields:
  - `title` (string, required)
  - `slug` (uid)
  - `excerpt` (text)
  - `body` (rich text / blocks)
  - `coverImage` (media, single)
  - `publishedDate` (date)
  - `category` (string hoặc relation đơn giản, optional cho MVP)
  - `author` (string) — **mới (2026-06-12)**
  - `readTime` (string) — **mới**, vd "5 phút đọc"
  - `featured` (boolean, default false) — **mới**, đánh dấu bài spotlight cho `/blog`

### `team-member`

- Mục đích: đội ngũ chuyên môn — **mới**, tương ứng `teamData` (component `About`)
- Fields:
  - `name` (string, required)
  - `role` (string)
  - `photo` (media, single)
  - `order` (integer) — thứ tự hiển thị trong carousel

### `partner-brand`

- Mục đích: logo/tên brand đối tác — **mới**, tương ứng `partnerBrands` (component `PartnerMarquee`/`PartnerStrip`)
- Fields:
  - `name` (string, required)
  - `logo` (media, single, optional — hiện tại UI hiển thị dạng text marquee, logo để dành cho sau)
  - `order` (integer)

---

## 4. Relation / Category Collection Types (thay Taxonomies)

Strapi không có taxonomy native — dùng collection type quan hệ many-to-many/many-to-one, tất cả có `name` (string) + `slug` (uid):

### `service-category`

- Phân nhóm dịch vụ (vd: routine cá nhân hóa, điều trị mụn, trẻ hóa)
- `icon` (string) — **mới (2026-06-12)**, tên icon trong `src/lib/icons.jsx` cho category chip + `DetailHero` badge

### `skin-concern`

- Dùng chung cho `service` và `skin-result` (vd: mụn, nám, lão hóa, nhạy cảm)
- Optional: field `parent` (relation tự tham chiếu) nếu cần phân cấp sau này

### `result-type`

- Phân loại case result (vd: phục hồi, sáng da, trẻ hóa)

### `testimonial-topic`

- Gắn ngữ cảnh cho testimonial (vd: phục hồi mụn, điều trị sắc tố)

### `faq-category`

- Nhóm FAQ theo page/chủ đề (vd: chung, dịch vụ, đặt lịch)

### `product-tag`

- Thay cho `cats` trong `productData` (vd: `#XEMTẤTCẢ`, `#BÁNCHẠY`, `#PHỤCHỒIDA`, `#CẤPẨMSÂU`)

> Ghi chú MVP: các collection type này có thể để **flat** (không phân cấp), giữ field `parent` optional để mở rộng sau nếu cần.

### `branch` — **mới (2026-06-12)**

- Mục đích: cơ sở/chi nhánh Lennie SkinLab, dùng cho `/booking` và `/contact` (`BranchesList`)
- `draftAndPublish: false` (giống `service-category` — danh sách tham chiếu nhỏ)
- Fields:
  - `name` (string, required)
  - `tag` (string) — vd "Trụ sở chính", "Chi nhánh", "Tư vấn online"
  - `address` (string)
  - `note` (string) — ghi chú thêm (vd `[PLACEHOLDER]` khi chưa có data thật)
  - `phone` (string)
  - `hours` (string) — giờ mở cửa
- Seed: 3 entries (HCM / Hà Nội / Online) từ `Web Lennie Design/js/data-pages.jsx` `branches`

---

## 5. Components (thay ACF field groups)

### `shared.cta`

- `label` (string)
- `url` (string)
- `style` (enumeration: `primary`, `secondary`, optional)

### `shared.opening-hours`

- `daysLabel` (string) — vd "Thứ 2 - Thứ 7"
- `hours` (string) — vd "9:00 - 19:00"

### `home.stat`

- Tương ứng item trong `StatsBar`/`StatStrip`
- `value` (integer hoặc string), `suffix` (string, vd "+", "%"), `label` (string)

### `home.mantra-card`

- Tương ứng `mantraCards`
- `title` (string), `description` (text), `icon` (string — tên icon trong `src/lib/icons.jsx`, vd "Activity", "Heart", "Globe", "Sparkles")

### `home.service-slide`

- Tương ứng item trong `servicesSlides` (slider của `Services`)
- `tag` (string), `title` (string), `description` (text), `image` (media, single)

### `home.hero-slide` (optional, cho `Hero`)

- `eyebrow`, `heading`, `description` (string/text)
- `image` (media, single)
- `cta` (component `shared.cta`)

---

## 6. Single Types (thay Options pages)

### `general-setting`

- `hotline` (string)
- `primaryCta`, `secondaryCta` (component `shared.cta`)
- `messengerUrl`, `zaloUrl`, `whatsappUrl` (string, optional)

### `contact-info`

- `address` (text)
- `mapsUrl` (string)
- `openingHours` (component `shared.opening-hours`, repeatable)
- `email` (string)
- `facebookUrl`, `instagramUrl`, `tiktokUrl` (string, optional)

### `homepage`

- Hero: `heroEyebrow`, `heroHeading`, `heroText` (string/text), `heroImage` (media), `heroSlides` (component `home.hero-slide`, repeatable, optional)
- `statsBar` (component `home.stat`, repeatable) — tương ứng mảng stats trong `StatsBar`
- `mantraCards` (component `home.mantra-card`, repeatable) — tương ứng `mantraCards`
- `servicesSlides` (component `home.service-slide`, repeatable) — tương ứng `servicesSlides`
- `partnerBrands` (relation, many-to-many → `partner-brand`) — hoặc lấy trực tiếp từ collection `partner-brand` không qua single type

### `founder`

- `name` (string)
- `credential` (string)
- `portrait` (media, single)
- `summary` (rich text)
- `trustPoints` (component, repeatable — tái dùng `home.mantra-card` hoặc tạo `shared.trust-point` nếu khác cấu trúc)
- `founderCta` (component `shared.cta`)

---

## 7. Mapping content → Next.js (tóm tắt)

Chi tiết đầy đủ ở `template-map.md`. Tóm tắt:

- **Native pages** (Home, About, Booking, Contact): bố cục component cố định trong Next.js, nội dung lấy từ single types (`homepage`, `founder`, `general-setting`, `contact-info`) + collection types liên quan
- **Service pages**: `/services` (archive từ `service`), `/services/[slug]` (single — hero/meta từ fields, body từ rich text, FAQ/related results từ relations)
- **Blog posts**: `/blog`, `/blog/[slug]` từ `blog-post`, ưu tiên editorial flexibility (rich text)
- **Shop**: `/shop`, `/shop/[slug]` từ `product`

---

## 8. Editing model

### Client nên sửa (qua Strapi Admin)

- `service`, `product`, `testimonial`, `skin-result`, `faq`, `blog-post`, `team-member`, `partner-brand`
- Single types: `general-setting`, `contact-info`, `homepage`, `founder`
- Media library

### Client không nên sửa

- Next.js components/pages/layout
- Design tokens (`globals.css`)
- API client / fetch logic (`lib/strapi.js`)
- Strapi content-type schema (chỉ Dev/AI thay đổi, qua code + migration)

---

## 9. Mapping `frontend/src/lib/data.js` → Strapi (giai đoạn chuyển đổi)

| Export trong `data.js` | Strapi content type | Ghi chú |
|---|---|---|
| `productData` | Collection `product` + `product-tag` | `cats` array → relation `tags` |
| `servicesSlides` | `homepage.servicesSlides` (component `home.service-slide`) | hoặc tách thành collection `service` với `featuredOnHome=true` nếu muốn quản lý qua collection |
| `partnerBrands` | Collection `partner-brand` | hiện chỉ cần field `name`, sắp theo `order` |
| `mantraCards` | `homepage.mantraCards` (component `home.mantra-card`) | `icon` giữ nguyên tên icon string |
| `teamData` | Collection `team-member` | `img` → `photo` media |
| `reviewsData` | Collection `testimonial` | field-by-field như mục 3 |
| `faqs` | Collection `faq` | `q` → `question`, `a` → `answer` |
| `servicesForBooking` | Collection `service` (subset có `price` set) | lọc theo field hoặc category trong `BookingModal` |
| `branches` | Collection `branch` | **mới (2026-06-12)** — dùng cho `/booking`, `/contact` |
| `quizQuestions`, `generateRoutine` | **Giữ nguyên trong frontend** | logic quiz tĩnh, không cần CMS quản lý ở MVP — có thể CMS hóa sau nếu cần đổi câu hỏi thường xuyên |

---

## 10. Default decisions cho implementer

- `faq` giữ là collection type riêng để tái sử dụng nhiều page (home QuickFaq, services, booking)
- `testimonial` và `skin-result` **chưa cần trang single public** ở MVP — dùng cho archive/section (`/testimonials`, phần before-after trong `/about` hoặc `/services/[slug]`)
- `service` body dùng rich text + ảnh, không mở thành page builder tự do
- Taxonomy-style collection types (`service-category`, `skin-concern`, ...) để **flat** ở MVP, không cần UI quản lý phân cấp phức tạp
- Ảnh: dùng Strapi Media Library (local provider cho dev); khi self-host production cân nhắc provider S3-compatible nếu cần (xem `plugin-list.md`)
