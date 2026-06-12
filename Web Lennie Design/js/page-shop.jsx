/* ============================================================
   Sản phẩm (Shop) — catalog + filters + sort + pagination
   ============================================================ */
const fmtVND = (n) => n.toLocaleString('vi-VN') + '₫';
const PRICE_BANDS = [
  { id: 'all', label: 'Tất cả mức giá', test: () => true },
  { id: 'u1', label: 'Dưới 1.000.000₫', test: (p) => p.price < 1000000 },
  { id: '1-2', label: '1 – 2 triệu', test: (p) => p.price >= 1000000 && p.price < 2000000 },
  { id: '2-3', label: '2 – 3 triệu', test: (p) => p.price >= 2000000 && p.price < 3000000 },
  { id: 'o3', label: 'Trên 3 triệu', test: (p) => p.price >= 3000000 },
];
const SORTS = [
  { id: 'featured', label: 'Nổi bật' },
  { id: 'price-asc', label: 'Giá: Thấp → Cao' },
  { id: 'price-desc', label: 'Giá: Cao → Thấp' },
  { id: 'rating', label: 'Đánh giá cao' },
];
const PER_PAGE = 6;

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="space-y-3 py-5 border-b border-divider">
      <h4 className="font-sans text-[11px] font-bold tracking-widest text-ink uppercase">{title}</h4>
      <div className="space-y-2.5">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button key={o} type="button" onClick={() => onToggle(o)} className="flex items-center gap-3 w-full text-left group">
              <span className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded border flex items-center justify-center shrink-0 transition-all ${on ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider bg-white group-hover:border-brand-blue'}`}>
                {on && <Icon.Check size={12} />}
              </span>
              <span className={`font-sans text-[13px] ${on ? 'text-ink font-semibold' : 'text-ink-2'}`}>{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd, onQuickView }) {
  const { useState } = React;
  const [added, setAdded] = useState(false);
  const add = () => { onAdd(p); setAdded(true); setTimeout(() => setAdded(false), 1400); };
  return (
    <div className="bg-white border border-divider rounded-sm p-4 flex flex-col group transition-all duration-300 hover:shadow-[0_18px_50px_rgba(44,74,111,.12)] hover:border-brand-blue/40">
      <div className="relative h-56 bg-brand-blue-light rounded-sm overflow-hidden mb-4">
        <a href={`product-detail.html?id=${p.id}`} className="absolute inset-0 flex items-center justify-center p-6">
          {p.badge && <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white border ${p.badge === 'Mới' ? 'text-brand-teal border-brand-teal/60' : 'text-brand-blue border-divider'}`}>{p.badge}</span>}
          <img src={p.img} alt={p.name} className="h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500" />
        </a>
        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <button type="button" onClick={() => onQuickView(p)}
            className="pointer-events-auto inline-flex items-center gap-2 bg-ink/90 backdrop-blur-sm text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 rounded-full hover:bg-brand-blue transition-colors shadow-lg">
            <Icon.Search size={14} />Xem nhanh
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-1.5">{p.brand}</div>
        <a href={`product-detail.html?id=${p.id}`} className="font-serif text-[15px] font-medium text-ink leading-snug min-h-[40px] hover:text-brand-blue transition-colors">{p.name}</a>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="flex gap-0.5 text-brand-blue">{Array.from({ length: p.rating }).map((_, i) => <Icon.Star key={i} size={11} fill="#5789B7" stroke="#5789B7" />)}</span>
          <span className="font-sans text-[10px] text-ink-3">({p.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-divider">
          <span className="font-serif text-[17px] font-bold text-ink">{fmtVND(p.price)}</span>
          {p.oldPrice && <span className="font-sans text-[12px] text-ink-3 line-through">{fmtVND(p.oldPrice)}</span>}
        </div>
        <button type="button" onClick={add} className={`mt-3 w-full py-3 rounded-sm font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${added ? 'bg-brand-teal text-white' : 'bg-ink text-white hover:bg-brand-blue'}`}>
          {added ? <><Icon.Check size={14} /> Đã thêm</> : <><Icon.Plus size={14} /> Thêm vào giỏ</>}
        </button>
      </div>
    </div>
  );
}

/* ---------------- QUICK VIEW MODAL ---------------- */
function ProductQuickView({ product, onClose, onAdd }) {
  const { useState } = React;
  const [added, setAdded] = useState(false);
  if (!product) return null;
  const p = product;
  const add = () => { onAdd(p); setAdded(true); setTimeout(() => setAdded(false), 1400); };
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10"><Icon.X size={20} /></button>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative bg-brand-blue-light aspect-square sm:aspect-auto flex items-center justify-center p-10">
            {p.badge && <span className={`absolute top-5 left-5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm bg-white border ${p.badge === 'Mới' ? 'text-brand-teal border-brand-teal/60' : 'text-brand-blue border-divider'}`}>{p.badge}</span>}
            <img src={p.img} alt={p.name} className="h-full max-h-[300px] w-auto object-contain" />
          </div>
          <div className="p-7 md:p-8 space-y-4 flex flex-col">
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-brand-teal">{p.brand}</span>
            <h3 className="font-serif text-[26px] text-ink font-light leading-tight tracking-tight">{p.name}</h3>
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-brand-blue">{Array.from({ length: p.rating }).map((_, i) => <Icon.Star key={i} size={13} fill="#5789B7" stroke="#5789B7" />)}</span>
              <span className="font-sans text-[11px] text-ink-3">{p.reviews} đánh giá</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-serif text-3xl font-bold text-ink">{fmtVND(p.price)}</span>
              {p.oldPrice && <span className="font-sans text-sm text-ink-3 line-through mb-1">{fmtVND(p.oldPrice)}</span>}
            </div>
            <p className="font-sans text-sm text-ink-2 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase w-full">Phù hợp loại da</span>
              {p.skin.map((sk) => <span key={sk} className="font-sans text-[11px] font-semibold text-brand-blue bg-brand-blue-light border border-divider px-3 py-1 rounded-full">{sk}</span>)}
            </div>
            <div className="flex items-center gap-2 font-sans text-[12px] text-ink-2 pt-1"><Icon.Clipboard size={14} className="text-brand-blue" />Loại: <strong className="text-ink">{p.type}</strong></div>
            <div className="mt-auto pt-4 space-y-2.5">
              <button type="button" onClick={add} className={`w-full py-3.5 rounded-sm font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${added ? 'bg-brand-teal text-white' : 'bg-ink text-white hover:bg-brand-blue'}`}>
                {added ? <><Icon.Check size={14} /> Đã thêm vào giỏ</> : <><Icon.Plus size={14} /> Thêm vào giỏ</>}
              </button>
              <a href={`product-detail.html?id=${p.id}`} className="w-full py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all flex items-center justify-center gap-2">Xem chi tiết đầy đủ <Icon.ArrowR size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopApp({ onAdd }) {
  const { useState, useMemo } = React;
  const [types, setTypes] = useState([]);
  const [skins, setSkins] = useState([]);
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [quick, setQuick] = useState(null);

  const toggle = (setter, arr) => (v) => { setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]); setPage(1); };

  const filtered = useMemo(() => {
    let r = productCatalog.filter((p) =>
      (types.length === 0 || types.includes(p.type)) &&
      (skins.length === 0 || p.skin.some((s) => skins.includes(s))) &&
      PRICE_BANDS.find((b) => b.id === band).test(p)
    );
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') r = [...r].sort((a, b) => b.reviews - a.reviews);
    return r;
  }, [types, skins, band, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);
  const clear = () => { setTypes([]); setSkins([]); setBand('all'); setPage(1); };
  const activeCount = types.length + skins.length + (band !== 'all' ? 1 : 0);

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 space-y-1">
            <div className="flex items-center justify-between pb-4 border-b border-divider">
              <h3 className="font-serif text-xl font-semibold text-ink flex items-center gap-2"><Icon.Search size={16} className="text-brand-blue" />Bộ lọc</h3>
              {activeCount > 0 && <button type="button" onClick={clear} className="font-sans text-[10px] font-bold tracking-wider text-brand-blue uppercase hover:text-ink">Xóa ({activeCount})</button>}
            </div>
            <FilterGroup title="Loại sản phẩm" options={productTypes} selected={types} onToggle={toggle(setTypes, types)} />
            <FilterGroup title="Loại da" options={skinTypes} selected={skins} onToggle={toggle(setSkins, skins)} />
            <div className="space-y-3 py-5">
              <h4 className="font-sans text-[11px] font-bold tracking-widest text-ink uppercase">Mức giá</h4>
              <div className="space-y-2.5">
                {PRICE_BANDS.map((b) => (
                  <button key={b.id} type="button" onClick={() => { setBand(b.id); setPage(1); }} className="flex items-center gap-3 w-full text-left group">
                    <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-all ${band === b.id ? 'border-brand-blue' : 'border-divider group-hover:border-brand-blue'}`}>
                      {band === b.id && <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />}
                    </span>
                    <span className={`font-sans text-[13px] ${band === b.id ? 'text-ink font-semibold' : 'text-ink-2'}`}>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-brand-blue-light border border-divider rounded-md p-5 mt-2">
              <p className="font-sans text-[13px] text-ink-2 leading-relaxed">Chưa chắc sản phẩm nào hợp da? Làm <button type="button" onClick={() => window.__openQuiz && window.__openQuiz()} className="text-brand-blue font-bold underline">phân tích da miễn phí</button> để nhận gợi ý.</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-9">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-divider mb-8">
            <span className="font-sans text-[13px] text-ink-2">Hiển thị <strong className="text-ink">{filtered.length}</strong> sản phẩm</span>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] font-bold tracking-wider text-ink-3 uppercase">Sắp xếp</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2.5 bg-white border border-divider rounded-sm font-sans text-[13px] text-ink focus:outline-none focus:border-brand-blue">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-ink mb-2">Không tìm thấy sản phẩm</p>
              <p className="font-sans text-sm text-ink-2 mb-6">Thử bỏ bớt bộ lọc để xem thêm lựa chọn.</p>
              <button type="button" onClick={clear} className="px-6 py-3 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm">Xóa bộ lọc</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {shown.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} onQuickView={setQuick} />)}
            </div>
          )}

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button type="button" onClick={() => setPage(Math.max(1, cur - 1))} disabled={cur === 1} className={`w-10 h-10 rounded-sm border flex items-center justify-center ${cur === 1 ? 'border-divider text-ink-3/40 cursor-not-allowed' : 'border-divider text-ink hover:border-brand-blue hover:text-brand-blue'}`}><Icon.ChevronL size={16} /></button>
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} type="button" onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-sm border font-sans text-sm font-bold transition-all ${cur === i + 1 ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider text-ink hover:border-brand-blue'}`}>{i + 1}</button>
              ))}
              <button type="button" onClick={() => setPage(Math.min(pages, cur + 1))} disabled={cur === pages} className={`w-10 h-10 rounded-sm border flex items-center justify-center ${cur === pages ? 'border-divider text-ink-3/40 cursor-not-allowed' : 'border-divider text-ink hover:border-brand-blue hover:text-brand-blue'}`}><Icon.ChevronR size={16} /></button>
            </div>
          )}
        </div>
      </div>
      <ProductQuickView product={quick} onClose={() => setQuick(null)} onAdd={onAdd} />
    </section>
  );
}

