/* =====================================================================
   MMBC 45th Anniversary — SITE CONFIGURATION

   This is the only file you need to edit for day-to-day changes.
   You do not need to touch index.html, styles.css or app.js.

   Anything set to null shows on the site as "To be announced" instead
   of a made-up number. Fill them in as decisions come back.
   ===================================================================== */

window.MMBC_CONFIG = {

  /* -------------------------------------------------------------------
     1. LAUNCH MODE
     "save-the-date" : flyers + schedule + email capture. Registration
                       shows as "opens Tuesday". Use this for Sunday.
     "registration"  : full registration form, tickets and store live.
     ------------------------------------------------------------------- */
  mode: "registration",

  registrationOpensLabel: "Tuesday, September 8",

  // CONFIRMED 2026-09-07: registration closes Saturday, September 26.
  registrationDeadline: "Saturday, September 26, 2026",

  /* -------------------------------------------------------------------
     2. WHERE THE FORM SENDS DATA
     Paste your Google Apps Script Web App URL here.
     Setup instructions: docs/GOOGLE-SHEET-SETUP.md
     Leave "" and the form will fall back to the Google Form link below,
     and failing that, to an email link. It will never silently drop a
     submission.
     ------------------------------------------------------------------- */
  formEndpoint: "https://script.google.com/macros/s/AKfycbygZcnUHas3OerUI_MOExLmpnyYEIHf0lqT2ARWQxbYCup_nyQ5zt2mkmDyyXRRxsaO/exec",

  // Optional fallback: a plain Google Form URL. Used only if
  // formEndpoint is empty.
  googleFormUrl: "",

  /* -------------------------------------------------------------------
     3. PAYMENT — IN PERSON ONLY
     Decided 2026-09-07: the church cannot collect digital payments for
     the anniversary. Registration is a PLEDGE; people pay in person at
     the church. The site therefore takes no card details and shows no
     online giving button.
     Leave givelifyUrl empty unless that decision is reversed.
     ------------------------------------------------------------------- */
  paymentMode: "in-person",
  givelifyUrl: "",

  // Where and when people pay. Shown on the registration and pledge
  // sections so nobody is left guessing.
  payInPersonNote: "Pay at the church — see Gwen Hickman, or the Alexander Room on Sundays.",

  /* -------------------------------------------------------------------
     4. CONTACT
     ------------------------------------------------------------------- */
  contactEmail: "",           // e.g. "anniversary@mmbcbrockton.org"
  contactPhone: "",           // e.g. "(508) 555-0123"

  /* -------------------------------------------------------------------
     5. PRICING
     null = "To be announced" on the site. Numbers are whole dollars.
     ------------------------------------------------------------------- */
  pricing: {
    // Saturday Picnic — Family Fun Day at Walker Park
    saturday: {
      adult:  20,
      youth:  10,     // ages 13-18
      child:  0       // under 12 — free
    },
    // Sunday Meal — the 1:00 PM Anniversary Celebration
    // The flyer gives two tiers only: "Adults $65, children $35". The age
    // boundary for "children" was never stated, so both the 13-18 and the
    // under-12 tiers are set to $35 here. Change if a cutoff is decided.
    sunday: {
      adult:  65,
      youth:  35,
      child:  35
    },
    // Weekend Passport — both days
    passport: {
      adult:  65,
      youth:  40,     // under 18
      child:  40
    }
  },

  /* -------------------------------------------------------------------
     6. T-SHIRT
     ------------------------------------------------------------------- */
  shirt: {
    price: 20,                // CONFIRMED: $20, every size
    bigAndTallUpcharge: 0,    // CONFIRMED: no cost difference by size
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    bigAndTallSizes: [],
    orderDeadline: null,      // No date deadline — but see limitedStock below
    limitedStock: true        // "Limited quantity, available until sold out"
  },

  /* -------------------------------------------------------------------
     7. COUNTDOWN TARGET — Family Fun Day kickoff (Eastern time)
     ------------------------------------------------------------------- */
  countdownTarget: "2026-10-03T12:00:00-04:00"
};
