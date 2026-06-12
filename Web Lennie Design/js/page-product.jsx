/* ============================================================
   Chi tiết sản phẩm (Product single) — reads ?id=
   ============================================================ */
const fmtVNDp = (n) => n.toLocaleString('vi-VN') + '₫';

function getProduct() {
  const id = (window.__SPA && window.__routeId) || new URLSearchParams(location.search).get('id');
  return productCatalog.find((p) => p.id === id) || productCatalog[0];
}

function ProductPage() {
  const { useState } = React;
  const p = getProduct();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');
  const related = productCatalog.filter((x) => x.id !== p.id && x.type === p.type).slice(0, 4);
  const fallback = productCatalog.filter((x) => x.id !== p.id).slice(0, 4);
  const recos = (related.length ? related : fallback).slice(0, 4);

  const tabs = {
    desc: { label: 'Mô tả', body: (
      <div className="space-y-4 font-sans text-sm text-ink-2 leading-relaxed">
        <p>{p.desc}</p>
        <p>Sản phẩm được Lennie SkinLab nhập khẩu chính hãng và tuyển chọn dựa trên hồ sơ hoạt chất, độ an toàn và khả năng phù hợp với nhiều cơ địa da. Để đạt hiệu quả tối ưu, nên dùng trong một phác đồ được cá nhân hóa theo tình trạng da của bạn.</p>
      </div>
    ) },
    how: { label: 'Cách dùng', body: (
      <ul className="space-y-3 font-sans text-sm text-ink-2">
        {['Làm sạch và cân bằng da trước khi dùng.', 'Lấy lượng vừa đủ, thoa đều và massage nhẹ đến khi thẩm thấu.', 'Dùng theo tần suất được chuyên gia Lennie tư vấn cho riêng bạn.', 'Luôn kết hợp kem chống nắng vào buổi sáng.'].map((t, i) => (
          <li key={i} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-brand-blue-light text-brand-blue font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>{t}</li>
        ))}
      </ul>
    ) },
    spec: { label: 'Thông tin', body: (
      <div className="divide-y divide-divider font-sans text-sm">
        {[['Thương hiệu', p.brand], ['Loại sản phẩm', p.type], ['Phù hợp loại da', p.skin.join(' · ')], ['Xuất xứ', 'Nhập khẩu chính hãng'], ['Tư vấn', 'ThS. DS. Hoàng Hồng Thắm']].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-3"><span className="text-ink-3">{k}</span><span className="text-ink font-semibold text-right">{v}</span></div>
        ))}
      </div>
    ) },
  };

  return (
    <PageShell active="shop">
      {(api) => (
        <>
          <section className="bg-white pt-32 md:pt-40 pb-10 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6">
              <nav className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-ink-3 mb-8">
                <a href="index.html" className="hover:text-brand-blue">Trang chủ</a><Icon.ChevronR size={11} />
                <a href="shop.html" className="hover:text-brand-blue">Sản phẩm</a><Icon.ChevronR size={11} />
                <span className="text-brand-blue">{p.type}</span>
              </nav>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Gallery */}
                <div className="space-y-4">
                  <div className="relative bg-brand-blue-light border border-divider rounded-md aspect-square flex items-center justify-center p-12 overflow-hidden">
                    {p.badge && <span className={`absolute top-5 left-5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm bg-white border ${p.badge === 'Mới' ? 'text-brand-teal border-brand-teal/60' : 'text-brand-blue border-divider'}`}>{p.badge}</span>}
                    <img src={p.img} alt={p.name} className="h-full w-auto object-contain" />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[p.img, p.img, p.img, p.img].map((src, i) => (
                      <div key={i} className={`bg-brand-blue-light border rounded-sm aspect-square flex items-center justify-center p-3 cursor-pointer ${i === 0 ? 'border-brand-blue' : 'border-divider hover:border-brand-blue/50'}`}>
                        <img src={src} alt="" className="h-full w-auto object-contain opacity-90" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Info */}
                <div className="space-y-5">
                  <span className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-brand-teal">{p.brand}</span>
                  <h1 className="font-serif text-[32px] md:text-[42px] text-ink font-light leading-tight tracking-tight">{p.name}</h1>
                  <div className="flex items-center gap-3">
                    <span className="flex gap-0.5 text-brand-blue">{Array.from({ length: p.rating }).map((_, i) => <Icon.Star key={i} size={15} fill="#5789B7" stroke="#5789B7" />)}</span>
                    <span className="font-sans text-[12px] text-ink-3">{p.reviews} đánh giá</span>
                  </div>
                  <div className="flex items-end gap-3 pt-2">
                    <span className="font-serif text-4xl font-bold text-ink">{fmtVNDp(p.price)}</span>
                    {p.oldPrice && <span className="font-sans text-lg text-ink-3 line-through mb-1">{fmtVNDp(p.oldPrice)}</span>}
                  </div>
                  <p className="font-sans text-sm text-ink-2 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {p.skin.map((sk) => <span key={sk} className="font-sans text-[11px] font-semibold text-brand-blue bg-brand-blue-light border border-divider px-3 py-1.5 rounded-full">{sk}</span>)}
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-divider">
                    <div className="flex items-center border border-divider rounded-sm">
                      <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-brand-blue">−</button>
                      <span className="w-12 text-center font-sans font-bold text-ink">{qty}</span>
                      <button type="button" onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-brand-blue">+</button>
                    </div>
                    <button type="button" onClick={() => { for (let k = 0; k < qty; k++) api.addToCart(p); }} className="flex-1 py-4 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue transition-all flex items-center justify-center gap-2"><Icon.Bag size={15} />Thêm vào giỏ</button>
                  </div>
                  <button type="button" onClick={() => api.openBooking()} className="w-full py-4 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all flex items-center justify-center gap-2"><Icon.Message size={16} />Tư vấn dùng sản phẩm này</button>
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[['Shield', 'Chính hãng'], ['HeartHandshake', 'Tư vấn chuyên môn'], ['Activity', 'Hợp phác đồ']].map(([ic, t]) => {
                      const II = Icon[ic];
                      return <div key={t} className="flex flex-col items-center text-center gap-2 bg-brand-blue-light/60 rounded-md py-4 px-2"><span className="text-brand-blue"><II size={20} /></span><span className="font-sans text-[10px] font-bold text-ink-2 uppercase tracking-wide">{t}</span></div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <section className="bg-white py-14 border-b border-divider">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex gap-2 border-b border-divider mb-7">
                {Object.entries(tabs).map(([k, v]) => (
                  <button key={k} type="button" onClick={() => setTab(k)} className={`px-5 py-3 font-sans text-[11px] font-bold tracking-[0.16em] uppercase -mb-px border-b-2 transition-all ${tab === k ? 'border-brand-blue text-brand-blue' : 'border-transparent text-ink-3 hover:text-ink'}`}>{v.label}</button>
                ))}
              </div>
              <div>{tabs[tab].body}</div>
            </div>
          </section>

          {/* Related */}
          <section className="bg-brand-blue-light py-20 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <SectionHead eyebrow="Gợi ý cho bạn" title="Sản phẩm" accent="liên quan" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {recos.map((r) => (
                  <a key={r.id} href={`product-detail.html?id=${r.id}`} className="group bg-white border border-divider rounded-sm p-4 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="h-44 bg-brand-blue-light rounded-sm flex items-center justify-center p-5 mb-3 overflow-hidden"><img src={r.img} alt={r.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" /></div>
                    <span className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase text-brand-teal">{r.brand}</span>
                    <h4 className="font-serif text-[14px] font-medium text-ink leading-snug mt-1 min-h-[38px] group-hover:text-brand-blue transition-colors">{r.name}</h4>
                    <span className="font-serif text-[15px] font-bold text-ink mt-2">{fmtVNDp(r.price)}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
          <CTABand onOpenBooking={() => api.openBooking()} secondaryHref="shop.html" secondary="Tiếp tục mua" />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<ProductPage />);
