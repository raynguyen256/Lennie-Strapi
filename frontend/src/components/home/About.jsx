"use client";

import { useReveal, useDragScroll } from "@/lib/hooks";

export default function About({ founder, team }) {
  const drag = useDragScroll();
  const [bioRef, bioShown] = useReveal();
  return (
    <section id="about" className="bg-white py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3.5 py-1 rounded-sm uppercase">Đội ngũ chuyên môn</span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
            Người trực tiếp <span className="font-semibold italic text-brand-blue">đồng hành</span> cùng bạn
          </h2>
        </div>

        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className={`lg:col-span-5 rounded-md overflow-hidden shadow-md max-w-md mx-auto lg:mx-0 border border-divider reveal-x-l ${bioShown ? "is-in" : ""}`}>
            <div className="relative bg-gradient-to-b from-brand-blue-light to-teal-soft aspect-[4/5] flex items-end justify-center overflow-hidden">
              <img src={founder.portrait} alt={founder.name} className="h-full w-auto object-contain transition-transform duration-700 hover:scale-105 select-none" />
            </div>
          </div>
          <div className={`lg:col-span-7 space-y-6 reveal-x-r ${bioShown ? "is-in" : ""}`}>
            <div className="space-y-1">
              <span className="block font-sans text-[10px] font-bold tracking-[0.2em] text-brand-blue uppercase">Người sáng lập &amp; Chuyên gia trưởng</span>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-ink">{founder.name}</h3>
              <span className="block font-sans text-xs font-bold text-brand-blue tracking-wide uppercase">{founder.credential}</span>
            </div>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-xl">
              {founder.summary}
            </p>
            <ul className="space-y-3 pt-4 border-t border-divider text-ink font-sans text-[13px] font-semibold">
              {["Thạc sĩ Dược — Đại học Dược khoa", "Đào tạo chuyên sâu tại Mỹ, Châu Âu & Úc", "Chứng nhận hợp tác 50+ brand dược mỹ phẩm quốc tế", "Chứng chỉ hành nghề Da liễu Dược mỹ phẩm"].map((t, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0"></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full mb-4 relative">
          <div className="flex items-center justify-between mb-4 select-none">
            <span className="flex items-center gap-1.5 text-brand-blue text-[11px] font-sans font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
              Lướt để xem đội ngũ chuyên môn
            </span>
            <span className="text-[#6F8CA8] text-[11px] font-sans font-medium italic hidden sm:block">← Nhấn giữ &amp; kéo chuột qua lại →</span>
          </div>
          <div ref={drag} className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
            <div className="flex gap-6 w-max py-2">
              {team.map((m, i) => (
                <div key={i} className="bg-white border border-divider rounded-md overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 w-[280px] sm:w-[320px] md:w-[350px] shrink-0 select-none">
                  <div className="h-64 bg-brand-blue-light overflow-hidden relative group">
                    <img src={m.img} alt={m.name} draggable="false" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" />
                  </div>
                  <div className="p-5 flex justify-between items-center bg-white border-t border-divider">
                    <div>
                      <h4 className="font-sans text-[13px] font-bold text-ink tracking-wide uppercase">{m.name}</h4>
                      <p className="font-sans text-[11px] text-[#6F8CA8] mt-0.5">{m.role}</p>
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 bg-brand-blue-light hover:bg-brand-blue text-brand-blue hover:text-white rounded flex items-center justify-center font-bold text-xs transition-colors shrink-0">
                      in
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
