import { useState } from "react";
import type { Question } from "@/lib/quiz-data";

type Props = {
  question: Question;
  index: number;
  total: number;
  selected?: string;
  onSelect: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
  direction: 1 | -1;
};

export function QuizQuestion({ question, index, total, selected, onSelect, onNext, onBack, isLast, direction }: Props) {
  const [bounceId, setBounceId] = useState<string | null>(null);
  const handleSelect = (v: string) => {
    setBounceId(v);
    onSelect(v);
    setTimeout(() => setBounceId(null), 250);
  };

  return (
    <div
      key={question.id}
      className="w-full"
      style={{
        animation: `${direction === 1 ? "qSlideInRight" : "qSlideInLeft"} 300ms ease-out`,
      }}
    >
      <style>{`
        @keyframes qSlideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes qSlideInLeft  { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes qPop { 0% { transform: scale(0); } 60% { transform: scale(1.2); } 100% { transform: scale(1); } }
      `}</style>
      <p className="text-center text-xs font-medium text-muted-foreground">
        {index + 1} / {total}
      </p>
      <h2 className="mt-2 text-center font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
        {question.text}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
        {question.options.map((opt) => {
          const isSel = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={
                "group relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-150 sm:p-5 " +
                (isSel
                  ? "border-purple-500 bg-[#1A1A2E] shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)]"
                  : "border-[#222] bg-[#1c1c1c] hover:border-[#7C3AED] hover:bg-[#1A1A2E]")
              }
            >
              {isSel && (
                <span
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-xs font-bold text-white"
                  style={{ animation: bounceId === opt.value ? "qPop 250ms ease-out" : undefined }}
                >
                  ✓
                </span>
              )}
              <span className="text-2xl sm:text-3xl">{opt.icon}</span>
              <span className="font-display font-bold text-white">{opt.label}</span>
              {opt.sub && <span className="text-xs text-muted-foreground">{opt.sub}</span>}
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <button
          onClick={onBack}
          disabled={index === 0}
          className="w-full text-sm text-muted-foreground transition hover:text-white disabled:opacity-40 sm:w-auto"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className={
            "w-full rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto " +
            (selected
              ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white hover:opacity-90"
              : "cursor-not-allowed bg-[#1c1c1c] text-muted-foreground")
          }
        >
          {isLast ? "See My Results" : "Next →"}
        </button>
      </div>
    </div>
  );
}