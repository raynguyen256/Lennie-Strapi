import { partnerBrands } from "@/lib/data";

export default function PartnerStrip({ label }) {
  const sets = [0, 1, 2, 3];
  return (
    <div className="w-full bg-mist border-y border-divider py-8 overflow-hidden relative select-none">
      {label && (
        <p className="text-center font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-ink-3 mb-6">{label}</p>
      )}
      <div
        className="absolute left-0 bottom-0 top-auto w-16 bg-gradient-to-r from-mist to-transparent z-10 pointer-events-none"
        style={{ top: label ? "auto" : 0, height: label ? "64px" : "100%" }}
      />
      <div
        className="absolute right-0 w-16 bg-gradient-to-l from-mist to-transparent z-10 pointer-events-none"
        style={{ top: label ? "auto" : 0, bottom: 0, height: label ? "64px" : "100%" }}
      />
      <div className="flex overflow-hidden w-full">
        <div className="marquee flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {sets.map((s) =>
            partnerBrands.map((b, i) => (
              <span
                key={`${s}-${i}`}
                className="font-serif text-[13px] md:text-sm lg:text-[15px] font-semibold tracking-[0.22em] text-[#6F8CA8] hover:text-brand-blue transition-colors uppercase whitespace-nowrap"
              >
                {b}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
