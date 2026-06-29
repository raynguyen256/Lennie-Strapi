# Strapi Admin Usability Research

Ngày cập nhật: 2026-06-29

## Mục tiêu

Đánh giá khả năng chủ động develop để làm backend CMS Strapi dễ dùng hơn cho team vận hành nội dung Lennie SkinLab.

## Kết luận ngắn

Có thể custom khá sâu theo hướng "editor-friendly", nhưng nên chia làm 3 tầng:

1. **Tầng an toàn, nên làm trước**: cấu hình lại Content Manager layout cho từng content type/single type.
2. **Tầng mở rộng vừa phải**: tạo `backend/src/admin/app.js` để custom admin panel theo project.
3. **Tầng mạnh nhất**: viết plugin admin riêng để thêm panel, action, dashboard, shortcut, workflow cho editor.

Điểm quan trọng: **nên tránh sửa trực tiếp core UI hoặc patch `node_modules`**. Strapi v5 có extension points chính thức, đủ để cải thiện UX đáng kể mà vẫn self-host ổn định.

## Bằng chứng từ repo hiện tại

### 1. Project đã có custom admin layout theo hướng supported

- [`backend/src/admin-layouts.js`](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin-layouts.js) đang dùng:
  - `strapi.plugin('content-manager').service('content-types')`
  - `updateConfiguration(...)`
- File này đang seed layout cho single type `notification-setting`:
  - đổi label/description field
  - cấu hình list columns
  - nhóm field theo hàng với `size` 4/8/12
  - chỉnh `relationOpenMode`, `pageSize`, `defaultSortBy`, `defaultSortOrder`
- [`backend/src/index.js`](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/index.js) đã gọi `seedAdminLayouts(strapi)` trong `bootstrap`, tức là project đã có sẵn hook để mở rộng tiếp.

### 2. Repo chưa bật lớp admin React customization

- Hiện chỉ có file mẫu:
  - [`backend/src/admin/app.example.js`](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin/app.example.js)
  - [`backend/src/admin/vite.config.example.js`](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/backend/src/admin/vite.config.example.js)
- Nghĩa là backend này **chưa bắt đầu custom `src/admin/app.js` thật**, nhưng cấu trúc để làm việc đó đã sẵn.

### 3. Content model hiện tại phù hợp để tối ưu UX

Repo có nhiều content type mà editor experience rất đáng tối ưu:

- single types:
  - `homepage`
  - `general-setting`
  - `contact-info`
  - `founder`
  - `notification-setting`
- collection types biên tập:
  - `service`
  - `product`
  - `blog-post`
  - `testimonial`
  - `skin-result`
  - `faq`
- collection types vận hành:
  - `booking`
  - `contact-lead`
  - `order`
  - `newsletter-subscriber`

Đây là dấu hiệu rõ rằng chỉ dùng giao diện mặc định của Strapi sẽ sớm gây rối cho editor, nhất là với `service`, `homepage`, `order`, `booking`.

## Các mức độ custom khả thi

## Mức 1: Cấu hình lại Content Manager layout

### Có thể làm

- sắp xếp field trong form edit theo grid 12 cột
- nhóm field thành từng hàng logic
- đổi label và description để editor dễ hiểu hơn
- ẩn field kỹ thuật khỏi form
- chọn cột hiển thị ở list view
- chọn sort mặc định
- chỉnh page size
- bật/tắt khả năng bulk, filter, search theo model config
- chỉnh cách mở relation (`modal` thay vì điều hướng sâu)

### Rất phù hợp cho Lennie

- `homepage`: chia thành `Hero`, `Stats`, `Mantra`, `Services slider`
- `general-setting`: gom CTA và hotline thành 1 cụm rõ ràng
- `contact-info`: gom address/opening hours/social
- `service`: tách `hero`, `pricing`, `who it's for`, `steps`, `FAQ`, `results`
- `product`: gom pricing/status/tag/media/social proof
- `booking`, `contact-lead`, `order`: tối ưu list view để staff xử lý nhanh hơn

### Ưu điểm

- supported bởi Strapi
- ít rủi ro upgrade hơn
- không cần viết React admin nhiều
- cho hiệu quả UX nhanh nhất trên effort thấp

### Giới hạn

- chỉ cải thiện được bố cục và metadata của form/list
- không tạo được workflow UI phức tạp
- không biến Strapi thành page builder/editor riêng

## Mức 2: Local admin extension trong `backend/src/admin/app.js`

### Có thể làm

- custom branding, logo, theme, locale, translations
- thêm code admin React riêng cho project này
- import thêm component trong `backend/src/admin/extensions/`
- đọc env `STRAPI_ADMIN_*` cho admin bundle ở self-hosted mode

### Dùng khi nào

- muốn chỉnh trải nghiệm admin ở cấp project, không cần đóng gói reusable plugin
- muốn tạo một vài màn hình/settings/helper riêng chỉ dùng cho Lennie

### Ưu điểm

- vẫn là đường chính thức của Strapi v5
- phù hợp với bài toán "CMS này chỉ phục vụ một business"
- không phải over-engineer thành plugin ngay

### Giới hạn

- khi logic lớn dần sẽ khó quản lý hơn plugin
- vẫn không nên override thô các màn hình core bằng hack riêng

## Mức 3: Plugin admin riêng cho Lennie CMS

### Có thể làm

Qua Admin Panel API / Content Manager APIs, plugin có thể:

