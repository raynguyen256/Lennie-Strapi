export default function SectionHead({ eyebrow, title, accent, intro, center, light }) {
  return (
    <div className={`space-y-4 ${center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}>
      {eyebrow && (
        <span
          className={`inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] uppercase px-3 py-1 rounded-sm ${light ? "text-brand-teal bg-white/10" : "text-brand-blue bg-brand-blue-light"}`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`font-serif text-3xl md:text-[42px] font-light leading-snug tracking-tight ${light ? "text-white" : "text-ink"}`}>
        {title} {accent && <span className="font-semibold italic text-brand-blue">{accent}</span>}
      </h2>
      {intro && (
        <p className={`font-sans text-sm leading-relaxed ${light ? "text-white/70" : "text-ink-2"} ${center ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
