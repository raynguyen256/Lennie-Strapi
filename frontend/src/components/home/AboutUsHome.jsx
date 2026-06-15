"use client";

import Link from "next/link";
import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

export default function AboutUsHome() {
  const [ref, shown] = useReveal();
  return (
    <section id="about-us" className="bg-white py-14 md:py-20 border-b border-divider">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-md border border-divider/60 shadow-sm reveal-card ${shown ? "is-in" : ""}`}>
        <div className="relative min-h-[340px] lg:min-h-[490px] bg-gray-50 overflow-hidden">
          <img src="/assets/remix/clinic-treatment.png" alt="Không gian điều trị Lennie SkinLab" className="w-full h-full object-cover object-center hover:scale-[1.03] duration-700 transition select-none" />
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-sm border border-white/50">
            <span className="font-sans text-[9px] font-black tracking-widest text-ink uppercase">Thành lập 2019 · Triết lý cá nhân hóa</span>
          </div>
        </div>
        <div className="bg-brand-blue-light p-8 md:p-14 flex flex-col justify-center gap-6">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-blue uppercase">Về chúng tôi</span>
          <h2 className="font-serif text-3xl md:text-[40px] text-ink font-light leading-snug tracking-tight">
            Đọc vị làn da trước,
            <br />
            <span className="font-semibold italic text-brand-blue">đề xuất phác đồ sau.</span>
          </h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Lennie SkinLab là thương hiệu chuyên sâu trong lĩnh vực chăm sóc và phục hồi làn da theo triết lý cá nhân hóa. Chúng tôi không áp dụng một routine hay phác đồ chung — mỗi làn da được đọc vị chuyên sâu và xây dựng liệu trình riêng phù hợp từng cơ địa, từng thời điểm.
          </p>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Ngôn ngữ của Lennie là của một người đồng hành am hiểu, không phải người bán hàng — bằng chuyên môn hoạt chất, sự minh bạch và lòng kiên nhẫn.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {["Thấu hiểu", "Chữa lành", "Tinh tế"].map((t) => (
              <div key={t} className="text-center bg-white/70 rounded-sm py-3 border border-white">
                <span className="block font-serif text-base font-semibold text-brand-blue">{t}</span>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 border border-ink/30 hover:border-brand-blue hover:text-brand-blue text-ink font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all bg-white">
              Tìm hiểu về Lennie <Icon.ArrowR size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
