# Binder Blueprint

Plan your real trading card binder before you sleeve a single card. Simple, ad-free, family-friendly.

## Phase 1 (this version)
- Pick a 4-, 9- or 12-pocket binder, number of pages, and whether it opens in two-page spreads. Switch any time and everything reflows.
- Add a whole set, a card range, picked cards (search or browse), basic energy, title/divider slots (one pocket or a whole page), and empty pockets.
- Start anything on the next free pocket, a fresh page, or a fresh spread (left page). Titles can be followed by "continue", "fresh page" or "fresh spread".
- Spread view with empty pockets for cards you don't have yet. Tap a card for details, or switch to "Tap: I have it" for quick marking.
- "Won't fit" warnings, with how many pages to add or which bigger binder would fit.
- "What's inside" list: move whole sets up/down, mark a set as owned, remove.
- Printable sleeving guide: page by page, with tick boxes and "leave empty" pockets.
- Multiple binders (saved in this browser via localStorage).

## How it works
- One file: `index.html`. No build step. Host with GitHub Pages (Settings → Pages → deploy from `main`, root).
- A binder is one ordered list of items (cards, empty pockets, titles, energy, page/spread breaks). Pages are calculated from that list every time, so switching binder size just re-flows.
- Card data and pictures: TCGdex (`https://api.tcgdex.net/v2/en`). If the API can't be reached, demo sets are shown.

## Next (Phase 2)
Drag-to-rearrange, custom insert maker (upload, crop to 2.5 × 3.5 in, set-color borders, 3 × 3 print with cut lines).
