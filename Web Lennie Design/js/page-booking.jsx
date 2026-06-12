/* ============================================================
   Đặt lịch (Booking) — inline form + 2 modes + branches
   ============================================================ */
const BOOK_SLOTS = ['08:30', '10:00', '11:15', '13:30', '14:45', '16:00', '17:15', '18:45'];

function BookingForm() {
  const { useState } = React;
  const [service, setService] = useState(servicesForBooking[0].id);
  const [branch, setBranch] = useState('hcm');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const sName = servicesForBooking.find((s) => s.id === service)?.name || '';
  const submit = (e) => { e.preventDefault(); if (!date || !time || !name || !phone) return; setBooked(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const reset = () => { setBooked(false); setDate(''); setTime(''); setName(''); setPhone(''); setNotes(''); };

  if (booked) {
    return (
      <div className="bg-white border border-divider rounded-md shadow-sm p-8 md:p-10 text-center space-y-6">
        <div className="w-16 h-16 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center mx-auto"><Icon.CheckCircle size={40} /></div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink">Đặt lịch thành công!</h3>
          <p className="font-sans text-sm text-ink-2 mt-2">Lennie SkinLab sẽ liên hệ qua Zalo/SĐT để xác nhận lịch hẹn của bạn.</p>
        </div>
        <div className="bg-mist p-6 rounded-md text-left border border-divider grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-ink-2">
          <div className="flex items-center gap-2"><Icon.Clipboard size={15} className="text-brand-blue" /><strong>{sName}</strong></div>
          <div className="flex items-center gap-2"><Icon.Pin size={15} className="text-brand-blue" />{branches.find((b) => (b.name.includes('Hồ Chí Minh') && branch === 'hcm') || (b.name.includes('Hà Nội') && branch === 'hanoi') || (b.name.includes('từ xa') && branch === 'online'))?.name || 'Cơ sở'}</div>
          <div className="flex items-center gap-2"><Icon.Calendar size={15} className="text-brand-blue" />{date}</div>
          <div className="flex items-center gap-2"><Icon.Clock size={15} className="text-brand-blue" />{time}</div>
        </div>
        <button type="button" onClick={reset} className="px-7 py-3 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-brand-blue-light transition-colors">Đặt lịch khác</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-divider rounded-md shadow-sm p-7 md:p-9 space-y-5">
      <div className="space-y-1.5">
        <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Dịch vụ điều trị*</label>
        <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-3.5 bg-mist border border-divider rounded-sm font-sans text-sm text-ink focus:outline-none focus:border-brand-blue">
          {servicesForBooking.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.price}</option>)}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Cơ sở mong muốn*</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full p-3.5 bg-mist border border-divider rounded-sm font-sans text-sm text-ink focus:outline-none focus:border-brand-blue">
          <option value="hcm">TP. Hồ Chí Minh (Võ Văn Tần, Q.3)</option>
          <option value="hanoi">Hà Nội Flagship Clinic</option>
          <option value="online">Tư vấn từ xa (Online qua Zalo)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Chọn ngày*</label>
          <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} required className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Khung giờ*</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} required className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink">
            <option value="">-- Chọn giờ --</option>
            {BOOK_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Họ và tên*</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nguyễn Văn A" className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink placeholder-ink-3/60" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">SĐT / Zalo*</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="0909 000 000" className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink placeholder-ink-3/60" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Ghi chú tình trạng da (tùy chọn)</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ví dụ: da mụn ẩn lâu năm, da nhạy cảm mẩn đỏ..." className="w-full p-3.5 bg-mist border border-divider rounded-sm text-sm focus:outline-none focus:border-brand-blue text-ink resize-none placeholder-ink-3/60"></textarea>
      </div>
      <button type="submit" className="w-full py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-all shadow-sm">Xác nhận đặt lịch</button>
      <p className="font-sans text-[11px] text-ink-3 text-center">Thanh toán tại chỗ · Không cần đặt cọc online</p>
    </form>
  );
}

