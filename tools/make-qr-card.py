#!/usr/bin/env python3
"""
Build a branded "scan me" card around the anniversary QR code.

    python3 tools/make-qr-card.py "https://mmbc-anniversary-landing.vercel.app"

Writes into assets/qr/:
    anniversary-qr-card.png         portrait, for print and posting on a wall
    anniversary-qr-slide.png        1920x1080, for the announcement slideshow

The URL is printed in plain text under the code on purpose: not everyone
will scan, and some older phones still won't. Anyone can read and type it.

Needs the site fonts as TTF. It falls back to DejaVu if they're missing,
which still works but won't match the flyers.
"""

import os
import sys

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "qr")

MAROON_900 = (63, 6, 13)
MAROON_800 = (85, 10, 20)
GOLD_300   = (232, 200, 127)
GOLD_500   = (198, 152, 43)
CREAM      = (251, 246, 236)
WHITE      = (255, 255, 255)

FONT_DIRS = [
    "/tmp/claude-0/-home-user-mmbc-anniversary-landing/c1a0aeb3-ab29-5aa4-9bac-b24f7590393c/scratchpad/ttf",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "ttf"),
]
FALLBACK = "/usr/share/fonts/truetype/dejavu/"


def load_font(name, size):
    from PIL import ImageFont
    candidates = [os.path.join(d, name) for d in FONT_DIRS]
    candidates += [
        FALLBACK + ("DejaVuSerif-Bold.ttf" if "cinzel" in name or "cormorant" in name
                    else "DejaVuSans.ttf")
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    from PIL import ImageFont as IF
    return IF.load_default()


def centre(draw, text, font, y, width, fill):
    bb = draw.textbbox((0, 0), text, font=font)
    draw.text(((width - (bb[2] - bb[0])) / 2 - bb[0], y), text, font=font, fill=fill)
    return bb[3] - bb[1]


def qr_image(url, px):
    import qrcode
    from PIL import Image
    # Full 4-module quiet zone per the QR spec. A narrower border still
    # encodes correctly but some decoders refuse it, so don't economise here.
    common = dict(error_correction=qrcode.constants.ERROR_CORRECT_H, border=4)

    probe = qrcode.QRCode(box_size=10, **common)
    probe.add_data(url)
    probe.make(fit=True)
    modules = probe.modules_count + 2 * common["border"]

    box = max(1, round(px / modules))
    qr = qrcode.QRCode(box_size=box, **common)
    qr.add_data(url)
    qr.make(fit=True)
    return qr.make_image(fill_color=MAROON_900, back_color=WHITE).convert("RGB")


def build(url, size, layout):
    from PIL import Image, ImageDraw

    W, H = size
    img = Image.new("RGB", (W, H), MAROON_900)
    d = ImageDraw.Draw(img)

    # Gold rule top and bottom, echoing the flyers.
    d.rectangle([0, 0, W, int(H * 0.012)], fill=GOLD_500)
    d.rectangle([0, H - int(H * 0.012), W, H], fill=GOLD_500)

    if layout == "portrait":
        f_kicker = load_font("source-sans-3.ttf", int(W * 0.038))
        f_title  = load_font("cinzel.ttf",        int(W * 0.088))
        f_sub    = load_font("cormorant-italic.ttf", int(W * 0.052))
        f_url    = load_font("source-sans-3.ttf", int(W * 0.036))
        f_foot   = load_font("cormorant-italic.ttf", int(W * 0.040))

        y = int(H * 0.065)
        y += centre(d, "MOUNT MORIAH BAPTIST CHURCH", f_kicker, y, W, GOLD_500) + int(H * 0.030)
        y += centre(d, "45th ANNIVERSARY", f_title, y, W, GOLD_300) + int(H * 0.024)
        y += centre(d, "October 3-4, 2026", f_sub, y, W, CREAM) + int(H * 0.042)

        qr_px = int(W * 0.62)
        qr = qr_image(url, qr_px)
        pad = int(qr.size[0] * 0.055)
        plate = Image.new("RGB", (qr.size[0] + pad * 2, qr.size[1] + pad * 2), WHITE)
        plate.paste(qr, (pad, pad))
        img.paste(plate, ((W - plate.size[0]) // 2, y))
        y += plate.size[1] + int(H * 0.040)

        y += centre(d, "Scan for schedule, tickets & t-shirts", f_foot, y, W, GOLD_300) + int(H * 0.026)
        centre(d, url.replace("https://", ""), f_url, y, W, CREAM)

    else:  # slide: QR left, words right
        f_kicker = load_font("source-sans-3.ttf", int(H * 0.032))
        f_title  = load_font("cinzel.ttf",        int(H * 0.085))
        f_sub    = load_font("cormorant-italic.ttf", int(H * 0.055))
        f_url    = load_font("source-sans-3.ttf", int(H * 0.038))
        f_foot   = load_font("cormorant-italic.ttf", int(H * 0.042))

        qr_px = int(H * 0.60)
        qr = qr_image(url, qr_px)
        pad = int(qr.size[0] * 0.055)
        plate = Image.new("RGB", (qr.size[0] + pad * 2, qr.size[1] + pad * 2), WHITE)
        plate.paste(qr, (pad, pad))
        qx = int(W * 0.085)
        img.paste(plate, (qx, (H - plate.size[1]) // 2))

        tx = qx + plate.size[0] + int(W * 0.06)
        tw = W - tx - int(W * 0.06)
        ty = int(H * 0.235)

        def left(text, font, y, fill):
            d.text((tx, y), text, font=font, fill=fill)
            bb = d.textbbox((0, 0), text, font=font)
            return bb[3] - bb[1]

        ty += left("MOUNT MORIAH BAPTIST CHURCH", f_kicker, ty, GOLD_500) + int(H * 0.038)
        ty += left("45th ANNIVERSARY", f_title, ty, GOLD_300) + int(H * 0.036)
        ty += left("October 3-4, 2026", f_sub, ty, CREAM) + int(H * 0.070)
        ty += left("Scan for schedule, tickets & t-shirts", f_foot, ty, GOLD_300) + int(H * 0.034)
        left(url.replace("https://", ""), f_url, ty, CREAM)

    return img


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "https://mmbc-anniversary-landing.vercel.app"
    if not url.startswith(("http://", "https://")):
        print("ERROR: URL must start with http:// or https://")
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)

    card = build(url, (1240, 1750), "portrait")     # ~A5 at 300dpi
    cp = os.path.join(OUT_DIR, "anniversary-qr-card.png")
    card.save(cp)

    slide = build(url, (1920, 1080), "slide")
    sp = os.path.join(OUT_DIR, "anniversary-qr-slide.png")
    slide.save(sp)

    print("URL      : " + url)
    print("Card     : %s  %s  %d KB" % (cp, card.size, os.path.getsize(cp) / 1024))
    print("Slide    : %s  %s  %d KB" % (sp, slide.size, os.path.getsize(sp) / 1024))
    print("\nScan both with a real phone before printing or presenting.")


if __name__ == "__main__":
    main()
