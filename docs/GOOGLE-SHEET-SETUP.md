# Where registrations go, and the confirmation email

This answers two questions from the 2026-09-07 notes:

> *"How can we get their order to the form attached?"*
> *"Where do the registrations go?"*

**Short answer:** the website form writes a row straight into a Google Sheet laid out with the
same columns as `MMBC_45th_Pre_Registration_Tracker.xlsx`, and emails the registrant a
confirmation telling them what they owe and that payment is in person.

Setup takes about fifteen minutes and only has to be done once.

> **Honest caveat:** I wrote and reviewed this script but could not run it — I have no access to
> your Google account. Google also changes the Apps Script wording from time to time, so a button
> label may read slightly differently. **Do step 6 (the live test) before you rely on it.**

---

## 1. Make the Sheet

1. Open your existing `MMBC_45th_Pre_Registration_Tracker.xlsx` in Google Sheets
   (**File → Import**, or just upload it to Drive and open it), *or* start a new blank sheet.
2. Name it **MMBC 45th Anniversary Registrations**.
3. The script writes the header row itself on the first submission, so a blank sheet is fine.
   If you keep the existing tracker, make sure the **first tab** is the one you want rows added to.

## 2. Open Apps Script

**Extensions → Apps Script**. A code editor opens in a new tab.

## 3. Paste the script

Delete whatever is there and paste this in full. **Change the two addresses at the top.**

```javascript
/**
 * MMBC 45th Anniversary — registration receiver.
 * Appends each submission to the sheet and emails a confirmation.
 */

// ---- EDIT THESE TWO LINES ----------------------------------------
var COMMITTEE_EMAIL = 'anniversary@yourchurch.org';  // gets a copy of every registration
var REPLY_TO        = 'anniversary@yourchurch.org';  // where registrants' replies go
// ------------------------------------------------------------------

var HEADERS = [
  'timestamp', 'registrant', 'phone', 'email',
  'registrationType', 'registrationQty',
  'adults', 'youth13to18', 'childrenUnder12',
  'tshirtQty', 'tshirtSizes',
  'amountDue', 'amountPaid', 'paymentStatus', 'paymentMethod', 'paymentDate',
  'volunteer', 'volunteerArea', 'pledgeGift', 'notes', 'mode', 'pageUrl',
  'giftRestricted'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
           .setFontWeight('bold')
           .setBackground('#3F060D')
           .setFontColor('#F6E9C6');
      sheet.setFrozenRows(1);
    }

    var p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow(HEADERS.map(function (k) {
      return p[k] !== undefined ? p[k] : '';
    }));

    sendConfirmation_(p);
    notifyCommittee_(p);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Confirmation to the person who registered. */
function sendConfirmation_(p) {
  if (!p.email) return;

  var name = (p.registrant || 'Friend').split(' ')[0];
  var due  = p.amountDue ? '$' + p.amountDue : 'to be confirmed';

  var lines = [
    'Dear ' + name + ',',
    '',
    'Thank you for registering for the Mount Moriah Baptist Church 45th Anniversary.',
    'We have you down for the following:',
    '',
    '  Attending:  ' + (p.registrationType || ''),
    '  People:     ' + (p.registrationQty || ''),
  ];

  if (p.tshirtQty && p.tshirtQty !== '0') {
    lines.push('  T-shirts:   ' + p.tshirtQty + '  (' + (p.tshirtSizes || '') + ')');
  }
  if (p.volunteer === 'Yes') {
    lines.push('  Volunteer:  ' + (p.volunteerArea || 'yes — thank you!'));
  }
  if (p.pledgeGift === 'Yes') {
    lines.push('  Gift:       pledged — thank you' +
      (p.giftRestricted === 'Yes' ? ' (restricted to Rev. Neville\'s pastor\'s gift)' : ''));
  }

  lines = lines.concat([
    '',
    '  AMOUNT DUE: ' + due,
    '',
    'HOW TO PAY',
    'Payment is in person at the church — cash or check. Please see Gwen Hickman,',
    'or the Alexander Room on Sundays.',
    'We are not able to take payment online.',
    '',
    'Please pay by Saturday, September 26 so we can finalise numbers.',
    '',
    'Your registration is not complete until payment is received.',
    '',
    'Faith - Family - Community - A Brighter Tomorrow',
    '',
    'Mount Moriah Baptist Church',
    '24 Pleasant Street, Brockton, MA 02301'
  ]);

  MailApp.sendEmail({
    to: p.email,
    replyTo: REPLY_TO,
    subject: 'You are registered — MMBC 45th Anniversary',
    body: lines.join('\n')
  });
}

/** Heads-up to the committee so nobody has to watch the sheet. */
function notifyCommittee_(p) {
  if (!COMMITTEE_EMAIL || COMMITTEE_EMAIL.indexOf('yourchurch.org') !== -1) return;

  MailApp.sendEmail({
    to: COMMITTEE_EMAIL,
    subject: 'New 45th registration: ' + (p.registrant || ''),
    body: HEADERS.map(function (k) { return k + ': ' + (p[k] || ''); }).join('\n')
  });
}

function doGet() {
  return ContentService.createTextOutput('MMBC 45th registration endpoint is running.');
}
```

