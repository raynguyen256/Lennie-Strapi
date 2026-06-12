/* ============================================================
   Sections 4 — ContactForm, Footer, QuizModal, BookingModal
   ============================================================ */
const { useState: useState4 } = React;

/* ---------------- CONTACT FORM ---------------- */
function ContactForm() {
  const [form, setForm] = useState4({ name: '', email: '', service: 'recover', branch: 'online', message: '' });
  const [sending, setSending] = useState4(false);
  const [sent, setSent] = useState4(false);
  const submit = (e) => { e.preventDefault(); setSending(true); setTimeout(() => { setSending(false); setSent(true); }, 1200); };
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <section id="booking" className="bg-white py-20 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><Icon.Message size={20} /></div>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-light leading-tight tracking-tight">
              Khởi đầu hành trình<br /><span className="font-semibold">chăm da khoa học ngay.</span>
            </h2>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-sm">
              Liên hệ với chúng tôi bất cứ lúc nào. Đội ngũ chuyên khoa tư vấn của Lennie sẽ phản hồi nhanh chóng trong vòng 24 – 48 giờ làm việc.
            </p>
          </div>
          <div className="relative max-w-sm rounded-md overflow-hidden shadow-sm aspect-video bg-brand-blue-light border border-divider">
            <img src="assets/remix/wellness-spa.png" alt="Lennie therapy" className="w-full h-full object-cover select-none" />
            <div className="absolute top-4 left-4 bg-white/75 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/40">
              <span className="font-sans text-[8px] font-black tracking-widest text-ink uppercase">🛡️ Giữ trọn niềm tin y khoa</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex gap-1 text-brand-blue">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-sm">★</span>)}</div>
            <p className="font-sans text-[11px] font-bold text-ink tracking-wide">Hơn 2.500+ khách hàng tin dùng toàn quốc</p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-brand-blue-light border border-divider p-8 rounded-md shadow-sm">
          {sent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-brand-blue border border-divider"><Icon.MailCheck size={32} /></div>
              <h3 className="font-serif text-2xl font-bold text-ink">Gửi yêu cầu thành công</h3>
              <p className="font-sans text-sm text-ink-2 max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn{form.name ? ', ' + form.name : ''}. ThS. DS. Hoàng Hồng Thắm và đội ngũ y khoa sẽ liên hệ trực tiếp tại {form.email || 'email của bạn'} trong vòng tối đa 48 giờ.
              </p>
              <button type="button" onClick={() => setSent(false)} className="mt-4 px-6 py-2.5 bg-brand-blue hover:bg-ink text-white font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors">Gửi thêm yêu cầu khác</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Họ và tên*</label>
                <input type="text" required value={form.name} onChange={up('name')} placeholder="Nhập họ và tên"
                  className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-gray-400" />
              </div>
              <div className="space-y-1.5">
                <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Địa chỉ Email*</label>
                <input type="email" required value={form.email} onChange={up('email')} placeholder="Nhập email liên hệ"
                  className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-gray-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] font-bold text-ink-2 uppercase tracking-wide">Liệu trình quan tâm*</label>
                  <select value={form.service} onChange={up('service')} className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-xs text-ink">
                    <option value="recover">Chăm sóc phục hồi da mỏng yếu</option>
                    <option value="acne">Trị mụn ẩn &amp; mụn viêm y khoa</option>
                    <option value="pigment">Điều trị sắc tố &amp; sáng tàn nhang</option>
                    <option value="luxury">Phác đồ trẻ hóa Luxury Lennie</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] font-bold text-ink-2 uppercase tracking-wide">Cơ sở mong muốn*</label>
                  <select value={form.branch} onChange={up('branch')} className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue outline-none rounded-sm font-sans text-xs text-ink">
                    <option value="online">Tư vấn từ xa (Online qua Zalo)</option>
                    <option value="hcm">TP. Hồ Chí Minh (Võ Văn Tần, Q.3)</option>
                    <option value="hanoi">Hà Nội Flagship Clinic</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block font-sans text-[10px] font-extrabold tracking-widest text-ink-2 uppercase">Chia sẻ thêm về lịch sử da của bạn?</label>
                <textarea rows={4} value={form.message} onChange={up('message')} placeholder="Ví dụ: đang dùng retinol, bị kích ứng đỏ da..."
                  className="w-full px-4 py-3 bg-white border border-divider focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none rounded-sm font-sans text-sm text-ink placeholder-gray-400 resize-none"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={sending}
                  className="w-full sm:w-auto px-10 py-4 bg-brand-blue hover:bg-ink disabled:opacity-70 text-white font-sans text-[10px] font-bold tracking-[0.22em] uppercase rounded-sm transition-all shadow-md">
                  {sending ? 'Đang gửi thông tin...' : 'Gửi yêu cầu tư vấn'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const [email, setEmail] = useState4('');
  const [sub, setSub] = useState4(false);
  const go = (e) => { e.preventDefault(); if (!email) return; setSub(true); setTimeout(() => { setEmail(''); setSub(false); }, 4000); };
  return (
    <footer className="bg-light-bg text-ink-2 pt-20 pb-10 border-t border-divider font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <img src="assets/logo-lennie.png" alt="Lennie SkinLab" className="h-12 w-auto" />
            <p className="text-sm text-ink-2 leading-relaxed max-w-sm">
              Lennie SkinLab tin vào sức mạnh chữa lành của y học lâm sàng và dược mỹ phẩm chọn lọc độc quyền. Chúng tôi đồng hành trao gửi làn da khỏe mạnh nguyên bản nhất cho bạn.
            </p>
            <div className="flex gap-2.5">
              {['Fb', 'Ig', 'Zl', 'Tk'].map((s) => (
                <div key={s} className="w-9 h-9 rounded-full bg-white hover:bg-brand-blue hover:text-white border border-divider flex items-center justify-center text-xs font-bold uppercase transition-colors cursor-pointer text-brand-blue select-none">{s}</div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Khám phá</h4>
            <div className="flex flex-col gap-3 text-sm">
              {[['Về chúng tôi', '#about'], ['Dịch vụ điều trị', '#services'], ['Sản phẩm điều trị', '#essential-care'], ['Kết quả', '#testimonials'], ['Thư viện da liễu', '#blog']].map(([t, h]) => (
                <a key={h} href={h} className="hover:text-brand-blue transition-colors text-ink-2">{t}</a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Nhận tin tức</h4>
            <p className="text-sm text-ink-2 leading-relaxed">Đăng ký để nhận kiến thức chăm da khoa học &amp; ưu đãi dịch vụ mới nhất từ Lennie SkinLab.</p>
            <form onSubmit={go} className="relative mt-4">
              <input type="email" placeholder="Địa chỉ Email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-white border border-divider rounded p-3 pr-12 text-sm text-ink placeholder-[#6F8CA8] focus:outline-none focus:border-brand-blue" />
              <button type="submit" aria-label="Đăng ký" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue hover:bg-ink text-white rounded transition-colors"><Icon.ArrowR size={14} /></button>
            </form>
            {sub && <div className="flex items-center gap-1.5 text-sm text-brand-blue pt-1 font-semibold"><Icon.Check size={16} /><span>Đăng ký thành công!</span></div>}
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-ink">Liên hệ</h4>
            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex gap-2.5 items-start"><span className="text-brand-blue shrink-0 mt-0.5"><Icon.Pin size={16} /></span><span className="text-ink-2 leading-snug">Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</span></div>
              <div className="flex gap-2.5 items-center"><span className="text-brand-blue"><Icon.Phone size={16} /></span><span className="text-ink-2">+84 909 123 456</span></div>
              <div className="flex gap-2.5 items-start"><span className="text-brand-blue shrink-0 mt-0.5"><Icon.Clock size={16} /></span><span className="text-ink-2 leading-snug">Thứ 2 – Thứ 7<br />8:00 – 20:00 (Nghỉ Chủ Nhật)</span></div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-divider flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] md:text-xs">
          <span>© 2026 Lennie SkinLab · ThS. DS. Hoàng Hồng Thắm. Bảo lưu mọi quyền.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-blue transition-colors">Chính sách bảo mật</a><span>•</span>
            <a href="#" className="hover:text-brand-blue transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- QUIZ MODAL ---------------- */
function QuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState4(0);
  const [answers, setAnswers] = useState4({});
  const [analyzing, setAnalyzing] = useState4(false);
  const [result, setResult] = useState4(null);
  if (!isOpen) return null;
  const q = quizQuestions[step];
  const answered = answers[q.key] && answers[q.key].trim() !== '';
  const pick = (k, v) => setAnswers((p) => ({ ...p, [k]: v }));
  const next = () => {
    if (step < quizQuestions.length - 1) setStep(step + 1);
    else { setAnalyzing(true); setTimeout(() => { setResult(generateRoutine(answers)); setAnalyzing(false); }, 1800); }
  };
  const reset = () => { setAnswers({}); setStep(0); setResult(null); setAnalyzing(false); };
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10"><Icon.X size={20} /></button>
        <div className="p-6 md:p-8">
          {analyzing && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
                <span className="text-brand-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"><Icon.Sparkles size={24} /></span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Đang phân tích cấu trúc da...</h3>
              <p className="font-sans text-xs text-ink-3 max-w-xs">Thuật toán của Dược sĩ Thắm đang lập phác đồ tối ưu riêng cho bạn.</p>
            </div>
          )}

          {!analyzing && result && (
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-divider">
                <div className="w-12 h-12 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-3"><Icon.Shield size={24} /></div>
                <h3 className="font-serif text-2xl font-semibold text-ink">Phác đồ đề xuất cho {result.customerName}</h3>
                <p className="font-sans text-[11px] text-brand-teal font-semibold tracking-wider uppercase mt-1">Chẩn đoán Lennie SkinLab</p>
              </div>
              <div className="bg-mist p-5 rounded-lg border border-divider">
                <h4 className="font-sans text-xs font-bold text-ink tracking-widest uppercase mb-2 flex items-center gap-2"><span className="text-brand-blue"><Icon.Droplet size={14} /></span>Đọc vị da</h4>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">{result.skinAnalysis}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 border border-divider rounded-lg">
                  <h5 className="font-sans text-xs font-bold text-brand-teal tracking-widest uppercase mb-3 flex items-center gap-2"><Icon.Sun size={16} />Buổi sáng (AM)</h5>
                  <ul className="space-y-2.5">{result.morningSteps.map((s, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs text-ink-2"><span className="w-5 h-5 rounded-full bg-brand-blue-light text-brand-blue font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{i + 1}</span><span>{s}</span></li>
                  ))}</ul>
                </div>
                <div className="bg-white p-4 border border-divider rounded-lg">
                  <h5 className="font-sans text-xs font-bold text-brand-blue tracking-widest uppercase mb-3 flex items-center gap-2"><Icon.Heart size={16} />Buổi tối (PM)</h5>
                  <ul className="space-y-2.5">{result.eveningSteps.map((s, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs text-ink-2"><span className="w-5 h-5 rounded-full bg-brand-blue-light text-brand-blue font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{i + 1}</span><span>{s}</span></li>
                  ))}</ul>
                </div>
              </div>
              <div className="bg-brand-blue-light/60 p-4 border-l-4 border-brand-blue rounded-r">
                <p className="font-sans text-xs text-brand-blue font-medium leading-relaxed italic">{result.expertAdvice}</p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-divider">
                <button type="button" onClick={reset} className="flex-1 py-3 border border-brand-blue text-brand-blue font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-blue-light transition-colors">Làm lại</button>
                <button type="button" onClick={() => { onClose(); const el = document.getElementById('about'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="flex-1 py-3 bg-brand-blue text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-ink shadow transition-colors">Gặp chuyên gia</button>
              </div>
            </div>
          )}

          {!analyzing && !result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-3 tracking-wider"><span>Khám phá làn da cùng Lennie</span><span>Câu {step + 1} / {quizQuestions.length}</span></div>
              <div className="w-full bg-light-bg h-1 rounded-full overflow-hidden"><div className="bg-brand-blue h-full transition-all duration-300" style={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }}></div></div>
              <div className="py-2">
                <h3 className="font-serif text-xl md:text-2xl text-ink font-semibold leading-snug mb-8">{q.question}</h3>
                {q.type === 'select' && (
                  <div className="space-y-3">{q.options.map((opt) => {
                    const sel = answers[q.key] === opt;
                    return (
                      <button key={opt} type="button" onClick={() => pick(q.key, opt)}
                        className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm font-sans flex items-center justify-between transition-all ${sel ? 'bg-brand-blue-light border-brand-teal text-brand-blue font-semibold' : 'border-divider hover:border-brand-blue hover:bg-mist text-ink-2'}`}>
                        <span>{opt}</span>
                        {sel && <span className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0"><Icon.Check size={12} /></span>}
                      </button>
                    );
                  })}</div>
                )}
                {q.type === 'input' && (
                  <div className="relative">
                    <span className="text-ink-3 absolute left-4 top-1/2 -translate-y-1/2"><Icon.User size={20} /></span>
                    <input type="text" placeholder={q.placeholder} value={answers[q.key] || ''} onChange={(e) => pick(q.key, e.target.value)}
                      className="w-full p-4 pl-12 bg-mist border border-divider rounded-lg font-sans text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-ink" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-divider gap-4">
                <button type="button" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
                  className={`inline-flex items-center gap-1 font-sans text-[11px] font-bold tracking-wider uppercase py-2.5 ${step === 0 ? 'text-ink-3/40 cursor-not-allowed' : 'text-ink-3 hover:text-brand-blue'}`}><Icon.ChevronL size={16} />Quay lại</button>
                <button type="button" onClick={next} disabled={!answered}
                  className={`inline-flex items-center gap-1 px-6 py-2.5 font-sans text-[11px] font-extrabold tracking-wider uppercase rounded shadow-sm ${answered ? 'bg-brand-blue hover:bg-ink text-white' : 'bg-divider text-ink-3/50 cursor-not-allowed'}`}>
                  {step === quizQuestions.length - 1 ? 'Xem kết quả' : 'Tiếp theo'}<Icon.ChevronR size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- BOOKING MODAL ---------------- */
const TIME_SLOTS = ['08:30', '10:00', '11:15', '13:30', '14:45', '16:00', '17:15', '18:45'];
function BookingModal({ isOpen, onClose }) {
  const [service, setService] = useState4(servicesForBooking[0].id);
  const [date, setDate] = useState4('');
  const [time, setTime] = useState4('');
  const [name, setName] = useState4('');
  const [phone, setPhone] = useState4('');
  const [notes, setNotes] = useState4('');
  const [booked, setBooked] = useState4(false);
  if (!isOpen) return null;
  const submit = (e) => { e.preventDefault(); if (!date || !time || !name || !phone) return; setBooked(true); };
  const reset = () => { setService(servicesForBooking[0].id); setDate(''); setTime(''); setName(''); setPhone(''); setNotes(''); setBooked(false); };
  const sName = servicesForBooking.find((s) => s.id === service)?.name || '';
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10"><Icon.X size={20} /></button>
        <div className="p-6 md:p-8">
          {booked ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center mx-auto"><Icon.CheckCircle size={40} /></div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-ink">Đặt lịch thành công!</h3>
                <p className="font-sans text-xs text-ink-3 mt-1.5">Lennie SkinLab sẽ liên hệ qua Zalo/SĐT để xác nhận lịch hẹn.</p>
              </div>
              <div className="bg-mist p-6 rounded-lg text-left border border-divider space-y-3 text-xs text-ink-2">
                <div className="flex items-center gap-2"><span className="text-brand-blue"><Icon.Clipboard size={16} /></span><strong>Dịch vụ:</strong> {sName}</div>
                <div className="flex items-center gap-2"><span className="text-brand-blue"><Icon.Calendar size={16} /></span><strong>Ngày hẹn:</strong> {date}</div>
                <div className="flex items-center gap-2"><span className="text-brand-blue"><Icon.Clock size={16} /></span><strong>Giờ hẹn:</strong> {time}</div>
                <div className="flex items-center gap-2"><span className="text-brand-blue"><Icon.User size={16} /></span><strong>Khách hàng:</strong> {name}</div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={reset} className="flex-1 py-3 border border-brand-blue text-brand-blue font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-blue-light transition-colors">Đặt lịch khác</button>
                <button type="button" onClick={onClose} className="flex-1 py-3 bg-brand-blue text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-ink shadow transition-colors">Hoàn tất</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="text-center pb-2 border-b border-divider">
                <span className="inline-block font-sans text-[10px] font-bold tracking-[0.3em] text-brand-teal uppercase">Đặt lịch dịch vụ</span>
                <h3 className="font-serif text-2xl font-semibold text-ink mt-2">Lennie SkinLab Clinic</h3>
                <p className="font-sans text-xs text-ink-3">Phục hồi da bằng phác đồ cá nhân hóa</p>
              </div>
              <div className="space-y-1.5">
                <label className="block font-sans text-[11px] font-bold tracking-wider text-ink-2 uppercase">Dịch vụ điều trị</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-3.5 bg-mist border border-divider rounded font-sans text-sm text-ink-2 focus:outline-none focus:border-brand-blue">
                  {servicesForBooking.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.price}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 relative">
                  <label className="block text-[11px] font-bold tracking-wider text-ink-2 uppercase">Chọn ngày hẹn</label>
                  <div className="relative">
                    <span className="text-ink-3 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><Icon.Calendar size={16} /></span>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={today} className="w-full p-3.5 pl-10 bg-mist border border-divider rounded text-xs focus:outline-none focus:border-brand-blue text-ink" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-ink-2 uppercase">Chọn khung giờ</label>
                  <select value={time} onChange={(e) => setTime(e.target.value)} required className="w-full p-3.5 bg-mist border border-divider rounded text-xs focus:outline-none focus:border-brand-blue text-ink">
                    <option value="">-- Chọn giờ hẹn --</option>
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 relative">
                  <label className="block text-[11px] font-bold tracking-wider text-ink-2 uppercase">Họ và tên</label>
                  <div className="relative">
                    <span className="text-ink-3 absolute left-3 top-1/2 -translate-y-1/2"><Icon.User size={16} /></span>
                    <input type="text" placeholder="Nguyễn Văn A" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3.5 pl-10 bg-mist border border-divider rounded text-xs focus:outline-none focus:border-brand-blue text-ink" />
                  </div>
                </div>
                <div className="space-y-1.5 relative">
                  <label className="block text-[11px] font-bold tracking-wider text-ink-2 uppercase">SĐT / Zalo</label>
                  <div className="relative">
                    <span className="text-ink-3 absolute left-3 top-1/2 -translate-y-1/2"><Icon.Phone size={16} /></span>
                    <input type="tel" placeholder="0909000000" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3.5 pl-10 bg-mist border border-divider rounded text-xs focus:outline-none focus:border-brand-blue text-ink" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 relative">
                <label className="block text-[11px] font-bold tracking-wider text-ink-2 uppercase">Ghi chú tình trạng da (Tùy chọn)</label>
                <div className="relative">
                  <span className="text-ink-3 absolute left-3 top-[18px]"><Icon.Message size={16} /></span>
                  <textarea rows={3} placeholder="Ví dụ: Da mụn ẩn lâu năm, da nhạy cảm mẩn đỏ..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3.5 pl-10 bg-mist border border-divider rounded text-xs focus:outline-none focus:border-brand-blue text-ink resize-none"></textarea>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t border-divider">
                <button type="button" onClick={onClose} className="flex-1 py-3 border border-brand-blue text-brand-blue font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-blue-light transition-colors">Hủy bỏ</button>
                <button type="submit" className="flex-1 py-3.5 bg-brand-blue text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-ink shadow transition-colors">Xác nhận đặt lịch</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ContactForm, Footer, QuizModal, BookingModal });
