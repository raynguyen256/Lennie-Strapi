import Link from "next/link";
import SectionHead from "@/components/chrome/SectionHead";
import { Icon } from "@/lib/icons";

export default function RelatedServices({ services }) {
  if (!services?.length) return null;

  return (
    <section className="bg-brand-blue-light py-20 border-y border-divider">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <SectionHead eyebrow="Dịch vụ khác" title="Khám phá thêm" accent="liệu trình phù hợp" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((o) => {
            const OI = Icon[o.categoryIcon] || Icon.Sparkles;
            return (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group bg-white border border-divider rounded-md overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="h-40 overflow-hidden bg-brand-blue-light">
                  <img src={o.img} alt={o.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="flex items-center gap-2 font-sans text-[9px] font-extrabold tracking-[0.2em] text-brand-blue uppercase">
                    <OI size={13} />
                    {o.category}
                  </span>
                  <h4 className="font-serif text-[17px] font-bold text-ink leading-snug group-hover:text-brand-blue transition-colors">{o.title}</h4>
                  <span className="font-serif text-base font-bold text-ink">{o.price}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
