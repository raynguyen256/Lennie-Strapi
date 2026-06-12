/* ============================================================
   Dịch vụ (Services) — danh sách 4 dịch vụ
   ============================================================ */
function ServiceRow({ s, i }) {
  const [ref, shown] = useReveal();
  const reverse = i % 2 === 1;
  const I = Icon[s.icon];
  const flagship = s.id === 'flagship';
  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={`${reverse ? 'lg:order-2' : ''} reveal-x-l ${shown ? 'is-in' : ''}`}>
        <div className="relative rounded-md overflow-hidden border border-divider shadow-sm aspect-[5/4] bg-brand-blue-light">
          <img src={s.img} alt={s.name} className="w-full h-full object-cover hover:scale-[1.03] transition duration-700 select-none" />
          {flagship && (
            <span className="absolute top-4 left-4 bg-brand-blue text-white font-sans text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm shadow">★ Flagship</span>
          )}
          <span className="absolute bottom-4 left-4 bg-white/85 backdrop-blur-md text-ink font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm border border-white/50 flex items-center gap-1.5">
            <Icon.Clock size={12} className="text-brand-blue" />{s.duration}
          </span>
        </div>
      </div>
      <div className={`${reverse ? 'lg:order-1' : ''} space-y-5 reveal-x-r ${shown ? 'is-in' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue shrink-0"><I size={20} /></span>
          <span className="font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue uppercase">{s.group}</span>
        </div>
        <h3 className="font-serif text-[26px] md:text-[32px] text-ink font-light leading-tight tracking-tight">{s.name}</h3>
        <p className="font-sans text-sm text-ink-2 leading-relaxed">{s.summary}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
          {s.includes.map((it, k) => (
            <li key={k} className="flex items-start gap-2.5 font-sans text-[13px] text-ink-2"><span className="text-brand-blue mt-0.5 shrink-0"><Icon.Check size={15} /></span>{it}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-4 pt-5 border-t border-divider">
          <div>
            <span className="block font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase mb-1">Chi phí tham khảo</span>
            <span className="font-serif text-2xl font-bold text-ink">{s.price}</span>
            {s.priceNote && <span className="font-sans text-[11px] text-ink-3 ml-1">{s.priceNote}</span>}
          </div>
          <div className="flex gap-3">
            <a href={`service-detail.html?id=${s.id}`} className="px-5 py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all">Xem chi tiết</a>
            <button type="button" onClick={() => window.__openBooking && window.__openBooking(s.id)} className="px-5 py-3 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-ink transition-all shadow-sm">Đặt lịch</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesIntro() {
  return (
    <section className="bg-white py-16 md:py-20 border-b border-divider">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-5">
        <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">Mô hình dịch vụ</span>
        <h2 className="font-serif text-2xl md:text-[34px] text-ink font-light leading-snug tracking-tight">
          Không có gói combo cố định —<br /><span className="font-semibold italic text-brand-blue">chỉ có phác đồ phù hợp với bạn.</span>
        </h2>
        <p className="font-sans text-sm text-ink-2 leading-relaxed">
          Sau khi đọc vị làn da, Lennie thiết kế liệu trình riêng và tinh chỉnh liên tục trong suốt quá trình điều trị. Bạn có thể được tư vấn từ xa qua Messenger / Zalo, hoặc điều trị trực tiếp tại cơ sở.
        </p>
      </div>
    </section>
  );
}

function ServicesApproach() {
  const steps = [
    { n: '01', t: 'Đọc vị làn da', d: 'Phân tích nền da, hàng rào bảo vệ và khả năng thích nghi hoạt chất trong 60 phút.', icon: 'Microscope' },
    { n: '02', t: 'Thiết kế phác đồ', d: 'Xây liệu trình AM/PM cá nhân hóa, chọn đúng hoạt chất và nồng độ cho cơ địa.', icon: 'Clipboard' },
    { n: '03', t: 'Đồng hành & tinh chỉnh', d: 'Theo dõi tiến triển hàng tuần, điều chỉnh khi da bước sang giai đoạn mới.', icon: 'HeartHandshake' },
  ];
  const [ref, shown] = useReveal();
  return (
    <section className="bg-brand-blue-light py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <SectionHead center eyebrow="Quy trình đồng hành" title="Ba bước" accent="từ đọc vị đến phục hồi" />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const I = Icon[s.icon];
            return (
              <div key={i} className={`reveal-card bg-white border border-divider rounded-md p-8 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-500 ${shown ? 'is-in' : ''}`} style={{ transitionDelay: shown ? `${i * 110}ms` : '0ms' }}>
                <span className="absolute -top-3 -right-1 font-serif text-[80px] font-bold text-brand-blue-light leading-none select-none">{s.n}</span>
                <div className="relative space-y-3">
                  <span className="w-12 h-12 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><I size={22} /></span>
                  <h3 className="font-serif text-xl font-bold text-ink">{s.t}</h3>
                  <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed">{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqList({ items }) {
  const { useState } = React;
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto divide-y divide-divider border-y border-divider">
      {items.map((f, i) => (
        <div key={i}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
            <span className="font-serif text-[17px] md:text-lg font-medium text-ink group-hover:text-brand-blue transition-colors">{f.q}</span>
            <span className={`shrink-0 w-8 h-8 rounded-full border border-divider flex items-center justify-center text-brand-blue transition-transform ${open === i ? 'rotate-45 bg-brand-blue-light' : ''}`}><Icon.Plus size={16} /></span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-60 pb-6' : 'max-h-0'}`}>
            <p className="font-sans text-sm text-ink-2 leading-relaxed pr-12">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- SERVICES CATALOG (sidebar nav + pagination) ---------------- */
const SVC_PER_PAGE = 5;

function ServicesCatalog() {
  const { useState, useRef } = React;
  const pages = Math.ceil(servicesCatalog.length / SVC_PER_PAGE);
  const [page, setPage] = useState(1);
  const [focusId, setFocusId] = useState(null);
  const rowRefs = useRef({});
  const topRef = useRef(null);

  const cur = Math.min(page, pages);
  const shown = servicesCatalog.slice((cur - 1) * SVC_PER_PAGE, cur * SVC_PER_PAGE);
  const activeCat = shown[0] ? shown[0].cat : serviceCategories[0].id;

  const indexOfId = (id) => servicesCatalog.findIndex((s) => s.id === id);
  const pageOfIndex = (idx) => Math.floor(idx / SVC_PER_PAGE) + 1;
  const firstIndexOfCat = (catId) => servicesCatalog.findIndex((s) => s.cat === catId);

  const scrollToEl = (el) => {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const goToPage = (p) => {
    setPage(p);
    setFocusId(null);
    setTimeout(() => scrollToEl(topRef.current), 60);
  };

  const goToCategory = (catId) => {
    const idx = firstIndexOfCat(catId);
    if (idx < 0) return;
    goToPage(pageOfIndex(idx));
  };

  const goToService = (id) => {
    const idx = indexOfId(id);
    if (idx < 0) return;
    const p = pageOfIndex(idx);
    setPage(p);
    setFocusId(id);
    setTimeout(() => scrollToEl(rowRefs.current[id]), 80);
    setTimeout(() => setFocusId(null), 2200);
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6" ref={topRef}>
        {/* Horizontal category chip bar */}
        <div className="flex flex-wrap items-center gap-2.5 justify-center">
          {serviceCategories.map((c) => {
            const I = Icon[c.icon];
            const on = activeCat === c.id;
            return (
              <button key={c.id} type="button" onClick={() => goToCategory(c.id)}
                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${on ? 'bg-brand-blue border-brand-blue text-white shadow-sm' : 'bg-white border-divider text-ink-2 hover:border-brand-blue hover:text-brand-blue'}`}>
                <span className={`flex items-center justify-center ${on ? 'text-white' : 'text-brand-blue'}`}><I size={15} /></span>
                <span className="font-sans text-[12px] font-bold uppercase tracking-wide leading-none">{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Helper note below the chip bar */}
        <p className="text-center font-sans text-[13px] text-ink-2 leading-relaxed mt-5">
          Chưa chắc dịch vụ nào hợp da? Làm <button type="button" onClick={() => window.__openQuiz && window.__openQuiz()} className="text-brand-blue font-bold underline underline-offset-2 hover:text-ink transition-colors">phân tích da miễn phí</button> để nhận gợi ý.
        </p>

        {/* Active category heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pb-5 border-b border-divider mt-10 mb-12">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] text-brand-blue uppercase">{serviceCategories.find((c) => c.id === activeCat)?.name}</span>
            <p className="font-sans text-[13px] text-ink-2 mt-1">Tất cả <strong className="text-ink">{servicesCatalog.length}</strong> dịch vụ · Trang {cur}/{pages}</p>
          </div>
          <span className="font-sans text-[11px] text-ink-3 italic hidden sm:block">Chọn danh mục để chuyển trang dịch vụ</span>
        </div>

        {/* Service rows */}
        <div className="space-y-16 md:space-y-20">
          {shown.map((s, i) => (
            <div key={s.id} ref={(el) => { rowRefs.current[s.id] = el; }} className="scroll-mt-28">
              <ServiceRow s={s} i={(cur - 1) * SVC_PER_PAGE + i} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-16">
          <button type="button" onClick={() => goToPage(Math.max(1, cur - 1))} disabled={cur === 1} className={`w-10 h-10 rounded-sm border flex items-center justify-center ${cur === 1 ? 'border-divider text-ink-3/40 cursor-not-allowed' : 'border-divider text-ink hover:border-brand-blue hover:text-brand-blue'}`}><Icon.ChevronL size={16} /></button>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} type="button" onClick={() => goToPage(i + 1)} className={`w-10 h-10 rounded-sm border font-sans text-sm font-bold transition-all ${cur === i + 1 ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider text-ink hover:border-brand-blue'}`}>{i + 1}</button>
          ))}
          <button type="button" onClick={() => goToPage(Math.min(pages, cur + 1))} disabled={cur === pages} className={`w-10 h-10 rounded-sm border flex items-center justify-center ${cur === pages ? 'border-divider text-ink-3/40 cursor-not-allowed' : 'border-divider text-ink hover:border-brand-blue hover:text-brand-blue'}`}><Icon.ChevronR size={16} /></button>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <PageShell active="services">
      {(api) => {
        window.__openBooking = api.openBooking;
        window.__openQuiz = api.openQuiz;
        return (
          <>
            <PageHero
              eyebrow="Dịch vụ điều trị"
              title="Liệu trình thiết kế"
              accent="riêng cho làn da bạn."
              intro="Hơn 30 dịch vụ trải khắp 6 nhóm — từ tư vấn phác đồ, điều trị mụn, nám đến trẻ hóa, phục hồi và chăm sóc thư giãn. Mỗi dịch vụ đều bám sát cơ địa và được theo dõi trực tiếp bởi chuyên gia."
              crumb={[['Dịch vụ']]}
              img="assets/remix/model-glow.png"
            />
            <ServicesIntro />
            <ServicesCatalog />
            <ServicesApproach />
            <section className="bg-white py-20 border-b border-divider">
              <div className="max-w-7xl mx-auto px-6 space-y-12">
                <SectionHead center eyebrow="Câu hỏi thường gặp" title="Những điều bạn" accent="có thể đang băn khoăn" />
                <FaqList items={faqs} />
              </div>
            </section>
            <CTABand onOpenBooking={() => api.openBooking()} secondaryHref="shop.html" secondary="Xem sản phẩm" />
          </>
        );
      }}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<ServicesPage />);
