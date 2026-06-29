"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import { Icon } from "@/lib/icons";
import { useCart, vnd } from "@/lib/cart";

const CHECKOUT_PROVINCES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Bình Dương", "Đồng Nai", "Bà Rịa - Vũng Tàu", "Khánh Hòa", "Lâm Đồng", "Tỉnh / Thành khác"];

const PAYMENT_METHODS = [
  { id: "cod", icon: "Bag", label: "Thanh toán khi nhận hàng (COD)", desc: "Trả tiền mặt cho nhân viên giao hàng khi nhận sản phẩm tại nhà." },
  { id: "bank", icon: "Shield", label: "Chuyển khoản ngân hàng", desc: "Nhân viên Lennie gửi thông tin tài khoản để bạn chuyển khoản xác nhận đơn." },
  { id: "staff", icon: "HeartHandshake", label: "Nhân viên Lennie hỗ trợ thanh toán", desc: "Nhân viên liên hệ tư vấn và hướng dẫn phương thức thanh toán phù hợp nhất." },
];

const inputCls = "w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60";

const SHIPPING_STORAGE_KEY = "lennie_shipping_info";

function loadSavedShippingInfo() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SHIPPING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveShippingInfo(form) {
  if (typeof window === "undefined") return;
  try {
    const { name, phone, email, province, district, ward, street } = form;
    window.localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify({ name, phone, email, province, district, ward, street }));
  } catch {
    // bỏ qua nếu localStorage không khả dụng (vd Safari private mode)
  }
}

function Field({ label, required, children, half }) {
  return (
    <div className={`space-y-1.5 ${half ? "" : "sm:col-span-2"}`}>
      <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">
        {label}
        {required && "*"}
      </label>
      {children}
    </div>
  );
}

function StepDots({ step }) {
  const steps = [
    ["1", "Địa chỉ giao hàng"],
    ["2", "Phương thức thanh toán"],
    ["3", "Hoàn tất"],
  ];
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {steps.map(([n, label], i) => {
        const active = step >= i;
        const cur = step === i;
        return (
          <div key={n} className="flex items-center gap-2 sm:gap-4 flex-1 last:flex-none">
            <div className="flex items-center gap-2.5">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-[12px] font-bold shrink-0 transition-colors ${active ? "bg-brand-blue text-white" : "bg-light-bg text-ink-3"}`}>
                {step > i ? <Icon.Check size={15} /> : n}
              </span>
              <span className={`hidden sm:block font-sans text-[11px] font-bold tracking-wider uppercase ${cur ? "text-ink" : "text-ink-3"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <span className={`flex-1 h-px min-w-[16px] ${step > i ? "bg-brand-blue" : "bg-divider"}`}></span>}
          </div>
        );
      })}
    </div>
  );
}

