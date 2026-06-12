/* ============================================================
   Về chúng tôi (About) — câu chuyện thương hiệu + founder + đội ngũ
   ============================================================ */
function AboutStory() {
  const [ref, shown] = useReveal();
  return (
    <section className="bg-white py-16 md:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className={`reveal-x-l ${shown ? 'is-in' : ''}`}>
          <div className="rounded-md overflow-hidden border border-divider shadow-sm relative aspect-[4/5] bg-brand-blue-light">
            <img src="assets/remix/clinic-treatment.png" alt="Không gian điều trị Lennie SkinLab" className="w-full h-full object-cover hover:scale-[1.03] transition duration-700 select-none" />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-sm border border-white/50">
              <span className="font-sans text-[9px] font-black tracking-widest text-ink uppercase">Thành lập 2019 · Triết lý cá nhân hóa</span>
            </div>
          </div>
        </div>
        <div className={`space-y-6 reveal-x-r ${shown ? 'is-in' : ''}`}>
          <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">Câu chuyện thương hiệu</span>
          <h2 className="font-serif text-3xl md:text-[42px] text-ink font-light leading-snug tracking-tight">
            Đọc vị làn da trước,<br /><span className="font-semibold italic text-brand-blue">đề xuất phác đồ sau.</span>
          </h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Lennie SkinLab là thương hiệu chuyên sâu trong lĩnh vực chăm sóc và phục hồi làn da theo triết lý cá nhân hóa. Chúng tôi không áp dụng một routine hay phác đồ chung — mỗi làn da được đọc vị chuyên sâu và xây dựng liệu trình riêng phù hợp từng cơ địa và thời điểm.
          </p>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            Ngôn ngữ của Lennie là của một người đồng hành am hiểu, không phải người bán hàng. Chúng tôi tin chăm da là một hành trình dài, cần được dẫn dắt đúng cách ngay từ đầu — bằng chuyên môn hoạt chất, sự minh bạch và lòng kiên nhẫn.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-divider">
            {[['Thấu hiểu', ''], ['Chữa lành', ''], ['Tinh tế', '']].map(([t]) => (
              <div key={t} className="text-center">
                <span className="block font-serif text-lg font-semibold text-brand-blue">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  const [ref, shown] = useReveal();
  return (
    <section className="bg-brand-blue-light py-20 border-y border-divider">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <SectionHead center eyebrow="Giá trị cốt lõi" title="Bốn cam kết" accent="định hình mọi liệu trình" intro="Cá nhân hóa · Chuyên môn · Minh bạch · Bền vững — kim chỉ nam cho từng quyết định chăm sóc da tại Lennie." />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandValues.map((c, i) => {
            const I = Icon[c.icon];
            return (
              <div key={i} className={`reveal-card bg-white border border-divider rounded-md p-8 shadow-sm flex flex-col items-start gap-4 hover:shadow-md hover:border-brand-blue/40 hover:-translate-y-1.5 transition-all duration-500 ${shown ? 'is-in' : ''}`} style={{ transitionDelay: shown ? `${i * 100}ms` : '0ms' }}>
                <div className="w-14 h-14 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><I size={24} /></div>
                <h3 className="font-serif text-[19px] font-bold text-ink">{c.title}</h3>
                <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutFounder() {
  const [ref, shown] = useReveal();
  return (
    <section className="bg-white py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className={`lg:col-span-5 rounded-md overflow-hidden shadow-md max-w-md mx-auto lg:mx-0 border border-divider reveal-x-l ${shown ? 'is-in' : ''}`}>
            <div className="relative bg-gradient-to-b from-brand-blue-light to-teal-soft aspect-[4/5] flex items-end justify-center overflow-hidden">
              <img src="assets/founder-portrait.png" alt="ThS. DS. Hoàng Hồng Thắm" className="h-full w-auto object-contain transition-transform duration-700 hover:scale-105 select-none" />
            </div>
          </div>
          <div className={`lg:col-span-7 space-y-6 reveal-x-r ${shown ? 'is-in' : ''}`}>
            <div className="space-y-1">
              <span className="block font-sans text-[10px] font-bold tracking-[0.2em] text-brand-blue uppercase">Người sáng lập &amp; Chuyên gia trưởng</span>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-ink">ThS. DS. Hoàng Hồng Thắm</h3>
              <span className="block font-sans text-xs font-bold text-brand-blue tracking-wide uppercase">Thạc sĩ Dược · Chuyên gia Da liễu dược mỹ phẩm</span>
            </div>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-xl">
              Với hơn 6 năm chuyên sâu trong lĩnh vực dược mỹ phẩm và chăm sóc da liễu, ThS. DS. Hoàng Hồng Thắm là người đọc vị trực tiếp 100% ca điều trị tại Lennie — không ủy quyền, không phân công. Mỗi phác đồ đều được bà theo dõi và tinh chỉnh sát sao theo tiến triển thực tế của làn da.
            </p>
            <ul className="space-y-3 pt-4 border-t border-divider text-ink font-sans text-[13px] font-semibold">
              {['Thạc sĩ Dược — Đại học Dược khoa', 'Đào tạo chuyên sâu tại Mỹ, Châu Âu & Úc', 'Chứng nhận hợp tác 50+ brand dược mỹ phẩm quốc tế', 'Chứng chỉ hành nghề Da liễu Dược mỹ phẩm'].map((t, i) => (
                <li key={i} className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-brand-blue shrink-0"></span>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {founderTimeline.map((t, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-divider">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-brand-blue"></span>
              <span className="font-serif text-2xl font-semibold text-brand-blue">{t.year}</span>
              <h4 className="font-sans text-[13px] font-bold text-ink uppercase tracking-wide mt-2">{t.title}</h4>
              <p className="font-sans text-xs text-[#6F8CA8] leading-relaxed mt-1.5">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeam() {
  const { useRef, useEffect } = React;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let down = false, startX = 0, startScroll = 0, moved = false;
    const onDown = (e) => { down = true; moved = false; el.classList.add('dragging'); startX = e.pageX; startScroll = el.scrollLeft; };
    const onMove = (e) => { if (!down) return; const dx = e.pageX - startX; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = startScroll - dx; };
    const onUp = () => { down = false; el.classList.remove('dragging'); };
    const onClick = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('click', onClick, true);
    return () => { el.removeEventListener('mousedown', onDown); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); el.removeEventListener('click', onClick, true); };
  }, []);
  return (
    <section className="bg-brand-blue-light py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-white px-3.5 py-1 rounded-sm uppercase border border-divider">Đội ngũ chuyên môn</span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
            Những người trực tiếp <span className="font-semibold italic text-brand-blue">đồng hành</span>
          </h2>
          <p className="font-sans text-[11px] text-ink-3 italic">⚠ Tên đội ngũ hiện là placeholder — sẽ thay bằng thông tin thật từ client.</p>
        </div>
        <div className="flex items-center justify-between mb-4 select-none">
          <span className="flex items-center gap-1.5 text-brand-blue text-[11px] font-sans font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />Lướt để xem đội ngũ
          </span>
          <span className="text-[#6F8CA8] text-[11px] font-sans font-medium italic hidden sm:block">← Nhấn giữ &amp; kéo chuột →</span>
        </div>
        <div ref={ref} className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 w-max py-2">
            {teamData.map((m, i) => (
              <div key={i} className="bg-white border border-divider rounded-md overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 w-[280px] sm:w-[320px] shrink-0 select-none">
                <div className="h-64 bg-brand-blue-light overflow-hidden relative group">
                  <img src={m.img} alt={m.name} draggable="false" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" />
                </div>
                <div className="p-5 flex justify-between items-center bg-white border-t border-divider">
                  <div>
                    <h4 className="font-sans text-[13px] font-bold text-ink tracking-wide uppercase">{m.name}</h4>
                    <p className="font-sans text-[11px] text-[#6F8CA8] mt-0.5">{m.role}</p>
                  </div>
                  <span className="w-7 h-7 bg-brand-blue-light text-brand-blue rounded flex items-center justify-center font-bold text-xs shrink-0">in</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell active="about">
      {(api) => (
        <>
          <PageHero
            eyebrow="Về chúng tôi"
            title="Chăm da theo triết lý"
            accent="cá nhân hóa."
            intro="Lennie SkinLab — thương hiệu dược mỹ phẩm trị liệu, nơi mỗi làn da được đọc vị chuyên sâu và xây dựng phác đồ riêng, theo dõi trực tiếp bởi ThS. DS. Hoàng Hồng Thắm."
            crumb={[['Về chúng tôi']]}
            img="assets/remix/herb-mix.png"
          />
          <AboutStory />
          <StatStrip />
          <AboutValues />
          <AboutFounder />
          <AboutTeam />
          <PartnerStrip label="Hợp tác ủy quyền cùng 50+ thương hiệu dược mỹ phẩm quốc tế" />
          <CTABand onOpenBooking={() => api.openBooking()} />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
