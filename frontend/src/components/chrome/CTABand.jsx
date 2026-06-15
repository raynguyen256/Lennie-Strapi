import Link from "next/link";

export default function CTABand({ onOpenBooking, title, accent, text, primary, secondaryHref, secondary }) {
  return (
    <section className="relative overflow-hidden bg-[#152639]">
      <div className="absolute inset-0">
        <img src="/assets/remix/wellness-spa.png" alt="" className="w-full h-full object-cover opacity-25 select-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d2e]/90 via-[#0f1d2e]/70 to-[#0f1d2e]/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center gap-6">
        <span className="font-sans text-[10px] font-extrabold tracking-[0.3em] text-brand-teal uppercase">Bắt đầu hành trình cùng Lennie</span>
        <h2 className="font-serif text-3xl md:text-[46px] font-light text-white leading-tight tracking-tight">
          {title || "Làn da khỏe đẹp"}{" "}
          {accent ? (
            <span className="font-semibold italic text-brand-teal">{accent}</span>
          ) : (
            <span className="font-semibold italic text-brand-teal">bắt đầu từ một phác đồ đúng.</span>
          )}
        </h2>
        <p className="font-sans text-sm text-white/70 leading-relaxed max-w-lg">
          {text || "Đặt lịch đọc vị làn da cùng ThS. DS. Hoàng Hồng Thắm, hoặc làm bài phân tích da miễn phí để nhận gợi ý phác đồ ban đầu."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-9 py-4 bg-brand-blue hover:bg-white hover:text-ink text-white font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all shadow-md"
          >
            {primary || "Đặt lịch trị liệu"}
          </button>
          <Link
            href={secondaryHref || "/services"}
            className="px-8 py-3.5 border border-white/35 hover:border-white text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm transition-all"
          >
            {secondary || "Xem dịch vụ"}
          </Link>
        </div>
      </div>
    </section>
  );
}
