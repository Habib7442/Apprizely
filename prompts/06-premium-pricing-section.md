# Implementation Plan: Premium Dark Glow Pricing Section

**Goal:** Redesign `components/landing/pricing-section.tsx` into a luxury dark glow section with an amber eclipse halo matching the user's reference image and flat team band pricing structure (Free ₹0, Growth ₹2,499/mo, Business ₹5,999/mo).

---

## 1. Business & Pricing Copy Rules

- **Flat Team Bands:** Flat monthly/yearly rate up to active employee limit.
- **Free Plan:** ₹0 / mo (Up to 10 active employees).
- **Growth Plan (Most Popular):** ₹2,499 / mo (billed monthly) or ₹1,999 / mo (billed yearly, up to 50 active employees).
- **Business Plan:** ₹5,999 / mo (billed monthly) or ₹4,799 / mo (billed yearly, up to 150 active employees).
- **Active Employee Guarantee Note:** *"Billed only on active employees evaluated in a cycle. All plans exclude 18% GST."*

---

## 2. Visual & Aesthetic Design (Matching Reference Screenshot)

- **Surface Backdrop:** Deep ink luxury slate (`bg-[#0B0F19] text-white relative overflow-hidden`).
- **Warm Eclipse Glow Arc:** Absolute glowing arc at top (`border-t border-amber-500/40 rounded-full bg-gradient-to-b from-amber-500/15 to-transparent blur-2xl`).
- **Switch Toggle:** Sleek amber billing switch (`Monthly` vs `Yearly - Save 20%`).
- **Card Styling:**
  - **Free & Business Cards:** Dark glass cards (`bg-[#131B2E]/70 border border-slate-800 rounded-2xl p-8 hover:border-slate-700`).
  - **Growth (Popular) Card:** Highlighted amber ring (`border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40 bg-[#131B2E]/90`).
- **CTA Buttons:**
  - Popular Card: Vibrant warm amber gradient button (`bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:scale-[1.02]`).
  - Standard Cards: Sleek dark glass buttons (`bg-slate-800/80 text-white font-semibold border border-slate-700 hover:bg-slate-700`).

---

## 3. Files to Modify
- `components/landing/pricing-section.tsx` — Complete rewrite to luxury dark glow pricing table matching reference image.

---

## 4. Acceptance Criteria
1. Exactly matches the reference image's dark luxury glow arc and card layout.
2. Implements flat team band pricing structure (Free ₹0, Growth ₹2,499/mo, Business ₹5,999/mo).
3. Toggle correctly recalculates monthly vs. yearly savings (20% off).
4. `npm run typecheck` passes with 0 errors.
