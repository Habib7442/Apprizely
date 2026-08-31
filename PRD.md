# Apprizely — Product Requirements Document

> **Where good work pays off.**
> An increment-based employee management system that measures each professional's real contribution and turns it into a fair, transparent reward.

| | |
|---|---|
| **Product** | Apprizely |
| **Domain** | apprizely.com |
| **Type** | Multi-tenant B2B SaaS (web) |
| **Audience** | Any monthly-salaried employee, in any organisation |
| **Version** | 1.0 — Engineering PRD |
| **Owner** | Habib Tanwir — Locallify |
| **Status** | Draft for build |

---

## 1. Overview

Most organisations decide raises and appraisals from memory and scattered spreadsheets, so the loudest employees get rewarded over the most effective ones. Apprizely captures each employee's work continuously, scores it automatically against rules the organisation controls, and converts the score into a fair salary increment at review time — with a full, transparent breakdown every employee can see.

Apprizely is for **any monthly-salaried employee, in any kind of organisation** — the job type is irrelevant. What matters is that the person draws a monthly salary and is due a periodic increment. A single **configurable signal engine** with ready-made templates handles every role, rather than hard-coding metrics for specific jobs. Teachers, bank staff, clinic and retail teams, etc. are simply examples of the many roles it can measure.

### 1.1 Goals

- Capture employee work continuously instead of once a year.
- Convert work into a transparent score using organisation-controlled rules.
- Turn scores into fair, defensible salary increments at each review cycle.
- Give every employee full visibility into how their score was built.
- Support multiple industries via configurable templates on one engine.

### 1.2 Non-Goals (v1)

- Not a full payroll/salary-disbursement system — Apprizely *recommends* increments; it does not pay salaries.
- Not an attendance/biometric hardware system — attendance can be a signal (imported), not a device integration.
- Not a general project-management tool — task logging exists only to feed scoring.
- No native mobile app in v1 (responsive web only).

---

## 2. Target Users & Personas

**Market (who can use it):** any organisation with monthly-salaried employees — schools, clinics, retail chains, offices, factories, agencies, and so on. The engine is job-agnostic, so no sector is excluded.

**Go-to-market (who to sell to first):** although the product is universal, the *sales* motion should be pointed. Pick one type of organisation for the first customers (whichever the founder/client has easiest access to), nail that template and sales story so it feels purpose-built, then widen. Universality is the expansion path, not the launch pitch. Typical sweet spot: ~20–200 staff already running appraisals on spreadsheets and messaging apps.

| Persona | Role | Primary needs |
|---|---|---|
| **Platform Owner** | Super Admin | Onboard organisations, monitor usage, billing |
| **HR / Admin** | Org Admin | Configure templates, weights, cycles; approve increments |
| **Manager** | Manager | Assign/verify work, rate reports, recommend increments |
| **Employee** | Employee | Log work, track score, view feedback & increment |

---

## 3. Roles & Permissions (RBAC)

Four application roles, enforced at both the UI and the database (RLS) layer.

| Capability | Super Admin | Org Admin (HR) | Manager | Employee |
|---|:--:|:--:|:--:|:--:|
| Manage all organisations | ✅ | — | — | — |
| Configure org templates/weights/cycles | — | ✅ | — | — |
| Manage users & teams (own org) | — | ✅ | — | — |
| Assign & verify work | — | ✅ | ✅ (team) | — |
| Rate/review employees | — | ✅ | ✅ (team) | — |
| View team scores | — | ✅ | ✅ (team) | own only |
| Run a review cycle | — | ✅ | — | — |
| Approve final increments | — | ✅ | recommend | — |
| Log own work | — | ✅ | ✅ | ✅ |
| View own score & breakdown | — | ✅ | ✅ | ✅ |

---

## 4. Core Concepts

### 4.1 Two-Layer Reward Model

1. **Continuous Score (all cycle long)** — points accumulate automatically from signals; employees watch it move in real time.
2. **Periodic Increment (at cycle end)** — the accumulated score maps to a salary-increment % (and optional bonus), reviewed and approved by HR.

```
Work logged → Signals scored & weighted → Points accumulate
→ Cycle closes → Score → Increment band → HR approves → Employee sees breakdown
```

### 4.2 The Signal Engine

Every measurable thing is a **signal** (a named, scoreable factor). An organisation picks a template, toggles signals on/off, and sets each signal's **weight**. The same engine serves **any salaried role in any industry** — only the template differs. The rows below are illustrative examples, not a fixed list; an org can build a template for any role.

