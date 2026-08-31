# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** working on **Apprizely**, an increment-based employee management SaaS platform that measures real employee contribution and converts it into fair, transparent salary rewards.

Your job is to understand the request, consult the project guidelines and installed workflow skills, create a clear implementation prompt or spec, request approval, and build strictly to that plan.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## 1. Product Overview

Apprizely replaces annual spreadsheet-based appraisals with continuous, transparent evaluation. It tracks work continuously via a configurable **Signal Engine**, computes objective performance scores against organization-defined weights, and maps those scores into concrete monthly salary increments and bonus recommendations.

### In Scope (v1 MVP):
- Multi-tenant Organization & Team management (Clerk Orgs sync to Supabase).
- Role-based Access Control (Super Admin, Org Admin/HR, Manager, Employee).
- Configurable Signal Engine & Template presets (School, Bank, Office, Retail).
- Continuous Work Entry logging, verification, and rating by Managers.
- Real-time Scoring Engine (85% output + 15% capped growth improvement).
- Review Cycle management (create, active, close, HR review & approval).
- Concrete Increment mapping displaying actual currency increase (`% × monthly_salary = +₹X/mo`).
- HR adjustment workflow with mandatory justification reasons.
- Role-tailored dashboards (Employee, Manager, HR Admin, Super Admin).
- PDF summary generation for official increment letters (`@react-pdf/renderer`).
- Real-time notifications (Supabase Realtime) and transactional emails (Resend).

### Out of Scope (Do Not Build):
- Direct payroll disbursement or bank payout integrations.
- Biometric/hardware attendance integration (attendance can be an imported signal).
- General task/project management tools (logging exists only to feed scoring).
- Native mobile app (responsive web application only).
- **Rule:** Do not overbuild. Build strictly what is in scope.

---

## 2. Agent Workflow

For every non-trivial implementation task:

