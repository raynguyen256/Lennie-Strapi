"use client";

import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import SectionHead from "@/components/chrome/SectionHead";

export default function AboutValues({ brandValues }) {
  const [ref, shown] = useReveal();

  return (
    <section className="bg-brand-blue-light py-20 border-y border-divider">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <SectionHead
          center
          eyebrow="Giá trị cốt lõi"
          title="Bốn cam kết"
          accent="định hình mọi liệu trình"
          intro="Cá nhân hóa · Chuyên môn · Minh bạch · Bền vững — kim chỉ nam cho từng quyết định chăm sóc da tại Lennie."
        />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandValues.map((c, i) => {
            const I = Icon[c.icon];
            return (
              <div
                key={i}
                className={`reveal-card bg-white border border-divider rounded-md p-8 shadow-sm flex flex-col items-start gap-4 hover:shadow-md hover:border-brand-blue/40 hover:-translate-y-1.5 transition-all duration-500 ${shown ? "is-in" : ""}`}
                style={{ transitionDelay: shown ? `${i * 100}ms` : "0ms" }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
                  <I size={24} />
                </div>
                <h3 className="font-serif text-[19px] font-bold text-ink">{c.title}</h3>
                <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
