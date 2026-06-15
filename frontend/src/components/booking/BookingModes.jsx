import { Icon } from "@/lib/icons";

export default function BookingModes({ messengerUrl, zaloUrl, hotline }) {
  const modes = [
    {
      icon: "Message",
      tag: "Mode 1",
      title: "Tư vấn routine từ xa",
      desc: "Nhắn tin cho Lennie qua Messenger hoặc Zalo. Phù hợp khách nội địa và kiều bào — được đọc vị da và theo dõi từ xa.",
      actions: [
        ["Messenger", messengerUrl],
        ["Zalo", zaloUrl],
      ],
    },
    {
      icon: "Calendar",
      tag: "Mode 2",
      title: "Đặt lịch tại cơ sở",
      desc: "Tự chọn ngày giờ ngay trên website, hoặc liên hệ qua Messenger / Zalo / SĐT. Đội ngũ sẽ xác nhận lại với bạn.",
      actions: [
        ["Điền form bên dưới", "#booking-form"],
        ["Gọi SĐT", `tel:${hotline.replace(/\s/g, "")}`],
      ],
    },
  ];

  return (
    <section className="bg-white py-16 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((m, i) => {
          const I = Icon[m.icon];
          return (
            <div key={i} className="bg-brand-blue-light border border-divider rounded-md p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-sm">
                  <I size={22} />
                </span>
                <span className="font-sans text-[10px] font-extrabold tracking-[0.22em] text-brand-blue uppercase">{m.tag}</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">{m.title}</h3>
              <p className="font-sans text-sm text-ink-2 leading-relaxed flex-1">{m.desc}</p>
              <div className="flex flex-wrap gap-3 pt-1">
                {m.actions.map(([t, h]) => (
                  <a
                    key={t}
                    href={h}
                    target={h?.startsWith("http") ? "_blank" : undefined}
                    rel={h?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="px-5 py-2.5 bg-white border border-divider text-brand-blue font-sans text-[10px] font-bold tracking-wider uppercase rounded-sm hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
                  >
                    {t}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
