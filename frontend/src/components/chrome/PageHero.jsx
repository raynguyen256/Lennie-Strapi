import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function PageHero({ eyebrow, title, accent, intro, crumb, img, align = "left" }) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden bg-brand-blue-light border-b border-divider">
      {img && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src={img} alt="" className="w-full h-full object-cover opacity-100 select-none" />
          <div className={`absolute inset-0 ${centered ? "bg-white/55" : "bg-gradient-to-r from-white/95 via-white/80 to-white/30"}`}></div>
        </div>
      )}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-14 md:pb-20 ${centered ? "text-center flex flex-col items-center" : ""}`}>
        <nav className={`flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-ink-3 mb-6 ${centered ? "justify-center" : ""}`}>
          <Link href="/" className="hover:text-brand-blue transition-colors">
            Trang chủ
          </Link>
          {crumb &&
            crumb.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <Icon.ChevronR size={11} className="text-ink-3/60" />
                {c[1] ? (
                  <Link href={c[1]} className="hover:text-brand-blue transition-colors">
                    {c[0]}
                  </Link>
                ) : (
                  <span className="text-brand-blue">{c[0]}</span>
                )}
              </span>
            ))}
        </nav>
        {eyebrow && (
          <span
            className="inline-block self-start font-sans text-[10px] md:text-[11px] font-extrabold tracking-[0.3em] text-brand-blue bg-white/70 border border-white px-4 py-1.5 rounded-sm uppercase"
            style={centered ? { alignSelf: "center" } : undefined}
          >
            {eyebrow}
          </span>
        )}
        <h1 className={`font-serif text-[38px] md:text-[58px] lg:text-[66px] font-light text-ink leading-[1.05] tracking-tight mt-5 ${centered ? "max-w-3xl" : "max-w-3xl"}`}>
          {title} {accent && <span className="font-semibold italic text-brand-blue">{accent}</span>}
        </h1>
        {intro && (
          <p className={`font-sans text-sm lg:text-[15px] text-ink-2 leading-relaxed font-medium mt-6 max-w-xl ${centered ? "mx-auto" : ""}`}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
