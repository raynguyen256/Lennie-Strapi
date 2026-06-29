# Strapi Admin Navbar UX Design

Ngày cập nhật: 2026-06-29

## Design Reference

Các file dưới đây là source of truth cho navbar enhancement:

- Design spec markdown: [plan/strapi-admin-navbar-ux-design-2026-06-29.md](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/plan/strapi-admin-navbar-ux-design-2026-06-29.md)
- Visual preview HTML: [plan/strapi-admin-navbar-ux-preview.html](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/plan/strapi-admin-navbar-ux-preview.html)
- Research nền tảng: [plan/strapi-admin-usability-research-2026-06-29.md](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/plan/strapi-admin-usability-research-2026-06-29.md)

## Tài liệu code liên quan

- Admin customization mẫu: [backend/src/admin/app.example.js](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin/app.example.js)
- Layout config bootstrap hiện có: [backend/src/admin-layouts.js](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin-layouts.js)
- Backend bootstrap hiện có: [backend/src/index.js](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/index.js)

## Mục tiêu

Thiết kế một navbar/admin workspace cho Strapi giúp admin non-tech của Lennie SkinLab:

- không phải mò trong `Content Manager`
- hiểu nội dung theo **khu vực tác động trên website** hoặc **nhóm công việc**
- nhìn nhanh bằng icon và tên thân thiện
- vẫn khả thi để dev trong Strapi v5 self-hosted

## Kết luận thiết kế

Vì Strapi admin sidebar là **menu phẳng**, không có nested submenu thật sự, giải pháp phù hợp nhất là:

1. Dùng **custom plugin pages** làm các **hub** trên sidebar.
2. Mỗi hub hiển thị **cards/launcher** cho các content type liên quan.
3. Mỗi card sẽ dẫn tới:
   - form edit của single type
   - list view của collection type
   - create view nếu cần
4. `Content Manager` vẫn tồn tại như fallback cho power user, nhưng non-tech editor đi theo hub UX mới.

Nói ngắn gọn: **đưa hết ra ngoài về mặt trải nghiệm điều hướng**, nhưng không cần rewrite toàn bộ CRUD engine.

## Constraint kỹ thuật cần chấp nhận

- Strapi v5 hỗ trợ `addMenuLink()` cho menu item phẳng.
- Không nên tạo 15-20 mục top-level riêng lẻ, sẽ rối hơn mặc định.
- Cách khả thi nhất là **8-9 hub top-level**, bên trong mỗi hub là các module con.
- Nên dùng icon có sẵn từ `@strapi/icons` để dev nhanh và đồng bộ với Strapi.

## Nguyên tắc UX

### 1. Phân loại theo nơi nội dung tác động

Thay vì phân loại theo technical model name, navbar nên đi theo câu hỏi editor hay nghĩ:

- Tôi đang sửa phần nào của website?
- Tôi đang xử lý loại việc gì?
- Nội dung này thuộc trang nào?

### 2. Tên menu phải là ngôn ngữ vận hành

Ưu tiên:

- `Trang chủ`
- `Dịch vụ`
- `Sản phẩm`
- `Khách hàng`

Không ưu tiên:

- `Homepage`
- `General Setting`
- `Collection Types`

### 3. Một hub = một mental model

Mỗi hub chỉ nên gom những thứ editor cảm thấy "cùng một chỗ".

Ví dụ:

- `Dịch vụ` phải gom service, category, concern, FAQ liên quan dịch vụ
- `Khách hàng & Đơn hàng` phải gom lead, booking, order, newsletter

### 4. Advanced data phải lùi xuống dưới

Taxonomy, tag, type, topic không nên chiếm vị trí ngang hàng với các màn hình chỉnh nội dung chính.

Chúng vẫn được đưa ra ngoài, nhưng nên nằm:

- ở cuối hub
- dưới heading `Thiết lập nâng cao`
- hoặc trong tab phụ `Danh mục`

## Inventory nội dung hiện có

### Single types

- `homepage`
- `general-setting`
- `contact-info`
- `founder`
- `notification-setting`

### Collection types nội dung chính

- `service`
- `product`
- `blog-post`
- `testimonial`
- `skin-result`
- `faq`
- `team-member`
- `partner-brand`
- `branch`

