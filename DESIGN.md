# Apprizely — Design System

> **Where good work pays off.**
> Brand and UI guidelines derived from the Apprizely brand board. This is the single source of truth for logo, colour, type, and interface styling. Values marked **[board]** are taken directly from the brand board; values marked **[extended]** are additions needed to build a full product UI, chosen to harmonise with the board.

---

## 1. Brand Foundations

| | |
|---|---|
| **Name** | Apprizely |
| **Tagline** | Where good work pays off |
| **Domain** | apprizely.com |
| **Personality** | Professional, modern, trustworthy, motivating, growth-oriented |
| **Product** | Increment-based employee management SaaS |

**Voice:** plain, confident, human. Say what something does, not how it's built ("View your score," not "Render score entity"). Sentence case everywhere in the UI. The one exception is the **tagline lockup**, which uses tracked-out uppercase as a deliberate brand treatment — do not repeat that all-caps style across the interface.

---

## 2. Logo

The mark is an ascending set of bars that resolve into an upward peak — reading as both a growth chart and a stylised "A". It carries the primary gradient (violet → cyan) with a single magenta accent edge.

### 2.1 Approved variants **[board]**

| Variant | Use |
|---|---|
| **Full lockup on ink** | Primary. Marketing hero, auth screens, dark surfaces |
| **Full lockup on white** | Light backgrounds, documents, invoices, PDFs |
| **Lockup without tagline** | Anywhere the tagline would be too small to read (< ~160px wide) |
| **Icon-only (squircle)** | App icon, favicon, avatar, social profile |
| **Single-colour — ink on white / white on ink** | Low-ink print, embossing, faxable docs, watermarks, any place the gradient can't render cleanly |
| **Small-size icon** | Favicons, notification badges, compact nav |

### 2.2 Clear space & minimum size **[extended]**

- **Clear space:** keep padding equal to the height of one bar-unit of the icon on all sides. Nothing (text, edges, other logos) intrudes into it.
- **Minimum sizes:** full lockup ≥ 120px wide; lockup-with-tagline ≥ 160px wide; icon ≥ 20px (favicon 32/16px uses the simplified small-size icon).

### 2.3 Misuse — don't

- Don't recolour the gradient or drop the magenta accent edge — it's part of the mark.
- Don't stretch, skew, rotate, or add drop shadows / bevels / outer glows.
- Don't place the gradient mark on a busy or mid-tone background — switch to the single-colour white or ink version.
- Don't re-typeset "Apprizely" in a different font to fake the wordmark — keep the logo as supplied artwork (SVG).
- Don't box the logo unless using the official squircle icon.

---

## 3. Colour

### 3.1 Brand core **[board]**

| Token | Hex | HSL | Role |
|---|---|---|---|
| **Violet** | `#7C3AED` | `262 83% 58%` | Primary brand, primary actions |
| **Cyan** | `#06B6D4` | `189 94% 43%` | Secondary brand, info, gradient end |
| **Magenta** | `#EC4899` | `330 81% 60%` | Accent / highlight — used sparingly |
| **Ink** | `#0B1020` | `225 49% 8%` | Primary dark background |
| **White** | `#FFFFFF` | `0 0% 100%` | Light background, on-dark text |

> **Handy:** these map almost exactly to Tailwind defaults — Violet = `violet-600`, Cyan = `cyan-500`, Magenta = `pink-500`. So the full tint/shade ramps you'll need for hovers and states are just the Tailwind `violet` / `cyan` / `pink` scales. Ink and the neutrals below are the only custom values.

### 3.2 Primary gradient **[board]**

Violet → Cyan. Canonical angle 135° (top-left violet to bottom-right cyan), matching the icon.

```css
--gradient-primary: linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%);
```

Use it for: the logo mark, the primary CTA, score rings / progress, and one hero accent per screen. **Magenta is not part of the gradient** — it's a solo highlight (a single stat, a "new" dot, a selected state). Never wash whole sections in gradient as decoration.

### 3.3 Neutrals **[extended]**

Cool, slightly blue-tinted greys (Tailwind `slate`) to sit naturally with Ink.

`50 #F8FAFC` · `100 #F1F5F9` · `200 #E2E8F0` · `300 #CBD5E1` · `400 #94A3B8` · `500 #64748B` · `600 #475569` · `700 #334155` · `800 #1E293B` · `900 #0F172A` · `950 #020617`

### 3.4 Dark surface ladder **[extended]**

Apprizely is dark-first for brand surfaces (marketing, auth, app icon). Build depth by getting lighter as you rise, not with heavy shadows.

| Layer | Hex | Use |
|---|---|---|
| Background (Ink) | `#0B1020` | App/page base |
| Surface | `#121A2E` | Cards, panels |
| Surface raised | `#16203A` | Popovers, menus, modals |
| Border / input | `#24304A` | Hairlines, field borders |
| Muted fill | `#1A2338` | Subtle backgrounds, disabled |

### 3.5 Semantic **[extended]**

