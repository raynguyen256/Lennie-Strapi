import { Icon } from "@/lib/icons";

export default function TestimonialsFeaturedQuote({ review }) {
  return (
    <section className="bg-white py-16 md:py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 rounded-md overflow-hidden border border-divider shadow-sm aspect-[4/3] bg-brand-blue-light">
          <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-7 space-y-5">
          <span className="text-brand-blue/25 font-serif text-7xl leading-none block">&ldquo;</span>
          <p className="font-serif text-2xl md:text-[30px] text-ink font-light italic leading-snug -mt-6">{review.text.replace(/^"|"$/g, "")}</p>
          <div className="flex items-center gap-3 pt-4 border-t border-divider">
            <span className="flex gap-0.5 text-brand-blue">
              {Array.from({ length: review.stars }).map((_, i) => (
                <Icon.Star key={i} size={16} fill="#5789B7" stroke="#5789B7" />
              ))}
            </span>
            <span className="font-sans text-sm font-bold text-ink">{review.name}</span>
            <span className="font-sans text-[11px] text-brand-blue uppercase tracking-wider">· {review.caseType}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
