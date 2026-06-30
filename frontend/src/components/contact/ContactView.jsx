"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import SocialRail from "@/components/chrome/SocialRail";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import SectionHead from "@/components/chrome/SectionHead";
import CTABand from "@/components/chrome/CTABand";
import BranchesList from "@/components/chrome/BranchesList";
import FaqAccordion from "@/components/chrome/FaqAccordion";
import ConsultForm from "@/components/chrome/ConsultForm";
import ContactQuickChannels from "@/components/contact/ContactQuickChannels";
import { Icon } from "@/lib/icons";

export default function ContactView({ content }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const socials = [
    { label: "Fb", url: content.facebookUrl },
    { label: "Ig", url: content.instagramUrl },
    { label: "Tk", url: content.tiktokUrl },
  ].filter((s) => s.url);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="contact" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Liên hệ"
        title="Lennie luôn ở đây"
        accent="để lắng nghe bạn."
        intro="Có câu hỏi về làn da, dịch vụ hay sản phẩm? Gửi lời nhắn cho chúng tôi — đội ngũ chuyên môn sẽ phản hồi trong vòng 24 – 48 giờ làm việc."
        crumb={[["Liên hệ", null]]}
        img="/assets/remix/clinic-treatment.png"
      />

      <ContactQuickChannels messengerUrl={content.messengerUrl} hotline={content.hotline} email={content.email} />

      <section className="bg-mist py-16 md:py-20 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <SectionHead eyebrow="Gửi lời nhắn" title="Bắt đầu một" accent="cuộc trò chuyện" intro="Điền thông tin và Lennie sẽ liên hệ lại. Phản hồi trong 24 – 48 giờ làm việc." />
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="flex gap-0.5 text-brand-blue">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon.Star key={i} size={15} fill="#5789B7" stroke="#5789B7" />
                  ))}
                </span>
                <span className="font-sans text-[12px] font-bold text-ink">Hơn 2.500+ khách hàng tin dùng toàn quốc</span>
              </div>
              <div className="relative rounded-md overflow-hidden border border-divider aspect-video bg-brand-blue-light max-w-sm">
                <img src="/assets/remix/wellness-spa.png" alt="Lennie clinic" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/40">
                  <span className="font-sans text-[8px] font-black tracking-widest text-ink uppercase">🛡️ Giữ trọn niềm tin y khoa</span>
                </div>
              </div>
              {socials.length > 0 && (
                <div className="flex gap-2.5 pt-1">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white hover:bg-brand-blue hover:text-white border border-divider flex items-center justify-center text-xs font-bold uppercase transition-colors text-brand-blue"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-7 bg-brand-blue-light border border-divider p-7 md:p-9 rounded-md shadow-sm">
            <ConsultForm buttonLabel="Gửi yêu cầu tư vấn" source="contact-page" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <SectionHead eyebrow="Hệ thống cơ sở" title="Ghé thăm" accent="Lennie SkinLab" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <BranchesList branches={content.branches} variant="light" />
            <a href={content.mapsUrl} target="_blank" rel="noopener noreferrer" className="group relative block h-full min-h-[360px] rounded-md overflow-hidden border border-divider bg-brand-blue-light">
              <img src="/assets/remix/clinic-treatment.png" alt="Bản đồ Lennie SkinLab" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
                <span className="font-sans text-sm font-semibold text-white leading-snug max-w-xs">{content.address}</span>
                <span className="shrink-0 px-5 py-3 bg-white text-ink font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm flex items-center gap-2 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Icon.Pin size={14} />
                  Xem bản đồ
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-light py-16 md:py-20 border-b border-divider">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          <SectionHead center eyebrow="Câu hỏi thường gặp" title="Giải đáp" accent="nhanh cho bạn" />
          <FaqAccordion items={content.faqs} />
        </div>
      </section>

      <CTABand onOpenBooking={() => setBookingOpen(true)} secondaryHref="/services" />

      <Footer facebookUrl={content.facebookUrl} instagramUrl={content.instagramUrl} tiktokUrl={content.tiktokUrl} zaloUrl={content.zaloUrl} />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} messengerUrl={content.messengerUrl} />
      <SocialRail />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
