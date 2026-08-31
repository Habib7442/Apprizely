"""Text -> SVG path outlines, with variable-font weight instancing and tracking control."""
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
import os

_cache = {}

def load(path, wght=600):
    key = (path, wght)
    if key in _cache:
        return _cache[key]
    f = TTFont(path)
    if "fvar" in f:
        f = instancer.instantiateVariableFont(f, {"wght": wght}, inplace=False)
    _cache[key] = f
    return f

def text_path(text, font_path, size=100, wght=600, tracking=0.0, x=0.0, y=0.0):
    """tracking in em units (e.g. -0.02 = -2% tracking). Returns (path_d, advance_width)."""
    f = load(font_path, wght)
    upm = f["head"].unitsPerEm
    scale = size / upm
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    kern = None
    pen_x = 0.0
    parts = []
    prev = None
    for ch in text:
        gname = cmap.get(ord(ch))
        if gname is None:
            pen_x += upm * 0.3
            continue
        g = gs[gname]
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}")
        g.draw(pen)
        d = pen.getCommands()
        if d:
            # transform: flip y, scale, translate
            tx = x + pen_x * scale
            parts.append((d, tx))
        pen_x += g.width + tracking * upm
        prev = gname
    total = pen_x * scale
    # build a single path string by emitting each glyph inside its own transform group
    return parts, total, scale

def text_svg(text, font_path, size=100, wght=600, tracking=0.0, x=0.0, y=0.0, fill="#000"):
    parts, total, scale = text_path(text, font_path, size, wght, tracking, x, y)
    out = []
    for d, tx in parts:
        out.append(
            f'<g transform="translate({tx:.3f},{y:.3f}) scale({scale:.6f},{-scale:.6f})">'
            f'<path d="{d}" fill="{fill}"/></g>'
        )
    return "\n".join(out), total

def cap_height(font_path, size=100, wght=600):
    f = load(font_path, wght)
    upm = f["head"].unitsPerEm
    try:
        ch = f["OS/2"].sCapHeight
    except Exception:
        ch = upm * 0.72
    return ch / upm * size

def x_height(font_path, size=100, wght=600):
    f = load(font_path, wght)
    upm = f["head"].unitsPerEm
    try:
        xh = f["OS/2"].sxHeight
    except Exception:
        xh = upm * 0.52
    return xh / upm * size
