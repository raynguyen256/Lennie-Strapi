import {
  getStrapiMedia,
  blocksToText,
  getFounder,
  getTeamMembers,
  getServices,
  getServiceBySlug,
  getProducts,
  getProductBySlug,
  getBlogPosts,
  getBlogPostBySlug,
  getTestimonials,
  getFaqs,
  getContactInfo,
  getGeneralSetting,
  getBranches,
  getSkinResults,
  getTestimonialsByProductSlug,
} from "@/lib/strapi";
import { FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL, MESSENGER_URL } from "@/lib/social-links";
import {
  productData as fallbackProducts,
  teamData as fallbackTeamData,
  reviewsData as fallbackReviewsData,
  mantraCards as fallbackMantraCards,
  faqs as fallbackFaqs,
  serviceCategoryDefaults,
  fallbackServices,
  fallbackProductsCatalog,
  fallbackBlogPosts,
  branches as fallbackBranches,
  brandValues,
  founderTimeline,
  toBlocks,
} from "@/lib/data";

const FALLBACK_FOUNDER = {
  name: "ThS. DS. Hoàng Hồng Thắm",
  credential: "Thạc sĩ Dược · Chuyên gia Da liễu dược mỹ phẩm",
  summary:
    "Với hơn 6 năm chuyên sâu trong lĩnh vực dược mỹ phẩm và chăm sóc da liễu, ThS. DS. Hoàng Hồng Thắm là người đọc vị trực tiếp 100% ca điều trị tại Lennie — không ủy quyền, không phân công.",
  portrait: "/assets/founder-portrait.png",
};

const FALLBACK_GENERAL = {
  hotline: "+84 909 123 456",
  primaryCta: { label: "Đặt lịch trị liệu ngay", url: "/booking" },
  secondaryCta: { label: "Phân tích da miễn phí", url: "/booking?quiz=1" },
  messengerUrl: MESSENGER_URL,
  zaloUrl: "https://zalo.me/84909123456",
  whatsappUrl: "",
};

const FALLBACK_CONTACT = {
  address: "Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP.HCM",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("142 Võ Văn Tần, Quận 3, TP.HCM"),
  openingHours: [{ daysLabel: "Thứ 2 - Thứ 7", hours: "8:00 - 20:00" }],
  email: "hello@lennieskinlab.vn",
  facebookUrl: FACEBOOK_URL,
  instagramUrl: INSTAGRAM_URL,
  tiktokUrl: TIKTOK_URL,
};

/** Bộ field "Tư vấn & Phác đồ" dùng làm fallback cuối cùng khi category không khớp danh sách mặc định */
const DEFAULT_CATEGORY_DEFAULTS = serviceCategoryDefaults["Tư vấn & Phác đồ"];

function getCategoryDefaults(categoryName) {
  return serviceCategoryDefaults[categoryName] || DEFAULT_CATEGORY_DEFAULTS;
}

function mapFounder(founder) {
  if (!founder) return { ...FALLBACK_FOUNDER, trustPoints: fallbackMantraCards.map((m) => ({ title: m.title, description: m.desc, icon: m.icon })) };
  return {
    name: founder.name || FALLBACK_FOUNDER.name,
    credential: founder.credential || FALLBACK_FOUNDER.credential,
    summary: blocksToText(founder.summary) || FALLBACK_FOUNDER.summary,
    portrait: getStrapiMedia(founder.portrait) || FALLBACK_FOUNDER.portrait,
    trustPoints: founder.trustPoints?.length ? founder.trustPoints : fallbackMantraCards.map((m) => ({ title: m.title, description: m.desc, icon: m.icon })),
  };
}

/** /about: founder + team + trust cards + brand values + founder timeline */
export async function getAboutContent() {
  const [founder, teamMembers] = await Promise.all([getFounder(), getTeamMembers()]);
  const founderData = mapFounder(founder);
  const team = teamMembers?.length
    ? teamMembers.map((t) => ({ name: t.name, role: t.role, img: getStrapiMedia(t.photo) || fallbackTeamData[0].img }))
    : fallbackTeamData;
  const trustCards = founderData.trustPoints.map((t) => ({ title: t.title, desc: t.description, icon: t.icon }));
  return { founder: founderData, team, trustCards, brandValues, founderTimeline };
}

