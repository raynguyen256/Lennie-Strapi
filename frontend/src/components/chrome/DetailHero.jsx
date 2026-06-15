import Link from "next/link";
import { Icon } from "@/lib/icons";

/** Hero overlay tối dùng cho trang chi tiết (dịch vụ, blog) */
export default function DetailHero({ img, crumb, badge, title, tagline, align = "left", children }) {
  const centered = align === "center";
  const BadgeIcon = badge?.icon ? Icon[badge.icon] : null;

  return (
    <section className="relative overflow-hidden bg-[#152639] border-b border-divider">
      <div className="absolute inset-0">
        {img && <img src={img} alt="" className="w-full h-full object-cover opacity-45 select-none" />}
        <div
          className={`absolute inset-0 ${
            centered
              ? "bg-gradient-to-t from-[#0f1d2e]/95 via-[#0f1d2e]/70 to-[#0f1d2e]/60"
              : "bg-gradient-to-r from-[#0f1d2e]/92 via-[#0f1d2e]/72 to-[#0f1d2e]/55"
          }`}
        ></div>
      </div>
      <div className={`relative z-10 max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-16 md:pb-20 ${centered ? "max-w-3xl text-center" : ""}`}>
        <nav className={`flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-white/55 mb-6 ${centered ? "justify-center" : ""}`}>
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          {crumb &&
            crumb.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <Icon.ChevronR size={11} />
                {c[1] ? (
                  <Link href={c[1]} className="hover:text-white transition-colors">
                    {c[0]}
                  </Link>
                ) : (
                  <span className="text-brand-teal">{c[0]}</span>
                )}
              </span>
            ))}
        </nav>
        {badge && (
          <span className="inline-flex items-center gap-2 font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-teal bg-white/10 px-3 py-1.5 rounded-sm uppercase">
            {BadgeIcon && <BadgeIcon size={14} />}
            {badge.label}
          </span>
        )}
        <h1 className={`font-serif text-[32px] md:text-[54px] font-light text-white leading-[1.08] tracking-tight mt-5 ${centered ? "" : "max-w-3xl"}`}>{title}</h1>
        {tagline && (
          <p className={`font-sans text-sm md:text-[15px] text-white/75 leading-relaxed font-medium mt-5 ${centered ? "mx-auto" : "max-w-xl"}`}>{tagline}</p>
        )}
        {children}
      </div>
    </section>
  );
}
