"use client";

import { useReveal } from "@/lib/hooks";

const CREDENTIALS = [
  "Thạc sĩ Dược — Đại học Dược khoa",
  "Đào tạo chuyên sâu tại Mỹ, Châu Âu & Úc",
  "Chứng nhận hợp tác 50+ brand dược mỹ phẩm quốc tế",
  "Chứng chỉ hành nghề Da liễu Dược mỹ phẩm",
];

export default function AboutFounder({ founder, founderTimeline }) {
  const [ref, shown] = useReveal();

  return (
    <section className="bg-white py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className={`lg:col-span-5 rounded-md overflow-hidden shadow-md max-w-md mx-auto lg:mx-0 border border-divider reveal-x-l ${shown ? "is-in" : ""}`}>
            <div className="relative bg-gradient-to-b from-brand-blue-light to-teal-soft aspect-[4/5] flex items-end justify-center overflow-hidden">
              <img src={founder.portrait} alt={founder.name} className="h-full w-auto object-contain transition-transform duration-700 hover:scale-105 select-none" />
            </div>
          </div>
          <div className={`lg:col-span-7 space-y-6 reveal-x-r ${shown ? "is-in" : ""}`}>
            <div className="space-y-1">
              <span className="block font-sans text-[10px] font-bold tracking-[0.2em] text-brand-blue uppercase">Người sáng lập &amp; Chuyên gia trưởng</span>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-ink">{founder.name}</h3>
              <span className="block font-sans text-xs font-bold text-brand-blue tracking-wide uppercase">{founder.credential}</span>
            </div>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-xl">{founder.summary}</p>
            <ul className="space-y-3 pt-4 border-t border-divider text-ink font-sans text-[13px] font-semibold">
              {CREDENTIALS.map((t, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0"></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {founderTimeline.map((t, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-divider">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-brand-blue"></span>
              <span className="font-serif text-2xl font-semibold text-brand-blue">{t.year}</span>
              <h4 className="font-sans text-[13px] font-bold text-ink uppercase tracking-wide mt-2">{t.title}</h4>
              <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed mt-1.5">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
