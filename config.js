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
  mode: "save-the-date",

  registrationOpensLabel: "Tuesday, September 8",

  /* -------------------------------------------------------------------
     2. WHERE THE FORM SENDS DATA
     Paste your Google Apps Script Web App URL here.
     Setup instructions: docs/GOOGLE-SHEET-SETUP.md
     Leave "" and the form will fall back to the Google Form link below,
     and failing that, to an email link. It will never silently drop a
     submission.
     ------------------------------------------------------------------- */
  formEndpoint: "",

  // Optional fallback: a plain Google Form URL. Used only if
  // formEndpoint is empty.
  googleFormUrl: "",

  /* -------------------------------------------------------------------
     3. PAYMENT
     Paste the church's Givelify giving link.
     NOTE: nobody has confirmed yet whether Givelify supports separate
     categories per item. Until that is checked, the site collects the
     order here and sends people to Givelify to pay the total shown.
     ------------------------------------------------------------------- */
  givelifyUrl: "",

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
    price: null,              // ***STILL NOT SET*** — the only price the
                              // committee hasn't given us. Everything else
                              // is confirmed.
    bigAndTallUpcharge: 0,    // CONFIRMED: no cost difference by size
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    bigAndTallSizes: [],
    orderDeadline: null       // CONFIRMED: no deadline needed
  },

  /* -------------------------------------------------------------------
     7. COUNTDOWN TARGET — Family Fun Day kickoff (Eastern time)
     ------------------------------------------------------------------- */
  countdownTarget: "2026-10-03T12:00:00-04:00"
};
