/* ============================================================
   Lennie SkinLab — shared chrome
   Multi-page Navbar, Footer, PageHero, PageShell, modals, cart UI.
   Single source of truth used by EVERY page (home + sub-pages).
   ============================================================ */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

/* ============================================================
   CART STORE — localStorage-backed, shared across every page.
   Items: { id, name, brand, img, price (number), qty }.
   ============================================================ */
const CART_KEY = 'lennie_cart_v1';
const DESELECTED_KEY = 'lennie_cart_deselected_v1';
const vnd = (n) => (n || 0).toLocaleString('vi-VN') + '₫';

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function writeCart(items) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
  window.dispatchEvent(new CustomEvent('lennie-cart-change'));
}
function readDeselected() {
  try { return JSON.parse(localStorage.getItem(DESELECTED_KEY)) || []; }
  catch (e) { return []; }
}
function writeDeselected(ids) {
  try { localStorage.setItem(DESELECTED_KEY, JSON.stringify(ids)); } catch (e) {}
  window.dispatchEvent(new CustomEvent('lennie-cart-change'));
}
const CartStore = {
  get: readCart,
  add(p, qty = 1) {
    if (!p) return;
    const price = typeof p.price === 'number' ? p.price : parseInt(String(p.price || '').replace(/[^\d]/g, ''), 10) || 0;
    const items = readCart();
    const ex = items.find((i) => i.id === p.id);
    if (ex) ex.qty += qty;
    else items.push({ id: p.id, name: p.name, brand: p.brand || '', img: p.img, price, qty });
    writeCart(items);
  },
  setQty(id, qty) {
    let items = readCart();
    if (qty <= 0) {
      items = items.filter((i) => i.id !== id);
      writeDeselected(readDeselected().filter((x) => x !== id));
    } else {
      const ex = items.find((i) => i.id === id);
      if (ex) ex.qty = qty;
    }
    writeCart(items);
  },
  remove(id) {
    writeCart(readCart().filter((i) => i.id !== id));
    writeDeselected(readDeselected().filter((x) => x !== id));
  },
  removeMany(ids) {
    writeCart(readCart().filter((i) => !ids.includes(i.id)));
    writeDeselected(readDeselected().filter((x) => !ids.includes(x)));
  },
  clear() {
    writeCart([]);
    writeDeselected([]);
  },
  toggleSelect(id) {
    const d = readDeselected();
    writeDeselected(d.includes(id) ? d.filter((x) => x !== id) : [...d, id]);
  },
  selectAll() { writeDeselected([]); },
  deselectAll() { writeDeselected(readCart().map((i) => i.id)); },
};
function useCart() {
  const [items, setItems] = useStateC(readCart);
  const [deselected, setDeselected] = useStateC(readDeselected);
  useEffectC(() => {
    const f = () => { setItems(readCart()); setDeselected(readDeselected()); };
    window.addEventListener('lennie-cart-change', f);
    window.addEventListener('storage', f);
    return () => { window.removeEventListener('lennie-cart-change', f); window.removeEventListener('storage', f); };
  }, []);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const isSelected = (id) => !deselected.includes(id);
  const selectedItems = items.filter((i) => isSelected(i.id));
  const selectedCount = selectedItems.reduce((s, i) => s + i.qty, 0);
  const selectedSubtotal = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return {
    items, count, subtotal,
    isSelected, selectedItems, selectedCount, selectedSubtotal, allSelected,
    toggleSelect: CartStore.toggleSelect, selectAll: CartStore.selectAll, deselectAll: CartStore.deselectAll,
    add: CartStore.add, setQty: CartStore.setQty, remove: CartStore.remove, removeMany: CartStore.removeMany, clear: CartStore.clear,
  };
}
const openCartDrawer = () => window.dispatchEvent(new CustomEvent('lennie-open-cart'));

