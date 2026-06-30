"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import SocialRail from "@/components/chrome/SocialRail";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import DetailHero from "@/components/chrome/DetailHero";
import SectionHead from "@/components/chrome/SectionHead";
import RichText from "@/components/chrome/RichText";
import ConsultSection from "@/components/chrome/ConsultSection";
import BlogExcerptLede from "@/components/blog/BlogExcerptLede";
import BlogAuthorShare from "@/components/blog/BlogAuthorShare";
import { Icon } from "@/lib/icons";

export default function BlogDetailView({ post, related }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="blog" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <DetailHero img={post.img} crumb={[["Blog", "/blog"]]} badge={post.category ? { label: post.category } : null} title={post.title} align="center">
        <div className="flex items-center justify-center gap-3 mt-7 text-white/80 font-sans text-[12px]">
          <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <Icon.User size={15} />
          </span>
          <span className="font-bold">{post.author}</span>
          {post.date && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{post.date}</span>
            </>
          )}
          {post.readTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>
      </DetailHero>

      <section className="bg-white py-16 border-b border-divider">
        <div className="max-w-3xl mx-auto px-6">
          <BlogExcerptLede excerpt={post.excerpt} />
          {post.body && <RichText blocks={post.body} />}
          <BlogAuthorShare author={post.author} />
        </div>
      </section>

      {related?.length > 0 && (
        <section className="bg-brand-blue-light py-20 border-b border-divider">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <SectionHead eyebrow="Đọc tiếp" title="Bài viết" accent="liên quan" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-md overflow-hidden bg-white border border-divider flex flex-col hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] duration-700 transition" />
                    {p.category && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-blue font-sans text-[9px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-sm">
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="font-sans text-[10px] font-bold tracking-[0.16em] text-[#6F8CA8] uppercase">{p.date}</span>
                    <h3 className="font-serif text-lg font-bold text-ink leading-snug group-hover:text-brand-blue transition-colors">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultSection
        id="dang-ky"
        eyebrow="Đăng ký tư vấn"
        title="Cần Lennie đọc vị"
        accent="làn da của bạn?"
        intro="Để lại thông tin và tình trạng da — đội ngũ chuyên môn sẽ tiếp tục tư vấn trực tiếp cùng bạn qua Messenger."
        image="/assets/remix/clinic-treatment.png"
      />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <SocialRail />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
