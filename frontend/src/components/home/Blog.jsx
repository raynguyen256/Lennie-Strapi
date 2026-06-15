"use client";

import Link from "next/link";
import { useReveal } from "@/lib/hooks";

export default function Blog() {
  const posts = [
    {
      date: "Ngày 02 Tháng 09, 2026",
      img: "/assets/remix/clinic-treatment.png",
      title: "Góc Chia Sẻ Chuyên Sâu",
      excerpt:
        "Đội ngũ chuyên môn lâm sàng luôn phân tích kỹ lưỡng, bám sát chẩn trị cá nhân hóa để hồi phục tối ưu các trường hợp sưng kích ứng, viêm đỏ khó chữa...",
    },
    {
      date: "Ngày 24 Tháng 08, 2026",
      img: "/assets/remix/wellness-spa.png",
      title: "Cẩm Nang Sống Khỏe Đẹp",
      excerpt:
        "Khám phá các phương pháp cải tạo làn da khoa học đột phá nhất, kết hợp các thành phần sinh học phục hồi tối hảo giúp nuôi dưỡng vẻ rạng rỡ căng mướt...",
    },
  ];
  const [ref, shown] = useReveal();
  return (
    <section id="blog" className="bg-white py-20 border-b border-divider relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">Kiến thức da liễu</span>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
              Đọc để hiểu <span className="font-semibold italic text-brand-blue">làn da của mình</span>
            </h2>
          </div>
          <Link href="/blog" className="px-6 py-3 border border-divider hover:border-brand-blue hover:bg-brand-blue-light text-ink font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all">
            Xem tất cả bài viết
          </Link>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((p, i) => (
            <div
              key={i}
              className={`reveal-card group cursor-pointer rounded-md overflow-hidden bg-brand-blue-light border border-divider flex flex-col hover:shadow-md transition-all duration-500 ${shown ? "is-in" : ""}`}
              style={{ transitionDelay: shown ? `${i * 120}ms` : "0ms" }}
            >
              <div className="h-64 sm:h-72 lg:h-80 overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] duration-700 transition" />
              </div>
              <div className="p-8 space-y-4">
                <span className="font-sans text-[10px] font-bold tracking-[0.16em] text-[#6F8CA8] uppercase">{p.date}</span>
                <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-brand-blue transition-colors">{p.title}</h3>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">{p.excerpt}</p>
                <span className="font-sans text-xs font-bold tracking-wider text-ink group-hover:text-brand-blue underline uppercase block pt-2">Đọc bài viết ⟶</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
