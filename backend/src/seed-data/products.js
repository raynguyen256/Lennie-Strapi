'use strict';

/* Ported from `Web Lennie Design/js/data-pages.jsx` (productCatalog, 10 items). */

const fmtVND = (n) => `${n.toLocaleString('vi-VN')}₫`;

const RAW_PRODUCTS = [
  { brand: 'Hydrinity · USA', name: 'Restorative HA Serum', type: 'Serum', skin: ['Da khô', 'Da nhạy cảm', 'Da hỗn hợp'], price: 2890000, oldPrice: null, badge: 'Bán chạy', img: 'product-hydrinity.png', rating: 5, reviews: 124, desc: 'Serum Hyaluronic Acid đa phân tử cấp nước sâu, phục hồi hàng rào ẩm cho da khô và mất nước.' },
  { brand: 'Osmosis MD · USA', name: 'Rescue Epidermal Repair', type: 'Serum', skin: ['Da nhạy cảm', 'Da khô'], price: 3250000, oldPrice: null, badge: 'Mới', img: 'product-osmosis.png', rating: 5, reviews: 86, desc: 'Tinh chất phục hồi tổn thương biểu bì, làm dịu mẩn đỏ cho da yếu sau treatment.' },
  { brand: 'Vi Derm · USA', name: 'Dark Spot Lifting Serum', type: 'Serum', skin: ['Da hỗn hợp', 'Da dầu'], price: 2490000, oldPrice: null, badge: null, img: 'product-viderm.png', rating: 5, reviews: 73, desc: 'Serum làm mờ thâm nám, dưỡng sáng và đều màu da nhờ hoạt chất ức chế melanin.' },
  { brand: 'Nescens · Switzerland', name: 'Cell-Soft Toning Lotion', type: 'Toner', skin: ['Da khô', 'Da hỗn hợp'], price: 1890000, oldPrice: 2220000, badge: '−15%', img: 'product-nescens.jpg', rating: 4, reviews: 58, desc: 'Toner cân bằng và cấp ẩm dịu nhẹ, chuẩn bị nền da hấp thu dưỡng chất tốt hơn.' },
  { brand: 'Hydrinity · USA', name: 'Hyacical HA Daily Serum', type: 'Serum', skin: ['Da hỗn hợp', 'Da dầu'], price: 2390000, oldPrice: null, badge: null, img: 'product-ha-serum.png', rating: 5, reviews: 41, desc: 'Serum dưỡng ẩm thường ngày, mỏng nhẹ thẩm thấu nhanh cho da hỗn hợp.' },
  { brand: 'Neoderma · Netherlands', name: 'Balancing Clarity Toner', type: 'Toner', skin: ['Da dầu', 'Da hỗn hợp'], price: 1650000, oldPrice: null, badge: null, img: 'product-neoderma.png', rating: 4, reviews: 37, desc: 'Toner thông thoáng cổ nang lông, kiểm soát dầu thừa cho da dầu mụn.' },
  { brand: 'Biologique Recherche · FR', name: 'Sérum Ampoule Concentré', type: 'Serum', skin: ['Da khô', 'Da hỗn hợp'], price: 3650000, oldPrice: null, badge: 'Cao cấp', img: 'remix/product-ampoule.png', rating: 5, reviews: 52, desc: 'Ampoule cô đặc tái thiết sinh học, phục hồi và làm rạng rỡ làn da chuyên sâu.' },
  { brand: 'Biologique Recherche · FR', name: 'Crème Restructurante', type: 'Kem dưỡng', skin: ['Da khô', 'Da nhạy cảm'], price: 2980000, oldPrice: null, badge: null, img: 'remix/product-cream.png', rating: 5, reviews: 64, desc: 'Kem dưỡng tái cấu trúc, nuôi dưỡng và khóa ẩm cho làn da mềm mướt.' },
  { brand: 'La Roche-Posay · FR', name: 'Effaclar Purifying Foam', type: 'Sữa rửa mặt', skin: ['Da dầu', 'Da hỗn hợp'], price: 520000, oldPrice: null, badge: 'Bán chạy', img: 'remix/product-foam.png', rating: 4, reviews: 198, desc: 'Gel rửa mặt tạo bọt làm sạch sâu, kiểm soát dầu dịu nhẹ cho da dầu mụn.' },
  { brand: 'Osmosis MD · USA', name: 'Barrier Repair Cream', type: 'Kem dưỡng', skin: ['Da nhạy cảm', 'Da khô'], price: 2150000, oldPrice: 2530000, badge: '−15%', img: 'remix/product-repair.png', rating: 5, reviews: 47, desc: 'Kem phục hồi hàng rào bảo vệ, làm dịu và củng cố da mỏng yếu, dễ kích ứng.' },
];

const productTypes = ['Serum', 'Toner', 'Kem dưỡng', 'Sữa rửa mặt'];
const skinTypes = ['Da dầu', 'Da khô', 'Da hỗn hợp', 'Da nhạy cảm'];

const products = RAW_PRODUCTS.map((p) => ({
  name: p.name,
  brand: p.brand,
  tag: p.skin[0],
  price: fmtVND(p.price),
  oldPrice: p.oldPrice ? fmtVND(p.oldPrice) : '',
  badge: p.badge,
  img: p.img,
  type: p.type,
  skinTypes: p.skin,
  rating: p.rating,
  reviews: p.reviews,
  description: p.desc,
}));

module.exports = { products, productTypes, skinTypes };
