"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import SocialRail from "@/components/chrome/SocialRail";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import CTABand from "@/components/chrome/CTABand";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogList from "@/components/blog/BlogList";

export default function BlogView({ posts }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="blog" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Blog · Kiến thức da liễu"
        title="Đọc để hiểu"
        accent="làn da của mình."
        intro="Kiến thức chăm da khoa học, phân tích hoạt chất và những câu chuyện phục hồi thật — chia sẻ bởi đội ngũ chuyên môn Lennie SkinLab."
        crumb={[["Blog", null]]}
        img="/assets/remix/wellness-spa.png"
      />

      <BlogFeaturedCard post={featured} />

      <BlogList posts={rest} />

      <CTABand
        onOpenBooking={() => setBookingOpen(true)}
        title="Muốn được tư vấn riêng cho da bạn?"
        accent="Đừng chỉ đọc — hãy bắt đầu."
        text="Kiến thức là khởi đầu. Đặt lịch đọc vị làn da hoặc làm phân tích da miễn phí để có phác đồ phù hợp với chính bạn."
        secondaryHref="/services"
        secondary="Xem dịch vụ"
      />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <SocialRail />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