/* ---------------- CART DRAWER (slide-in modal) ---------------- */
function CartLineRow({ item, checked, onToggle, onQty, onRemove, compact }) {
  return (
    <div className="flex gap-3 py-4 border-b border-divider">
      <button type="button" onClick={() => onToggle(item.id)} aria-pressed={checked} aria-label="Chọn sản phẩm"
        className={`mt-1 w-5 h-5 shrink-0 rounded-sm border flex items-center justify-center transition-colors ${checked ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider text-transparent hover:border-brand-blue'}`}>
        <Icon.Check size={13} />
      </button>
      <a href={`product-detail.html?id=${item.id}`} className="w-16 h-16 shrink-0 bg-brand-blue-light border border-divider rounded-sm flex items-center justify-center p-1.5 overflow-hidden">
        <img src={item.img} alt={item.name} className="h-full w-auto object-contain" />
      </a>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-brand-teal truncate">{item.brand}</div>
            <a href={`product-detail.html?id=${item.id}`} className="block font-serif text-[14px] font-medium text-ink leading-snug hover:text-brand-blue transition-colors truncate">{item.name}</a>
          </div>
          <button type="button" onClick={() => onRemove(item.id)} className="shrink-0 text-ink-3 hover:text-brand-blue p-0.5" aria-label="Xóa"><Icon.X size={15} /></button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center border border-divider rounded-sm">
            <button type="button" onClick={() => onQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-ink-2 hover:text-brand-blue text-sm">−</button>
            <span className="w-8 text-center font-sans text-[13px] font-bold text-ink">{item.qty}</span>
            <button type="button" onClick={() => onQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-ink-2 hover:text-brand-blue text-sm">+</button>
          </div>
          <span className="font-serif text-[15px] font-bold text-ink">{vnd(item.price * item.qty)}</span>
        </div>
      </div>
    </div>);

}

function CartDrawer() {
  const [open, setOpen] = useStateC(false);
  const { items, count, isSelected, toggleSelect, allSelected, selectAll, deselectAll, selectedCount, selectedSubtotal, setQty, remove } = useCart();
  useEffectC(() => {
    const o = () => setOpen(true);
    window.addEventListener('lennie-open-cart', o);
    return () => window.removeEventListener('lennie-open-cart', o);
  }, []);
  useEffectC(() => {
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <>
      {/* Overlay */}
      <div onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/55 backdrop-blur-sm z-[80] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      {/* Panel */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[81] shadow-2xl flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-divider shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-brand-blue"><Icon.Bag size={20} /></span>
            <h3 className="font-serif text-xl font-semibold text-ink">Giỏ hàng</h3>
            <span className="font-sans text-[11px] font-bold text-brand-blue bg-brand-blue-light rounded-full px-2 py-0.5">{count}</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="p-2 -mr-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors"><Icon.X size={20} /></button>
        </div>

        {items.length === 0 ?
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><Icon.Bag size={28} /></div>
            <p className="font-serif text-lg text-ink">Giỏ hàng đang trống</p>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-[240px]">Khám phá dược mỹ phẩm chọn lọc và thêm sản phẩm yêu thích vào giỏ.</p>
            <a href="shop.html" onClick={() => setOpen(false)} className="mt-2 px-7 py-3 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue transition-colors">Khám phá sản phẩm</a>
          </div> :

          <>
            <div className="flex items-center justify-between px-6 py-3 border-b border-divider shrink-0">
              <button type="button" onClick={() => (allSelected ? deselectAll() : selectAll())} className="flex items-center gap-2 font-sans text-[11px] font-bold tracking-wider text-ink-2 hover:text-brand-blue uppercase">
                <span className={`w-4 h-4 rounded-sm border flex items-center justify-center ${allSelected ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider text-transparent'}`}><Icon.Check size={11} /></span>
                Chọn tất cả
              </button>
              <span className="font-sans text-[11px] text-ink-3">{selectedCount}/{count} đã chọn</span>
            </div>
            <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
              {items.map((it) => <CartLineRow key={it.id} item={it} checked={isSelected(it.id)} onToggle={toggleSelect} onQty={setQty} onRemove={remove} />)}
            </div>
            <div className="shrink-0 border-t border-divider px-6 py-5 space-y-4 bg-mist">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[13px] text-ink-2">Tạm tính ({selectedCount} sản phẩm)</span>
                <span className="font-serif text-xl font-bold text-ink">{vnd(selectedSubtotal)}</span>
              </div>
              <p className="font-sans text-[11px] text-ink-3 leading-relaxed flex items-start gap-1.5"><Icon.Shield size={13} className="text-brand-blue shrink-0 mt-0.5" />Phí vận chuyển &amp; thanh toán cuối cùng được nhân viên Lennie xác nhận khi liên hệ.</p>
              <div className="space-y-2.5">
                {selectedCount > 0 ?
                  <a href="checkout.html" onClick={() => setOpen(false)} className="w-full py-3.5 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-colors flex items-center justify-center gap-2"><Icon.ArrowR size={15} />Thanh toán</a> :
                  <button type="button" disabled className="w-full py-3.5 bg-divider text-ink-3 font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 cursor-not-allowed"><Icon.ArrowR size={15} />Thanh toán</button>
                }
                <a href="cart.html" onClick={() => setOpen(false)} className="w-full py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-colors flex items-center justify-center">Xem giỏ hàng</a>
              </div>
            </div>
          </>
        }
      </aside>
    </>);

}

/* ---------------- NAVBAR (multi-page, centered logo) ---------------- */
/* Centered-logo navbar (Homepage v2 layout) — multi-page links split L/R */
const NAV_LEFT = [
['Trang Chủ', 'index.html', 'home'],
['Về Chúng Tôi', 'about.html', 'about'],
['Dịch Vụ', 'services.html', 'services']];

const NAV_RIGHT = [
['Sản Phẩm', 'shop.html', 'shop'],
['Blog', 'blog.html', 'blog'],
['Liên Hệ', 'contact.html', 'contact']];


function NavLink({ label, href, key1, active }) {
  const on = active === key1;
  return (
    <a href={href}
    className={`relative font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${on ? 'text-brand-blue' : 'text-ink/70 hover:text-brand-blue'} after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-brand-blue after:origin-left after:transition-transform after:duration-300 ${on ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>
      {label}
    </a>);

}

function Navbar({ onOpenBooking, onOpenQuiz, cartCount = 0, active = 'home' }) {
  const [open, setOpen] = useStateC(false);
  const [scrolled, setScrolled] = useStateC(false);
  const { count: liveCount } = useCart();
  const cnt = liveCount || cartCount;
  useEffectC(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header
      style={{ ...(scrolled ? undefined : { background: 'linear-gradient(to bottom, #ffffff 34%, rgba(255,255,255,0))' }), borderWidth: "0px" }}
      className={`w-full fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_6px_30px_rgba(44,74,111,.08)] border-b border-divider' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-[104px] grid grid-cols-[1fr_auto_1fr] items-center gap-6" style={{ opacity: "1" }}>
        {/* LEFT links */}
        <nav className="hidden lg:flex items-center gap-9 justify-start">
          {NAV_LEFT.map(([t, h, k]) => <NavLink key={h} label={t} href={h} key1={k} active={active} />)}
        </nav>

        {/* mobile hamburger (left on small screens) */}
        <button type="button" onClick={() => setOpen(!open)} className="lg:hidden text-ink justify-self-start">
          {open ? <Icon.X size={22} /> : <Icon.Menu size={22} />}
        </button>

        {/* CENTER logo */}
        <a href="index.html" className="justify-self-center flex items-center px-2">
          <img src="assets/logo-lennie.png" alt="Lennie SkinLab" className="h-16 md:h-[72px] w-auto" />
        </a>

        {/* RIGHT links + actions */}
        <div className="flex items-center gap-7 justify-end">
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_RIGHT.map(([t, h, k]) => <NavLink key={h} label={t} href={h} key1={k} active={active} />)}
          </nav>
          <div className="flex items-center gap-5">
            <button type="button" onClick={onOpenQuiz} className="hidden xl:block text-ink/75 hover:text-brand-blue transition-colors" title="Phân tích da"><Icon.Search size={18} stroke={1.8} /></button>
            <button type="button" onClick={openCartDrawer} className="text-ink/75 hover:text-brand-blue transition-colors relative" aria-label="Giỏ hàng">
              <Icon.Bag size={18} stroke={1.8} />
              <span className={`absolute -top-2 -right-2 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all ${cnt > 0 ? 'bg-brand-blue scale-100' : 'bg-brand-teal scale-90'}`}>{cnt}</span>
            </button>
            <button type="button" onClick={onOpenBooking} className="hidden sm:block whitespace-nowrap bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-5 py-2.5 rounded-full hover:bg-ink transition-colors uppercase">Đặt lịch</button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open &&
      <div className="lg:hidden border-t border-divider bg-white px-6 py-4 flex flex-col gap-1">
          {[...NAV_LEFT, ...NAV_RIGHT].map(([label, href]) =>
        <a key={href} href={href} className="font-sans text-xs font-bold tracking-wider text-ink/80 uppercase py-2.5">{label}</a>
        )}
          <button onClick={() => {setOpen(false);onOpenBooking && onOpenBooking();}}
        className="mt-2 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest px-4 py-3 rounded-full uppercase">Đặt lịch tư vấn</button>
        </div>
      }
      <CartDrawer />
    </header>);

}

/* ---------------- PAGE HERO (sub-page banner) ---------------- */
function PageHero({ eyebrow, title, accent, intro, crumb, img, align = 'left' }) {
  const centered = align === 'center';
  return (
    <section className="relative overflow-hidden bg-brand-blue-light border-b border-divider">
      {img &&
      <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src={img} alt="" className="w-full h-full object-cover opacity-100 select-none" />
          <div className={`absolute inset-0 ${centered ? 'bg-white/55' : 'bg-gradient-to-r from-white/95 via-white/80 to-white/30'}`}></div>
        </div>
      }
      <div className={`relative z-10 max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-14 md:pb-20 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
        <nav className={`flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-ink-3 mb-6 ${centered ? 'justify-center' : ''}`}>
          <a href="index.html" className="hover:text-brand-blue transition-colors">Trang chủ</a>
          {crumb && crumb.map((c, i) =>
          <span key={i} className="flex items-center gap-2">
              <Icon.ChevronR size={11} className="text-ink-3/60" />
              {c[1] ? <a href={c[1]} className="hover:text-brand-blue transition-colors">{c[0]}</a> : <span className="text-brand-blue">{c[0]}</span>}
            </span>
          )}
        </nav>
        {eyebrow &&
        <span className="inline-block self-start font-sans text-[10px] md:text-[11px] font-extrabold tracking-[0.3em] text-brand-blue bg-white/70 border border-white px-4 py-1.5 rounded-sm uppercase" style={centered ? { alignSelf: 'center' } : undefined}>
            {eyebrow}
          </span>
        }
        <h1 className={`font-serif text-[38px] md:text-[58px] lg:text-[66px] font-light text-ink leading-[1.05] tracking-tight mt-5 ${centered ? 'max-w-3xl' : 'max-w-3xl'}`}>
          {title} {accent && <span className="font-semibold italic text-brand-blue">{accent}</span>}
        </h1>
        {intro &&
        <p className={`font-sans text-sm lg:text-[15px] text-ink-2 leading-relaxed font-medium mt-6 max-w-xl ${centered ? 'mx-auto' : ''}`}>
            {intro}
          </p>
        }
      </div>
    </section>);

}

/* ---------------- FLOATING ACTIONS ---------------- */
function FloatingActions({ onOpenBooking }) {
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      <a href="#" onClick={(e) => e.preventDefault()} title="Messenger"
      className="w-[52px] h-[52px] rounded-full bg-white border border-divider shadow-lg flex items-center justify-center text-brand-blue hover:-translate-y-0.5 hover:shadow-xl transition-all"><Icon.Message size={22} /></a>
      <button type="button" onClick={onOpenBooking} title="Đặt lịch"
      className="w-[52px] h-[52px] rounded-full bg-brand-blue text-white shadow-lg flex items-center justify-center hover:bg-ink hover:-translate-y-0.5 hover:shadow-xl transition-all"><Icon.Calendar size={22} /></button>
    </div>);

}

/* ---------------- CART TOAST ---------------- */
function CartToast({ show, product }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] transition-all duration-400 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-ink text-white rounded-full pl-2 pr-5 py-2 flex items-center gap-3 shadow-2xl">
        <span className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center text-ink"><Icon.Check size={18} /></span>
        <div className="leading-tight">
          <div className="font-sans text-[11px] font-bold tracking-wide">Đã thêm vào giỏ</div>
          <div className="font-sans text-[10px] text-white/60">{product ? product.name : ''}</div>
        </div>
      </div>
    </div>);

}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const [email, setEmail] = useStateC('');
  const [sub, setSub] = useStateC(false);
  const go = (e) => {e.preventDefault();if (!email) return;setSub(true);setTimeout(() => {setEmail('');setSub(false);}, 4000);};
  return (
    <footer className="bg-light-bg text-ink-2 pt-20 pb-10 border-t border-divider font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <img src="assets/logo-lennie.png" alt="Lennie SkinLab" className="h-12 w-auto" />
            <p className="text-sm text-ink-2 leading-relaxed max-w-sm">
              Lennie SkinLab tin vào sức mạnh chữa lành của y học lâm sàng và dược mỹ phẩm chọn lọc độc quyền. Chúng tôi đồng hành trao gửi làn da khỏe mạnh nguyên bản nhất cho bạn.
            </p>
            <div className="flex gap-2.5">
              {['Fb', 'Ig', 'Zl', 'Tk'].map((s) =>
              <div key={s} className="w-9 h-9 rounded-full bg-white hover:bg-brand-blue hover:text-white border border-divider flex items-center justify-center text-xs font-bold uppercase transition-colors cursor-pointer text-brand-blue select-none">{s}</div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Khám phá</h4>
            <div className="flex flex-col gap-3 text-sm">
              {[['Về chúng tôi', 'about.html'], ['Dịch vụ điều trị', 'services.html'], ['Sản phẩm', 'shop.html'], ['Đánh giá khách hàng', 'testimonials.html'], ['Blog da liễu', 'blog.html'], ['Đặt lịch', 'booking.html']].map(([t, h]) =>
              <a key={h} href={h} className="hover:text-brand-blue transition-colors text-ink-2">{t}</a>
              )}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Nhận tin tức</h4>
            <p className="text-sm text-ink-2 leading-relaxed">Đăng ký để nhận kiến thức chăm da khoa học &amp; ưu đãi dịch vụ mới nhất từ Lennie SkinLab.</p>
            <form onSubmit={go} className="relative mt-4">
              <input type="email" placeholder="Địa chỉ Email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-white border border-divider rounded p-3 pr-12 text-sm text-ink placeholder-[#6F8CA8] focus:outline-none focus:border-brand-blue" />
              <button type="submit" aria-label="Đăng ký" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue hover:bg-ink text-white rounded transition-colors"><Icon.ArrowR size={14} /></button>
            </form>
            {sub && <div className="flex items-center gap-1.5 text-sm text-brand-blue pt-1 font-semibold"><Icon.Check size={16} /><span>Đăng ký thành công!</span></div>}
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Liên hệ</h4>
            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex gap-2.5 items-start"><span className="text-brand-blue shrink-0 mt-0.5"><Icon.Pin size={16} /></span><span className="text-ink-2 leading-snug">Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</span></div>
              <div className="flex gap-2.5 items-center"><span className="text-brand-blue"><Icon.Phone size={16} /></span><span className="text-ink-2">+84 909 123 456</span></div>
              <div className="flex gap-2.5 items-start"><span className="text-brand-blue shrink-0 mt-0.5"><Icon.Clock size={16} /></span><span className="text-ink-2 leading-snug">Thứ 2 – Thứ 7<br />8:00 – 20:00 (Nghỉ Chủ Nhật)</span></div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-divider flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] md:text-xs">
          <span>© 2026 Lennie SkinLab · ThS. DS. Hoàng Hồng Thắm. Bảo lưu mọi quyền.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-blue transition-colors">Chính sách bảo mật</a><span>•</span>
            <a href="#" className="hover:text-brand-blue transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>);

}

/* ---------------- QUIZ MODAL ---------------- */
function QuizModal({ isOpen, onClose }) {
  const [step, setStep] = useStateC(0);
  const [answers, setAnswers] = useStateC({});
  const [analyzing, setAnalyzing] = useStateC(false);
  const [result, setResult] = useStateC(null);
  if (!isOpen) return null;
  const q = quizQuestions[step];
  const answered = answers[q.key] && answers[q.key].trim() !== '';
  const pick = (k, v) => setAnswers((p) => ({ ...p, [k]: v }));
  const next = () => {
    if (step < quizQuestions.length - 1) setStep(step + 1);else
    {setAnalyzing(true);setTimeout(() => {setResult(generateRoutine(answers));setAnalyzing(false);}, 1800);}
  };
  const reset = () => {setAnswers({});setStep(0);setResult(null);setAnalyzing(false);};
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10"><Icon.X size={20} /></button>
        <div className="p-6 md:p-8">
          {analyzing &&
          <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
                <span className="text-brand-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"><Icon.Sparkles size={24} /></span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Đang phân tích cấu trúc da...</h3>
              <p className="font-sans text-xs text-ink-3 max-w-xs">Thuật toán của Dược sĩ Thắm đang lập phác đồ tối ưu riêng cho bạn.</p>
            </div>
          }
          {!analyzing && result &&
          <div className="space-y-6">
              <div className="text-center pb-4 border-b border-divider">
                <div className="w-12 h-12 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-3"><Icon.Shield size={24} /></div>
                <h3 className="font-serif text-2xl font-semibold text-ink">Phác đồ đề xuất cho {result.customerName}</h3>
                <p className="font-sans text-[11px] text-brand-teal font-semibold tracking-wider uppercase mt-1">Chẩn đoán Lennie SkinLab</p>
              </div>
              <div className="bg-mist p-5 rounded-lg border border-divider">
                <h4 className="font-sans text-xs font-bold text-ink tracking-widest uppercase mb-2 flex items-center gap-2"><span className="text-brand-blue"><Icon.Droplet size={14} /></span>Đọc vị da</h4>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">{result.skinAnalysis}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 border border-divider rounded-lg">
                  <h5 className="font-sans text-xs font-bold text-brand-teal tracking-widest uppercase mb-3 flex items-center gap-2"><Icon.Sun size={16} />Buổi sáng (AM)</h5>
                  <ul className="space-y-2.5">{result.morningSteps.map((s, i) =>
                  <li key={i} className="flex gap-2.5 items-start text-xs text-ink-2"><span className="w-5 h-5 rounded-full bg-brand-blue-light text-brand-blue font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{i + 1}</span><span>{s}</span></li>
                  )}</ul>
                </div>
                <div className="bg-white p-4 border border-divider rounded-lg">
                  <h5 className="font-sans text-xs font-bold text-brand-blue tracking-widest uppercase mb-3 flex items-center gap-2"><Icon.Heart size={16} />Buổi tối (PM)</h5>
                  <ul className="space-y-2.5">{result.eveningSteps.map((s, i) =>
                  <li key={i} className="flex gap-2.5 items-start text-xs text-ink-2"><span className="w-5 h-5 rounded-full bg-brand-blue-light text-brand-blue font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{i + 1}</span><span>{s}</span></li>
                  )}</ul>
                </div>
              </div>
              <div className="bg-brand-blue-light/60 p-4 border-l-4 border-brand-blue rounded-r">
                <p className="font-sans text-xs text-brand-blue font-medium leading-relaxed italic">{result.expertAdvice}</p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-divider">
                <button type="button" onClick={reset} className="flex-1 py-3 border border-brand-blue text-brand-blue font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-blue-light transition-colors">Làm lại</button>
                <a href="about.html" className="flex-1 py-3 bg-brand-blue text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-ink shadow transition-colors text-center">Gặp chuyên gia</a>
              </div>
            </div>
          }
          {!analyzing && !result &&
          <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-3 tracking-wider"><span>Khám phá làn da cùng Lennie</span><span>Câu {step + 1} / {quizQuestions.length}</span></div>
              <div className="w-full bg-light-bg h-1 rounded-full overflow-hidden"><div className="bg-brand-blue h-full transition-all duration-300" style={{ width: `${(step + 1) / quizQuestions.length * 100}%` }}></div></div>
              <div className="py-2">
                <h3 className="font-serif text-xl md:text-2xl text-ink font-semibold leading-snug mb-8">{q.question}</h3>
                {q.type === 'select' &&
              <div className="space-y-3">{q.options.map((opt) => {
                  const sel = answers[q.key] === opt;
                  return (
                    <button key={opt} type="button" onClick={() => pick(q.key, opt)}
                    className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm font-sans flex items-center justify-between transition-all ${sel ? 'bg-brand-blue-light border-brand-teal text-brand-blue font-semibold' : 'border-divider hover:border-brand-blue hover:bg-mist text-ink-2'}`}>
                        <span>{opt}</span>
                        {sel && <span className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0"><Icon.Check size={12} /></span>}
                      </button>);

                })}</div>
              }
                {q.type === 'input' &&
              <div className="relative">
                    <span className="text-ink-3 absolute left-4 top-1/2 -translate-y-1/2"><Icon.User size={20} /></span>
                    <input type="text" placeholder={q.placeholder} value={answers[q.key] || ''} onChange={(e) => pick(q.key, e.target.value)}
                className="w-full p-4 pl-12 bg-mist border border-divider rounded-lg font-sans text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-ink" />
                  </div>
              }
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-divider gap-4">
                <button type="button" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
              className={`inline-flex items-center gap-1 font-sans text-[11px] font-bold tracking-wider uppercase py-2.5 ${step === 0 ? 'text-ink-3/40 cursor-not-allowed' : 'text-ink-3 hover:text-brand-blue'}`}><Icon.ChevronL size={16} />Quay lại</button>
                <button type="button" onClick={next} disabled={!answered}
              className={`inline-flex items-center gap-1 px-6 py-2.5 font-sans text-[11px] font-extrabold tracking-wider uppercase rounded shadow-sm ${answered ? 'bg-brand-blue hover:bg-ink text-white' : 'bg-divider text-ink-3/50 cursor-not-allowed'}`}>
                  {step === quizQuestions.length - 1 ? 'Xem kết quả' : 'Tiếp theo'}<Icon.ChevronR size={16} />
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}