### Collection types vận hành

- `contact-lead`
- `booking`
- `order`
- `newsletter-subscriber`

### Collection types taxonomy/phụ trợ

- `service-category`
- `skin-concern`
- `product-tag`
- `testimonial-topic`
- `result-type`
- `faq-category`

## Navbar đề xuất

## Cấu trúc top-level được khuyến nghị

Đây là phương án mình khuyến nghị để vừa dễ dùng vừa dev được:

| Vị trí | Menu label | Icon `@strapi/icons` | Loại page | Mục tiêu |
|---|---|---|---|---|
| 1 | Tổng quan | `House` | Custom hub | Điểm vào đầu tiên, shortcut + số liệu nhanh |
| 2 | Trang chủ & Site | `Layout` | Custom hub | Các cấu hình tác động toàn website và trang chủ |
| 3 | Giới thiệu & Thương hiệu | `Crown` | Custom hub | Founder, đội ngũ, brand đối tác |
| 4 | Dịch vụ | `Stethoscope` | Custom hub | Toàn bộ nội dung về dịch vụ |
| 5 | Sản phẩm & Shop | `ShoppingCart` | Custom hub | Catalog sản phẩm và tag |
| 6 | Đánh giá & Kết quả | `Heart` | Custom hub | Testimonials và before/after |
| 7 | Blog & FAQ | `Book` | Custom hub | Bài viết và kiến thức hỗ trợ |
| 8 | Khách hàng & Đơn | `Bell` | Custom hub | Leads, booking, order, newsletter |
| 9 | Hệ thống | `Cog` | Custom hub | Notification setting và các cấu hình nội bộ |

## Vì sao không đưa mỗi model thành 1 menu item top-level

Nếu đưa toàn bộ model ra sidebar theo kiểu phẳng, admin sẽ phải nhìn khoảng 18-22 item, gồm cả taxonomy. Điều đó:

- khó scan
- khó training
- không còn lợi hơn `Content Manager`
- không hợp với giới hạn sidebar của Strapi

Vì vậy phương án UX đúng là:

- **sidebar = nhóm việc lớn**
- **hub page = launcher chi tiết**

## Thiết kế từng hub

## 1. Tổng quan

**Icon:** `House`

**Mục đích:**

- trang đầu cho admin non-tech
- hiển thị shortcut theo tác vụ thường dùng
- giảm việc phải nghĩ “mình nên vào đâu”

**Block trong page:**

1. `Chỉnh sửa nhanh`
   - Trang chủ
   - Thông tin liên hệ
   - CTA / hotline
   - Founder
2. `Xử lý hôm nay`
   - Lead mới
   - Booking mới
   - Order mới
   - Newsletter mới
3. `Kho nội dung`
   - Dịch vụ
   - Sản phẩm
   - Blog
   - Đánh giá

**Dev note:**

- page custom React
- card click sẽ deep-link sang các screen đúng của Content Manager hoặc plugin pages khác
- có thể thêm counters sau ở phase 2

## 2. Trang chủ & Site

**Icon:** `Layout`

**Phạm vi nội dung:**

- `homepage`
- `general-setting`
- `contact-info`
- `branch`

**Card layout đề xuất:**

### Chỉnh sửa chính

- `Trang chủ`
  - edit `homepage`
  - mô tả: hero, stats, services slider, mantra
- `CTA & Hotline`
  - edit `general-setting`
  - mô tả: hotline, Messenger, Zalo, CTA chính/phụ
- `Liên hệ`
  - edit `contact-info`
  - mô tả: địa chỉ, giờ mở cửa, social links
- `Cơ sở / chi nhánh`
  - list `branch`
  - mô tả: địa chỉ và thông tin từng cơ sở

### Thiết lập nâng cao

- `Giờ mở cửa`
  - có thể vẫn nằm trong `contact-info`, nhưng hiển thị như sub-card/anchor nếu muốn

**Lý do nhóm này hợp lý:**

Đây đều là những thứ tác động nhiều trang cùng lúc hoặc tác động trực tiếp landing page/site-wide.

## 3. Giới thiệu & Thương hiệu

**Icon:** `Crown`

**Phạm vi nội dung:**

- `founder`
- `team-member`
- `partner-brand`

**Card layout đề xuất:**

