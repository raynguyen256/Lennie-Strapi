/* ============================================================
   Chi tiết dịch vụ (Service single)
   Reads ?id= to pick which service to show.
   ============================================================ */
function getService() {
  const id = (window.__SPA && window.__routeId) || new URLSearchParams(location.search).get('id');
  return servicesCatalog.find((s) => s.id === id) || servicesCatalog[0];
}

function ServiceDetailPage() {
  const s = getService();
  const I = Icon[s.icon];
  const sameCat = servicesCatalog.filter((x) => x.id !== s.id && x.cat === s.cat);
  const fallback = servicesCatalog.filter((x) => x.id !== s.id);
  const others = (sameCat.length >= 3 ? sameCat : fallback).slice(0, 3);
  return (
    <PageShell active="services">
      {(api) => (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden bg-[#152639] border-b border-divider">
            <div className="absolute inset-0">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover opacity-45 select-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d2e]/92 via-[#0f1d2e]/72 to-[#0f1d2e]/55"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-16 md:pb-20">
              <nav className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-white/55 mb-6">
                <a href="index.html" className="hover:text-white transition-colors">Trang chủ</a>
                <Icon.ChevronR size={11} />
                <a href="services.html" className="hover:text-white transition-colors">Dịch vụ</a>
                <Icon.ChevronR size={11} />
                <span className="text-brand-teal">Chi tiết</span>
              </nav>
              <span className="inline-flex items-center gap-2 font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-teal bg-white/10 px-3 py-1.5 rounded-sm uppercase"><I size={14} />{s.group}</span>
              <h1 className="font-serif text-[36px] md:text-[54px] font-light text-white leading-[1.08] tracking-tight mt-5 max-w-3xl">{s.name}</h1>
              <p className="font-sans text-sm md:text-[15px] text-white/75 leading-relaxed font-medium mt-5 max-w-xl">{s.tagline}</p>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/85 font-sans text-[13px] font-semibold"><Icon.Clock size={16} className="text-brand-teal" />{s.duration}</div>
                <div className="flex items-center gap-2 text-white/85 font-sans text-[13px] font-semibold"><Icon.Award size={16} className="text-brand-teal" />Theo dõi trực tiếp bởi Founder</div>
              </div>
            </div>
          </section>

          {/* Body */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-14">
                <div className="space-y-5">
                  <SectionHead eyebrow="Tổng quan" title="Liệu trình này" accent="dành cho ai?" />
                  <p className="font-sans text-sm text-ink-2 leading-relaxed">{s.summary}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="bg-brand-blue-light border border-divider rounded-md p-6">
                      <h4 className="font-sans text-[11px] font-bold tracking-widest text-brand-blue uppercase mb-4">Phù hợp với bạn nếu</h4>
                      <ul className="space-y-2.5">{s.forWhom.map((t, i) => <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2"><span className="text-brand-blue mt-0.5 shrink-0"><Icon.Check size={15} /></span>{t}</li>)}</ul>
                    </div>
                    <div className="bg-mist border border-divider rounded-md p-6">
                      <h4 className="font-sans text-[11px] font-bold tracking-widest text-ink uppercase mb-4">Giải quyết vấn đề</h4>
                      <ul className="space-y-2.5">{s.problems.map((t, i) => <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2"><span className="text-brand-teal mt-0.5 shrink-0"><Icon.Activity size={15} /></span>{t}</li>)}</ul>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-7">
                  <SectionHead eyebrow="Quy trình" title="Diễn ra" accent="thế nào?" />
                  <div className="space-y-5">
                    {s.steps.map((st, i) => (
                      <div key={i} className="flex gap-5 items-start bg-white border border-divider rounded-md p-6 hover:shadow-md hover:border-brand-blue/40 transition-all">
                        <span className="shrink-0 w-12 h-12 rounded-full bg-brand-blue text-white font-serif text-xl font-bold flex items-center justify-center">{i + 1}</span>
                        <div>
                          <h4 className="font-serif text-lg font-bold text-ink">{st.title}</h4>
                          <p className="font-sans text-sm text-ink-2 leading-relaxed mt-1.5">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Includes + results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-brand-blue-light border border-divider rounded-md p-7">
                    <h4 className="font-serif text-lg font-bold text-ink mb-4 flex items-center gap-2"><Icon.Clipboard size={18} className="text-brand-blue" />Liệu trình bao gồm</h4>
                    <ul className="space-y-2.5">{s.includes.map((t, i) => <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2"><span className="text-brand-blue mt-0.5 shrink-0"><Icon.Check size={15} /></span>{t}</li>)}</ul>
                  </div>
                  <div className="bg-mist border border-divider rounded-md p-7">
                    <h4 className="font-serif text-lg font-bold text-ink mb-4 flex items-center gap-2"><Icon.Sparkles size={18} className="text-brand-teal" />Kết quả kỳ vọng</h4>
                    <ul className="space-y-2.5">{s.results.map((t, i) => <li key={i} className="flex gap-2.5 items-start font-sans text-[13px] text-ink-2"><span className="text-brand-teal mt-0.5 shrink-0"><Icon.CheckCircle size={15} /></span>{t}</li>)}</ul>
                  </div>
                </div>
                <p className="font-sans text-[11px] text-ink-3 italic leading-relaxed">⚠ Giá và thời gian tham khảo từ thiết kế prototype — cần client xác nhận lại trước khi công bố chính thức. Lennie không cam kết kết quả tuyệt đối; mọi phác đồ điều chỉnh theo tiến triển thực tế của làn da.</p>
              </div>

              {/* Sticky sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <div className="bg-white border border-divider rounded-md shadow-sm overflow-hidden">
                    <div className="h-40 overflow-hidden bg-brand-blue-light"><img src={s.img} alt={s.name} className="w-full h-full object-cover" /></div>
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="block font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase mb-1">Chi phí tham khảo</span>
                        <span className="font-serif text-3xl font-bold text-ink">{s.price}</span>
                        {s.priceNote && <span className="block font-sans text-[11px] text-ink-3 mt-1">{s.priceNote}</span>}
                      </div>
                      <div className="space-y-2.5 py-4 border-y border-divider text-[13px] font-sans text-ink-2">
                        <div className="flex items-center gap-2.5"><Icon.Clock size={15} className="text-brand-blue" />{s.duration}</div>
                        <div className="flex items-center gap-2.5"><Icon.User size={15} className="text-brand-blue" />ThS. DS. Hoàng Hồng Thắm</div>
                        <div className="flex items-center gap-2.5"><Icon.Pin size={15} className="text-brand-blue" />HCM · Hà Nội · Online</div>
                      </div>
                      <button type="button" onClick={() => api.openBooking(s.id)} className="w-full py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-all shadow-sm">Đặt lịch ngay</button>
                      <button type="button" onClick={api.openQuiz} className="w-full py-3.5 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all">Phân tích da miễn phí</button>
                    </div>
                  </div>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-blue-light border border-divider text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-white transition-all"><Icon.Message size={16} />Tư vấn qua Messenger / Zalo</a>
                </div>
              </aside>
            </div>
          </section>

          {/* Other services */}
          <section className="bg-brand-blue-light py-20 border-y border-divider">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <SectionHead eyebrow="Dịch vụ khác" title="Khám phá thêm" accent="liệu trình phù hợp" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {others.map((o) => {
                  const OI = Icon[o.icon];
                  return (
                    <a key={o.id} href={`service-detail.html?id=${o.id}`} className="group bg-white border border-divider rounded-md overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
                      <div className="h-40 overflow-hidden bg-brand-blue-light"><img src={o.img} alt={o.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /></div>
                      <div className="p-5 space-y-2">
                        <span className="flex items-center gap-2 font-sans text-[9px] font-extrabold tracking-[0.2em] text-brand-blue uppercase"><OI size={13} />{o.group}</span>
                        <h4 className="font-serif text-[17px] font-bold text-ink leading-snug group-hover:text-brand-blue transition-colors">{o.name}</h4>
                        <span className="font-serif text-base font-bold text-ink">{o.price}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
          <CTABand onOpenBooking={() => api.openBooking(s.id)} />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<ServiceDetailPage />);
