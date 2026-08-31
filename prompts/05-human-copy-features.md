# Implementation Plan: Human-Centered Feature Card Copy (HR & Buyer Focus)

**Goal:** Update `components/landing/feature-section.tsx` to eliminate internal engineering jargon ("signal weights", "signal engine") and replace it with plain, human-centered HR/Buyer language.

---

## 1. Copy Mapping (Buyer & HR Language)

| Card | Old Jargon | New Human Copy (Title & Description) | Pill Tag | Link Text |
|---|---|---|---|---|
| **1** | `Signal Engine` / "signal weights" | **Set what "good work" means**<br />Pick the things that count for each role — targets, attendance, ratings — and how much each matters. Works for any job: teacher, cashier, banker, nurse. | `Define Good Work` | `Set Up Roles →` |
| **2** | `Work Logging` | **Log work as it happens**<br />Staff and managers record work through the year, so raises reflect the whole year — not just the last few weeks before appraisal. | `Continuous Log` | `See How Logging Works →` |
| **3** | `Increment Calculator` | **See the real raise amount**<br />Every score turns into an actual monthly figure (like +₹2,700/mo), so there's no mystery about how a raise was decided. | `Clear Increases` | `View Salary Mapping →` |
| **4** | `HR Workflow` | **Approvals without arguments**<br />HR reviews and approves each increment with a reason on record, and sends every employee a clear PDF letter. | `Fair Approvals` | `Explore HR Workflow →` |

---

## 2. Files to Modify
- `components/landing/feature-section.tsx` — Update array data to human-centered buyer copy.
- `DESIGN.md` — Enforce plain buyer-language rule in documentation guidelines.

---

## 3. Acceptance Criteria
1. Feature grid copy uses plain HR & buyer language (0 engineering jargon terms like "signal weights").
2. Preserves concrete proof numbers (`+₹2,700/mo`) and concrete role examples (teacher, cashier, banker, nurse).
3. `npm run typecheck` passes with 0 errors.
