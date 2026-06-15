import { Icon } from "@/lib/icons";

const CHANNELS = [
  ["HeartHandshake", "1.200+ khách đồng hành", "Tin cậy và liên tục giới thiệu người thân"],
  ["Globe", "Khách kiều bào toàn cầu", "Mỹ · Hàn · Nhật · châu Âu · Singapore"],
  ["Award", "Theo dõi bởi Founder", "100% ca điều trị, không ủy quyền"],
];

export default function TrustChannels() {
  return (
    <section className="bg-white py-16 border-b border-divider">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {CHANNELS.map(([icon, title, desc]) => {
          const I = Icon[icon];
          return (
            <div key={title} className="space-y-3">
              <span className="w-14 h-14 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto">
                <I size={24} />
              </span>
              <h4 className="font-serif text-lg font-bold text-ink">{title}</h4>
              <p className="font-sans text-xs text-ink-2 leading-relaxed">{desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