/** Map 1 service Strapi sang dạng tóm tắt dùng cho /services và related services */
function mapServiceSummary(s) {
  const catName = s.category?.name || "";
  const catDefaults = getCategoryDefaults(catName);
  return {
    slug: s.slug,
    title: s.title,
    category: catName,
    categoryIcon: s.category?.icon || catDefaults.icon,
    tagline: s.tagline || "",
    duration: s.duration || "",
    price: s.price,
    priceNote: s.priceNote || "",
    flagship: !!s.flagship,
    img: getStrapiMedia(s.heroImage) || catDefaults.img,
    summary: s.intro || "",
    includes: s.includes?.length ? s.includes : catDefaults.includes,
    featuredOnHome: !!s.featuredOnHome,
  };
}

/** /services: danh sách dịch vụ */
export async function getServicesArchive() {
  const services = await getServices();
  if (services?.length) return services.map(mapServiceSummary);
  return fallbackServices;
}

/** /services/[slug]: chi tiết 1 dịch vụ */
export async function getServiceDetail(slug) {
  const [service, allServices, faqsData] = await Promise.all([getServiceBySlug(slug), getServices(), getFaqs()]);

  if (service) {
    const catName = service.category?.name || "";
    const catDefaults = getCategoryDefaults(catName);
    const relatedFaqs = service.relatedFaqs?.length
      ? service.relatedFaqs.map((f) => ({ q: f.question, a: blocksToText(f.answer) }))
      : faqsData?.length
        ? faqsData.slice(0, 3).map((f) => ({ q: f.question, a: blocksToText(f.answer) }))
        : fallbackFaqs.slice(0, 3);
    const related = (allServices || [])
      .filter((s) => s.slug !== slug && (s.category?.name || "") === catName)
      .slice(0, 3)
      .map(mapServiceSummary);

    return {
      slug: service.slug,
      title: service.title,
      eyebrow: service.eyebrow || catName || "Dịch vụ",
      category: catName,
      categoryIcon: service.category?.icon || catDefaults.icon,
      tagline: service.tagline || "",
      duration: service.duration || "",
      price: service.price,
      priceNote: service.priceNote || "",
      flagship: !!service.flagship,
      img: getStrapiMedia(service.heroImage) || catDefaults.img,
      intro: service.intro || "",
      body: Array.isArray(service.body) && service.body.length ? service.body : null,
      forWhom: service.forWhom?.length ? service.forWhom : catDefaults.forWhom,
      problems: service.problems?.length ? service.problems : catDefaults.problems,
      steps: service.steps?.length ? service.steps : catDefaults.steps,
      includes: service.includes?.length ? service.includes : catDefaults.includes,
      results: service.results?.length ? service.results : catDefaults.results,
      primaryCta: service.primaryCta || { label: "Đặt lịch trị liệu ngay", url: "/booking" },
      secondaryCta: service.secondaryCta || { label: "Tư vấn qua Messenger", url: FALLBACK_GENERAL.messengerUrl },
      skinConcerns: (service.skinConcerns || []).map((c) => c.name),
      relatedFaqs,
      related,
    };
  }

  const fallback = fallbackServices.find((s) => s.slug === slug);
  if (!fallback) return null;
  const sameCategory = fallbackServices.filter((s) => s.slug !== slug && s.category === fallback.category);
  const related = (sameCategory.length ? sameCategory : fallbackServices.filter((s) => s.slug !== slug)).slice(0, 3);
  return {
    ...fallback,
    eyebrow: fallback.category,
    intro: fallback.summary,
    body: null,
    primaryCta: { label: "Đặt lịch trị liệu ngay", url: "/booking" },
    secondaryCta: { label: "Tư vấn qua Messenger", url: FALLBACK_GENERAL.messengerUrl },
    skinConcerns: [],
    relatedFaqs: fallbackFaqs.slice(0, 3),
    related,
  };
}

