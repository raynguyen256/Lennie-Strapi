"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import FloatingActions from "@/components/chrome/FloatingActions";
import CartToast from "@/components/chrome/CartToast";
import QuizModal from "@/components/chrome/QuizModal";
import BookingModal from "@/components/chrome/BookingModal";
import SectionHead from "@/components/chrome/SectionHead";
import CTABand from "@/components/chrome/CTABand";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductRating from "@/components/shop/ProductRating";
import ProductQuantitySelector from "@/components/shop/ProductQuantitySelector";
import ProductTrustBadges from "@/components/shop/ProductTrustBadges";
import ProductTabs from "@/components/shop/ProductTabs";
import ProductReviews from "@/components/shop/ProductReviews";
import { Icon } from "@/lib/icons";
import { CartStore } from "@/lib/cart";

export default function ProductDetailView({ product }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState({ show: false, product: null });

  const addToCart = () => {
    CartStore.add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    setToast({ show: true, product });
    clearTimeout(window.__toastTB);
    window.__toastTB = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  };

  return (
    <div className="bg-white text-ink overflow-x-hidden selection:bg-brand-blue/20">
      <Navbar active="shop" onOpenBooking={() => setBookingOpen(true)} onOpenQuiz={() => setQuizOpen(true)} />

      <section className="bg-white pt-32 md:pt-40 pb-10 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-ink-3 mb-8">
            <Link href="/" className="hover:text-brand-blue">
              Trang chủ
            </Link>
            <Icon.ChevronR size={11} />
            <Link href="/shop" className="hover:text-brand-blue">
              Sản phẩm
            </Link>
            <Icon.ChevronR size={11} />
            <span className="text-brand-blue">{product.type || product.tag}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery product={product} />

            <div className="space-y-5">
              <span className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-brand-teal">{product.brand}</span>
              <h1 className="font-serif text-[32px] md:text-[42px] text-ink font-light leading-tight tracking-tight">{product.name}</h1>
              <ProductRating rating={product.rating} reviews={product.reviews} />
              <div className="flex items-end gap-3 pt-2">
                <span className="font-serif text-4xl font-bold text-ink">{product.price}</span>
                {product.oldPrice && <span className="font-sans text-lg text-ink-3 line-through mb-1">{product.oldPrice}</span>}
              </div>
              {product.excerpt && <p className="font-sans text-sm text-ink-2 leading-relaxed">{product.excerpt}</p>}
              {product.skinTypes?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.skinTypes.map((sk) => (
                    <span key={sk} className="font-sans text-[11px] font-semibold text-brand-blue bg-brand-blue-light border border-divider px-3 py-1.5 rounded-full">
                      {sk}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 pt-4 border-t border-divider">
                <ProductQuantitySelector qty={qty} onChange={setQty} />
                <button
                  type="button"
                  onClick={addToCart}
                  className={`flex-1 py-4 font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all flex items-center justify-center gap-2 ${added ? "bg-brand-teal text-white" : "bg-ink text-white hover:bg-brand-blue"}`}
                >
                  {added ? (
                    <>
                      <Icon.Check size={15} /> Đã thêm vào giỏ
                    </>
                  ) : (
                    <>
                      <Icon.Bag size={15} /> Thêm vào giỏ
                    </>
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="w-full py-4 border border-brand-blue text-brand-blue font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-brand-blue-light transition-all flex items-center justify-center gap-2"
              >
                <Icon.Message size={16} />
                Tư vấn dùng sản phẩm này
              </button>
              <ProductTrustBadges />
            </div>
          </div>
        </div>
      </section>

      <ProductTabs product={product} />

      <ProductReviews reviews={product.productReviews} rating={product.rating} reviewCount={product.reviews} />

      {product.related?.length > 0 && (
        <section className="bg-brand-blue-light py-20 border-b border-divider">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <SectionHead eyebrow="Gợi ý cho bạn" title="Sản phẩm" accent="liên quan" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {product.related.map((r) => (
                <Link key={r.slug} href={`/shop/${r.slug}`} className="group bg-white border border-divider rounded-sm p-4 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="h-44 bg-brand-blue-light rounded-sm flex items-center justify-center p-5 mb-3 overflow-hidden">
                    <img src={r.img} alt={r.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="font-sans text-[9px] font-bold tracking-[0.18em] uppercase text-brand-teal">{r.brand}</span>
                  <h4 className="font-serif text-[14px] font-medium text-ink leading-snug mt-1 min-h-[38px] group-hover:text-brand-blue transition-colors">{r.name}</h4>
                  <span className="font-serif text-[15px] font-bold text-ink mt-2">{r.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand onOpenBooking={() => setBookingOpen(true)} secondaryHref="/shop" secondary="Tiếp tục mua" />

      <Footer />
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />
      <CartToast show={toast.show} product={toast.product} />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
