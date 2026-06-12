/* ============================================================
   Lennie SkinLab — extended data for sub-pages
   (services detail, product catalog, blog, branches, faqs, about)
   No hooks here — data only, safe to load anywhere after lib.jsx.
   ============================================================ */
const RIMG = 'assets/remix/';

/* ---------- SERVICES (full detail) ---------- */
const servicesData = [
  {
    id: 'flagship', slug: 'service-detail.html', group: 'FLAGSHIP · Dịch vụ chủ lực', icon: 'Clipboard',
    name: 'Thiết kế Routine Skincare Cá nhân hóa',
    tagline: 'Đọc vị làn da chuyên sâu — xây phác đồ riêng cho từng cơ địa.',
    duration: '60 phút phân tích + Đồng hành trọn liệu trình', price: 'Tư vấn miễn phí', priceNote: 'khi đồng hành cùng sản phẩm điều trị',
    img: RIMG + 'clinic-treatment.png',
    summary: 'Không có một routine chung cho tất cả. ThS. DS. Hoàng Hồng Thắm trực tiếp đọc vị nền da, hàng rào bảo vệ và khả năng thích nghi hoạt chất của riêng bạn, rồi thiết kế chu trình chăm sóc cá nhân hóa — điều chỉnh liên tục theo từng giai đoạn phục hồi.',
    forWhom: ['Người mới bắt đầu chưa biết chọn sản phẩm phù hợp', 'Da đang gặp nhiều vấn đề chồng chéo, dùng nhiều sản phẩm không hiệu quả', 'Khách kiều bào muốn được theo dõi từ xa bài bản'],
    problems: ['Mua sản phẩm theo trend nhưng không hợp da', 'Routine rườm rà, kích ứng, không thấy cải thiện', 'Không ai theo dõi và tinh chỉnh khi da thay đổi'],
    steps: [
      { title: 'Đọc vị làn da', desc: 'Phân tích nền da, độ ẩm, hàng rào lipid và lịch sử sử dụng sản phẩm trong 60 phút trực tiếp hoặc qua video call.' },
      { title: 'Thiết kế phác đồ', desc: 'Dược sĩ Thắm xây routine AM/PM riêng, chọn đúng hoạt chất và nồng độ phù hợp cơ địa, tránh tối đa kích ứng.' },
      { title: 'Đồng hành & tinh chỉnh', desc: 'Theo dõi tiến triển hàng tuần qua Zalo/Messenger, điều chỉnh sản phẩm khi da bước sang giai đoạn mới.' },
    ],
    includes: ['Phiên đọc vị da 60 phút cùng Founder', 'Phác đồ AM/PM cá nhân hóa bằng văn bản', 'Theo dõi & tinh chỉnh trọn liệu trình', 'Tư vấn từ xa qua Zalo / Messenger'],
    results: ['Routine gọn, đúng nhu cầu', 'Giảm kích ứng do dùng sai hoạt chất', 'Da ổn định và cải thiện bền vững'],
  },
  {
    id: 'acne', slug: 'service-detail.html', group: 'Acne Care', icon: 'Droplet',
    name: 'Phục hồi da mụn & Kiểm soát bã nhờn',
    tagline: 'Kháng viêm tầng sâu, thông thoáng cổ nang lông, kiểm soát dầu thừa.',
    duration: '75 phút', price: '750.000đ', priceNote: '/ buổi điều trị',
    img: RIMG + 'model-glow.png',
    summary: 'Liệu trình tập trung làm sạch sâu, kháng viêm và cân bằng tuyến bã nhờn cho da mụn ẩn, mụn viêm. Kết hợp dược mỹ phẩm chọn lọc cùng thao tác lâm sàng nhẹ nhàng, hạn chế tổn thương và nguy cơ sẹo.',
    forWhom: ['Da mụn ẩn, mụn viêm, bít tắc lâu năm', 'Da dầu, lỗ chân lông to', 'Da đang lệ thuộc sản phẩm trị mụn mạnh'],
    problems: ['Mụn tái đi tái lại không dứt điểm', 'Nặn mụn sai cách để lại thâm sẹo', 'Da vừa đổ dầu vừa khô căng do mất nước'],
    steps: [
      { title: 'Soi & đánh giá', desc: 'Xác định loại mụn, mức độ viêm và tình trạng hàng rào bảo vệ trước khi can thiệp.' },
      { title: 'Làm sạch & kháng viêm', desc: 'Lấy nhân mụn chuẩn y khoa, kháng viêm tầng sâu, kiểm soát dầu bằng hoạt chất dịu nhẹ.' },
      { title: 'Phục hồi & hướng dẫn', desc: 'Phục hồi màng ẩm và xây routine tại nhà giúp duy trì kết quả, ngăn mụn quay lại.' },
    ],
    includes: ['Soi da & tư vấn cùng kỹ thuật viên', 'Lấy nhân mụn chuẩn y khoa', 'Đắp mặt nạ kháng viêm phục hồi', 'Hướng dẫn chăm sóc tại nhà'],
    results: ['Giảm sưng viêm rõ rệt', 'Kiểm soát dầu, thông thoáng lỗ chân lông', 'Hạn chế thâm và sẹo mới'],
  },
  {
    id: 'pigment', slug: 'service-detail.html', group: 'Pigment Care', icon: 'Sun',
    name: 'Điều trị nám chuyên sâu & Sáng da toàn diện',
    tagline: 'Ức chế melanin, làm đều màu, trả lại làn da sáng khỏe từ bên trong.',
    duration: '90 phút', price: '1.200.000đ', priceNote: '/ buổi điều trị',
    img: RIMG + 'herb-mix.png',
    summary: 'Phác đồ xử lý nám, tàn nhang, sạm màu bằng cơ chế ức chế melanin kết hợp dưỡng sáng và củng cố hàng rào bảo vệ. Đề cao sự an toàn, tránh bào mòn da — phù hợp cả với da nhạy cảm.',
    forWhom: ['Nám mảng, nám sâu, tàn nhang', 'Da xỉn màu, không đều màu', 'Thâm sau mụn lâu ngày'],
    problems: ['Nám đậm hơn sau khi dùng kem trộn', 'Da mỏng yếu vì lột tẩy quá mức', 'Sạm trở lại do thiếu chống nắng đúng cách'],
    steps: [
      { title: 'Phân tích sắc tố', desc: 'Đánh giá loại nám, độ sâu sắc tố và tình trạng nền da để chọn cường độ phù hợp.' },
      { title: 'Điều trị làm sáng', desc: 'Ứng dụng hoạt chất ức chế melanin và dưỡng sáng theo từng tầng, kết hợp công nghệ hỗ trợ.' },
      { title: 'Bảo vệ & duy trì', desc: 'Xây thói quen chống nắng đủ lượng và routine dưỡng sáng bền vững tại nhà.' },
    ],
    includes: ['Phân tích sắc tố chuyên sâu', 'Liệu trình dưỡng sáng theo tầng', 'Mặt nạ phục hồi & làm dịu', 'Phác đồ chống nắng cá nhân hóa'],
    results: ['Nám mờ dần, đều màu hơn', 'Da sáng khỏe tự nhiên', 'Hạn chế tái sạm về sau'],
  },
  {
    id: 'aging', slug: 'service-detail.html', group: 'Anti-Aging', icon: 'Sparkles',
    name: 'Trẻ hóa chuyên sâu & Nâng cơ tức thì',
    tagline: 'Kích hoạt collagen, nâng đỡ đường nét, trả lại độ căng mướt cho da.',
    duration: '80 phút', price: '1.500.000đ', priceNote: '/ buổi điều trị',
    img: RIMG + 'wellness-spa.png',
    summary: 'Liệu trình trẻ hóa kết hợp hoạt chất tái cấu trúc và thao tác nâng cơ, cải thiện nếp nhăn, độ đàn hồi và đường viền khuôn mặt. Hướng tới vẻ tươi trẻ tự nhiên, không cứng đơ.',
    forWhom: ['Da bắt đầu chùng nhão, giảm đàn hồi', 'Nếp nhăn li ti, rãnh nhăn động', 'Da khô ráp, thiếu sức sống tuổi 30+'],
    problems: ['Da xuống cấp nhanh sau 35 tuổi', 'Dưỡng nhiều nhưng vẫn thiếu độ căng', 'Lo ngại can thiệp xâm lấn mạnh'],
    steps: [
      { title: 'Đánh giá lão hóa', desc: 'Xác định loại nếp nhăn, độ đàn hồi và vùng cần nâng đỡ trên khuôn mặt.' },
      { title: 'Tái cấu trúc & nâng cơ', desc: 'Ứng dụng hoạt chất kích hoạt collagen kết hợp thao tác nâng cơ, điện di dưỡng chất.' },
      { title: 'Duy trì độ trẻ', desc: 'Thiết kế routine chống lão hóa tại nhà giúp giữ kết quả lâu dài.' },
    ],
    includes: ['Đánh giá lão hóa chi tiết', 'Liệu trình tái cấu trúc & nâng cơ', 'Điện di tinh chất trẻ hóa', 'Phác đồ chống lão hóa tại nhà'],
    results: ['Da căng mướt, đàn hồi hơn', 'Đường nét gọn gàng tức thì', 'Cải thiện nếp nhăn theo thời gian'],
  },
];

