/**
 * Seed placeholder product reviews for each product SKU.
 * Idempotent: skips products that already have reviews.
 *
 * Usage:
 *   node scripts/seed-product-reviews.js
 *   DRY_RUN=1 node scripts/seed-product-reviews.js
 */
'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const DRY_RUN = process.env.DRY_RUN === '1';

// reviewers[i % reviewers.length] is assigned round-robin per product
const REVIEWERS = [
  'Nguyễn Thanh Hà', 'Trần Minh Tú', 'Lê Thị Thu', 'Phạm Ngọc Lan',
  'Vũ Hoàng Anh', 'Đặng Thị Mai', 'Bùi Thúy Nga', 'Hoàng Minh Châu',
];

// Reviews per product slug
const REVIEWS = {
  'restorative-ha-serum': [
    { stars: 5, comment: 'Serum cực kỳ nhẹ nhàng, thẩm thấu nhanh và không gây bít tắc lỗ chân lông. Da tôi đã căng mọng rõ rệt chỉ sau 2 tuần sử dụng đều đặn mỗi sáng tối.' },
    { stars: 5, comment: 'Tôi có làn da khô và nhạy cảm, đây là serum HA đầu tiên không gây kích ứng cho tôi. Độ ẩm duy trì cả ngày, không cần thoa lại.' },
    { stars: 4, comment: 'Sản phẩm rất tốt, mùi dễ chịu và không gây nhờn rít. Sẽ mua lại lần sau.' },
  ],
  'rescue-epidermal-repair': [
    { stars: 5, comment: 'Da tôi bị kích ứng sau khi dùng retinol mạnh, và sản phẩm này thực sự là cứu cánh. Chỉ sau 3 ngày đắp mỏng mỗi tối, cảm giác rát bỏng giảm hẳn.' },
    { stars: 5, comment: 'Texture nhẹ như gel nhưng phục hồi hàng rào bảo vệ da hiệu quả không ngờ. Rất đáng tiền cho một sản phẩm repair chuyên nghiệp.' },
    { stars: 4, comment: 'Phù hợp với da nhạy cảm, không mùi, không gây đỏ. Tôi dùng sau khi laser và rất hài lòng.' },
  ],
  'dark-spot-lifting-serum': [
    { stars: 5, comment: 'Sau 4 tuần, các vết thâm sau mụn trên má đã mờ đi rõ rệt. Tôi dùng song song với kem chống nắng và kết quả rất khả quan.' },
    { stars: 5, comment: 'Serum trị thâm tốt nhất tôi từng thử. Không gây kích ứng, không bong tróc, tone da đều màu hơn hẳn sau 1 tháng.' },
    { stars: 4, comment: 'Hiệu quả thấy rõ với thâm nâu, thâm đỏ mờ hơi chậm hơn nhưng vẫn cải thiện. Sẽ kiên nhẫn dùng tiếp.' },
  ],
  'cell-soft-toning-lotion': [
    { stars: 5, comment: 'Toner nhẹ nhàng, không cồn, không gây khô căng sau khi dùng. Da tôi trông mịn và sáng hơn hẳn — đây là bước tôi không thể bỏ qua mỗi sáng.' },
    { stars: 5, comment: 'Giúp cân bằng pH rất tốt, các sản phẩm sau thẩm thấu nhanh hơn hẳn. Mùi nhẹ thoải mái, texture nước trong không dính.' },
    { stars: 4, comment: 'Khá ổn cho da hỗn hợp, vùng chữ T bớt bóng dầu sau 2 tuần dùng liên tục.' },
  ],
  'hyacical-ha-daily-serum': [
    { stars: 5, comment: 'Khác hoàn toàn các loại HA thông thường — công thức này giữ ẩm sâu chứ không chỉ bề mặt. Da tôi đang mất nước nay đã phục hồi rõ rệt.' },
    { stars: 5, comment: 'Dùng được quanh năm, kể cả mùa hè. Không nặng mặt, không gây mụn. Tôi đã mua hộp thứ 3 rồi.' },
    { stars: 5, comment: 'Thêm bước này vào routine buổi tối và sáng dậy da căng bóng đẹp lắm. Rất khuyến khích cho da thiếu ẩm kinh niên.' },
  ],
  'balancing-clarity-toner': [
    { stars: 5, comment: 'Toner trị mụn nhưng không làm da khô, không gây bong tróc — điều tôi tìm kiếm bấy lâu. Sau 3 tuần, lỗ chân lông se nhỏ và bớt mụn đầu đen rõ rệt.' },
    { stars: 4, comment: 'Hiệu quả tốt với da dầu mụn, cân bằng vùng chữ T rất ổn. Nếu da khô thì nên thêm toner dưỡng ẩm sau.' },
    { stars: 4, comment: 'Dùng buổi tối sau khi rửa mặt, sáng da bớt nhờn và ít mụn ẩn hơn. Sản phẩm chất lượng, giá hợp lý.' },
  ],
  'serum-ampoule-concentre': [
    { stars: 5, comment: 'Ampoule Valmont cao cấp nhưng xứng đáng từng đồng. Chỉ 2-3 giọt mỗi tối mà sáng dậy da căng mọng như vừa đi spa về.' },
    { stars: 5, comment: 'Tôi mua khi da đang xuống cấp vì stress và thức khuya liên tục. Sau 2 tuần dùng, cộng sự của tôi hỏi tôi đi spa ở đâu vậy.' },
    { stars: 4, comment: 'Hiệu quả rõ ràng, texture sang trọng. Giá cao nhưng lượng dùng rất tiết kiệm nên tính ra cũng ổn.' },
  ],
  'creme-restructurante': [
    { stars: 5, comment: 'Kem dưỡng cho da trưởng thành thực sự. Rich nhưng không bít lỗ chân lông, thẩm thấu tốt và sáng hôm sau da dày dặn căng mướt hẳn.' },
    { stars: 5, comment: 'Tôi 40 tuổi và đây là kem dưỡng tốt nhất từ trước đến nay. Nếp nhăn nhẹ mờ hơn sau 4 tuần, quan trọng là da căng và hydrated rất tốt.' },
    { stars: 4, comment: 'Mùi dễ chịu, texture vừa phải cho da hỗn hợp. Sẽ mua thêm khi hết.' },
  ],
  'effaclar-purifying-foam': [
    { stars: 5, comment: 'Sữa rửa mặt tạo bọt mịn, không gây khô căng sau khi rửa. Phù hợp da dầu mụn, làm sạch kỹ nhưng vẫn giữ được lớp dầu tự nhiên cần thiết.' },
    { stars: 5, comment: 'Tôi dùng được cả khi đang điều trị mụn bằng thuốc bôi mạnh — không bị kích ứng thêm, đây là điều ít sản phẩm làm được.' },
    { stars: 4, comment: 'Lọ 200ml dùng lâu, giá tốt. Bọt mềm mại, không xà phòng hóa quá mức. Rất đáng thử.' },
  ],
  'barrier-repair-cream': [
    { stars: 5, comment: 'Da tôi bị tổn thương hàng rào bảo vệ sau thời gian lạm dụng acid. Sản phẩm này giúp phục hồi nhanh không ngờ — chỉ sau 1 tuần da đã bớt nhạy cảm và ít đỏ hơn nhiều.' },
    { stars: 5, comment: 'Barrier cream nhưng texture nhẹ, không ngộp. Tôi dùng cả ngày lẫn đêm và da dần lấy lại sức đề kháng tự nhiên sau hơn 1 tháng.' },
    { stars: 5, comment: 'Đỉnh của đỉnh cho da kích ứng và mất nước. Tôi đã giới thiệu cho 5 người bạn và ai cũng khen.' },
  ],
};

