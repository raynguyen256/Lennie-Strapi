const STRAPI_INTERNAL_URL = process.env.STRAPI_INTERNAL_URL || "http://localhost:1337";

/**
 * POST dữ liệu tới Strapi REST API bằng API token server-only.
 * Chỉ dùng trong Route Handler (server), không bao giờ import vào client component.
 */
export async function postToStrapi(path, data) {
  const res = await fetch(`${STRAPI_INTERNAL_URL}/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Strapi POST /${path} failed: ${res.status} ${detail}`);
  }

  return res.json();
}
