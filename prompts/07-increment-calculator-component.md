# Implementation Plan: Interactive Real-Time Increment Calculator

**Goal:** Build an interactive, real-time `IncrementCalculator` component (`components/landing/increment-calculator.tsx`) placed on the landing page (`#increments`), enabling HR managers and business owners to test how performance scores convert into exact Rupee monthly salary increases.

---

## 1. Calculation Logic & Score Bands (per AGENTS.md §8.2)

- **Input 1: Monthly Salary (`monthly_salary`):** Interactive slider + currency input (₹10,000 – ₹500,000/mo, default ₹30,000/mo).
- **Input 2: Performance Score (`score`):** Interactive slider (0 – 100, default 88 points).
- **Score Band Mapping Table:**
  - 90–100 Score $\rightarrow$ 12% (Exceptional Contributor)
  - 80–89 Score $\rightarrow$ 9% (High Performer)
  - 70–79 Score $\rightarrow$ 6% (Solid Contributor)
  - 60–69 Score $\rightarrow$ 3% (Meets Minimum)
  - < 60 Score $\rightarrow$ 0% (Needs Improvement)

### Outputs:
$$\text{monthly\_increase} = \text{round}\left(\frac{\text{percent}}{100} \times \text{monthly\_salary}\right)$$
$$\text{new\_monthly\_salary} = \text{monthly\_salary} + \text{monthly\_increase}$$
$$\text{annual\_increase} = \text{monthly\_increase} \times 12$$

---

## 2. Interactive UI Design & Visuals

- **Section ID:** `#increments` (matches Navbar link `Increment Calculator`).
- **Layout:** 2-column layout (Left: Interactive Sliders & Role Presets | Right: Live Result Card).
- **Live Output Highlights:**
  - **Monthly Increase Badge:** Prominently display **+₹2,700/mo** in success emerald color with tabular figures (`tabular-nums`).
  - **New Total Salary:** **₹32,700/mo**.
  - **Annualized Value:** **+₹32,400/year extra**.
  - **Visual Score Ring / Meter:** Active band indicator showing current performance tier.

---

## 3. Files to Modify / Create
- `components/landing/increment-calculator.tsx` — [NEW] Interactive Increment Calculator component.
- `app/page.tsx` — Insert `<IncrementCalculator />` section before Pricing.
- `components/shared/navbar.tsx` — Connect `Increment Calculator` link to `#increments`.

---

## 4. Acceptance Criteria
1. Sliders update salary increase amounts instantaneously with zero delay.
2. Formats all currency figures in Indian Rupee format (`₹2,700/mo`) with `tabular-nums`.
3. `npm run typecheck` passes with 0 errors.
