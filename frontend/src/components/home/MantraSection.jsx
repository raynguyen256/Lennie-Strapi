"use client";

import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

export default function MantraSection({ cards }) {
  const [ref, shown] = useReveal();
  return (
    <section className="bg-white py-20 border-b border-divider text-center">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-[34px] font-light text-ink leading-snug tracking-tight max-w-2xl mx-auto">
          Khỏe mạnh từ gốc tế bào,
          <br />
          <span className="font-semibold italic">Rạng rỡ vẹn nguyên bản sắc.</span>
        </h2>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const I = Icon[c.icon];
            return (
              <div
                key={i}
                className={`reveal-card bg-white border border-divider rounded-md p-8 shadow-sm flex flex-col items-center gap-4 hover:shadow-md hover:border-brand-blue/40 hover:-translate-y-1.5 transition-all duration-500 ${shown ? "is-in" : ""}`}
                style={{ transitionDelay: shown ? `${i * 100}ms` : "0ms" }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
                  <I size={24} />
                </div>
                <h3 className="font-serif text-[17px] font-bold text-ink">{c.title}</h3>
                <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed max-w-[220px]">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