| Example role | Example signals | Reward basis |
|---|---|---|
| Teacher | Classes taken · student pass/improvement · feedback · attendance | Increment on results + feedback |
| Bank employee | Targets met · accounts opened · accuracy · CSAT | Increment + bonus on targets |
| Office / back-office | Tasks (by difficulty) · deadlines met · punctuality · manager rating | Increment on consistency + output |

### 4.3 Scoring Formula (v1)

Each signal value is normalised to `0–100`, multiplied by its weight (weights sum to 1.0 per template), and summed. A small **improvement factor** rewards growth over the previous cycle.

```
signalScore   = normalise(rawValue, target)        // 0–100
weightedScore = Σ (signalScore_i × weight_i)        // 0–100
finalScore    = (weightedScore × 0.85) + (improvementDelta × 0.15)
```

- `normalise()` clamps at 100 (no runaway gaming from one signal).
- `improvementDelta` = capped % change vs. the employee's previous-cycle score.
- Every point is traceable to the work entries that produced it (audit trail).

### 4.4 Increment Mapping (org-configurable)

Score bands map to increment %; HR can edit bands per org.

| Score band | Suggested increment | Label |
|---|---|---|
| 90–100 | 12% | Outstanding |
| 80–89 | 9% | Exceeds |
| 70–79 | 6% | Meets |
| 60–69 | 3% | Developing |
| < 60 | 0% | Needs improvement |

Because every employee has a stored **monthly salary**, the increment is shown as a **real amount**, not just a percentage. Example: a ₹30,000/month employee scoring 84 → 9% → **+₹2,700/month** (new salary ₹32,700). Displaying the concrete rupee figure makes the reward tangible for the employee and the decision clear for HR.

---

## 5. Functional Requirements

### 5.1 Organisation & Team Setup
- Create org workspace (mapped to a Clerk Organization).
- Departments, teams, and job roles; assign managers to teams.
- Invite users by email; bulk employee import (CSV → Supabase).

### 5.2 Templates & Configuration
- Seeded industry templates (School, Bank/Finance, General Office).
- Toggle signals, set weights (must sum to 100%), edit increment bands.
- Define review cycles (monthly / quarterly / yearly).

### 5.3 Work Logging & Verification
- Employees log or are assigned tasks/targets; managers verify or rate.
- KPI values entered manually or CSV-imported.
- Per-cycle manager review form with comments visible to the employee.

### 5.4 Scoring Engine
- Recomputes live score on each verified work entry.
- Rewards absolute contribution + improvement.
- Full audit trail per point.

