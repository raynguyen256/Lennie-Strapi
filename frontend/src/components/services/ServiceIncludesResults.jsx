import { Icon } from "@/lib/icons";

export default function ServiceIncludesResults({ includes, results }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-brand-blue-light border border-divider rounded-md p-7">
        <h4 className="font-serif text-lg font-bold text-ink mb-4 flex items-center gap-2">
          <Icon.Clipboard size={18} className="text-brand-blue" />
          Liệu trình bao gồm
        </h4>
        <ul className="space-y-2.5">
          {includes.map((t, i) => (
            <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2">
              <span className="text-brand-blue mt-0.5 shrink-0">
                <Icon.Check size={15} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-mist border border-divider rounded-md p-7">
        <h4 className="font-serif text-lg font-bold text-ink mb-4 flex items-center gap-2">
          <Icon.Sparkles size={18} className="text-brand-teal" />
          Kết quả kỳ vọng
        </h4>
        <ul className="space-y-2.5">
          {results.map((t, i) => (
            <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2">
              <span className="text-brand-teal mt-0.5 shrink-0">
                <Icon.CheckCircle size={15} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
