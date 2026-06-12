# Lennie SkinLab — Design System / Component Style Guide (Next.js)

> Cập nhật: 2026-06-11
> Status: **ACTIVE**
> Thay thế "Editor Theme Style Guide" bản Gutenberg — áp dụng cho component React/Tailwind

---

## 1. Mục tiêu

- Định nghĩa token visual cho Next.js/Tailwind (đã implement trong `globals.css`)
- Map design handoff (`Lennie-Strapi/Web Lennie Design/` — design reference duy nhất) sang component trong `frontend/src/components/`
- Đảm bảo component nhận nội dung qua props (Strapi data), không hardcode

---

## 2. Visual direction

- Sạch, premium, trust-first, mềm mại nhưng không spa quá mức, có cảm giác khoa học và cá nhân hóa
- Nguồn tham chiếu (giữ nguyên từ bản cũ): tổng thể `minskinlab.com`, section rhythm mockup Lacie, trust/expertise cues `olangvien.com`, palette feel `bleubeauteclinic.com`

---

## 3. Typography & Color

- Heading: `Spectral` — Body: `Plus Jakarta Sans`
- H1/H2 dùng weight nhẹ (300/400) để giữ cảm giác premium; eyebrow/label dùng uppercase + tracking rộng
- Palette: `brand-blue` (#5789B7), `brand-teal` (#87C1E9), `ink`/`ink-2`/`ink-3` cho text, `mist`/`light-bg`/`teal-soft`/`brand-blue-light` cho nền section, `divider` cho border
- Nguyên tắc: nền chính sáng (`mist`/`light-bg`/white), `brand-blue`/`brand-teal` chỉ dùng làm điểm nhấn (CTA, icon, accent text)

→ Toàn bộ token đã có sẵn trong `frontend/src/app/globals.css`, dùng trực tiếp qua Tailwind class.

---

## 4. Section rhythm (đã áp dụng trong `src/app/page.js`)

Thứ tự home page hiện tại theo đúng nhịp 6 bước:

1. **Hero** — sáng, thoáng (`Hero.jsx`)
2. **Trust band** — `StatsBar.jsx`
3. **Sản phẩm/dịch vụ có card rõ** — `ProductShelf.jsx`, `Services.jsx`
4. **Founder/story** — `AboutUsHome.jsx`, `MantraSection.jsx`, `About.jsx`
5. **Social proof** — `Testimonials.jsx`, `Blog.jsx`
6. **Booking/contact close** — `ConsultSection.jsx`, `QuickFaqSection.jsx`, `Footer.jsx`

Khi build các trang con, giữ nguyên nguyên tắc này: không nhồi quá nhiều section nhỏ liên tiếp, không đổi background màu quá dày, không dùng quá nhiều kiểu card trên cùng một page.

---

## 5. Component inventory hiện tại

### `src/components/chrome/` (dùng chung nhiều trang)

`Navbar`, `Footer`, `FloatingActions`, `CartToast`, `SectionHead`, `PartnerStrip`, `CTABand`, `StatStrip`, `PageHero`, `ConsultForm`, `ConsultSection`, `FaqAccordion`, `QuickFaqSection`, `BookingModal`, `QuizModal`

### `src/components/home/` (riêng cho trang chủ)

`Hero`, `StatsBar`, `ProductShelf`, `Services`, `PartnerMarquee`, `AboutUsHome`, `MantraSection`, `About`, `Testimonials`, `Blog`

### Nguyên tắc khi build component mới (cho trang con)

- Nhận data qua props (từ Strapi fetch ở page level), có fallback an toàn nếu prop rỗng
- Tái dùng `SectionHead`, `PageHero`, `CTABand`, `FaqAccordion` thay vì viết lại
- Component cần tương tác (state/hooks/animation) đánh dấu `"use client"`, còn lại để Server Component khi có thể (fetch trực tiếp)

---

## 6. Responsive rules

- Tablet (`768px`): grid 3-4 cột → 2 cột, buttons có thể wrap
- Mobile (`480px`): H1 ~38-44px, section padding ~56px, card full width, ưu tiên flow dọc rõ ràng

---

## 7. Definition of done

- [x] Token màu/font/spacing/animation có trong `globals.css`
- [x] Section rhythm áp dụng đúng cho home page
- [x] Component inventory cho home page hoàn chỉnh
- [ ] Component cho các trang con (`/about`, `/services`, `/shop`, `/blog`, `/booking`, `/testimonials`, `/contact`) — backlog
- [ ] Toàn bộ component nhận data qua props từ Strapi (hiện đang import trực tiếp từ `data.js`)
