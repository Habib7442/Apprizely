"""
Apprizely brand system - parametric SVG geometry.

Mark concept: a single ascending diagonal, sliced into vertical segments that rise
left-to-right and resolve into an upward peak that reads as a stylised 'A'.
One confident violet -> cyan gradient; a small magenta inner facet as accent.
"""
import typo

# ---------------- palette (per brand spec) ----------------
VIOLET  = "#7C3AED"   # primary gradient start
CYAN    = "#06B6D4"   # primary gradient end
MAGENTA = "#EC4899"   # accent, small highlight only
INK     = "#0B1020"   # near-black
WHITE   = "#FFFFFF"
MUTED_ON_DARK  = "#8A93AD"
MUTED_ON_LIGHT = "#6B7280"

FONT_WORD    = "fonts/Poppins-SemiBold.ttf"
FONT_TAGLINE = "fonts/Poppins-Light.ttf"
WORD_TRACK    = -0.012
TAGLINE_TRACK = 0.30
WORD_TEXT     = "Apprizely"
TAGLINE_TEXT  = "WHERE GOOD WORK PAYS OFF"

# ---------------- mark geometry ----------------
BASE   = 90.0          # baseline y
X0     = 4.0           # left extent
X1     = 92.0          # right extent
APEX   = (71.8, 8.0)   # peak
SLICE_W, SLICE_GAP = 10.5, 4.25

PEAK_X   = X0 + 3 * SLICE_W + 3 * SLICE_GAP   # left edge of the peak slice
ACCENT_X = 83.0                                # baseline extent of the magenta facet

# content bounding box of the mark (used for optical centring)
BBOX = (X0, APEX[1], X1, BASE)   # x0, y0, x1, y1

def _L(x):
    """Ascending diagonal: passes through APEX with slope -1."""
    return APEX[1] + (APEX[0] - x)

def _R(x):
    """Descending right edge of the peak."""
    m = (BASE - APEX[1]) / (X1 - APEX[0])
    return APEX[1] + m * (x - APEX[0])


def mark_inner(idp="ap", mono=None, accent=True, compact=False):
    """
    Returns the mark's SVG body. mono = flat colour override.
    compact=True drops to two wider slices - for favicons at 32px and below,
    where three thin slices merge into mud.
    """
    slice_w, slice_gap, n_slices = SLICE_W, SLICE_GAP, 3
    if compact:
        n_slices = 2
        slice_gap = 6.5
        slice_w = (PEAK_X - X0 - slice_gap * n_slices) / n_slices
    if mono:
        fill = mono
        acc = mono
        gdef = ""
    else:
        fill = f"url(#{idp}_g)"
        acc = MAGENTA
        gdef = (
            f'<linearGradient id="{idp}_g" x1="{X0}" y1="{BASE}" x2="{APEX[0]}" y2="{APEX[1]}" '
            f'gradientUnits="userSpaceOnUse">'
            f'<stop offset="0" stop-color="{VIOLET}"/>'
            f'<stop offset="1" stop-color="{CYAN}"/></linearGradient>'
        )

    parts = [f'<defs>{gdef}</defs>'] if gdef else []

    # ascending slices
    x = X0
    for _ in range(n_slices):
        xa, xb = x, x + slice_w
        parts.append(
            f'<path d="M {xa:.2f} {_L(xa):.2f} L {xb:.2f} {_L(xb):.2f} '
            f'L {xb:.2f} {BASE:.2f} L {xa:.2f} {BASE:.2f} Z" fill="{fill}"/>'
        )
        x = xb + slice_gap

    # peak slice: rises to the apex, then falls away to the right
    parts.append(
        f'<path d="M {PEAK_X:.2f} {_L(PEAK_X):.2f} L {APEX[0]:.2f} {APEX[1]:.2f} '
        f'L {X1:.2f} {BASE:.2f} L {PEAK_X:.2f} {BASE:.2f} Z" fill="{fill}"/>'
    )

    # magenta inner facet - the inside face of the peak's falling edge.
    # Small highlight only; vertical left edge sits under the apex.
    if accent and not mono:
        parts.append(
            f'<path d="M {APEX[0]:.2f} {APEX[1]:.2f} L {ACCENT_X:.2f} {BASE:.2f} '
            f'L {APEX[0]:.2f} {BASE:.2f} Z" fill="{acc}"/>'
        )
    return "".join(parts)


