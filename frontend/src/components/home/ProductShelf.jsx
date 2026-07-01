"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import ProductQuickViewModal from "@/components/shop/ProductQuickViewModal";

export default function ProductShelf({ products, categoryTags = [], onAddToCart }) {
  const [tag, setTag] = useState("all");
  const [added, setAdded] = useState({});
  const [quick, setQuick] = useState(null);
  const tags = [{ slug: "all", label: "#XEMTẤTCẢ" }, ...categoryTags];
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
                key={t.slug}
                type="button"
                onClick={() => setTag(t.slug)}
                className={`px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase rounded-full border transition-all ${
                  tag === t.slug ? "border-brand-blue bg-brand-blue text-white shadow-sm" : "border-divider bg-white text-ink-2 hover:border-brand-blue"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => {
            const dim = tag !== "all" && !p.cats.includes(tag);
            return (
              <div
                key={p.id}
                className={`reveal-card bg-white border border-divider rounded-sm p-4 flex flex-col group transition-all duration-500 hover:shadow-[0_18px_50px_rgba(44,74,111,.12)] hover:border-brand-blue/40 ${shown ? "is-in" : ""} ${dim ? "border-dashed" : ""}`}
                style={{ transitionDelay: shown ? `${idx * 90}ms` : "0ms" }}
              >
                <div className={`transition-opacity duration-300 ${dim ? "opacity-40" : ""}`}>
                  <div className="h-60 bg-brand-blue-light rounded-sm overflow-hidden flex items-center justify-center p-6 relative mb-4">
                    {p.badge && (
                      <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white border ${p.badge === "Mới" ? "text-brand-teal border-brand-teal/60" : "text-brand-blue border-divider"}`}>
                        {p.badge}
                      </span>
                    )}

                    <img src={p.img} alt={p.name} className="h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setQuick(p)}
                        className="pointer-events-auto inline-flex items-center gap-2 bg-ink/90 backdrop-blur-sm text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 rounded-full hover:bg-brand-blue transition-colors shadow-lg"
                      >
                        <Icon.Search size={14} />
                        Xem thêm
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-1.5">{p.brand}</div>
                    <h3 className="font-serif text-[15px] font-medium text-ink leading-snug min-h-[40px]">{p.name}</h3>
                    <div className="font-sans text-[11px] text-[#6F8CA8] mt-1">{p.tag}</div>
                  </div>
                </div>
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
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-block px-8 py-3.5 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue hover:text-white transition-all">
            Xem toàn bộ sản phẩm
          </Link>
        </div>
      </div>

      <ProductQuickViewModal product={quick} onClose={() => setQuick(null)} added={quick ? !!added[quick.id] : false} onAdd={add} />
    </section>
  );
}
