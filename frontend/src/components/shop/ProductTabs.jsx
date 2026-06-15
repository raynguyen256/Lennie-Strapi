"use client";

import { useState } from "react";

const HOW_TO_STEPS = [
  "Làm sạch và cân bằng da trước khi dùng.",
  "Lấy lượng vừa đủ, thoa đều và massage nhẹ đến khi thẩm thấu.",
  "Dùng theo tần suất được chuyên gia Lennie tư vấn cho riêng bạn.",
  "Luôn kết hợp kem chống nắng vào buổi sáng.",
];

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("desc");

  const tabs = {
    desc: {
      label: "Mô tả",
      body: (
        <div className="space-y-4 font-sans text-sm text-ink-2 leading-relaxed">
          {product.excerpt && <p>{product.excerpt}</p>}
          <p>
            Sản phẩm được Lennie SkinLab nhập khẩu chính hãng và tuyển chọn dựa trên hồ sơ hoạt chất, độ an toàn và khả năng phù hợp với nhiều cơ địa da. Để đạt hiệu quả tối
            ưu, nên dùng trong một phác đồ được cá nhân hóa theo tình trạng da của bạn.
          </p>
        </div>
      ),
    },
    how: {
      label: "Cách dùng",
      body: (
        <ul className="space-y-3 font-sans text-sm text-ink-2">
          {HOW_TO_STEPS.map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-blue-light text-brand-blue font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>
              {t}
            </li>
          ))}
        </ul>
      ),
    },
    spec: {
      label: "Thông tin",
      body: (
        <div className="divide-y divide-divider font-sans text-sm">
          {[
            ["Thương hiệu", product.brand],
            ["Loại sản phẩm", product.type || product.tag],
            ["Phù hợp loại da", product.skinTypes?.length ? product.skinTypes.join(" · ") : product.tag],
            ["Xuất xứ", "Nhập khẩu chính hãng"],
            ["Tư vấn", "ThS. DS. Hoàng Hồng Thắm"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3">
              <span className="text-ink-3">{k}</span>
              <span className="text-ink font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>
      ),
    },
  };

  return (
    <section className="bg-white py-14 border-b border-divider">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-2 border-b border-divider mb-7">
          {Object.entries(tabs).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`px-5 py-3 font-sans text-[11px] font-bold tracking-[0.16em] uppercase -mb-px border-b-2 transition-all ${tab === k ? "border-brand-blue text-brand-blue" : "border-transparent text-ink-3 hover:text-ink"}`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div>{tabs[tab].body}</div>
      </div>
    </section>
  );
}
