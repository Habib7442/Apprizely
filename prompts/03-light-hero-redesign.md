# Implementation Plan: Apprizely Light Theme Hero Redesign (Sociora Reference)

**Goal:** Redesign the Navbar and Hero section of Apprizely to a clean, light theme (`#F8FAFC` base background) matching the Sociora design reference — featuring italic serif typography accents, clean dark buttons (`bg-slate-950`), light brand logo, and removing the dark Habib Tanwir dashboard card entirely.

---

## 1. Skills & Files Inspected
- `AGENTS.md`: Product scope, technology stack constraints.
- [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md): Light theme colors, typography rules, logo lockup on light background (`logo-lockup-tagline-on-light.svg`).
- `app/layout.tsx`: Root layout configuration (switch root class from `dark` to light/flexible).
- `app/globals.css`: Light theme background `#F8FAFC` and typography utilities.
- `components/shared/navbar.tsx`: Header navigation component.
- `components/shared/brand-logo.tsx`: Official logo lockup component.
- `app/page.tsx`: Landing page hero section.

---

## 2. Design Breakdown (Matching Sociora Light Reference)

```
┌────────────────────────────────────────────────────────────────────────┐
│ NAVBAR (Light Theme):                                                  │
│  Left: Apprizely Light Logo (`logo-lockup-tagline-on-light.svg`)       │
│  Center: [Features]  [Signal Engine]  [Templates]  [Increments] [Pricing]│
│  Right: Login (link)   [Sign Up] (Solid Black Button #111827)          │
├────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION (Clean Light Theme #F8FAFC):                              │
│                                                                        │
│  • Tag Pill: [ ⚙ Manage Employee Evaluation Better ]                   │
│                                                                        │
│  • Headline:                                                           │
│     Smarter Employee Evaluation,                                       │
│     Powered by Real Contribution                                       │
│     (with italicized serif font on "Evaluation," & "Contribution")     │
│                                                                        │
│  • Subtitle:                                                           │
│     "Track daily work continuously, calculate objective scores,        │
│      and convert contribution into fair, transparent salary rewards."  │
│                                                                        │
│  • Dual CTA Buttons:                                                   │
│     [Start Free Trial ↗] (Solid Black #111827)                          │
│     [Learn More ↗] (Clean Light Gray)                                  │
│                                                                        │
│  • Visual Mockup Showcase (Clean Mobile/App Showcase):                 │
│     (Dark Habib Tanwir card REMOVED entirely)                          │
│     Clean light app showcase surrounded by subtle light stat widgets   │
│     (e.g., "50K+ Active Ratings", "98% On-Time Verification").          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Files to Modify
- `app/layout.tsx` — Change root class to default light theme (`bg-[#F8FAFC] text-slate-900`).
- `components/shared/navbar.tsx` — Update navbar styling to light theme (`bg-white/80 backdrop-blur-md border-b border-slate-200`), dark logo (`theme="light"`), and solid black `Sign Up` button.
- `app/page.tsx` — Redesign Hero section to light theme, inject italic serif typography styling, add dual CTA buttons (`Start Free Trial ↗`, `Learn More ↗`), and remove dark dashboard card.

---

## 4. Implementation Requirements
- **Background:** `#F8FAFC` (clean off-white).
- **Text & Headings:** `#0F172A` (crisp slate-900) with italicized serif emphasis font (Georgia / Playfair / Times style) matching Sociora reference (`Smarter Employee Evaluation, Powered by Real Contribution`).
- **Navbar:** Logo lockup `theme="light"`, nav links `#334155 hover:#0F172A`, solid black `Sign Up` button (`bg-[#111827] text-white hover:bg-slate-800`).
- **Removal:** Dark Habib Tanwir dashboard card completely removed from hero.

---

## 5. Acceptance Criteria
1. Root page theme is clean light theme (`#F8FAFC` background, `#0F172A` dark text).
2. Navbar uses light brand logo lockup with tagline and black `Sign Up` CTA.
3. Hero headline features clean typography with italicized serif accents matching Sociora.
4. Hero CTA buttons match Sociora (`Start Free Trial ↗`, `Learn More ↗`).
5. Dark Habib Tanwir dashboard card is completely removed.
6. `npm run typecheck` and `npm run lint` pass with 0 errors.

---

## 6. Automated Checks to Run
- `npm run typecheck` (`tsc --noEmit`)
- `npm run lint`

---

## 7. Manual Verification Steps
1. Open `http://localhost:3000` in browser.
2. Verify light background (`#F8FAFC`), crisp dark text, and light logo with tagline in Navbar.
3. Inspect hero heading typography: verify italic serif accents on key words.
4. Verify dual buttons: `Start Free Trial ↗` (black) and `Learn More ↗` (light gray).
5. Confirm dark Habib Tanwir card is removed.
