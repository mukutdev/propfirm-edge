# DST status indicators

## Changes
- Add a shared timezone-label formatter using each session’s IANA timezone and the current date.
- Show a compact `(TZ, UTC±offset)` pill beside every session name in the homepage Market Sessions list.
- Show the same pill beside every desktop and mobile row in the Session Timeline Chart.
- Add the daylight-saving note directly below each full session display.
- Preserve all existing market open/close calculations and timing behavior.

## Technical details
- Use `Intl.DateTimeFormat` with `timeZoneName: "short"` for abbreviations and `timeZoneName: "longOffset"` for UTC offsets.
- Derive labels only after the page mounts to keep server and browser rendering consistent.
- Verify desktop and mobile layouts, including live automatic updates.
