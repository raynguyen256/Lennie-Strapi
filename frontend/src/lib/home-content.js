import {
  getStrapiMedia,
  blocksToText,
  getHomepage,
  getFounder,
  getProducts,
  getProductTags,
  getTeamMembers,
  getPartnerBrands,
  getTestimonials,
  getFaqs,
} from "@/lib/strapi";
import {
  productData as fallbackProducts,
  servicesSlides as fallbackServicesSlides,
  partnerBrands as fallbackPartnerBrands,
  mantraCards as fallbackMantraCards,
  teamData as fallbackTeamData,
  reviewsData as fallbackReviewsData,
  faqs as fallbackFaqs,
} from "@/lib/data";

const FALLBACK_HERO = {
  eyebrow: "Phân phối ủy quyền chính hãng",
  heading: "Biologique Recherche Pháp",
  text: "Thương hiệu dược mỹ phẩm trị liệu trứ danh toàn cầu với triết lý dưỡng da tái thiết sinh học độc bản. Được trực tiếp tuyển chọn khắt khe bởi ThS. DS. Hoàng Hồng Thắm nhằm mang tới kết quả phục hồi da lâm sàng ngoạn mục chuẩn Clinic 5 sao.",
  image: "/assets/remix/hero-biologique.png",
};

const STAT_META = [
  { icon: "Heart", desc: "Hơn 6 năm chuyên hành nghề dược mỹ phẩm điều trị thực tế" },
  { icon: "CheckCircle", desc: "Khách hàng chuyển biến rõ rệt sau liệu trình tuyển chọn" },
  { icon: "HeartHandshake", desc: "Tin cậy tuyệt đối và liên tục giới thiệu người thân" },
  { icon: "Shield", desc: "Ủy quyền trực tiếp 50+ nhãn dược mỹ phẩm quốc tế" },
];

const FALLBACK_STATS = [
  { target: 6, suffix: "+", title: "Năm Lâm Sàng Chuyên Sâu", ...STAT_META[0] },
  { target: 98, suffix: "%", title: "Tỷ Lệ Phục Hồi Thành Công", ...STAT_META[1] },
  { target: 1200, suffix: "+", title: "Khách Hàng Đồng Hành", ...STAT_META[2] },
  { target: 50, suffix: "+", title: "Thương Hiệu Toàn Cầu", ...STAT_META[3] },
];

const FALLBACK_FOUNDER = {
  name: "ThS. DS. Hoàng Hồng Thắm",
  credential: "Thạc sĩ Dược · Chuyên gia Da liễu dược mỹ phẩm",
  summary:
    "Với hơn 6 năm chuyên sâu trong lĩnh vực dược mỹ phẩm và chăm sóc da liễu, ThS. DS. Hoàng Hồng Thắm là người đọc vị trực tiếp 100% ca điều trị tại Lennie — không ủy quyền, không phân công.",
  portrait: "/assets/founder-portrait.png",
};

/** Map danh sách partner-brand từ Strapi sang {name, logo}, fallback về data.js (text-only) khi Strapi rỗng/down */
export function mapPartnerBrands(partnerBrandsData) {
  return partnerBrandsData?.length
    ? partnerBrandsData.map((b) => ({ name: b.name, logo: getStrapiMedia(b.logo) }))
    : fallbackPartnerBrands.map((name) => ({ name, logo: null }));
}

/** Fetch + map toàn bộ dữ liệu Strapi cho trang chủ, fallback về data.js khi Strapi rỗng/down */
export async function getHomeContent() {
  const [homepage, founder, products, productTagsData, teamMembers, partnerBrandsData, testimonials, faqsData] = await Promise.all([
    getHomepage(),
    getFounder(),
    getProducts(),
    getProductTags(),
    getTeamMembers(),
    getPartnerBrands(),
    getTestimonials(),
    getFaqs(),
  ]);

  const hero = homepage
    ? {
        eyebrow: homepage.heroEyebrow || FALLBACK_HERO.eyebrow,
        heading: homepage.heroHeading || FALLBACK_HERO.heading,
        text: homepage.heroText || FALLBACK_HERO.text,
        image: getStrapiMedia(homepage.heroImage) || FALLBACK_HERO.image,
      }
    : FALLBACK_HERO;

  const stats =
    homepage?.statsBar?.length
      ? homepage.statsBar.map((s, i) => ({
          target: Number(s.value) || 0,
          suffix: s.suffix || "",
          title: s.label,
          ...(STAT_META[i] || STAT_META[STAT_META.length - 1]),
        }))
      : FALLBACK_STATS;

  const mantraCards = homepage?.mantraCards?.length
    ? homepage.mantraCards.map((c) => ({ title: c.title, desc: c.description, icon: c.icon }))
    : fallbackMantraCards;

  const servicesSlides = homepage?.servicesSlides?.length
    ? homepage.servicesSlides.map((s) => ({
        tag: s.tag,
        title: s.title,
        desc: s.description,
        img: getStrapiMedia(s.image) || fallbackServicesSlides[0].img,
      }))
    : fallbackServicesSlides;

  const productList = products?.length
    ? products.map((p) => ({
        id: p.documentId,
        slug: p.slug,
        brand: p.brand,
        name: p.name,
        tag: p.tag,
        price: p.price,
        img: getStrapiMedia(p.image) || fallbackProducts[0].img,
        badge: p.badge || null,
        cats: (p.tags || []).map((t) => t.slug),
        type: p.type || "",
        skinTypes: p.skinTypes?.length ? p.skinTypes : [],
        rating: p.rating || 0,
        reviews: p.reviews || 0,
        excerpt: blocksToText(p.description) || "",
      }))
    : fallbackProducts.map((p) => ({ ...p, type: "", skinTypes: [], rating: 0, reviews: 0, excerpt: "" }));

  const productTags = productTagsData?.length
    ? productTagsData
        .map((t) => ({ slug: t.slug, label: `#${t.name.toUpperCase().replace(/\s+/g, '')}`, count: t.products?.length ?? 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    : [];

  const partnerBrandList = mapPartnerBrands(partnerBrandsData);

  const teamData = teamMembers?.length
    ? teamMembers.map((t) => ({ name: t.name, role: t.role, img: getStrapiMedia(t.photo) || fallbackTeamData[0].img }))
    : fallbackTeamData;

  const reviewsData = testimonials?.length
    ? testimonials.map((r) => ({
        name: r.name,
        caseType: r.topic?.name || r.caseType,
        stars: r.stars,
        text: r.quote,
        img: getStrapiMedia(r.photo) || fallbackReviewsData[0].img,
        improvement: r.improvement,
        beforeState: r.beforeState,
        afterState: r.afterState,
        duration: r.duration,
        expertNote: r.expertNote,
      }))
    : fallbackReviewsData;

  const faqList = faqsData?.length
    ? faqsData.map((f) => ({ q: f.question, a: blocksToText(f.answer) }))
    : fallbackFaqs;

  const founderData = founder
    ? {
        name: founder.name || FALLBACK_FOUNDER.name,
        credential: founder.credential || FALLBACK_FOUNDER.credential,
        summary: blocksToText(founder.summary) || FALLBACK_FOUNDER.summary,
        portrait: getStrapiMedia(founder.portrait) || FALLBACK_FOUNDER.portrait,
      }
    : FALLBACK_FOUNDER;

  return {
    hero,
    stats,
    mantraCards,
    servicesSlides,
    products: productList,
    productTags,
    partnerBrands: partnerBrandList,
    teamData,
    reviewsData,
    faqs: faqList,
    founder: founderData,
  };
}
