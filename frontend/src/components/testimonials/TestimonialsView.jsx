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
import StatStrip from "@/components/chrome/StatStrip";
import TestimonialsFeaturedQuote from "@/components/testimonials/TestimonialsFeaturedQuote";
import TrustChannels from "@/components/testimonials/TrustChannels";
import { useReveal } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

export default function TestimonialsView({ reviews }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [ref, shown] = useReveal();
  const featured = reviews[1] || reviews[0];

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="testimonials" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Đánh giá khách hàng"
        title="Người thật, việc thật,"
        accent="làn da thật."
        intro="Hơn 1.200 khách hàng đã đồng hành cùng Lennie SkinLab. Đây là những câu chuyện phục hồi thực tế — không phóng đại, không hứa hẹn tuyệt đối."
        crumb={[["Đánh giá khách hàng", null]]}
        img="/assets/remix/model-glow.png"
      />

      <StatStrip />

      <TestimonialsFeaturedQuote review={featured} />

      <section className="bg-brand-blue-light py-20 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <SectionHead
            center
            eyebrow="Nhật ký đồng hành"
            title="Cảm nhận từ"
            accent="khách hàng Lennie"
            intro="Rê chuột vào mỗi thẻ để lật xem ảnh minh họa biến đổi da Trước — Sau và nhận định chuyên môn."
          />
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className={`reveal-card flip-card w-full max-w-[345px] h-[390px] cursor-pointer ${shown ? "is-in" : ""}`}
                style={{ transitionDelay: shown ? `${idx * 100}ms` : "0ms" }}
              >
                <div className="flip-inner relative w-full h-full">
                  <div className="flip-face absolute inset-0 bg-white text-ink rounded-md p-6 flex flex-col justify-between border border-divider shadow-sm">
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {Array.from({ length: r.stars }).map((_, i) => (
                          <Icon.Star key={i} size={14} className="text-brand-blue" fill="#5789B7" stroke="#5789B7" />
                        ))}
                      </div>
                      <p className="font-sans text-xs text-ink-2 leading-relaxed font-light italic">{r.text}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-divider mt-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-blue-light border border-divider shrink-0">
                        <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans text-[11px] font-bold tracking-wider uppercase text-ink">{r.name}</h4>
                        <p className="font-sans text-[9px] text-brand-blue tracking-wider uppercase">🩺 {r.caseType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flip-face flip-back absolute inset-0 bg-white text-ink rounded-md p-5 flex flex-col justify-between border border-divider shadow-md">
                    <div className="text-center pb-2 border-b border-divider">
                      <span className="font-sans text-[9px] font-bold tracking-wider text-brand-blue uppercase block">Kết quả điều trị thực tế</span>
                      <h4 className="font-serif text-[13px] font-bold text-ink mt-0.5">{r.improvement}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 py-3 h-44">
                      <div className="relative rounded overflow-hidden border border-red-100 flex flex-col justify-end">
                        <img src={r.img} alt="Trước" className="w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(.75) contrast(1.12) saturate(1.4) hue-rotate(340deg)" }} />
                        <div className="absolute inset-0 bg-red-800/10"></div>
                        <div className="relative z-10 bg-red-900/80 backdrop-blur-sm text-white py-1 text-center font-bold">
                          <span className="block text-[8px] tracking-wider">TRƯỚC</span>
                          <span className="block text-[7px] text-red-200 capitalize tracking-tight font-light">{r.beforeState}</span>
                        </div>
                      </div>
                      <div className="relative rounded overflow-hidden border border-emerald-100 flex flex-col justify-end">
                        <img src={r.img} alt="Sau" className="w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(1.08) contrast(.96) saturate(1.05)" }} />
                        <div className="absolute inset-0 bg-sky-400/5"></div>
                        <div className="relative z-10 bg-brand-blue/90 backdrop-blur-sm text-white py-1 text-center font-bold">
                          <span className="block text-[8px] tracking-wider">SAU {r.duration}</span>
                          <span className="block text-[7px] text-emerald-100 capitalize tracking-tight font-light">{r.afterState}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2.5 border-t border-divider text-center">
                      <p className="font-sans text-[10px] text-brand-blue leading-tight italic font-medium">&quot;Nhận định: {r.expertNote}&quot;</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-[11px] text-ink-3 italic">⚠ Ảnh Trước — Sau là minh họa hiệu ứng; client sẽ thay bằng ảnh thực tế (có đồng ý của khách).</p>
        </div>
      </section>

      <TrustChannels />

      <CTABand
        onOpenBooking={() => setBookingOpen(true)}
        title="Sẵn sàng viết câu chuyện da"
        accent="của riêng bạn?"
        text="Đặt lịch đọc vị làn da cùng ThS. DS. Hoàng Hồng Thắm và bắt đầu hành trình phục hồi đúng cách."
      />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
