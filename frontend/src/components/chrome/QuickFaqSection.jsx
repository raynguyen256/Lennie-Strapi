import SectionHead from "./SectionHead";
import FaqAccordion from "./FaqAccordion";

export default function QuickFaqSection({ light = true, faqs }) {
  return (
    <section id="giai-dap-nhanh" className={`${light ? "bg-brand-blue-light" : "bg-white"} py-20 border-b border-divider`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <SectionHead
          center
          eyebrow="Giải đáp nhanh"
          title="Những điều bạn"
          accent="có thể đang băn khoăn"
          intro="Tổng hợp các câu hỏi thường gặp nhất về dịch vụ, chi phí và cách Lennie đồng hành cùng làn da của bạn."
        />
        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
