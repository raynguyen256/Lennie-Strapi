/* ============================================================
   App (Variant B) — centered-logo navbar + softer buttons
   ============================================================ */
const { useState: useStateAppB } = React;

function CartToastB({ show, product }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] transition-all duration-400 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-ink text-white rounded-full pl-2 pr-5 py-2 flex items-center gap-3 shadow-2xl">
        <span className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center text-ink"><Icon.Check size={18} /></span>
        <div className="leading-tight">
          <div className="font-sans text-[11px] font-bold tracking-wide">Đã thêm vào giỏ</div>
          <div className="font-sans text-[10px] text-white/60">{product ? product.name : ''}</div>
        </div>
      </div>
    </div>
  );
}

function FloatingActionsB({ onOpenBooking }) {
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      <a href="#" onClick={(e) => e.preventDefault()} title="Messenger"
        className="w-[52px] h-[52px] rounded-full bg-white border border-divider shadow-lg flex items-center justify-center text-brand-blue hover:-translate-y-0.5 hover:shadow-xl transition-all"><Icon.Message size={22} /></a>
      <button type="button" onClick={onOpenBooking} title="Đặt lịch"
        className="w-[52px] h-[52px] rounded-full bg-brand-blue text-white shadow-lg flex items-center justify-center hover:bg-ink hover:-translate-y-0.5 hover:shadow-xl transition-all"><Icon.Calendar size={22} /></button>
    </div>
  );
}

function AppB() {
  const [quizOpen, setQuizOpen] = useStateAppB(false);
  const [bookingOpen, setBookingOpen] = useStateAppB(false);
  const [cart, setCart] = useStateAppB(0);
  const [toast, setToast] = useStateAppB({ show: false, product: null });

  const addToCart = (p) => {
    setCart((c) => c + 1);
    setToast({ show: true, product: p });
    clearTimeout(window.__toastTB);
    window.__toastTB = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  };

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="home" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} cartCount={cart} />
      <Hero onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />
      <StatsBar />
      <ProductShelf onAddToCart={addToCart} />
      <Services onOpenBooking={() => setBookingOpen(true)} />
      <PartnerMarquee />
      <AboutUsHome />
      <MantraSection />
      <About />
      <Testimonials />
      <Blog />
      <ConsultSection
        id="dang-ky"
        eyebrow="Đăng ký tư vấn"
        title="Khởi đầu hành trình"
        accent="chăm da khoa học ngay."
        intro="Để lại thông tin và tình trạng da của bạn — ThS. DS. Hoàng Hồng Thắm và đội ngũ sẽ tiếp tục tư vấn trực tiếp cùng bạn qua Messenger."
      />
      <QuickFaqSection />
      <Footer />

      <FloatingActionsB onOpenBooking={() => setBookingOpen(true)} />
      <CartToastB show={toast.show} product={toast.product} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<AppB />);
