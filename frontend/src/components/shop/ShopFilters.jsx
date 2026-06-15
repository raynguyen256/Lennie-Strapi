"use client";

import { Icon } from "@/lib/icons";
import { productTypes, skinTypes, PRICE_BANDS } from "@/lib/data";

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="space-y-3 py-5 border-b border-divider">
      <h4 className="font-sans text-[11px] font-bold tracking-widest text-ink uppercase">{title}</h4>
      <div className="space-y-2.5">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button key={o} type="button" onClick={() => onToggle(o)} className="flex items-center gap-3 w-full text-left group">
              <span className={`w-[18px] h-[18px] rounded border flex items-center justify-center shrink-0 transition-all ${on ? "bg-brand-blue border-brand-blue text-white" : "border-divider bg-white group-hover:border-brand-blue"}`}>
                {on && <Icon.Check size={12} />}
              </span>
              <span className={`font-sans text-[13px] ${on ? "text-ink font-semibold" : "text-ink-2"}`}>{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ShopFilters({ types, skins, band, onToggleType, onToggleSkin, onSelectBand, onClear, activeCount, onOpenQuiz }) {
  return (
    <aside className="lg:col-span-3">
      <div className="lg:sticky lg:top-28 space-y-1">
        <div className="flex items-center justify-between pb-4 border-b border-divider">
          <h3 className="font-serif text-xl font-semibold text-ink flex items-center gap-2">
            <Icon.Search size={16} className="text-brand-blue" />
            Bộ lọc
          </h3>
          {activeCount > 0 && (
            <button type="button" onClick={onClear} className="font-sans text-[10px] font-bold tracking-wider text-brand-blue uppercase hover:text-ink">
              Xóa ({activeCount})
            </button>
          )}
        </div>

        <FilterGroup title="Loại sản phẩm" options={productTypes} selected={types} onToggle={onToggleType} />
        <FilterGroup title="Loại da" options={skinTypes} selected={skins} onToggle={onToggleSkin} />

        <div className="space-y-3 py-5">
          <h4 className="font-sans text-[11px] font-bold tracking-widest text-ink uppercase">Mức giá</h4>
          <div className="space-y-2.5">
            {PRICE_BANDS.map((b) => (
              <button key={b.id} type="button" onClick={() => onSelectBand(b.id)} className="flex items-center gap-3 w-full text-left group">
                <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-all ${band === b.id ? "border-brand-blue" : "border-divider group-hover:border-brand-blue"}`}>
                  {band === b.id && <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />}
                </span>
                <span className={`font-sans text-[13px] ${band === b.id ? "text-ink font-semibold" : "text-ink-2"}`}>{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-brand-blue-light border border-divider rounded-md p-5 mt-2">
          <p className="font-sans text-[13px] text-ink-2 leading-relaxed">
            Chưa chắc sản phẩm nào hợp da? Làm{" "}
            <button type="button" onClick={onOpenQuiz} className="text-brand-blue font-bold underline">
              phân tích da miễn phí
            </button>{" "}
            để nhận gợi ý.
          </p>
        </div>
      </div>
    </aside>
  );
}
