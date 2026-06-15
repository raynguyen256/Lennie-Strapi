import { Icon } from "@/lib/icons";

export default function ContactQuickChannels({ messengerUrl, hotline, email }) {
  const channels = [
    { icon: "Message", t: "Messenger", d: "Nhắn Fanpage Lennie", h: messengerUrl },
    { icon: "Phone", t: "Zalo / SĐT", d: hotline, h: `tel:${hotline.replace(/\s/g, "")}` },
    { icon: "Mail", t: "Email", d: email, h: `mailto:${email}` },
  ];

  return (
    <section className="bg-white py-14 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {channels.map((c) => {
          const I = Icon[c.icon];
          const external = c.h?.startsWith("http");
          return (
            <a
              key={c.t}
              href={c.h}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group bg-brand-blue-light border border-divider rounded-md p-7 flex items-center gap-4 hover:bg-white hover:shadow-md hover:border-brand-blue/40 transition-all"
            >
              <span className="w-12 h-12 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-sm shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <I size={22} />
              </span>
              <div>
                <span className="block font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase">{c.t}</span>
                <span className="block font-serif text-lg font-semibold text-ink">{c.d}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
