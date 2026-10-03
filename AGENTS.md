# Project Architecture Rules

- Third-party TradingView widgets must be mounted client-side through isolated script containers so SSR remains deterministic and remounts do not duplicate embeds.
- External review-profile URLs live as nullable firm data and render conditionally, keeping link availability separate from editorial ratings.
