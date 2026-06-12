/* ============================================================
   Lennie SkinLab — full services catalog (30 dịch vụ / 6 nhóm)
   Loaded after data-pages.jsx. Powers services.html + service-detail.html.
   Each category = one page (5 services / page → 6 pages).
   ============================================================ */
const SIMG = 'assets/remix/';

const serviceCategories = [
  { id: 'consult',  name: 'Tư vấn & Phác đồ',       icon: 'Clipboard', img: SIMG + 'clinic-treatment.png' },
  { id: 'acne',     name: 'Điều trị mụn',            icon: 'Droplet',   img: SIMG + 'model-glow.png' },
  { id: 'pigment',  name: 'Nám & Sắc tố',            icon: 'Sun',       img: SIMG + 'herb-mix.png' },
  { id: 'aging',    name: 'Trẻ hóa & Nâng cơ',       icon: 'Sparkles',  img: SIMG + 'wellness-spa.png' },
  { id: 'recovery', name: 'Phục hồi & Chuyên sâu',   icon: 'Shield',    img: SIMG + 'clinic-treatment.png' },
  { id: 'care',     name: 'Chăm sóc & Thư giãn',     icon: 'Heart',     img: SIMG + 'wellness-spa.png' },
];

/* per-category default rich detail (used by service-detail page) */
const CAT_DEFAULTS = {
  consult: {
    icon: 'Clipboard', img: SIMG + 'clinic-treatment.png',
    forWhom: ['Người mới bắt đầu chưa biết chọn sản phẩm phù hợp', 'Da gặp nhiều vấn đề chồng chéo, dùng nhiều sản phẩm không hiệu quả', 'Khách kiều bào muốn được theo dõi từ xa bài bản'],
    problems: ['Mua sản phẩm theo trend nhưng không hợp da', 'Routine rườm rà, kích ứng, không cải thiện', 'Không ai theo dõi và tinh chỉnh khi da thay đổi'],
    steps: [
      { title: 'Đọc vị làn da', desc: 'Phân tích nền da, độ ẩm, hàng rào lipid và lịch sử sử dụng sản phẩm — trực tiếp hoặc qua video call.' },
      { title: 'Thiết kế phác đồ', desc: 'Dược sĩ xây routine AM/PM riêng, chọn đúng hoạt chất và nồng độ phù hợp cơ địa, hạn chế kích ứng.' },
      { title: 'Đồng hành & tinh chỉnh', desc: 'Theo dõi tiến triển hàng tuần qua Zalo/Messenger, điều chỉnh khi da sang giai đoạn mới.' },
    ],
    includes: ['Phiên đọc vị da cùng chuyên gia', 'Phác đồ AM/PM cá nhân hóa bằng văn bản', 'Theo dõi & tinh chỉnh trọn liệu trình', 'Tư vấn từ xa qua Zalo / Messenger'],
    results: ['Routine gọn, đúng nhu cầu', 'Giảm kích ứng do dùng sai hoạt chất', 'Da ổn định và cải thiện bền vững'],
  },
  acne: {
    icon: 'Droplet', img: SIMG + 'model-glow.png',
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
  pigment: {
    icon: 'Sun', img: SIMG + 'herb-mix.png',
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
  aging: {
    icon: 'Sparkles', img: SIMG + 'wellness-spa.png',
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
  recovery: {
    icon: 'Shield', img: SIMG + 'clinic-treatment.png',
    forWhom: ['Da mỏng yếu, dễ kích ứng mẩn đỏ', 'Da tổn thương sau lột tẩy / treatment mạnh', 'Da mất nước, bong tróc, châm chích'],
    problems: ['Hàng rào bảo vệ suy yếu, da nhạy cảm', 'Đỏ rát, ngứa khi đổi thời tiết hoặc sản phẩm', 'Da phụ thuộc corticoid, kích ứng kéo dài'],
    steps: [
      { title: 'Đánh giá tổn thương', desc: 'Soi tình trạng hàng rào bảo vệ, độ ẩm và mức độ nhạy cảm của làn da.' },
      { title: 'Làm dịu & phục hồi', desc: 'Cấp ẩm đa tầng, làm dịu và tái thiết màng lipid bằng hoạt chất an toàn, không lột tẩy.' },
      { title: 'Củng cố & ổn định', desc: 'Xây routine tối giản giúp da khỏe dần, tăng sức đề kháng trước khi điều trị chuyên sâu.' },
    ],
    includes: ['Đánh giá hàng rào bảo vệ da', 'Liệu trình cấp ẩm & làm dịu chuyên sâu', 'Mặt nạ phục hồi sinh học', 'Routine tối giản phục hồi tại nhà'],
    results: ['Da bớt đỏ rát, ổn định hơn', 'Hàng rào bảo vệ khỏe, giữ ẩm tốt', 'Giảm nhạy cảm, sẵn sàng cho điều trị tiếp theo'],
  },
  care: {
    icon: 'Heart', img: SIMG + 'wellness-spa.png',
    forWhom: ['Người cần thư giãn & chăm sóc da định kỳ', 'Da xỉn màu, mệt mỏi vì stress, thiếu ngủ', 'Khách chuẩn bị cho sự kiện, cưới hỏi'],
    problems: ['Da thiếu sức sống, kém tươi tắn', 'Bụi bẩn, bã nhờn tích tụ gây bít tắc', 'Cần làn da rạng rỡ tức thì cho dịp quan trọng'],
    steps: [
      { title: 'Làm sạch & thư giãn', desc: 'Làm sạch sâu nhẹ nhàng kết hợp massage thư giãn giúp da và tinh thần thả lỏng.' },
      { title: 'Nuôi dưỡng chuyên sâu', desc: 'Đắp mặt nạ và bổ sung dưỡng chất theo nhu cầu, đánh thức làn da rạng rỡ.' },
      { title: 'Hoàn thiện & duy trì', desc: 'Khóa ẩm, chống nắng và gợi ý chăm sóc duy trì vẻ tươi tắn tại nhà.' },
    ],
    includes: ['Làm sạch sâu & tẩy tế bào chết dịu nhẹ', 'Massage thư giãn nâng cơ', 'Mặt nạ dưỡng chuyên sâu', 'Khóa ẩm & chống nắng hoàn thiện'],
    results: ['Da sạch thoáng, mềm mịn tức thì', 'Rạng rỡ, tươi tắn hơn', 'Thư giãn, giảm căng thẳng'],
  },
};

const RAW_SERVICES = [
  /* 1 — Tư vấn & Phác đồ */
  { id: 'flagship', cat: 'consult', name: 'Thiết kế Routine Skincare Cá nhân hóa', flagship: true, tagline: 'Đọc vị làn da chuyên sâu — xây phác đồ riêng cho từng cơ địa.', duration: '60 phút phân tích + Đồng hành trọn liệu trình', price: 'Tư vấn miễn phí', priceNote: 'khi đồng hành cùng sản phẩm điều trị', summary: 'Không có một routine chung cho tất cả. Chuyên gia trực tiếp đọc vị nền da, hàng rào bảo vệ và khả năng thích nghi hoạt chất của riêng bạn, rồi thiết kế chu trình chăm sóc cá nhân hóa — điều chỉnh liên tục theo từng giai đoạn phục hồi.' },
  { id: 'consult-online', cat: 'consult', name: 'Tư vấn da từ xa cho khách kiều bào', tagline: 'Đọc vị và theo dõi làn da bài bản qua Zalo / Messenger.', duration: '45 phút/phiên', price: 'Tư vấn miễn phí', priceNote: 'khi đồng hành cùng sản phẩm', summary: 'Dành cho khách hàng tại Mỹ, Hàn, Nhật, châu Âu, Singapore — Lennie đọc vị làn da qua video call, thiết kế phác đồ và theo dõi tiến triển từ xa, gửi sản phẩm chính hãng tận nơi.' },
  { id: 'skin-analysis', cat: 'consult', name: 'Soi da & Phân tích chuyên sâu', tagline: 'Đánh giá nền da, độ ẩm và hàng rào lipid bằng thiết bị soi da.', duration: '40 phút', price: '300.000đ', priceNote: 'khấu trừ khi dùng liệu trình', summary: 'Phiên soi da chi tiết giúp bạn hiểu đúng tình trạng làn da: loại da, độ ẩm, mức dầu, sắc tố và tổn thương hàng rào bảo vệ — nền tảng để xây dựng một phác đồ chính xác.' },
  { id: 'plan-followup', cat: 'consult', name: 'Theo dõi & Tinh chỉnh phác đồ định kỳ', tagline: 'Đồng hành sát sao, điều chỉnh routine theo từng giai đoạn da.', duration: 'Hàng tuần / Hàng tháng', price: 'Miễn phí', priceNote: 'cho khách đang theo liệu trình', summary: 'Làn da thay đổi theo thời gian và môi trường. Lennie theo dõi tiến triển định kỳ, lắng nghe phản hồi và tinh chỉnh sản phẩm, nồng độ, tần suất để bạn luôn đi đúng hướng.' },
  { id: 'product-advice', cat: 'consult', name: 'Tư vấn chọn mua sản phẩm lẻ', tagline: 'Chọn đúng sản phẩm hợp da thay vì mua theo cảm tính.', duration: '30 phút', price: 'Tư vấn miễn phí', priceNote: '', summary: 'Bạn đã có routine nhưng phân vân nên thêm hoặc thay sản phẩm nào? Lennie tư vấn chọn đúng sản phẩm lẻ phù hợp tình trạng và ngân sách, tránh xung đột hoạt chất.' },

  /* 2 — Điều trị mụn */
  { id: 'acne-hidden', cat: 'acne', name: 'Phục hồi da mụn ẩn & Bít tắc', tagline: 'Thông thoáng cổ nang lông, làm sạch nhân mụn ẩn dai dẳng.', duration: '75 phút', price: '750.000đ', priceNote: '/ buổi', summary: 'Liệu trình tập trung làm sạch sâu và thông thoáng cổ nang lông cho da mụn ẩn, sần sùi. Kết hợp dược mỹ phẩm chọn lọc cùng thao tác lấy nhân mụn chuẩn y khoa, hạn chế tổn thương.' },
  { id: 'acne-inflam', cat: 'acne', name: 'Điều trị mụn viêm & Mụn mủ', tagline: 'Kháng viêm tầng sâu, kiểm soát mụn sưng đỏ, mụn mủ.', duration: '80 phút', price: '850.000đ', priceNote: '/ buổi', summary: 'Phác đồ kháng viêm chuyên sâu cho da mụn viêm, mụn mủ. Giảm sưng đỏ, làm dịu tổn thương và kiểm soát vi khuẩn, hạn chế tối đa nguy cơ thâm và sẹo lõm.' },
  { id: 'acne-oil', cat: 'acne', name: 'Kiểm soát dầu & Thu nhỏ lỗ chân lông', tagline: 'Cân bằng tuyến bã nhờn, se khít lỗ chân lông to.', duration: '70 phút', price: '700.000đ', priceNote: '/ buổi', summary: 'Liệu trình cân bằng dầu - nước, làm sạch sâu và se khít lỗ chân lông cho da dầu. Kết hợp hoạt chất kiềm dầu dịu nhẹ giúp da thông thoáng mà không bị khô căng.' },
  { id: 'acne-scar', cat: 'acne', name: 'Xử lý thâm & Sẹo sau mụn', tagline: 'Làm mờ thâm đỏ, thâm nâu và cải thiện sẹo rỗ sau mụn.', duration: '85 phút', price: '950.000đ', priceNote: '/ buổi', summary: 'Sau khi mụn ổn định, liệu trình tập trung tái tạo bề mặt, làm mờ vết thâm và cải thiện sẹo rỗ, trả lại làn da mịn màng và đều màu hơn.' },
  { id: 'acne-back', cat: 'acne', name: 'Điều trị mụn lưng & Body', tagline: 'Làm sạch và kháng viêm cho vùng lưng, ngực, vai.', duration: '75 phút', price: '800.000đ', priceNote: '/ buổi', summary: 'Mụn không chỉ ở mặt. Liệu trình điều trị mụn vùng lưng, ngực, vai — làm sạch sâu, kháng viêm và phục hồi, đặc biệt phù hợp trước mùa cưới hoặc dịp diện trang phục hở vai.' },

  /* 3 — Nám & Sắc tố */
  { id: 'pigment', cat: 'pigment', name: 'Điều trị nám chuyên sâu', tagline: 'Ức chế melanin, làm mờ nám mảng và nám sâu an toàn.', duration: '90 phút', price: '1.200.000đ', priceNote: '/ buổi', summary: 'Phác đồ xử lý nám mảng, nám sâu bằng cơ chế ức chế melanin kết hợp dưỡng sáng và củng cố hàng rào bảo vệ. Đề cao an toàn, tránh bào mòn da — phù hợp cả da nhạy cảm.' },
  { id: 'pigment-freckle', cat: 'pigment', name: 'Làm mờ tàn nhang & Đốm nâu', tagline: 'Giảm tàn nhang, đốm nâu do nắng, trả lại làn da đều màu.', duration: '75 phút', price: '1.000.000đ', priceNote: '/ buổi', summary: 'Tàn nhang và đốm nâu do tích tụ sắc tố và ánh nắng. Liệu trình làm mờ dần các đốm sắc tố, dưỡng sáng và bảo vệ da khỏi tái hình thành.' },
  { id: 'pigment-bright', cat: 'pigment', name: 'Dưỡng sáng & Đều màu da', tagline: 'Đánh thức làn da xỉn màu, trả lại vẻ sáng khỏe rạng rỡ.', duration: '70 phút', price: '900.000đ', priceNote: '/ buổi', summary: 'Dành cho làn da xỉn màu, không đều màu do môi trường và lối sống. Liệu trình dưỡng sáng đa tầng giúp da bừng sáng tự nhiên, đều màu và khỏe khoắn.' },
  { id: 'pigment-pih', cat: 'pigment', name: 'Điều trị thâm sau viêm (PIH)', tagline: 'Làm mờ vết thâm đỏ, thâm nâu còn lại sau mụn và tổn thương.', duration: '70 phút', price: '850.000đ', priceNote: '/ buổi', summary: 'Tăng sắc tố sau viêm khiến vết thâm tồn tại dai dẳng. Liệu trình thúc đẩy tái tạo và ức chế melanin có kiểm soát, làm đều màu vùng da bị thâm.' },
  { id: 'pigment-tone', cat: 'pigment', name: 'Cân bằng sắc tố & Phục hồi sáng', tagline: 'Vừa làm sáng vừa củng cố nền da mỏng yếu vì lột tẩy.', duration: '80 phút', price: '1.100.000đ', priceNote: '/ buổi', summary: 'Nhiều làn da sạm đi kèm mỏng yếu do lạm dụng kem trộn, lột tẩy. Liệu trình kết hợp dưỡng sáng an toàn và phục hồi hàng rào bảo vệ, giúp da vừa sáng vừa khỏe.' },

  /* 4 — Trẻ hóa & Nâng cơ */
  { id: 'aging', cat: 'aging', name: 'Trẻ hóa chuyên sâu & Nâng cơ tức thì', tagline: 'Kích hoạt collagen, nâng đỡ đường nét, trả lại độ căng mướt.', duration: '80 phút', price: '1.500.000đ', priceNote: '/ buổi', summary: 'Liệu trình trẻ hóa kết hợp hoạt chất tái cấu trúc và thao tác nâng cơ, cải thiện nếp nhăn, độ đàn hồi và đường viền khuôn mặt — hướng tới vẻ tươi trẻ tự nhiên, không cứng đơ.' },
  { id: 'aging-collagen', cat: 'aging', name: 'Kích hoạt Collagen chuyên sâu', tagline: 'Thúc đẩy sản sinh collagen, tăng đàn hồi từ tầng sâu.', duration: '85 phút', price: '1.600.000đ', priceNote: '/ buổi', summary: 'Tập trung kích hoạt nguyên bào sợi sản sinh collagen tự nhiên, giúp da dày dặn, đàn hồi và căng mướt hơn theo thời gian — nền tảng của trẻ hóa bền vững.' },
  { id: 'aging-eye', cat: 'aging', name: 'Chăm sóc vùng mắt & Rãnh nhăn', tagline: 'Giảm bọng mắt, quầng thâm và nếp nhăn vùng mắt.', duration: '50 phút', price: '700.000đ', priceNote: '/ buổi', summary: 'Vùng da mắt mỏng manh và lão hóa sớm nhất. Liệu trình chuyên biệt giúp giảm bọng mắt, làm sáng quầng thâm và làm mờ nếp nhăn li ti quanh mắt.' },
  { id: 'aging-firm', cat: 'aging', name: 'Săn chắc & Định hình đường viền', tagline: 'Nâng đỡ vùng má, hàm, cằm cho gương mặt gọn gàng.', duration: '80 phút', price: '1.700.000đ', priceNote: '/ buổi', summary: 'Liệu trình nâng cơ và săn chắc tập trung vào đường viền khuôn mặt — má, hàm, cằm — giúp gương mặt thon gọn, đường nét rõ ràng và trẻ trung hơn.' },
  { id: 'aging-glow', cat: 'aging', name: 'Trẻ hóa cấp nước Glow', tagline: 'Bơm ẩm chuyên sâu, trả lại làn da căng bóng tươi trẻ.', duration: '70 phút', price: '1.200.000đ', priceNote: '/ buổi', summary: 'Da thiếu nước là nguyên nhân khiến nếp nhăn lộ rõ. Liệu trình cấp nước đa tầng giúp da căng mọng, mịn màng và bừng sáng tức thì cho vẻ trẻ trung.' },

  /* 5 — Phục hồi & Chuyên sâu */
  { id: 'recover-barrier', cat: 'recovery', name: 'Phục hồi hàng rào bảo vệ da', tagline: 'Tái thiết màng lipid, trả lại làn da khỏe từ gốc.', duration: '75 phút', price: '900.000đ', priceNote: '/ buổi', summary: 'Mọi làn da khỏe đều bắt đầu từ một hàng rào bảo vệ vững chắc. Liệu trình tái thiết màng lipid, cấp ẩm và làm dịu, giúp da giữ nước tốt và bớt nhạy cảm.' },
  { id: 'recover-sensitive', cat: 'recovery', name: 'Làm dịu da nhạy cảm & Kích ứng', tagline: 'Giảm đỏ rát, châm chích cho làn da đang tổn thương.', duration: '70 phút', price: '850.000đ', priceNote: '/ buổi', summary: 'Dành cho làn da đang đỏ rát, ngứa châm chích, nhạy cảm với mọi sản phẩm. Liệu trình siêu dịu nhẹ giúp làm dịu tức thì và từng bước ổn định lại làn da.' },
  { id: 'recover-postlaser', cat: 'recovery', name: 'Phục hồi sau laser & Treatment', tagline: 'Chăm sóc đúng cách giúp da hồi phục nhanh, hạn chế thâm.', duration: '60 phút', price: '800.000đ', priceNote: '/ buổi', summary: 'Sau các thủ thuật laser, peel hay treatment mạnh, da cần được chăm sóc đúng cách. Liệu trình cấp ẩm, làm dịu và phục hồi giúp da hồi phục nhanh, hạn chế thâm và kích ứng.' },
  { id: 'recover-hydra', cat: 'recovery', name: 'Cấp nước chuyên sâu Hydra', tagline: 'Bù nước đa tầng cho làn da khô căng, mất nước.', duration: '65 phút', price: '750.000đ', priceNote: '/ buổi', summary: 'Da mất nước gây bong tróc, sạm và lão hóa sớm. Liệu trình cấp nước chuyên sâu bổ sung độ ẩm đa tầng, trả lại làn da mềm mướt, căng khỏe.' },
  { id: 'recover-redness', cat: 'recovery', name: 'Giảm mẩn đỏ & Mao mạch', tagline: 'Làm dịu vùng đỏ, giảm lộ mao mạch trên da mỏng.', duration: '70 phút', price: '900.000đ', priceNote: '/ buổi', summary: 'Da mỏng dễ lộ mao mạch và ửng đỏ. Liệu trình củng cố thành mạch, làm dịu và phục hồi giúp giảm tình trạng đỏ, mang lại nền da đều màu và khỏe hơn.' },

  /* 6 — Chăm sóc & Thư giãn */
  { id: 'care-facial', cat: 'care', name: 'Chăm sóc da mặt thư giãn', tagline: 'Làm sạch, dưỡng và massage thư giãn định kỳ.', duration: '60 phút', price: '450.000đ', priceNote: '/ buổi', summary: 'Liệu trình chăm sóc da định kỳ giúp làm sạch, dưỡng ẩm và thư giãn. Kết hợp massage nhẹ nhàng giúp da và tinh thần được thả lỏng sau những ngày bận rộn.' },
  { id: 'care-deepclean', cat: 'care', name: 'Làm sạch sâu & Detox da', tagline: 'Đánh bay bụi mịn, bã nhờn tích tụ, trả lại da thông thoáng.', duration: '65 phút', price: '550.000đ', priceNote: '/ buổi', summary: 'Bụi mịn và bã nhờn tích tụ khiến da xỉn màu, bít tắc. Liệu trình làm sạch sâu và detox giúp da thông thoáng, hấp thu dưỡng chất tốt hơn và tươi sáng hơn.' },
  { id: 'care-mask', cat: 'care', name: 'Đắp mặt nạ dưỡng chuyên sâu', tagline: 'Bổ sung dưỡng chất tập trung theo nhu cầu làn da.', duration: '50 phút', price: '400.000đ', priceNote: '/ buổi', summary: 'Liệu trình đắp mặt nạ chuyên sâu được chọn theo nhu cầu da: cấp ẩm, làm dịu, dưỡng sáng hay phục hồi — bổ sung dưỡng chất tập trung cho làn da rạng rỡ.' },
  { id: 'care-massage', cat: 'care', name: 'Massage nâng cơ thư giãn', tagline: 'Massage dẫn lưu, thư giãn cơ mặt và giảm căng thẳng.', duration: '55 phút', price: '500.000đ', priceNote: '/ buổi', summary: 'Kỹ thuật massage dẫn lưu bạch huyết và nâng cơ giúp giảm sưng, thư giãn cơ mặt và mang lại cảm giác dễ chịu, đồng thời hỗ trợ đường nét gương mặt thon gọn.' },
  { id: 'care-bridal', cat: 'care', name: 'Gói chăm sóc da cô dâu', tagline: 'Lộ trình giúp làn da rạng rỡ nhất cho ngày trọng đại.', duration: 'Lộ trình nhiều buổi', price: 'Theo lộ trình', priceNote: 'tư vấn riêng', summary: 'Một lộ trình chăm sóc được thiết kế riêng cho cô dâu, kết hợp điều trị và chăm sóc chuyên sâu nhiều buổi để làn da đạt trạng thái rạng rỡ, mịn màng nhất cho ngày trọng đại.' },
];

const SVC_IMG_CYCLE = [SIMG + 'clinic-treatment.png', SIMG + 'model-glow.png', SIMG + 'herb-mix.png', SIMG + 'wellness-spa.png'];

const servicesCatalog = RAW_SERVICES.map((s, i) => {
  const cat = serviceCategories.find((c) => c.id === s.cat);
  const def = CAT_DEFAULTS[s.cat];
  return {
    slug: 'service-detail.html',
    group: cat.name,
    icon: s.icon || def.icon,
    img: s.img || SVC_IMG_CYCLE[i % SVC_IMG_CYCLE.length],
    forWhom: s.forWhom || def.forWhom,
    problems: s.problems || def.problems,
    steps: s.steps || def.steps,
    includes: s.includes || def.includes,
    results: s.results || def.results,
    priceNote: s.priceNote || '',
    ...s,
  };
});

/* keep `servicesData` name pointing at full catalog for backward compat */
const servicesDataFull = servicesCatalog;

Object.assign(window, { serviceCategories, servicesCatalog, servicesDataFull });
