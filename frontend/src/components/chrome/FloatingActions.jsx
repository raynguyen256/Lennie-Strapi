import { Icon } from "@/lib/icons";
import { MESSENGER_URL } from "@/lib/social-links";

export default function FloatingActions({ onOpenBooking, messengerUrl }) {
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      <a
        href={messengerUrl || MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Messenger"
        className="w-[52px] h-[52px] rounded-full bg-white border border-divider shadow-lg flex items-center justify-center text-brand-blue hover:-translate-y-0.5 hover:shadow-xl transition-all"
      >
        <Icon.Message size={22} />
      </a>
      <button
        type="button"
        onClick={onOpenBooking}
        title="Đặt lịch"
        className="w-[52px] h-[52px] rounded-full bg-brand-blue text-white shadow-lg flex items-center justify-center hover:bg-ink hover:-translate-y-0.5 hover:shadow-xl transition-all"
      >
        <Icon.Calendar size={22} />
      </button>
    </div>
  );
}
