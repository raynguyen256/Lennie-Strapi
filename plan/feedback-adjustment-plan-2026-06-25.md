# Lennie SkinLab - Kế Hoạch Điều Chỉnh Theo Feedback

> Nguồn feedback: vòng review ngày 2026-06-25  
> Cập nhật thêm input client: 2026-06-29  
> Trạng thái: chỉ planning, chưa implement

## 1. Mục tiêu

Ghi nhận và tách feedback thành 3 nhóm rõ ràng:

1. Các chỉnh sửa UI/interaction có thể làm ngay trong frontend hiện tại
2. Các thay đổi route/content model cần bổ sung page mapping hoặc schema Strapi
3. Các hạng mục lớn nên tách phase riêng để tránh mở rộng scope quá nhanh

## 2. Tổng hợp feedback đã quy đổi thành task

## 2A. Input client đã chốt thêm ngày 2026-06-29

### Social links chính thức của Lennie

- Facebook: [https://www.facebook.com/share/1Ea37BVL7W/?mibextid=wwXIfr](https://www.facebook.com/share/1Ea37BVL7W/?mibextid=wwXIfr)
- Instagram: [https://www.instagram.com/lennieskinlab?igsh=bHh2a2VyMG9ia2Iy](https://www.instagram.com/lennieskinlab?igsh=bHh2a2VyMG9ia2Iy)
- TikTok: [https://www.tiktok.com/@ths.ds.hoanghongtham?_r=1&_t=ZS-97OmkFKXX76](https://www.tiktok.com/@ths.ds.hoanghongtham?_r=1&_t=ZS-97OmkFKXX76)

### Nội dung đã chốt cho trang Case Study

- Tiêu đề trang: `Lennie SkinLab | Câu Chuyện Khách Hàng`
- Mô tả mở đầu:

  `Lưu giữ lại hành trình của những làn da từng điều trị tại Lennie. Đây chính là kết quả từ một phác đồ phù hợp và sự kiên trì của chính các bạn. Tụi mình lưu lại những câu chuyện thực tế tại đây, không phải để hứa hẹn một hành trình hoàn hảo, mà để bạn thấy rằng: chỉ cần đi đúng hướng, làn da nào cũng sẽ có cơ hội được khỏe mạnh trở lại.`

- CTA cuối trang:

  `Hành trình vạn dặm bắt đầu từ một bước chân. Nên nếu bạn vẫn đang chần chừ chưa biết phải bước đi thế nào trên con đường chăm da, đừng ngại nhắn Lennie để tụi mình tư vấn nhé!`

### A. Trang chủ

1. Shelf sản phẩm cần có hành vi `xem thêm` / quick detail khi hover
- Hiện trạng: [frontend/src/components/home/ProductShelf.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/home/ProductShelf.jsx) chỉ có nút `Thêm vào giỏ`.
- Kế hoạch:
  - Thêm CTA hover state trên card: `Xem thêm`.
  - Tái sử dụng modal quick view đã có sẵn ở [frontend/src/components/shop/ProductQuickViewModal.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/shop/ProductQuickViewModal.jsx) để tránh build lại UI.
  - Nếu card home đang lấy data rút gọn, bổ sung các field tối thiểu cho quick view: `slug`, `type`, `skinTypes`, `rating`, `reviews`, `excerpt`.

2. Nút `Thêm vào giỏ` sau khi bấm cần trả lại trạng thái cũ
- Hiện trạng: hiện đã có timer reset ở home và product detail, nhưng wording/state cần đồng bộ lại để tránh gây confuse.
- Kế hoạch:
  - Chuẩn hóa state flash `Đã thêm` thành feedback ngắn hạn.
  - Sau timeout trả lại đúng label gốc `Thêm vào giỏ`.
  - Rà soát cả Home, Shop archive, Product quick view, Product detail để dùng chung một behavior.

3. Feedback trên home cần link sang `Case Study`
- Hiện trạng: section feedback home chỉ là flip card, chưa có link out.
- Kế hoạch:
  - Sau khi có page `Case Study`, mỗi card feedback home sẽ có click target/link sang archive hoặc item liên quan.
  - Không đi qua Blog nữa.

4. Màu nút `Thêm vào giỏ` bị đổi khi đổi category
- Hiện trạng: filter category trên home đang dim card không match, dễ gây cảm giác button đổi tone.
- Kế hoạch:
  - Điều chỉnh style filter/card dim state để giữ brand color cho CTA.
  - Không để màu xám override cảm nhận của button primary.

5. Bỏ nút `in` ở profile bác sĩ / đội ngũ
- Hiện trạng: [frontend/src/components/home/About.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/home/About.jsx) đang render icon text `in` giả lập.
- Kế hoạch:
  - Xóa nút này khỏi card.
  - Cân lại layout phần footer card để không bị hụt khoảng trống.

### B. Trang sản phẩm

1. Product detail cần có feedback + rating của khách hàng cho chính sản phẩm đó
- Hiện trạng:
  - [frontend/src/components/shop/ProductDetailView.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/shop/ProductDetailView.jsx) chỉ có tổng rating/review count.
  - Schema `testimonial` hiện chỉ relation với `service`, chưa relation với `product`.
- Kế hoạch đề xuất:
  - Phase 1: thêm block `Đánh giá khách hàng` trên product detail.
  - Phase 2 data model: mở rộng `testimonial` để có thể liên kết optional với `product`, hoặc tạo `product-review` nếu muốn tách review sản phẩm khỏi testimonial điều trị.
- Kiến nghị:
  - Ngắn hạn nên mở rộng `testimonial` thêm relation `relatedProducts` để tận dụng content hiện có.
  - Nếu muốn có review verified purchase, điểm số, tên người mua, ngày mua, admin moderation rõ ràng, nên tách thành content type riêng.

### C. Trang liên hệ -> Case Study

1. Thay trang `Liên hệ` bằng trang `Case Study`
- Hiện trạng:
  - Route `/contact` đang là trang liên hệ đầy đủ.
  - Dữ liệu case study thực tế đã có content type `skin-result`, nhưng chưa build page frontend.
- Kế hoạch:
  - Build page archive `Case Study` từ `skin-result`.
  - Dùng content client đã chốt cho page shell:
    - title: `Lennie SkinLab | Câu Chuyện Khách Hàng`
    - intro: đoạn mô tả client đã gửi ngày 2026-06-29
    - CTA cuối trang: dùng đúng câu CTA client đã chốt
  - Case study hiển thị before/after, concern, timeframe, summary, treatment steps, disclaimer.
  - Liên kết feedback trang chủ về page này.

2. `Liên hệ` không còn là page chính, mà thành utility button như search/cart
- Kế hoạch:
  - Điều chỉnh utility area trong header/floating actions:
    - `Search` trở về đúng nghĩa search
    - Thêm `Liên hệ` / `Chat` utility button
  - Footer vẫn giữ thông tin liên hệ và quick channels.

3. Ảnh hưởng route cần chốt trước khi implement
- Lựa chọn A đề xuất:
  - Tạo route mới `/case-study`
  - Chuyển nav item hiện tại `Liên hệ` thành `Case Study`
  - Giữ contact dưới dạng CTA/button/modal, không còn là menu page chính
- Lựa chọn B:
  - Tái sử dụng thẳng route `/contact` nhưng đổi nội dung thành `Case Study`
  - Cách này nhanh hơn nhưng tên URL sẽ lệch với nội dung
- Kiến nghị: ưu tiên Lựa chọn A để thông tin và SEO sạch hơn.

### D. Trang thanh toán

1. Điền sẵn thông tin đơn hàng trước
- Hiện trạng: checkout form là state memory trong session, chưa nhớ dữ liệu sau lần đặt hàng trước.
- Kế hoạch:
  - Ngắn hạn: lưu shipping info local ở browser sau khi đặt hàng thành công và auto-fill lần sau.
  - Có nút `Dùng thông tin lần trước` hoặc auto-prefill và cho phép sửa.
- Ghi chú:
  - Cách này không cần account, phù hợp yêu cầu tiện lợi trước mắt.
  - Nếu về sau làm account, có thể nâng cấp sang profile/shipping book theo user.

### E. Tổng quan toàn site

1. Button chat chưa link Messenger
- Hiện trạng: [frontend/src/components/chrome/FloatingActions.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/chrome/FloatingActions.jsx) đang `href="#"`.
- Kế hoạch:
  - Nối với `messengerUrl` từ `general-setting`.
  - Nếu chưa cập nhật `messengerUrl` trong Strapi, tạm thời ưu tiên dùng link Facebook page client vừa cung cấp làm điểm đến liên hệ nhanh.

2. Button search đang mở `Phân tích da`
- Hiện trạng: icon search trong [frontend/src/components/chrome/Navbar.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/chrome/Navbar.jsx) đang gọi `onOpenQuiz`.
- Kế hoạch:
  - Tách rõ `Search` và `Phân tích da`.
  - Search sẽ mở search overlay/modal hoặc route search thật sự.
  - Quiz/phân tích da chuyển thành CTA riêng, không đội lốt bằng icon search.

3. Các button MXH ở footer chưa link page Lennie
- Hiện trạng: footer đang hardcode chip `Fb/Ig/Zl/Tk`, chưa đọc link Strapi.
- Kế hoạch:
  - Footer đọc link từ `contact-info` và/hoặc `general-setting`.
  - Chỉ render icon nào có URL thật.
  - Thống nhất với `ContactQuickChannels` để tránh 2 nguồn social khác nhau.
  - Input đã có từ client:
    - Facebook
    - Instagram
    - TikTok
  - Chưa có URL Zalo chính thức trong round input này, nên chưa render nếu chưa được cung cấp.

4. Marquee đối tác cần hiện logo thay vì text
- Hiện trạng:
  - Schema `partner-brand` đã có media `logo`.
  - Home content hiện chỉ map `name`.
  - Component [frontend/src/components/home/PartnerMarquee.jsx](/Users/nguyenan/Documents/Claude/Projects/Lennie%20Skinlab/Lennie-Strapi/frontend/src/components/home/PartnerMarquee.jsx) đang render text.
- Kế hoạch:
  - Đổi data mapper để lấy cả `logo`.
  - Render logo card/logo strip thay text marquee.
  - Nếu logo chưa được upload vào Strapi: đặt `[PLACEHOLDER - cần client cung cấp]`.

5. Đưa MXH ra body/header để dễ tìm hơn
- Kế hoạch đề xuất:
  - Desktop: thêm social rail dọc gần mép phải hoặc trái body, nhỏ gọn và đồng bộ với floating actions.
  - Mobile: giữ footer + quick actions, không mở rail dọc để tránh che nội dung.
- Kiến nghị:
  - Gộp `Messenger`, `Facebook`, `Instagram`, `TikTok` và `Zalo/Phone` khi có đủ link thành cụm floating utility có hierarchy rõ.

6. Thêm đăng nhập / đăng ký để xem lịch sử mua hàng / điều trị
- Hiện trạng:
  - Chưa có auth flow custom cho customer.
  - `order`, `booking`, `contact-lead` hiện là guest records, không relation tới user account.
  - Chưa có page `account`, `login`, `register`.
- Đánh giá:
  - Đây là scope lớn, không nên gom chung vào đợt polish UI.
- Kế hoạch phase riêng:
  - Thiết kế customer auth flow.
  - Chọn có dùng Strapi Users & Permissions cho customer-side hay tách auth layer.
  - Thêm relation giữa user và `order` / `booking`.
  - Build `My Account`: profile, lịch sử đơn hàng, lịch sử đặt lịch/liệu trình.
  - Xử lý privacy, reset password, trạng thái đơn hàng, quyền truy cập.

## 3. Phân loại theo độ phức tạp

### Nhóm 1 - Có thể làm ngay trong đợt chính

- Home product quick view / `Xem thêm`
- Đồng bộ nút `Thêm vào giỏ`
- Fix màu CTA theo category
- Bỏ nút `in` ở profile đội ngũ
- Link Messenger cho floating chat
- Fix footer social links
- Đổi partner strip từ text sang logo nếu media đã sẵn sàng

### Nhóm 2 - Cần đổi route/content wiring, nhưng vẫn hợp lý trong đợt này

- Tạo page `Case Study` từ `skin-result`
- Link feedback home sang case study
- Chuyển nav / utility để `Liên hệ` không còn là page chính
- Sửa hành vi `Search` thành search đúng nghĩa
- Thêm social rail/floating utility đẹp hơn
- Thêm feedback/review block cho product detail

### Nhóm 3 - Nên tách phase 2

- Đăng nhập / đăng ký
- Lịch sử mua hàng
- Lịch sử điều trị / booking theo tài khoản
- Đồng bộ checkout history qua account thay vì chỉ local prefill

## 4. Thứ tự implement đề xuất

### Phase 1 - Utility và polish để giảm bug cảm nhận

- Fix chat, search, footer social, color consistency, remove `in`
- Bind social links thật client đã gửi vào footer/floating utility/header rail
- Chuẩn hóa state CTA `Thêm vào giỏ`
- Chuyển đổi partner strip sang logo nếu asset sẵn sàng

### Phase 2 - Case Study + feedback wiring

- Build `Case Study` archive từ `skin-result`
- Áp title/intro/CTA đã được client chốt ngày 2026-06-29
- Update nav/header utility theo direction mới
- Link feedback home sang case study
- Bỏ route/blog wiring cũ cho feedback

### Phase 3 - Product trust enrichment

- Thêm feedback/rating section vào product detail
- Chốt cách lưu review theo product:
  - reuse `testimonial` + relation product
  - hoặc tạo content type riêng

### Phase 4 - Checkout convenience

- Lưu và auto-fill thông tin giao hàng lần trước bằng local storage
- Đảm bảo UX sửa lại thông tin đơn giản, không gây hard lock

### Phase 5 - Customer account (tách scope)

- Auth
- Account dashboard
- Order/treatment history
- Data relation và quyền truy cập

## 5. Các điểm cần anh review/chốt trước khi code

1. Route Case Study:
- Kiến nghị dùng `/case-study` thay vì đổi nội dung của `/contact` trên cùng URL.

2. Dữ liệu social:
- Facebook, Instagram, TikTok đã có.
- Còn thiếu link Zalo chính thức nếu muốn render thêm ở footer/floating rail.

3. Search behavior:
- Kiến nghị đổi icon search thành search thật, còn `Phân tích da` thành CTA riêng.

4. Product review model:
- Kiến nghị ngắn hạn mở rộng `testimonial` gắn được với product.
- Nếu muốn review mua hàng chuẩn ecommerce, nên tách thành phase riêng.

5. Checkout prefill:
- Kiến nghị đợt này làm local browser prefill.
- Không đợi auth mới có được trải nghiệm này.

6. Login/register:
- Kiến nghị tách thành một mini-project riêng sau đợt polish này.

7. Nội dung Case Study:
- Tiêu đề trang, intro và CTA cuối trang đã được client chốt.
- Vẫn còn thiếu dữ liệu từng case cụ thể nếu muốn build archive/detail bằng content thật:
  - ảnh trước/sau
  - timeframe
  - tóm tắt ca
  - treatment steps
  - disclaimer nếu có

## 6. Kết luận đề xuất

Nếu triển khai theo hướng ít rủi ro nhất, đợt sửa này nên ưu tiên:

1. Fix utility và CTA bugs
2. Dựng page `Case Study` từ schema `skin-result` đã có
3. Nối feedback home và product detail vào lớp nội dung trust proof mới
4. Để auth/account sang phase sau để tránh mở rộng scope quá nhanh