/* ============================================================
   CONSULT FORM — unified lead form (used on every page).
   Fields: Họ và tên · Tình trạng da · Dịch vụ đăng ký · SĐT.
   On submit → composes a message + opens Messenger to continue.
   ============================================================ */
const CONSULT_SERVICES = [
{ id: 'routine', label: 'Cá nhân hóa phác đồ' },
{ id: 'product', label: 'Tư vấn mua sản phẩm lẻ' }];

const MESSENGER_URL = 'https://m.me/lennie.skinlab';

function consultServiceLabel(id) {
  const f = CONSULT_SERVICES.find((s) => s.id === id);
  return f ? f.label : id;
}
function buildConsultMessage({ name, skin, serviceLabel, phone }) {
  return [
  'Xin chào Lennie SkinLab! Em muốn được tư vấn ạ 🌿',
  '• Họ và tên: ' + (name || '(chưa điền)'),
  '• SĐT: ' + (phone || '(chưa điền)'),
  '• Tình trạng da: ' + (skin || '(chưa mô tả)'),
  '• Dịch vụ muốn đăng ký: ' + (serviceLabel || '')].
  join('\n');
}
function openMessengerWith(msg) {
  try {if (navigator.clipboard) navigator.clipboard.writeText(msg);} catch (e) {}
  window.open(MESSENGER_URL, '_blank', 'noopener');
}

