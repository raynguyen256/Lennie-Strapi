"use client";

import { useCountUp } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

function StatStripItem({ target, suffix, title, desc, icon }) {
  const [ref, val] = useCountUp(target);
  const I = Icon[icon];
  return (
    <div className="flex flex-col items-start md:items-center text-left md:text-center px-4 md:px-8 first:pl-0 last:pr-0 pt-6 md:pt-0 first:pt-0">
      <div className="w-14 h-14 rounded-full border border-divider flex items-center justify-center mb-5 bg-gradient-to-br from-mist to-white shadow-sm text-brand-blue">
        <I size={26} stroke={1.4} />
      </div>
      <span ref={ref} className="font-serif text-3xl md:text-4xl font-semibold text-ink tracking-tight">
        {val}
        {suffix}
      </span>
      <h4 className="font-sans text-[12px] font-bold text-ink uppercase tracking-wider mt-3">{title}</h4>
      <p className="font-sans text-xs text-[#6F8CA8] mt-1.5 leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  );
}

export default function StatStrip() {
  const stats = [
    { target: 6, suffix: "+", title: "Năm Lâm Sàng Chuyên Sâu", desc: "Hơn 6 năm chuyên hành nghề dược mỹ phẩm điều trị thực tế", icon: "Heart" },
    { target: 98, suffix: "%", title: "Tỷ Lệ Phục Hồi Thành Công", desc: "Khách hàng chuyển biến rõ rệt sau liệu trình tuyển chọn", icon: "CheckCircle" },
    { target: 1200, suffix: "+", title: "Khách Hàng Đồng Hành", desc: "Tin cậy tuyệt đối và liên tục giới thiệu người thân", icon: "HeartHandshake" },
    { target: 50, suffix: "+", title: "Thương Hiệu Toàn Cầu", desc: "Ủy quyền trực tiếp 50+ nhãn dược mỹ phẩm quốc tế", icon: "Shield" },
  ];

  return (
    <section className="bg-white border-y border-divider py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-divider">
          {stats.map((s, i) => (
            <StatStripItem key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