| Meaning | Hex | Note |
|---|---|---|
| Success | `#10B981` | emerald-500 |
| Warning | `#F59E0B` | amber-500 |
| Destructive / error | `#EF4444` | red-500 |
| Info | `#06B6D4` | reuse brand cyan |

### 3.6 Score-band colours **[extended]** (product-specific)

Map performance bands to a warm-to-cool scale so a dashboard reads at a glance:

| Band | Score | Colour |
|---|---|---|
| Outstanding | 90–100 | gradient (violet→cyan) |
| Exceeds | 80–89 | Cyan `#06B6D4` |
| Meets | 70–79 | Emerald `#10B981` |
| Developing | 60–69 | Amber `#F59E0B` |
| Needs improvement | < 60 | Rose `#F43F5E` |

### 3.7 Contrast & accessibility

- **Body text:** white/`slate-50` on Ink, and Ink on white — both pass AAA. Muted text uses `slate-400` on dark / `slate-500` on light (AA for secondary text only).
- **Magenta `#EC4899`** on Ink passes AA for large/bold text and UI accents, **not** for small body copy — don't set paragraphs in magenta.
- **Gradient / coloured text** must clear AA against its background; when in doubt, keep text solid white or Ink and let colour live in fills and marks.
- Never rely on colour alone for score bands — always pair with the label ("Meets") or a value.

---

## 4. Typography

### 4.1 Families

| Role | Typeface | Notes |
|---|---|---|
| **Display / headings** | **Poppins** (SemiBold/Bold) + **Serif Italic** | Geometric sans matching the wordmark's character, with optional italic serif emphasis for marketing hero headlines (Sociora style). |
| **UI / body** | **Inter** | Clean workhorse for dashboards, tables, long text. (Geist is a fine alternative if you prefer the shadcn default.) |

Two families, strictly maintained: geometric-rounded display over neutral-humanist body.

### 4.1.1 Surface Themes
- **Dark Base:** `#0B1020` (Ink) for dark mode & dashboards.
- **Light Base:** `#F8FAFC` (Slate-50) for marketing pages & official light theme layouts with ambient Violet→Cyan background accents.

### 4.2 Type scale **[extended]**

| Token | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| Display | 48 / 52 | 700 | -0.02em | Marketing hero |
| H1 | 32 / 40 | 600 | -0.01em | Page title |
| H2 | 24 / 32 | 600 | -0.01em | Section |
| H3 | 20 / 28 | 600 | 0 | Card title |
| Body-lg | 18 / 28 | 400 | 0 | Lead paragraph |
| Body | 16 / 24 | 400 | 0 | Default |
| Small | 14 / 20 | 400 | 0 | Secondary, table cells |
| Caption | 12 / 16 | 500 | 0.01em | Labels, meta |
| Tagline | 12–14 | 500 | **0.35em** | Brand lockup only (tracked caps) |

- Body line length ≤ 80 characters.
- Numbers matter here (scores, salaries): enable tabular figures for tables and score displays — `font-variant-numeric: tabular-nums;`.
- Avoid the generated-UI tells: don't add tracked-out ALL-CAPS eyebrow labels above every heading, and don't accent one word of a heading in a different colour. Reserve the tracked-caps treatment for the tagline.

### 4.3 next/font setup

```ts
// app/fonts.ts
import { Poppins, Inter } from "next/font/google";

export const display = Poppins({
  subsets: ["latin"], weight: ["600", "700"], variable: "--font-display",
});
export const sans = Inter({
  subsets: ["latin"], variable: "--font-sans",
});
```

```tsx
// app/layout.tsx
<html lang="en" className={`${display.variable} ${sans.variable} dark`}>
```

---

## 5. Design Tokens (implementation)

Drop-in tokens for a Tailwind + shadcn/ui project. shadcn semantic variables use HSL triples.

### 5.1 `globals.css`

```css
@layer base {
  :root {
    /* brand (hex, for gradients & direct use) */
    --violet: #7C3AED;
    --cyan: #06B6D4;
    --magenta: #EC4899;
    --ink: #0B1020;
    --gradient-primary: linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%);

    /* shadcn semantic — LIGHT */
    --background: 0 0% 100%;
    --foreground: 225 49% 8%;
    --card: 0 0% 100%;
    --card-foreground: 225 49% 8%;
    --popover: 0 0% 100%;
    --popover-foreground: 225 49% 8%;
    --primary: 262 83% 58%;            /* violet */
    --primary-foreground: 0 0% 100%;
    --secondary: 189 94% 43%;          /* cyan */
    --secondary-foreground: 0 0% 100%;
    --accent: 330 81% 60%;             /* magenta */
    --accent-foreground: 0 0% 100%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 262 83% 58%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --success: 160 84% 39%;
    --warning: 38 92% 50%;
    --radius: 0.625rem;                /* 10px base */
  }

  .dark {
    --background: 225 49% 8%;          /* ink */
    --foreground: 210 40% 98%;
    --card: 224 40% 13%;              /* #121A2E */
    --card-foreground: 210 40% 98%;
    --popover: 222 41% 16%;          /* #16203A */
    --popover-foreground: 210 40% 98%;
    --primary: 262 83% 58%;
    --primary-foreground: 0 0% 100%;
    --secondary: 189 94% 43%;
    --secondary-foreground: 225 49% 8%;
    --accent: 330 81% 60%;
    --accent-foreground: 0 0% 100%;
    --muted: 223 34% 16%;            /* #1A2338 */
    --muted-foreground: 215 20% 65%;
    --border: 222 32% 22%;          /* #24304A */
    --input: 222 32% 22%;
    --ring: 262 83% 58%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --success: 160 84% 39%;
    --warning: 38 92% 50%;
  }
}
```

