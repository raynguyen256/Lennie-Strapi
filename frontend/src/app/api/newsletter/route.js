import { postToStrapi } from "@/lib/strapiWrite";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return Response.json({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { email } = body || {};

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Email không hợp lệ." }, { status: 400 });
  }

  try {
    await postToStrapi("newsletter-subscribers", { email });
  } catch (err) {
    if (String(err.message).includes("400")) {
      return Response.json({ ok: true, duplicate: true }, { status: 200 });
    }
    console.error("[api/newsletter]", err);
    return Response.json({ error: "Không thể đăng ký, vui lòng thử lại." }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