/* ---------- PRODUCT CATALOG (shop) ---------- */
const productCatalog = [
  { id: 'pc1', brand: 'Hydrinity · USA', name: 'Restorative HA Serum', type: 'Serum', skin: ['Da khô', 'Da nhạy cảm', 'Da hỗn hợp'], price: 2890000, oldPrice: null, badge: 'Bán chạy', img: 'assets/product-hydrinity.png', rating: 5, reviews: 124, desc: 'Serum Hyaluronic Acid đa phân tử cấp nước sâu, phục hồi hàng rào ẩm cho da khô và mất nước.' },
  { id: 'pc2', brand: 'Osmosis MD · USA', name: 'Rescue Epidermal Repair', type: 'Serum', skin: ['Da nhạy cảm', 'Da khô'], price: 3250000, oldPrice: null, badge: 'Mới', img: 'assets/product-osmosis.png', rating: 5, reviews: 86, desc: 'Tinh chất phục hồi tổn thương biểu bì, làm dịu mẩn đỏ cho da yếu sau treatment.' },
  { id: 'pc3', brand: 'Vi Derm · USA', name: 'Dark Spot Lifting Serum', type: 'Serum', skin: ['Da hỗn hợp', 'Da dầu'], price: 2490000, oldPrice: null, badge: null, img: 'assets/product-viderm.png', rating: 5, reviews: 73, desc: 'Serum làm mờ thâm nám, dưỡng sáng và đều màu da nhờ hoạt chất ức chế melanin.' },
  { id: 'pc4', brand: 'Nescens · Switzerland', name: 'Cell-Soft Toning Lotion', type: 'Toner', skin: ['Da khô', 'Da hỗn hợp'], price: 1890000, oldPrice: 2220000, badge: '−15%', img: 'assets/product-nescens.jpg', rating: 4, reviews: 58, desc: 'Toner cân bằng và cấp ẩm dịu nhẹ, chuẩn bị nền da hấp thu dưỡng chất tốt hơn.' },
  { id: 'pc5', brand: 'Hydrinity · USA', name: 'Hyacical HA Daily Serum', type: 'Serum', skin: ['Da hỗn hợp', 'Da dầu'], price: 2390000, oldPrice: null, badge: null, img: 'assets/product-ha-serum.png', rating: 5, reviews: 41, desc: 'Serum dưỡng ẩm thường ngày, mỏng nhẹ thẩm thấu nhanh cho da hỗn hợp.' },
  { id: 'pc6', brand: 'Neoderma · Netherlands', name: 'Balancing Clarity Toner', type: 'Toner', skin: ['Da dầu', 'Da hỗn hợp'], price: 1650000, oldPrice: null, badge: null, img: 'assets/product-neoderma.png', rating: 4, reviews: 37, desc: 'Toner thông thoáng cổ nang lông, kiểm soát dầu thừa cho da dầu mụn.' },
  { id: 'pc7', brand: 'Biologique Recherche · FR', name: 'Sérum Ampoule Concentré', type: 'Serum', skin: ['Da khô', 'Da hỗn hợp'], price: 3650000, oldPrice: null, badge: 'Cao cấp', img: RIMG + 'product-ampoule.png', rating: 5, reviews: 52, desc: 'Ampoule cô đặc tái thiết sinh học, phục hồi và làm rạng rỡ làn da chuyên sâu.' },
  { id: 'pc8', brand: 'Biologique Recherche · FR', name: 'Crème Restructurante', type: 'Kem dưỡng', skin: ['Da khô', 'Da nhạy cảm'], price: 2980000, oldPrice: null, badge: null, img: RIMG + 'product-cream.png', rating: 5, reviews: 64, desc: 'Kem dưỡng tái cấu trúc, nuôi dưỡng và khóa ẩm cho làn da mềm mướt.' },
  { id: 'pc9', brand: 'La Roche-Posay · FR', name: 'Effaclar Purifying Foam', type: 'Sữa rửa mặt', skin: ['Da dầu', 'Da hỗn hợp'], price: 520000, oldPrice: null, badge: 'Bán chạy', img: RIMG + 'product-foam.png', rating: 4, reviews: 198, desc: 'Gel rửa mặt tạo bọt làm sạch sâu, kiểm soát dầu dịu nhẹ cho da dầu mụn.' },
  { id: 'pc10', brand: 'Osmosis MD · USA', name: 'Barrier Repair Cream', type: 'Kem dưỡng', skin: ['Da nhạy cảm', 'Da khô'], price: 2150000, oldPrice: 2530000, badge: '−15%', img: RIMG + 'product-repair.png', rating: 5, reviews: 47, desc: 'Kem phục hồi hàng rào bảo vệ, làm dịu và củng cố da mỏng yếu, dễ kích ứng.' },
];
const productTypes = ['Serum', 'Toner', 'Kem dưỡng', 'Sữa rửa mặt'];
const skinTypes = ['Da dầu', 'Da khô', 'Da hỗn hợp', 'Da nhạy cảm'];

