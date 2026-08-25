import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitFirmReview, type FirmOption } from "@/lib/firms.functions";

type Props = {
  firms: FirmOption[];
  preselectedSlug?: string;
};

export function SubmitReviewForm({ firms, preselectedSlug }: Props) {
  const submit = useServerFn(submitFirmReview);
  const initial = firms.find((f) => f.slug === preselectedSlug)?.id ?? "";

  const [firmId, setFirmId] = useState(initial);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [payout, setPayout] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const selected = firms.find((f) => f.id === firmId);

  function reset() {
    setFirmId(initial);
    setName("");
    setRating(0);
    setText("");
    setPayout(null);
    setError(null);
    setDone(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!firmId) return setError("Please select the firm you traded with.");
    if (name.trim().length < 2) return setError("Add a display name (at least 2 characters).");
    if (rating < 1) return setError("Pick a star rating.");
    if (text.trim().length < 20) return setError("Tell us a bit more — at least 20 characters.");

    setBusy(true);
    try {
      await submit({
        data: {
          firmId,
          traderName: name.trim(),
          rating,
          reviewText: text.trim(),
          claimedPayout: payout === true,
        },
      });
      setDone(true);
    } catch {
      setError("We couldn't submit your review right now. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-[640px] rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-5 font-display text-2xl font-bold">Thanks! Your review is being checked</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Every submission is moderated before publishing. Yours will appear on the firm's review page once approved.
        </p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button onClick={reset} className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold">
            Submit Another Review
          </button>
          <Link to="/reviews" className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary/60">
            Browse Firm Reviews
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-[640px] rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="firm" className="block text-sm font-semibold">
            Select Firm
          </label>
          <div className="mt-2 flex items-center gap-3">
            {selected?.logo ? (
              <img src={selected.logo} alt="" className="h-9 w-9 shrink-0 rounded-lg border border-border bg-background object-contain p-1" />
            ) : null}
            <select
              id="firm"
              value={firmId}
              onChange={(e) => setFirmId(e.target.value)}
              className="min-h-[48px] w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
            >
              <option value="">Choose a prop firm…</option>
              {firms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold">
            Your Name
          </label>
          <p className="mt-1 text-xs text-muted-foreground">How should we display your name? e.g. "Marcus T."</p>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            className="mt-2 min-h-[48px] w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
            placeholder="Marcus T."
          />
        </div>

        <div>
          <span className="block text-sm font-semibold">Star Rating</span>
          <div className="mt-2 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => {
              const active = n <= (hover || rating);
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onMouseEnter={() => setHover(n)}
                  onClick={() => setRating(n)}
                  className="grid h-11 w-11 place-items-center rounded-lg transition-transform hover:scale-110"
                >
                  <Star className={`h-7 w-7 ${active ? "fill-primary text-primary" : "text-muted-foreground/50"}`} />
                </button>
              );
            })}
            {rating > 0 && <span className="ml-2 text-sm text-muted-foreground">{rating}.0 / 5</span>}
          </div>
        </div>

        <div>
          <label htmlFor="review" className="block text-sm font-semibold">
            Your Review
          </label>
          <textarea
            id="review"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={4000}
            placeholder="What was your experience with the evaluation, payouts, and support like?"
            className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <span className="block text-sm font-semibold">Have you received a payout from this firm?</span>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setPayout(o.value)}
                className={`min-h-[48px] rounded-xl border text-sm font-semibold transition-colors ${
                  payout === o.value ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/50"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn-gradient flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full text-sm font-bold disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Submitting…" : "Submit Review"}
        </button>
      </div>
    </form>
  );
}
