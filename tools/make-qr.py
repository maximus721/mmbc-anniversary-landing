#!/usr/bin/env python3
"""
Generate the anniversary QR code.

    pip install "qrcode[pil]"
    python3 tools/make-qr.py "https://your-final-url.com"

Writes to assets/qr/:
    anniversary-qr.svg   - vector, use this for print (flyers, posters)
    anniversary-qr.png   - 1200px raster, use this for slides and social

Uses high error correction (level H), so the code still scans if it's
printed small, photocopied, or partially covered. Test the printed
version with an actual phone before you run 500 copies.
"""

import sys
import os

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "qr")

# Anniversary maroon. Kept dark on white — high contrast is what makes a
# QR code scan reliably. Do not invert it or put it on a busy background.
FG = "#3F060D"
BG = "#FFFFFF"


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    url = sys.argv[1].strip()
    if not url.startswith(("http://", "https://")):
        print("ERROR: the URL must start with http:// or https://")
        print("A QR code without the scheme often won't open as a link.")
        sys.exit(1)

    try:
        import qrcode
        import qrcode.image.svg
    except ImportError:
        print('ERROR: qrcode is not installed.  Run:  pip install "qrcode[pil]"')
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)

    common = dict(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )

    # --- SVG (print) ---
    svg_path = os.path.join(OUT_DIR, "anniversary-qr.svg")
    qr = qrcode.QRCode(image_factory=qrcode.image.svg.SvgPathImage, **common)
    qr.add_data(url)
    qr.make(fit=True)
    qr.make_image().save(svg_path)

    # --- PNG (screen) ---
    png_path = os.path.join(OUT_DIR, "anniversary-qr.png")
    qr = qrcode.QRCode(**common)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=FG, back_color=BG).convert("RGB")

    from PIL import Image
    img = img.resize((1200, 1200), Image.NEAREST)
    img.save(png_path)

    print("URL encoded : " + url)
    print("Print (SVG) : " + svg_path)
    print("Screen (PNG): " + png_path)
    print()
    print("Before printing: scan it with a phone and confirm it opens the right page.")


if __name__ == "__main__":
    main()