/* ---------- BLOG POSTS ---------- */
const blogPosts = [
  { id: 'b1', slug: 'blog-post.html', category: 'Hoạt chất', date: 'Ngày 02 Tháng 09, 2026', readTime: '6 phút đọc', img: RIMG + 'clinic-treatment.png', author: 'ThS. DS. Hoàng Hồng Thắm', featured: true,
    title: 'Hàng rào bảo vệ da: nền tảng của mọi làn da khỏe', excerpt: 'Vì sao phục hồi hàng rào bảo vệ luôn là bước đầu tiên trong mọi phác đồ tại Lennie? Cùng đọc vị cơ chế mất nước xuyên biểu bì và cách củng cố màng lipid đúng khoa học.' },
  { id: 'b2', slug: 'blog-post.html', category: 'Routine', date: 'Ngày 24 Tháng 08, 2026', readTime: '5 phút đọc', img: RIMG + 'wellness-spa.png', author: 'DS. Mai Phương Anh',
    title: 'Cá nhân hóa routine: vì sao không có công thức chung', excerpt: 'Mỗi làn da là một cơ địa riêng. Bài viết phân tích vì sao việc sao chép routine của người khác có thể khiến da bạn tệ hơn.' },
  { id: 'b3', slug: 'blog-post.html', category: 'Kiến thức da liễu', date: 'Ngày 15 Tháng 08, 2026', readTime: '7 phút đọc', img: RIMG + 'model-glow.png', author: 'ThS. BS. Lê Hoài Nam',
    title: 'Nám và tăng sắc tố: hiểu đúng để điều trị an toàn', excerpt: 'Phân biệt nám mảng, nám sâu, tàn nhang và tăng sắc tố sau viêm — cùng nguyên tắc điều trị an toàn không bào mòn da.' },
  { id: 'b4', slug: 'blog-post.html', category: 'Câu chuyện phục hồi', date: 'Ngày 04 Tháng 08, 2026', readTime: '4 phút đọc', img: RIMG + 'herb-mix.png', author: 'Lennie SkinLab',
    title: 'Hành trình phục hồi da mụn viêm sau 6 tuần', excerpt: 'Câu chuyện thật về một khách hàng đồng hành cùng Dược sĩ Thắm, từ làn da sưng viêm đến phục hồi khỏe mạnh.' },
  { id: 'b5', slug: 'blog-post.html', category: 'Hoạt chất', date: 'Ngày 28 Tháng 07, 2026', readTime: '6 phút đọc', img: 'assets/lennie-feature.jpg', author: 'ThS. DS. Đỗ Hải Yến',
    title: 'Retinol cho người mới: bắt đầu thế nào cho đúng', excerpt: 'Hướng dẫn làm quen với retinol mà không gây kích ứng — nồng độ, tần suất và cách kết hợp dưỡng ẩm.' },
  { id: 'b6', slug: 'blog-post.html', category: 'Routine', date: 'Ngày 19 Tháng 07, 2026', readTime: '5 phút đọc', img: RIMG + 'clinic-treatment.png', author: 'DS. Phạm Thành Nam',
    title: 'Chống nắng đúng cách: bước quan trọng nhất', excerpt: 'Lượng dùng, chỉ số và thói quen apply lại — những điều quyết định hiệu quả thật sự của kem chống nắng.' },
];
const blogCategories = ['Tất cả', 'Kiến thức da liễu', 'Hoạt chất', 'Routine', 'Câu chuyện phục hồi'];

