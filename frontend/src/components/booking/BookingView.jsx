"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import SectionHead from "@/components/chrome/SectionHead";
import CTABand from "@/components/chrome/CTABand";
import BranchesList from "@/components/chrome/BranchesList";
import BookingModes from "@/components/booking/BookingModes";
import BookingForm from "@/components/booking/BookingForm";
import { Icon } from "@/lib/icons";

export default function BookingView({ content }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="contact" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Đặt lịch"
        title="Bắt đầu hành trình"
        accent="chăm da khoa học."
        intro="Chọn cách phù hợp với bạn: tư vấn từ xa qua Messenger/Zalo, hoặc đặt lịch điều trị trực tiếp tại cơ sở. Lennie sẽ luôn xác nhận lại lịch hẹn trước khi bạn đến."
        crumb={[["Đặt lịch", null]]}
        img="/assets/remix/wellness-spa.png"
      />

      <BookingModes messengerUrl={content.messengerUrl} zaloUrl={content.zaloUrl} hotline={content.hotline} />

      <section className="bg-white py-16 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="space-y-3">
            <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-sm uppercase">Gợi ý nhanh</span>
            <h2 className="font-serif text-3xl md:text-[40px] text-ink font-light leading-tight tracking-tight">
              Chọn <span className="font-semibold italic text-brand-blue">dịch vụ</span> bạn quan tâm
            </h2>
            <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-xl">Bạn cũng có thể bỏ qua bước này và để đội ngũ Lennie tư vấn dịch vụ phù hợp nhất với tình trạng da của bạn.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.services.map((s) => {
              const active = selected?.slug === s.slug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setSelected(active ? null : s)}
                  className={`text-left p-6 rounded-md border transition-all flex flex-col gap-3 ${
                    active ? "border-brand-blue bg-brand-blue-light shadow-sm" : "border-divider bg-white hover:border-brand-blue/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {s.category && <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal">{s.category}</span>}
                    <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${active ? "bg-brand-blue border-brand-blue text-white" : "border-divider text-transparent"}`}>
                      <Icon.Check size={13} />
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-ink leading-snug">{s.title}</h3>
                  <span className="font-serif text-base font-bold text-brand-blue mt-auto">{s.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="booking-form" className="bg-mist py-16 md:py-20 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Đặt lịch tại cơ sở" title="Chọn ngày giờ" accent="phù hợp với bạn" />
            <div className="mt-8">
              <BookingForm services={content.services} branches={content.branches} defaultService={selected?.slug} />
            </div>
          </div>
          <aside className="lg:col-span-5 space-y-5">
            <h3 className="font-serif text-xl font-semibold text-ink">Hệ thống cơ sở</h3>
            <BranchesList branches={content.branches} />
          </aside>
        </div>
      </section>

      <CTABand
        onOpenBooking={() => setQuizOpen(true)}
        secondaryHref="/services"
        secondary="Xem dịch vụ"
        title="Chưa biết chọn dịch vụ nào?"
        accent="Làm phân tích da trước."
        text="Trả lời vài câu hỏi để nhận gợi ý phác đồ ban đầu, rồi đặt lịch đúng dịch vụ bạn cần."
        primary="Phân tích da miễn phí"
      />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
