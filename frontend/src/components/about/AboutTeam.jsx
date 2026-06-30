"use client";

import { useDragScroll } from "@/lib/hooks";

export default function AboutTeam({ team }) {
  const ref = useDragScroll();

  return (
    <section className="bg-brand-blue-light py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-white px-3.5 py-1 rounded-sm uppercase border border-divider">
            Đội ngũ chuyên môn
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
            Những người trực tiếp <span className="font-semibold italic text-brand-blue">đồng hành</span>
          </h2>
          <p className="font-sans text-[11px] text-ink-3 italic">⚠ Tên đội ngũ hiện là placeholder — sẽ thay bằng thông tin thật từ client.</p>
        </div>
        <div className="flex items-center justify-between mb-4 select-none">
          <span className="flex items-center gap-1.5 text-brand-blue text-[11px] font-sans font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
            Lướt để xem đội ngũ
          </span>
          <span className="text-[#6F8CA8] text-[11px] font-sans font-medium italic hidden sm:block">← Nhấn giữ &amp; kéo chuột →</span>
        </div>
        <div ref={ref} className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 w-max py-2">
            {team.map((m, i) => (
              <div
                key={i}
                className="bg-white border border-divider rounded-md overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 w-[280px] sm:w-[320px] shrink-0 select-none"
              >
                <div className="h-64 bg-brand-blue-light overflow-hidden relative group">
                  <img src={m.img} alt={m.name} draggable="false" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" />
                </div>
                <div className="p-5 bg-white border-t border-divider">
                  <h4 className="font-sans text-[13px] font-bold text-ink tracking-wide uppercase">{m.name}</h4>
                  <p className="font-sans text-[11px] text-[#6F8CA8] mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
