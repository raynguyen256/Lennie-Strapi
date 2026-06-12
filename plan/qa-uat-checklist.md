# Lennie SkinLab — QA / UAT Checklist (Strapi + Next.js)

> Cập nhật: 2026-06-11

---

## 1. Visual consistency

- [ ] Màu, typography, spacing nhất quán trên mọi trang (đối chiếu `globals.css` tokens)
- [ ] Hero, cards, CTA cùng một ngôn ngữ visual giữa home và các trang con
- [ ] Không còn section thừa hoặc nhịp nền rối (xem section rhythm trong `editor-theme-style-guide.md`)

---

## 2. Responsive

- [ ] Home ổn trên mobile/tablet (đã verify một phần — cần hoàn tất Testimonials/About/Blog/ConsultSection/QuickFaq/Footer/modals)
- [ ] Booking form (`ConsultForm`/`BookingModal`) không vỡ layout trên mobile
- [ ] Product/service grid không gãy xấu trên tablet/mobile
- [ ] Contact blocks xếp đúng thứ tự trên mobile

---

## 3. Content-editing safety (Strapi Admin)

- [ ] Single types (`homepage`, `founder`, `general-setting`, `contact-info`) có field rõ ràng, client không thể xoá nhầm cấu trúc section
- [ ] Collection types (`service`, `product`, `testimonial`, `skin-result`, `faq`, `blog-post`, `team-member`, `partner-brand`) có validation hợp lý (required fields, media types)
- [ ] Rich text fields (`service.body`, `blog-post.body`, `faq.answer`) không phá layout khi nội dung dài/ngắn bất thường
- [ ] Permissions: chỉ field/collection cần thiết được public qua API; admin actions yêu cầu auth

---

## 4. Functional

- [ ] Home render đúng từ Strapi API (không còn phụ thuộc `data.js` cho phần đã wiring)
- [x] `/services` archive + `/services/[slug]` single render đúng — smoke-QA xong khi build (mục 4 `implementation-backlog.md`), cần re-test với data thật sau Mục 1
- [x] `/shop` archive + `/shop/[slug]` single render đúng — smoke-QA xong (kèm add-to-cart/CartToast), cần re-test với data thật sau Mục 1
- [x] `/blog` archive + `/blog/[slug]` single render đúng — smoke-QA xong, cần re-test với data thật sau Mục 1
- [x] `/booking`, `/testimonials`, `/contact`, `/about` render đúng — smoke-QA xong, cần re-test với data thật sau Mục 1
- [ ] Lead form (`ConsultForm`) build message và mở đúng Messenger/Zalo
- [ ] CTA hotline/Zalo/Messenger trong Navbar/Footer/FloatingActions hoạt động
- [ ] Trạng thái lỗi/loading khi Strapi không phản hồi được xử lý hợp lý (không crash trang)

---

## 5. SEO baseline

- [ ] Heading structure hợp lý (H1 duy nhất mỗi trang, phân cấp H2/H3 rõ)
- [ ] Slug sạch và nhất quán (`service.slug`, `product.slug`, `blog-post.slug`)
- [ ] Metadata cơ bản qua Next.js Metadata API (title, description) cho từng route, lấy từ Strapi nếu có field tương ứng

---

## 6. Content pass

- [ ] Không còn placeholder ẩn trước UAT
- [ ] Placeholder còn lại đều đánh dấu rõ `[PLACEHOLDER - cần client cung cấp]`
- [ ] Ảnh dùng đúng quyền và đúng mục đích (đặc biệt before/after, founder, team)

---

## 7. Self-host deployment sanity (trước go-live)

- [ ] Strapi build production chạy ổn trên môi trường self-host (không phụ thuộc Strapi Cloud)
- [ ] Backup DB + uploads đã thiết lập
- [ ] `.env` secrets không commit vào git
- [ ] Reverse proxy + TLS hoạt động cho cả Strapi admin/API và Next.js frontend
