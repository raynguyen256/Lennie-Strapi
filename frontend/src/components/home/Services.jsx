"use client";

import { useEffect, useState } from "react";

export default function Services({ slides, onOpenBooking }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#152639] select-none min-h-[600px] md:min-h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1300ms] ease-out ${idx === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"}`}
            style={{ backgroundImage: `url(${s.img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d2e]/80 via-[#0f1d2e]/35 to-[#0f1d2e]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d2e]/70 via-transparent to-[#0f1d2e]/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        <div className="lg:col-span-6 relative min-h-[340px] md:min-h-[380px] flex items-center w-full">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute top-0 left-0 w-full max-w-[480px] bg-white/97 text-ink p-7 md:p-9 rounded-[20px] md:rounded-[28px] shadow-2xl transition-all duration-700 ease-out flex flex-col gap-5 ${
                idx === i ? "opacity-100 translate-y-0 scale-100 z-20" : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none z-10"
              }`}
            >
              <span className="inline-block self-start font-sans text-[10px] md:text-[11px] font-black tracking-[0.22em] text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded" style={{ color: "rgb(255, 255, 255)" }}>
                {s.tag}
              </span>
              <h2 className="font-serif text-2xl md:text-[32px] leading-[1.15] text-ink font-bold tracking-tight" style={{ color: "rgb(255, 255, 255)" }}>
                {s.title}
              </h2>
              <p className="font-sans text-[13px] md:text-sm md:leading-[1.75] text-ink-2 font-medium" style={{ color: "rgb(255, 255, 255)" }}>
                {s.desc}
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="self-start px-6 py-3 bg-brand-blue hover:bg-ink text-white font-sans text-[9px] font-bold tracking-[0.2em] uppercase rounded transition-colors shadow-sm"
              >
                Đăng ký khám da ngay
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-between gap-12 lg:gap-0">
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3.5 md:gap-5 w-full justify-center lg:justify-end">
            {slides.map((s, i) => (
              <button key={i} type="button" onMouseEnter={() => setIdx(i)} onClick={() => setIdx(i)} className="group flex items-center justify-end py-2 outline-none cursor-pointer gap-4">
                <span className={`hidden lg:block h-px bg-white transition-all duration-500 origin-right ${idx === i ? "w-24 opacity-100" : "w-0 opacity-0 group-hover:w-16 group-hover:opacity-70"}`} />
                <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${idx === i ? "bg-white border-white scale-110" : "border-white/60 bg-transparent group-hover:border-white"}`} />
                <strong
                  className={`font-serif text-3xl md:text-5xl lg:text-7xl tracking-tighter leading-none transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ${
                    idx === i ? "text-white scale-100 font-bold" : "text-white/35 scale-90 font-light group-hover:text-white/80"
                  }`}
                >
                  0{i + 1}
                </strong>
              </button>
            ))}
          </div>
          <div className="text-center lg:text-right pt-6 lg:pt-14 w-full">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-[54px] font-extrabold text-white leading-[1.05] tracking-tight uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              Vì sao <span className="text-brand-teal italic font-semibold">Lennie</span>
              <br />được tin chọn?
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
