"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import SectionHead from "@/components/chrome/SectionHead";
import FaqAccordion from "@/components/chrome/FaqAccordion";
import CTABand from "@/components/chrome/CTABand";
import ServicesIntro from "@/components/services/ServicesIntro";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import ServicesApproach from "@/components/services/ServicesApproach";

export default function ServicesView({ services, faqs }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="services" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Dịch vụ điều trị"
        title="Liệu trình thiết kế"
        accent="riêng cho làn da bạn."
        intro="Hơn 30 dịch vụ trải khắp 6 nhóm — từ tư vấn phác đồ, điều trị mụn, nám đến trẻ hóa, phục hồi và chăm sóc thư giãn. Mỗi dịch vụ đều bám sát cơ địa và được theo dõi trực tiếp bởi chuyên gia."
        crumb={[["Dịch vụ", null]]}
        img="/assets/remix/model-glow.png"
      />

      <ServicesIntro />
      <ServicesCatalog services={services} onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />
      <ServicesApproach />

      <section className="bg-white py-20 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <SectionHead center eyebrow="Câu hỏi thường gặp" title="Những điều bạn" accent="có thể đang băn khoăn" />
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CTABand onOpenBooking={() => setBookingOpen(true)} secondaryHref="/shop" secondary="Xem sản phẩm" />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