async function run() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  let created = 0, skipped = 0;

  for (const [slug, reviewList] of Object.entries(REVIEWS)) {
    const product = await app.documents('api::product.product').findFirst({
      filters: { slug: { $eq: slug } },
    });
    if (!product) {
      console.log(`⚠ product not found: ${slug}`);
      continue;
    }

    const existing = await app.documents('api::product-review.product-review').findMany({
      filters: { product: { slug: { $eq: slug } } },
      pageSize: 1,
    });
    if (existing.length) {
      console.log(`skip (already has reviews): ${slug}`);
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`[dry-run] would create ${reviewList.length} review(s) for "${slug}"`);
      continue;
    }

    for (let i = 0; i < reviewList.length; i++) {
      const { stars, comment } = reviewList[i];
      const name = REVIEWERS[(i + Object.keys(REVIEWS).indexOf(slug) * 3) % REVIEWERS.length];
      await app.documents('api::product-review.product-review').create({
        data: { name, stars, comment, verified: true, product: product.documentId },
        status: 'published',
      });
    }
    console.log(`✓ ${reviewList.length} review(s) created for "${slug}"`);
    created += reviewList.length;
  }

  await app.destroy().catch(() => {});
  console.log(`\nDone. ${created} created, ${skipped} product(s) skipped.`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