function ConsultForm({ defaultService = 'routine', lockedServiceLabel = null, buttonLabel = 'Gửi & tư vấn qua Messenger', onClose }) {
  const [name, setName] = useStateC('');
  const [skin, setSkin] = useStateC('');
  const [service, setService] = useStateC(defaultService);
  const [phone, setPhone] = useStateC('');
  const [sent, setSent] = useStateC(false);
  const serviceLabel = lockedServiceLabel || consultServiceLabel(service);
  const msg = buildConsultMessage({ name, skin, serviceLabel, phone });
  const submit = (e) => {e.preventDefault();openMessengerWith(msg);setSent(true);};
  const reset = () => {setName('');setSkin('');setService(defaultService);setPhone('');setSent(false);};

  if (sent) {
    return (
      <div className="py-6 text-center space-y-5">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-brand-blue border border-divider"><Icon.Message size={30} /></div>
        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl font-bold text-ink">Đang chuyển tới Messenger…</h3>
          <p className="font-sans text-sm text-ink-2 max-w-md mx-auto leading-relaxed">Cửa sổ Messenger đã mở để bạn tiếp tục tư vấn cùng Lennie. Nội dung dưới đây đã được sao chép sẵn — chỉ cần dán &amp; gửi.</p>
        </div>
        <div className="bg-white border border-divider rounded-md p-5 text-left max-w-md mx-auto">
          <span className="block font-sans text-[10px] font-bold tracking-widest text-ink-3 uppercase mb-3">Thông tin gửi đi</span>
          <pre className="font-sans text-[13px] text-ink-2 leading-relaxed whitespace-pre-wrap">{msg}</pre>
        </div>
        <div className="flex flex-wrap gap-3 justify-center pt-1">
          <button type="button" onClick={() => openMessengerWith(msg)} className="px-6 py-3 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors">Mở lại Messenger</button>
          <button type="button" onClick={reset} className="px-6 py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-brand-blue-light transition-colors">Gửi yêu cầu khác</button>
        </div>
      </div>);

  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Họ và tên*</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ và tên"
          className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Số điện thoại*</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0909 000 000"
          className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Tình trạng da*</label>
        <textarea rows={3} required value={skin} onChange={(e) => setSkin(e.target.value)} placeholder="Ví dụ: da mụn ẩn lâu năm, da nhạy cảm mẩn đỏ, đang dùng retinol bị kích ứng..."
        className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60 resize-none"></textarea>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Dịch vụ muốn đăng ký*</label>
        {lockedServiceLabel ?
        <div className="w-full px-4 py-3 bg-brand-blue-light border border-brand-blue/30 rounded-sm font-sans text-sm text-ink font-semibold flex items-center gap-2">
            <Icon.Check size={15} className="text-brand-blue" />{lockedServiceLabel}
          </div> :

        <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-sm text-ink">
            {CONSULT_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        }
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button type="submit" className="px-8 py-4 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all shadow-md flex items-center gap-2"><Icon.Message size={15} />{buttonLabel}</button>
        {onClose && <button type="button" onClick={onClose} className="px-6 py-4 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-brand-blue-light transition-colors">Hủy bỏ</button>}
      </div>
      <p className="font-sans text-[11px] text-ink-3 flex items-center gap-1.5"><Icon.Shield size={13} className="text-brand-blue shrink-0" />Nhấn gửi để tiếp tục trò chuyện cùng chuyên gia qua Messenger.</p>
    </form>);

}

/* Full section: left intro column + right consult form card */
function ConsultSection({ id = 'dang-ky', eyebrow = 'Đăng ký tư vấn', title, accent, intro, image = 'assets/remix/wellness-spa.png', lockedServiceLabel = null, buttonLabel, defaultService = 'routine' }) {
  return (
    <section id={id} className="bg-white py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><Icon.Message size={20} /></div>
            <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">{eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-[42px] text-ink font-light leading-tight tracking-tight">
              {title || 'Khởi đầu hành trình'} {accent && <span className="font-semibold italic text-brand-blue">{accent}</span>}
            </h2>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-sm">
              {intro || 'Để lại thông tin và tình trạng da — Lennie sẽ tiếp tục tư vấn trực tiếp cùng bạn qua Messenger trong thời gian sớm nhất.'}
            </p>
          </div>
          <div className="relative max-w-sm rounded-md overflow-hidden shadow-sm aspect-video bg-brand-blue-light border border-divider">
            <img src={image} alt="Lennie therapy" className="w-full h-full object-cover select-none" />
            <div className="absolute top-4 left-4 bg-white/75 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/40">
              <span className="font-sans text-[8px] font-black tracking-widest text-ink uppercase">🛡️ Giữ trọn niềm tin y khoa</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex gap-1 text-brand-blue">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-sm">★</span>)}</div>
            <p className="font-sans text-[11px] font-bold text-ink tracking-wide">Hơn 2.500+ khách hàng tin dùng toàn quốc</p>
          </div>
        </div>
        <div className="lg:col-span-7 bg-brand-blue-light border border-divider p-8 rounded-md shadow-sm">
          <ConsultForm lockedServiceLabel={lockedServiceLabel} buttonLabel={buttonLabel} defaultService={defaultService} />
        </div>
      </div>
    </section>);

}