- `Founder`
  - edit `founder`
  - mô tả: chân dung, bio, trust points, CTA
- `Đội ngũ`
  - list `team-member`
  - mô tả: tên, vai trò, ảnh, thứ tự hiển thị
- `Brand đối tác`
  - list `partner-brand`
  - mô tả: logo, tên, thứ tự

**Ghi chú UX:**

Hub này nên được training như nhóm “nội dung giúp tăng tin tưởng”.

## 4. Dịch vụ

**Icon:** `Stethoscope`

**Phạm vi nội dung:**

- `service`
- `service-category`
- `skin-concern`
- `faq`

**Card layout đề xuất:**

### Nội dung chính

- `Danh sách dịch vụ`
  - list `service`
  - CTA phụ: `Tạo dịch vụ mới`
- `FAQ dịch vụ`
  - list `faq`
  - mô tả: câu hỏi hỗ trợ trang dịch vụ

### Thiết lập nâng cao

- `Nhóm dịch vụ`
  - list `service-category`
- `Vấn đề da`
  - list `skin-concern`

**Lý do nhóm này hợp lý:**

`service`, `service-category`, `skin-concern`, `faq` đang tạo thành một mạng nội dung rất rõ quanh service pages.

## 5. Sản phẩm & Shop

**Icon:** `ShoppingCart`

**Phạm vi nội dung:**

- `product`
- `product-tag`

**Card layout đề xuất:**

### Nội dung chính

- `Danh sách sản phẩm`
  - list `product`
  - CTA phụ: `Tạo sản phẩm mới`

### Thiết lập nâng cao

- `Tag sản phẩm`
  - list `product-tag`

**Optional phase 2:**

- thêm card shortcut `Sản phẩm nổi bật`
- thêm filter preset `Còn bán` / `Ẩn khỏi catalog`

## 6. Đánh giá & Kết quả

**Icon:** `Heart`

**Phạm vi nội dung:**

- `testimonial`
- `testimonial-topic`
- `skin-result`
- `result-type`

**Card layout đề xuất:**

### Nội dung chính

- `Khách hàng đánh giá`
  - list `testimonial`
- `Kết quả trước / sau`
  - list `skin-result`

### Thiết lập nâng cao

- `Chủ đề đánh giá`
  - list `testimonial-topic`
- `Loại kết quả`
  - list `result-type`

**Lý do nhóm này hợp lý:**

Đây đều là social proof, trust proof, transformation proof.

## 7. Blog & FAQ

**Icon:** `Book`

**Phạm vi nội dung:**

- `blog-post`
- `faq`
- `faq-category`

**Card layout đề xuất:**

### Nội dung chính

- `Bài viết blog`
  - list `blog-post`
  - CTA phụ: `Tạo bài mới`
- `FAQ tổng hợp`
  - list `faq`

### Thiết lập nâng cao

- `Nhóm FAQ`
  - list `faq-category`

**Lưu ý quan trọng:**

`faq` xuất hiện ở cả `Dịch vụ` và `Blog & FAQ`. Để tránh duplication gây rối:

- trong `Dịch vụ`, card nên đặt tên `FAQ dịch vụ`
- trong `Blog & FAQ`, card nên đặt tên `FAQ tổng hợp`

Nếu muốn triệt để hơn ở phase 2, có thể tạo filter preset theo category khi vào list view.

## 8. Khách hàng & Đơn

**Icon:** `Bell`

**Phạm vi nội dung:**

- `contact-lead`
- `booking`
- `order`
- `newsletter-subscriber`

**Card layout đề xuất:**

- `Leads tư vấn`
  - list `contact-lead`
- `Lịch hẹn`
  - list `booking`
- `Đơn hàng`
  - list `order`
- `Đăng ký newsletter`
  - list `newsletter-subscriber`

**Đây là hub cực quan trọng cho non-tech admin**, vì nó tương ứng với công việc vận hành hàng ngày thay vì content publishing.

**Phase 2 nên có thêm:**

- badge số bản ghi mới/chờ xử lý
- preset filter `Mới`
- action nhanh đổi `status`

## 9. Hệ thống

**Icon:** `Cog`

**Phạm vi nội dung:**

- `notification-setting`
- quick links tới khu vực hệ thống native của Strapi nếu cần