/* ---------- BRANCHES ---------- */
const branches = [
  { name: 'TP. Hồ Chí Minh', tag: 'Clinic chính', address: 'Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP.HCM', note: '[Số nhà cụ thể — chờ client xác nhận]', phone: '+84 909 123 456', hours: 'T2 – T7 · 8:00 – 20:00' },
  { name: 'Hà Nội Flagship', tag: 'Clinic', address: 'Hà Nội Flagship Clinic', note: '[Địa chỉ cụ thể — chờ client cung cấp]', phone: '+84 909 123 456', hours: 'T2 – T7 · 8:00 – 20:00' },
  { name: 'Tư vấn từ xa', tag: 'Online toàn cầu', address: 'Phục vụ khách kiều bào tại Mỹ, Hàn, Nhật, châu Âu, Singapore', note: 'Qua Zalo / Messenger', phone: '+84 909 123 456', hours: 'Linh hoạt theo múi giờ' },
];

/* ---------- FAQ ---------- */
const faqs = [
  { q: 'Lennie SkinLab có gì khác biệt so với spa thông thường?', a: 'Mỗi khách hàng được ThS. DS. Hoàng Hồng Thắm trực tiếp đọc vị làn da và thiết kế phác đồ cá nhân hóa — không áp dụng một routine chung. Chúng tôi đề cao chuyên môn hoạt chất, sự minh bạch và đồng hành lâu dài.' },
  { q: 'Tôi ở nước ngoài có được tư vấn không?', a: 'Có. Lennie phục vụ khách kiều bào tại Mỹ, Hàn, Nhật, châu Âu, Singapore qua hình thức tư vấn và theo dõi từ xa bằng Zalo / Messenger.' },
  { q: 'Chi phí thăm khám và theo dõi tính thế nào?', a: 'Lennie minh bạch chi phí, không phát sinh phí thăm khám hay theo dõi riêng. Với dịch vụ thiết kế routine, bạn được tư vấn miễn phí khi đồng hành cùng sản phẩm điều trị.' },
  { q: 'Đặt lịch tại cơ sở như thế nào?', a: 'Bạn có thể đặt lịch trực tiếp trên website, hoặc liên hệ qua Messenger / Zalo / SĐT. Đội ngũ sẽ xác nhận lại khung giờ với bạn.' },
  { q: 'Lennie cam kết kết quả ra sao?', a: 'Chúng tôi không hứa hẹn kết quả tuyệt đối. Chăm da là một hành trình — Lennie cam kết đồng hành đúng cách, minh bạch về khả năng cải thiện và điều chỉnh phác đồ theo tiến triển thực tế của bạn.' },
];

