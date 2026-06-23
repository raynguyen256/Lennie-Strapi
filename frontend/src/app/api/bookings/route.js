import { postToStrapi } from "@/lib/strapiWrite";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`bookings:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return Response.json({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { serviceSlug, serviceName, branchName, date, time, name, phone, notes } = body || {};

  if (!date || !time || !name || !phone) {
    return Response.json({ error: "Thiếu thông tin bắt buộc." }, { status: 400 });
  }

  try {
    await postToStrapi("bookings", {
      serviceSlug,
      serviceName,
      branchName,
      date,
      time,
      customerName: name,
      customerPhone: phone,
      notes,
    });
  } catch (err) {
    console.error("[api/bookings]", err);
    return Response.json({ error: "Không thể đặt lịch, vui lòng thử lại." }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
