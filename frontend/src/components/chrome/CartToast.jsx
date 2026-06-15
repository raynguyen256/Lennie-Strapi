import { Icon } from "@/lib/icons";

export default function CartToast({ show, product }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] transition-all duration-400 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <div className="bg-ink text-white rounded-full pl-2 pr-5 py-2 flex items-center gap-3 shadow-2xl">
        <span className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center text-ink">
          <Icon.Check size={18} />
        </span>
        <div className="leading-tight">
          <div className="font-sans text-[11px] font-bold tracking-wide">Đã thêm vào giỏ</div>
          <div className="font-sans text-[10px] text-white/60">{product ? product.name : ""}</div>
        </div>
      </div>
    </div>
  );
}
