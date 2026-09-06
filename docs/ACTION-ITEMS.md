# MMBC 45th Anniversary — Action Items

Compiled from the planning meeting transcript, September 5, 2026.

**Owner names** are taken from the meeting. Where the transcript didn't make the owner clear,
it says **[unassigned]** — please assign it rather than assuming someone picked it up.

**The critical path is short:** announce tomorrow → registration live Tuesday. Only a handful
of these actually block that. Those are marked **BLOCKER**.

---

## Before tomorrow (Sunday) — announcement day

| # | Action | Owner | Notes |
|---|---|---|---|
| 1 | **BLOCKER — Lock the URL.** Either buy the domain or accept the temporary Vercel URL. Nothing else can be printed or scanned until this exists. | Web team | Domain candidates discussed: MMBC.com (likely taken), MMBCBrockton, MtMoriahBrockton. Vercel placeholder is the agreed fallback. |
| 2 | **BLOCKER — Generate the QR code** once #1 is locked. | Web team | `python3 tools/make-qr.py "https://your-url"` in this repo. Produces print-ready SVG + PNG. |
| 3 | Deploy the landing page in "save the date" mode — flyers, schedule, and an email-capture form live; registration marked "opens Tuesday." | Web team | The page already supports this; see README §"Launch modes." |
| 4 | Confirm Ms. Gwen approved the anniversary flyer — now the **1:00 PM** version. | Shayna | Time changed from 4:00 PM after the meeting. The revised flyer is in the repo and live on the site. |
| 4a | **Re-check anything already printed or built with the old 4:00 PM time** — the slideshow, any posted flyers, the announcement script. | Shayna | The site is updated; offline material is not. |
| 5 | Give the announcement from the front. Save-the-date only — **no prices read aloud.** | Shayna | Script beats are in MEETING-NOTES §9. |
| 6 | Post flyers around the church. | [unassigned] | Near the pastor's office was mentioned. |
| 7 | Staff the Alexander Room for cash/check sales; log every transaction on the spreadsheet. | Ms. Gwen + [unassigned] | Must be reconciled against online registrations later. |
| 8 | Add Givelify to the weekly spoken announcements — prominently, every week. | [unassigned] | Raised as a standing gap, not just an anniversary item. |

---

## Before Tuesday — registration opens

| # | Action | Owner | Notes |
|---|---|---|---|
| ~~9~~ | ~~Set the Sunday-only ticket price~~ **DONE** — Sunday Meal: Adults $65, children $35. Live on the site. | — | See item 32 below: this equals the Weekend Passport adult price. |
| 10 | **BLOCKER — Set the t-shirt price.** Size run (S–4XL) and "no cost difference by size" are confirmed; **the price itself is still missing.** | Anniversary committee | The only unanswered price. Site shows "Price to be announced." |
| 11 | **BLOCKER — Verify what Givelify can actually do.** Specifically: can it take separate giving categories/envelopes per item, and can people select a size or quantity? Log in and look. | Whoever holds the credentials | Nobody in the meeting knew for certain. The site is built to work either way — but the checkout wording changes depending on the answer. |
| 12 | Hand over the Givelify credentials / account access. | [person who said "I'm gonna have that"] | |
| 13 | Get the church payment details from Ms. Gwen and confirm all funds route to the church account. | [unassigned] | |
| 14 | Send the master list of choices people check off at registration. | Shayna | She committed to this twice: *"I will give you a list of everything that we need people to check off."* |
| 15 | Send the full subcommittee list. | Shayna | Only "decorations" was named out loud. |
| 16 | Stand up the Google Sheet + form endpoint and test a live submission end to end. | Web team | Apps Script is written and included — see `docs/GOOGLE-SHEET-SETUP.md`. It still needs to be deployed and tested against the real Sheet. |
| 17 | Flip the site to full registration mode and re-test on a phone. | Web team | |
| 18 | Name a volunteer coordinator so sign-ups have a human destination. | [unassigned] | |

---

## This week

