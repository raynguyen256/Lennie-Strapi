const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

/** Trả về URL tuyệt đối cho 1 media object của Strapi (ưu tiên format được chỉ định) */
export function getStrapiMedia(media, format) {
  if (!media) return null;
  const url = media.formats?.[format]?.url || media.url;
  if (!url) return null;
  return url.startsWith("http") ? url : getStrapiURL(url);
}

/** Trích plain text từ Strapi Blocks rich text (vd answer của FAQ) */
export function blocksToText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .join("\n")
    .trim();
}

/** Chuyển object params lồng nhau thành query string kiểu bracket (vd populate[a][b]=true) */
function toQueryString(params, prefix = "") {
  const parts = [];
  for (const [key, value] of Object.entries(params)) {
    const keyPath = prefix ? `${prefix}[${key}]` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      parts.push(toQueryString(value, keyPath));
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v && typeof v === "object") {
          parts.push(toQueryString(v, `${keyPath}[${i}]`));
        } else {
          parts.push(`${encodeURIComponent(`${keyPath}[${i}]`)}=${encodeURIComponent(v)}`);
        }
      });
    } else {
      parts.push(`${encodeURIComponent(keyPath)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.filter(Boolean).join("&");
}

/**
 * Gọi Strapi REST API. Trả về `null` khi lỗi/Strapi chưa chạy để page có thể fallback dữ liệu tĩnh.
 */
export async function fetchAPI(path, params = {}, options = {}) {
  const query = toQueryString(params);
  const url = getStrapiURL(`/api${path}${query ? `?${query}` : ""}`);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      ...options,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

const SERVICE_POPULATE = {
  populate: {
    heroImage: true,
    primaryCta: true,
    secondaryCta: true,
    category: true,
    skinConcerns: true,
    relatedResults: true,
    relatedFaqs: true,
  },
};

const HOMEPAGE_POPULATE = {
  populate: {
    heroImage: true,
    heroSlides: { populate: { image: true, cta: true } },
    statsBar: true,
    mantraCards: true,
    servicesSlides: { populate: { image: true } },
  },
};

export async function getHomepage() {
  return fetchAPI("/homepage", HOMEPAGE_POPULATE);
}

export async function getFounder() {
  return fetchAPI("/founder", { populate: { portrait: true, trustPoints: true, founderCta: true } });
}

export async function getGeneralSetting() {
  return fetchAPI("/general-setting", { populate: { primaryCta: true, secondaryCta: true } });
}

export async function getContactInfo() {
  return fetchAPI("/contact-info", { populate: { openingHours: true } });
}

export async function getServices(params = {}) {
  return fetchAPI("/services", { ...SERVICE_POPULATE, ...params });
}

export async function getServiceBySlug(slug) {
  const data = await fetchAPI("/services", {
    ...SERVICE_POPULATE,
    filters: { slug: { $eq: slug } },
  });
  return data?.[0] || null;
}

export async function getProducts(params = {}) {
  return fetchAPI("/products", { populate: { image: true, tags: true }, ...params });
}

export async function getProductBySlug(slug) {
  const data = await fetchAPI("/products", {
    populate: { image: true, tags: true },
    filters: { slug: { $eq: slug } },
  });
  return data?.[0] || null;
}

export async function getTestimonials(params = {}) {
  return fetchAPI("/testimonials", { populate: { photo: true, topic: true, relatedServices: true }, ...params });
}

export async function getFaqs(params = {}) {
  return fetchAPI("/faqs", { populate: { category: true }, ...params });
}

export async function getTeamMembers() {
  return fetchAPI("/team-members", {
    populate: { photo: true },
    sort: ["order:asc"],
  });
}

export async function getPartnerBrands() {
  return fetchAPI("/partner-brands", {
    populate: { logo: true },
    sort: ["order:asc"],
  });
}

export async function getBlogPosts(params = {}) {
  return fetchAPI("/blog-posts", { populate: { coverImage: true }, sort: ["publishedDate:desc"], ...params });
}

export async function getBlogPostBySlug(slug) {
  const data = await fetchAPI("/blog-posts", {
    populate: { coverImage: true },
    filters: { slug: { $eq: slug } },
  });
  return data?.[0] || null;
}

export async function getSkinResults(params = {}) {
  return fetchAPI("/skin-results", {
    populate: { beforeImage: true, afterImage: true, skinConcerns: true, resultType: true, relatedServices: true },
    ...params,
  });
}

export async function getBranches() {
  return fetchAPI("/branches", { sort: ["name:asc"] });
}