def icon_svg(size=512, mono=None, bg=None, radius_ratio=None, pad_ratio=0.0,
             idp="icon", tight=False):
    """
    Standalone icon, optically centred on its own bounding box.
    pad_ratio    - padding as a fraction of the mark's larger dimension
    radius_ratio - corner radius as a fraction of the full tile (0.22 = iOS squircle)
    tight        - crop exactly to the mark with no square canvas
    """
    bx0, by0, bx1, by1 = BBOX
    cw, ch = bx1 - bx0, by1 - by0
    cx, cy = (bx0 + bx1) / 2.0, (by0 + by1) / 2.0

    if tight:
        vb = f"{bx0} {by0} {cw} {ch}"
        w, h = size, size * ch / cw
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" '
                f'width="{w:.0f}" height="{h:.0f}">{mark_inner(idp, mono)}</svg>')

    side = max(cw, ch) * (1.0 + 2.0 * pad_ratio)
    vx, vy = cx - side / 2.0, cy - side / 2.0
    bgr = ""
    if bg:
        rx = f' rx="{side*radius_ratio:.3f}"' if radius_ratio else ""
        bgr = (f'<rect x="{vx:.3f}" y="{vy:.3f}" width="{side:.3f}" height="{side:.3f}"'
               f'{rx} fill="{bg}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="{vx:.3f} {vy:.3f} {side:.3f} {side:.3f}" '
            f'width="{size}" height="{size}">{bgr}{mark_inner(idp, mono)}</svg>')


# ---------------- lockups ----------------
def _word(size, fill, x, y):
    return typo.text_svg(WORD_TEXT, FONT_WORD, size=size, wght=600,
                         tracking=WORD_TRACK, x=x, y=y, fill=fill)

def _tag(size, fill, x, y):
    return typo.text_svg(TAGLINE_TEXT, FONT_TAGLINE, size=size, wght=300,
                         tracking=TAGLINE_TRACK, x=x, y=y, fill=fill)


def lockup_svg(height=200, tagline=True, dark=False, mono=None,
               idp="lk", pad_ratio=0.0, stacked=False):
    """
    Horizontal lockup: icon left, wordmark right, tagline centred beneath the wordmark.
    height = icon height in px. Returns (svg, width, height).
    """
    H = float(height)
    word_fill = mono or (WHITE if dark else INK)
    tag_fill  = mono or (MUTED_ON_DARK if dark else MUTED_ON_LIGHT)

    cap_ratio = typo.cap_height(FONT_WORD, 100, 600) / 100.0
    cap_target = 0.40 * H
    fs_word = cap_target / cap_ratio
    gap = 0.16 * H

    # measure wordmark
    _, word_w = _word(fs_word, word_fill, 0, 0)

    # wordmark cap box centred on the icon's vertical centre
    baseline = H / 2 + cap_target / 2
    wx = H + gap

    body = [f'<g transform="scale({H/100.0:.6f})">{mark_inner(idp, mono)}</g>']
    ws, _ = _word(fs_word, word_fill, wx, baseline)
    body.append(ws)

    content_w = wx + word_w
    content_bottom = H

    if tagline:
        fs_tag = fs_word * 0.235
        _, tag_w = _tag(fs_tag, tag_fill, 0, 0)
        tag_baseline = baseline + 0.355 * H
        tx = wx + (word_w - tag_w) / 2.0          # centred under the wordmark
        ts, _ = _tag(fs_tag, tag_fill, tx, tag_baseline)
        body.append(ts)
        content_w = max(content_w, tx + tag_w)
        content_bottom = max(H, tag_baseline + fs_tag * 0.28)

    pad = pad_ratio * H
    vw = content_w + pad * 2
    vh = content_bottom + pad * 2
    inner = f'<g transform="translate({pad:.2f},{pad:.2f})">' + "".join(body) + '</g>'
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw:.2f} {vh:.2f}" '
           f'width="{vw:.2f}" height="{vh:.2f}">{inner}</svg>')
    return svg, vw, vh


def wordmark_svg(height=100, dark=False, mono=None, tagline=False):
    """Wordmark only (no icon)."""
    fill = mono or (WHITE if dark else INK)
    tag_fill = mono or (MUTED_ON_DARK if dark else MUTED_ON_LIGHT)
    cap_ratio = typo.cap_height(FONT_WORD, 100, 600) / 100.0
    fs = height / cap_ratio
    baseline = height
    s, w = _word(fs, fill, 0, baseline)
    body = [s]
    bottom = baseline + fs * 0.24
    if tagline:
        fs_tag = fs * 0.235
        _, tw = _tag(fs_tag, tag_fill, 0, 0)
        tb = baseline + fs * 0.42
        ts, _ = _tag(fs_tag, tag_fill, (w - tw) / 2.0, tb)
        body.append(ts)
        bottom = tb + fs_tag * 0.28
        w = max(w, tw)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {bottom:.2f}" '
            f'width="{w:.2f}" height="{bottom:.2f}">' + "".join(body) + '</svg>'), w, bottom
