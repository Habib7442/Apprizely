# Implementation Plan: Design System, Tokens, Fonts, Framer Motion & Navbar Setup

**Goal:** Establish the foundational Apprizely design tokens, Google Fonts (Poppins + Inter), dark theme HSL color palette, `tabular-nums` numeric formatting, `framer-motion` animations, base `shadcn/ui` components, and a premium responsive `Navbar.tsx` component per [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md).

---

## 1. Skills & Files Inspected
- `AGENTS.md`: Technical stack rules, design requirements, and strict layer boundaries.
- [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md): Brand color tokens (Ink `#0B1020`, Surface `#121A2E`, Surface Raised `#16203A`, Hairline Border `#24304A`), primary gradient (Violet `#7C3AED` $\rightarrow$ Cyan `#06B6D4`), typography scale, logo variants, and button/card styling rules.
- [PRD.md](file:///e:/Web%20Dev/apprizely/PRD.md): Product scope & navbar navigation requirements.
- `package.json`: Current dependency state (Next.js 16, Tailwind CSS v4, React 19).
- `app/globals.css`: Existing stylesheet to upgrade with HSL CSS variables and surface ladder.
- `app/layout.tsx`: Root layout to configure font CSS variables (`--font-display`, `--font-sans`) and dark theme class.

---

## 2. Assumptions & Load-Bearing Decisions
- **Dark-First Theme:** `dark` class forced on the root `<html>` element as Apprizely is dark-first by brand design.
- **Typography:**
  - `Poppins` (weights 600, 700) mapped to `--font-display` for headings and brand lockup.
  - `Inter` (weights 400, 500, 600) mapped to `--font-sans` for UI body text & tabular data.
  - Utility class `.tabular-nums` configured for all scores, monetary amounts (`+₹X/mo`), and percentages to prevent layout jitter during real-time updates.
- **Animations:** Install and integrate `framer-motion` for micro-animations (navbar glassmorphism scroll transition, score ring reveals, mobile drawer menu).
- **UI Component Library:** Install `framer-motion` and core `shadcn/ui` dependencies (`button`, `card`, `badge`, `avatar`, `tooltip`, `dropdown-menu`, `input`, `tabs`, `dialog`, `skeleton`).

---

## 3. Files to Create / Modify
- `package.json` — Add `framer-motion` and dependencies.
- `app/fonts.ts` — [NEW] Google font loading setup for Poppins and Inter.
- `app/globals.css` — Configure HSL color variables, dark surface ladder, primary gradient, hairline borders, and tabular figure utilities.
- `app/layout.tsx` — Inject font CSS variables, dark theme class, and global providers.
- `components/shared/brand-logo.tsx` — [NEW] Official SVG Logo mark with Violet $\rightarrow$ Cyan gradient & Poppins wordmark lockup.
- `components/shared/navbar.tsx` — [NEW] Responsive glassmorphic navigation header featuring logo lockup, navigation links, role switcher trigger, sign-in CTA button, and mobile menu (`framer-motion`).
- `components/shared/score-badge.tsx` — [NEW] Reusable score-band chip with color spectrum matching [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md).
- `app/page.tsx` — Update home page preview demonstrating Navbar, fonts, theme colors, and framer-motion hero.

---

## 4. Implementation Requirements

### 4.1 Fonts (`app/fonts.ts`)
```ts
import { Poppins, Inter } from "next/font/google";

export const fontDisplay = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
```

### 4.2 Color Tokens & Styles (`app/globals.css`)
- Configure `--background: 225 49% 8%` (`#0B1020` Ink base).
- Configure `--card: 224 40% 13%` (`#121A2E` Surface card).
- Configure `--popover: 222 41% 16%` (`#16203A` Surface raised).
- Configure `--border: 222 32% 22%` (`#24304A` Hairline border).
- Configure `--gradient-primary: linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)`.
- Add utility `.tabular-nums { font-variant-numeric: tabular-nums; }`.

### 4.3 Navbar Component (`components/shared/navbar.tsx`)
- Sticky top header with glassmorphism backdrop (`bg-[#0B1020]/80 backdrop-blur-md border-b border-[#24304A]`).
- Left: `BrandLogo` SVG with Poppins wordmark and tracked brand tagline lockup.
- Center: Desktop nav links (Features, Signal Engine, Templates, Increments, Pricing).
- Right: Action buttons — Sign In (outline/ghost) and Get Started Primary CTA (`bg-gradient-primary text-white shadow-glow hover:-translate-y-0.5 transition-all`).
- Mobile: Hamburger menu toggle expanding animated `framer-motion` mobile menu sheet.

---

## 5. Security & Boundary Requirements
- Navbar and logo are client/server boundary clean (`'use client'` strictly for framer-motion interactive components).
- No sensitive keys or user data exposed in public components.

---

## 6. Acceptance Criteria
1. Google Fonts Poppins and Inter load cleanly without FOUT or layout shifts.
2. `Navbar.tsx` is fully responsive with sticky glassmorphism header and `framer-motion` mobile menu.
3. Primary gradient CTA button renders with Violet $\rightarrow$ Cyan gradient and subtle hover glow.
4. `.tabular-nums` renders numbers with fixed-width figures.
5. Brand logo SVG component renders cleanly in dark/light contexts.
6. `npm run typecheck`, `npm run lint`, and `npm run build` pass with 0 errors.

---

## 7. Automated Checks to Run
- `npm run typecheck` (`tsc --noEmit`)
- `npm run lint`
- `npm run build`

---

## 8. Manual Verification Steps
1. Start `npm run dev` and navigate to `http://localhost:3000`.
2. Inspect `Navbar.tsx` at top of page — check glassmorphism background, logo alignment, and nav links.
3. Test responsive view (<768px screen width) — click hamburger icon to verify mobile menu animation.
4. Verify Poppins font on logo & headings, Inter on nav text and body.
