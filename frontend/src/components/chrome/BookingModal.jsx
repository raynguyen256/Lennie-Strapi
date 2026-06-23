"use client";

import { Icon } from "@/lib/icons";
import ConsultForm from "./ConsultForm";

export default function BookingModal({ isOpen, onClose, presetService }) {
  if (!isOpen) return null;
  const defaultService = presetService === "product" ? "product" : "routine";
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10">
          <Icon.X size={20} />
        </button>
        <div className="p-6 md:p-8">
          <div className="text-center pb-5 mb-5 border-b border-divider">
            <span className="inline-block font-sans text-[10px] font-bold tracking-[0.3em] text-brand-teal uppercase">Đăng ký tư vấn</span>
            <h3 className="font-serif text-2xl font-semibold text-ink mt-2">Lennie SkinLab Clinic</h3>
            <p className="font-sans text-xs text-ink-3 mt-1">Để lại thông tin — Lennie tư vấn tiếp qua Messenger</p>
          </div>
          <ConsultForm defaultService={defaultService} source="booking-modal" onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
