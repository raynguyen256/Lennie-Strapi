"use client";

import { useState } from "react";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import CartToast from "@/components/chrome/CartToast";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import PageHero from "@/components/chrome/PageHero";
import PartnerStrip from "@/components/chrome/PartnerStrip";
import ConsultSection from "@/components/chrome/ConsultSection";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { CartStore } from "@/lib/cart";

export default function ShopView({ products }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [added, setAdded] = useState({});
  const [toast, setToast] = useState({ show: false, product: null });

  const addToCart = (p) => {
    CartStore.add(p);
    setAdded((a) => ({ ...a, [p.slug]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [p.slug]: false })), 1400);
    setToast({ show: true, product: p });
    clearTimeout(window.__toastTB);
    window.__toastTB = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  };

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="shop" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <PageHero
        eyebrow="Sản phẩm"
        title="Dược mỹ phẩm"
        accent="chọn lọc độc quyền."
        intro="Sản phẩm nhập khẩu chính hãng từ các thương hiệu đối tác, được ThS. DS. Hoàng Hồng Thắm tuyển chọn khắt khe. Lọc theo loại sản phẩm, loại da và mức giá phù hợp."
        crumb={[["Sản phẩm", null]]}
        img="/assets/remix/herb-mix.png"
      />

      <ShopCatalog products={products} added={added} onAdd={addToCart} onOpenQuiz={() => setQuizOpen(true)} />

      <PartnerStrip label="Thương hiệu đối tác chính hãng" />

      <ConsultSection
        id="tu-van-san-pham"
        eyebrow="Tư vấn sản phẩm"
        title="Chưa chắc sản phẩm nào"
        accent="hợp với làn da bạn?"
        intro="Để lại thông tin và tình trạng da — Lennie sẽ tư vấn chọn đúng sản phẩm lẻ phù hợp, tiếp tục trao đổi trực tiếp qua Messenger."
        image="/assets/remix/herb-mix.png"
        lockedServiceLabel="Tư vấn sản phẩm lẻ"
        buttonLabel="Tư vấn sản phẩm"
      />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <CartToast show={toast.show} product={toast.product} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
