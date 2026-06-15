'use strict';

const fs = require('fs');
const path = require('path');

const { categories: serviceCategoriesData, services: servicesCatalog } = require('./seed-data/services');
const { products: productsCatalog } = require('./seed-data/products');
const { posts: blogPostsCatalog } = require('./seed-data/blog-posts');
const { branches: branchesCatalog } = require('./seed-data/branches');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'frontend', 'public', 'assets');

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

const VN_MAP = {
  á: 'a', à: 'a', ả: 'a', ã: 'a', ạ: 'a', ă: 'a', ắ: 'a', ằ: 'a', ẳ: 'a', ẵ: 'a', ặ: 'a', â: 'a', ấ: 'a', ầ: 'a', ẩ: 'a', ẫ: 'a', ậ: 'a',
  đ: 'd',
  é: 'e', è: 'e', ẻ: 'e', ẽ: 'e', ẹ: 'e', ê: 'e', ế: 'e', ề: 'e', ể: 'e', ễ: 'e', ệ: 'e',
  í: 'i', ì: 'i', ỉ: 'i', ĩ: 'i', ị: 'i',
  ó: 'o', ò: 'o', ỏ: 'o', õ: 'o', ọ: 'o', ô: 'o', ố: 'o', ồ: 'o', ổ: 'o', ỗ: 'o', ộ: 'o', ơ: 'o', ớ: 'o', ờ: 'o', ở: 'o', ỡ: 'o', ợ: 'o',
  ú: 'u', ù: 'u', ủ: 'u', ũ: 'u', ụ: 'u', ư: 'u', ứ: 'u', ừ: 'u', ử: 'u', ữ: 'u', ự: 'u',
  ý: 'y', ỳ: 'y', ỷ: 'y', ỹ: 'y', ỵ: 'y',
};

