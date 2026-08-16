# SuSun & Chris — Bon Voyage website

A single-page, scroll-snapping mobile wedding site with 9 sections and the
animations you asked for: tilting sun & moon, a swan carrying them, a
rippling-water boat scene, bobbing black/white swans, a floating tap-to-zoom
mood board, and a working RSVP form.

## Deploying to susunandchrisonaswan.vercel.app

This is a plain static site (no build step). Easiest path:

1. Go to vercel.com → your project (or create a new one).
2. Drag this whole folder in, or connect it to a GitHub repo containing these
   files, or run `vercel deploy` from inside this folder with the Vercel CLI.
3. No framework preset needed — just "Other" / static.

## Two things only you can fill in

**1. Registry link** — open `script.js`, near the top:

```js
const REGISTRY_URL = "https://venmo.com/YOUR-VENMO-HANDLE";
```

Replace with your real Venmo / Zelle / registry link.

**2. RSVP email** — RSVPs send to `susunandchrismoon@gmail.com` via a free
service called FormSubmit (no account or API key needed). The **first**
RSVP anyone submits will trigger a one-time confirmation email to that inbox
— someone needs to click "Confirm" in that email once, or all RSVPs before
that click will silently fail. I'd recommend sending yourselves a test RSVP
right after deploying, just to activate it.

## Adding your own photos later

Two sections are intentionally placeholders, since I couldn't use photos
pulled from magazines/other people's shoots without rights to republish
them:

- **Mood board** ("please go all out"): open `script.js`, find
  `moodboardImages`, and list your own images there, e.g.
  `{ src: 'assets/moodboard/mb-1.jpg', alt: 'White tuxedo' }`. Drop the
  files in a new `assets/moodboard/` folder.
- **Engagement photos**: same idea, in the `engagementImages` array a bit
  further down, files going in `assets/engagement/`.

Once you list them, the floating/zoom behavior applies automatically —
nothing else to wire up.

## Fonts

Both are embedded directly in the site now (`assets/fonts/`) — no external
font service, so they load instantly and consistently everywhere:

- **Copperplate Gothic** (Bold + Light) — used for "YOU'RE INVITED,"
  "ADMIT ONE," and the ticket details.
- **YoureInvited** (Regular + Heavy) — the script font for all the
  cursive text ("SuSun Kwak & Chris Moon," captions, etc.). Turns out this
  is the exact font from your original design.

## File structure

```
index.html      — all 9 sections
styles.css      — layout, fonts, all animations
script.js       — scroll effects, mood board, lightbox, RSVP submission
assets/         — all illustration images (WebP, transparent backgrounds)
```

## Notes

- Respects `prefers-reduced-motion` — animations turn off for visitors who
  have that accessibility setting on.
- All images are WebP for fast loading (whole site is ~1.2 MB).
- Section dots on the right edge let visitors jump between sections and
  show which one they're on.

## Cash Registry & inspiration link

Both are now live and linked:
- "For inspiration" on the Attire page → your Milanote board
- "Send a gift" on the Cash Registry page → your Sendbirdie link

If either URL ever changes, search for the link in `index.html` (look for
the `href` on the `.inspiration-link a` or `.send-gift-link` elements) and
swap it there — no other changes needed.

## Google Maps links on the ticket

Since the ticket is a flattened image, I added two invisible tap regions
positioned on top of it — one over "Board at," one over "Parking" — each
opening Google Maps to that address in a new tab. There's a small 📍 in the
corner of each as a visual hint that they're tappable.

If you ever swap the ticket image again and the addresses shift position,
these will need re-aligning: in `styles.css`, look for `.board-hit` and
`.parking-hit` — they're positioned with percentage-based `left`/`top`/
`width`/`height` relative to the image, so nudge those percentages to match
the new image.