/* ---------------- QUICK FAQ (Giải đáp nhanh) ---------------- */
function FaqAccordion({ items }) {
  const [open, setOpen] = useStateC(0);
  return (
    <div className="max-w-3xl mx-auto divide-y divide-divider border-y border-divider">
      {items.map((f, i) =>
      <div key={i}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
            <span className="font-serif text-[17px] md:text-lg font-medium text-ink group-hover:text-brand-blue transition-colors">{f.q}</span>
            <span className={`shrink-0 w-8 h-8 rounded-full border border-divider flex items-center justify-center text-brand-blue transition-transform ${open === i ? 'rotate-45 bg-brand-blue-light' : ''}`}><Icon.Plus size={16} /></span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-60 pb-6' : 'max-h-0'}`}>
            <p className="font-sans text-sm text-ink-2 leading-relaxed pr-12">{f.a}</p>
          </div>
        </div>
      )}
    </div>);

}
function QuickFaqSection({ light = true }) {
  return (
    <section id="giai-dap-nhanh" className={`${light ? 'bg-brand-blue-light' : 'bg-white'} py-20 border-b border-divider`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <SectionHead center eyebrow="Giải đáp nhanh" title="Những điều bạn" accent="có thể đang băn khoăn" intro="Tổng hợp các câu hỏi thường gặp nhất về dịch vụ, chi phí và cách Lennie đồng hành cùng làn da của bạn." />
        <FaqAccordion items={faqs} />
      </div>
    </section>);

}

/* ---------------- BOOKING MODAL (now a Messenger consult form) ---------------- */
function BookingModal({ isOpen, onClose, presetService }) {
  if (!isOpen) return null;
  const defaultService = presetService === 'product' ? 'product' : 'routine';
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10"><Icon.X size={20} /></button>
        <div className="p-6 md:p-8">
          <div className="text-center pb-5 mb-5 border-b border-divider">
            <span className="inline-block font-sans text-[10px] font-bold tracking-[0.3em] text-brand-teal uppercase">Đăng ký tư vấn</span>
            <h3 className="font-serif text-2xl font-semibold text-ink mt-2">Lennie SkinLab Clinic</h3>
            <p className="font-sans text-xs text-ink-3 mt-1">Để lại thông tin — Lennie tư vấn tiếp qua Messenger</p>
          </div>
          <ConsultForm defaultService={defaultService} onClose={onClose} />
        </div>
      </div>
    </div>);

}