| # | Action | Owner | Notes |
|---|---|---|---|
| ~~19~~ | ~~T-shirt order deadline~~ **DONE** — confirmed no deadline needed. | — | |
| 20 | Build the announcement slideshow from the two flyers. | Shayna | She said she'd make it herself. |
| 21 | Decide the Sunday morning music format — auxiliaries rotating (men's chorus, youth, praise team) vs. standard service. | Music ministry | Proposed and well-received, never decided. Mass choir is off the table. |
| 22 | Confirm **Friday night** start time. | [unassigned] | Sunday morning is now confirmed at 10:00 AM. Friday is still the only unknown time. |
| ~~23~~ | ~~Walker Park entrance~~ **DONE** — 50 May Ave is the address, **entrance is on Oak Street** (behind the Raymond School). Both now shown on the site. | — | |
| ~~24~~ | ~~Name~~ **DONE** — "Family Fun Day", described as a picnic-style family reunion. | — | |
| 25 | Add **2026** to the **10:00 AM service flyer**. | Shayna | The 1:00 PM celebration flyer now reads "SUNDAY, OCTOBER 4TH, 2026" — **done**. The 10:00 AM service flyer still has no year. |
| 26 | Plan the Sunday close-out crew (after the 1:00 PM celebration). | [unassigned] | Explicitly deferred in the meeting. |
| 26a | **Resolve the Sunday setup window.** With the celebration at 1:00 PM there may be little or no gap after morning worship to turn the auditorium around. Move setup to Saturday evening / early Sunday, or end morning worship earlier. | Anniversary committee | Consequence of the time change — never discussed, because the meeting predates it. See MEETING-NOTES §12. |
| 26b | Confirm the meal plan suits a **1:00 PM sitting** (lunch, not dinner). | [unassigned] | Quantities and menu differ from a 4:00 PM event. |
| 26c | Check the Saturday-cleanup and Sunday-setup crews aren't the same exhausted people. | [unassigned] | Saturday cleanup starts 4:00 PM; Sunday setup must finish before 1:00 PM. |
| 27 | Define what each volunteer shift actually does, in one line each, so people know what they're signing up for. | [unassigned] | Raised in the meeting: *"You also need to explain what these hands, bodies are doing in terms of function."* |
| 28 | Set up the reconciliation process between cash/check sales and online registrations. | Ms. Gwen + web team | Two ledgers with no reconciliation plan is how people get double-charged. |

---

## Raised by the latest flyers and pricing

| # | Action | Owner | Notes |
|---|---|---|---|
| 32 | **Confirm the Sunday-only price is intentional.** Sunday Meal adults **$65** is the *same* as the Weekend Passport adults **$65**, which also includes the $20 Saturday picnic. No adult would rationally buy Sunday-only. | Anniversary committee | Built as specified because it is on the approved flyer. If unintended, either drop Sunday-only to ~$45–50 or raise the passport to ~$80. The children's tiers are fine ($35 + $10 = $45 vs. $40 passport). |
| 33 | **Define the age cutoff for the Sunday "children" $35 tier.** The flyer says only "Adults $65, children $35". | Anniversary committee | The site currently charges $35 for everyone under 18 on Sunday. Change `pricing.sunday` in `config.js` if a different cutoff is wanted. |
| ~~34~~ | ~~Typo "Recogniition"~~ **DONE** — corrected flyer received and live. | — | Note the corrected file is 976px wide vs 1195px before, so the full-size view is slightly lower resolution. Fine for screen; ask the designer for a larger export if it will be printed big. |
| 35 | **Turn off Vercel Authentication** so the public can open the site. | Web team | Vercel dashboard → project → Settings → Deployment Protection. Until this is off, the QR code leads to a login wall. Verify in a private browsing window. |

---

## After the weekend

| # | Action | Owner | Notes |
|---|---|---|---|
| 29 | Keep the t-shirt store live after Oct 4. | Web team | Confirmed wanted: *"Yes, we want to make the shirt available."* Built as a standing store section, not a weekend-only form. |
| 30 | Link the landing page from the main church website once that site launches. | Web team | |
| 31 | Export final registration data and hand it to the committee for follow-up. | Web team | |

---

## Decisions already made (no action needed — recorded so they don't get relitigated)

- **Payments go through Givelify, not Stripe.** Church already has the account.
- **The mass choir is cancelled.** No time to rehearse. *"There is no time for that."*
- **A standalone landing page now**, linked from the church site later.
- **Volunteering does not comp a ticket.**
- **T-shirts stay on sale after the event**, as a real store section.
- **Prices are website-only** — not read from the pulpit tomorrow.
- **One shirt color** (maroon), one design, no other merchandise.
- **A donation / love gift option** for people who can't attend.
