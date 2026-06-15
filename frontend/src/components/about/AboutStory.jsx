"use client";

import { useReveal } from "@/lib/hooks";

export default function AboutStory() {
  const [ref, shown] = useReveal();

  return (
    <section className="bg-white py-16 md:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className={`reveal-x-l ${shown ? "is-in" : ""}`}>
          <div className="rounded-md overflow-hidden border border-divider shadow-sm relative aspect-[4/5] bg-brand-blue-light">
            <img
              src="/assets/remix/clinic-treatment.png"
              alt="Không gian điều trị Lennie SkinLab"
              className="w-full h-full object-cover hover:scale-[1.03] transition duration-700 select-none"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-sm border border-white/50">
              <span className="font-sans text-[9px] font-black tracking-widest text-ink uppercase">Thành lập 2019 · Triết lý cá nhân hóa</span>
            </div>
          </div>
        </div>
        <div className={`space-y-6 reveal-x-r ${shown ? "is-in" : ""}`}>
          <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">
            Câu chuyện thương hiệu
          </span>
          <h2 className="font-serif text-3xl md:text-[42px] text-ink font-light leading-snug tracking-tight">
            Đọc vị làn da trước,
            <br />
            <span className="font-semibold italic text-brand-blue">đề xuất phác đồ sau.</span>
          </h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Lennie SkinLab là thương hiệu chuyên sâu trong lĩnh vực chăm sóc và phục hồi làn da theo triết lý cá nhân hóa. Chúng tôi không áp dụng một
            routine hay phác đồ chung — mỗi làn da được đọc vị chuyên sâu và xây dựng liệu trình riêng phù hợp từng cơ địa và thời điểm.
          </p>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Ngôn ngữ của Lennie là của một người đồng hành am hiểu, không phải người bán hàng. Chúng tôi tin chăm da là một hành trình dài, cần được
            dẫn dắt đúng cách ngay từ đầu — bằng chuyên môn hoạt chất, sự minh bạch và lòng kiên nhẫn.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-divider">
            {["Thấu hiểu", "Chữa lành", "Tinh tế"].map((t) => (
              <div key={t} className="text-center">
                <span className="block font-serif text-lg font-semibold text-brand-blue">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
