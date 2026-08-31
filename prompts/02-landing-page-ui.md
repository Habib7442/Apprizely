# Implementation Plan: Apprizely Landing Page (Clean & Professional Euphoria Design Reference)

**Goal:** Build a clean, high-converting, professional Apprizely landing page (`app/page.tsx`) matching the visual structure, hero section, client logo cloud, feature showcase, 4-stat grid, and interactive pricing cards from the user's reference design — without floating widget clutter.

---

## 1. Skills & Files Inspected
- `AGENTS.md`: Product scope, technology stack constraints, dark surface hierarchy.
- [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md): Apprizely HSL dark theme colors (Base Ink `#0B1020`, Surface `#121A2E`, Hairline Border `#24304A`), Violet $\rightarrow$ Cyan gradient, Poppins & Inter typography, tabular figures.
- [PRD.md](file:///e:/Web%20Dev/apprizely/PRD.md): Apprizely features, roles, scoring formulas, score bands, pricing tiers, and increment mechanics.
- `app/page.tsx`: Existing landing page component to update with the reference design structure.
- `components/shared/navbar.tsx`: Header navigation component.
- `components/shared/brand-logo.tsx`: Official logo lockup component.

---

## 2. Layout Structure (Clean & Streamlined)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Navbar (Clean & Dark)                           │
├────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION:                                                          │
│  • Tag Pill: "New • Continuous Evaluation & Signal Engine 2.0"          │
│  • Headline: "Where real work turns into fair salary rewards."        │
│  • Subtitle: "Replace annual spreadsheets with objective signal        │
│               scoring and transparent rupee monthly increment rewards." │
│  • Dual CTA Buttons: [Get Started Free →]  [Watch Demo (Play)]         │
│                                                                        │
│ CENTRAL DASHBOARD MOCKUP PREVIEW (Clean & Minimal):                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Single Sleek Apprizely App Dashboard / Mobile Preview Card       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│ CLIENTS & PARTNERS LOGO CLOUD:                                         │
│  "Trusted by progressive organizations across industries"              │
│  [ Schools • Banks • Retail Chains • Tech Agencies • Clinics ]         │
├────────────────────────────────────────────────────────────────────────┤
│ FEATURE SHOWCASE ("Appraisals Reimagined for the Future"):             │
│  • Tag Pill: • Features                                                │
│  • Section Title: "Appraisals Reimagined for Modern Salaried Teams"    │
│  • Grid: 2-column feature cards with icons, bullet checks, & preview   │
├────────────────────────────────────────────────────────────────────────┤
│ STATS COUNTER ROW (4 Columns):                                         │
│  [ 94.8% ] Accurately Rated  [ 250+ ] Orgs Active                      │
│  [ 4.9★ ] HR Satisfaction    [ ₹4.8Cr ] Increments Awarded            │
├────────────────────────────────────────────────────────────────────────┤
│ PRICING SECTION (Dark Cards with Toggle):                              │
│  • Tag Pill: • Pricing Plans                                           │
│  • Monthly / Yearly Toggle Switch                                      │
│  • 3 Plan Cards: Starter (Free), Growth (Popular), Enterprise          │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Files to Create / Modify
- `components/landing/logo-cloud.tsx` — [NEW] Industry logos & organization social proof section.
- `components/landing/feature-section.tsx` — [NEW] Reimagined appraisal feature grid with checklist items.
- `components/landing/stats-counter.tsx` — [NEW] Clean 4-card statistics counter.
- `components/landing/pricing-section.tsx` — [NEW] Interactive monthly/yearly pricing plan cards with feature checkmarks.
- `app/page.tsx` — Assemble full clean landing page layout.

---

## 4. Implementation Requirements
- **Theme:** Dark-first `#0B1020` base, surface cards `#121A2E`, hairline borders `#24304A`.
- **Typography:** Poppins (`font-display`) for headings, Inter (`font-sans`) for body text, `.tabular-nums` for score & financial figures.
- **Accents:** Cyan `#06B6D4` / Emerald `#10B981` / Violet `#7C3AED` buttons and badges matching reference screenshot.
- **Interactivity:** `framer-motion` smooth entrance animations, hover glow effects, and tab/pricing toggles.

---

## 5. Acceptance Criteria
1. Hero section is clean, uncluttered, and features centered headline, subtitle, dual CTAs, and a single sleek preview card.
2. Social proof logo grid renders cleanly.
3. Feature showcase grid displays key Apprizely capabilities with checkmark lists.
4. Clean 4-card statistics counter.
5. Interactive pricing section toggles between monthly and annual billing.
6. `npm run typecheck` and `npm run lint` pass with 0 errors.

---

## 6. Automated Checks to Run
- `npm run typecheck` (`tsc --noEmit`)
- `npm run lint`

---

## 7. Manual Verification Steps
1. Open `http://localhost:3000` in browser.
2. Verify clean hero section without floating overlay cards.
3. Test pricing toggle switch (Monthly vs Yearly).
4. Verify responsive view (<768px).
