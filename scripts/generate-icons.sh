#!/bin/bash
# Rasterize website/favicon.svg into the favicon/logo/apple-touch-icon assets
# referenced by index.html.
# Usage: ./generate-icons.sh   (run from anywhere; paths resolve to website/)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SVG="$WEB_DIR/favicon.svg"
ASSETS="$WEB_DIR/assets"

rsvg-convert -w 16 -h 16 "$SVG" -o "$ASSETS/favicon-16x16.png"
rsvg-convert -w 32 -h 32 "$SVG" -o "$ASSETS/favicon-32x32.png"
rsvg-convert -w 180 -h 180 "$SVG" -o "$ASSETS/apple-touch-icon.png"
rsvg-convert -w 512 -h 512 "$SVG" -o "$ASSETS/logo.png"

# PWA icons listed in website/manifest.json
for size in 72 96 128 144 152 192 384 512; do
  rsvg-convert -w "$size" -h "$size" "$SVG" -o "$ASSETS/icon-${size}x${size}.png"
done

ICO_TMP="$(mktemp -d)"
trap 'rm -rf "$ICO_TMP"' EXIT
rsvg-convert -w 16 -h 16 "$SVG" -o "$ICO_TMP/16.png"
rsvg-convert -w 32 -h 32 "$SVG" -o "$ICO_TMP/32.png"
rsvg-convert -w 48 -h 48 "$SVG" -o "$ICO_TMP/48.png"
magick "$ICO_TMP/16.png" "$ICO_TMP/32.png" "$ICO_TMP/48.png" "$WEB_DIR/favicon.ico"