/* ---------------- PAGE SHELL (wires nav + modals + cart) ---------------- */
function PageShell({ active, children }) {
  const [quizOpen, setQuizOpen] = useStateC(false);
  const [bookingOpen, setBookingOpen] = useStateC(false);
  const [presetService, setPresetService] = useStateC(null);
  const [cart, setCart] = useStateC(0);
  const [toast, setToast] = useStateC({ show: false, product: null });

  const addToCart = (p) => {
    CartStore.add(p);
    setToast({ show: true, product: p });
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  };
  const openBooking = (svc) => {setPresetService(svc || null);setBookingOpen(true);};
  const openQuiz = () => setQuizOpen(true);

  const api = { openBooking, openQuiz, addToCart, cart };

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active={active} cartCount={cart} onOpenBooking={() => openBooking()} onOpenQuiz={openQuiz} />
      {typeof children === 'function' ? children(api) : children}
      <Footer />
      <FloatingActions onOpenBooking={() => openBooking()} />
      <CartToast show={toast.show} product={toast.product} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} presetService={presetService} />
    </div>);

}

/* ---------------- REUSABLE SECTION BLOCKS ---------------- */
function SectionHead({ eyebrow, title, accent, intro, center, light }) {
  return (
    <div className={`space-y-4 ${center ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}>
      {eyebrow &&
      <span className={`inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] uppercase px-3 py-1 rounded-sm ${light ? 'text-brand-teal bg-white/10' : 'text-brand-blue bg-brand-blue-light'}`}>{eyebrow}</span>
      }
      <h2 className={`font-serif text-3xl md:text-[42px] font-light leading-snug tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        {title} {accent && <span className="font-semibold italic text-brand-blue">{accent}</span>}
      </h2>
      {intro && <p className={`font-sans text-sm leading-relaxed ${light ? 'text-white/70' : 'text-ink-2'} ${center ? 'mx-auto' : ''}`}>{intro}</p>}
    </div>);

}