**Card layout đề xuất:**

- `Thông báo nội bộ`
  - edit `notification-setting`
  - mô tả: token Zalo OA, Messenger, bật/tắt notify
- `Media Library`
  - link tới plugin media native
- `Users & Permissions`
  - chỉ hiện cho admin role phù hợp

**Ghi chú UX:**

Hub này không dành cho editor thường xuyên, nên luôn đứng cuối.

## Bản đồ model -> hub

| Model | Hub đề xuất |
|---|---|
| `homepage` | Trang chủ & Site |
| `general-setting` | Trang chủ & Site |
| `contact-info` | Trang chủ & Site |
| `branch` | Trang chủ & Site |
| `founder` | Giới thiệu & Thương hiệu |
| `team-member` | Giới thiệu & Thương hiệu |
| `partner-brand` | Giới thiệu & Thương hiệu |
| `service` | Dịch vụ |
| `service-category` | Dịch vụ |
| `skin-concern` | Dịch vụ |
| `product` | Sản phẩm & Shop |
| `product-tag` | Sản phẩm & Shop |
| `testimonial` | Đánh giá & Kết quả |
| `testimonial-topic` | Đánh giá & Kết quả |
| `skin-result` | Đánh giá & Kết quả |
| `result-type` | Đánh giá & Kết quả |
| `blog-post` | Blog & FAQ |
| `faq` | Blog & FAQ hoặc Dịch vụ |
| `faq-category` | Blog & FAQ |
| `contact-lead` | Khách hàng & Đơn |
| `booking` | Khách hàng & Đơn |
| `order` | Khách hàng & Đơn |
| `newsletter-subscriber` | Khách hàng & Đơn |
| `notification-setting` | Hệ thống |

## Pattern UI cho từng hub page

Để dev đồng nhất, mọi hub page nên dùng cùng một pattern:

### Header

- title
- subtitle giải thích khu vực này chỉnh cái gì
- 1-2 quick actions nếu cần

### Section `Nội dung chính`

- card lớn
- mô tả ngắn
- CTA rõ: `Chỉnh sửa`, `Mở danh sách`, `Tạo mới`

### Section `Thiết lập nâng cao`

- card nhỏ hơn
- dành cho category/tag/topic/type

### Optional section `Gần đây`

- nội dung mới cập nhật gần đây
- chỉ nên làm ở phase sau

## Card spec đề xuất

Mỗi card nên có:

- icon
- title
- mô tả 1 dòng
- 1 CTA chính
- 1 CTA phụ nếu là collection

Ví dụ:

- `Danh sách dịch vụ`
  - mô tả: Quản lý toàn bộ dịch vụ, nội dung chi tiết và CTA
  - CTA chính: `Mở danh sách`
  - CTA phụ: `Tạo dịch vụ mới`

## Icon system đề xuất

Các icon dưới đây đều có sẵn trong `@strapi/icons`, phù hợp để dev nhanh:

| Mục | Icon |
|---|---|
| Tổng quan | `House` |
| Trang chủ & Site | `Layout` |
| Giới thiệu & Thương hiệu | `Crown` |
| Dịch vụ | `Stethoscope` |
| Sản phẩm & Shop | `ShoppingCart` |
| Đánh giá & Kết quả | `Heart` |
| Blog & FAQ | `Book` |
| Khách hàng & Đơn | `Bell` |
| Hệ thống | `Cog` |
| Media | `Images` |
| Danh mục/Tag | `Stack` hoặc `Hashtag` |
| Liên hệ | `Phone` hoặc `Mail` |
| Chi nhánh | `PinMap` |

## Phương án dev phù hợp với Strapi

## Kiến trúc được khuyến nghị

- 1 plugin admin nội bộ, ví dụ: `lennie-admin-workspace`
- plugin add các menu links top-level bằng `addMenuLink()`
- mỗi top-level link trỏ đến 1 custom React page
- custom page render card launcher
- card launcher deep-link đến:
  - single type edit view
  - collection list view
  - create entry view

## Development Plan

## Mục tiêu implementation

Build một lớp navigation/workspace mới trong Strapi admin để:

