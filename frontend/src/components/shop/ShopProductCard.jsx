"use client";

import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function ShopProductCard({ product: p, added, onAdd, onQuickView }) {
  return (
    <div className="bg-white border border-divider rounded-sm p-4 flex flex-col group transition-all duration-300 hover:shadow-[0_18px_50px_rgba(44,74,111,.12)] hover:border-brand-blue/40">
      <div className="relative h-56 bg-brand-blue-light rounded-sm overflow-hidden mb-4">
        <Link href={`/shop/${p.slug}`} className="absolute inset-0 flex items-center justify-center p-6">
          {p.badge && (
            <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white border ${p.badge === "Mới" ? "text-brand-teal border-brand-teal/60" : "text-brand-blue border-divider"}`}>
              {p.badge}
            </span>
          )}
          <img src={p.img} alt={p.name} className="h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500" />
        </Link>
        <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <button
            type="button"
            onClick={() => onQuickView(p)}
            className="pointer-events-auto inline-flex items-center gap-2 bg-ink/90 backdrop-blur-sm text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 rounded-full hover:bg-brand-blue transition-colors shadow-lg"
          >
            <Icon.Search size={14} />
            Xem nhanh
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-1.5">{p.brand}</div>
        <Link href={`/shop/${p.slug}`} className="font-serif text-[15px] font-medium text-ink leading-snug min-h-[40px] hover:text-brand-blue transition-colors">
          {p.name}
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="flex gap-0.5 text-brand-blue">
            {Array.from({ length: Math.round(p.rating) }).map((_, i) => (
              <Icon.Star key={i} size={11} fill="#5789B7" stroke="#5789B7" />
            ))}
          </span>
          <span className="font-sans text-[10px] text-ink-3">({p.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-divider">
          <span className="font-serif text-[17px] font-bold text-ink">{p.price}</span>
          {p.oldPrice && <span className="font-sans text-[12px] text-ink-3 line-through">{p.oldPrice}</span>}
        </div>
        <button
          type="button"
          onClick={() => onAdd(p)}
          className={`mt-3 w-full py-3 rounded-sm font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${added ? "bg-brand-teal text-white" : "bg-ink text-white hover:bg-brand-blue"}`}
        >
          {added ? (
            <>
              <Icon.Check size={14} /> Đã thêm
            </>
          ) : (
            <>
              <Icon.Plus size={14} /> Thêm vào giỏ
            </>
          )}
        </button>
      </div>
    </div>
  );
}