function StatStripItem({ target, suffix, title, desc, icon }) {
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
function StatStrip() {
  const stats = [
  { target: 6, suffix: '+', title: 'Năm Lâm Sàng Chuyên Sâu', desc: 'Hơn 6 năm chuyên hành nghề dược mỹ phẩm điều trị thực tế', icon: 'Heart' },
  { target: 98, suffix: '%', title: 'Tỷ Lệ Phục Hồi Thành Công', desc: 'Khách hàng chuyển biến rõ rệt sau liệu trình tuyển chọn', icon: 'CheckCircle' },
  { target: 1200, suffix: '+', title: 'Khách Hàng Đồng Hành', desc: 'Tin cậy tuyệt đối và liên tục giới thiệu người thân', icon: 'HeartHandshake' },
  { target: 50, suffix: '+', title: 'Thương Hiệu Toàn Cầu', desc: 'Ủy quyền trực tiếp 50+ nhãn dược mỹ phẩm quốc tế', icon: 'Shield' }];

  return (
    <section className="bg-white border-y border-divider py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-divider">
          {stats.map((s, i) => <StatStripItem key={i} {...s} />)}
        </div>
      </div>
    </section>);

}

function PartnerStrip({ label }) {
  const sets = [0, 1, 2, 3];
  return (
    <div className="w-full bg-mist border-y border-divider py-8 overflow-hidden relative select-none">
      {label && <p className="text-center font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-ink-3 mb-6">{label}</p>}
      <div className="absolute left-0 bottom-0 top-auto w-16 bg-gradient-to-r from-mist to-transparent z-10 pointer-events-none" style={{ top: label ? 'auto' : 0, height: label ? '64px' : '100%' }} />
      <div className="absolute right-0 w-16 bg-gradient-to-l from-mist to-transparent z-10 pointer-events-none" style={{ top: label ? 'auto' : 0, bottom: 0, height: label ? '64px' : '100%' }} />
      <div className="flex overflow-hidden w-full">
        <div className="marquee flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {sets.map((s) => partnerBrands.map((b, i) =>
          <span key={`${s}-${i}`} className="font-serif text-[13px] md:text-sm lg:text-[15px] font-semibold tracking-[0.22em] text-[#6F8CA8] hover:text-brand-blue transition-colors uppercase whitespace-nowrap">{b}</span>
          ))}
        </div>
      </div>
    </div>);

}