### 5.5 Increment & Reward Engine
- On cycle close, generates recommended increment % **and the real amount** (percent × the employee's monthly salary), plus optional bonus.
- Shows current salary, increment amount, and resulting new salary — not just a %.
- HR reviews, adjusts with a mandatory reason, approves.
- Generates a per-employee increment summary / letter (PDF) with the concrete figures.

### 5.6 Dashboards
- **Employee:** my score, signal breakdown, feedback, increment history.
- **Manager:** team scores, pending verifications, recommendations.
- **HR/Admin:** org-wide view, cycle status, reports & exports.

### 5.7 Transparency & Reports
- Plain-language score breakdown for every employee.
- Export to PDF / Excel for records.

### 5.8 Notifications
- Reminders for pending reviews, cycle deadlines, new feedback.
- In-app (Supabase Realtime) + email (Resend). WhatsApp deferred.

---

## 6. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js (App Router, RSC, Server Actions) | Full-stack React, server-first data, fast to ship |
| **Language** | TypeScript (strict) | Type safety across DB → UI |
| **Auth** | **Clerk** (with Organizations) | Orgs = tenants out of the box; roles, invites, SSO |
| **Database** | **Supabase** (Postgres + RLS + Realtime + Storage) | Managed Postgres, row-level security, realtime, file storage |
| **DB access** | Supabase JS client (+ **Drizzle ORM** optional) | Type-safe queries & migrations |
| **Client state** | **Zustand** | Lightweight UI/wizard/filter state |
| **Server state** | TanStack Query *(optional)* + RSC fetching | Caching for client-fetched data |
| **Styling** | Tailwind CSS + shadcn/ui | Fast, consistent, themeable |
| **Forms** | React Hook Form + Zod | Validation shared client/server |
| **Tables** | TanStack Table | Sortable/filterable data grids |
| **Charts** | Recharts | Score & trend dashboards |
| **Email** | Resend | Transactional email |
| **PDF** | @react-pdf/renderer / serverless | Increment letters, reports |
| **Scheduled jobs** | Supabase cron / Edge Functions (or Inngest) | Cycle close, score recompute, reminders |
| **Billing (later)** | Razorpay (India) / Stripe (global) | SaaS subscriptions |
| **Analytics (opt)** | PostHog | Product usage |
| **Hosting** | Vercel + Supabase | Serverless FE + managed DB |

### 6.1 Clerk + Supabase Integration (important)

Clerk handles identity; Supabase holds data. Wire them so RLS knows *who* and *which org* is calling:

1. Use **Clerk Organizations** as the tenant boundary. Each org = one workspace; Clerk org roles map to app roles (`admin` → org_admin, `member` → employee, with custom roles for `manager`).
2. Configure **Supabase Third-Party Auth** to accept Clerk-issued JWTs. Supabase then reads Clerk claims (e.g. `sub`, `org_id`) in RLS policies.
3. Mirror Clerk users/orgs into Supabase tables (`profiles`, `organizations`) via **Clerk webhooks** (`user.created`, `organizationMembership.created`, etc.) so you can join app data to them.
4. Every tenant-scoped table carries `org_id`; RLS enforces `org_id = auth.jwt()->>'org_id'`. Salary data makes this non-negotiable.

> Note: with Clerk as the auth provider, don't rely on Supabase's built-in `auth.users` / `auth.uid()`. Use the Clerk `sub` claim as the user identifier in policies.

### 6.2 Data Fetching Pattern

- **Reads:** React Server Components using a Supabase server client (per-request, forwards the Clerk token).
- **Mutations:** Server Actions (or Route Handlers) with Zod-validated input; revalidate paths/tags after writes.
- **Zustand:** client-only state — multi-step config wizard, dashboard filters, modal/drawer state, optimistic UI. *Not* a cache for server data.
- **Realtime:** Supabase Realtime channel for live score updates and notifications.

### 6.3 Suggested Folder Structure

```
apprizely/
├─ app/
│  ├─ (marketing)/                 # public site, pricing
│  ├─ (auth)/                      # Clerk sign-in/up
│  ├─ (dashboard)/
│  │  ├─ employee/                 # employee views
│  │  ├─ manager/                  # manager views
│  │  ├─ admin/                    # HR/org admin
│  │  └─ super-admin/              # platform owner
│  └─ api/
│     └─ webhooks/clerk/           # user/org sync
├─ components/                     # ui (shadcn), shared
├─ lib/
│  ├─ supabase/                    # server & browser clients
│  ├─ scoring/                     # scoring + increment engine
│  ├─ validators/                  # zod schemas
│  └─ auth/                        # role helpers, guards
├─ stores/                         # zustand stores
├─ db/                             # drizzle schema + migrations
└─ types/
```

---

## 7. Data Model (Supabase / Postgres)

Core tables. All tenant tables include `org_id` and are protected by RLS.

```sql
-- Tenants (mirror of Clerk orgs)
create table organizations (
  id            uuid primary key default gen_random_uuid(),
  clerk_org_id  text unique not null,
  name          text not null,
  plan          text default 'free',
  settings      jsonb default '{}',
  created_at    timestamptz default now()
);

-- Users (mirror of Clerk users)
create table profiles (
  id            uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  org_id        uuid references organizations(id) on delete cascade,
  team_id       uuid references teams(id),
  full_name     text,
  email         text,
  role          text not null default 'employee'
                check (role in ('super_admin','org_admin','manager','employee')),
  job_role      text,                   -- free text: any role (teacher, nurse, cashier…)
  monthly_salary numeric,                -- sensitive: gates increment amount; tight RLS
  created_at    timestamptz default now()
);

create table teams (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid references organizations(id) on delete cascade,
  name       text not null,
  manager_id uuid references profiles(id)
);

-- A template = a named set of signals for an industry
create table templates (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid references organizations(id) on delete cascade,
  name       text not null,           -- e.g. "School v1"
  industry   text,
  is_active  boolean default true,
  created_at timestamptz default now()
);

-- Signals = the scoreable factors within a template
create table signals (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid references organizations(id) on delete cascade,
  template_id  uuid references templates(id) on delete cascade,
  name         text not null,         -- e.g. "Student pass rate"
  type         text not null          -- number | rating | rate | percent | boolean
                 check (type in ('number','rating','rate','percent','boolean')),
  weight       numeric not null default 0,   -- 0..1, weights per template sum to 1
  target       numeric,               -- goal used for normalisation
  enabled      boolean default true
);

-- Review periods
create table cycles (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid references organizations(id) on delete cascade,
  name        text not null,          -- "Q1 2026"
  start_date  date not null,
  end_date    date not null,
  status      text default 'active'   -- draft | active | closed | approved
                check (status in ('draft','active','closed','approved')),
  mapping     jsonb                    -- score-band → increment% rules
);

-- Every logged task / KPI value / rating
create table work_entries (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid references organizations(id) on delete cascade,
  cycle_id     uuid references cycles(id) on delete cascade,
  employee_id  uuid references profiles(id) on delete cascade,
  signal_id    uuid references signals(id),
  raw_value    numeric,
  note         text,
  status       text default 'pending' -- pending | verified | rejected
                 check (status in ('pending','verified','rejected')),
  verified_by  uuid references profiles(id),
  created_at   timestamptz default now()
);

-- Computed score per employee per cycle
create table scores (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid references organizations(id) on delete cascade,
  cycle_id      uuid references cycles(id) on delete cascade,
  employee_id   uuid references profiles(id) on delete cascade,
  final_score   numeric,
  breakdown     jsonb,                 -- per-signal contribution
  improvement   numeric,
  updated_at    timestamptz default now(),
  unique (cycle_id, employee_id)
);

-- Final reward
create table increments (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid references organizations(id) on delete cascade,
  cycle_id      uuid references cycles(id) on delete cascade,
  employee_id   uuid references profiles(id) on delete cascade,
  percent       numeric,
  salary_at_calc numeric,               -- monthly salary snapshot at cycle close
  amount        numeric,                -- percent × salary_at_calc (the real increase)
  new_salary    numeric,                -- salary_at_calc + amount
  bonus         numeric default 0,
  status        text default 'recommended'  -- recommended | adjusted | approved
                  check (status in ('recommended','adjusted','approved')),
  reason        text,                  -- required if adjusted
  approved_by   uuid references profiles(id),
  created_at    timestamptz default now()
);

create table notifications (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid references organizations(id) on delete cascade,
  user_id     uuid references profiles(id) on delete cascade,
  type        text,
  payload     jsonb,
  read        boolean default false,
  created_at  timestamptz default now()
);

create table audit_log (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid references organizations(id) on delete cascade,
  actor_id    uuid references profiles(id),
  action      text,
  entity      text,
  entity_id   uuid,
  meta        jsonb,
  created_at  timestamptz default now()
);
```

### 7.1 Example RLS policy (tenant isolation)

```sql
alter table work_entries enable row level security;

create policy "same org only"
on work_entries for all
using ( org_id = (auth.jwt() ->> 'org_id')::uuid )
with check ( org_id = (auth.jwt() ->> 'org_id')::uuid );
```

Employees additionally restricted to their own rows; managers to their team; org_admin to the whole org — layered with role checks from the `profiles` table.

---

## 8. Key User Flows

1. **Onboarding:** Owner/HR signs up → creates Clerk org → picks industry template → sets weights & increment bands → invites staff.
2. **Cycle run:** HR opens a cycle → employees/managers log & verify work → live scores accumulate → HR closes cycle → engine computes scores → recommends increments → HR approves → employees notified with breakdown.
3. **Employee daily:** logs work → manager verifies → score updates in real time → employee sees updated breakdown.

---

## 9. Non-Functional Requirements

- **Security & privacy:** salary data encrypted at rest (Supabase), strict RLS, complete tenant isolation, audit logging.
- **Multi-tenancy:** no data crosses organisations, ever.
- **Reliability:** scores/increments reproducible; deterministic engine with audit trail.
- **Performance:** dashboards load < 2s for typical orgs (≤ 200 staff).
- **Usability:** usable by non-technical HR with minimal training.
- **Responsive:** full functionality on mobile browsers.
- **Scalability:** clean path from dozens to thousands of orgs.

---

## 10. Scope & Roadmap

| Phase | Focus | Deliverables |
|---|---|---|
| **P1 — MVP** | One template, core loop | Clerk auth + orgs, RLS, roles, work logging, scoring engine, one cycle, increment output, employee & HR dashboards |
| **P2** | Depth & flexibility | Configurable templates/weights, manager verification flow, HR approval + reasons, reports/exports, notifications |
| **P3** | Scale & reach | More industry templates, analytics, WhatsApp alerts, billing/subscriptions, onboarding polish |

---

## 11. Success Metrics

- Orgs complete a full review cycle inside Apprizely.
- Reduction in appraisal disputes / prep time.
- Employees check scores between cycles (engagement).
- Org renews after first cycle (retention).

---

## 12. Open Questions

- Launch vertical: schools, banks, or general offices?
- Reward: increment % only, or increment + bonus?
- Cycle cadence and who gives final approval?
- Does Apprizely ever write to payroll, or only recommend?
- Pricing: per-employee, per-org, or tiered?

---

## 13. Future Enhancements

- Native mobile app (React Native).
- Peer / 360° review signals.
- Goal-setting (OKRs) tied to signals.
- AI-assisted review summaries and anomaly/gaming detection.
- Payroll integrations.

---

*Apprizely — Where good work pays off. Prepared by Habib Tanwir · Locallify.*