Save it (the disk icon, or Ctrl/Cmd+S).

## 4. Deploy it

1. **Deploy → New deployment**
2. Gear next to "Select type" → **Web app**
3. **Execute as: Me** · **Who has access: Anyone**
4. **Deploy**, then authorize. You'll hit a *"Google hasn't verified this app"* screen — normal
   for your own script. **Advanced → Go to (project name)** → continue.
5. Copy the **Web app URL**, ending in `/exec`.

> "Anyone" is required — the form posts from the public website. The script only ever *appends*
> rows and sends mail; it never reads the sheet back. If it's ever abused, **Deploy → Manage
> deployments → Archive** and deploy a fresh one with a new URL.

## 5. Put the URL in the site

In `config.js`:

```javascript
formEndpoint: "https://script.google.com/macros/s/AKfycb...../exec",
```

Commit and push. Vercel redeploys automatically.

## 6. Test it — do not skip this

1. Open the live site on your phone.
2. Register with **your own real name and email**.
3. Submit.
4. Check three things: a row appears in the Sheet, **you receive the confirmation email**, and
   the amount due on it matches what the site showed you.

**If nothing appears:** open the browser console and look for `[MMBC] submission failed`. The two
usual causes are "Who has access" not set to **Anyone**, or having copied the `/dev` URL instead
of `/exec`.

**If the row appears but no email arrives:** check spam, then confirm the address you registered
with is correct. Gmail also caps how many emails a script may send per day — the limit differs
between free and Workspace accounts. For a church anniversary you are very unlikely to hit it,
but check your account's quota if you expect a rush.

## 7. Changing the script later

Editing the code is not enough. You must **Deploy → Manage deployments → pencil icon →
Version: New version → Deploy**. Otherwise the live URL keeps running the old code. This catches
people out constantly.

---

## The payment confirmation email

The notes also asked for an email when payment is received. That one **can't be automatic** —
nothing tells the computer that cash changed hands. It needs a human to mark it.

Add this to the same script, then use the menu it creates:

```javascript
/** Adds a menu: select the paid rows, then MMBC 45th -> Send payment confirmation. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('MMBC 45th')
    .addItem('Send payment confirmation for selected rows', 'sendPaymentConfirmations')
    .addToUi();
}

function sendPaymentConfirmations() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows  = sheet.getActiveRange();
  var head  = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  var col = {};
  head.forEach(function (h, i) { col[h] = i; });

  var sent = 0;
  var values = rows.getValues();

  for (var i = 0; i < values.length; i++) {
    var r = values[i];
    var email = r[col['email']];
    if (!email) continue;

    var name = String(r[col['registrant']] || 'Friend').split(' ')[0];

    MailApp.sendEmail({
      to: email,
      replyTo: REPLY_TO,
      subject: 'Payment received — MMBC 45th Anniversary',
      body: [
        'Dear ' + name + ',',
        '',
        'We have received your payment of $' + (r[col['amountPaid']] || '') + '.',
        'Your registration for the 45th Anniversary is now complete.',
        '',
        '  Attending: ' + (r[col['registrationType']] || ''),
        (r[col['tshirtQty']] ? '  T-shirts:  ' + r[col['tshirtQty']] +
                               ' (' + (r[col['tshirtSizes']] || '') + ')' : ''),
        '',
        'We look forward to celebrating with you on October 3rd and 4th.',
        '',
        'Faith - Family - Community - A Brighter Tomorrow',
        '',
        'Mount Moriah Baptist Church'
      ].filter(String).join('\n')
    });
    sent++;
  }

  SpreadsheetApp.getUi().alert('Sent ' + sent + ' payment confirmation(s).');
}
```

**How to use it:** when someone pays, fill in `amountPaid`, `paymentMethod` and `paymentDate`,
set `paymentStatus` to `Paid`, then select that row and choose
**MMBC 45th → Send payment confirmation for selected rows**.

Reload the spreadsheet once after adding this — the menu only appears on open.

---

## If Apps Script fights you

Fallback, if time runs short: build a plain **Google Form** with the same fields, link it to a
Sheet (**Responses → Link to Sheets**), and put its URL in `config.js` as `googleFormUrl` with
`formEndpoint` left empty. The site will hand people off to the Google Form instead.

You lose the automatic confirmation email and the tidy column layout, but it takes five minutes
and it will not fail on the day. Google Forms can send a response receipt if you enable it in
the form's settings.