function CTABand({ onOpenBooking, title, accent, text, primary, secondaryHref, secondary }) {
  return (
    <section className="relative overflow-hidden bg-[#152639]">
      <div className="absolute inset-0">
        <img src="assets/remix/wellness-spa.png" alt="" className="w-full h-full object-cover opacity-25 select-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d2e]/90 via-[#0f1d2e]/70 to-[#0f1d2e]/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center gap-6">
        <span className="font-sans text-[10px] font-extrabold tracking-[0.3em] text-brand-teal uppercase">Bắt đầu hành trình cùng Lennie</span>
        <h2 className="font-serif text-3xl md:text-[46px] font-light text-white leading-tight tracking-tight">
          {title || 'Làn da khỏe đẹp'} {accent ? <span className="font-semibold italic text-brand-teal">{accent}</span> : <span className="font-semibold italic text-brand-teal">bắt đầu từ một phác đồ đúng.</span>}
        </h2>
        <p className="font-sans text-sm text-white/70 leading-relaxed max-w-lg">{text || 'Đặt lịch đọc vị làn da cùng ThS. DS. Hoàng Hồng Thắm, hoặc làm bài phân tích da miễn phí để nhận gợi ý phác đồ ban đầu.'}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button type="button" onClick={onOpenBooking} className="px-9 py-4 bg-brand-blue hover:bg-white hover:text-ink text-white font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all shadow-md">{primary || 'Đặt lịch trị liệu'}</button>
          <a href={secondaryHref || 'services.html'} className="px-8 py-3.5 border border-white/35 hover:border-white text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm transition-all">{secondary || 'Xem dịch vụ'}</a>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Navbar, PageHero, FloatingActions, CartToast, Footer, QuizModal, BookingModal, PageShell, SectionHead, StatStrip, PartnerStrip, CTABand, ConsultForm, ConsultSection, QuickFaqSection, FaqAccordion, CONSULT_SERVICES, CartStore, useCart, CartDrawer, openCartDrawer, vnd });