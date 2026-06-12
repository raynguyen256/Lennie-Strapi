/* ============================================================
   Sections 2 — Services slider, PartnerMarquee, AboutBrand, Mantra
   ============================================================ */
const { useState: useState2, useEffect: useEffect2 } = React;

/* ---------------- SERVICES (immersive dark slider) ---------------- */
function Services({ onOpenBooking }) {
  const [idx, setIdx] = useState2(0);
  useEffect2(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % servicesSlides.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#152639] select-none min-h-[600px] md:min-h-screen flex items-center">
      {/* Background image stack */}
      <div className="absolute inset-0 w-full h-full">
        {servicesSlides.map((s, i) =>
        <div key={i}
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[1300ms] ease-out ${idx === i ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`}
        style={{ backgroundImage: `url(${s.img})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d2e]/80 via-[#0f1d2e]/35 to-[#0f1d2e]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d2e]/70 via-transparent to-[#0f1d2e]/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Left info card */}
        <div className="lg:col-span-6 relative min-h-[340px] md:min-h-[380px] flex items-center w-full">
          {servicesSlides.map((s, i) =>
          <div key={i}
          className={`absolute top-0 left-0 w-full max-w-[480px] bg-white/97 text-ink p-7 md:p-9 rounded-[20px] md:rounded-[28px] shadow-2xl transition-all duration-700 ease-out flex flex-col gap-5 ${
          idx === i ? 'opacity-100 translate-y-0 scale-100 z-20' : 'opacity-0 translate-y-8 scale-[0.96] pointer-events-none z-10'}`}>
              <span className="inline-block self-start font-sans text-[10px] md:text-[11px] font-black tracking-[0.22em] text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded" style={{ color: "rgb(255, 255, 255)" }}>{s.tag}</span>
              <h2 className="font-serif text-2xl md:text-[32px] leading-[1.15] text-ink font-bold tracking-tight" style={{ color: "rgb(255, 255, 255)" }}>{s.title}</h2>
              <p className="font-sans text-[13px] md:text-sm md:leading-[1.75] text-ink-2 font-medium" style={{ color: "rgb(255, 255, 255)" }}>{s.desc}</p>
              <button type="button" onClick={onOpenBooking}
            className="self-start px-6 py-3 bg-brand-blue hover:bg-ink text-white font-sans text-[9px] font-bold tracking-[0.2em] uppercase rounded transition-colors shadow-sm">
                Đăng ký khám da ngay
              </button>
            </div>
          )}
        </div>

        {/* Right: number nav + corner title */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-between gap-12 lg:gap-0">
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3.5 md:gap-5 w-full justify-center lg:justify-end">
            {servicesSlides.map((s, i) =>
            <button key={i} type="button" onMouseEnter={() => setIdx(i)} onClick={() => setIdx(i)}
            className="group flex items-center justify-end py-2 outline-none cursor-pointer gap-4">
                <span className={`hidden lg:block h-px bg-white transition-all duration-500 origin-right ${idx === i ? 'w-24 opacity-100' : 'w-0 opacity-0 group-hover:w-16 group-hover:opacity-70'}`} />
                <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${idx === i ? 'bg-white border-white scale-110' : 'border-white/60 bg-transparent group-hover:border-white'}`} />
                <strong className={`font-serif text-3xl md:text-5xl lg:text-7xl tracking-tighter leading-none transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ${
              idx === i ? 'text-white scale-100 font-bold' : 'text-white/35 scale-90 font-light group-hover:text-white/80'}`}>0{i + 1}</strong>
              </button>
            )}
          </div>
          <div className="text-center lg:text-right pt-6 lg:pt-14 w-full">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-[54px] font-extrabold text-white leading-[1.05] tracking-tight uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              Vì sao <span className="text-brand-teal italic font-semibold">Lennie</span><br />được tin chọn?
            </h3>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------------- PARTNER MARQUEE ---------------- */
function PartnerMarquee() {
  const sets = [0, 1, 2, 3];
  return (
    <div className="w-full bg-mist border-y border-divider py-8 overflow-hidden relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-mist to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-mist to-transparent z-10 pointer-events-none" />
      <div className="flex overflow-hidden w-full">
        <div className="marquee flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {sets.map((s) => partnerBrands.map((b, i) =>
          <span key={`${s}-${i}`}
          className="font-serif text-[13px] md:text-sm lg:text-[15px] font-semibold tracking-[0.22em] text-[#6F8CA8] hover:text-brand-blue transition-colors uppercase whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>);

}

/* ---------------- ABOUT US (homepage → links to About page) ---------------- */
function AboutUsHome() {
  const [ref, shown] = useReveal();
  return (
    <section id="about-us" className="bg-white py-14 md:py-20 border-b border-divider">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-md border border-divider/60 shadow-sm reveal-card ${shown ? 'is-in' : ''}`}>
        <div className="relative min-h-[340px] lg:min-h-[490px] bg-gray-50 overflow-hidden">
          <img src="assets/remix/clinic-treatment.png" alt="Không gian điều trị Lennie SkinLab" className="w-full h-full object-cover object-center hover:scale-[1.03] duration-700 transition select-none" />
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-sm border border-white/50">
            <span className="font-sans text-[9px] font-black tracking-widest text-ink uppercase">Thành lập 2019 · Triết lý cá nhân hóa</span>
          </div>
        </div>
        <div className="bg-brand-blue-light p-8 md:p-14 flex flex-col justify-center gap-6">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-blue uppercase">Về chúng tôi</span>
          <h2 className="font-serif text-3xl md:text-[40px] text-ink font-light leading-snug tracking-tight">
            Đọc vị làn da trước,<br /><span className="font-semibold italic text-brand-blue">đề xuất phác đồ sau.</span>
          </h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Lennie SkinLab là thương hiệu chuyên sâu trong lĩnh vực chăm sóc và phục hồi làn da theo triết lý cá nhân hóa. Chúng tôi không áp dụng một routine hay phác đồ chung — mỗi làn da được đọc vị chuyên sâu và xây dựng liệu trình riêng phù hợp từng cơ địa, từng thời điểm.
          </p>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Ngôn ngữ của Lennie là của một người đồng hành am hiểu, không phải người bán hàng — bằng chuyên môn hoạt chất, sự minh bạch và lòng kiên nhẫn.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {['Thấu hiểu', 'Chữa lành', 'Tinh tế'].map((t) => (
              <div key={t} className="text-center bg-white/70 rounded-sm py-3 border border-white">
                <span className="block font-serif text-base font-semibold text-brand-blue">{t}</span>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <a href="about.html" className="inline-flex items-center gap-2 px-6 py-3 border border-ink/30 hover:border-brand-blue hover:text-brand-blue text-ink font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all bg-white">
              Tìm hiểu về Lennie <Icon.ArrowR size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------------- MANTRA ---------------- */
function MantraSection() {
  const [ref, shown] = useReveal();
  return (
    <section className="bg-white py-20 border-b border-divider text-center">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-[34px] font-light text-ink leading-snug tracking-tight max-w-2xl mx-auto">
          Khỏe mạnh từ gốc tế bào,<br /><span className="font-semibold italic">Rạng rỡ vẹn nguyên bản sắc.</span>
        </h2>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mantraCards.map((c, i) => {
            const I = Icon[c.icon];
            return (
              <div key={i}
              className={`reveal-card bg-white border border-divider rounded-md p-8 shadow-sm flex flex-col items-center gap-4 hover:shadow-md hover:border-brand-blue/40 hover:-translate-y-1.5 transition-all duration-500 ${shown ? 'is-in' : ''}`}
              style={{ transitionDelay: shown ? `${i * 100}ms` : '0ms' }}>
                <div className="w-14 h-14 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><I size={24} /></div>
                <h3 className="font-serif text-[17px] font-bold text-ink">{c.title}</h3>
                <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed max-w-[220px]">{c.desc}</p>
              </div>);

          })}
        </div>
      </div>
    </section>);

}

Object.assign(window, { Services, PartnerMarquee, AboutUsHome, MantraSection });