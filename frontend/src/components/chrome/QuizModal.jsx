"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { quizQuestions, generateRoutine } from "@/lib/data";

export default function QuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  if (!isOpen) return null;
  const q = quizQuestions[step];
  const answered = answers[q.key] && answers[q.key].trim() !== "";
  const pick = (k, v) => setAnswers((p) => ({ ...p, [k]: v }));
  const next = () => {
    if (step < quizQuestions.length - 1) setStep(step + 1);
    else {
      setAnalyzing(true);
      setTimeout(() => {
        setResult(generateRoutine(answers));
        setAnalyzing(false);
      }, 1800);
    }
  };
  const reset = () => {
    setAnswers({});
    setStep(0);
    setResult(null);
    setAnalyzing(false);
  };
  return (
    <div className="fixed inset-0 bg-ink/75 backdrop-blur-sm flex justify-center items-center p-4 z-[60] overflow-y-auto modal-fade" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative overflow-hidden modal-pop my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue"></div>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-3 hover:text-brand-blue hover:bg-light-bg rounded-full transition-colors z-10">
          <Icon.X size={20} />
        </button>
        <div className="p-6 md:p-8">
          {analyzing && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
                <span className="text-brand-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                  <Icon.Sparkles size={24} />
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Đang phân tích cấu trúc da...</h3>
              <p className="font-sans text-xs text-ink-3 max-w-xs">Thuật toán của Dược sĩ Thắm đang lập phác đồ tối ưu riêng cho bạn.</p>
            </div>
          )}
          {!analyzing && result && (
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-divider">
                <div className="w-12 h-12 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-3">
                  <Icon.Shield size={24} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-ink">Phác đồ đề xuất cho {result.customerName}</h3>
                <p className="font-sans text-[11px] text-brand-teal font-semibold tracking-wider uppercase mt-1">Chẩn đoán Lennie SkinLab</p>
              </div>
              <div className="bg-mist p-5 rounded-lg border border-divider">
                <h4 className="font-sans text-xs font-bold text-ink tracking-widest uppercase mb-2 flex items-center gap-2">
                  <span className="text-brand-blue">
                    <Icon.Droplet size={14} />
                  </span>
                  Đọc vị da
                </h4>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">{result.skinAnalysis}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 border border-divider rounded-lg">
                  <h5 className="font-sans text-xs font-bold text-brand-teal tracking-widest uppercase mb-3 flex items-center gap-2">
                    <Icon.Sun size={16} />
                    Buổi sáng (AM)
                  </h5>
                  <ul className="space-y-2.5">
                    {result.morningSteps.map((s, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-xs text-ink-2">
                        <span className="w-5 h-5 rounded-full bg-brand-blue-light text-brand-blue font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-4 border border-divider rounded-lg">
                  <h5 className="font-sans text-xs font-bold text-brand-blue tracking-widest uppercase mb-3 flex items-center gap-2">
                    <Icon.Heart size={16} />
                    Buổi tối (PM)
                  </h5>
                  <ul className="space-y-2.5">
                    {result.eveningSteps.map((s, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-xs text-ink-2">
                        <span className="w-5 h-5 rounded-full bg-brand-blue-light text-brand-blue font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-brand-blue-light/60 p-4 border-l-4 border-brand-blue rounded-r">
                <p className="font-sans text-xs text-brand-blue font-medium leading-relaxed italic">{result.expertAdvice}</p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-divider">
                <button type="button" onClick={reset} className="flex-1 py-3 border border-brand-blue text-brand-blue font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-blue-light transition-colors">
                  Làm lại
                </button>
                <Link href="/about" className="flex-1 py-3 bg-brand-blue text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-ink shadow transition-colors text-center">
                  Gặp chuyên gia
                </Link>
              </div>
            </div>
          )}
          {!analyzing && !result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-3 tracking-wider">
                <span>Khám phá làn da cùng Lennie</span>
                <span>
                  Câu {step + 1} / {quizQuestions.length}
                </span>
              </div>
              <div className="w-full bg-light-bg h-1 rounded-full overflow-hidden">
                <div className="bg-brand-blue h-full transition-all duration-300" style={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }}></div>
              </div>
              <div className="py-2">
                <h3 className="font-serif text-xl md:text-2xl text-ink font-semibold leading-snug mb-8">{q.question}</h3>
                {q.type === "select" && (
                  <div className="space-y-3">
                    {q.options.map((opt) => {
                      const sel = answers[q.key] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => pick(q.key, opt)}
                          className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm font-sans flex items-center justify-between transition-all ${sel ? "bg-brand-blue-light border-brand-teal text-brand-blue font-semibold" : "border-divider hover:border-brand-blue hover:bg-mist text-ink-2"}`}
                        >
                          <span>{opt}</span>
                          {sel && (
                            <span className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                              <Icon.Check size={12} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
                {q.type === "input" && (
                  <div className="relative">
                    <span className="text-ink-3 absolute left-4 top-1/2 -translate-y-1/2">
                      <Icon.User size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder={q.placeholder}
                      value={answers[q.key] || ""}
                      onChange={(e) => pick(q.key, e.target.value)}
                      className="w-full p-4 pl-12 bg-mist border border-divider rounded-lg font-sans text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-ink"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-divider gap-4">
                <button
                  type="button"
                  onClick={() => step > 0 && setStep(step - 1)}
                  disabled={step === 0}
                  className={`inline-flex items-center gap-1 font-sans text-[11px] font-bold tracking-wider uppercase py-2.5 ${step === 0 ? "text-ink-3/40 cursor-not-allowed" : "text-ink-3 hover:text-brand-blue"}`}
                >
                  <Icon.ChevronL size={16} />
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!answered}
                  className={`inline-flex items-center gap-1 px-6 py-2.5 font-sans text-[11px] font-extrabold tracking-wider uppercase rounded shadow-sm ${answered ? "bg-brand-blue hover:bg-ink text-white" : "bg-divider text-ink-3/50 cursor-not-allowed"}`}
                >
                  {step === quizQuestions.length - 1 ? "Xem kết quả" : "Tiếp theo"}
                  <Icon.ChevronR size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
