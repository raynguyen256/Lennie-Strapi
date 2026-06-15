import { Icon } from "@/lib/icons";

const BADGES = [
  ["Shield", "Chính hãng"],
  ["HeartHandshake", "Tư vấn chuyên môn"],
  ["Activity", "Hợp phác đồ"],
];

export default function ProductTrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-3 pt-4">
      {BADGES.map(([icon, label]) => {
        const I = Icon[icon];
        return (
          <div key={label} className="flex flex-col items-center text-center gap-2 bg-brand-blue-light/60 rounded-md py-4 px-2">
            <span className="text-brand-blue">
              <I size={20} />
            </span>
            <span className="font-sans text-[10px] font-bold text-ink-2 uppercase tracking-wide">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
