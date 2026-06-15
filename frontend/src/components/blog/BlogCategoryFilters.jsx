export default function BlogCategoryFilters({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2.5 justify-center">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          className={`px-5 py-2.5 rounded-full font-sans text-[11px] font-bold tracking-[0.14em] uppercase border transition-all ${
            active === c ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-ink-2 border-divider hover:border-brand-blue hover:text-brand-blue"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
