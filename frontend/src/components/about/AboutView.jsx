"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import SocialRail from "@/components/chrome/SocialRail";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import StatStrip from "@/components/chrome/StatStrip";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import CTABand from "@/components/chrome/CTABand";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutFounder from "@/components/about/AboutFounder";
import AboutTeam from "@/components/about/AboutTeam";

export default function AboutView({ content }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="about" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Về chúng tôi"
        title="Chăm da theo triết lý"
        accent="cá nhân hóa."
        intro="Lennie SkinLab — thương hiệu dược mỹ phẩm trị liệu, nơi mỗi làn da được đọc vị chuyên sâu và xây dựng phác đồ riêng, theo dõi trực tiếp bởi ThS. DS. Hoàng Hồng Thắm."
        crumb={[["Về chúng tôi", null]]}
        img="/assets/remix/herb-mix.png"
      />

      <AboutStory />
      <StatStrip />
      <AboutValues brandValues={content.brandValues} />
      <AboutFounder founder={content.founder} founderTimeline={content.founderTimeline} />
      <AboutTeam team={content.team} />
      <PartnerMarquee brands={content.partnerBrands} label="Hợp tác ủy quyền cùng 50+ thương hiệu dược mỹ phẩm quốc tế" />
      <CTABand onOpenBooking={() => setBookingOpen(true)} />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <SocialRail />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
