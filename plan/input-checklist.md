# Lennie SkinLab — Input Checklist

> Cập nhật: 2026-06-11
> Mục đích: danh sách thông tin user cần gom để agent/dev không phải đoán
> Nội dung không đổi theo stack — vẫn là data business cần từ client. Khác biệt duy nhất: nơi nhập liệu là **Strapi Admin** (xem mục 7), không phải file trong `02_content/`.

---

## 1. Brand và legal/trust

- [ ] Logo source: SVG / AI / PNG nền trong
- [ ] Font final nếu có thay đổi (hiện dùng Spectral + Plus Jakarta Sans, đã có trong `globals.css`)
- [ ] Founder portrait chuẩn
- [ ] Founder bio ngắn
- [ ] Founder bio dài
- [ ] Credentials / chứng chỉ / trust proof
- [ ] Danh sách brand đối tác có thể public (cho `partner-brand`)

---

## 2. Contact và lead capture

- [ ] Hotline chính
- [ ] Zalo link
- [ ] Messenger link (hiện đang dùng placeholder `https://m.me/lennie.skinlab` trong `ConsultForm`)
- [ ] Email nhận lead form
- [ ] Địa chỉ
- [ ] Map URL
- [ ] Giờ mở cửa

---

## 3. Services

- [ ] Tên dịch vụ
- [ ] Nhóm dịch vụ (`service-category`)
- [ ] Mô tả ngắn (`intro`) + nội dung chi tiết (`body`)
- [ ] Outcome chính
- [ ] CTA chính / CTA phụ
- [ ] Ảnh đại diện (`heroImage`)
- [ ] Giá (nếu áp dụng cho booking — field `price`)

---

## 4. Products

- [ ] Tên sản phẩm, brand
- [ ] Nhóm/tag sản phẩm (`product-tag`)
- [ ] Concern / loại da liên quan
- [ ] Giá
- [ ] Ảnh
- [ ] Trạng thái catalog hoặc có thể bán (`status`)

---

## 5. Social proof

- [ ] Testimonials được phép public (`testimonial`)
- [ ] Before/after được phép public (`skin-result`)
- [ ] Ghi chú giới hạn sử dụng hình ảnh nếu có

---

## 6. Team

- [ ] Danh sách thành viên (tên, vai trò, ảnh) cho `team-member`

---

## 7. Pages & nhập liệu

- [ ] Home copy (hero, stats, mantra, services slides) → single type `homepage`
- [ ] About copy → single type `founder` + collection `team-member`
- [ ] Booking copy → page `/booking` + collection `service` (field `price`)
- [ ] Contact copy → single type `contact-info`

**Nơi nhập:** Strapi Admin (`http://localhost:1337/admin` khi dev, domain self-host khi production) sau khi content types được tạo theo `content-model.md`. Nếu chưa có content thật, dùng data mẫu trong `frontend/src/lib/data.js` để seed tạm.
