# Add Trustpilot profile links

## Scope
- Add an optional `trustpilot_url` field to each prop firm in the database.
- Carry that field through the existing firm-review and comparison data loaders.
- Show “View on Trustpilot ↗” as a small outlined external link near each individual review header when a URL exists.
- Add a compact external-link icon in the comparison table when a URL exists.
- Keep compact directory cards unchanged where another action would crowd the layout.
- Link out only; do not fetch, embed, or reproduce Trustpilot ratings or reviews.

## Technical details
- Apply a backward-compatible nullable text column migration.
- Render links conditionally with a new tab and safe external-link attributes.
- Preserve current layouts, ordering, filtering, and card styling.
- Verify the database change, app build, desktop review page, comparison table, and mobile layout.
