/* ============================================================
   Sections 1 — Navbar, Hero, StatsBar, ProductShelf
   ============================================================ */
const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;

/* ---------------- NAVBAR ---------------- */
function Navbar({ onOpenBooking, onOpenQuiz, cartCount }) {
  const [open, setOpen] = useState1(false);
  const [scrolled, setScrolled] = useState1(false);
  useEffect1(() => {
    const f = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', f);return () => window.removeEventListener('scroll', f);
  }, []);
  const links = [
  ['Trang Chủ', '#top'], ['Dịch Vụ', '#services'], ['Sản Phẩm', '#essential-care'],
  ['Đội Ngũ', '#about'], ['Blog', '#blog'], ['Liên Hệ', '#booking']];

  return (
    <header
      style={{ ...(scrolled ? undefined : { background: 'linear-gradient(to bottom, #ffffff 34%, rgba(255,255,255,0))' }), borderColor: "rgba(0, 0, 0, 0)", borderWidth: "0px" }}
      className={`w-full fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_6px_30px_rgba(44,74,111,.08)] border-b border-divider' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between" style={{ borderColor: "rgba(87, 137, 183, 0)", borderStyle: "none", opacity: "1" }}>
        <a href="#top" className="flex items-center gap-3 group shrink-0">
          <img src="assets/logo-lennie.png" alt="Lennie SkinLab" className="h-16 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {links.map(([label, href], i) =>
          <a key={href} href={href}
          className={`font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${i === 0 ? 'text-ink' : 'text-ink/65'} hover:text-brand-blue`}>
              {label}
            </a>
          )}
        </nav>
        <div className="flex items-center gap-5">
          <button type="button" onClick={onOpenQuiz}
          className="hidden xl:block font-sans text-[10px] font-bold tracking-[0.16em] text-ink hover:text-brand-blue transition-colors uppercase">
            Phân Tích Da
          </button>
          <button type="button" className="text-ink/75 hover:text-brand-blue transition-colors"><Icon.Search size={18} stroke={1.8} /></button>
          <button type="button" className="text-ink/75 hover:text-brand-blue transition-colors relative">
            <Icon.Bag size={18} stroke={1.8} />
            <span className={`absolute -top-2 -right-2 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all ${cartCount > 0 ? 'bg-brand-blue scale-100' : 'bg-brand-teal scale-90'}`}>
              {cartCount}
            </span>
          </button>
          <button type="button" onClick={onOpenBooking}
          className="hidden sm:block bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-4 py-2 rounded-sm hover:bg-ink transition-colors uppercase">
            Đặt lịch
          </button>
          <button type="button" onClick={() => setOpen(!open)} className="lg:hidden text-ink">
            {open ? <Icon.X size={22} /> : <Icon.Menu size={22} />}
          </button>
        </div>
      </div>
      {open &&
      <div className="lg:hidden border-t border-divider bg-white px-6 py-4 flex flex-col gap-1">
          {links.map(([label, href]) =>
        <a key={href} href={href} onClick={() => setOpen(false)}
        className="font-sans text-xs font-bold tracking-wider text-ink/80 uppercase py-2.5">{label}</a>
        )}
          <button onClick={() => {setOpen(false);onOpenBooking();}}
        className="mt-2 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-4 py-3 rounded-sm uppercase">Đặt lịch tư vấn</button>
        </div>
      }
    </header>);

}

/* ---------------- HERO ---------------- */
function Hero({ onOpenBooking, onOpenQuiz }) {
  const [slide, setSlide] = useState1(0);
  useEffect1(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % 4), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="top" className="bg-white relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center border-b border-divider/50">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img src="assets/remix/hero-biologique.png" alt="Biologique Recherche"
        className="w-full h-full object-cover md:object-cover object-right opacity-60 md:opacity-100 select-none hero-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 md:via-white/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/10"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-2xl">
          <span className="reveal reveal-1 inline-block font-sans text-[10px] md:text-[11px] font-extrabold tracking-[0.4em] text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-sm uppercase">
            Phân phối ủy quyền chính hãng
          </span>
          <h1 className="reveal reveal-2 font-serif text-[44px] md:text-[62px] lg:text-[74px] font-light text-ink leading-[1.04] tracking-tight mt-5">
            Biologique<br /><span className="font-semibold italic">Recherche Pháp</span>
          </h1>
          <p className="reveal reveal-3 font-sans text-sm lg:text-[15px] text-ink-2 leading-relaxed max-w-lg font-medium mt-7">
            Thương hiệu dược mỹ phẩm trị liệu trứ danh toàn cầu với triết lý dưỡng da tái thiết sinh học độc bản. Được trực tiếp tuyển chọn khắt khe bởi ThS. DS. Hoàng Hồng Thắm nhằm mang tới kết quả phục hồi da lâm sàng ngoạn mục chuẩn Clinic 5 sao.
          </p>
          <div className="reveal reveal-4 flex flex-wrap items-center gap-4 mt-9">
            <button type="button" onClick={onOpenBooking}
            className="px-9 py-4 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all shadow-md hover:shadow-xl active:translate-y-0.5">
              Đặt lịch trị liệu ngay
            </button>
            <button type="button" onClick={onOpenQuiz}
            className="px-8 py-3.5 border border-brand-blue/35 hover:border-brand-blue text-ink font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm transition-all bg-white/85 hover:bg-white backdrop-blur-sm">
              Phân tích da miễn phí
            </button>
          </div>
          <div className="reveal reveal-5 flex gap-2.5 mt-10">
            {[0, 1, 2, 3].map((i) =>
            <button key={i} onClick={() => setSlide(i)}
            className={`h-1 rounded-full transition-all duration-500 ${slide === i ? 'w-10 bg-brand-blue' : 'w-5 bg-brand-blue/20 hover:bg-brand-blue/40'}`} />
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* ---------------- STATS BAR ---------------- */
function Stat({ target, suffix, title, desc, icon }) {
  const [ref, val] = useCountUp(target);
  const I = Icon[icon];
  return (
    <div className="flex flex-col items-start md:items-center text-left md:text-center px-4 md:px-8 first:pl-0 last:pr-0 pt-6 md:pt-0 first:pt-0">
      <div className="w-14 h-14 rounded-full border border-divider flex items-center justify-center mb-5 bg-gradient-to-br from-mist to-white shadow-sm text-brand-blue">
        <I size={26} stroke={1.4} />
      </div>
      <span ref={ref} className="font-serif text-3xl md:text-4xl font-semibold text-ink tracking-tight">{val}{suffix}</span>
      <h4 className="font-sans text-[12px] font-bold text-ink uppercase tracking-wider mt-3">{title}</h4>
      <p className="font-sans text-xs text-[#6F8CA8] mt-1.5 leading-relaxed max-w-[200px]">{desc}</p>
    </div>);

}
function StatsBar() {
  const stats = [
  { target: 6, suffix: '+', title: 'Năm Lâm Sàng Chuyên Sâu', desc: 'Hơn 6 năm chuyên hành nghề dược mỹ phẩm điều trị thực tế', icon: 'Heart' },
  { target: 98, suffix: '%', title: 'Tỷ Lệ Phục Hồi Thành Công', desc: 'Khách hàng chuyển biến rõ rệt sau liệu trình tuyển chọn', icon: 'CheckCircle' },
  { target: 1200, suffix: '+', title: 'Khách Hàng Đồng Hành', desc: 'Tin cậy tuyệt đối và liên tục giới thiệu người thân', icon: 'HeartHandshake' },
  { target: 50, suffix: '+', title: 'Thương Hiệu Toàn Cầu', desc: 'Ủy quyền trực tiếp 50+ nhãn dược mỹ phẩm quốc tế', icon: 'Shield' }];

  return (
    <section className="bg-white border-y border-divider py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-divider">
          {stats.map((s, i) => <Stat key={i} {...s} />)}
        </div>
      </div>
    </section>);

}

/* ---------------- PRODUCT SHELF (+ add to cart) ---------------- */
function ProductShelf({ onAddToCart }) {
  const [tag, setTag] = useState1('#XEMTẤTCẢ');
  const [added, setAdded] = useState1({});
  const tags = ['#XEMTẤTCẢ', '#BÁNCHẠY', '#CẤPẨMSÂU', '#PHỤCHỒIDA'];
  const [ref, shown] = useReveal();

  const add = (p) => {
    onAddToCart(p);
    setAdded((a) => ({ ...a, [p.id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [p.id]: false })), 1400);
  };

  return (
    <section id="essential-care" className="bg-white py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light tracking-wide uppercase leading-tight">
            Dược Mỹ Phẩm <br className="hidden sm:inline" /><span className="font-semibold">Chọn Lọc Độc Quyền</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {tags.map((t) =>
            <button key={t} type="button" onClick={() => setTag(t)}
            className={`px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase rounded-full border transition-all ${
            tag === t ? 'border-brand-blue bg-brand-blue text-white shadow-sm' : 'border-divider bg-white text-ink-2 hover:border-brand-blue'}`}>
                {t}
              </button>
            )}
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productData.map((p, idx) => {
            const dim = tag !== '#XEMTẤTCẢ' && !p.cats.includes(tag);
            return (
              <div key={p.id}
              className={`reveal-card bg-white border border-divider rounded-sm p-4 flex flex-col group transition-all duration-500 hover:shadow-[0_18px_50px_rgba(44,74,111,.12)] hover:border-brand-blue/40 ${shown ? 'is-in' : ''} ${dim ? 'opacity-35 saturate-50' : ''}`}
              style={{ transitionDelay: shown ? `${idx * 90}ms` : '0ms' }}>
                <div className="h-60 bg-brand-blue-light rounded-sm overflow-hidden flex items-center justify-center p-6 relative mb-4">
                  {p.badge &&
                  <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white border ${p.badge === 'Mới' ? 'text-brand-teal border-brand-teal/60' : 'text-brand-blue border-divider'}`}>
                      {p.badge}
                    </span>
                  }
                  <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 border border-divider flex items-center justify-center text-ink-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-ink hover:text-white" aria-label="Yêu thích">
                    <Icon.Heart size={14} />
                  </button>
                  <img src={p.img} alt={p.name} className="h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-1.5">{p.brand}</div>
                  <h3 className="font-serif text-[15px] font-medium text-ink leading-snug min-h-[40px]">{p.name}</h3>
                  <div className="font-sans text-[11px] text-[#6F8CA8] mt-1">{p.tag}</div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-divider">
                    <span className="font-serif text-[17px] font-bold text-ink">{p.price}</span>
                  </div>
                  <button type="button" onClick={() => add(p)}
                  className={`mt-3 w-full py-3 rounded-sm font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${
                  added[p.id] ? 'bg-brand-teal text-white' : 'bg-ink text-white hover:bg-brand-blue'}`}>
                    {added[p.id] ?
                    <><Icon.Check size={14} /> Đã thêm</> :
                    <><Icon.Plus size={14} /> Thêm vào giỏ</>}
                  </button>
                </div>
              </div>);

          })}
        </div>

        <div className="text-center mt-12">
          <a href="#booking" className="inline-block px-8 py-3.5 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue hover:text-white transition-all">
            Xem toàn bộ sản phẩm
          </a>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Navbar, Hero, StatsBar, ProductShelf });