function slugify(input) {
  return String(input)
    .toLowerCase()
    .split('')
    .map((c) => VN_MAP[c] || c)
    .join('')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function blocks(text) {
  return [{ type: 'paragraph', children: [{ type: 'text', text }] }];
}

function blocksFromParagraphs(paragraphs) {
  return paragraphs.map((text) => ({ type: 'paragraph', children: [{ type: 'text', text }] }));
}

async function uploadAsset(strapi, relativePath) {
  const filePath = path.join(ASSETS_DIR, relativePath);
  if (!fs.existsSync(filePath)) {
    strapi.log.warn(`[seed] asset not found, skipping: ${filePath}`);
    return null;
  }
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimetype = MIME_TYPES[ext] || 'application/octet-stream';
  const fileData = {
    filepath: filePath,
    path: filePath,
    originalFilename: path.basename(filePath),
    name: path.basename(filePath),
    mimetype,
    type: mimetype,
    size: stats.size,
  };
  try {
    const [uploaded] = await strapi.plugin('upload').service('upload').upload({
      data: {},
      files: fileData,
    });
    return uploaded;
  } catch (err) {
    strapi.log.error(`[seed] failed to upload ${relativePath}: ${err.message}`);
    return null;
  }
}

const servicesSlides = [
  { tag: 'ROUTINE LÂM SÀNG CÁ NHÂN HÓA', title: 'Thiết kế chu trình chuyên biệt', desc: 'ThS. DS. Hoàng Hồng Thắm trực tiếp thăm khám lâm sàng, bóc tách chỉ số sinh học làn da nhằm thiết kế routine mượt mà, hạn chế tối đa nguy cơ kích ứng cho riêng bạn.', img: 'remix/clinic-treatment.png' },
  { tag: 'DƯỢC CHẤT THẢO DƯỢC QUÝ HIẾM', title: 'Hoạt chất bóc tách phân tử tinh khiết', desc: 'Sự giao thoa hoàn hảo giữa các thảo dược chứa adaptogen thích ứng quý hiếm kết hợp hoạt chất sinh học tiên tiến bóc tách phân tử tối ưu giúp hồi sinh nhanh chóng tế bào hư tổn.', img: 'remix/herb-mix.png' },
  { tag: 'KỶ LỤC LÂM SÀNG TẠI CLINIC', title: 'Phác đồ hồi phục thực tế trên 98%', desc: 'Lennie Clinic từ chối những thuật ngữ sáo rỗng. Mọi phác đồ trị liệu đều bám sát chặt chẽ sự phát triển tế bào của khách để khôi phục lớp màng sinh học nguyên bản, đạt kết quả mướt mịn thực tế.', img: 'remix/model-glow.png' },
  { tag: 'CỐ VẤN KHOA HỌC ĐỒNG HÀNH', title: 'Chăm da sát sườn 24/7 từ tâm', desc: 'Không chỉ kê đơn sản phẩm, Lennie SkinLab là cố vấn thẩm mỹ đồng hành lâu dài, liên tục bám sát sự phục hồi và kiểm soát sinh lý biểu bì định kỳ hàng tuần cho bạn.', img: 'remix/wellness-spa.png' },
];

const partnerBrands = ['Biologique Recherche', 'Obagi Medical', 'La Roche-Posay', 'Skinceuticals', 'Medik8', 'Isdin', 'Hydrinity', 'Osmosis MD'];

const mantraCards = [
  { title: 'Khơi Nguồn Sinh Lực Da', desc: 'Cung cấp vitamin và hoạt chất vi lượng giúp khôi phục hệ miễn dịch tự nhiên của làn da.', icon: 'Activity' },
  { title: 'Bảo Vệ Đa Tầng Tế Bào', desc: 'Củng cố hàng rào giữ ẩm, chống mất nước xuyên biểu bì và làm chậm lão hóa sớm.', icon: 'Heart' },
  { title: 'Cân Bằng Sinh Học', desc: 'Thiết kế độ pH dịu mượt và thúc đẩy chu trình tái sinh tế bào không bong tróc.', icon: 'Globe' },
  { title: 'Minh Bạch Y Khoa', desc: '100% dòng sản phẩm tuyển chọn sở hữu chứng nhận lâm sàng quốc tế khắt khe nhất.', icon: 'Sparkles' },
];

const teamData = [
  { name: 'DS. Phạm Thành Nam', role: 'Dược sĩ tư vấn chuyên môn', img: 'remix/team-1.png' },
  { name: 'KTV. Nguyễn Thùy Trang', role: 'Trưởng nhóm Kỹ thuật viên', img: 'remix/team-2.png' },
  { name: 'DS. Mai Phương Anh', role: 'Chuyên viên nghiên cứu hoạt chất', img: 'remix/team-3.png' },
  { name: 'ThS. BS. Lê Hoài Nam', role: 'Thạc sĩ · Bác sĩ Da liễu Lâm sàng', img: 'remix/team-4.png' },
  { name: 'BS. Trịnh Quốc Khánh', role: 'Chuyên gia Trị liệu Công nghệ cao', img: 'remix/team-5.png' },
  { name: 'ThS. DS. Đỗ Hải Yến', role: 'Nhà nghiên cứu Công thức Mỹ phẩm', img: 'remix/team-6.png' },
];

const reviewsData = [
  { name: 'Phạm Minh Trí', caseType: 'Phục hồi mụn mủ', stars: 5, text: 'Tôi cực kỳ ấn tượng với phác đồ dược mỹ phẩm sắc sảo của ThS. Hoàng Hồng Thắm. Da tôi từ sưng viêm kích ứng đau rát nặng nề giờ đã khôi phục khỏe mạnh, mướt mát hẳn lên chỉ sau một tháng rưỡi.', img: 'remix/team-1.png', improvement: 'Khắc phục sưng viêm & Thâm sâu', beforeState: 'Mụn viêm sưng tấy', afterState: 'Da phẳng, sạch nhân mụn', duration: '6 tuần', expertNote: 'Giảm viêm tầng sâu, kiểm soát dầu thừa' },
  { name: 'Nguyễn Thanh Hằng', caseType: 'Điều trị sắc tố', stars: 5, text: 'Tôi đã dùng nhiều dòng treatment đắt đỏ nhưng không thấy da sáng mịn khỏe khoắn như khi chuyển hẳn sang phác đồ thích ứng sinh học của Lennie SkinLab. Da hồng hào, căng mượt rạng rỡ hẳn lên.', img: 'remix/model-glow.png', improvement: 'Tái tạo sắc tố & Sáng mịn', beforeState: 'Sạm xỉn & Đốm nâu sẫm', afterState: 'Sáng hồng, căng bóng', duration: '8 tuần', expertNote: 'Ức chế melanin, thúc đẩy sinh trưởng' },
  { name: 'Trần Thế Vũ', caseType: 'Tái tạo thâm sẹo', stars: 5, text: 'Lennie SkinLab đặt chuẩn rất cao cho việc chăm sóc khách hàng. Không gian vô cùng tinh tế, lịch hẹn chuẩn xác và Dược sĩ Thắm bám sát da tôi hàng tuần, dặn dò vô cùng chu đáo tỉ mỉ.', img: 'remix/team-3.png', improvement: 'Khôi phục hàng rào bảo vệ', beforeState: 'Da yếu lộ mao mạch đỏ', afterState: 'Nền da khỏe, dày dặn', duration: '4 tuần', expertNote: 'Củng cố màng vi sinh và độ ẩm nội bào' },
  { name: 'Nguyễn Thị Cẩm Tú', caseType: 'Trẻ hóa chuyên sâu', stars: 5, text: 'Dịch vụ chăm sóc tại đây thực sự chu đáo vượt ngoài mong đợi. Da tuổi 35 của tôi vốn dĩ sạm héo khô ráp, giờ lúc nào cũng được cấp nước căng mọng mướt mát hệt như được phục sinh.', img: 'remix/team-2.png', improvement: 'Lấp đầy nếp nhăn & Căng đầy', beforeState: 'Nếp nhăn khô ráp, sạm sâu', afterState: 'Đàn hồi săn chắc, mướt mát', duration: '5 tuần', expertNote: 'Kích hoạt nguyên bào collagen tự nhiên' },
];

const faqs = [
  { q: 'Lennie SkinLab có gì khác biệt so với spa thông thường?', a: 'Mỗi khách hàng được ThS. DS. Hoàng Hồng Thắm trực tiếp đọc vị làn da và thiết kế phác đồ cá nhân hóa — không áp dụng một routine chung. Chúng tôi đề cao chuyên môn hoạt chất, sự minh bạch và đồng hành lâu dài.' },
  { q: 'Tôi ở nước ngoài có được tư vấn không?', a: 'Có. Lennie phục vụ khách kiều bào tại Mỹ, Hàn, Nhật, châu Âu, Singapore qua hình thức tư vấn và theo dõi từ xa bằng Zalo / Messenger.' },
  { q: 'Chi phí thăm khám và theo dõi tính thế nào?', a: 'Lennie minh bạch chi phí, không phát sinh phí thăm khám hay theo dõi riêng. Với dịch vụ thiết kế routine, bạn được tư vấn miễn phí khi đồng hành cùng sản phẩm điều trị.' },
  { q: 'Đặt lịch tại cơ sở như thế nào?', a: 'Bạn có thể đặt lịch trực tiếp trên website, hoặc liên hệ qua Messenger / Zalo / SĐT. Đội ngũ sẽ xác nhận lại khung giờ với bạn.' },
  { q: 'Lennie cam kết kết quả ra sao?', a: 'Chúng tôi không hứa hẹn kết quả tuyệt đối. Chăm da là một hành trình — Lennie cam kết đồng hành đúng cách, minh bạch về khả năng cải thiện và điều chỉnh phác đồ theo tiến triển thực tế của bạn.' },
];

const skinConcerns = ['Mụn', 'Nám & Sắc tố', 'Lão hóa', 'Da nhạy cảm', 'Mất nước'];
const resultTypes = ['Phục hồi', 'Sáng da', 'Trẻ hóa'];

async function findOrCreate(strapi, uid, where, data) {
  const existing = await strapi.documents(uid).findFirst({ filters: where });
  if (existing) return existing;
  return strapi.documents(uid).create({ data });
}

async function seed(strapi) {
  const already = await strapi.documents('api::general-setting.general-setting').findFirst();
  if (already) {
    strapi.log.info('[seed] data already present, skipping seed');
    return;
  }

  strapi.log.info('[seed] seeding Lennie SkinLab content...');

  // --- Taxonomies ---
  const categoryByName = {};
  for (const cat of serviceCategoriesData) {
    categoryByName[cat.name] = await findOrCreate(
      strapi,
      'api::service-category.service-category',
      { name: cat.name },
      { name: cat.name, slug: slugify(cat.name), icon: cat.icon }
    );
  }

  const concernByName = {};
  for (const name of skinConcerns) {
    concernByName[name] = await findOrCreate(strapi, 'api::skin-concern.skin-concern', { name }, { name, slug: slugify(name) });
  }

  const resultTypeByName = {};
  for (const name of resultTypes) {
    resultTypeByName[name] = await findOrCreate(strapi, 'api::result-type.result-type', { name }, { name, slug: slugify(name) });
  }

  const topicByName = {};
  for (const r of reviewsData) {
    if (!topicByName[r.caseType]) {
      topicByName[r.caseType] = await findOrCreate(strapi, 'api::testimonial-topic.testimonial-topic', { name: r.caseType }, { name: r.caseType, slug: slugify(r.caseType) });
    }
  }

  const faqCategoryGeneral = await findOrCreate(strapi, 'api::faq-category.faq-category', { name: 'Chung' }, { name: 'Chung', slug: 'chung' });

  // --- Services ---
  for (const s of servicesCatalog) {
    const heroImage = await uploadAsset(strapi, s.img);
    await strapi.documents('api::service.service').create({
      data: {
        title: s.title,
        slug: slugify(s.title),
        intro: s.summary,
        tagline: s.tagline,
        duration: s.duration,
        price: s.price,
        priceNote: s.priceNote,
        flagship: s.flagship,
        forWhom: s.forWhom,
        problems: s.problems,
        steps: s.steps,
        includes: s.includes,
        results: s.results,
        heroImage: heroImage?.id,
        featuredOnHome: s.flagship,
        category: categoryByName[s.categoryName]?.documentId,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] services created');

  // --- Products ---
  for (const p of productsCatalog) {
    const image = await uploadAsset(strapi, p.img);
    await strapi.documents('api::product.product').create({
      data: {
        name: p.name,
        slug: slugify(p.name),
        brand: p.brand,
        tag: p.tag,
        price: p.price,
        oldPrice: p.oldPrice || undefined,
        badge: p.badge || undefined,
        image: image?.id,
        type: p.type,
        skinTypes: p.skinTypes,
        rating: p.rating,
        reviews: p.reviews,
        description: blocks(p.description),
        status: 'catalog',
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] products created');

  // --- Blog posts ---
  for (const post of blogPostsCatalog) {
    const coverImage = await uploadAsset(strapi, post.img);
    await strapi.documents('api::blog-post.blog-post').create({
      data: {
        title: post.title,
        slug: slugify(post.title),
        excerpt: post.excerpt,
        body: blocksFromParagraphs(post.body),
        coverImage: coverImage?.id,
        publishedDate: post.publishedDate,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        featured: post.featured,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] blog posts created');

  // --- Branches ---
  for (const b of branchesCatalog) {
    await strapi.documents('api::branch.branch').create({
      data: {
        name: b.name,
        tag: b.tag,
        address: b.address,
        note: b.note,
        phone: b.phone,
        hours: b.hours,
      },
    });
  }
  strapi.log.info('[seed] branches created');

  // --- Testimonials ---
  for (const r of reviewsData) {
    const photo = await uploadAsset(strapi, r.img);
    await strapi.documents('api::testimonial.testimonial').create({
      data: {
        name: r.name,
        caseType: r.caseType,
        stars: r.stars,
        quote: r.text,
        photo: photo?.id,
        improvement: r.improvement,
        beforeState: r.beforeState,
        afterState: r.afterState,
        duration: r.duration,
        expertNote: r.expertNote,
        featured: true,
        topic: topicByName[r.caseType]?.documentId,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] testimonials created');

  // --- FAQs ---
  for (const f of faqs) {
    await strapi.documents('api::faq.faq').create({
      data: {
        question: f.q,
        answer: blocks(f.a),
        featured: true,
        category: faqCategoryGeneral.documentId,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] faqs created');

  // --- Team members ---
  for (let i = 0; i < teamData.length; i++) {
    const t = teamData[i];
    const photo = await uploadAsset(strapi, t.img);
    await strapi.documents('api::team-member.team-member').create({
      data: {
        name: t.name,
        role: t.role,
        photo: photo?.id,
        order: i,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] team members created');

  // --- Partner brands ---
  for (let i = 0; i < partnerBrands.length; i++) {
    await strapi.documents('api::partner-brand.partner-brand').create({
      data: {
        name: partnerBrands[i],
        order: i,
      },
      status: 'published',
    });
  }
  strapi.log.info('[seed] partner brands created');

  // --- General setting (single type) ---
  await strapi.documents('api::general-setting.general-setting').create({
    data: {
      hotline: '+84 909 123 456',
      primaryCta: { label: 'Đặt lịch trị liệu ngay', url: '/booking', style: 'primary' },
      secondaryCta: { label: 'Phân tích da miễn phí', url: '/booking?quiz=1', style: 'secondary' },
      messengerUrl: 'https://m.me/lennie.skinlab',
      zaloUrl: 'https://zalo.me/84909123456',
      whatsappUrl: '',
    },
  });
  strapi.log.info('[seed] general-setting created');

  // --- Contact info (single type) ---
  await strapi.documents('api::contact-info.contact-info').create({
    data: {
      address: 'Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP.HCM',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('142 Võ Văn Tần, Quận 3, TP.HCM'),
      openingHours: [{ daysLabel: 'Thứ 2 - Thứ 7', hours: '8:00 - 20:00' }],
      email: 'hello@lennieskinlab.vn',
      facebookUrl: '',
      instagramUrl: '',
      tiktokUrl: '',
    },
  });
  strapi.log.info('[seed] contact-info created');

  // --- Founder (single type) ---
  const portrait = await uploadAsset(strapi, 'founder-portrait.png');
  await strapi.documents('api::founder.founder').create({
    data: {
      name: 'ThS. DS. Hoàng Hồng Thắm',
      credential: 'Thạc sĩ Dược · Chuyên gia Da liễu dược mỹ phẩm',
      portrait: portrait?.id,
      summary: blocks(
        'Với hơn 6 năm chuyên sâu trong lĩnh vực dược mỹ phẩm và chăm sóc da liễu, ThS. DS. Hoàng Hồng Thắm là người đọc vị trực tiếp 100% ca điều trị tại Lennie — không ủy quyền, không phân công.'
      ),
      trustPoints: mantraCards.map((m) => ({ title: m.title, description: m.desc, icon: m.icon })),
      founderCta: { label: 'Đặt lịch tư vấn cùng Dược sĩ Thắm', url: '/booking', style: 'primary' },
    },
  });
  strapi.log.info('[seed] founder created');

  // --- Homepage (single type) ---
  const heroImage = await uploadAsset(strapi, 'remix/hero-biologique.png');
  const servicesSlidesData = [];
  for (const slide of servicesSlides) {
    const image = await uploadAsset(strapi, slide.img);
    servicesSlidesData.push({ tag: slide.tag, title: slide.title, description: slide.desc, image: image?.id });
  }

  await strapi.documents('api::homepage.homepage').create({
    data: {
      heroEyebrow: 'Phân phối ủy quyền chính hãng',
      heroHeading: 'Biologique Recherche Pháp',
      heroText:
        'Thương hiệu dược mỹ phẩm trị liệu trứ danh toàn cầu với triết lý dưỡng da tái thiết sinh học độc bản. Được trực tiếp tuyển chọn khắt khe bởi ThS. DS. Hoàng Hồng Thắm nhằm mang tới kết quả phục hồi da lâm sàng ngoạn mục chuẩn Clinic 5 sao.',
      heroImage: heroImage?.id,
      heroSlides: [],
      statsBar: [
        { value: '6', suffix: '+', label: 'Năm Lâm Sàng Chuyên Sâu' },
        { value: '98', suffix: '%', label: 'Tỷ Lệ Phục Hồi Thành Công' },
        { value: '1200', suffix: '+', label: 'Khách Hàng Đồng Hành' },
        { value: '50', suffix: '+', label: 'Thương Hiệu Toàn Cầu' },
      ],
      mantraCards: mantraCards.map((m) => ({ title: m.title, description: m.desc, icon: m.icon })),
      servicesSlides: servicesSlidesData,
    },
  });
  strapi.log.info('[seed] homepage created');

  strapi.log.info('[seed] done');
}

module.exports = { seed };
