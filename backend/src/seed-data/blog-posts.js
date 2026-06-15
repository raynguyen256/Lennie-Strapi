'use strict';

/* Ported from `Web Lennie Design/js/data-pages.jsx` (blogPosts, 6 items).
   Body content for posts 3-5 is newly drafted (marked [PLACEHOLDER] for client review);
   posts 1, 2 and 6 adapt existing body copy from the previous 3-post seed. */

const posts = [
  {
    title: 'Hàng rào bảo vệ da: nền tảng của mọi làn da khỏe',
    category: 'Hoạt chất',
    publishedDate: '2026-09-02',
    readTime: '6 phút đọc',
    author: 'ThS. DS. Hoàng Hồng Thắm',
    featured: true,
    img: 'remix/clinic-treatment.png',
    excerpt: 'Vì sao phục hồi hàng rào bảo vệ luôn là bước đầu tiên trong mọi phác đồ tại Lennie? Cùng đọc vị cơ chế mất nước xuyên biểu bì và cách củng cố màng lipid đúng khoa học.',
    body: [
      'Đội ngũ chuyên môn lâm sàng tại Lennie SkinLab luôn phân tích kỹ lưỡng từng trường hợp trước khi đề xuất bất kỳ phác đồ nào. Với những làn da đang sưng viêm, kích ứng hoặc đỏ rát kéo dài, bước đầu tiên không phải là điều trị mạnh tay mà là phục hồi hàng rào bảo vệ tự nhiên.',
      'ThS. DS. Hoàng Hồng Thắm chia sẻ: việc lạm dụng các hoạt chất lột tẩy mạnh khi da đang tổn thương sẽ khiến tình trạng viêm kéo dài hơn, thậm chí để lại thâm sẹo vĩnh viễn. Vì vậy, mọi liệu trình tại Lennie đều bắt đầu bằng giai đoạn làm dịu và tái cân bằng.',
      'Chỉ khi làn da đã ổn định, đội ngũ mới từng bước đưa vào các hoạt chất đặc trị theo lộ trình tăng dần nồng độ, kết hợp theo dõi sát sao mỗi tuần để đảm bảo da thích ứng tốt và đạt kết quả phục hồi bền vững.',
    ],
  },
  {
    title: 'Cá nhân hóa routine: vì sao không có công thức chung',
    category: 'Routine',
    publishedDate: '2026-08-24',
    readTime: '5 phút đọc',
    author: 'DS. Mai Phương Anh',
    featured: false,
    img: 'remix/wellness-spa.png',
    excerpt: 'Mỗi làn da là một cơ địa riêng. Bài viết phân tích vì sao việc sao chép routine của người khác có thể khiến da bạn tệ hơn.',
    body: [
      'Rất nhiều khách hàng đến với Lennie SkinLab sau khi đã thử qua hàng loạt sản phẩm được quảng cáo "phù hợp mọi loại da" nhưng không mang lại hiệu quả như mong đợi.',
      'Trên thực tế, ngay cả hai làn da có vẻ ngoài tương tự nhau cũng có thể khác biệt hoàn toàn về độ dày biểu bì, mức độ nhạy cảm, khả năng phục hồi và tiền sử sử dụng hoạt chất. Đây là lý do một routine chung khó có thể tối ưu cho tất cả mọi người.',
      'Khi thăm khám tại Lennie, đội ngũ chuyên môn sẽ trực tiếp đọc vị các chỉ số sinh học của da để thiết kế một lộ trình điều chỉnh dần theo phản ứng thực tế — thay vì áp đặt một công thức cố định ngay từ đầu.',
    ],
  },
  {
    title: 'Nám và tăng sắc tố: hiểu đúng để điều trị an toàn',
    category: 'Kiến thức da liễu',
    publishedDate: '2026-08-15',
    readTime: '7 phút đọc',
    author: 'ThS. BS. Lê Hoài Nam',
    featured: false,
    img: 'remix/model-glow.png',
    excerpt: 'Phân biệt nám mảng, nám sâu, tàn nhang và tăng sắc tố sau viêm — cùng nguyên tắc điều trị an toàn không bào mòn da.',
    body: [
      'Nám và các dạng tăng sắc tố thường bị gộp chung làm một, nhưng mỗi loại có cơ chế hình thành và độ sâu sắc tố khác nhau. Nám mảng thường nằm ở lớp biểu bì, trong khi nám sâu và một số trường hợp tàn nhang có thể ăn sâu xuống lớp hạ bì — quyết định cường độ và thời gian điều trị phù hợp.',
      'Tăng sắc tố sau viêm (PIH) là vết thâm còn lại sau mụn hoặc tổn thương da, khác về bản chất với nám nhưng dễ bị nhầm lẫn và điều trị sai cách, khiến vết thâm tồn tại lâu hơn hoặc khiến da mỏng yếu thêm.',
      'Nguyên tắc an toàn khi điều trị sắc tố là ức chế melanin có kiểm soát, song hành với phục hồi hàng rào bảo vệ và chống nắng nghiêm ngặt — tránh các phương pháp lột tẩy mạnh có thể khiến nám đậm hơn về sau.',
      '[PLACEHOLDER - nội dung chi tiết cần đội ngũ chuyên môn Lennie rà soát và bổ sung trước khi đăng]',
    ],
  },
  {
    title: 'Hành trình phục hồi da mụn viêm sau 6 tuần',
    category: 'Câu chuyện phục hồi',
    publishedDate: '2026-08-04',
    readTime: '4 phút đọc',
    author: 'Lennie SkinLab',
    featured: false,
    img: 'remix/herb-mix.png',
    excerpt: 'Câu chuyện thật về một khách hàng đồng hành cùng Dược sĩ Thắm, từ làn da sưng viêm đến phục hồi khỏe mạnh.',
    body: [
      'Khi mới đến với Lennie, làn da của khách hàng đang trong tình trạng mụn viêm sưng đỏ lan rộng, kèm cảm giác đau rát do đã thử qua nhiều sản phẩm trị mụn không phù hợp trước đó.',
      'Trong 2 tuần đầu, phác đồ tập trung làm dịu và kháng viêm, tạm dừng mọi hoạt chất mạnh để ổn định hàng rào bảo vệ. Từ tuần thứ 3, các hoạt chất kiểm soát dầu và ngăn mụn mới được đưa vào với nồng độ tăng dần.',
      'Sau 6 tuần đồng hành, làn da đã giảm sưng viêm rõ rệt, lỗ chân lông thông thoáng hơn và không còn xuất hiện mụn viêm mới — sẵn sàng cho giai đoạn xử lý thâm sẹo tiếp theo.',
      '[PLACEHOLDER - câu chuyện minh họa, cần khách hàng/đội ngũ Lennie xác nhận chi tiết thực tế trước khi đăng]',
    ],
  },
  {
    title: 'Retinol cho người mới: bắt đầu thế nào cho đúng',
    category: 'Hoạt chất',
    publishedDate: '2026-07-28',
    readTime: '6 phút đọc',
    author: 'ThS. DS. Đỗ Hải Yến',
    featured: false,
    img: 'lennie-feature.jpg',
    excerpt: 'Hướng dẫn làm quen với retinol mà không gây kích ứng — nồng độ, tần suất và cách kết hợp dưỡng ẩm.',
    body: [
      'Retinol là một trong những hoạt chất được nghiên cứu kỹ lưỡng nhất trong chăm sóc da, nhưng cũng là hoạt chất dễ gây kích ứng nhất nếu bắt đầu sai cách — đặc biệt với người mới.',
      'Nguyên tắc an toàn là bắt đầu từ nồng độ thấp, sử dụng 2-3 lần mỗi tuần vào buổi tối, và luôn kết hợp với kem dưỡng phục hồi hàng rào bảo vệ để giảm tình trạng khô căng, bong tróc trong giai đoạn đầu.',
      'Chống nắng vào ban ngày là điều kiện bắt buộc khi sử dụng retinol, vì da sẽ nhạy cảm hơn với tia UV. Khi da đã thích nghi, tần suất và nồng độ có thể được tăng dần theo tư vấn của chuyên gia.',
      '[PLACEHOLDER - nội dung chi tiết cần đội ngũ chuyên môn Lennie rà soát và bổ sung trước khi đăng]',
    ],
  },
  {
    title: 'Chống nắng đúng cách: bước quan trọng nhất',
    category: 'Routine',
    publishedDate: '2026-07-19',
    readTime: '5 phút đọc',
    author: 'DS. Phạm Thành Nam',
    featured: false,
    img: 'remix/clinic-treatment.png',
    excerpt: 'Lượng dùng, chỉ số và thói quen apply lại — những điều quyết định hiệu quả thật sự của kem chống nắng.',
    body: [
      'Một làn da khỏe mạnh không đến từ một sản phẩm thần kỳ duy nhất, mà là kết quả của một hệ routine được xây dựng đúng thứ tự, đúng nồng độ và đúng thời điểm — trong đó chống nắng là mắt xích thường bị xem nhẹ nhất.',
      'Lennie SkinLab khuyến khích khách hàng tập trung vào ba trụ cột: làm sạch dịu nhẹ, cấp ẩm đa tầng và bảo vệ da khỏi tia UV mỗi ngày. Đây là nền tảng giúp mọi hoạt chất đặc trị phía sau phát huy hiệu quả tối đa.',
      'Lượng kem chống nắng đủ (khoảng 2 lóng tay cho toàn mặt) và việc apply lại sau 2-3 giờ khi ở ngoài nắng quyết định phần lớn hiệu quả bảo vệ thực tế — quan trọng hơn cả việc chọn chỉ số SPF cao.',
    ],
  },
];

module.exports = { posts };
