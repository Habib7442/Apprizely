# Apprizely — Logo & Brand Assets

**Where good work pays off**

Apprizely is a performance-management platform that measures what employees
actually contribute and converts it into a fair, transparent reward.

---

## The mark

A single ascending diagonal, sliced into vertical segments that rise
left-to-right and resolve into an upward peak. The segments are the increments —
work captured continuously, accumulating period over period. The peak reads as a
stylised **A** and as a summit: the reward the ascent earns.

One confident violet → cyan gradient carries the rise. A single magenta facet on
the inside of the peak's falling edge is the only accent — a highlight, never a
second colour story.

The geometry is parametric: every slice, the apex position and the accent width
derive from a small set of constants, so the mark is internally consistent at any
scale.

---

## Files

### `svg/` — vector masters (use these wherever possible)

| File | Use |
|---|---|
| `logo-lockup-tagline-on-dark.svg` | **Primary logo.** Full lockup with tagline, dark backgrounds |
| `logo-lockup-tagline-on-light.svg` | Full lockup with tagline, light backgrounds |
| `logo-lockup-on-dark.svg` | Icon + wordmark, no tagline — navigation, headers, tight spaces |
| `logo-lockup-on-light.svg` | Same, light backgrounds |
| `logo-lockup-mono-white.svg` / `-mono-ink.svg` | Single-colour, no gradient |
| `logo-lockup-tagline-mono-white.svg` / `-mono-ink.svg` | Single-colour with tagline |
| `wordmark-on-dark.svg` / `-on-light.svg` | Wordmark alone |
| `wordmark-tagline-on-dark.svg` / `-on-light.svg` | Wordmark + tagline, no icon |
| `icon.svg` | Icon alone, tight crop, transparent |
| `icon-square.svg` | Icon centred on a square canvas |
| `icon-mono-white.svg` / `-mono-ink.svg` | Single-colour icon |
| `icon-badge-ink.svg` / `-badge-white.svg` | Icon on a rounded tile (app-style) |
| `icon-compact.svg` | **Simplified two-slice mark** for very small sizes |

All wordmark text is converted to outlines — no font file is needed to render
these correctly anywhere.

### `png/` — raster lockups and icons

Transparent PNGs at `@1x` (800px wide), `@2x` (1600px) and `@3x` (2400px).
Icons at 64 / 128 / 256 / 512 / 1024px.

### `favicon/` — browser and PWA

| File | Notes |
|---|---|
| `favicon.svg` | Modern browsers; simplified mark |
| `favicon.ico` | Multi-resolution, 16 / 32 / 48 |
| `favicon-16x16.png`, `-32x32`, `-48x48` | Raster fallbacks |
| `apple-touch-icon.png` | 180×180, opaque ink — iOS applies its own mask |
| `android-chrome-192x192.png`, `-512x512` | PWA icons |
| `maskable-icon-512x512.png` | Extra padding so the mark survives Android's safe-zone crop |
| `site.webmanifest` | Drop-in manifest |

Suggested `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0B1020">
```

### `social/`

`og-image.png` (1200×630), `twitter-card.png` (1200×600),
`linkedin-banner.png` (1584×396), `app-store-icon-1024.png`.

### `tokens/`

`tokens.css` (custom properties), `tokens.json`, `tokens.scss`.

---

## Colour

| Token | Hex | Role |
|---|---|---|
| Violet | `#7C3AED` | Gradient start |
| Cyan | `#06B6D4` | Gradient end |
| Magenta | `#EC4899` | Accent — small highlight only |
| Ink | `#0B1020` | Primary dark ground |
| White | `#FFFFFF` | Light ground, reversed wordmark |
| Muted (on dark) | `#8A93AD` | Tagline on dark |
| Muted (on light) | `#6B7280` | Tagline on light |

Primary gradient: `linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)`

**The gradient lives in the icon only.** The wordmark and tagline are always a
single solid colour.

---

## Typography

- **Wordmark** — Poppins SemiBold (600), tracking `-0.012em`, title case
- **Tagline** — Poppins Light (300), tracking `0.30em`, all caps, ~23.5% of the
  wordmark's size, muted grey

Poppins is an SIL Open Font License family, free for commercial use.

---

## Construction and clear space

The icon sits on a 100-unit grid: baseline at `y=90`, apex at `(71.8, 8)`, three
slices 10.5 wide with 4.25 gaps, peak from `x=48.25`.

**Clear space:** keep a margin equal to the height of the icon's first (shortest)
slice — about 17% of the icon's height — on all sides. Nothing else enters it.

**Minimum sizes:**

| Context | Minimum |
|---|---|
| Full lockup with tagline | 180px wide — below this the tagline stops being legible |
| Icon + wordmark | 110px wide |
| Icon alone | 24px |
| Icon alone, 16–24px | use `icon-compact.svg` — three slices merge below 24px |

---

## Do

- Use the SVG masters wherever the medium allows
- Put the full-colour icon on ink `#0B1020`, white, or a near-solid ground
- Use `icon-compact.svg` for favicons and any icon under 24px
- Use the mono versions for embossing, single-colour print, watermarks and
  anywhere the gradient can't reproduce

## Don't

- Don't recolour the gradient or swap in a different one
- Don't apply the gradient to the wordmark or tagline
- Don't let the tagline match or exceed the wordmark's visual weight
- Don't add drop shadows, bevels, glows or 3D effects
- Don't stretch, skew, rotate or outline the mark
- Don't place the full-colour icon on a busy photo or a mid-tone that kills the
  violet end of the gradient — use a mono version instead
- Don't rebuild the lockup by hand; the spacing is derived, not eyeballed
- Don't use cream, beige or metallic grounds — they fight the palette

---

*Generated as parametric SVG geometry. `brand.py` in the project workspace is the
single source of truth — regenerate rather than hand-editing the SVGs.*
