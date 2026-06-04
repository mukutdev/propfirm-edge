import { useEffect, useState } from "react";

const messages = [
  "Analysing your trading style…",
  "Matching you with top firms…",
  "Finding your best discount…",
];

export function QuizLoading({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 800);
    const done = setTimeout(onDone, 2400);
    return () => {
      clearInterval(t);
      clearTimeout(done);
    };
  }, [onDone]);
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#7C3AED] border-r-[#EC4899]" style={{ animationDuration: "1.2s" }} />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] opacity-70 blur-md" />
        <div className="absolute inset-3 flex items-center justify-center rounded-full bg-[#141414] text-2xl">🎯</div>
      </div>
      <p key={i} className="font-display text-lg text-white animate-fade-in">{messages[i]}</p>
      <div className="flex gap-2">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="h-2 w-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
            style={{ animation: `qbounce 1s ease-in-out ${d * 0.15}s infinite` }}
          />
        ))}
      </div>
      <style>{`@keyframes qbounce { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-6px); opacity: 1; } }`}</style>
    </div>
  );
}