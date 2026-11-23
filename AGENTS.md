# Project Architecture Rules

- Third-party TradingView widgets must be mounted client-side through isolated script containers so SSR remains deterministic and remounts do not duplicate embeds.
- External review-profile URLs live as nullable firm data and render conditionally, keeping link availability separate from editorial ratings.
- Firm visibility is controlled by prop_firms.is_active (RLS hides inactive rows); hide firms instead of deleting so history and links stay intact.
- Promo codes live in prop_firms.promo_codes (JSON array) and ratings come only from trustpilot_score; the old rating/coupon_code columns are deprecated.
