"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { BOOK_SLOTS } from "@/lib/data";

export default function BookingForm({ services, branches, defaultService }) {
  const [service, setService] = useState(defaultService || services[0]?.slug || "");
  const [prevDefaultService, setPrevDefaultService] = useState(defaultService);
  const [branch, setBranch] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const sName = services.find((s) => s.slug === service)?.title || "";

  if (defaultService && defaultService !== prevDefaultService) {
    setPrevDefaultService(defaultService);
    setService(defaultService);
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!date || !time || !name || !phone) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: service,
          serviceName: sName,
          branchName: branches[branch]?.name,
          date,
          time,
          name,
          phone,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đặt lịch thất bại");
      setBooked(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Đặt lịch thất bại, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setBooked(false);
    setDate("");
    setTime("");
    setName("");
    setPhone("");
    setNotes("");
  };

  if (booked) {
    return (
      <div className="bg-white border border-divider rounded-md shadow-sm p-8 md:p-10 text-center space-y-6">
        <div className="w-16 h-16 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center mx-auto">
          <Icon.CheckCircle size={40} />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink">Đặt lịch thành công!</h3>
          <p className="font-sans text-sm text-ink-2 mt-2">Lennie SkinLab sẽ liên hệ qua Zalo/SĐT để xác nhận lịch hẹn của bạn.</p>
        </div>
        <div className="bg-mist p-6 rounded-md text-left border border-divider grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-ink-2">
          <div className="flex items-center gap-2">
            <Icon.Clipboard size={15} className="text-brand-blue" />
            <strong>{sName}</strong>
          </div>
          <div className="flex items-center gap-2">
            <Icon.Pin size={15} className="text-brand-blue" />
            {branches[branch]?.name}
          </div>
          <div className="flex items-center gap-2">
            <Icon.Calendar size={15} className="text-brand-blue" />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <Icon.Clock size={15} className="text-brand-blue" />
            {time}
          </div>
        </div>
        <button type="button" onClick={reset} className="px-7 py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-brand-blue-light transition-colors">
          Đặt lịch khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-divider rounded-md shadow-sm p-7 md:p-9 space-y-5">
      <div className="space-y-1.5">
        <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Dịch vụ điều trị*</label>
        <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-3.5 bg-mist border border-divider rounded-sm font-sans text-sm text-ink focus:outline-none focus:border-brand-blue">
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title} — {s.price}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Cơ sở mong muốn*</label>
        <select value={branch} onChange={(e) => setBranch(Number(e.target.value))} className="w-full p-3.5 bg-mist border border-divider rounded-sm font-sans text-sm text-ink focus:outline-none focus:border-brand-blue">
          {branches.map((b, i) => (
            <option key={i} value={i}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Chọn ngày*</label>
          <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} required className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Khung giờ*</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} required className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink">
            <option value="">-- Chọn giờ --</option>
            {BOOK_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Họ và tên*</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nguyễn Văn A" className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink placeholder-ink-3/60" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">SĐT / Zalo*</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="0909 000 000" className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink placeholder-ink-3/60" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Ghi chú tình trạng da (tùy chọn)</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ví dụ: da mụn ẩn lâu năm, da nhạy cảm mẩn đỏ..."
          className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink resize-none placeholder-ink-3/60"
        ></textarea>
      </div>
      {error && (
        <p className="font-sans text-[12px] text-red-500 flex items-center gap-1.5">
          <Icon.X size={14} />
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className="w-full py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-all shadow-sm disabled:opacity-60">
        {submitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
      </button>
      <p className="font-sans text-[11px] text-ink-3 text-center">Thanh toán tại chỗ · Không cần đặt cọc online</p>
    </form>
  );
}
