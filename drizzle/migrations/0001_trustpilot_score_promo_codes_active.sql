ALTER TABLE public.prop_firms
  ADD COLUMN IF NOT EXISTS trustpilot_score numeric(2,1),
  ADD COLUMN IF NOT EXISTS trustpilot_updated_at date,
  ADD COLUMN IF NOT EXISTS promo_codes jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
COMMENT ON COLUMN public.prop_firms.rating IS 'DEPRECATED: replaced by trustpilot_score';
COMMENT ON COLUMN public.prop_firms.coupon_code IS 'DEPRECATED: replaced by promo_codes';
DROP POLICY IF EXISTS "Prop firms are publicly readable" ON public.prop_firms;
CREATE POLICY "Active prop firms are publicly readable" ON public.prop_firms FOR SELECT TO anon, authenticated USING (is_active = true);