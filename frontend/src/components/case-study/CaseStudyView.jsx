"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import CTABand from "@/components/chrome/CTABand";
import RichText from "@/components/chrome/RichText";
import { Icon } from "@/lib/icons";

function CaseDetailModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10">
          <Icon.X size={20} />
        </button>
        <div className="grid grid-cols-2">
          <div className="relative aspect-square bg-brand-blue-light overflow-hidden">
            {item.beforeImg && <img src={item.beforeImg} alt="Trước" className="w-full h-full object-cover" />}
            <span className="absolute bottom-3 left-3 bg-ink/80 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">Trước</span>
          </div>
          <div className="relative aspect-square bg-brand-blue-light overflow-hidden">
            {item.afterImg && <img src={item.afterImg} alt="Sau" className="w-full h-full object-cover" />}
            <span className="absolute bottom-3 left-3 bg-brand-blue/90 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">Sau {item.timeframe}</span>
          </div>
        </div>
        <div className="p-7 md:p-8 space-y-5">
          {item.resultType && <span className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-brand-teal">{item.resultType}</span>}
          <h3 className="font-serif text-2xl text-ink font-semibold leading-snug">{item.title}</h3>
          {item.skinConcerns?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.skinConcerns.map((c) => (
                <span key={c} className="font-sans text-[11px] font-semibold text-brand-blue bg-brand-blue-light border border-divider px-3 py-1 rounded-full">
                  {c}
                </span>
              ))}
            </div>
          )}
          {item.caseSummary && <p className="font-sans text-sm text-ink-2 leading-relaxed">{item.caseSummary}</p>}
          {item.treatmentSteps && (
            <div className="pt-4 border-t border-divider space-y-2">
              <h4 className="font-sans text-[11px] font-bold tracking-widest uppercase text-ink">Phác đồ điều trị</h4>
              <div className="font-sans text-sm text-ink-2 leading-relaxed">
                <RichText content={item.treatmentSteps} />
              </div>
            </div>
          )}
          {item.disclaimer && (
            <p className="font-sans text-[11px] text-ink-3 italic pt-3 border-t border-divider leading-relaxed">{item.disclaimer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CaseCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group bg-white border border-divider rounded-md overflow-hidden text-left hover:shadow-[0_18px_50px_rgba(44,74,111,.12)] hover:border-brand-blue/40 transition-all"
    >
      <div className="grid grid-cols-2 relative">
        <div className="relative aspect-square bg-brand-blue-light overflow-hidden">
          {item.beforeImg && <img src={item.beforeImg} alt="Trước" className="w-full h-full object-cover" />}
          <span className="absolute bottom-2 left-2 bg-ink/80 text-white text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">Trước</span>
        </div>
        <div className="relative aspect-square bg-brand-blue-light overflow-hidden">
          {item.afterImg && <img src={item.afterImg} alt="Sau" className="w-full h-full object-cover" />}
          <span className="absolute bottom-2 left-2 bg-brand-blue/90 text-white text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">Sau</span>
        </div>
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors pointer-events-none" />
      </div>
      <div className="p-5 space-y-1.5">
        {item.resultType && <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal">{item.resultType}</span>}
        <h3 className="font-serif text-[16px] font-medium text-ink leading-snug group-hover:text-brand-blue transition-colors">{item.title}</h3>
        {item.timeframe && <p className="font-sans text-[11px] text-[#6F8CA8]">Kết quả sau {item.timeframe}</p>}
      </div>
    </button>
  );
}

export default function CaseStudyView({ content }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [active, setActive] = useState(null);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="case-study" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Case Study"
        title="Câu chuyện"
        accent="khách hàng."
        intro={content.intro}
        crumb={[["Case Study", null]]}
        img="/assets/remix/clinic-treatment.png"
      />

      <section className="bg-white py-16 md:py-20 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6">
          {content.items?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.items.map((item) => (
                <CaseCard key={item.id} item={item} onOpen={setActive} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-2xl text-ink mb-2">Chưa có case study nào</p>
              <p className="font-sans text-sm text-ink-2">Lennie đang cập nhật thêm các câu chuyện thực tế tại đây.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand-blue-light py-16 md:py-20 border-b border-divider">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-5">
          <p className="font-serif text-xl md:text-2xl text-ink font-light leading-relaxed italic">&quot;{content.cta}&quot;</p>
        </div>
      </section>

      <CTABand onOpenBooking={() => setBookingOpen(true)} secondaryHref="/contact" secondary="Liên hệ Lennie" />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <CaseDetailModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
