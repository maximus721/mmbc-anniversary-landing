/* =====================================================================
   MMBC 45th Anniversary — behaviour
   Reads everything it can from config.js so the committee can update
   prices and links without touching this file.
   ===================================================================== */
(function () {
  "use strict";

  var CFG = window.MMBC_CONFIG || {};
  var MODE = CFG.mode === "registration" ? "registration" : "save-the-date";
  var PRICING = CFG.pricing || {};
  var SHIRT = CFG.shirt || {};

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function money(n) {
    if (n === 0) return "Free";
    return "$" + Number(n).toLocaleString("en-US");
  }
  function known(v) { return typeof v === "number" && !isNaN(v); }

  /* ==================================================================
     1. NAVIGATION
     ================================================================== */
  var navToggle = $("#navToggle");
  var primaryNav = $("#primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var open = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    primaryNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ==================================================================
     2. COUNTDOWN
     ================================================================== */
  var countdown = $("#countdown");
  if (countdown && CFG.countdownTarget) {
    var target = new Date(CFG.countdownTarget).getTime();

    var tick = function () {
      var diff = target - Date.now();

      if (isNaN(target)) { countdown.hidden = true; return; }

      if (diff <= 0) {
        countdown.className = "countdown countdown--done";
        countdown.textContent = "The weekend is here — come celebrate with us.";
        return;
      }
      var s = Math.floor(diff / 1000);
      var parts = {
        days:    Math.floor(s / 86400),
        hours:   Math.floor(s % 86400 / 3600),
        minutes: Math.floor(s % 3600 / 60),
        seconds: s % 60
      };
      Object.keys(parts).forEach(function (k) {
        var el = countdown.querySelector('[data-cd="' + k + '"]');
        if (el) el.textContent = k === "days" ? parts[k] : String(parts[k]).padStart(2, "0");
      });
      window.setTimeout(tick, 1000);
    };
    tick();
  }

  /* ==================================================================
     3. PRICE RENDERING
     ================================================================== */
  function chip(label, value) {
    if (!known(value)) {
      return '<span class="price-chip price-chip--tbd"><b>To be announced</b> <span>' + label + "</span></span>";
    }
    return '<span class="price-chip"><b>' + money(value) + "</b> <span>" + label + "</span></span>";
  }

  var fundayPrices = $("#fundayPrices");
  if (fundayPrices) {
    var sat = PRICING.saturday || {};
    fundayPrices.innerHTML =
      chip("Adults", sat.adult) +
      chip("Ages 13–18", sat.youth) +
      chip("Under 12", sat.child);
  }

  var sundayPrices = $("#sundayPrices");
  if (sundayPrices) {
    var sun = PRICING.sunday || {};
    if (known(sun.adult)) {
      sundayPrices.innerHTML = chip("Adults", sun.adult) + (known(sun.youth) ? chip("Children", sun.youth) : "");
    } else {
      sundayPrices.innerHTML =
        '<span class="price-chip price-chip--tbd"><b>Ticket price to be announced</b></span>';
    }
  }

  /* --- ticket cards --- */
  function row(label, value) {
    var cls = "ticket-price", text;
    if (!known(value))      { cls += " ticket-price--tbd";  text = "TBA"; }
    else if (value === 0)   { cls += " ticket-price--free"; text = "Free"; }
    else                    { text = money(value); }
    return "<li><span>" + label + '</span><span class="' + cls + '">' + text + "</span></li>";
  }

  var ticketGrid = $("#ticketGrid");
  if (ticketGrid) {
    var s = PRICING.saturday || {}, u = PRICING.sunday || {}, p = PRICING.passport || {};

    var cards = [
      {
        title: "Saturday Only",
        when: "Family Fun Day · Oct 3",
        rows: row("Adults", s.adult) + row("Ages 13–18", s.youth) + row("Children under 12", s.child),
        note: "Picnic style at Walker Park, noon to four. Bring your food, chairs and blankets."
      },
      {
        title: "Sunday Only",
        when: "Anniversary Celebration · Oct 4",
        rows: known(u.adult)
          ? row("Adults", u.adult) + (known(u.youth) ? row("Children", u.youth) : "")
          : '<li><span>Ticket price</span><span class="ticket-price ticket-price--tbd">To be announced</span></li>',
        note: "The one o’clock celebration and meal downstairs, honoring Rev. Eugene L. Neville."
      },
      {
        title: "Weekend Passport",
        when: "Both days · Oct 3 &amp; 4",
        rows: row("Adults", p.adult) + row("Under 18", p.youth),
        note: "The whole weekend in one ticket — Saturday at the park and Sunday’s celebration.",
        feature: true,
        flag: "Best value"
      }
    ];

    ticketGrid.innerHTML = cards.map(function (c) {
      return '<article class="ticket' + (c.feature ? " ticket--feature" : "") + '">' +
        (c.flag ? '<span class="ticket-flag">' + c.flag + "</span>" : "") +
        "<h3>" + c.title + "</h3>" +
        '<p class="ticket-when">' + c.when + "</p>" +
        '<ul class="ticket-rows">' + c.rows + "</ul>" +
        '<p class="ticket-note">' + c.note + "</p>" +
        "</article>";
    }).join("");
  }

  /* --- shirt price --- */
  var shirtPriceEl = $("#shirtPrice");
  if (shirtPriceEl) {
    if (known(SHIRT.price)) {
      var extra = known(SHIRT.bigAndTallUpcharge) && SHIRT.bigAndTallUpcharge > 0
        ? "<small>" + (SHIRT.bigAndTallSizes || []).join(" &amp; ") + " add " + money(SHIRT.bigAndTallUpcharge) + "</small>"
        : "<small>Same price, every size</small>";
      shirtPriceEl.innerHTML = money(SHIRT.price) + extra;
    } else {
      shirtPriceEl.className = "store-price store-price--tbd";
      shirtPriceEl.textContent = "Price to be announced";
    }
  }

  var sizesLine = $("#shirtSizesLine");
  if (sizesLine && SHIRT.sizes && SHIRT.sizes.length) {
    sizesLine.innerHTML = "Sizes " + SHIRT.sizes[0] + " through " + SHIRT.sizes[SHIRT.sizes.length - 1];
  }

  var deadlineLine = $("#shirtDeadlineLine");
  if (deadlineLine && SHIRT.orderDeadline) {
    deadlineLine.innerHTML = "<strong>Order by " + SHIRT.orderDeadline + "</strong> to have your shirt for the weekend";
    deadlineLine.hidden = false;
  }

  /* ==================================================================
     4. CONTACT + GIVE LINKS
     ================================================================== */
  var footerContact = $("#footerContact");
  if (footerContact) {
    var bits = [];
    if (CFG.contactEmail) bits.push('<a href="mailto:' + CFG.contactEmail + '">' + CFG.contactEmail + "</a>");
    if (CFG.contactPhone) bits.push('<a href="tel:' + CFG.contactPhone.replace(/[^0-9+]/g, "") + '">' + CFG.contactPhone + "</a>");
    footerContact.innerHTML = bits.join("<br>");
  }

  var giveActions = $("#giveActions");
  if (giveActions) {
    if (CFG.givelifyUrl) {
      giveActions.innerHTML =
        '<a class="btn btn-gold" href="' + CFG.givelifyUrl + '" target="_blank" rel="noopener">Give through Givelify</a>';
    } else {
      giveActions.innerHTML =
        '<p class="give-pending">Online giving link coming shortly</p>';
    }
  }

  /* ==================================================================
     5. LIGHTBOX
     ================================================================== */
  var lightbox = $("#lightbox");
  var lightboxImg = $("#lightboxImg");
  var lightboxClose = $("#lightboxClose");
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (lightbox) {
    $$("[data-lightbox]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var img = link.querySelector("img");
        // Text links (no thumbnail) carry their description in data-alt.
        var alt = img ? img.alt : (link.getAttribute("data-alt") || link.getAttribute("aria-label") || "");
        openLightbox(link.getAttribute("href"), alt);
      });
    });
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ==================================================================
     6. LAUNCH MODE
     ================================================================== */
  var notice = $("#modeNotice");
  var form = $("#regForm");

  if (MODE === "save-the-date") {
    if (notice) {
      notice.hidden = false;
      $("#modeNoticeText").innerHTML =
        "Registration opens <strong>" + (CFG.registrationOpensLabel || "soon") +
        "</strong>. Leave your name below and we’ll send you the link the moment it’s live.";
    }
    $$("[data-reg-only]").forEach(function (el) {
      el.hidden = true;
      $$("input, select", el).forEach(function (i) { i.required = false; i.disabled = true; });
    });

    var h = $("#registerHeading");
    if (h) h.textContent = "Be first to know";

    var lede = $("#registerLede");
    if (lede) {
      lede.innerHTML = "Registration opens <strong>" + (CFG.registrationOpensLabel || "soon") +
        "</strong>. Tell us you’re interested and we’ll send you the link — " +
        "and you can already tell us about a shirt or volunteering.";
    }

    var btnLabel = $("#submitBtn .btn-label");
    if (btnLabel) btnLabel.textContent = "Send me the registration link";

    var fine = $("#formFineprint");
    if (fine) fine.textContent = "No payment now. We’ll email you when registration opens.";

    // If there is nowhere to send a submission yet, do NOT show a form that
    // will error when somebody uses it. Say plainly that registration opens
    // later. The form comes back the moment formEndpoint is configured.
    if (!CFG.formEndpoint && !CFG.googleFormUrl && form) {
      form.hidden = true;

      var panel = document.createElement("div");
      panel.className = "reg-pending";
      panel.innerHTML =
        '<p class="reg-pending-badge">Opens ' + (CFG.registrationOpensLabel || "soon") + "</p>" +
        "<h3>Registration isn’t open yet</h3>" +
        "<p>Ticket prices for the whole weekend are listed above so you can plan. " +
        "Come back on <strong>" + (CFG.registrationOpensLabel || "opening day") +
        "</strong> to register and pay." +
        (CFG.contactEmail
          ? ' In the meantime you can reach the committee at <a href="mailto:' +
            CFG.contactEmail + '">' + CFG.contactEmail + "</a>."
          : " In the meantime, speak to any member of the anniversary committee.") +
        "</p>" +
        '<a class="btn btn-maroon" href="#tickets">Review ticket prices</a>';

      form.parentNode.insertBefore(panel, form);
    }
  }

  /* ==================================================================
     7. FORM — dynamic sections
     ================================================================== */
  if (form) {

    /* --- shirt rows --- */
    var wantsShirt   = $("#wantsShirt");
    var shirtRows    = $("#shirtRows");
    var shirtRowList = $("#shirtRowList");
    var addShirtRow  = $("#addShirtRow");
    var rowSeq = 0;

    function sizeOptions() {
      return (SHIRT.sizes || []).map(function (sz) {
        return '<option value="' + sz + '">' + sz + "</option>";
      }).join("");
    }

    function makeShirtRow() {
      rowSeq += 1;
      var id = "shirtSize" + rowSeq, qid = "shirtQty" + rowSeq;
      var div = document.createElement("div");
      div.className = "shirt-row";
      div.innerHTML =
        '<div class="field"><label for="' + id + '">Size</label>' +
        '<select id="' + id + '" name="shirtSize" data-shirt-size>' +
        '<option value="">Choose a size</option>' + sizeOptions() + "</select></div>" +
        '<div class="field"><label for="' + qid + '">Qty</label>' +
        '<input type="number" id="' + qid + '" name="shirtQty" data-shirt-qty min="1" max="20" step="1" value="1" inputmode="numeric"></div>' +
        '<button type="button" class="shirt-remove" aria-label="Remove this size">&times;</button>';

      div.querySelector(".shirt-remove").addEventListener("click", function () {
        if (shirtRowList.children.length > 1) { div.remove(); }
        else { div.querySelector("select").value = ""; }
        updateEstimate();
      });
      div.addEventListener("change", updateEstimate);
      return div;
    }

    if (wantsShirt) {
      wantsShirt.addEventListener("change", function () {
        shirtRows.hidden = !wantsShirt.checked;
        if (wantsShirt.checked && !shirtRowList.children.length) {
          shirtRowList.appendChild(makeShirtRow());
        }
        updateEstimate();
      });
    }
    if (addShirtRow) {
      addShirtRow.addEventListener("click", function () {
        shirtRowList.appendChild(makeShirtRow());
      });
    }

    /* --- volunteer shifts --- */
    var wantsVolunteer = $("#wantsVolunteer");
    var volunteerShifts = $("#volunteerShifts");
    if (wantsVolunteer) {
      wantsVolunteer.addEventListener("change", function () {
        volunteerShifts.hidden = !wantsVolunteer.checked;
      });
    }

    /* ==================================================================
       8. LIVE ESTIMATE
       ================================================================== */
    var estimateEl = $("#estimate");

    function getAttending() {
      var r = form.querySelector('input[name="attending"]:checked');
      return r ? r.value : "";
    }
    function num(id) {
      var el = $("#" + id);
      var v = el ? parseInt(el.value, 10) : 0;
      return isNaN(v) || v < 0 ? 0 : v;
    }

    function shirtOrder() {
      var out = [];
      $$("[data-shirt-size]", form).forEach(function (sel) {
        var rowEl = sel.closest(".shirt-row");
        var qty = parseInt(rowEl.querySelector("[data-shirt-qty]").value, 10);
        if (sel.value && qty > 0) out.push({ size: sel.value, qty: qty });
      });
      return out;
    }

    function updateEstimate() {
      if (!estimateEl || MODE !== "registration") return;

      var attending = getAttending();
      if (!attending || attending === "Cannot attend") { estimateEl.innerHTML = ""; return; }

      var tier = attending.indexOf("Saturday") === 0 ? PRICING.saturday
               : attending.indexOf("Sunday") === 0   ? PRICING.sunday
               : PRICING.passport;
      tier = tier || {};

      var adults = num("countAdults"), youth = num("countYouth"), children = num("countChildren");
      var lines = [], total = 0, incomplete = false;

      function add(label, count, price) {
        if (count <= 0) return;
        if (!known(price)) {
          incomplete = true;
          lines.push("<li><span>" + label + " × " + count + "</span><span>price TBA</span></li>");
          return;
        }
        var sub = price * count;
        total += sub;
        lines.push("<li><span>" + label + " × " + count + "</span><span>" + (sub === 0 ? "Free" : money(sub)) + "</span></li>");
      }

      add("Adults", adults, tier.adult);

      var isSaturday = attending.indexOf("Saturday") === 0;
      var isSunday   = attending.indexOf("Sunday") === 0;

      // Sunday is priced "Adults / children" with no age split, so the two
      // child tiers collapse into one line rather than repeating "Children".
      if (isSunday && tier.youth === tier.child) {
        add("Children", youth + children, tier.youth);
      } else {
        add(isSaturday ? "Ages 13–18" : "Under 18", youth, tier.youth);

        if (children > 0) {
          if (isSaturday) {
            add("Children under 12", children, 0);
          } else if (known(tier.child)) {
            add("Children under 12", children, tier.child);
          } else {
            incomplete = true;
            lines.push("<li><span>Children under 12 × " + children + "</span><span>price TBA</span></li>");
          }
        }
      }

      var shirts = wantsShirt && wantsShirt.checked ? shirtOrder() : [];
      shirts.forEach(function (s) {
        var big = (SHIRT.bigAndTallSizes || []).indexOf(s.size) !== -1;
        var each = known(SHIRT.price)
          ? SHIRT.price + (big && known(SHIRT.bigAndTallUpcharge) ? SHIRT.bigAndTallUpcharge : 0)
          : null;
        add("T-shirt (" + s.size + ")", s.qty, each);
      });

      if (!lines.length) { estimateEl.innerHTML = ""; return; }

      estimateEl.innerHTML =
        '<ul class="estimate-lines">' + lines.join("") + "</ul>" +
        '<p class="estimate-total"><span>Estimated total</span><span>' + money(total) + "</span></p>" +
        (incomplete
          ? '<p class="estimate-note">Some prices are still being finalised — we’ll confirm your full total by email before you pay.</p>'
          : '<p class="estimate-note">This is an estimate. We’ll confirm it by email with payment instructions.</p>');
    }

    form.addEventListener("change", updateEstimate);
    form.addEventListener("input", function (e) {
      if (e.target.type === "number") updateEstimate();
    });

    /* ==================================================================
       9. VALIDATION
       ================================================================== */
    function setError(name, message) {
      var msgEl = form.querySelector('[data-err-for="' + name + '"]');
      var input = form.querySelector('[name="' + name + '"]');
      if (msgEl) {
        msgEl.textContent = message || "";
        msgEl.hidden = !message;
      }
      if (input) {
        if (message) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }
    }

    function validate() {
      var errors = [];

      var name = $("#fullName");
      if (!name.value.trim()) { setError("fullName", "Please tell us your name."); errors.push(name); }
      else setError("fullName", "");

      var email = $("#email");
      if (!email.value.trim()) { setError("email", "We need an email to send you details."); errors.push(email); }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setError("email", "That email doesn’t look right."); errors.push(email);
      } else setError("email", "");

      var phone = $("#phone");
      var digits = phone.value.replace(/\D/g, "");
      if (!digits) { setError("phone", "Please add a phone number."); errors.push(phone); }
      else if (digits.length < 10) { setError("phone", "Please enter a full 10-digit phone number."); errors.push(phone); }
      else setError("phone", "");

      if (MODE === "registration") {
        if (!getAttending()) {
          setError("attending", "Please choose which days you’re attending.");
          errors.push(form.querySelector('input[name="attending"]'));
        } else setError("attending", "");
      }

      return errors;
    }

    /* ==================================================================
       10. SUBMIT
       ================================================================== */
    var statusEl = $("#formStatus");
    var submitBtn = $("#submitBtn");

    function showStatus(kind, title, body) {
      statusEl.className = "form-status form-status--" + kind;
      statusEl.innerHTML = "<strong>" + title + "</strong>" + body;
      statusEl.hidden = false;
      statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function fallbackBody() {
      if (CFG.googleFormUrl) {
        return 'Please use <a href="' + CFG.googleFormUrl + '" target="_blank" rel="noopener">this form</a> instead ' +
               "— it goes to the same place.";
      }
      if (CFG.contactEmail) {
        return 'Please email us at <a href="mailto:' + CFG.contactEmail + '">' + CFG.contactEmail +
               "</a> and we’ll get you registered.";
      }
      return "Please try again in a moment, or speak to a member of the anniversary committee.";
    }

    function buildPayload() {
      var shifts = $$('input[name="shifts"]:checked', form).map(function (c) { return c.value; });
      var shirts = shirtOrder();

      return {
        timestamp:     new Date().toISOString(),
        mode:          MODE,
        fullName:      $("#fullName").value.trim(),
        email:         $("#email").value.trim(),
        phone:         $("#phone").value.trim(),
        attending:     MODE === "registration" ? getAttending() : "(save the date — registration not yet open)",
        adults:        MODE === "registration" ? num("countAdults")   : "",
        youth13to18:   MODE === "registration" ? num("countYouth")    : "",
        childrenUnder12: MODE === "registration" ? num("countChildren") : "",
        wantsShirt:    wantsShirt && wantsShirt.checked ? "Yes" : "No",
        shirtOrder:    shirts.map(function (s) { return s.size + " x" + s.qty; }).join(", "),
        shirtTotalQty: shirts.reduce(function (a, s) { return a + s.qty; }, 0),
        wantsVolunteer: wantsVolunteer && wantsVolunteer.checked ? "Yes" : "No",
        volunteerShifts: shifts.join(", "),
        wantsDonate:   $("#wantsDonate").checked ? "Yes" : "No",
        notes:         $("#notes").value.trim(),
        pageUrl:       window.location.href
      };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot — a bot filled the hidden field
      if ($("#website").value) return;

      var errors = validate();
      if (errors.length) {
        errors[0].focus();
        showStatus("err", "Please check the highlighted fields",
          "A couple of things need fixing before we can send this.");
        return;
      }

      if (!CFG.formEndpoint) {
        showStatus("err", "Registration isn’t connected yet", fallbackBody());
        return;
      }

      submitBtn.disabled = true;
      $("#submitBtn .btn-label").textContent = "Sending…";
      statusEl.hidden = true;

      var payload = buildPayload();
      var body = new URLSearchParams();
      Object.keys(payload).forEach(function (k) { body.append(k, payload[k]); });

      fetch(CFG.formEndpoint, { method: "POST", body: body })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.text();
        })
        .then(function () {
          form.reset();
          if (shirtRows) shirtRows.hidden = true;
          if (volunteerShifts) volunteerShifts.hidden = true;
          if (shirtRowList) shirtRowList.innerHTML = "";
          if (estimateEl) estimateEl.innerHTML = "";

          showStatus("ok",
            MODE === "registration" ? "You’re registered — thank you!" : "Thank you — you’re on the list",
            MODE === "registration"
              ? "We’ve got your details. Watch your email for your total and how to pay. " +
                "We can’t wait to celebrate 45 years with you."
              : "We’ll email you as soon as registration opens on " +
                (CFG.registrationOpensLabel || "Tuesday") + ".");
        })
        .catch(function (err) {
          if (window.console) console.error("[MMBC] submission failed:", err);
          showStatus("err", "We couldn’t send that", fallbackBody());
        })
        .then(function () {
          submitBtn.disabled = false;
          $("#submitBtn .btn-label").textContent =
            MODE === "registration" ? "Submit registration" : "Send me the registration link";
        });
    });

    updateEstimate();
  }

  /* ==================================================================
     11. CONFIG SANITY WARNINGS (console only, for whoever deploys)
     ================================================================== */
  if (window.console) {
    var warn = [];
    if (!CFG.formEndpoint && !CFG.googleFormUrl) warn.push("formEndpoint / googleFormUrl not set — the form cannot submit.");
    if (!CFG.givelifyUrl) warn.push("givelifyUrl not set — the Give button is hidden.");
    if (!known((PRICING.sunday || {}).adult)) warn.push("pricing.sunday.adult not set — showing 'To be announced'.");
    if (!known(SHIRT.price)) warn.push("shirt.price not set — showing 'To be announced'.");
    if (!CFG.contactEmail) warn.push("contactEmail not set — no fallback contact shown.");
    if (warn.length) {
      console.warn("[MMBC 45th] Configuration still incomplete:\n • " + warn.join("\n • ") +
                   "\nEdit config.js to fix.");
    }
  }
})();