/** Quy đổi giá Strapi dạng chuỗi (vd "2.890.000₫") sang số để lọc/sắp xếp */
function parsePriceValue(price) {
  if (typeof price === "number") return price;
  const digits = String(price || "").replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function mapProduct(p, i) {
  const hasBlocks = Array.isArray(p.description) && p.description.length > 0;
  return {
    slug: p.slug,
    id: p.documentId,
    brand: p.brand,
    name: p.name,
    type: p.type || "",
    skinTypes: p.skinTypes?.length ? p.skinTypes : [],
    tag: p.tag,
    price: p.price,
    priceValue: parsePriceValue(p.price),
    oldPrice: p.oldPrice || "",
    img: getStrapiMedia(p.image) || fallbackProducts[i % fallbackProducts.length].img,
    badge: p.badge || null,
    rating: p.rating || 0,
    reviews: p.reviews || 0,
    cats: (p.tags || []).map((t) => t.name),
    description: hasBlocks ? p.description : null,
    excerpt: hasBlocks ? blocksToText(p.description) : "",
  };
}

/** Quy đổi fallback (description dạng chuỗi) về cùng shape với mapProduct */
function mapFallbackProduct(p) {
  return { ...p, description: null, excerpt: p.description || "" };
}

/** /shop: toàn bộ sản phẩm */
export async function getShopArchive() {
  const products = await getProducts();
  if (products?.length) return products.map(mapProduct);
  return fallbackProductsCatalog.map(mapFallbackProduct);
}

/** /shop/[slug]: chi tiết sản phẩm + sản phẩm liên quan */
function mapProductReview(r) {
  return {
    name: r.name,
    caseType: r.topic?.name || r.caseType,
    stars: r.stars,
    text: r.quote,
    img: getStrapiMedia(r.photo) || fallbackReviewsData[0].img,
  };
}

export async function getProductDetail(slug) {
  const [product, allProducts, productReviews] = await Promise.all([getProductBySlug(slug), getProducts(), getTestimonialsByProductSlug(slug)]);
  const reviews = (productReviews || []).map(mapProductReview);
  if (product) {
    const mapped = mapProduct(product, 0);
    const related = (allProducts || []).filter((p) => p.slug !== slug).slice(0, 4).map(mapProduct);
    return {
      ...mapped,
      related: related.length ? related : fallbackProductsCatalog.filter((p) => p.slug !== slug).slice(0, 4).map(mapFallbackProduct),
      productReviews: reviews,
    };
  }
  const fallback = fallbackProductsCatalog.find((p) => p.slug === slug);
  if (!fallback) return null;
  return {
    ...fallback,
    description: fallback.description ? toBlocks([fallback.description]) : null,
    excerpt: fallback.description || "",
    related: fallbackProductsCatalog.filter((p) => p.slug !== slug).slice(0, 4).map(mapFallbackProduct),
    productReviews: reviews,
  };
}

function mapBlogPost(p) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.publishedDate
      ? new Date(p.publishedDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })
      : "",
    category: p.category || "",
    author: p.author || "",
    readTime: p.readTime || "",
    featured: !!p.featured,
    img: getStrapiMedia(p.coverImage) || fallbackBlogPosts[0].img,
    body: Array.isArray(p.body) && p.body.length ? p.body : null,
  };
}

/** Bài liên quan: cùng category, loại trừ bài hiện tại, fallback sang bài khác nếu không đủ */
function computeRelatedPosts(allPosts, current) {
  const sameCategory = allPosts.filter((p) => p.slug !== current.slug && p.category === current.category);
  const pool = sameCategory.length ? sameCategory : allPosts.filter((p) => p.slug !== current.slug);
  return pool.slice(0, 3);
}

/** /blog: danh sách bài viết */
export async function getBlogArchive() {
  const posts = await getBlogPosts();
  if (posts?.length) return posts.map(mapBlogPost);
  return fallbackBlogPosts;
}

/** /blog/[slug]: chi tiết bài viết + bài liên quan */
export async function getBlogDetail(slug) {
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);
  if (post) {
    const mapped = mapBlogPost(post);
    const related = computeRelatedPosts((allPosts || []).map(mapBlogPost), mapped);
    return { ...mapped, related };
  }
  const fallback = fallbackBlogPosts.find((p) => p.slug === slug);
  if (!fallback) return null;
  return { ...fallback, related: computeRelatedPosts(fallbackBlogPosts, fallback) };
}

/** /case-study: danh sách case study thật (before/after) từ skin-result */
function mapSkinResult(r) {
  return {
    id: r.documentId,
    title: r.title,
    beforeImg: getStrapiMedia(r.beforeImage),
    afterImg: getStrapiMedia(r.afterImage),
    timeframe: r.timeframe || "",
    caseSummary: r.caseSummary || "",
    treatmentSteps: Array.isArray(r.treatmentSteps) && r.treatmentSteps.length ? r.treatmentSteps : null,
    disclaimer: r.disclaimer || "",
    featured: !!r.featured,
    skinConcerns: (r.skinConcerns || []).map((c) => c.name),
    resultType: r.resultType?.name || "",
  };
}

