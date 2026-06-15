"use client";

import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import SectionHead from "@/components/chrome/SectionHead";

const STEPS = [
  { n: "01", t: "Đọc vị làn da", d: "Phân tích nền da, hàng rào bảo vệ và khả năng thích nghi hoạt chất trong 60 phút.", icon: "Microscope" },
  { n: "02", t: "Thiết kế phác đồ", d: "Xây liệu trình AM/PM cá nhân hóa, chọn đúng hoạt chất và nồng độ cho cơ địa.", icon: "Clipboard" },
  { n: "03", t: "Đồng hành & tinh chỉnh", d: "Theo dõi tiến triển hàng tuần, điều chỉnh khi da bước sang giai đoạn mới.", icon: "HeartHandshake" },
];

export default function ServicesApproach() {
  const [ref, shown] = useReveal();

  return (
    <section className="bg-brand-blue-light py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <SectionHead center eyebrow="Quy trình đồng hành" title="Ba bước" accent="từ đọc vị đến phục hồi" />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => {
            const I = Icon[s.icon];
            return (
              <div
                key={i}
                className={`reveal-card bg-white border border-divider rounded-md p-8 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-500 ${shown ? "is-in" : ""}`}
                style={{ transitionDelay: shown ? `${i * 110}ms` : "0ms" }}
              >
                <span className="absolute -top-3 -right-1 font-serif text-[80px] font-bold text-brand-blue-light leading-none select-none">{s.n}</span>
                <div className="relative space-y-3">
                  <span className="w-12 h-12 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
                    <I size={22} />
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ink">{s.t}</h3>
                  <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed">{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