function BookingPage() {
  const modes = [
    { icon: 'Message', tag: 'Mode 1', title: 'Tư vấn routine từ xa', desc: 'Nhắn tin cho Lennie qua Messenger hoặc Zalo. Phù hợp khách nội địa và kiều bào — được đọc vị da và theo dõi từ xa.', actions: [['Messenger', '#'], ['Zalo', '#']] },
    { icon: 'Calendar', tag: 'Mode 2', title: 'Đặt lịch tại cơ sở', desc: 'Tự chọn ngày giờ ngay trên website, hoặc liên hệ qua Messenger / Zalo / SĐT. Đội ngũ sẽ xác nhận lại với bạn.', actions: [['Điền form bên dưới', '#booking-form'], ['Gọi SĐT', 'tel:+84909123456']] },
  ];
  return (
    <PageShell active="contact">
      {(api) => (
        <>
          <PageHero
            eyebrow="Đặt lịch"
            title="Bắt đầu hành trình"
            accent="chăm da khoa học."
            intro="Chọn cách phù hợp với bạn: tư vấn từ xa qua Messenger/Zalo, hoặc đặt lịch điều trị trực tiếp tại cơ sở. Lennie sẽ luôn xác nhận lại lịch hẹn trước khi bạn đến."
            crumb={[['Đặt lịch']]}
            img="assets/remix/wellness-spa.png"
          />

          {/* Modes */}
          <section className="bg-white py-16 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {modes.map((m, i) => {
                const I = Icon[m.icon];
                return (
                  <div key={i} className="bg-brand-blue-light border border-divider rounded-md p-8 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-sm"><I size={22} /></span>
                      <span className="font-sans text-[10px] font-extrabold tracking-[0.22em] text-brand-blue uppercase">{m.tag}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-ink">{m.title}</h3>
                    <p className="font-sans text-sm text-ink-2 leading-relaxed flex-1">{m.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      {m.actions.map(([t, h]) => (
                        <a key={t} href={h} className="px-5 py-2.5 bg-white border border-divider text-brand-blue font-sans text-[10px] font-bold tracking-wider uppercase rounded-sm hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">{t}</a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Form + info */}
          <section id="booking-form" className="bg-mist py-16 md:py-20 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <SectionHead eyebrow="Đặt lịch tại cơ sở" title="Chọn ngày giờ" accent="phù hợp với bạn" />
                <div className="mt-8"><BookingForm /></div>
              </div>
              <aside className="lg:col-span-5 space-y-5">
                <h3 className="font-serif text-xl font-semibold text-ink">Hệ thống cơ sở</h3>
                {branches.map((b, i) => (
                  <div key={i} className="bg-white border border-divider rounded-md p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-bold text-ink">{b.name}</h4>
                      <span className="font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase bg-brand-blue-light px-2.5 py-1 rounded-sm">{b.tag}</span>
                    </div>
                    <div className="space-y-2 font-sans text-[13px] text-ink-2">
                      <div className="flex gap-2.5 items-start"><Icon.Pin size={15} className="text-brand-blue shrink-0 mt-0.5" /><span>{b.address} <em className="text-ink-3 not-italic">{b.note}</em></span></div>
                      <div className="flex gap-2.5 items-center"><Icon.Phone size={15} className="text-brand-blue shrink-0" /><span>{b.phone}</span></div>
                      <div className="flex gap-2.5 items-center"><Icon.Clock size={15} className="text-brand-blue shrink-0" /><span>{b.hours}</span></div>
                    </div>
                  </div>
                ))}
              </aside>
            </div>
          </section>
          <CTABand onOpenBooking={() => api.openQuiz()} secondaryHref="services.html" secondary="Xem dịch vụ" title="Chưa biết chọn dịch vụ nào?" accent="Làm phân tích da trước." text="Trả lời vài câu hỏi để nhận gợi ý phác đồ ban đầu, rồi đặt lịch đúng dịch vụ bạn cần." primary="Phân tích da miễn phí" />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<BookingPage />);
