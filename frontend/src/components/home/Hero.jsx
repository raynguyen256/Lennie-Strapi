"use client";

import { useEffect, useState } from "react";

export default function Hero({ hero, onOpenBooking, onOpenQuiz }) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % 4), 4200);
    return () => clearInterval(t);
  }, []);

  const headingWords = hero.heading.trim().split(/\s+/);
  const headingFirst = headingWords[0];
  const headingRest = headingWords.slice(1).join(" ");

  return (
    <section id="top" className="bg-white relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center border-b border-divider/50">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={hero.image}
          alt={hero.heading}
          className="w-full h-full object-cover md:object-cover object-right opacity-60 md:opacity-100 select-none hero-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 md:via-white/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/10"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-2xl">
          <span className="reveal reveal-1 inline-block font-sans text-[10px] md:text-[11px] font-extrabold tracking-[0.4em] text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-sm uppercase">
            {hero.eyebrow}
          </span>
          <h1 className="reveal reveal-2 font-serif text-[44px] md:text-[62px] lg:text-[74px] font-light text-ink leading-[1.04] tracking-tight mt-5">
            {headingFirst}
            <br />
            <span className="font-semibold italic">{headingRest}</span>
          </h1>
          <p className="reveal reveal-3 font-sans text-sm lg:text-[15px] text-ink-2 leading-relaxed max-w-lg font-medium mt-7">
            {hero.text}
          </p>
          <div className="reveal reveal-4 flex flex-wrap items-center gap-4 mt-9">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-9 py-4 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all shadow-md hover:shadow-xl active:translate-y-0.5"
            >
              Đặt lịch trị liệu ngay
            </button>
            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-8 py-3.5 border border-brand-blue/35 hover:border-brand-blue text-ink font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm transition-all bg-white/85 hover:bg-white backdrop-blur-sm"
            >
              Phân tích da miễn phí
            </button>
          </div>
          <div className="reveal reveal-5 flex gap-2.5 mt-10">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-1 rounded-full transition-all duration-500 ${slide === i ? "w-10 bg-brand-blue" : "w-5 bg-brand-blue/20 hover:bg-brand-blue/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
