import { questions } from "@/lib/quiz-data";

export function QuizProgress({ current }: { current: number }) {
  const pct = ((current + 1) / questions.length) * 100;
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Question <span className="text-white">{current + 1}</span> of {questions.length}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#1c1c1c]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 hidden items-center justify-center gap-2 sm:flex">
        {questions.map((_, i) => {
          if (i < current) {
            return <span key={i} className="h-2 w-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />;
          }
          if (i === current) {
            return (
              <span key={i} className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
                <span className="relative h-2 w-2 rounded-full bg-white" />
              </span>
            );
          }
          return <span key={i} className="h-2 w-2 rounded-full bg-[#2a2a2a]" />;
        })}
      </div>
    </div>
  );
}