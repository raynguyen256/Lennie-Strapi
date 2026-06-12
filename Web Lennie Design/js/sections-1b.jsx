/* ============================================================
   Variant B — Navbar with CENTERED logo (links split L/R)
   ============================================================ */
const { useState: useStateB, useEffect: useEffectB } = React;

function NavbarCentered({ onOpenBooking, onOpenQuiz, cartCount }) {
  const [open, setOpen] = useStateB(false);
  const [scrolled, setScrolled] = useStateB(false);
  useEffectB(() => {
    const f = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', f);return () => window.removeEventListener('scroll', f);
  }, []);
  const left = [['Trang Chủ', '#top'], ['Dịch Vụ', '#services'], ['Sản Phẩm', '#essential-care']];
  const right = [['Đội Ngũ', '#about'], ['Blog', '#blog'], ['Liên Hệ', '#booking']];
  const linkCls = 'relative font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-ink/70 hover:text-brand-blue transition-colors after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-brand-blue after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300';
  return (
    <header
      style={{ ...(scrolled ? undefined : { background: 'linear-gradient(to bottom, #ffffff 34%, rgba(255,255,255,0))' }), borderWidth: "0px" }}
      className={`w-full fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_6px_30px_rgba(44,74,111,.08)] border-b border-divider' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-[104px] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* LEFT links */}
        <nav className="hidden lg:flex items-center gap-9 justify-start">
          {left.map(([t, h]) => <a key={h} href={h} className={linkCls}>{t}</a>)}
        </nav>

        {/* mobile hamburger (left on small screens) */}
        <button type="button" onClick={() => setOpen(!open)} className="lg:hidden text-ink justify-self-start">
          {open ? <Icon.X size={22} /> : <Icon.Menu size={22} />}
        </button>

        {/* CENTER logo */}
        <a href="#top" className="justify-self-center flex items-center px-2">
          <img src="assets/logo-lennie.png" alt="Lennie SkinLab" className="h-16 md:h-[72px] w-auto" />
        </a>

        {/* RIGHT links + actions */}
        <div className="flex items-center gap-7 justify-end">
          <nav className="hidden lg:flex items-center gap-9">
            {right.map(([t, h]) => <a key={h} href={h} className={linkCls}>{t}</a>)}
          </nav>
          <div className="flex items-center gap-5">
            <button type="button" onClick={onOpenQuiz} className="hidden xl:block text-ink/75 hover:text-brand-blue transition-colors" title="Phân tích da"><Icon.Search size={18} stroke={1.8} /></button>
            <button type="button" className="text-ink/75 hover:text-brand-blue transition-colors relative" aria-label="Giỏ hàng">
              <Icon.Bag size={18} stroke={1.8} />
              <span className={`absolute -top-2 -right-2 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all ${cartCount > 0 ? 'bg-brand-blue scale-100' : 'bg-brand-teal scale-90'}`}>{cartCount}</span>
            </button>
            <button type="button" onClick={onOpenBooking} className="hidden sm:block bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-4 py-2.5 rounded-full hover:bg-ink transition-colors uppercase">Đặt lịch</button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open &&
      <div className="lg:hidden border-t border-divider bg-white px-6 py-4 flex flex-col gap-1">
          {[...left, ...right].map(([t, h]) =>
        <a key={h} href={h} onClick={() => setOpen(false)} className="font-sans text-xs font-bold tracking-wider text-ink/80 uppercase py-2.5">{t}</a>
        )}
          <button onClick={() => {setOpen(false);onOpenBooking();}} className="mt-2 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-4 py-3 rounded-full uppercase">Đặt lịch tư vấn</button>
        </div>
      }
    </header>);

}

window.NavbarCentered = NavbarCentered;