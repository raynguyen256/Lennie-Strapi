"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import SocialRail from "@/components/chrome/SocialRail";
import CartToast from "@/components/chrome/CartToast";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import ConsultSection from "@/components/chrome/ConsultSection";
import QuickFaqSection from "@/components/chrome/QuickFaqSection";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ProductShelf from "@/components/home/ProductShelf";
import Services from "@/components/home/Services";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import AboutUsHome from "@/components/home/AboutUsHome";
import MantraSection from "@/components/home/MantraSection";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";
import { CartStore } from "@/lib/cart";

export default function HomeView({ content }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, product: null });

  const addToCart = (p) => {
    CartStore.add(p);
    setToast({ show: true, product: p });
    clearTimeout(window.__toastTB);
    window.__toastTB = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  };

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="home" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />
      <Hero hero={content.hero} onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />
      <StatsBar stats={content.stats} />
      <ProductShelf products={content.products} categoryTags={content.productTags} onAddToCart={addToCart} />
      <Services slides={content.servicesSlides} onOpenBooking={() => setBookingOpen(true)} />
      <PartnerMarquee brands={content.partnerBrands} />
      <AboutUsHome />
      <MantraSection cards={content.mantraCards} />
      <About founder={content.founder} team={content.teamData} />
      <Testimonials reviews={content.reviewsData} />
      <Blog />
      <ConsultSection
        id="dang-ky"
        eyebrow="Đăng ký tư vấn"
        title="Khởi đầu hành trình"
        accent="chăm da khoa học ngay."
        intro="Để lại thông tin và tình trạng da của bạn — ThS. DS. Hoàng Hồng Thắm và đội ngũ sẽ tiếp tục tư vấn trực tiếp cùng bạn qua Messenger."
      />
      <QuickFaqSection faqs={content.faqs} />
      <Footer />

      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <SocialRail />
      <CartToast show={toast.show} product={toast.product} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
