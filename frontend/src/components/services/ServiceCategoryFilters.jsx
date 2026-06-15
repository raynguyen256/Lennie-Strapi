import { Icon } from "@/lib/icons";

export default function ServiceCategoryFilters({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 justify-center">
      {categories.map((c) => {
        const I = Icon[c.icon] || Icon.Sparkles;
        const on = active === c.name;
        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onSelect(c.name)}
            className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
              on ? "bg-brand-blue border-brand-blue text-white shadow-sm" : "bg-white border-divider text-ink-2 hover:border-brand-blue hover:text-brand-blue"
            }`}
          >
            <span className={`flex items-center justify-center ${on ? "text-white" : "text-brand-blue"}`}>
              <I size={15} />
            </span>
            <span className="font-sans text-[12px] font-bold uppercase tracking-wide leading-none">{c.name}</span>
          </button>
        );
      })}
    </div>
  );
}
