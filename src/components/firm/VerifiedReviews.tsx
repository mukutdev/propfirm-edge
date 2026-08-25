import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Star, ShieldCheck, PenLine, Check, X } from "lucide-react";
import { submitFirmReview, type FirmReviewEntry } from "@/lib/firms.functions";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "text-[#facc15] fill-[#facc15]" : "text-[#333]"}
        />
      ))}
    </div>
  );
}

function timeAgo(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86400000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function ReviewForm({ firmId, firmName, onDone }: { firmId: string; firmName: string; onDone: () => void }) {
  const submit = useServerFn(submitFirmReview);
  const [traderName, setTraderName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const mutation = useMutation({
    mutationFn: () => submit({ data: { firmId, traderName: traderName.trim(), rating, reviewText: reviewText.trim() } }),
  });

  if (mutation.isSuccess) {
    return (
      <div className="card-surface p-7 text-center">
        <div className="h-11 w-11 rounded-full bg-[#00d97e]/15 text-[#00d97e] flex items-center justify-center mx-auto">
          <Check size={20} />
        </div>
        <div className="font-display font-bold text-lg mt-4">Review submitted for moderation</div>
        <p className="text-sm text-[#888] mt-2 max-w-md mx-auto">
          We read every submission before it goes live. Payout screenshots or account statements speed up verification.
        </p>
        <button onClick={onDone} className="btn-ghost mt-5 text-sm py-2.5 px-6">Close</button>
      </div>
    );
  }

  const valid = traderName.trim().length >= 2 && reviewText.trim().length >= 20;

  return (
    <form
      className="card-surface p-7 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) mutation.mutate();
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display font-bold text-lg">Review {firmName}</div>
          <p className="text-xs text-[#888] mt-1">
            Talk specifics: evaluation length, drawdown behaviour, payout timing. Marketing fluff gets rejected.
          </p>
        </div>
        <button type="button" onClick={onDone} aria-label="Close form" className="text-[#888] hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-[#888]">Trader name or handle</span>
          <input
            value={traderName}
            onChange={(e) => setTraderName(e.target.value)}
            maxLength={60}
            placeholder="e.g. Marcus D."
            className="mt-2 w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7c3aed]"
          />
        </label>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#888]">Your rating</span>
          <div className="mt-2 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i} star${i > 1 ? "s" : ""}`}
                onClick={() => setRating(i)}
                className="p-1"
              >
                <Star size={22} className={i <= rating ? "text-[#facc15] fill-[#facc15]" : "text-[#333]"} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-[#888]">Your experience</span>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={5}
          maxLength={4000}
          placeholder="How many sessions did the evaluation take? How did the drawdown behave after a big day? How fast did the payout clear?"
          className="mt-2 w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#7c3aed] resize-y"
        />
        <span className="text-[11px] text-[#666]">{reviewText.trim().length}/20 characters minimum</span>
      </label>

      {mutation.isError && (
        <p className="text-sm text-[#ff3b5c]">Could not submit right now. Please try again in a moment.</p>
      )}

      <button type="submit" disabled={!valid || mutation.isPending} className="btn-gradient text-sm disabled:opacity-50">
        {mutation.isPending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

export function VerifiedReviews({
  firmId,
  firmName,
  reviews,
  averageRating,
  reviewCount,
}: {
  firmId: string;
  firmName: string;
  reviews: FirmReviewEntry[];
  averageRating: number;
  reviewCount: number;
}) {
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 6);

  const buckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <section className="space-y-6">
      <h2 id="reviews" className="font-display font-bold text-3xl md:text-4xl gradient-underline scroll-mt-32">
        Verified Trader Reviews
      </h2>

      <div className="card-surface p-7 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
        <div className="text-center md:pr-8 md:border-r md:border-[#222]">
          <div className="font-display font-bold text-5xl text-gradient">
            {reviewCount ? averageRating.toFixed(1) : "—"}
          </div>
          <div className="mt-2 flex justify-center">
            <Stars rating={averageRating} size={16} />
          </div>
          <div className="text-xs text-[#888] mt-2">
            {reviewCount} {reviewCount === 1 ? "trader review" : "trader reviews"}
          </div>
        </div>

        <div className="space-y-2">
          {buckets.map((b) => {
            const pct = reviewCount ? (b.count / reviewCount) * 100 : 0;
            return (
              <div key={b.star} className="flex items-center gap-3 text-xs">
                <span className="w-8 text-[#888]">{b.star}★</span>
                <div className="flex-1 h-2 rounded-full bg-[#222] overflow-hidden">
                  <div className="h-full bg-gradient-brand rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-right text-[#888]">{b.count}</span>
              </div>
            );
          })}
        </div>

        <button onClick={() => setShowForm((v) => !v)} className="btn-gradient text-sm whitespace-nowrap">
          <PenLine size={14} /> Write a Review
        </button>
      </div>

      {showForm && <ReviewForm firmId={firmId} firmName={firmName} onDone={() => setShowForm(false)} />}

      {reviewCount === 0 ? (
        <div className="card-surface p-8 text-center text-sm text-[#888]">
          No approved reviews for {firmName} yet. If you have traded an evaluation or funded account here, you will be first.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-5">
            {visible.map((r) => (
              <article key={r.id} className="card-surface p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display font-semibold text-sm flex items-center gap-2">
                      {r.traderName}
                      {r.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#00d97e] bg-[#00d97e]/10 px-2 py-0.5 rounded-full">
                          <ShieldCheck size={11} /> Verified payout
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5">
                      <Stars rating={r.rating} />
                    </div>
                  </div>
                  <span className="text-[11px] text-[#666] whitespace-nowrap">{timeAgo(r.createdAt)}</span>
                </div>
                <p className="text-sm text-[#bbb] leading-relaxed mt-4">{r.reviewText}</p>
              </article>
            ))}
          </div>
          {reviews.length > 6 && (
            <div className="text-center">
              <button onClick={() => setShowAll((v) => !v)} className="btn-ghost text-sm py-2.5 px-6">
                {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
