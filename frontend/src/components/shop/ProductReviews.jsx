import { Icon } from "@/lib/icons";

export default function ProductReviews({ reviews, rating, reviewCount }) {
  if (!reviews?.length) return null;

  return (
    <section className="bg-white py-16 md:py-20 border-b border-divider">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-blue uppercase">Đánh giá khách hàng</span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink font-light mt-1">Khách hàng nói gì về sản phẩm này</h2>
          </div>
          {rating > 0 && (
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-brand-blue">
                {Array.from({ length: Math.round(rating) }).map((_, i) => (
                  <Icon.Star key={i} size={16} fill="#5789B7" stroke="#5789B7" />
                ))}
              </span>
              <span className="font-sans text-sm font-semibold text-ink">{rating.toFixed?.(1) || rating}</span>
              <span className="font-sans text-sm text-ink-3">({reviewCount} đánh giá)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-mist border border-divider rounded-md p-6 space-y-4">
              <div className="flex gap-0.5 text-brand-blue">
                {Array.from({ length: r.stars || 5 }).map((_, j) => (
                  <Icon.Star key={j} size={13} fill="#5789B7" stroke="#5789B7" />
                ))}
              </div>
              <p className="font-sans text-sm text-ink-2 leading-relaxed italic">&quot;{r.text}&quot;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-divider">
                <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
                  <span className="text-white font-sans font-bold text-[13px]">{r.name?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <h4 className="font-sans text-[11px] font-bold tracking-wider uppercase text-ink">{r.name}</h4>
                  {r.verified && <p className="font-sans text-[10px] text-brand-teal tracking-wider uppercase">Đã mua hàng</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
