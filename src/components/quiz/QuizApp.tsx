import { useState } from "react";
import { questions } from "@/lib/quiz-data";
import { QuizStart } from "./QuizStart";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizLoading } from "./QuizLoading";
import { QuizResults } from "./QuizResults";

type Phase = "start" | "quiz" | "loading" | "results";

export function QuizApp() {
  const [phase, setPhase] = useState<Phase>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const q = questions[current];
  const reset = () => {
    setPhase("start");
    setCurrent(0);
    setAnswers({});
    setDirection(1);
  };

  if (phase === "start") return <QuizStart onStart={() => setPhase("quiz")} />;

  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[680px]">
        <div className="rounded-2xl border border-purple-500/20 bg-[#141414] p-6 shadow-[0_0_50px_-20px_rgba(124,58,237,0.5)] sm:p-8">
          {phase === "quiz" && (
            <>
              <QuizProgress current={current} />
              <QuizQuestion
                question={q}
                index={current}
                total={questions.length}
                selected={answers[q.id]}
                onSelect={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                onNext={() => {
                  if (current === questions.length - 1) {
                    setPhase("loading");
                  } else {
                    setDirection(1);
                    setCurrent((c) => c + 1);
                  }
                }}
                onBack={() => {
                  setDirection(-1);
                  setCurrent((c) => Math.max(0, c - 1));
                }}
                isLast={current === questions.length - 1}
                direction={direction}
              />
            </>
          )}
          {phase === "loading" && <QuizLoading onDone={() => setPhase("results")} />}
          {phase === "results" && <QuizResults onRetake={reset} />}
        </div>
      </div>
    </section>
  );
}