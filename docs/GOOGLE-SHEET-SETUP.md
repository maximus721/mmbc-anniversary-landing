# Wiring the registration form to a Google Sheet

This connects the form on the landing page to a Google Sheet the committee can open,
sort and print. Takes about ten minutes.

> **Honest caveat:** I wrote and reviewed this script, but I could not run it — I don't have
> access to your Google account. Google also changes the Apps Script UI wording from time to
> time, so a button label may read slightly differently than what's written here. Do step 6
> (the live test) before you rely on it. If a label doesn't match, look for the nearest
> equivalent rather than assuming it's broken.

---

## 1. Make the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it something like **MMBC 45th Anniversary Registrations**.
3. Leave it empty. The script writes the header row on the first submission.

## 2. Open Apps Script

In the Sheet: **Extensions → Apps Script**. A code editor opens in a new tab.

## 3. Paste the script

Delete whatever is in the editor and paste this in full:

```javascript
/**
 * MMBC 45th Anniversary — registration receiver.
 * Appends each form submission to the active sheet.
 */

var HEADERS = [
  'timestamp', 'mode', 'fullName', 'email', 'phone', 'attending',
  'adults', 'youth13to18', 'childrenUnder12',
  'wantsShirt', 'shirtOrder', 'shirtTotalQty',
  'wantsVolunteer', 'volunteerShifts',
  'wantsDonate', 'notes', 'pageUrl'
];

function doPost(e) {
  // A lock stops two people submitting at the same instant from
  // overwriting each other's row.
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

    var params = (e && e.parameter) ? e.parameter : {};
    var row = HEADERS.map(function (key) {
      return params[key] !== undefined ? params[key] : '';
    });

    sheet.appendRow(row);

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

function doGet() {
  return ContentService.createTextOutput('MMBC 45th registration endpoint is running.');
}
```

Save it (the disk icon, or Ctrl/Cmd+S).

## 4. Deploy it

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** `MMBC 45th registration`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**
4. Click **Deploy**.
5. Google will ask you to authorize. Approve it. You will likely hit a
   *"Google hasn't verified this app"* screen — that's normal for your own script.
   Click **Advanced → Go to (project name)** and continue.
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb.....RANDOM...../exec`

> **"Who has access: Anyone" is required.** The form posts from the public website, so the
> endpoint has to accept anonymous requests. It only ever *appends* rows — it does not read
> the sheet back or expose anything. The URL is unguessable but not secret; if it ever gets
> abused, click **Deploy → Manage deployments → Archive** and deploy a fresh one with a new URL.

## 5. Put the URL in the site

Open `config.js` and paste it in:

```javascript
formEndpoint: "https://script.google.com/macros/s/AKfycb...../exec",
```

Commit and redeploy the site.

## 6. Test it — don't skip this

1. Open the live site on your phone.
2. Fill out the form with your own real name and email.
3. Submit.
4. Check the Sheet. A row should appear within a couple of seconds.

**If nothing appears:** open the browser console (on desktop: right-click → Inspect →
Console) and look for a `[MMBC] submission failed` line. The two usual causes are
"Who has access" not being set to **Anyone**, or the URL being the `/dev` one instead of
the `/exec` one. Copy the `/exec` URL.

## 7. If you change the script later

Editing the code is not enough — you have to **Deploy → Manage deployments → edit (pencil) →
Version: New version → Deploy**. Otherwise the live URL keeps running the old code. This
catches people out constantly.

---

## Optional: email alerts on each registration

To get an email whenever someone registers, add this line inside `doPost`, just before
the `return` that reports success:

```javascript
MailApp.sendEmail(
  'anniversary@yourchurch.org',
  'New 45th anniversary registration: ' + (params.fullName || ''),
  HEADERS.map(function (k) { return k + ': ' + (params[k] || ''); }).join('\n')
);
```

Replace the address with a real one, and redeploy a new version per step 7.

Note that Google caps how many emails a script can send per day (the limit differs between
free Gmail accounts and Workspace accounts — check your account's quota if you expect
high volume). For a church anniversary this is very unlikely to matter.

---

## Alternative if this proves fiddly

If Apps Script fights you and Tuesday is closing in, the fallback is a plain **Google Form**:

1. Build a Google Form with the same fields (name, email, phone, days attending, headcounts,
   shirt size, volunteer shifts).
2. Link it to a Sheet (**Responses → Link to Sheets**).
3. Put its public URL in `config.js` as `googleFormUrl` and leave `formEndpoint` as `""`.

The site's own form will then hand people off to the Google Form instead of submitting
directly. Less elegant, noticeably more reliable to set up under time pressure.
