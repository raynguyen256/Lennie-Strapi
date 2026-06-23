"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";

export const CONSULT_SERVICES = [
  { id: "routine", label: "Cá nhân hóa phác đồ" },
  { id: "product", label: "Tư vấn mua sản phẩm lẻ" },
];

export const MESSENGER_URL = "https://m.me/lennie.skinlab";

export function consultServiceLabel(id) {
  const f = CONSULT_SERVICES.find((s) => s.id === id);
  return f ? f.label : id;
}

export function buildConsultMessage({ name, skin, serviceLabel, phone }) {
  return [
    "Xin chào Lennie SkinLab! Em muốn được tư vấn ạ 🌿",
    "• Họ và tên: " + (name || "(chưa điền)"),
    "• SĐT: " + (phone || "(chưa điền)"),
    "• Tình trạng da: " + (skin || "(chưa mô tả)"),
    "• Dịch vụ muốn đăng ký: " + (serviceLabel || ""),
  ].join("\n");
}

export function openMessengerWith(msg) {
  try {
    if (navigator.clipboard) navigator.clipboard.writeText(msg);
  } catch (e) {}
  window.open(MESSENGER_URL, "_blank", "noopener");
}

export default function ConsultForm({ defaultService = "routine", lockedServiceLabel = null, buttonLabel = "Gửi & tư vấn qua Messenger", source = "contact-page", onClose }) {
  const [name, setName] = useState("");
  const [skin, setSkin] = useState("");
  const [service, setService] = useState(defaultService);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const serviceLabel = lockedServiceLabel || consultServiceLabel(service);
  const msg = buildConsultMessage({ name, skin, serviceLabel, phone });
  const submit = (e) => {
    e.preventDefault();
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, skinCondition: skin, serviceInterest: serviceLabel, source }),
    }).catch((err) => console.error("[ConsultForm] lead submit failed", err));
    openMessengerWith(msg);
    setSent(true);
  };
  const reset = () => {
    setName("");
    setSkin("");
    setService(defaultService);
    setPhone("");
    setSent(false);
  };

  if (sent) {
    return (
      <div className="py-6 text-center space-y-5">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-brand-blue border border-divider">
          <Icon.Message size={30} />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl font-bold text-ink">Đang chuyển tới Messenger…</h3>
          <p className="font-sans text-sm text-ink-2 max-w-md mx-auto leading-relaxed">
            Cửa sổ Messenger đã mở để bạn tiếp tục tư vấn cùng Lennie. Nội dung dưới đây đã được sao chép sẵn — chỉ cần dán &amp; gửi.
          </p>
        </div>
        <div className="bg-white border border-divider rounded-md p-5 text-left max-w-md mx-auto">
          <span className="block font-sans text-[10px] font-bold tracking-widest text-ink-3 uppercase mb-3">Thông tin gửi đi</span>
          <pre className="font-sans text-[13px] text-ink-2 leading-relaxed whitespace-pre-wrap">{msg}</pre>
        </div>
        <div className="flex flex-wrap gap-3 justify-center pt-1">
          <button type="button" onClick={() => openMessengerWith(msg)} className="px-6 py-3 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors">
            Mở lại Messenger
          </button>
          <button type="button" onClick={reset} className="px-6 py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-brand-blue-light transition-colors">
            Gửi yêu cầu khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Họ và tên*</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ và tên"
            className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Số điện thoại*</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0909 000 000"
            className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Tình trạng da*</label>
        <textarea
          rows={3}
          required
          value={skin}
          onChange={(e) => setSkin(e.target.value)}
          placeholder="Ví dụ: da mụn ẩn lâu năm, da nhạy cảm mẩn đỏ, đang dùng retinol bị kích ứng..."
          className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60 resize-none"
        ></textarea>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Dịch vụ muốn đăng ký*</label>
        {lockedServiceLabel ? (
          <div className="w-full px-4 py-3 bg-brand-blue-light border border-brand-blue/30 rounded-sm font-sans text-sm text-ink font-semibold flex items-center gap-2">
            <Icon.Check size={15} className="text-brand-blue" />
            {lockedServiceLabel}
          </div>
        ) : (
          <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-sm text-ink">
            {CONSULT_SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button type="submit" className="px-8 py-4 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all shadow-md flex items-center gap-2">
          <Icon.Message size={15} />
          {buttonLabel}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="px-6 py-4 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-brand-blue-light transition-colors">
            Hủy bỏ
          </button>
        )}
      </div>
      <p className="font-sans text-[11px] text-ink-3 flex items-center gap-1.5">
        <Icon.Shield size={13} className="text-brand-blue shrink-0" />
        Nhấn gửi để tiếp tục trò chuyện cùng chuyên gia qua Messenger.
      </p>
    </form>
  );
}
