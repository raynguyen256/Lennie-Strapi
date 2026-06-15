import { Icon } from "@/lib/icons";

export default function ServiceBookingSidebar({ service, onOpenBooking, onOpenQuiz, messengerUrl }) {
  return (
    <div className="lg:sticky lg:top-28 space-y-6">
      <div className="bg-white border border-divider rounded-md shadow-sm overflow-hidden">
        <div className="h-40 overflow-hidden bg-brand-blue-light">
          <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 space-y-4">
          <div>
            <span className="block font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase mb-1">Chi phí tham khảo</span>
            <span className="font-serif text-3xl font-bold text-ink">{service.price}</span>
            {service.priceNote && <span className="block font-sans text-[11px] text-ink-3 mt-1">{service.priceNote}</span>}
          </div>
          <div className="space-y-2.5 py-4 border-y border-divider text-[13px] font-sans text-ink-2">
            <div className="flex items-center gap-2.5">
              <Icon.Clock size={15} className="text-brand-blue" />
              {service.duration}
            </div>
            <div className="flex items-center gap-2.5">
              <Icon.User size={15} className="text-brand-blue" />
              ThS. DS. Hoàng Hồng Thắm
            </div>
            <div className="flex items-center gap-2.5">
              <Icon.Pin size={15} className="text-brand-blue" />
              HCM · Hà Nội · Online
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-all shadow-sm"
          >
            Đặt lịch ngay
          </button>
          <button
            type="button"
            onClick={onOpenQuiz}
            className="w-full py-3.5 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all"
          >
            Phân tích da miễn phí
          </button>
        </div>
      </div>
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-blue-light border border-divider text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-white transition-all"
      >
        <Icon.Message size={16} />
        Tư vấn qua Messenger / Zalo
      </a>
    </div>
  );
}
