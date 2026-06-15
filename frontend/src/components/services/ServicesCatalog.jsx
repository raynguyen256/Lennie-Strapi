"use client";

import { useMemo, useRef, useState } from "react";
import ServiceCategoryFilters from "./ServiceCategoryFilters";
import ServiceRow from "./ServiceRow";
import { Icon } from "@/lib/icons";

const PER_PAGE = 5;

export default function ServicesCatalog({ services, onOpenBooking, onOpenQuiz }) {
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const categories = useMemo(() => {
    const seen = new Map();
    services.forEach((s) => {
      if (s.category && !seen.has(s.category)) seen.set(s.category, s.categoryIcon);
    });
    return Array.from(seen.entries()).map(([name, icon]) => ({ name, icon }));
  }, [services]);

  const pages = Math.max(1, Math.ceil(services.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = services.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);
  const activeCat = shown[0]?.category || categories[0]?.name;

  const scrollToTop = () => {
    if (!topRef.current) return;
    const y = topRef.current.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const goToPage = (p) => {
    setPage(p);
    setTimeout(scrollToTop, 60);
  };

  const goToCategory = (catName) => {
    const idx = services.findIndex((s) => s.category === catName);
    if (idx < 0) return;
    goToPage(Math.floor(idx / PER_PAGE) + 1);
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6" ref={topRef}>
        <ServiceCategoryFilters categories={categories} active={activeCat} onSelect={goToCategory} />

        <p className="text-center font-sans text-[13px] text-ink-2 leading-relaxed mt-5">
          Chưa chắc dịch vụ nào hợp da? Làm{" "}
          <button type="button" onClick={onOpenQuiz} className="text-brand-blue font-bold underline underline-offset-2 hover:text-ink transition-colors">
            phân tích da miễn phí
          </button>{" "}
          để nhận gợi ý.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pb-5 border-b border-divider mt-10 mb-12">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] text-brand-blue uppercase">{activeCat}</span>
            <p className="font-sans text-[13px] text-ink-2 mt-1">
              Tất cả <strong className="text-ink">{services.length}</strong> dịch vụ · Trang {cur}/{pages}
            </p>
          </div>
          <span className="font-sans text-[11px] text-ink-3 italic hidden sm:block">Chọn danh mục để chuyển trang dịch vụ</span>
        </div>

        <div className="space-y-16 md:space-y-20">
          {shown.map((s, i) => (
            <ServiceRow key={s.slug} service={s} index={(cur - 1) * PER_PAGE + i} onOpenBooking={onOpenBooking} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-16">
          <button
            type="button"
            onClick={() => goToPage(Math.max(1, cur - 1))}
            disabled={cur === 1}
            className={`w-10 h-10 rounded-sm border flex items-center justify-center ${cur === 1 ? "border-divider text-ink-3/40 cursor-not-allowed" : "border-divider text-ink hover:border-brand-blue hover:text-brand-blue"}`}
          >
            <Icon.ChevronL size={16} />
          </button>
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToPage(i + 1)}
              className={`w-10 h-10 rounded-sm border font-sans text-sm font-bold transition-all ${cur === i + 1 ? "bg-brand-blue border-brand-blue text-white" : "border-divider text-ink hover:border-brand-blue"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(Math.min(pages, cur + 1))}
            disabled={cur === pages}
            className={`w-10 h-10 rounded-sm border flex items-center justify-center ${cur === pages ? "border-divider text-ink-3/40 cursor-not-allowed" : "border-divider text-ink hover:border-brand-blue hover:text-brand-blue"}`}
          >
            <Icon.ChevronR size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
