/* ============================================================
   Đánh giá khách hàng (Testimonials)
   ============================================================ */
function ReviewFlip({ r }) {
  return (
    <div className="flip-card w-full h-[390px] cursor-pointer">
      <div className="flip-inner relative w-full h-full">
        {/* FRONT */}
        <div className="flip-face absolute inset-0 bg-white text-ink rounded-md p-6 flex flex-col justify-between border border-divider shadow-sm">
          <div className="space-y-4">
            <div className="flex gap-1">{Array.from({ length: r.stars }).map((_, i) => <Icon.Star key={i} size={15} fill="#5789B7" stroke="#5789B7" />)}</div>
            <p className="font-sans text-[13px] text-ink-2 leading-relaxed font-light italic">{r.text}</p>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-divider mt-4">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-blue-light border border-divider shrink-0"><img src={r.img} alt={r.name} className="w-full h-full object-cover" /></div>
            <div>
              <h4 className="font-sans text-[12px] font-bold tracking-wider uppercase text-ink">{r.name}</h4>
              <p className="font-sans text-[10px] text-brand-blue tracking-wider uppercase">🩺 {r.caseType}</p>
            </div>
            <span className="ml-auto font-sans text-[9px] text-ink-3 italic">Lật xem →</span>
          </div>
        </div>
        {/* BACK */}
        <div className="flip-face flip-back absolute inset-0 bg-white text-ink rounded-md p-5 flex flex-col justify-between border border-divider shadow-md">
          <div className="text-center pb-2 border-b border-divider">
            <span className="font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase block">Kết quả điều trị thực tế</span>
            <h4 className="font-serif text-[14px] font-bold text-ink mt-0.5">{r.improvement}</h4>
          </div>
          <div className="grid grid-cols-2 gap-3.5 py-3 h-44">
            <div className="relative rounded overflow-hidden border border-red-100 flex flex-col justify-end">
              <img src={r.img} alt="Trước" className="w-full h-full object-cover absolute inset-0" style={{ filter: 'brightness(.75) contrast(1.12) saturate(1.4) hue-rotate(340deg)' }} />
              <div className="relative z-10 bg-red-900/80 backdrop-blur-sm text-white py-1 text-center font-bold">
                <span className="block text-[8px] tracking-wider">TRƯỚC</span>
                <span className="block text-[7px] text-red-200 capitalize tracking-tight font-light">{r.beforeState}</span>
              </div>
            </div>
            <div className="relative rounded overflow-hidden border border-emerald-100 flex flex-col justify-end">
              <img src={r.img} alt="Sau" className="w-full h-full object-cover absolute inset-0" style={{ filter: 'brightness(1.08) contrast(.96) saturate(1.05)' }} />
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
  );
}

function TestimonialsPage() {
  const featured = reviewsData[1];
  return (
    <PageShell active="home">
      {(api) => (
        <>
          <PageHero
            eyebrow="Đánh giá khách hàng"
            title="Người thật, việc thật,"
            accent="làn da thật."
            intro="Hơn 1.200 khách hàng đã đồng hành cùng Lennie SkinLab. Đây là những câu chuyện phục hồi thực tế — không phóng đại, không hứa hẹn tuyệt đối."
            crumb={[['Đánh giá khách hàng']]}
            img="assets/remix/model-glow.png"
          />
          <StatStrip />

          {/* Featured quote */}
          <section className="bg-white py-16 md:py-20 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 rounded-md overflow-hidden border border-divider shadow-sm aspect-[4/3] bg-brand-blue-light">
                <img src={featured.img} alt={featured.name} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-7 space-y-5">
                <span className="text-brand-blue/25 font-serif text-7xl leading-none block">“</span>
                <p className="font-serif text-2xl md:text-[30px] text-ink font-light italic leading-snug -mt-6">{featured.text.replace(/^"|"$/g, '')}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-divider">
                  <span className="flex gap-0.5 text-brand-blue">{Array.from({ length: featured.stars }).map((_, i) => <Icon.Star key={i} size={16} fill="#5789B7" stroke="#5789B7" />)}</span>
                  <span className="font-sans text-sm font-bold text-ink">{featured.name}</span>
                  <span className="font-sans text-[11px] text-brand-blue uppercase tracking-wider">· {featured.caseType}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="bg-brand-blue-light py-20 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
              <SectionHead center eyebrow="Nhật ký đồng hành" title="Cảm nhận từ" accent="khách hàng Lennie" intro="Rê chuột vào mỗi thẻ để lật xem ảnh minh họa biến đổi da Trước — Sau và nhận định chuyên môn." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviewsData.map((r, i) => <ReviewFlip key={i} r={r} />)}
              </div>
              <p className="text-center font-sans text-[11px] text-ink-3 italic">⚠ Ảnh Trước — Sau là minh họa hiệu ứng; client sẽ thay bằng ảnh thực tế (có đồng ý của khách).</p>
            </div>
          </section>

          {/* Channels of trust */}
          <section className="bg-white py-16 border-b border-divider">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[['HeartHandshake', '1.200+ khách đồng hành', 'Tin cậy và liên tục giới thiệu người thân'], ['Globe', 'Khách kiều bào toàn cầu', 'Mỹ · Hàn · Nhật · châu Âu · Singapore'], ['Award', 'Theo dõi bởi Founder', '100% ca điều trị, không ủy quyền']].map(([ic, t, d]) => {
                const I = Icon[ic];
                return (
                  <div key={t} className="space-y-3">
                    <span className="w-14 h-14 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto"><I size={24} /></span>
                    <h4 className="font-serif text-lg font-bold text-ink">{t}</h4>
                    <p className="font-sans text-xs text-ink-2 leading-relaxed">{d}</p>
                  </div>
                );
              })}
            </div>
          </section>
          <CTABand onOpenBooking={() => api.openBooking()} title="Sẵn sàng viết câu chuyện da" accent="của riêng bạn?" text="Đặt lịch đọc vị làn da cùng ThS. DS. Hoàng Hồng Thắm và bắt đầu hành trình phục hồi đúng cách." />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<TestimonialsPage />);
