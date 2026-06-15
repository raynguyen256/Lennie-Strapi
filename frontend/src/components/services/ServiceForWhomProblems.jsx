import SectionHead from "@/components/chrome/SectionHead";
import { Icon } from "@/lib/icons";

export default function ServiceForWhomProblems({ summary, forWhom, problems }) {
  return (
    <div className="space-y-5">
      <SectionHead eyebrow="Tổng quan" title="Liệu trình này" accent="dành cho ai?" />
      <p className="font-sans text-sm text-ink-2 leading-relaxed">{summary}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div className="bg-brand-blue-light border border-divider rounded-md p-6">
          <h4 className="font-sans text-[11px] font-bold tracking-widest text-brand-blue uppercase mb-4">Phù hợp với bạn nếu</h4>
          <ul className="space-y-2.5">
            {forWhom.map((t, i) => (
              <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2">
                <span className="text-brand-blue mt-0.5 shrink-0">
                  <Icon.Check size={15} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-mist border border-divider rounded-md p-6">
          <h4 className="font-sans text-[11px] font-bold tracking-widest text-ink uppercase mb-4">Giải quyết vấn đề</h4>
          <ul className="space-y-2.5">
            {problems.map((t, i) => (
              <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2">
                <span className="text-brand-teal mt-0.5 shrink-0">
                  <Icon.Activity size={15} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
