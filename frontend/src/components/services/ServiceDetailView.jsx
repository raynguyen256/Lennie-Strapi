"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import SocialRail from "@/components/chrome/SocialRail";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import DetailHero from "@/components/chrome/DetailHero";
import SectionHead from "@/components/chrome/SectionHead";
import FaqAccordion from "@/components/chrome/FaqAccordion";
import RichText from "@/components/chrome/RichText";
import ConsultSection from "@/components/chrome/ConsultSection";
import CTABand from "@/components/chrome/CTABand";
import ServiceForWhomProblems from "@/components/services/ServiceForWhomProblems";
import ServiceSteps from "@/components/services/ServiceSteps";
import ServiceIncludesResults from "@/components/services/ServiceIncludesResults";
import ServiceBookingSidebar from "@/components/services/ServiceBookingSidebar";
import RelatedServices from "@/components/services/RelatedServices";
import { Icon } from "@/lib/icons";

export default function ServiceDetailView({ service }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="services" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <DetailHero
        img={service.img}
        crumb={[
          ["Dịch vụ", "/services"],
          ["Chi tiết", null],
        ]}
        badge={{ icon: service.categoryIcon, label: service.category }}
        title={service.title}
        tagline={service.tagline}
      >
        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex items-center gap-2 text-white/85 font-sans text-[13px] font-semibold">
            <Icon.Clock size={16} className="text-brand-teal" />
            {service.duration}
          </div>
          <div className="flex items-center gap-2 text-white/85 font-sans text-[13px] font-semibold">
            <Icon.Award size={16} className="text-brand-teal" />
            Theo dõi trực tiếp bởi Founder
          </div>
        </div>
      </DetailHero>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-14">
            <ServiceForWhomProblems summary={service.intro} forWhom={service.forWhom} problems={service.problems} />
            {service.body && <RichText blocks={service.body} />}
            <ServiceSteps steps={service.steps} />
            <ServiceIncludesResults includes={service.includes} results={service.results} />
            <p className="font-sans text-[11px] text-ink-3 italic leading-relaxed">
              ⚠ Giá và thời gian tham khảo từ thiết kế prototype — cần client xác nhận lại trước khi công bố chính thức. Lennie không cam kết kết
              quả tuyệt đối; mọi phác đồ điều chỉnh theo tiến triển thực tế của làn da.
            </p>
          </div>

          <aside className="lg:col-span-4">
            <ServiceBookingSidebar
              service={service}
              onOpenBooking={() => setBookingOpen(true)}
              onOpenQuiz={() => setQuizOpen(true)}
              messengerUrl={service.secondaryCta?.url}
            />
          </aside>
        </div>
      </section>

      {service.relatedFaqs?.length > 0 && (
        <section className="bg-light-bg py-20 border-b border-divider">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <SectionHead center eyebrow="Giải đáp thắc mắc" title="Câu hỏi" accent="thường gặp" />
            <FaqAccordion items={service.relatedFaqs} />
          </div>
        </section>
      )}

      <RelatedServices services={service.related} />

      <ConsultSection
        id="dang-ky"
        eyebrow="Đăng ký tư vấn"
        title="Quan tâm dịch vụ"
        accent={service.title.toLowerCase()}
        intro="Để lại thông tin và tình trạng da của bạn — ThS. DS. Hoàng Hồng Thắm sẽ tư vấn chi tiết phác đồ qua Messenger."
        lockedServiceLabel={service.title}
      />

      <CTABand
        onOpenBooking={() => setBookingOpen(true)}
        title="Bắt đầu hành trình"
        accent="phục hồi làn da ngay hôm nay."
        secondaryHref="/services"
        secondary="Xem dịch vụ khác"
      />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <SocialRail />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