function ShopPage() {
  return (
    <PageShell active="shop">
      {(api) => {
        window.__openQuiz = api.openQuiz;
        return (
          <>
            <PageHero
              eyebrow="Sản phẩm"
              title="Dược mỹ phẩm"
              accent="chọn lọc độc quyền."
              intro="Sản phẩm nhập khẩu chính hãng từ các thương hiệu đối tác, được ThS. DS. Hoàng Hồng Thắm tuyển chọn khắt khe. Lọc theo loại sản phẩm, loại da và mức giá phù hợp."
              crumb={[['Sản phẩm']]}
              img="assets/remix/herb-mix.png"
            />
            <ShopApp onAdd={api.addToCart} />
            <PartnerStrip label="Thương hiệu đối tác chính hãng" />
            <ConsultSection
              id="tu-van-san-pham"
              eyebrow="Tư vấn sản phẩm"
              title="Chưa chắc sản phẩm nào"
              accent="hợp với làn da bạn?"
              intro="Để lại thông tin và tình trạng da — Lennie sẽ tư vấn chọn đúng sản phẩm lẻ phù hợp, tiếp tục trao đổi trực tiếp qua Messenger."
              image="assets/remix/herb-mix.png"
              lockedServiceLabel="Tư vấn sản phẩm lẻ"
              buttonLabel="Tư vấn sản phẩm"
            />
          </>
        );
      }}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<ShopPage />);