function OrderSummaryCard({ items, count, subtotal, collapsible }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-mist border border-divider rounded-md p-6 md:p-7 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-semibold text-ink">Đơn hàng</h3>
        <span className="font-sans text-[11px] font-bold text-brand-blue bg-brand-blue-light rounded-full px-2.5 py-0.5">{count} sản phẩm</span>
      </div>
      <div className={`space-y-4 ${collapsible && !open ? "max-h-0 overflow-hidden lg:max-h-none" : ""}`}>
        {items.map((it) => (
          <div key={it.id} className="flex gap-3">
            <div className="relative w-14 h-14 shrink-0 bg-white border border-divider rounded-sm flex items-center justify-center p-1.5 overflow-hidden">
              <img src={it.img} alt={it.name} className="h-full w-auto object-contain" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink text-white font-sans text-[10px] font-bold flex items-center justify-center">{it.qty}</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="font-sans text-[8px] font-bold tracking-[0.16em] uppercase text-brand-teal truncate">{it.brand}</div>
              <div className="font-serif text-[13px] font-medium text-ink leading-snug truncate">{it.name}</div>
            </div>
            <span className="font-serif text-[13px] font-bold text-ink self-center whitespace-nowrap">{vnd(it.price * it.qty)}</span>
          </div>
        ))}
      </div>
      {collapsible && (
        <button type="button" onClick={() => setOpen(!open)} className="lg:hidden font-sans text-[10px] font-bold tracking-wider text-brand-blue uppercase">
          {open ? "Thu gọn" : "Xem sản phẩm"}
        </button>
      )}
      <div className="space-y-2.5 pt-4 border-t border-divider font-sans text-sm">
        <div className="flex justify-between text-ink-2">
          <span>Tạm tính</span>
          <span className="font-semibold text-ink">{vnd(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink-2">
          <span>Phí vận chuyển</span>
          <span className="font-semibold text-brand-blue">Nhân viên xác nhận</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-divider">
        <span className="font-serif text-lg font-semibold text-ink">Tổng tạm tính</span>
        <span className="font-serif text-2xl font-bold text-ink">{vnd(subtotal)}</span>
      </div>
    </div>
  );
}

function CheckoutSuccess({ order }) {
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[90] overflow-y-auto modal-fade">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative overflow-hidden modal-pop my-8">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <div className="p-7 md:p-9 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-blue-light flex items-center justify-center mx-auto mb-5 text-brand-blue">
            <Icon.CheckCircle size={42} />
          </div>
          <span className="inline-block font-sans text-[10px] font-bold tracking-[0.3em] text-brand-teal uppercase">Đặt hàng thành công</span>
          <h2 className="font-serif text-3xl text-ink font-semibold mt-2 leading-tight">Cảm ơn {order.name}!</h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed mt-3 max-w-md mx-auto">
            <strong className="text-ink">Nhân viên Lennie</strong> sẽ liên hệ với bạn qua số <strong className="text-brand-blue">{order.phone}</strong> trong thời gian sớm nhất để xác nhận đơn hàng và hỗ trợ bạn <strong className="text-ink">hoàn tất thanh toán cuối cùng</strong>.
          </p>

          <div className="bg-mist border border-divider rounded-md p-5 mt-6 text-left space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-divider">
              <span className="font-sans text-[10px] font-bold tracking-widest text-ink-3 uppercase">Mã đơn hàng</span>
              <span className="font-serif text-base font-bold text-brand-blue">{order.code}</span>
            </div>
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-ink-2">Số sản phẩm</span>
              <span className="text-ink font-semibold">{order.count}</span>
            </div>
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-ink-2">Tổng tạm tính</span>
              <span className="text-ink font-bold">{vnd(order.subtotal)}</span>
            </div>
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-ink-2">Thanh toán</span>
              <span className="text-ink font-semibold text-right">{order.paymentLabel}</span>
            </div>
            <div className="flex justify-between gap-4 font-sans text-[13px]">
              <span className="text-ink-2 shrink-0">Giao tới</span>
              <span className="text-ink font-medium text-right">{order.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Link href="/" className="flex-1 py-3.5 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-ink transition-colors flex items-center justify-center">
              Về trang chủ
            </Link>
            <Link href="/shop" className="flex-1 py-3.5 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-colors flex items-center justify-center">
              Tiếp tục mua sắm
            </Link>
          </div>
          <p className="font-sans text-[11px] text-ink-3 flex items-center justify-center gap-1.5 mt-5">
            <Icon.Phone size={13} className="text-brand-blue" />
            Hotline hỗ trợ: +84 909 123 456
          </p>
        </div>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const { items, selectedItems, selectedCount, selectedSubtotal, removeMany } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", province: "", district: "", ward: "", street: "", note: "" });
  const [payment, setPayment] = useState("cod");
  const [touched, setTouched] = useState(false);
  const [order, setOrder] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [savedInfo, setSavedInfo] = useState(null);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const saved = loadSavedShippingInfo();
    if (saved) setSavedInfo(saved);
  }, []);

  const usePreviousInfo = () => {
    if (!savedInfo) return;
    setForm((f) => ({ ...f, ...savedInfo }));
    setPrefilled(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const required = ["name", "phone", "province", "district", "ward", "street"];
  const missing = (k) => touched && required.includes(k) && !form[k].trim();
  const step1Valid = required.every((k) => form[k].trim());

  const goPayment = () => {
    setTouched(true);
    if (!step1Valid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = async () => {
    const pm = PAYMENT_METHODS.find((m) => m.id === payment);
    const address = [form.street, form.ward, form.district, form.province].filter(Boolean).join(", ");
    setOrderError(null);
    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          province: form.province,
          district: form.district,
          ward: form.ward,
          street: form.street,
          note: form.note,
          items: selectedItems.map((i) => ({ id: i.id, slug: i.slug, name: i.name, brand: i.brand, price: i.price, qty: i.qty })),
          paymentMethod: payment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đặt hàng thất bại");

      setOrder({ code: data.code, name: form.name, phone: form.phone, count: selectedCount, subtotal: selectedSubtotal, paymentLabel: pm.label, address });
      saveShippingInfo(form);
      removeMany(selectedItems.map((i) => i.id));
    } catch (err) {
      setOrderError(err.message || "Đặt hàng thất bại, vui lòng thử lại.");
    } finally {
      setPlacing(false);
    }
  };

  // Empty cart (and no completed order) → prompt to shop
  if (items.length === 0 && !order) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
            <Icon.Bag size={34} />
          </div>
          <h2 className="font-serif text-3xl text-ink font-light">Chưa có sản phẩm để thanh toán</h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-md">Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm trước khi tiến hành thanh toán nhé.</p>
          <Link href="/shop" className="mt-2 px-8 py-4 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue transition-colors inline-flex items-center gap-2">
            <Icon.ArrowR size={15} />
            Khám phá sản phẩm
          </Link>
        </div>
      </section>
    );
  }

  // Items exist but none selected for checkout → prompt to go back and select
  if (selectedItems.length === 0 && !order) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
            <Icon.Bag size={34} />
          </div>
          <h2 className="font-serif text-3xl text-ink font-light">Bạn chưa chọn sản phẩm để thanh toán</h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-md">Vui lòng quay lại giỏ hàng và chọn các sản phẩm bạn muốn thanh toán.</p>
          <Link href="/cart" className="mt-2 px-8 py-4 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue transition-colors inline-flex items-center gap-2">
            <Icon.ChevronL size={15} />
            Quay lại giỏ hàng
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <StepDots step={order ? 2 : step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Form column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {step === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-divider">
                  <span className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
                    <Icon.Pin size={20} />
                  </span>
                  <h2 className="font-serif text-2xl text-ink font-semibold">Địa chỉ giao hàng</h2>
                </div>
                {savedInfo && !prefilled && (
                  <div className="flex items-center justify-between gap-4 bg-brand-blue-light border border-divider rounded-md p-4">
                    <p className="font-sans text-[13px] text-ink-2">
                      Tìm thấy thông tin giao hàng từ lần đặt hàng trước (<strong className="text-ink">{savedInfo.name}</strong>).
                    </p>
                    <button
                      type="button"
                      onClick={usePreviousInfo}
                      className="shrink-0 font-sans text-[10px] font-bold tracking-wider text-brand-blue uppercase hover:text-ink whitespace-nowrap"
                    >
                      Dùng thông tin lần trước
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Họ và tên" required half>
                    <input type="text" value={form.name} onChange={set("name")} placeholder="Nguyễn Khánh Linh" className={`${inputCls} ${missing("name") ? "border-red-300" : ""}`} />
                  </Field>
                  <Field label="Số điện thoại" required half>
                    <input type="tel" value={form.phone} onChange={set("phone")} placeholder="0909 000 000" className={`${inputCls} ${missing("phone") ? "border-red-300" : ""}`} />
                  </Field>
                  <Field label="Email (không bắt buộc)">
                    <input type="email" value={form.email} onChange={set("email")} placeholder="email@vidu.com" className={inputCls} />
                  </Field>
                  <Field label="Tỉnh / Thành phố" required half>
                    <select value={form.province} onChange={set("province")} className={`${inputCls} ${missing("province") ? "border-red-300" : ""} ${!form.province ? "text-ink-3/60" : ""}`}>
                      <option value="">Chọn tỉnh / thành phố</option>
                      {CHECKOUT_PROVINCES.map((p) => (
                        <option key={p} value={p} className="text-ink">
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Quận / Huyện" required half>
                    <input type="text" value={form.district} onChange={set("district")} placeholder="Quận 3" className={`${inputCls} ${missing("district") ? "border-red-300" : ""}`} />
                  </Field>
                  <Field label="Phường / Xã" required half>
                    <input type="text" value={form.ward} onChange={set("ward")} placeholder="Phường Võ Thị Sáu" className={`${inputCls} ${missing("ward") ? "border-red-300" : ""}`} />
                  </Field>
                  <Field label="Địa chỉ cụ thể" required>
                    <input type="text" value={form.street} onChange={set("street")} placeholder="Số nhà, tên đường, tòa nhà..." className={`${inputCls} ${missing("street") ? "border-red-300" : ""}`} />
                  </Field>
                  <Field label="Ghi chú giao hàng (không bắt buộc)">
                    <textarea rows={3} value={form.note} onChange={set("note")} placeholder="Thời gian nhận hàng thuận tiện, hướng dẫn giao..." className={`${inputCls} resize-none`}></textarea>
                  </Field>
                </div>
                {touched && !step1Valid && (
                  <p className="font-sans text-[12px] text-red-500 flex items-center gap-1.5">
                    <Icon.X size={14} />
                    Vui lòng điền đầy đủ các trường bắt buộc (*).
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="button" onClick={goPayment} className="px-8 py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-colors flex items-center justify-center gap-2">
                    Tiếp tục đến thanh toán
                    <Icon.ArrowR size={15} />
                  </button>
                  <Link href="/cart" className="px-7 py-4 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-colors flex items-center justify-center gap-2">
                    <Icon.ChevronL size={15} />
                    Quay lại giỏ hàng
                  </Link>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-divider">
                  <span className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
                    <Icon.Shield size={20} />
                  </span>
                  <h2 className="font-serif text-2xl text-ink font-semibold">Phương thức thanh toán</h2>
                </div>

                {/* Recap of shipping */}
                <div className="bg-brand-blue-light/60 border border-divider rounded-md p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-blue shrink-0 mt-0.5">
                      <Icon.Pin size={18} />
                    </span>
                    <div className="font-sans text-[13px] leading-relaxed">
                      <div className="font-bold text-ink">
                        {form.name} · {form.phone}
                      </div>
                      <div className="text-ink-2">{[form.street, form.ward, form.district, form.province].filter(Boolean).join(", ")}</div>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(0)} className="shrink-0 font-sans text-[10px] font-bold tracking-wider text-brand-blue uppercase hover:text-ink">
                    Sửa
                  </button>
                </div>

                <div className="space-y-3">
                  {PAYMENT_METHODS.map((m) => {
                    const II = Icon[m.icon];
                    const sel = payment === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPayment(m.id)}
                        className={`w-full text-left p-5 rounded-md border flex items-start gap-4 transition-all ${sel ? "border-brand-blue bg-brand-blue-light ring-1 ring-brand-blue" : "border-divider hover:border-brand-blue/50 bg-white"}`}
                      >
                        <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${sel ? "bg-brand-blue text-white" : "bg-light-bg text-brand-blue"}`}>
                          <II size={20} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-[16px] font-semibold text-ink">{m.label}</div>
                          <div className="font-sans text-[13px] text-ink-2 leading-relaxed mt-1">{m.desc}</div>
                        </div>
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${sel ? "border-brand-blue" : "border-divider"}`}>{sel && <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-mist border border-divider rounded-md p-4 flex items-start gap-3">
                  <span className="text-brand-blue shrink-0 mt-0.5">
                    <Icon.HeartHandshake size={18} />
                  </span>
                  <p className="font-sans text-[12px] text-ink-2 leading-relaxed">
                    Dù chọn phương thức nào, <strong className="text-ink">nhân viên Lennie</strong> luôn liên hệ trực tiếp với bạn để xác nhận đơn và hướng dẫn hoàn tất thanh toán cuối cùng một cách an toàn, minh bạch.
                  </p>
                </div>

                {orderError && (
                  <p className="font-sans text-[12px] text-red-500 flex items-center gap-1.5">
                    <Icon.X size={14} />
                    {orderError}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="button" disabled={placing} onClick={placeOrder} className="px-9 py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    <Icon.Check size={16} />
                    {placing ? "Đang xử lý..." : "Đặt hàng"}
                  </button>
                  <button
                    type="button"
                    disabled={placing}
                    onClick={() => {
                      setStep(0);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-7 py-4 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon.ChevronL size={15} />
                    Quay lại
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary column */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <OrderSummaryCard items={selectedItems} count={selectedCount} subtotal={selectedSubtotal} collapsible />
            </div>
          </div>
        </div>
      </div>

      {order && <CheckoutSuccess order={order} />}
    </section>
  );
}

export default function CheckoutView() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="shop" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Thanh toán"
        title="Hoàn tất"
        accent="đơn hàng."
        intro="Điền địa chỉ giao hàng và chọn phương thức thanh toán. Nhân viên Lennie sẽ liên hệ xác nhận và đồng hành cùng bạn ở bước thanh toán cuối cùng."
        crumb={[["Sản phẩm", "/shop"], ["Giỏ hàng", "/cart"], ["Thanh toán", null]]}
        img="/assets/remix/wellness-spa.png"
      />

      <CheckoutContent />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
