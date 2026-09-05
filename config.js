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
    saturday: {
      adult:  20,     // from the Family Fun Day flyer
      youth:  10,     // ages 13-18
      child:  0       // under 12 — free
    },
    sunday: {
      adult:  null,   // ***NOT SET*** — this price does not exist yet
      youth:  null,
      child:  null
    },
    passport: {
      adult:  65,     // from the Family Fun Day flyer
      youth:  40,     // under 18
      child:  null
    }
  },

  /* -------------------------------------------------------------------
     6. T-SHIRT
     ------------------------------------------------------------------- */
  shirt: {
    price: null,              // ***NOT SET***
    bigAndTallUpcharge: null, // ***NOT SET*** — meeting floated $2 on
                              // 3XL/4XL but did not decide. Set to 0 if
                              // you decide not to charge extra.
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    bigAndTallSizes: ["3XL", "4XL"],
    orderDeadline: null       // e.g. "September 18, 2026"
  },

  /* -------------------------------------------------------------------
     7. COUNTDOWN TARGET — Family Fun Day kickoff (Eastern time)
     ------------------------------------------------------------------- */
  countdownTarget: "2026-10-03T12:00:00-04:00"
};
