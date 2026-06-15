"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { useCart, vnd } from "@/lib/cart";

function CartLineRow({ item, checked, onToggle, onQty, onRemove }) {
  return (
    <div className="flex gap-3 py-4 border-b border-divider">
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-pressed={checked}
        aria-label="Chọn sản phẩm"
        className={`mt-1 w-5 h-5 shrink-0 rounded-sm border flex items-center justify-center transition-colors ${checked ? "bg-brand-blue border-brand-blue text-white" : "border-divider text-transparent hover:border-brand-blue"}`}
      >
        <Icon.Check size={13} />
      </button>
      <Link href={`/shop/${item.slug}`} className="w-16 h-16 shrink-0 bg-brand-blue-light border border-divider rounded-sm flex items-center justify-center p-1.5 overflow-hidden">
        <img src={item.img} alt={item.name} className="h-full w-auto object-contain" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-brand-teal truncate">{item.brand}</div>
            <Link href={`/shop/${item.slug}`} className="block font-serif text-[14px] font-medium text-ink leading-snug hover:text-brand-blue transition-colors truncate">
              {item.name}
            </Link>
          </div>
          <button type="button" onClick={() => onRemove(item.id)} className="shrink-0 text-ink-3 hover:text-brand-blue p-0.5" aria-label="Xóa">
            <Icon.X size={15} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center border border-divider rounded-sm">
            <button type="button" onClick={() => onQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-ink-2 hover:text-brand-blue text-sm">
              −
            </button>
            <span className="w-8 text-center font-sans text-[13px] font-bold text-ink">{item.qty}</span>
            <button type="button" onClick={() => onQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-ink-2 hover:text-brand-blue text-sm">
              +
            </button>
          </div>
          <span className="font-serif text-[15px] font-bold text-ink">{vnd(item.price * item.qty)}</span>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, count, isSelected, toggleSelect, allSelected, selectAll, deselectAll, selectedCount, selectedSubtotal, setQty, remove } = useCart();

  useEffect(() => {
    const o = () => setOpen(true);
    window.addEventListener("lennie-open-cart", o);
    return () => window.removeEventListener("lennie-open-cart", o);
  }, []);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/55 backdrop-blur-sm z-[80] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[81] shadow-2xl flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-divider shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-brand-blue">
              <Icon.Bag size={20} />
            </span>
            <h3 className="font-serif text-xl font-semibold text-ink">Giỏ hàng</h3>
            <span className="font-sans text-[11px] font-bold text-brand-blue bg-brand-blue-light rounded-full px-2 py-0.5">{count}</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="p-2 -mr-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors">
            <Icon.X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
              <Icon.Bag size={28} />
            </div>
            <p className="font-serif text-lg text-ink">Giỏ hàng đang trống</p>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-[240px]">Khám phá dược mỹ phẩm chọn lọc và thêm sản phẩm yêu thích vào giỏ.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className="mt-2 px-7 py-3 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue transition-colors">
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-3 border-b border-divider shrink-0">
              <button type="button" onClick={() => (allSelected ? deselectAll() : selectAll())} className="flex items-center gap-2 font-sans text-[11px] font-bold tracking-wider text-ink-2 hover:text-brand-blue uppercase">
                <span className={`w-4 h-4 rounded-sm border flex items-center justify-center ${allSelected ? "bg-brand-blue border-brand-blue text-white" : "border-divider text-transparent"}`}>
                  <Icon.Check size={11} />
                </span>
                Chọn tất cả
              </button>
              <span className="font-sans text-[11px] text-ink-3">{selectedCount}/{count} đã chọn</span>
            </div>
            <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
              {items.map((it) => (
                <CartLineRow key={it.id} item={it} checked={isSelected(it.id)} onToggle={toggleSelect} onQty={setQty} onRemove={remove} />
              ))}
            </div>
            <div className="shrink-0 border-t border-divider px-6 py-5 space-y-4 bg-mist">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[13px] text-ink-2">Tạm tính ({selectedCount} sản phẩm)</span>
                <span className="font-serif text-xl font-bold text-ink">{vnd(selectedSubtotal)}</span>
              </div>
              <p className="font-sans text-[11px] text-ink-3 leading-relaxed flex items-start gap-1.5">
                <Icon.Shield size={13} className="text-brand-blue shrink-0 mt-0.5" />
                Phí vận chuyển &amp; thanh toán cuối cùng được nhân viên Lennie xác nhận khi liên hệ.
              </p>
              <div className="space-y-2.5">
                {selectedCount > 0 ? (
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="w-full py-3.5 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon.ArrowR size={15} />
                    Thanh toán
                  </Link>
                ) : (
                  <button type="button" disabled className="w-full py-3.5 bg-divider text-ink-3 font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 cursor-not-allowed">
                    <Icon.ArrowR size={15} />
                    Thanh toán
                  </button>
                )}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-colors flex items-center justify-center"
                >
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
