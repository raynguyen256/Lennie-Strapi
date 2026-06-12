/* ============================================================
   Sections 3 — About/Team, Testimonials, Blog
   ============================================================ */
const { useState: useState3, useRef: useRef3, useEffect: useEffect3 } = React;

/* drag-to-scroll hook for the team carousel */
function useDragScroll() {
  const ref = useRef3(null);
  useEffect3(() => {
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
  return ref;
}

function About() {
  const drag = useDragScroll();
  const [bioRef, bioShown] = useReveal();
  return (
    <section id="about" className="bg-white py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3.5 py-1 rounded-sm uppercase">Đội ngũ chuyên môn</span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
            Người trực tiếp <span className="font-semibold italic text-brand-blue">đồng hành</span> cùng bạn
          </h2>
        </div>

        {/* Founder row */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className={`lg:col-span-5 rounded-md overflow-hidden shadow-md max-w-md mx-auto lg:mx-0 border border-divider reveal-x-l ${bioShown ? 'is-in' : ''}`}>
            <div className="relative bg-gradient-to-b from-brand-blue-light to-teal-soft aspect-[4/5] flex items-end justify-center overflow-hidden">
              <img src="assets/founder-portrait.png" alt="ThS. DS. Hoàng Hồng Thắm" className="h-full w-auto object-contain transition-transform duration-700 hover:scale-105 select-none" />
            </div>
          </div>
          <div className={`lg:col-span-7 space-y-6 reveal-x-r ${bioShown ? 'is-in' : ''}`}>
            <div className="space-y-1">
              <span className="block font-sans text-[10px] font-bold tracking-[0.2em] text-brand-blue uppercase">Người sáng lập &amp; Chuyên gia trưởng</span>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-ink">ThS. DS. Hoàng Hồng Thắm</h3>
              <span className="block font-sans text-xs font-bold text-brand-blue tracking-wide uppercase">Thạc sĩ Dược · Chuyên gia Da liễu dược mỹ phẩm</span>
            </div>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-xl">
              Với hơn 6 năm chuyên sâu trong lĩnh vực dược mỹ phẩm và chăm sóc da liễu, ThS. DS. Hoàng Hồng Thắm là người đọc vị trực tiếp 100% ca điều trị tại Lennie — không ủy quyền, không phân công.
            </p>
            <ul className="space-y-3 pt-4 border-t border-divider text-ink font-sans text-[13px] font-semibold">
              {['Thạc sĩ Dược — Đại học Dược khoa', 'Đào tạo chuyên sâu tại Mỹ, Châu Âu & Úc', 'Chứng nhận hợp tác 50+ brand dược mỹ phẩm quốc tế', 'Chứng chỉ hành nghề Da liễu Dược mỹ phẩm'].map((t, i) => (
                <li key={i} className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-brand-blue shrink-0"></span>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team carousel */}
        <div className="w-full mb-4 relative">
          <div className="flex items-center justify-between mb-4 select-none">
            <span className="flex items-center gap-1.5 text-brand-blue text-[11px] font-sans font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />Lướt để xem đội ngũ chuyên môn
            </span>
            <span className="text-[#6F8CA8] text-[11px] font-sans font-medium italic hidden sm:block">← Nhấn giữ &amp; kéo chuột qua lại →</span>
          </div>
          <div ref={drag} className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
            <div className="flex gap-6 w-max py-2">
              {teamData.map((m, i) => (
                <div key={i} className="bg-white border border-divider rounded-md overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 w-[280px] sm:w-[320px] md:w-[350px] shrink-0 select-none">
                  <div className="h-64 bg-brand-blue-light overflow-hidden relative group">
                    <img src={m.img} alt={m.name} draggable="false" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" />
                  </div>
                  <div className="p-5 flex justify-between items-center bg-white border-t border-divider">
                    <div>
                      <h4 className="font-sans text-[13px] font-bold text-ink tracking-wide uppercase">{m.name}</h4>
                      <p className="font-sans text-[11px] text-[#6F8CA8] mt-0.5">{m.role}</p>
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 bg-brand-blue-light hover:bg-brand-blue text-brand-blue hover:text-white rounded flex items-center justify-center font-bold text-xs transition-colors shrink-0">in</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS (flip cards marquee) ---------------- */
function Testimonials() {
  const doubled = [...reviewsData, ...reviewsData];
  return (
    <section id="testimonials" className="bg-brand-blue-light py-20 border-b border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-blue bg-white border border-divider px-3.5 py-1 rounded-sm uppercase inline-block">Nhật ký đồng hành</span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
            Khách hàng <span className="font-semibold italic text-brand-blue">Người thật — Việc thật</span> nói gì?
          </h2>
          <p className="font-sans text-xs text-[#6F8CA8] max-w-lg mx-auto leading-relaxed">
            *Rê chuột vào thẻ cảm nhận để lật sang mặt sau xem ảnh chụp cận cảnh biến đổi da Trước — Sau lâm sàng.
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-6 select-none">
          <div className="marquee-slow flex gap-8">
            {doubled.map((r, idx) => (
              <div key={idx} className="flip-card w-[345px] h-[375px] shrink-0 cursor-pointer">
                <div className="flip-inner relative w-full h-full">
                  {/* FRONT */}
                  <div className="flip-face absolute inset-0 bg-white text-ink rounded-md p-6 flex flex-col justify-between border border-divider shadow-sm">
                    <div className="space-y-4">
                      <div className="flex gap-1">{Array.from({ length: r.stars }).map((_, i) => <Icon.Star key={i} size={14} className="text-brand-blue" fill="#5789B7" stroke="#5789B7" />)}</div>
                      <p className="font-sans text-xs text-ink-2 leading-relaxed font-light italic">{r.text}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-divider mt-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-blue-light border border-divider shrink-0">
                        <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans text-[11px] font-bold tracking-wider uppercase text-ink">{r.name}</h4>
                        <p className="font-sans text-[9px] text-brand-blue tracking-wider uppercase">🩺 {r.caseType}</p>
                      </div>
                    </div>
                  </div>
                  {/* BACK */}
                  <div className="flip-face flip-back absolute inset-0 bg-white text-ink rounded-md p-5 flex flex-col justify-between border border-divider shadow-md">
                    <div className="text-center pb-2 border-b border-divider">
                      <span className="font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase block">Kết quả điều trị thực tế</span>
                      <h4 className="font-serif text-[13px] font-bold text-ink mt-0.5">{r.improvement}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 py-3 h-44">
                      <div className="relative rounded overflow-hidden border border-red-100 flex flex-col justify-end">
                        <img src={r.img} alt="Trước" className="w-full h-full object-cover absolute inset-0" style={{ filter: 'brightness(.75) contrast(1.12) saturate(1.4) hue-rotate(340deg)' }} />
                        <div className="absolute inset-0 bg-red-800/10"></div>
                        <div className="relative z-10 bg-red-900/80 backdrop-blur-sm text-white py-1 text-center font-bold">
                          <span className="block text-[8px] tracking-wider">TRƯỚC</span>
                          <span className="block text-[7px] text-red-200 capitalize tracking-tight font-light">{r.beforeState}</span>
                        </div>
                      </div>
                      <div className="relative rounded overflow-hidden border border-emerald-100 flex flex-col justify-end">
                        <img src={r.img} alt="Sau" className="w-full h-full object-cover absolute inset-0" style={{ filter: 'brightness(1.08) contrast(.96) saturate(1.05)' }} />
                        <div className="absolute inset-0 bg-sky-400/5"></div>
                        <div className="relative z-10 bg-brand-blue/90 backdrop-blur-sm text-white py-1 text-center font-bold">
                          <span className="block text-[8px] tracking-wider">SAU {r.duration}</span>
                          <span className="block text-[7px] text-emerald-100 capitalize tracking-tight font-light">{r.afterState}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2.5 border-t border-divider text-center">
                      <p className="font-sans text-[10px] text-brand-blue leading-tight italic font-medium">"Nhận định: {r.expertNote}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BLOG ---------------- */
function Blog() {
  const posts = [
    { date: 'Ngày 02 Tháng 09, 2026', img: 'assets/remix/clinic-treatment.png', title: 'Góc Chia Sẻ Chuyên Sâu',
      excerpt: 'Đội ngũ chuyên môn lâm sàng luôn phân tích kỹ lưỡng, bám sát chẩn trị cá nhân hóa để hồi phục tối ưu các trường hợp sưng kích ứng, viêm đỏ khó chữa...' },
    { date: 'Ngày 24 Tháng 08, 2026', img: 'assets/remix/wellness-spa.png', title: 'Cẩm Nang Sống Khỏe Đẹp',
      excerpt: 'Khám phá các phương pháp cải tạo làn da khoa học đột phá nhất, kết hợp các thành phần sinh học phục hồi tối hảo giúp nuôi dưỡng vẻ rạng rỡ căng mướt...' },
  ];
  const [ref, shown] = useReveal();
  return (
    <section id="blog" className="bg-white py-20 border-b border-divider relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">Kiến thức da liễu</span>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-snug tracking-tight">
              Đọc để hiểu <span className="font-semibold italic text-brand-blue">làn da của mình</span>
            </h2>
          </div>
          <a href="#blog" className="px-6 py-3 border border-divider hover:border-brand-blue hover:bg-brand-blue-light text-ink font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all">Xem tất cả bài viết</a>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((p, i) => (
            <div key={i}
              className={`reveal-card group cursor-pointer rounded-md overflow-hidden bg-brand-blue-light border border-divider flex flex-col hover:shadow-md transition-all duration-500 ${shown ? 'is-in' : ''}`}
              style={{ transitionDelay: shown ? `${i * 120}ms` : '0ms' }}>
              <div className="h-64 sm:h-72 lg:h-80 overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] duration-700 transition" />
              </div>
              <div className="p-8 space-y-4">
                <span className="font-sans text-[10px] font-bold tracking-[0.16em] text-[#6F8CA8] uppercase">{p.date}</span>
                <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-brand-blue transition-colors">{p.title}</h3>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">{p.excerpt}</p>
                <span className="font-sans text-xs font-bold tracking-wider text-ink group-hover:text-brand-blue underline uppercase block pt-2">Đọc bài viết ⟶</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About, Testimonials, Blog });
