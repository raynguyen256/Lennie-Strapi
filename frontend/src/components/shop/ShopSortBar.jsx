import { SORTS } from "@/lib/data";

export default function ShopSortBar({ count, sort, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-divider mb-8">
      <span className="font-sans text-[13px] text-ink-2">
        Hiển thị <strong className="text-ink">{count}</strong> sản phẩm
      </span>
      <div className="flex items-center gap-3">
        <span className="font-sans text-[11px] font-bold tracking-wider text-ink-3 uppercase">Sắp xếp</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-divider rounded-sm font-sans text-[13px] text-ink focus:outline-none focus:border-brand-blue"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
