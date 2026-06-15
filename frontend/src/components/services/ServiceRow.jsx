"use client";

import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

export default function ServiceRow({ service, index, onOpenBooking }) {
  const [ref, shown] = useReveal();
  const reverse = index % 2 === 1;
  const I = Icon[service.categoryIcon] || Icon.Sparkles;

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={`${reverse ? "lg:order-2" : ""} reveal-x-l ${shown ? "is-in" : ""}`}>
        <div className="relative rounded-md overflow-hidden border border-divider shadow-sm aspect-[5/4] bg-brand-blue-light">
          <img src={service.img} alt={service.title} className="w-full h-full object-cover hover:scale-[1.03] transition duration-700 select-none" />
          {service.flagship && (
            <span className="absolute top-4 left-4 bg-brand-blue text-white font-sans text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm shadow">
              ★ Flagship
            </span>
          )}
          {service.duration && (
            <span className="absolute bottom-4 left-4 bg-white/85 backdrop-blur-md text-ink font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm border border-white/50 flex items-center gap-1.5">
              <Icon.Clock size={12} className="text-brand-blue" />
              {service.duration}
            </span>
          )}
        </div>
      </div>
      <div className={`${reverse ? "lg:order-1" : ""} space-y-5 reveal-x-r ${shown ? "is-in" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue shrink-0">
            <I size={20} />
          </span>
          <span className="font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue uppercase">{service.category}</span>
        </div>
        <h3 className="font-serif text-[26px] md:text-[32px] text-ink font-light leading-tight tracking-tight">{service.title}</h3>
        <p className="font-sans text-sm text-ink-2 leading-relaxed">{service.summary}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
          {service.includes.map((it, k) => (
            <li key={k} className="flex items-start gap-2.5 font-sans text-[13px] text-ink-2">
              <span className="text-brand-blue mt-0.5 shrink-0">
                <Icon.Check size={15} />
              </span>
              {it}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-4 pt-5 border-t border-divider">
          <div>
            <span className="block font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase mb-1">Chi phí tham khảo</span>
            <span className="font-serif text-2xl font-bold text-ink">{service.price}</span>
            {service.priceNote && <span className="font-sans text-[11px] text-ink-3 ml-1">{service.priceNote}</span>}
          </div>
          <div className="flex gap-3">
            <Link
              href={`/services/${service.slug}`}
              className="px-5 py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all"
            >
              Xem chi tiết
            </Link>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-5 py-3 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-ink transition-all shadow-sm"
            >
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
