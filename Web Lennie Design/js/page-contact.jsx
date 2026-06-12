/* ============================================================
   Liên hệ (Contact) — form + channels + branches + map placeholder
   ============================================================ */
function ContactPageForm() {
  const { useState } = React;
  const [form, setForm] = useState({ name: '', email: '', service: 'recover', branch: 'online', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSending(true); setTimeout(() => { setSending(false); setSent(true); }, 1100); };
  if (sent) {
    return (
      <div className="bg-white border border-divider rounded-md p-10 text-center space-y-4">
        <div className="w-16 h-16 bg-brand-blue-light rounded-full flex items-center justify-center mx-auto text-brand-blue border border-divider"><Icon.MailCheck size={32} /></div>
        <h3 className="font-serif text-2xl font-bold text-ink">Gửi yêu cầu thành công</h3>
        <p className="font-sans text-sm text-ink-2 max-w-md mx-auto leading-relaxed">Cảm ơn bạn{form.name ? ', ' + form.name : ''}. Đội ngũ Lennie sẽ liên hệ tại {form.email || 'email của bạn'} trong vòng tối đa 48 giờ làm việc.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-3 px-6 py-2.5 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors">Gửi yêu cầu khác</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="bg-white border border-divider rounded-md p-7 md:p-9 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Họ và tên*</label>
          <input type="text" required value={form.name} onChange={up('name')} placeholder="Nhập họ và tên" className="w-full px-4 py-3 bg-mist border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Email*</label>
          <input type="email" required value={form.email} onChange={up('email')} placeholder="Nhập email liên hệ" className="w-full px-4 py-3 bg-mist border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold text-ink-2 uppercase tracking-wide">Quan tâm</label>
          <select value={form.service} onChange={up('service')} className="w-full px-4 py-3 bg-mist border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-xs text-ink">
            <option value="recover">Phục hồi da mỏng yếu</option>
            <option value="acne">Trị mụn ẩn &amp; mụn viêm</option>
            <option value="pigment">Điều trị nám &amp; sáng da</option>
            <option value="aging">Trẻ hóa &amp; nâng cơ</option>
            <option value="product">Mua sản phẩm</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold text-ink-2 uppercase tracking-wide">Cơ sở</label>
          <select value={form.branch} onChange={up('branch')} className="w-full px-4 py-3 bg-mist border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-xs text-ink">
            <option value="online">Tư vấn từ xa (Zalo)</option>
            <option value="hcm">TP. Hồ Chí Minh (Q.3)</option>
            <option value="hanoi">Hà Nội Flagship</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Nội dung</label>
        <textarea rows={4} value={form.message} onChange={up('message')} placeholder="Chia sẻ về tình trạng da hoặc câu hỏi của bạn..." className="w-full px-4 py-3 bg-mist border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-ink-3/60 resize-none"></textarea>
      </div>
      <button type="submit" disabled={sending} className="px-10 py-4 bg-brand-blue hover:bg-ink disabled:opacity-70 text-white font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all shadow-md w-full sm:w-auto">{sending ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}</button>
    </form>
  );
}

function ContactAccordion() {
  const { useState } = React;
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-divider border-y border-divider">
      {faqs.map((f, i) => (
        <div key={i}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
            <span className="font-serif text-[16px] md:text-[17px] font-medium text-ink group-hover:text-brand-blue transition-colors">{f.q}</span>
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

function ContactPage() {
  const channels = [
    { icon: 'Message', t: 'Messenger', d: 'Nhắn Fanpage Lennie', h: '#' },
    { icon: 'Phone', t: 'Zalo / SĐT', d: '+84 909 123 456', h: 'tel:+84909123456' },
    { icon: 'Mail', t: 'Email', d: 'hello@lennieskinlab.vn', h: 'mailto:hello@lennieskinlab.vn' },
  ];
  return (
    <PageShell active="contact">
      {(api) => (
        <>
          <PageHero
            eyebrow="Liên hệ"
            title="Lennie luôn ở đây"
            accent="để lắng nghe bạn."
            intro="Có câu hỏi về làn da, dịch vụ hay sản phẩm? Gửi lời nhắn cho chúng tôi — đội ngũ chuyên môn sẽ phản hồi trong vòng 24 – 48 giờ làm việc."
            crumb={[['Liên hệ']]}
            img="assets/remix/clinic-treatment.png"
          />

          {/* Quick channels */}
          <section className="bg-white py-14 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {channels.map((c) => {
                const I = Icon[c.icon];
                return (
                  <a key={c.t} href={c.h} className="group bg-brand-blue-light border border-divider rounded-md p-7 flex items-center gap-4 hover:bg-white hover:shadow-md hover:border-brand-blue/40 transition-all">
                    <span className="w-12 h-12 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-sm shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors"><I size={22} /></span>
                    <div>
                      <span className="block font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase">{c.t}</span>
                      <span className="block font-serif text-lg font-semibold text-ink">{c.d}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Form + info */}
          <section className="bg-mist py-16 md:py-20 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-6">
                <SectionHead eyebrow="Gửi lời nhắn" title="Bắt đầu một" accent="cuộc trò chuyện" intro="Điền thông tin và Lennie sẽ liên hệ lại. Phản hồi trong 24 – 48 giờ làm việc." />
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3"><span className="flex gap-0.5 text-brand-blue">{Array.from({ length: 5 }).map((_, i) => <Icon.Star key={i} size={15} fill="#5789B7" stroke="#5789B7" />)}</span><span className="font-sans text-[12px] font-bold text-ink">Hơn 2.500+ khách hàng tin dùng toàn quốc</span></div>
                  <div className="relative rounded-md overflow-hidden border border-divider aspect-video bg-brand-blue-light max-w-sm">
                    <img src="assets/remix/wellness-spa.png" alt="Lennie clinic" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/40"><span className="font-sans text-[8px] font-black tracking-widest text-ink uppercase">🛡️ Giữ trọn niềm tin y khoa</span></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 bg-brand-blue-light border border-divider p-7 md:p-9 rounded-md shadow-sm"><ConsultForm /></div>
            </div>
          </section>

          {/* Branches + map */}
          <section className="bg-white py-16 md:py-20 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <SectionHead eyebrow="Hệ thống cơ sở" title="Ghé thăm" accent="Lennie SkinLab" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-5">
                  {branches.map((b, i) => (
                    <div key={i} className="bg-brand-blue-light border border-divider rounded-md p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-bold text-ink">{b.name}</h4>
                        <span className="font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase bg-white px-2.5 py-1 rounded-sm border border-divider">{b.tag}</span>
                      </div>
                      <div className="space-y-2 font-sans text-[13px] text-ink-2">
                        <div className="flex gap-2.5 items-start"><Icon.Pin size={15} className="text-brand-blue shrink-0 mt-0.5" /><span>{b.address} <em className="text-ink-3 not-italic">{b.note}</em></span></div>
                        <div className="flex gap-2.5 items-center"><Icon.Phone size={15} className="text-brand-blue shrink-0" /><span>{b.phone}</span></div>
                        <div className="flex gap-2.5 items-center"><Icon.Clock size={15} className="text-brand-blue shrink-0" /><span>{b.hours}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-md overflow-hidden border border-divider h-full min-h-[340px] relative" style={{ background: 'repeating-linear-gradient(135deg, #F0F6FC, #F0F6FC 14px, #EAF2FA 14px, #EAF2FA 28px)' }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                    <span className="w-12 h-12 rounded-full bg-white border border-divider flex items-center justify-center text-brand-blue shadow-sm"><Icon.Pin size={22} /></span>
                    <span className="font-mono text-[11px] text-ink-2 tracking-wide">[ Google Maps embed ]</span>
                    <span className="font-mono text-[10px] text-ink-3">142 Võ Văn Tần, Q.3, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-brand-blue-light py-16 md:py-20 border-b border-divider">
            <div className="max-w-3xl mx-auto px-6 space-y-10">
              <SectionHead center eyebrow="Câu hỏi thường gặp" title="Giải đáp" accent="nhanh cho bạn" />
              <ContactAccordion />
            </div>
          </section>
          <CTABand onOpenBooking={() => api.openBooking()} secondaryHref="services.html" secondary="Xem dịch vụ" />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<ContactPage />);
