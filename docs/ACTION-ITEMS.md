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
| 4 | Confirm Ms. Gwen approved the corrected anniversary flyer. | Shayna | It was sent to her mid-meeting and approval hadn't come back yet. |
| 5 | Give the announcement from the front. Save-the-date only — **no prices read aloud.** | Shayna | Script beats are in MEETING-NOTES §9. |
| 6 | Post flyers around the church. | [unassigned] | Near the pastor's office was mentioned. |
| 7 | Staff the Alexander Room for cash/check sales; log every transaction on the spreadsheet. | Ms. Gwen + [unassigned] | Must be reconciled against online registrations later. |
| 8 | Add Givelify to the weekly spoken announcements — prominently, every week. | [unassigned] | Raised as a standing gap, not just an anniversary item. |

---

## Before Tuesday — registration opens

| # | Action | Owner | Notes |
|---|---|---|---|
| 9 | **BLOCKER — Set the Sunday-only ticket price.** It does not exist yet, in any document. Registration cannot open with one of three options priced "TBD." | Anniversary committee | Also decide whether Sunday-only has a youth tier. |
| 10 | **BLOCKER — Set the t-shirt price**, the size run, and whether 3XL/4XL carry the +$2 upcharge. | Anniversary committee | The meeting left this as "I think... but I don't think we're charging." That's not a decision yet. |
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
| 19 | Decide the t-shirt **order deadline** that still lands shirts before Oct 3, and put it on the site. | [unassigned] | Depends on printer turnaround. Nobody raised this in the meeting — flagging it because it's the kind of thing that quietly ruins a shirt order. |
| 20 | Build the announcement slideshow from the two flyers. | Shayna | She said she'd make it herself. |
| 21 | Decide the Sunday morning music format — auxiliaries rotating (men's chorus, youth, praise team) vs. standard service. | Music ministry | Proposed and well-received, never decided. Mass choir is off the table. |
| 22 | Confirm Friday night start time and Sunday morning service time. | [unassigned] | Both missing from every document. |
| 23 | Settle the Walker Park entrance question — May Ave vs. Oak Street — and publish one answer. | [unassigned] | |
| 24 | Pick one name: "Family Fun Day" or "Family Reunion." Use it everywhere. | Shayna | Currently both are in circulation. |
| 25 | Add the year to the anniversary flyer before any large print run. | Shayna | It currently reads "SUNDAY, OCTOBER 4TH" with no year. |
| 26 | Plan the Sunday evening close-out crew. | [unassigned] | Explicitly deferred in the meeting. |
| 27 | Define what each volunteer shift actually does, in one line each, so people know what they're signing up for. | [unassigned] | Raised in the meeting: *"You also need to explain what these hands, bodies are doing in terms of function."* |
| 28 | Set up the reconciliation process between cash/check sales and online registrations. | Ms. Gwen + web team | Two ledgers with no reconciliation plan is how people get double-charged. |

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
