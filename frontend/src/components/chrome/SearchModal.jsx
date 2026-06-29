"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/lib/icons";

export default function SearchModal({ isOpen, onClose }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQ("");
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-start pt-28 sm:pt-36 p-4 z-[70] modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl relative overflow-hidden modal-pop" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit} className="flex items-center gap-3 p-5 border-b border-divider">
          <Icon.Search size={18} className="text-brand-blue shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm sản phẩm, thương hiệu..."
            className="flex-1 outline-none font-sans text-sm text-ink placeholder-ink-3/60"
          />
          <button type="button" onClick={onClose} className="p-1 text-ink-3 hover:text-brand-blue transition-colors" aria-label="Đóng">
            <Icon.X size={18} />
          </button>
        </form>
        <button
          type="submit"
          onClick={submit}
          className="w-full py-3.5 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-blue transition-colors"
        >
          Tìm sản phẩm
        </button>
      </div>
    </div>
  );
}
