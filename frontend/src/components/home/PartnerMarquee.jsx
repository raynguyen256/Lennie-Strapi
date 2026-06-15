export default function PartnerMarquee({ brands }) {
  const sets = [0, 1, 2, 3];
  return (
    <div className="w-full bg-mist border-y border-divider py-8 overflow-hidden relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-mist to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-mist to-transparent z-10 pointer-events-none" />
      <div className="flex overflow-hidden w-full">
        <div className="marquee flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {sets.map((s) =>
            brands.map((b, i) => (
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
