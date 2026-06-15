"use client";

import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function ProductQuickViewModal({ product: p, onClose, added, onAdd }) {
  if (!p) return null;

  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10">
          <Icon.X size={20} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative bg-brand-blue-light aspect-square sm:aspect-auto flex items-center justify-center p-10">
            {p.badge && (
              <span className={`absolute top-5 left-5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm bg-white border ${p.badge === "Mới" ? "text-brand-teal border-brand-teal/60" : "text-brand-blue border-divider"}`}>
                {p.badge}
              </span>
            )}
            <img src={p.img} alt={p.name} className="h-full max-h-[300px] w-auto object-contain" />
          </div>
          <div className="p-7 md:p-8 space-y-4 flex flex-col">
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-brand-teal">{p.brand}</span>
            <h3 className="font-serif text-[26px] text-ink font-light leading-tight tracking-tight">{p.name}</h3>
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-brand-blue">
                {Array.from({ length: Math.round(p.rating) }).map((_, i) => (
                  <Icon.Star key={i} size={13} fill="#5789B7" stroke="#5789B7" />
                ))}
              </span>
              <span className="font-sans text-[11px] text-ink-3">{p.reviews} đánh giá</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-serif text-3xl font-bold text-ink">{p.price}</span>
              {p.oldPrice && <span className="font-sans text-sm text-ink-3 line-through mb-1">{p.oldPrice}</span>}
            </div>
            {p.excerpt && <p className="font-sans text-sm text-ink-2 leading-relaxed">{p.excerpt}</p>}
            {p.skinTypes?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase w-full">Phù hợp loại da</span>
                {p.skinTypes.map((sk) => (
                  <span key={sk} className="font-sans text-[11px] font-semibold text-brand-blue bg-brand-blue-light border border-divider px-3 py-1 rounded-full">
                    {sk}
                  </span>
                ))}
              </div>
            )}
            {p.type && (
              <div className="flex items-center gap-2 font-sans text-[12px] text-ink-2 pt-1">
                <Icon.Clipboard size={14} className="text-brand-blue" />
                Loại: <strong className="text-ink">{p.type}</strong>
              </div>
            )}
            <div className="mt-auto pt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => onAdd(p)}
                className={`w-full py-3.5 rounded-sm font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${added ? "bg-brand-teal text-white" : "bg-ink text-white hover:bg-brand-blue"}`}
              >
                {added ? (
                  <>
                    <Icon.Check size={14} /> Đã thêm vào giỏ
                  </>
                ) : (
                  <>
                    <Icon.Plus size={14} /> Thêm vào giỏ
                  </>
                )}
              </button>
              <Link
                href={`/shop/${p.slug}`}
                className="w-full py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all flex items-center justify-center gap-2"
              >
                Xem chi tiết đầy đủ <Icon.ArrowR size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
