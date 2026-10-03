ALTER TABLE public.prop_firms
ADD COLUMN IF NOT EXISTS trustpilot_url TEXT NULL;

COMMENT ON COLUMN public.prop_firms.trustpilot_url IS 'Optional external URL to the firm profile on Trustpilot.';