/* ---------- BRAND VALUES (about) ---------- */
const brandValues = [
  { title: 'Cá nhân hóa', desc: 'Mỗi làn da được đọc vị riêng và xây liệu trình phù hợp từng cơ địa, từng thời điểm.', icon: 'User' },
  { title: 'Chuyên môn', desc: 'Ứng dụng dược mỹ phẩm chính xác, an toàn, không chạy theo xu hướng ngắn hạn.', icon: 'Microscope' },
  { title: 'Minh bạch', desc: 'Rõ ràng về sản phẩm, chi phí và khả năng cải thiện — không phóng đại kết quả.', icon: 'Shield' },
  { title: 'Bền vững', desc: 'Hướng tới làn da khỏe từ gốc và đồng hành lâu dài, thay vì hiệu quả tức thời.', icon: 'Leaf' },
];

const founderTimeline = [
  { year: '2019', title: 'Khởi nguồn Lennie SkinLab', desc: 'Ra đời từ triết lý cá nhân hóa, đặt chuyên môn dược mỹ phẩm làm gốc.' },
  { year: '2021', title: 'Mở rộng theo dõi từ xa', desc: 'Phục vụ khách kiều bào toàn cầu qua mô hình tư vấn và đồng hành trực tuyến.' },
  { year: '2023', title: 'Hợp tác 50+ thương hiệu', desc: 'Liên kết ủy quyền trực tiếp với các nhãn dược mỹ phẩm quốc tế hàng đầu.' },
  { year: '2026', title: '1.200+ khách hàng đồng hành', desc: '98% tỷ lệ phục hồi thành công và liên tục được giới thiệu người thân.' },
];

Object.assign(window, {
  servicesData, productCatalog, productTypes, skinTypes,
  blogPosts, blogCategories, branches, faqs, brandValues, founderTimeline,
});