### 5.2 `tailwind.config.ts` (theme.extend)

```ts
extend: {
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
    popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
    primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
    secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
    accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
    muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
    destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
    success: "hsl(var(--success))",
    warning: "hsl(var(--warning))",
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
  },
  fontFamily: {
    sans: ["var(--font-sans)", "system-ui", "sans-serif"],
    display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
  },
  backgroundImage: { "gradient-primary": "var(--gradient-primary)" },
  borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
  boxShadow: {
    "glow": "0 0 0 1px rgba(124,58,237,.15), 0 8px 30px -8px rgba(124,58,237,.45)",
  },
}
```

---

## 6. UI Components

Restraint rule: spend boldness in one place per screen (usually the score or the primary CTA) and keep everything else quiet. Don't chop every screen into identical rounded cards with the same shadow — vary hierarchy with spacing and surface level first, borders second, elevation last.

### 6.1 Buttons

| Type | Style |
|---|---|
| **Primary** | `bg-gradient-primary` text-white, radius-md, medium weight, subtle `shadow-glow` on hover. The one gradient element per view. |
| **Secondary** | Solid `bg-primary` or outline with `border-primary text-primary`. |
| **Ghost** | Transparent, `hover:bg-muted`. |
| **Destructive** | `bg-destructive` text-white — only for irreversible actions. |

CTAs name the action and keep that name through the flow: a "Approve increment" button produces an "Increment approved" toast.

### 6.2 Surfaces & cards
- Card = `bg-card` + 1px `border-border`, `radius-lg`. On dark, lift with the surface ladder (§3.4), not big shadows.
- Reserve `shadow-glow` for the single focal element (e.g. the score card), never every card.

### 6.3 Inputs
- `bg-transparent`, `border-input`, `radius-md`, focus ring `ring` (violet). Salary and other sensitive fields: same styling, but gate visibility by role.

### 6.4 Product-specific
- **Score ring / meter:** stroke uses `--gradient-primary`; the numeric score is display-weight with tabular figures.
- **Score-band badge:** filled chip in the band colour (§3.6) + text label; Outstanding uses the gradient.
- **Increment amount:** show the real figure prominently (e.g. **+₹2,700/mo**) in success colour when positive; percentage as secondary text. Money is the payoff — let it be the loud thing.

### 6.5 Empty & error states
Direction, not mood. Empty: "No work logged yet — add your first entry." Errors state what happened and how to fix it, in the product's voice, never a vague apology.

---

## 7. Radius, Spacing, Elevation, Motion

- **Radius:** base 10px (`--radius`). Cards/modals `lg` (~10–16px), buttons/inputs `md`, chips/badges `sm` or full. The app icon squircle is logo-only.
- **Spacing:** 4px base scale (4/8/12/16/24/32/48/64). Generous section padding; let content breathe.
- **Elevation (dark):** prefer the surface ladder for depth; use shadow only on floating layers (popovers, modals) and the one focal glow.
- **Motion:** purposeful and quick (150–250ms, ease-out). One orchestrated reveal per page load at most; motion mainly answers user actions (open, expand, confirm, score update). Respect `prefers-reduced-motion`. Avoid fade-up on every card and hover-lift on everything — it reads as generated.

---

## 8. Iconography

- Line icons, ~1.5–2px stroke, rounded joins (pairs with the geometric wordmark). Lucide (ships with shadcn) is the default set.
- Icons inherit text colour by default; use brand colour only to signal state or draw the eye, not for decoration.

---

## 9. Quick Do / Don't

**Do**
- Lead dark; use the violet→cyan gradient as the signature, once per screen.
- Keep salary/score numbers in tabular figures.
- Use score-band colours + labels together.
- Keep the logo as supplied SVG artwork.

**Don't**
- Don't wash sections in gradient or scatter magenta.
- Don't set body copy in magenta or low-contrast colour.
- Don't uniform-card every screen with the same radius + shadow.
- Don't add tracked ALL-CAPS eyebrows everywhere — that treatment belongs to the tagline.

---

*Apprizely — Where good work pays off. Brand board → design system. Maintained by Habib Tanwir · Locallify.*
