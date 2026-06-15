"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto divide-y divide-divider border-y border-divider">
      {items.map((f, i) => (
        <div key={i}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
            <span className="font-serif text-[17px] md:text-lg font-medium text-ink group-hover:text-brand-blue transition-colors">{f.q}</span>
            <span className={`shrink-0 w-8 h-8 rounded-full border border-divider flex items-center justify-center text-brand-blue transition-transform ${open === i ? "rotate-45 bg-brand-blue-light" : ""}`}>
              <Icon.Plus size={16} />
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 pb-6" : "max-h-0"}`}>
            <p className="font-sans text-sm text-ink-2 leading-relaxed pr-12">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
