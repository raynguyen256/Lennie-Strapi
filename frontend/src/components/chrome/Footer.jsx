"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  const [subMsg, setSubMsg] = useState("Đăng ký thành công!");
  const [error, setError] = useState(null);

  const go = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đăng ký thất bại");
      setSubMsg(data.duplicate ? "Email này đã có trong danh sách." : "Đăng ký thành công!");
      setSub(true);
      setTimeout(() => {
        setEmail("");
        setSub(false);
      }, 4000);
    } catch (err) {
      setError(err.message || "Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  return (
    <footer className="bg-light-bg text-ink-2 pt-20 pb-10 border-t border-divider font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <img src="/assets/logo-lennie.png" alt="Lennie SkinLab" className="h-12 w-auto" />
            <p className="text-sm text-ink-2 leading-relaxed max-w-sm">
              Lennie SkinLab tin vào sức mạnh chữa lành của y học lâm sàng và dược mỹ phẩm chọn lọc độc quyền. Chúng tôi đồng hành trao gửi làn da khỏe mạnh nguyên bản nhất cho bạn.
            </p>
            <div className="flex gap-2.5">
              {["Fb", "Ig", "Zl", "Tk"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full bg-white hover:bg-brand-blue hover:text-white border border-divider flex items-center justify-center text-xs font-bold uppercase transition-colors cursor-pointer text-brand-blue select-none"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Khám phá</h4>
            <div className="flex flex-col gap-3 text-sm">
              {[
                ["Về chúng tôi", "/about"],
                ["Dịch vụ điều trị", "/services"],
                ["Sản phẩm", "/shop"],
                ["Đánh giá khách hàng", "/testimonials"],
                ["Blog da liễu", "/blog"],
                ["Đặt lịch", "/booking"],
              ].map(([t, h]) => (
                <Link key={h} href={h} className="hover:text-brand-blue transition-colors text-ink-2">
                  {t}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Nhận tin tức</h4>
            <p className="text-sm text-ink-2 leading-relaxed">
              Đăng ký để nhận kiến thức chăm da khoa học &amp; ưu đãi dịch vụ mới nhất từ Lennie SkinLab.
            </p>
            <form onSubmit={go} className="relative mt-4">
              <input
                type="email"
                placeholder="Địa chỉ Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-divider rounded p-3 pr-12 text-sm text-ink placeholder-[#6F8CA8] focus:outline-none focus:border-brand-blue"
              />
              <button
                type="submit"
                aria-label="Đăng ký"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue hover:bg-ink text-white rounded transition-colors"
              >
                <Icon.ArrowR size={14} />
              </button>
            </form>
            {sub && (
              <div className="flex items-center gap-1.5 text-sm text-brand-blue pt-1 font-semibold">
                <Icon.Check size={16} />
                <span>{subMsg}</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-1.5 text-sm text-red-500 pt-1 font-semibold">
                <Icon.X size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Liên hệ</h4>
            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex gap-2.5 items-start">
                <span className="text-brand-blue shrink-0 mt-0.5">
                  <Icon.Pin size={16} />
                </span>
                <span className="text-ink-2 leading-snug">
                  Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex gap-2.5 items-center">
                <span className="text-brand-blue">
                  <Icon.Phone size={16} />
                </span>
                <span className="text-ink-2">+84 909 123 456</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-brand-blue shrink-0 mt-0.5">
                  <Icon.Clock size={16} />
                </span>
                <span className="text-ink-2 leading-snug">
                  Thứ 2 – Thứ 7
                  <br />
                  8:00 – 20:00 (Nghỉ Chủ Nhật)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-divider flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] md:text-xs">
          <span>© 2026 Lennie SkinLab · ThS. DS. Hoàng Hồng Thắm. Bảo lưu mọi quyền.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-blue transition-colors">Chính sách bảo mật</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-blue transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
