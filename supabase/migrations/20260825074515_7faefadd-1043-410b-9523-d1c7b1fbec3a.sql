ALTER TABLE public.firm_reviews
  ADD COLUMN IF NOT EXISTS claimed_payout boolean NOT NULL DEFAULT false;

DROP POLICY IF EXISTS "Anyone can submit a review for moderation" ON public.firm_reviews;
CREATE POLICY "Anyone can submit a review for moderation"
  ON public.firm_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND is_verified = false
    AND char_length(trader_name) BETWEEN 2 AND 60
    AND char_length(review_text) BETWEEN 20 AND 4000
  );