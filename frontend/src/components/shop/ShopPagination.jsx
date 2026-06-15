import { Icon } from "@/lib/icons";

export default function ShopPagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`w-10 h-10 rounded-sm border flex items-center justify-center ${page === 1 ? "border-divider text-ink-3/40 cursor-not-allowed" : "border-divider text-ink hover:border-brand-blue hover:text-brand-blue"}`}
      >
        <Icon.ChevronL size={16} />
      </button>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={`w-10 h-10 rounded-sm border font-sans text-sm font-bold transition-all ${page === i + 1 ? "bg-brand-blue border-brand-blue text-white" : "border-divider text-ink hover:border-brand-blue"}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className={`w-10 h-10 rounded-sm border flex items-center justify-center ${page === pages ? "border-divider text-ink-3/40 cursor-not-allowed" : "border-divider text-ink hover:border-brand-blue hover:text-brand-blue"}`}
      >
        <Icon.ChevronR size={16} />
      </button>
    </div>
  );
}
