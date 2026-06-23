import { postToStrapi } from "@/lib/strapiWrite";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

function generateOrderCode() {
  return `LN-${Math.floor(100000 + Math.random() * 900000)}`;
}

export async function POST(request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`orders:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return Response.json({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { name, phone, email, province, district, ward, street, note, items, paymentMethod } = body || {};

  if (!name || !phone || !Array.isArray(items) || items.length === 0 || !paymentMethod) {
    return Response.json({ error: "Thiếu thông tin bắt buộc." }, { status: 400 });
  }

  const code = generateOrderCode();
  const itemCount = items.reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
  const subtotal = items.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);

  try {
    await postToStrapi("orders", {
      code,
      customerName: name,
      customerPhone: phone,
      customerEmail: email || null,
      province,
      district,
      ward,
      street,
      note,
      items,
      itemCount,
      subtotal,
      paymentMethod,
    });
  } catch (err) {
    console.error("[api/orders]", err);
    return Response.json({ error: "Không thể tạo đơn hàng, vui lòng thử lại." }, { status: 502 });
  }

  return Response.json({ ok: true, code }, { status: 201 });
}
