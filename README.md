# Mount Moriah Baptist Church — 45th Anniversary Landing Page

A standalone landing page for the **45th Anniversary weekend, October 3–4, 2026**, in Brockton,
Massachusetts. Built to go live fast, ahead of the main church website, and to be linked from
that site once it launches.

It is a plain static site — HTML, CSS and one JavaScript file. No build step, no framework, no
npm install. Open `index.html` in a browser and it works.

---

## What's in here

```
index.html                      The page
config.js                       ← EDIT THIS. Prices, links, launch mode
styles.css                      Styling (maroon and gold, sampled from the flyers)
app.js                          Behaviour: pricing, countdown, form, lightbox
fonts.css                       Self-hosted webfont declarations

assets/flyers/                  Both approved flyers, web-optimised + thumbnails
assets/store/                   T-shirt front and back, backgrounds removed
assets/fonts/                   Self-hosted fonts + their licences
assets/qr/                      QR code (generated — see below)

tools/make-qr.py                Generates the QR code once the URL is final

docs/MEETING-NOTES.md           Notes extracted from the planning meeting
docs/ACTION-ITEMS.md            Action items, owners, and what's blocking launch
docs/GOOGLE-SHEET-SETUP.md      How to wire the form to a Google Sheet
```

---

## Quick start

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

To deploy: push this repo to Vercel, Netlify, or GitHub Pages. It's static — any host works,
no configuration required.

---

## Launch modes

`config.js` has a `mode` setting that changes what the page does:

| Mode | What visitors see |
|---|---|
| `"save-the-date"` | Flyers, schedule, ticket prices and the store. The form collects name, email, phone, shirt interest and volunteer interest, and says registration opens Tuesday. **Use this for Sunday's announcement.** |
| `"registration"` | The full form: days attending, headcounts, live price estimate, shirt sizes and quantities, volunteer shifts. **Switch to this on Tuesday.** |

Change one line and redeploy:

```javascript
mode: "registration",
```

---

## Filling in the missing pieces

The page is built so that **nothing is invented**. Any price that hasn't been decided shows as
"To be announced" rather than a guessed number. Fill these in as decisions come back —
they're all in `config.js`:

| Setting | Status |
|---|---|
| `pricing.saturday` | ✅ Done — from the Family Fun Day flyer |
| `pricing.passport` | ✅ Done — from the Family Fun Day flyer |
| `pricing.sunday.adult` | ❌ **Missing.** This price does not exist in any document yet |
| `shirt.price` | ❌ **Missing** |
| `shirt.bigAndTallUpcharge` | ❌ **Undecided** — the meeting floated $2 on 3XL/4XL but didn't decide. Set to `0` if you're not charging extra |
| `shirt.orderDeadline` | ❌ **Missing** — needs the printer's turnaround time |
| `formEndpoint` | ❌ Needed before the form can accept anything — see `docs/GOOGLE-SHEET-SETUP.md` |
| `givelifyUrl` | ❌ Needed before the Give button appears |
| `contactEmail` / `contactPhone` | ❌ Recommended, so people have a human to reach |

Open the browser console on the live site and it will print exactly which of these are still
unset. Nothing breaks if they're empty — the page just shows "to be announced."

---

## The QR code

**Do not generate this until the final URL is locked.** A QR pointing at a URL you're going to
change is a wasted print run.

```bash
pip install "qrcode[pil]"
python3 tools/make-qr.py "https://your-final-url.com"
```

Writes `assets/qr/anniversary-qr.svg` (for print) and `anniversary-qr.png` (for slides).
Uses high error correction, so it still scans when printed small or photocopied.

**Scan the printed proof with a real phone before running copies.**

---

## Registration data

The form posts to a Google Apps Script endpoint that appends rows to a Google Sheet the
committee can open, sort and print. Full setup — including the script — is in
`docs/GOOGLE-SHEET-SETUP.md`.

Fields captured:

- Name, email, phone
- Which days they're attending (Saturday / Sunday / both / can't make it)
- Headcount split by adults, ages 13–18, under 12
- T-shirt interest, with size and quantity per row
- Volunteer interest, and which shifts
- Donation interest
- Free-text notes

There's a hidden honeypot field that silently drops bot submissions.

**Reconcile this against the cash and check sales taken in the Alexander Room** — two separate
ledgers with no reconciliation plan is how people end up double-counted.

---

## Payments

Payment runs through the church's existing **Givelify** account (decided in the planning
meeting — no Stripe account needed). Paste the giving link into `config.js` as `givelifyUrl`.

**One open question nobody has answered yet:** whether Givelify supports separate giving
categories per item, or size/quantity selection. Nobody in the meeting knew, and I haven't
verified it either — somebody needs to log in and look. The site is built to work either way:
it collects the full order itself and shows the person their total, so Givelify only has to
accept a payment amount. If Givelify turns out to support per-item categories, the checkout
wording can be tightened later.

---

## Notes on how it's built

- **No third-party requests at runtime.** Fonts are self-hosted (`assets/fonts/`, all four
  under the SIL Open Font License — see `assets/fonts/LICENSE.md`). The page loads and renders
  fully even on bad signal in a church parking lot, and doesn't hand visitor data to anyone.
- **Images are optimised.** The supplied flyers were 9 MB combined; they're 1.1 MB now, with
  separate thumbnails for the cards and full-size versions behind the lightbox. The t-shirt
  mockups had their black backgrounds removed so they sit on the page rather than in a box.
- **Accessibility.** Semantic headings in order, every image has alt text, every form control
  has a label, visible focus rings, a skip link, and `prefers-reduced-motion` respected. All
  body text was measured against its actual rendered background and meets WCAG AA.
- **Responsive**, tested at 390px and 1440px with no horizontal overflow.
- **Prints cleanly** — navigation, countdown and form drop out, content stays.

### Verified in a real browser

Both launch modes were driven end to end in headless Chromium: mode switching, price
rendering, the live estimate, form validation, the success path, the flyer lightbox, the
mobile nav, image loading, and contrast sampled from rendered pixels. Console clean, no
failed requests, no layout overflow.

What I could **not** test, because it needs your accounts:

- The Google Apps Script endpoint against a real Sheet
- The Givelify link
- The QR code against the real URL

Do those three yourself before Tuesday.