- thêm menu link ở admin
- thêm settings section riêng
- inject component vào vùng có sẵn của Content Manager
- thêm side panel ở Edit View
- thêm document actions/header actions
- thêm bulk actions ở List View
- thêm custom field
- thêm reducer/state riêng cho admin

### Use case rất hợp với Lennie

- side panel "Frontend preview / quick links" cho `service`, `product`, `blog-post`
- side panel "Checklist trước khi publish"
- bulk action cho `testimonial`, `faq`, `blog-post`
- action nhanh cho `order`, `booking`, `contact-lead` như:
  - đổi trạng thái
  - copy thông tin liên hệ
  - mở link chat
- màn hình dashboard nội bộ:
  - đơn mới
  - lead mới
  - booking mới
  - shortcut đi tới các single type quan trọng

### Khi nào nên lên plugin

- có nhiều custom behavior hơn là chỉ đổi layout
- cần UI vận hành lặp lại mỗi ngày
- muốn cô lập phần custom để dễ maintain lâu dài

## Mức 4: Custom fields

### Có thể làm

- tạo field type riêng nhưng vẫn map về data type có sẵn của Strapi
- custom input component tốt hơn input mặc định
- cấu hình `inputSize` cho field riêng

### Use case tiềm năng

- CTA picker thống nhất cho `primaryCta` / `secondaryCta`
- field nhập social/contact chuẩn hóa
- field status/priority có UX rõ hơn select mặc định
- field helper cho image caption / before-after pair nếu workflow thực sự cần

### Giới hạn

- không tạo data type mới thật sự
- không dùng custom field để thay relation/media/component/dynamic zone

## Những gì không nên làm

### 1. Không patch `node_modules`

Làm vậy sẽ rất dễ vỡ khi upgrade Strapi hoặc rebuild admin.

### 2. Không cố rewrite toàn bộ Content Manager

Strapi cho phép extend rất nhiều, nhưng không có nghĩa là nên biến admin thành một app hoàn toàn khác. Nếu nhu cầu đi quá xa, tốt hơn là:

- viết plugin rõ ràng
- hoặc tách hẳn một backoffice riêng ở Next.js dùng Strapi API

### 3. Không dùng hướng phụ thuộc cloud-only

Project này có ràng buộc self-host, nên mọi lựa chọn phải giữ được khả năng build/run hoàn toàn local hoặc self-hosted.

## Đề xuất roadmap cho Lennie

## Phase 1: CMS layout cleanup

Mục tiêu: tăng usability nhanh, ít rủi ro.

Đề xuất áp dụng ngay cho:

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

Deliverables:

- label tiếng Việt rõ nghĩa hơn
- description hướng dẫn editor
- form chia section logic
- list view tối ưu cho collection types vận hành
- ẩn field không cần editor chạm vào

## Phase 2: Admin helper layer

Mục tiêu: giảm thao tác thừa.

Đề xuất:

- bật `backend/src/admin/app.js`
- thêm shortcut/menu nội bộ cho single types quan trọng
- thêm preview/open-frontend actions cho content editorial
- thêm status quick actions cho `order`, `booking`, `contact-lead`

## Phase 3: Plugin nội bộ cho workflow

Mục tiêu: biến Strapi thành công cụ vận hành thực tế hơn, không chỉ là nơi nhập dữ liệu.

Đề xuất:

- plugin `lennie-admin-tools`
- dashboard nhỏ cho staff
- action/panel theo từng model
- custom field nếu có pain point lặp lại thật sự

## Ước lượng effort tương đối

- Phase 1: thấp đến trung bình
- Phase 2: trung bình
- Phase 3: trung bình đến cao

Effort thực tế sẽ phụ thuộc vào việc team muốn:

- chỉ sắp layout cho editor
- hay thêm workflow nội bộ kiểu CRM-lite cho lead/order/booking

## Recommendation

Hướng tối ưu nhất cho repo này là:

1. **Mở rộng pattern hiện có ở `backend/src/admin-layouts.js` cho tất cả model quan trọng.**
2. **Sau đó mới bật `backend/src/admin/app.js` để thêm helper UI cấp project.**
3. **Chỉ lên plugin riêng khi đã rõ pain point vận hành lặp lại.**

Lý do:

- nhanh thấy hiệu quả
- rủi ro thấp
- hợp với self-hosted Strapi v5
- không overbuild quá sớm

## Backlog gợi ý rất cụ thể

1. Tạo `admin-layouts` config cho `homepage`, `general-setting`, `contact-info`, `founder`.
2. Tạo `admin-layouts` config cho `service`, `product`, `blog-post`.
3. Tối ưu list view cho `order`, `booking`, `contact-lead`.
4. Bật `backend/src/admin/app.js` từ file mẫu.
5. Thêm action "Open frontend page" cho content có slug.
6. Thêm side panel checklist publish cho content editorial.
7. Cân nhắc plugin nội bộ cho workflow lead/order/booking.

## Nguồn tham chiếu chính thức

- Strapi Admin panel customization:
  - https://docs.strapi.io/cms/admin-panel-customization
- Strapi Admin panel extension:
  - https://docs.strapi.io/cms/admin-panel-customization/extension
- Strapi Admin Panel API:
  - https://docs.strapi.io/cms/plugins-development/admin-panel-api
- Strapi Content Manager APIs:
  - https://docs.strapi.io/cms/plugins-development/content-manager-apis
- Strapi Custom Fields:
  - https://docs.strapi.io/cms/features/custom-fields

