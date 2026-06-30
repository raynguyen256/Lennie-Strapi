"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { useCart, openCartDrawer } from "@/lib/cart";
import CartDrawer from "@/components/chrome/CartDrawer";
import SearchModal from "@/components/chrome/SearchModal";

const NAV_LEFT = [
  ["Trang Chủ", "/", "home"],
  ["Về Chúng Tôi", "/about", "about"],
  ["Dịch Vụ", "/services", "services"],
];

const NAV_RIGHT = [
  ["Sản Phẩm", "/shop", "shop"],
  ["Blog", "/blog", "blog"],
  ["Case Study", "/case-study", "case-study"],
];

function NavLink({ label, href, navKey, active }) {
  const on = active === navKey;
  return (
    <Link
      href={href}
      className={`relative shrink-0 whitespace-nowrap font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${on ? "text-brand-blue" : "text-ink/70 hover:text-brand-blue"} after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-brand-blue after:origin-left after:transition-transform after:duration-300 ${on ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar({ onOpenQuiz, active = "home" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count: cartCount } = useCart();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <header
        style={{
          ...(scrolled
            ? undefined
            : { background: "linear-gradient(to bottom, #ffffff 65%, rgba(255,255,255,0))" }),
          borderWidth: "0px",
        }}
        className={`w-full fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_6px_30px_rgba(44,74,111,.08)] border-b border-divider" : "border-b border-transparent"}`}
      >
      <div className="max-w-7xl mx-auto px-6 h-[104px] relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav className="hidden lg:flex items-center gap-9 justify-self-start">
          {NAV_LEFT.map(([t, h, k]) => (
            <NavLink key={h} label={t} href={h} navKey={k} active={active} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-ink justify-self-start"
        >
          {open ? <Icon.X size={22} /> : <Icon.Menu size={22} />}
        </button>

        <Link href="/" className="justify-self-center flex items-center px-4 md:px-6">
          <img src="/assets/logo-lennie.png" alt="Lennie SkinLab" className="h-20 md:h-[88px] w-auto" />
        </Link>

        <div className="flex items-center gap-7 justify-self-end">
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_RIGHT.map(([t, h, k]) => (
              <NavLink key={h} label={t} href={h} navKey={k} active={active} />
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-ink/75 hover:text-brand-blue transition-colors"
              title="Tìm kiếm"
              aria-label="Tìm kiếm"
            >
              <Icon.Search size={18} stroke={1.8} />
            </button>
            <Link
              href="/contact"
              className="text-ink/75 hover:text-brand-blue transition-colors"
              title="Liên hệ"
              aria-label="Liên hệ"
            >
              <Icon.Pin size={18} stroke={1.8} />
            </Link>
            <button type="button" onClick={openCartDrawer} className="text-ink/75 hover:text-brand-blue transition-colors relative" aria-label="Giỏ hàng">
              <Icon.Bag size={18} stroke={1.8} />
              <span
                className={`absolute -top-2 -right-2 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all ${cartCount > 0 ? "bg-brand-blue scale-100" : "bg-brand-teal scale-90"}`}
              >
                {cartCount}
              </span>
            </button>
            <Link
              href="/booking"
              className="hidden sm:flex items-center gap-1.5 whitespace-nowrap bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-5 py-2.5 rounded-full hover:bg-ink transition-colors uppercase shrink-0"
            >
              <Icon.Calendar size={14} stroke={1.8} className="shrink-0" />
              Đặt lịch
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-divider bg-white px-6 py-4 flex flex-col gap-1">
          {[...NAV_LEFT, ...NAV_RIGHT].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-sans text-xs font-bold tracking-wider text-ink/80 uppercase py-2.5"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-4 py-3 rounded-full uppercase"
          >
            <Icon.Calendar size={14} stroke={1.8} />
            Đặt lịch
          </Link>
        </div>
      )}
      </header>
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
