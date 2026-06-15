import { Icon } from "@/lib/icons";

export default function BlogAuthorShare({ author }) {
  return (
    <div className="mt-12 pt-8 border-t border-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center">
          <Icon.User size={20} />
        </span>
        <div className="font-sans">
          <span className="block text-sm font-bold text-ink">{author}</span>
          <span className="block text-[11px] text-ink-3">Đội ngũ chuyên môn Lennie SkinLab</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase">Chia sẻ</span>
        {["Fb", "Ig", "Zl"].map((s) => (
          <span
            key={s}
            className="w-9 h-9 rounded-full bg-brand-blue-light hover:bg-brand-blue hover:text-white border border-divider flex items-center justify-center text-[11px] font-bold uppercase text-brand-blue cursor-pointer transition-colors select-none"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