- editor non-tech không cần vào `Content Manager` để tìm model
- sidebar đi theo nhóm nghiệp vụ thay vì technical schema
- mỗi hub mở ra một trang launcher rõ ràng
- dashboard `Tổng quan` hiển thị số liệu và queue xử lý quan trọng
- vẫn tận dụng form/list CRUD gốc của Strapi ở phase đầu

## Nguyên tắc implementation

- Không patch `node_modules`
- Không fork hoặc override thô `Content Manager`
- Dùng `addMenuLink()` cho top-level hubs
- Dùng custom React page cho từng hub
- Deep-link về screen gốc của Strapi ở phase 1
- Giữ `Content Manager` như fallback cho admin kỹ thuật
- Song song tối ưu `backend/src/admin-layouts.js` để form edit/list view dễ dùng hơn

## Kiến trúc code đề xuất

Tạo plugin admin nội bộ mới trong backend:

- `backend/src/plugins/lennie-admin-workspace/`

Cấu trúc khuyến nghị:

- `backend/src/plugins/lennie-admin-workspace/strapi-admin.js`
- `backend/src/plugins/lennie-admin-workspace/admin/src/index.js`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pluginId.js`
- `backend/src/plugins/lennie-admin-workspace/admin/src/utils/routes.js`
- `backend/src/plugins/lennie-admin-workspace/admin/src/data/hubs.js`
- `backend/src/plugins/lennie-admin-workspace/admin/src/components/HubPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/components/LauncherCard.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/components/StatCard.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/components/QueueList.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/OverviewPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/SitePage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/BrandPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/ServicesPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/ShopPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/ProofPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/BlogPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/OpsPage.jsx`
- `backend/src/plugins/lennie-admin-workspace/admin/src/pages/SystemPage.jsx`

## Cách hoạt động của plugin

### Sidebar

Trong `register(app)` của plugin:

- gọi `app.addMenuLink()` 9 lần
- mỗi link tương ứng 1 hub
- dùng icon từ `@strapi/icons`
- đặt `position` để thứ tự sidebar ổn định

Top-level links:

1. `Tổng quan`
2. `Trang chủ & Site`
3. `Giới thiệu & Thương hiệu`
4. `Dịch vụ`
5. `Sản phẩm & Shop`
6. `Đánh giá & Kết quả`
7. `Blog & FAQ`
8. `Khách hàng & Đơn`
9. `Hệ thống`

### Hub pages

Mỗi page là một custom React screen gồm:

- `Page title`
- mô tả ngắn
- nhóm `Stat cards` nếu cần
- nhóm `Nội dung chính`
- nhóm `Thiết lập nâng cao`
- launcher cards dẫn đến đúng màn hình Strapi

### Deep-link strategy

Phase 1 không build CRUD riêng. Thay vào đó:

- single type launcher -> mở edit screen của single type
- collection launcher -> mở list screen của collection
- launcher phụ -> mở create entry screen hoặc filtered list

Điều này giúp:

- giảm effort
- tận dụng permission/validation có sẵn
- giữ consistency với phần còn lại của Strapi

## Mapping implementation theo hub

## 1. Tổng quan

Page cần có:

- khối stat cards
- khối `Việc cần xử lý ngay`
- khối `Doanh thu & vận hành tháng này`
- khối `Nội dung tháng này`
- khối `Chỉnh sửa nhanh`

Data phase 1:

- mock data hardcoded trong plugin để chốt UX

Data phase 2:

- gọi custom endpoint tổng hợp hoặc query admin APIs
- order cần xử lý: dựa trên `order.status`
- booking cần xử lý: dựa trên `booking.status`
- lead mới: dựa trên `contact-lead.status`
- doanh thu tháng: tổng `order.subtotal` theo tháng
- bài viết tháng này: đếm `blog-post` theo `createdAt` hoặc `publishedDate`

## 2. Trang chủ & Site

Launchers:

- `homepage`
- `general-setting`
- `contact-info`
- `branch`

Yêu cầu kèm theo:

- tối ưu layout trong `backend/src/admin-layouts.js` cho 4 model này

## 3. Giới thiệu & Thương hiệu

Launchers:

- `founder`
- `team-member`
- `partner-brand`

Yêu cầu kèm theo:

- `founder` cần layout dễ sửa vì là single type quan trọng

## 4. Dịch vụ

Launchers:

- `service`
- `faq`
- `service-category`
- `skin-concern`

Yêu cầu kèm theo:

- `service` cần là model ưu tiên layout cao nhất
- thêm CTA phụ `Tạo dịch vụ mới`

## 5. Sản phẩm & Shop

Launchers:

- `product`
- `product-tag`

Yêu cầu kèm theo:

- `product` cần list columns rõ về `name`, `status`, `price`, `tag`

## 6. Đánh giá & Kết quả

Launchers:

- `testimonial`
- `skin-result`
- `testimonial-topic`
- `result-type`

Yêu cầu kèm theo:

- list views nên dễ scan theo ảnh, featured, related content

## 7. Blog & FAQ

Launchers:

- `blog-post`
- `faq`
- `faq-category`

Yêu cầu kèm theo:

- nếu có duplication FAQ với hub `Dịch vụ`, nên khác label và intent

## 8. Khách hàng & Đơn

Launchers:

- `contact-lead`
- `booking`
- `order`
- `newsletter-subscriber`

Yêu cầu kèm theo:

- đây là hub cần phase 2 sớm nhất sau `Tổng quan`
- list view phải ưu tiên thao tác xử lý và filter theo status

## 9. Hệ thống

Launchers:

- `notification-setting`
- media library
- users & permissions

Yêu cầu kèm theo:

- chỉ hiển thị action hệ thống cho role phù hợp

## Cách triển khai kỹ thuật chi tiết

## Bước 1. Tạo plugin workspace

- tạo thư mục `backend/src/plugins/lennie-admin-workspace/`
- tạo admin entry file cho plugin
- đăng ký plugin trong admin bundle
- add 9 menu links

## Bước 2. Dựng data config tập trung cho hubs

Tạo file `admin/src/data/hubs.js` chứa:

- `id`
- `label`
- `icon`
- `position`
- `route`
- `description`
- `stats`
- `sections`
- `launchers`

Lợi ích:

- nội dung hub tách khỏi component
- dễ chỉnh IA sau này
- tránh hardcode lặp lại trong từng page

## Bước 3. Dựng shared components

Component tối thiểu:

- `HubPage`
- `LauncherCard`
- `StatCard`
- `SectionBlock`
- `QueueList`

Lợi ích:

- 9 page không bị copy-paste layout
- UI nhất quán
- dễ đổi style theo brand sau này

## Bước 4. Deep-link đúng vào Strapi screens

Trong `routes.js`, định nghĩa helper tạo link cho:

- single type edit
- collection list
- create entry
- list có query filter nếu cần

Yêu cầu:

- không hardcode URL rải rác trong component
- tập trung route mapping một chỗ để dễ sửa khi Strapi đổi path

## Bước 5. Tối ưu `admin-layouts`

Song song với plugin, mở rộng [backend/src/admin-layouts.js](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin-layouts.js) cho các model ưu tiên:

Phase 1:

- `homepage`
- `general-setting`
- `contact-info`
- `founder`
- `service`
- `product`
- `blog-post`
- `order`
- `booking`
- `contact-lead`

Mục tiêu:

- form chia nhóm logic
- label tiếng Việt rõ ràng
- list columns dễ scan
- default sort hợp lý

## Bước 6. Bật admin app project-level nếu cần

Tạo file thật từ mẫu:

- `backend/src/admin/app.js`

Sử dụng cho:

- logo admin
- locale `vi`
- theme nhẹ theo brand

Không dùng `app.js` để thay menu structure chính. Menu chính vẫn đi qua plugin.

## Bước 7. Dashboard data aggregation

Phase 1:

- hardcoded mock data để chốt UI

Phase 2:

- thêm backend route hoặc service aggregate cho dashboard
- trả về:
  - số order chờ xử lý
  - số booking chờ xử lý
  - số lead mới
  - doanh thu tháng
  - số bài viết mới trong tháng
  - số testimonial mới
  - số FAQ mới

Gợi ý nơi đặt code:

- `backend/src/plugins/lennie-admin-workspace/server/`

Hoặc nếu muốn gọn ở phase đầu:

- thêm route custom trong plugin để admin page gọi trực tiếp

## Permission model

- menu hub vẫn có thể hiển thị theo role bằng `permissions`
- không dùng ẩn menu như cơ chế bảo mật duy nhất
- page custom phải tự check quyền trước khi render action nhạy cảm
- `Hệ thống` nên hạn chế cho admin role

## Responsive & usability requirements

- sidebar phải dùng label tiếng Việt có dấu
- card launcher đủ lớn để non-tech admin click dễ
- stat cards không quá kỹ thuật
- hub `Tổng quan` và `Khách hàng & Đơn` là 2 màn cần tối ưu nhất trên laptop
- không dùng quá nhiều tầng điều hướng trong page

## Rollout plan

## Phase 0. Foundation

- chốt IA và visual từ 2 file reference
- tạo plugin skeleton
- tạo hub data config

## Phase 1. MVP navbar enhancement

- add 9 top-level hubs
- dựng page launcher cho toàn bộ hubs
- hoàn thiện `Tổng quan` với mock dashboard
- deep-link đầy đủ tới single/collection screens

## Phase 2. Usability improvement

- mở rộng `backend/src/admin-layouts.js`
- badge counts cho `Khách hàng & Đơn`
- preset filter cho `order`, `booking`, `contact-lead`
- quick actions mức nhẹ nếu cần

## Phase 3. Data-connected dashboard

- nối dữ liệu thật cho dashboard
- doanh thu theo tháng
- số bài viết tháng này
- queue xử lý thật

## Phase 4. Advanced workflow

- nếu pain point còn lớn, cân nhắc:
  - custom list views cho `order` / `booking`
  - inline actions
  - panel recent activity

## Deliverables

- plugin admin `lennie-admin-workspace`
- 9 hub pages
- 1 dashboard `Tổng quan`
- deep-link map cho toàn bộ content area chính
- admin layouts nâng cấp cho các model ưu tiên
- project admin config cơ bản nếu cần logo/theme

## Checklist handoff cho dev

- đọc spec markdown: [plan/strapi-admin-navbar-ux-design-2026-06-29.md](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/plan/strapi-admin-navbar-ux-design-2026-06-29.md)
- mở preview HTML: [plan/strapi-admin-navbar-ux-preview.html](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/plan/strapi-admin-navbar-ux-preview.html)
- kiểm tra layout bootstrap hiện có ở [backend/src/admin-layouts.js](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin-layouts.js)
- tạo plugin admin workspace
- dựng launcher pages trước, chưa cần CRUD riêng
- tối ưu layout cho `service`, `homepage`, `order`, `booking`, `contact-lead` trước
- chỉ sau khi MVP ổn định mới nối dashboard data thật

## Vì sao cách này phù hợp

- không cần rewrite form engine
- tận dụng layout config hiện có của Content Manager
- có thể rollout theo từng hub
- phù hợp với giới hạn menu phẳng
- dễ maintain hơn việc viết full CRUD page cho mọi model

## Mức effort

### Phase 1

- tạo plugin workspace
- làm 9 hub pages
- mỗi hub chỉ là launcher/deep-link
- custom lại layout CM cho model quan trọng

### Phase 2

- thêm badge counts
- thêm preset filters
- thêm quick actions
- thêm recent items

### Phase 3

- nếu cần mới viết full custom CRUD pages cho hub vận hành như `Khách hàng & Đơn`

## Thứ tự rollout khuyến nghị

Nếu làm dần, nên theo thứ tự này:

1. `Tổng quan`
2. `Trang chủ & Site`
3. `Dịch vụ`
4. `Khách hàng & Đơn`
5. `Sản phẩm & Shop`
6. `Đánh giá & Kết quả`
7. `Blog & FAQ`
8. `Giới thiệu & Thương hiệu`
9. `Hệ thống`

## Quyết định UX cuối cùng

Phương án nên chốt cho Lennie là:

- **Không biến sidebar thành danh sách dài tất cả models**
- **Biến sidebar thành workspace theo nhóm nghiệp vụ**
- **Bên trong mỗi menu là launcher rõ ràng cho từng content type**
- **Tên menu dùng ngôn ngữ editor, không dùng thuật ngữ kỹ thuật**

Đây là phương án vừa “đưa hết ra ngoài” theo trải nghiệm sử dụng, vừa đủ thực tế để dev trên Strapi v5.
