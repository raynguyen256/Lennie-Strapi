import { postToStrapi } from "@/lib/strapiWrite";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const VALID_SOURCES = ["contact-page", "booking-modal"];

export async function POST(request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`leads:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return Response.json({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { name, phone, skinCondition, serviceInterest, source } = body || {};

  if (!name || !phone || !skinCondition) {
    return Response.json({ error: "Thiếu thông tin bắt buộc." }, { status: 400 });
  }

  try {
    await postToStrapi("contact-leads", {
      name,
      phone,
      skinCondition,
      serviceInterest,
      source: VALID_SOURCES.includes(source) ? source : "contact-page",
    });
  } catch (err) {
    console.error("[api/leads]", err);
    return Response.json({ error: "Không thể gửi yêu cầu tư vấn." }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
