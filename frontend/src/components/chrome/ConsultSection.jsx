import { Icon } from "@/lib/icons";
import ConsultForm from "./ConsultForm";

export default function ConsultSection({
  id = "dang-ky",
  eyebrow = "Đăng ký tư vấn",
  title,
  accent,
  intro,
  image = "/assets/remix/wellness-spa.png",
  lockedServiceLabel = null,
  buttonLabel,
  defaultService = "routine",
}) {
  return (
    <section id={id} className="bg-white py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
              <Icon.Message size={20} />
            </div>
            <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">{eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-[42px] text-ink font-light leading-tight tracking-tight">
              {title || "Khởi đầu hành trình"} {accent && <span className="font-semibold italic text-brand-blue">{accent}</span>}
            </h2>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-sm">
              {intro || "Để lại thông tin và tình trạng da — Lennie sẽ tiếp tục tư vấn trực tiếp cùng bạn qua Messenger trong thời gian sớm nhất."}
            </p>
          </div>
          <div className="relative max-w-sm rounded-md overflow-hidden shadow-sm aspect-video bg-brand-blue-light border border-divider">
            <img src={image} alt="Lennie therapy" className="w-full h-full object-cover select-none" />
            <div className="absolute top-4 left-4 bg-white/75 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/40">
              <span className="font-sans text-[8px] font-black tracking-widest text-ink uppercase">🛡️ Giữ trọn niềm tin y khoa</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex gap-1 text-brand-blue">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="font-sans text-[11px] font-bold text-ink tracking-wide">Hơn 2.500+ khách hàng tin dùng toàn quốc</p>
          </div>
        </div>
        <div className="lg:col-span-7 bg-brand-blue-light border border-divider p-8 rounded-md shadow-sm">
          <ConsultForm lockedServiceLabel={lockedServiceLabel} buttonLabel={buttonLabel} defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
