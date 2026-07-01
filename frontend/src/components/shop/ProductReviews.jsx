"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { createProductReview } from "@/lib/strapi";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${s} sao`}
          className="transition-transform hover:scale-110"
        >
          <Icon.Star
            size={22}
            fill={(hovered || value) >= s ? "#5789B7" : "none"}
            stroke="#5789B7"
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <div className="bg-mist border border-divider rounded-md p-6 space-y-4">
      <div className="flex gap-0.5">
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
          {r.verified && (
            <p className="font-sans text-[10px] text-brand-teal tracking-wider uppercase">Đã mua hàng</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductReviews({ reviews: initialReviews = [], productId }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + (r.stars || 5), 0) / reviews.length
    : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stars) return;
    setStatus("submitting");
    try {
      await createProductReview({ productId, name, stars, comment });
      const newReview = { name, stars, comment, text: comment, verified: false };
      setReviews((prev) => [newReview, ...prev]);
      setName("");
      setStars(0);
      setComment("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white py-16 md:py-20 border-b border-divider">
      <div className="max-w-5xl mx-auto px-6 space-y-12">

        {/* Header + avg rating */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-blue uppercase">
              Đánh giá khách hàng
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink font-light mt-1">
              Khách hàng nói gì về sản phẩm này
            </h2>
          </div>
          {avg > 0 && (
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon.Star
                    key={s}
                    size={16}
                    fill={avg >= s - 0.25 ? "#5789B7" : "none"}
                    stroke="#5789B7"
                  />
                ))}
              </span>
              <span className="font-sans text-sm font-semibold text-ink">{avg.toFixed(1)}</span>
              <span className="font-sans text-sm text-ink-3">({reviews.length} đánh giá)</span>
            </div>
          )}
        </div>

        {/* Review list */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <ReviewCard key={i} r={r} />
            ))}
          </div>
        )}

        {/* Write review form */}
        <div className="border border-divider rounded-md p-6 md:p-8 bg-mist space-y-6">
          <h3 className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-brand-blue">
            Viết đánh giá của bạn
          </h3>

          {status === "success" ? (
            <div className="flex items-center gap-3 text-brand-teal font-sans text-sm font-semibold">
              <Icon.Check size={18} stroke={2} />
              Cảm ơn bạn đã đánh giá! Review đang chờ duyệt và sẽ hiển thị sớm.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-ink-3">
                  Số sao <span className="text-red-400">*</span>
                </label>
                <StarPicker value={stars} onChange={setStars} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-ink-3">
                    Họ tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Thị A"
                    className="w-full border border-divider rounded-sm px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-brand-blue bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-ink-3">
                  Nhận xét <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
                  className="w-full border border-divider rounded-sm px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-brand-blue bg-white resize-none"
                />
              </div>

              {status === "error" && (
                <p className="font-sans text-xs text-red-500">Có lỗi xảy ra, vui lòng thử lại.</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || !stars}
                className="flex items-center gap-2 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-sm hover:bg-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Icon.Star size={13} stroke={2} />
                    Gửi đánh giá
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
