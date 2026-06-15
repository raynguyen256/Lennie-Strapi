"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

export default function ProductShelf({ products, onAddToCart }) {
  const [tag, setTag] = useState("#XEMTẤTCẢ");
  const [added, setAdded] = useState({});
  const tags = ["#XEMTẤTCẢ", "#BÁNCHẠY", "#CẤPẨMSÂU", "#PHỤCHỒIDA"];
  const [ref, shown] = useReveal();

  const add = (p) => {
    onAddToCart(p);
    setAdded((a) => ({ ...a, [p.id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [p.id]: false })), 1400);
  };

  return (
    <section id="essential-care" className="bg-white py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light tracking-wide uppercase leading-tight">
            Dược Mỹ Phẩm <br className="hidden sm:inline" />
            <span className="font-semibold">Chọn Lọc Độc Quyền</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={`px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase rounded-full border transition-all ${
                  tag === t ? "border-brand-blue bg-brand-blue text-white shadow-sm" : "border-divider bg-white text-ink-2 hover:border-brand-blue"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => {
            const dim = tag !== "#XEMTẤTCẢ" && !p.cats.includes(tag);
            return (
              <div
                key={p.id}
                className={`reveal-card bg-white border border-divider rounded-sm p-4 flex flex-col group transition-all duration-500 hover:shadow-[0_18px_50px_rgba(44,74,111,.12)] hover:border-brand-blue/40 ${shown ? "is-in" : ""} ${dim ? "opacity-35 saturate-50" : ""}`}
                style={{ transitionDelay: shown ? `${idx * 90}ms` : "0ms" }}
              >
                <div className="h-60 bg-brand-blue-light rounded-sm overflow-hidden flex items-center justify-center p-6 relative mb-4">
                  {p.badge && (
                    <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white border ${p.badge === "Mới" ? "text-brand-teal border-brand-teal/60" : "text-brand-blue border-divider"}`}>
                      {p.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 border border-divider flex items-center justify-center text-ink-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-ink hover:text-white" aria-label="Yêu thích">
                    <Icon.Heart size={14} />
                  </button>
                  <img src={p.img} alt={p.name} className="h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-1.5">{p.brand}</div>
                  <h3 className="font-serif text-[15px] font-medium text-ink leading-snug min-h-[40px]">{p.name}</h3>
                  <div className="font-sans text-[11px] text-[#6F8CA8] mt-1">{p.tag}</div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-divider">
                    <span className="font-serif text-[17px] font-bold text-ink">{p.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => add(p)}
                    className={`mt-3 w-full py-3 rounded-sm font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${
                      added[p.id] ? "bg-brand-teal text-white" : "bg-ink text-white hover:bg-brand-blue"
                    }`}
                  >
                    {added[p.id] ? (
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
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-block px-8 py-3.5 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue hover:text-white transition-all">
            Xem toàn bộ sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
