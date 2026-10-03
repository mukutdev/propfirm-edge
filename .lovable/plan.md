# News Economic Calendar

## Build
- Replace the existing compact event table with TradingView’s official Economic Calendar widget.
- Present it in a full-width dark panel with the requested title, explanatory line, and subtle purple border glow.
- Place it immediately below the news header, before the breaking ticker and category filters.
- Keep all remaining news sections and filtering behavior in their current order.

## Technical details
- Load TradingView’s official `embed-widget-events.js` script when the calendar mounts.
- Pass the requested dark, transparent, full-width, 600px-high English configuration with all importance levels.
- Keep the widget lifecycle isolated to its container to prevent duplicate embeds.
- Verify the desktop and mobile layouts and check the live preview for errors.
