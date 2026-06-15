import { Icon } from "@/lib/icons";

/** Danh sách cơ sở/chi nhánh dạng card, dùng cho /booking và /contact */
export default function BranchesList({ branches, variant = "white" }) {
  const cardBg = variant === "light" ? "bg-brand-blue-light" : "bg-white";

  return (
    <div className="space-y-5">
      {branches.map((b, i) => (
        <div key={i} className={`${cardBg} border border-divider rounded-md p-6 space-y-3`}>
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-serif text-lg font-bold text-ink">{b.name}</h4>
            <span
              className={`font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase px-2.5 py-1 rounded-sm whitespace-nowrap ${
                variant === "light" ? "bg-white border border-divider" : "bg-brand-blue-light"
              }`}
            >
              {b.tag}
            </span>
          </div>
          <div className="space-y-2 font-sans text-[13px] text-ink-2">
            <div className="flex gap-2.5 items-start">
              <Icon.Pin size={15} className="text-brand-blue shrink-0 mt-0.5" />
              <span>
                {b.address}
                {b.note && <em className="block text-ink-3 not-italic text-xs mt-0.5">{b.note}</em>}
              </span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Icon.Phone size={15} className="text-brand-blue shrink-0" />
              <span>{b.phone}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Icon.Clock size={15} className="text-brand-blue shrink-0" />
              <span>{b.hours}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