1. **Read Context:** Inspect `AGENTS.md`, [PRD.md](file:///e:/Web%20Dev/apprizely/PRD.md), and [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md).
2. **Read Skills:** Read the explicitly named skills and any relevant tools from `.agents/skills/` (`/architect`, `/audit`, `/develop`, `/check`, `/test`, `/debug`, `/scope`, `/document`, `/sync`).
3. **Inspect Existing Code:** Search and view actual repository code files before making assumptions.
4. **Clarify Ambiguity:** Ask a focused question only if there is a load-bearing technical or design decision unmade.
5. **Write Implementation Prompt/Spec:** Create a detailed plan in `prompts/` (e.g. `prompts/scoring-engine.md`) or a spec in `docs/specs/`.
6. **Seek Approval:** Ask: *"I prepared the implementation prompt at `prompts/<file-name>.md`. Is this good to execute?"*
7. **Implement:** Execute code changes **only after user approval**.
8. **Run Checks:** Execute `npm run typecheck`, `npm run lint`, and `npm run build` where appropriate.
9. **Report & Verify:** Share exact manual test steps and command output.

---

## 3. Installed Skills & Reference Documents

Use the installed workflow skills located in `.agents/skills/`:

- `.agents/skills/scope` (`/scope`): Plan product slices and track feature implementation status.
- `.agents/skills/audit` (`/audit`): Inspect codebase patterns and maintain `AGENTS.md` context files.
- `.agents/skills/architect` (`/architect`): Resolve load-bearing technical decisions and write build specs to `docs/specs/`.
- `.agents/skills/develop` (`/develop`): Build features strictly against approved specs and design tokens.
- `.agents/skills/check` (`/check`): Verify real app execution (`/check verify`) or run code review (`/check review`).
- `.agents/skills/test` (`/test`): Generate comprehensive unit/integration test suites.
- `.agents/skills/document` (`/document`): Draft PR summaries, release notes, and update `CHANGELOG.md`.
- `.agents/skills/sync` (`/sync`): Reconcile scope, specs, and `AGENTS.md` after implementation.
- `.agents/skills/debug` (`/debug`): Reproduce, localize, fix, and verify runtime issues.

### Authoritative Documentation Sources:
- `node_modules/next/dist/docs/`: Next.js App Router, Server Components, Server Actions, Route Handlers.
- [PRD.md](file:///e:/Web%20Dev/apprizely/PRD.md): Functional and business logic requirements.
- [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md): Brand foundations, HSL colors, typography, and visual rules.

---

## 4. Implementation Prompt Standards

When saving plans to `prompts/`, include:
- **Goal:** Single-sentence summary of the task.
- **Skills & Files Inspected:** Proof of grounding in existing code.
- **Assumptions & Decisions:** Load-bearing choices resolved.
- **Files to Modify/Create:** Explicit list of paths.
- **Implementation Requirements:** Detailed technical step-by-step logic.
- **Security & RLS Requirements:** Data exposure controls and server boundaries.
- **Acceptance Criteria:** Measurable definition of "done".
- **Checks to Run:** Automated build/lint commands.
- **Manual Verification Steps:** Exact step-by-step testing instructions.

For UI tasks, also demand layout, typography, dark theme colors, spacing, tabular numbers, responsiveness, and state handling (loading/empty/error).

---

## 5. Architecture & Layer Boundaries

Keep strict separation between application layers:

- **UI Layer (`app/(dashboard)/...`, `components/`):** React Server Components (RSC) for reads, Client Components for interactivity. Displays stored data only; does not perform score math or RLS overrides.
- **State Management (`stores/`):** Zustand for client-only UI state (wizards, modals, filter drawers). Server state via RSC data fetching or TanStack Query.
- **API / Action Layer (`app/api/...`, server actions):** Thin wrappers validating input with Zod, enforcing auth/role authorization, calling core engine logic.
- **Engine Layer (`lib/scoring/`, `lib/increments/`):** Pure TypeScript modules for scoring formulas, signal normalization, and increment calculations.
- **Data Layer (`lib/supabase/`, `db/`):** Supabase client (with Clerk JWT header forwarding) and Drizzle ORM schema/migrations.

---

## 6. Tech Stack & Rule Constraints

### Allowed Stack:
- **Framework:** Next.js (App Router, Server Components, Server Actions)
- **Language:** TypeScript (Strict mode)
- **Authentication:** **Clerk** (with Organizations for multi-tenancy)
- **Database & Storage:** **Supabase** (Postgres + RLS + Realtime + Storage)
- **ORM / Migrations:** Drizzle ORM / Supabase SQL Editor
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms & Validation:** React Hook Form + Zod
- **Tables & Charts:** TanStack Table + Recharts
- **Email & PDF:** Resend + `@react-pdf/renderer`

### Negative Constraints (Do NOT Use):
- Do NOT use **Supabase Auth** for identity or session management (use Clerk).
- Do NOT use `auth.uid()` in Supabase RLS policies; use Clerk's `sub` and `org_id` claims from JWT.
- Do NOT write business logic or direct database mutations inside Client Components.
- Do NOT expose `SUPABASE_SERVICE_ROLE_KEY`, `CLERK_SECRET_KEY`, or `RESEND_API_KEY` to the client.
- Do NOT add a separate backend server framework (Express/Fastify).
- Do NOT over-decorate UI with gradients; reserve primary gradient strictly for signature highlights (CTA, score meter, logo).

---

## 7. Data Model & Database Source of Truth

Supabase Postgres is the single source of truth. All tenant tables carry `org_id` with strict RLS isolation.

### Core Tables & Requirements:
- `organizations`: `id` (uuid), `clerk_org_id` (text, unique), `name`, `plan`, `settings` (jsonb).
- `profiles`: `id` (uuid), `clerk_user_id` (text, unique), `org_id`, `team_id`, `full_name`, `email`, `role` (`super_admin` | `org_admin` | `manager` | `employee`), `job_role`, `monthly_salary` (numeric, highly sensitive).
- `teams`: `id`, `org_id`, `name`, `manager_id` (references profiles).
- `templates`: `id`, `org_id`, `name`, `industry`, `is_active`.
- `signals`: `id`, `org_id`, `template_id`, `name`, `type` (`number`|`rating`|`rate`|`percent`|`boolean`), `weight` (numeric 0..1, sum = 1.0), `target`, `enabled`.
- `cycles`: `id`, `org_id`, `name`, `start_date`, `end_date`, `status` (`draft`|`active`|`closed`|`approved`), `mapping` (jsonb score-to-increment bands).
- `work_entries`: `id`, `org_id`, `cycle_id`, `employee_id`, `signal_id`, `raw_value`, `note`, `status` (`pending`|`verified`|`rejected`), `verified_by`.
- `scores`: `id`, `org_id`, `cycle_id`, `employee_id`, `final_score`, `breakdown` (jsonb), `improvement`, `updated_at`. Unique on `(cycle_id, employee_id)`.
- `increments`: `id`, `org_id`, `cycle_id`, `employee_id`, `percent`, `salary_at_calc`, `amount` (`percent * salary_at_calc`), `new_salary`, `bonus`, `status` (`recommended`|`adjusted`|`approved`), `reason` (text, required if adjusted), `approved_by`.
- `notifications`: `id`, `org_id`, `user_id`, `type`, `payload` (jsonb), `read` (boolean).
- `audit_log`: `id`, `org_id`, `actor_id`, `action`, `entity`, `entity_id`, `meta` (jsonb).

---

## 8. Scoring & Increment Mechanics

### 8.1 Scoring Formula (v1)
$$\text{signalScore} = \text{clamp}\left(\frac{\text{rawValue}}{\text{target}} \times 100, 0, 100\right)$$
$$\text{weightedScore} = \sum (\text{signalScore}_i \times \text{weight}_i)$$
$$\text{finalScore} = (\text{weightedScore} \times 0.85) + (\text{improvementDelta} \times 0.15)$$

- Every score calculation must be deterministic and fully traceable to verified `work_entries`.
- `improvementDelta` is capped percentage growth compared to the employee's previous cycle score.

### 8.2 Increment & Currency Display Rules
- Scores map to default bands: 90–100 $\rightarrow$ 12%, 80–89 $\rightarrow$ 9%, 70–79 $\rightarrow$ 6%, 60–69 $\rightarrow$ 3%, <60 $\rightarrow$ 0%.
- Always calculate concrete currency figures:
  $$\text{amount} = \text{round}\left(\frac{\text{percent}}{100} \times \text{monthly\_salary}\right)$$
  $$\text{new\_salary} = \text{monthly\_salary} + \text{amount}$$
- **UI Requirement:** Display the concrete amount prominently (e.g., **+₹2,700/mo**) in success color; show the percentage as secondary metadata.
- **HR Adjustments:** If HR modifies a recommended increment, `reason` is mandatory.

---

## 9. UI & Design System Rules

Follow [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md) strictly:

- **Dark-First Surface Hierarchy:**
  - Base Ink: `#0B1020`
  - Surface Card: `#121A2E`
  - Surface Raised (Modals/Popovers): `#16203A`
  - Hairline Border: `#24304A`
- **Color Usage:**
  - Primary Brand: Violet (`#7C3AED`)
  - Secondary Brand: Cyan (`#06B6D4`)
  - Accent / Highlight: Magenta (`#EC4899`) — use sparingly!
  - Signature Gradient: `linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)` — max one per screen.
- **Typography:**
  - Headings: **Poppins** (`font-display`, SemiBold/Bold)
  - Body & UI: **Inter** (`font-sans`)
  - **Tabular Figures:** Always apply `font-variant-numeric: tabular-nums;` (or `tabular-nums` class) to scores, currency amounts, percentages, and tables.
- **Formatting:** Sentence case across all UI buttons, headings, and labels. Uppercase tracked caps reserved exclusively for the brand tagline lockup.

---

## 10. Security & Privacy Safeguards

1. **Salary Data Protection:** `monthly_salary` and calculated `increments` are strictly restricted:
   - `org_admin`: Access to all org staff.
   - `manager`: Access to assigned team members only.
   - `employee`: Access to own salary and approved increment only.
2. **RLS Policy Rule:** Always filter queries by Clerk JWT `org_id` claim:
   ```sql
   using ( org_id = (auth.jwt() ->> 'org_id')::uuid )
   ```
3. **Server-Only Operations:** Scoring re-computation, cycle closing, increment approval, and PDF generation must run in Server Actions or API Route Handlers protected by role guards.

---

## 11. Common Traps & Known Pitfalls

1. **Supabase Joined Filter Error:** Do NOT use `.eq('foreignTable.column', value)` in `supabase-js` joined queries. Fetch joined rows without filter and apply filtering in JS, or use a RPC/custom view.
2. **Clerk Auth Claims:** Do NOT query Supabase `auth.users`. Match profiles via `clerk_user_id` and Clerk JWT claims.
3. **Numeric Precision:** Use numeric types in Postgres and decimal-safe calculations for currency to prevent floating-point rounding errors.
4. **Layout Shifts:** Apply `tabular-nums` on dynamic score rings and dashboard numbers to prevent layout jump during real-time updates.

---

## 12. Verification & Automated Checks

Before reporting completion of any task, execute and report output for:

- `npm run typecheck` (`tsc --noEmit`): Verify strict TypeScript compliance.
- `npm run lint`: Ensure ESLint standards are met.
- `npm run build`: Verify Next.js production build succeeds whenever routes, server actions, or configuration change.

---

## 13. When in Doubt Fallback Rules

If requirements or instructions are unclear:
1. Keep implementation small and tightly scoped.
2. Refer to [PRD.md](file:///e:/Web%20Dev/apprizely/PRD.md) for feature behavior and [DESIGN.md](file:///e:/Web%20Dev/apprizely/DESIGN.md) for styling.
3. Preserve strict client vs. server boundaries.
4. Save a prompt in `prompts/` and request user review before writing code.
5. Report empirical execution output from `typecheck`, `lint`, and dev server.
