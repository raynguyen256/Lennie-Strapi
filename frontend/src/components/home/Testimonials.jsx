import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function Testimonials({ reviews }) {
  const doubled = [...reviews, ...reviews];
  return (
    <section id="testimonials" className="bg-brand-blue-light py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-blue bg-white border border-divider px-3.5 py-1 rounded-sm uppercase inline-block">Nhật ký đồng hành</span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
            Khách hàng <span className="font-semibold italic text-brand-blue">Người thật — Việc thật</span> nói gì?
          </h2>
          <p className="font-sans text-xs text-[#6F8CA8] max-w-lg mx-auto leading-relaxed">
            *Rê chuột vào thẻ cảm nhận để lật sang mặt sau xem ảnh chụp cận cảnh biến đổi da Trước — Sau lâm sàng.
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-6 select-none">
          <div className="marquee-slow flex gap-8">
            {doubled.map((r, idx) => (
              <Link key={idx} href="/case-study" className="flip-card w-[345px] h-[375px] shrink-0 cursor-pointer block">
                <div className="flip-inner relative w-full h-full">
                  <div className="flip-face absolute inset-0 bg-white text-ink rounded-md p-6 flex flex-col justify-between border border-divider shadow-sm">
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {Array.from({ length: r.stars }).map((_, i) => (
                          <Icon.Star key={i} size={14} className="text-brand-blue" fill="#5789B7" stroke="#5789B7" />
                        ))}
                      </div>
                      <p className="font-sans text-xs text-ink-2 leading-relaxed font-light italic">{r.text}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-divider mt-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-blue-light border border-divider shrink-0">
                        <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans text-[11px] font-bold tracking-wider uppercase text-ink">{r.name}</h4>
                        <p className="font-sans text-[9px] text-brand-blue tracking-wider uppercase">🩺 {r.caseType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flip-face flip-back absolute inset-0 bg-white text-ink rounded-md p-5 flex flex-col justify-between border border-divider shadow-md">
                    <div className="text-center pb-2 border-b border-divider">
                      <span className="font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase block">Kết quả điều trị thực tế</span>
                      <h4 className="font-serif text-[13px] font-bold text-ink mt-0.5">{r.improvement}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 py-3 h-44">
                      <div className="relative rounded overflow-hidden border border-red-100 flex flex-col justify-end">
                        <img src={r.img} alt="Trước" className="w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(.75) contrast(1.12) saturate(1.4) hue-rotate(340deg)" }} />
                        <div className="absolute inset-0 bg-red-800/10"></div>
                        <div className="relative z-10 bg-red-900/80 backdrop-blur-sm text-white py-1 text-center font-bold">
                          <span className="block text-[8px] tracking-wider">TRƯỚC</span>
                          <span className="block text-[7px] text-red-200 capitalize tracking-tight font-light">{r.beforeState}</span>
                        </div>
                      </div>
                      <div className="relative rounded overflow-hidden border border-emerald-100 flex flex-col justify-end">
                        <img src={r.img} alt="Sau" className="w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(1.08) contrast(.96) saturate(1.05)" }} />
                        <div className="absolute inset-0 bg-sky-400/5"></div>
                        <div className="relative z-10 bg-brand-blue/90 backdrop-blur-sm text-white py-1 text-center font-bold">
                          <span className="block text-[8px] tracking-wider">SAU {r.duration}</span>
                          <span className="block text-[7px] text-emerald-100 capitalize tracking-tight font-light">{r.afterState}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2.5 border-t border-divider text-center">
                      <p className="font-sans text-[10px] text-brand-blue leading-tight italic font-medium">&quot;Nhận định: {r.expertNote}&quot;</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
