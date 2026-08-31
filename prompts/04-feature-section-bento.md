# Implementation Plan: Bento Feature Grid (Reference Design)

**Goal:** Redesign `components/landing/feature-section.tsx` into a clean 2x2 pastel bento card grid matching the user's reference design ("Supercharge Your Workflow"), replacing the dark 2-column feature section.

---

## 1. Design Breakdown (Matching Reference Image)

- **Section Title:** `Everything You Need for Fair Evaluation` (Centered, bold Poppins `font-display`, `text-slate-950`).
- **Section Subtitle:** `Apprizely connects daily contribution to objective monthly salary rewards.`

### 2x2 Card Grid Layout

| Card | Tag Pill | Headline | Description | Pastel Card BG |
|---|---|---|---|---|
| **1** | `Signal Engine` | **Objective Weighting for Every Role** | Configure daily KPI targets and custom signal weights tailored to any job role. | Warm Cream (`bg-[#FFF9F0] border-amber-200/60`) |
| **2** | `Work Logging` | **Continuous Work Verification** | Log daily tasks, sprint milestones, and manager ratings continuously without annual memory bias. | Sky Blue (`bg-[#F0F7FF] border-blue-200/60`) |
| **3** | `Increment Calculator` | **Transparent Rupee Increments** | Convert continuous scores directly into exact monthly salary increases (`+₹2,700/mo`). | Soft Violet (`bg-[#FAF5FF] border-purple-200/60`) |
| **4** | `HR Workflow` | **Dispute-Free HR Approvals** | Mandatory justification logs for salary adjustments and instant PDF increment letter export. | Soft Mint (`bg-[#F0FDF4] border-emerald-200/60`) |

Each card features:
1. Top white pill badge (`bg-white shadow-xs text-xs font-semibold px-3 py-1 rounded-md text-slate-800`).
2. Bold heading (`text-xl sm:text-2xl font-bold text-slate-950`).
3. Clean description copy (`text-xs sm:text-sm text-slate-600 leading-relaxed`).
4. Bottom link with right arrow (`Explore Features →`).
5. Translucent right-side geometric shape pattern matching the reference image.

---

## 2. Files to Modify
- `components/landing/feature-section.tsx` — Complete rewrite to clean light pastel 2x2 bento grid.

---

## 3. Acceptance Criteria
1. Clean 2x2 grid layout on desktop, stacked on mobile.
2. 4 soft pastel card background colors matching reference image.
3. White pill badges at top left of each card.
4. Clean bottom text links (`→`).
5. `npm run typecheck` passes with 0 errors.
