# MMBC 45th Anniversary — Action Items

Compiled from the planning meeting transcript, September 5, 2026.

**Owner names** are taken from the meeting. Where the transcript didn't make the owner clear,
it says **[unassigned]** — please assign it rather than assuming someone picked it up.

**The critical path is short:** announce tomorrow → registration live Tuesday. Only a handful
of these actually block that. Those are marked **BLOCKER**.

---

## UPDATE — 2026-09-23: Family Fun Day canceled

Saturday's Family Fun Day at Walker Park is **canceled**, per direct instruction. Live on the site:

| Change | Status |
|---|---|
| A regretful cancellation notice replaces the old Family Fun Day section (same `#funday` anchor) | ✅ live |
| Removed from: hero carousel, "The Weekend" day grid, tickets copy, flyer gallery, footer address block | ✅ live |
| Saturday park-setup and park-cleanup volunteer shifts removed (form and the Volunteer page) | ✅ live |
| Registration form's "which days" question collapsed to Sunday / can't make it — "Saturday only" and "Both days (Weekend Passport)" removed as choices | ✅ live |
| `pricing.saturday` and `pricing.passport` removed from `config.js`; `pricing.sunday` ($65/$35/$35) left unchanged, per instruction to keep the dinner price the same | ✅ live |
| Tickets section now shows a single Sunday ticket | ✅ live |

**Flagging for the committee, not something I acted on:** a handful of people already registered for "Saturday only" or "Both days (Weekend Passport)" before the cancellation (check the Sheet for `registrationType`). Since the site had just added non-refundable-payments language, worth deciding explicitly whether those registrants get a partial adjustment for the canceled portion — that's a business decision, not something the site can resolve on its own.

---

## UPDATE — 2026-09-07 committee notes (applied 2026-09-08)

These came from `MMBC_45th_20260907_tech_summary.pdf` and are **live on the site**:

| Change | Status |
|---|---|
| "Preparation Night" renamed **Celebration Preparation**, moved to **Friday Sept 25, 6:30 PM** at the church | ✅ live |
| **Registration deadline: Saturday, September 26** | ✅ live, shown as a banner |
| Speakers: **Rev. Lin Dawson (10:00 AM)** and **Rev. Michael Hawkins (1:00 PM)** | ✅ live |
| **T-shirts $20, all sizes, limited quantity until sold out** | ✅ live |
| **No digital payments** — online giving replaced with a pledge, payment in person | ✅ live |
| Registration form output reshaped to match the committee's tracker spreadsheet | ✅ done |
| Confirmation email on registration + payment-confirmation menu | ✅ written, needs deploying — see `docs/GOOGLE-SHEET-SETUP.md` |
| Replace Rev. Neville's flyer with the Rev. Michael Hawkins version | ✅ live (2026-09-08) — swapped for the version showing the "Special Guest Speaker" banner, at Shayna's explicit request. **Trade-off:** this version has no "2026" on it and no costs box (both were on the version it replaces). Prices are still shown on the website itself, but if this flyer gets printed, it reads as year-less. |

### Still open from this round

| # | Action | Owner | Notes |
|---|---|---|---|
| 36 | **BLOCKER — deploy the Apps Script** so registrations land somewhere. Registration is open as of today and there is currently nowhere for a submission to go. | Web team | 15 min. `docs/GOOGLE-SHEET-SETUP.md` has the script, the confirmation email and the test steps. |
| 37 | **Re-send the Rev. Michael Hawkins flyer** as an image file. | Shayna | Site still shows the previous flyer. Note the version pictured also lost the "2026" and the costs box that the last one had. |
| 38 | **Is Friday Oct 2 still a prep night, or does Sept 25 replace it?** The note says decorating "will begin" Sept 25, which could mean more than one session. | Anniversary committee | The site currently shows Sept 25 only. |
| 39 | Confirm the **Sept 26 registration deadline** is what should be advertised, given the event is Oct 3–4. | Anniversary committee | A week's gap is normal for catering counts — just confirming it isn't a typo. |
| 40 | Draft or approve the **wording** of the two confirmation emails. | Shayna | I've written both; they're in `docs/GOOGLE-SHEET-SETUP.md` ready to edit. |
| 41 | Reconcile the **existing paid registrations** (Sheila Forde et al., incl. one Givelify payment on 9/6) with whatever the site collects from today. | Ms. Gwen + web team | 11 attendees and 13 shirts are already recorded in the tracker. |

### 2026-09-08 evening — Shayna's round of change requests

| # | Action | Status | Notes |
|---|---|---|---|
| 42 | Swap 1:00 PM flyer for the version with the speaker banner | ✅ live | See item 37 above for the year/costs trade-off — a conscious call, not an oversight. |
| 43 | Remove "preparation night beforehand" language from the home page's "The Weekend" section | ✅ live | This is separate from item 38's open scheduling question (is there a *second* prep night on Oct 2, distinct from the Sept 25 Celebration Preparation?) — that question is still open. I only removed the sentence per this explicit request; I haven't made a scheduling decision. |
| 44 | Add explicit dates to the Saturday/Sunday volunteer shifts on the "We Need Hands" page | ✅ live | Now reads "Sat, Oct 3" and "Sun, Oct 4" (matching the existing "Fri, Sep 25" format). Also updated the matching checkboxes in the registration form for consistency. |
| 45 | Bug report: registration form headcount section shows "Massachusetts" under ages 13–18 | ⚠️ mitigated, **not confirmed fixed** | I checked the code — there is no literal "Massachusetts" text anywhere near that field; the word only appears in unrelated hero copy. This strongly suggests an iOS Safari autofill quirk (Safari sometimes offers to fill a number field with an address-book value), which I can't reproduce or verify myself outside Safari on an iPhone. I added `autocomplete="off"` to the three headcount fields as a mitigation. **Please retest on the phone that showed the bug and let me know if it's still happening** — if it is, I'll need a screenshot of it live to dig further. |
| 46 | Reg confirmation email should say "see Gwen Hickman for payment" | ✅ email text updated, ⛔ **needs you to redeploy** | Updated in `docs/GOOGLE-SHEET-SETUP.md`'s `sendConfirmation_` function. Since I can't touch your Google account, you'll need to paste the updated script back into Apps Script and do **Deploy → Manage deployments → pencil icon → Version: New version → Deploy** (editing the code alone doesn't update the live URL). I also updated `payInPersonNote` in `config.js` for consistency, but flagging honestly: that config value isn't actually read anywhere in the site's code right now (it's dead/unused), so that edit has no visible effect on the page itself — only the email wording actually changes what people see. |

### Noted for the next meeting (from the same PDF, no action yet)

Music — choirs plus a "gospel chorus" of old-school highlights · Tech — **simulcast from Florida
for Rev. Neville** · collecting well-wish videos · in-memoriam slideshow · dinner music playlist.

The simulcast is the one with a real lead time. Worth naming an owner early.

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
| ~~10~~ | ~~T-shirt price~~ **DONE** — $20, all sizes, limited quantity until sold out. Live. | — | |
| ~~11~~ | ~~Verify Givelify~~ **MOOT** — the church will not collect digital payments. Payment is in person. | — | |
| ~~12~~ | ~~Givelify credentials~~ **MOOT** — no online payments. | — | Note one registrant did already pay via Givelify on 9/6; see item 41. |
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
