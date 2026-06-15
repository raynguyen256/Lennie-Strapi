import { Icon } from "@/lib/icons";

export default function ProductRating({ rating, reviews, size = 15 }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex gap-0.5 text-brand-blue">
        {Array.from({ length: Math.round(rating) }).map((_, i) => (
          <Icon.Star key={i} size={size} fill="#5789B7" stroke="#5789B7" />
        ))}
      </span>
      <span className="font-sans text-[12px] text-ink-3">{reviews} đánh giá</span>
    </div>
  );
}
