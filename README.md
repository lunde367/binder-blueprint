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

## Phase 2
- Drag to rearrange: hold a card (touch) or drag it (mouse) onto any pocket; the page scrolls near the edges; Undo after every move.
- Title & divider card maker: upload up to 9 of your own pictures, pan/zoom/rotate to card size, add a title, set-colored border or background, print 3 × 3 on letter at exactly 2.5 × 3.5 in with cut lines. Pictures are stored in the browser (IndexedDB). A title card in a binder can be sent straight to the maker.

## Accounts & sync
- Optional sign-in with a 6-digit email code (Supabase Auth, project `Binder-Blueprint`). The app works fully signed out.
- Local first: saves on the device instantly, uploads in the background, works offline.
- Each binder is one row with a version number; conflicting edits are merged (have/need per card; newest wins for order/settings). The database keeps restore points (Setup → Earlier versions).
- Family profiles (no emails for kids), title-card sheet and pictures sync too (pictures in a private storage bucket).
- Row-level security: every account can only read and change its own rows and files.
