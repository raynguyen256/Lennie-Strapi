import SectionHead from "@/components/chrome/SectionHead";

export default function ServiceSteps({ steps }) {
  return (
    <div className="space-y-7">
      <SectionHead eyebrow="Quy trình" title="Diễn ra" accent="thế nào?" />
      <div className="space-y-5">
        {steps.map((st, i) => (
          <div key={i} className="flex gap-5 items-start bg-white border border-divider rounded-md p-6 hover:shadow-md hover:border-brand-blue/40 transition-all">
            <span className="shrink-0 w-12 h-12 rounded-full bg-brand-blue text-white font-serif text-xl font-bold flex items-center justify-center">{i + 1}</span>
            <div>
              <h4 className="font-serif text-lg font-bold text-ink">{st.title}</h4>
              <p className="font-sans text-sm text-ink-2 leading-relaxed mt-1.5">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