export async function getCaseStudyContent() {
  const results = await getSkinResults();
  return {
    title: "Lennie SkinLab | Câu Chuyện Khách Hàng",
    intro:
      "Lưu giữ lại hành trình của những làn da từng điều trị tại Lennie. Đây chính là kết quả từ một phác đồ phù hợp và sự kiên trì của chính các bạn. Tụi mình lưu lại những câu chuyện thực tế tại đây, không phải để hứa hẹn một hành trình hoàn hảo, mà để bạn thấy rằng: chỉ cần đi đúng hướng, làn da nào cũng sẽ có cơ hội được khỏe mạnh trở lại.",
    cta: "Hành trình vạn dặm bắt đầu từ một bước chân. Nên nếu bạn vẫn đang chần chừ chưa biết phải bước đi thế nào trên con đường chăm da, đừng ngại nhắn Lennie để tụi mình tư vấn nhé!",
    items: (results || []).map(mapSkinResult),
  };
}

/** Danh sách cơ sở/chi nhánh cho /booking và /contact */
export async function getBranchesContent() {
  const data = await getBranches();
  if (data?.length) {
    return data.map((b) => ({ name: b.name, tag: b.tag, address: b.address, note: b.note, phone: b.phone, hours: b.hours }));
  }
  return fallbackBranches;
}

/** /booking: danh sách dịch vụ để chọn + chi nhánh + thông tin liên hệ nhanh */
export async function getBookingContent() {
  const [services, branchesData, generalSetting, contactInfo] = await Promise.all([
    getServicesArchive(),
    getBranchesContent(),
    getGeneralSetting(),
    getContactInfo(),
  ]);

  return {
    services: services.map((s) => ({ slug: s.slug, title: s.title, price: s.price, category: s.category })),
    branches: branchesData,
    hotline: generalSetting?.hotline || FALLBACK_GENERAL.hotline,
    messengerUrl: generalSetting?.messengerUrl || FALLBACK_GENERAL.messengerUrl,
    zaloUrl: generalSetting?.zaloUrl || FALLBACK_GENERAL.zaloUrl,
    address: contactInfo?.address || FALLBACK_CONTACT.address,
  };
}

/** Danh sách FAQ dùng cho /services và /contact */
export async function getFaqsList() {
  const faqsData = await getFaqs();
  if (faqsData?.length) return faqsData.map((f) => ({ q: f.question, a: blocksToText(f.answer) }));
  return fallbackFaqs;
}

/** /testimonials: toàn bộ đánh giá */
export async function getTestimonialsArchive() {
  const testimonials = await getTestimonials();
  if (testimonials?.length) {
    return testimonials.map((r) => ({
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
    }));
  }
  return fallbackReviewsData;
}

/** /contact: thông tin liên hệ + chi nhánh */
export async function getContactContent() {
  const [contactInfo, generalSetting, branchesData, faqsData] = await Promise.all([getContactInfo(), getGeneralSetting(), getBranchesContent(), getFaqsList()]);
  return {
    address: contactInfo?.address || FALLBACK_CONTACT.address,
    mapsUrl: contactInfo?.mapsUrl || FALLBACK_CONTACT.mapsUrl,
    email: contactInfo?.email || FALLBACK_CONTACT.email,
    openingHours: contactInfo?.openingHours?.length ? contactInfo.openingHours : FALLBACK_CONTACT.openingHours,
    facebookUrl: contactInfo?.facebookUrl || FALLBACK_CONTACT.facebookUrl,
    instagramUrl: contactInfo?.instagramUrl || FALLBACK_CONTACT.instagramUrl,
    tiktokUrl: contactInfo?.tiktokUrl || FALLBACK_CONTACT.tiktokUrl,
    hotline: generalSetting?.hotline || FALLBACK_GENERAL.hotline,
    messengerUrl: generalSetting?.messengerUrl || FALLBACK_GENERAL.messengerUrl,
    zaloUrl: generalSetting?.zaloUrl || FALLBACK_GENERAL.zaloUrl,
    branches: branchesData,
    faqs: faqsData,
  };
}
