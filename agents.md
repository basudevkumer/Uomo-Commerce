# AGENTS.md — Uomo-Commerce

This file gives any AI coding agent (Codex, Cursor, Claude Code, etc.) working in this repo the context it needs before making changes. Read this fully before writing or editing code.

## 1. What this project is

**Uomo-Commerce** is a fashion/apparel e-commerce site being built as a learning + portfolio project. Target market context includes Bangladesh (local payment methods like bKash/Nagad are already referenced in the UI), but the store is being built as a general-purpose storefront + admin dashboard.

The person maintaining this repo is an intermediate-level learner who is deliberately building things one concept at a time. **Do not jump ahead to production/enterprise-grade complexity unless explicitly asked.** When a feature has a "basic / intermediate / advanced" spectrum (this comes up a lot for auth, caching, payments, etc.), default to **intermediate** unless told otherwise, and say out loud what you're deliberately leaving out and why.

## 2. Tech stack

- **Monorepo**: npm workspaces (`frontend`, `backend`) — root `package.json` only proxies scripts to `frontend` right now.
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Zustand (state), TanStack React Query (server state), Axios, Framer Motion, `lucide-react` / `react-icons`.
- **Backend**: Node.js — **currently an empty workspace** (`backend/package.json` only, no dependencies or source files yet). When backend work is requested, the intended stack is **MERN**: Express.js + MongoDB/Mongoose + JWT-based custom auth (not Firebase, not NextAuth — even though `frontend/.env.example` has leftover Firebase client keys, those are not currently wired to anything and should be treated as unused unless the person says otherwise).
- **Path alias**: `@/*` → `frontend/src/*` (see `frontend/jsconfig.json`).

## 3. Repo structure

```
/
├── frontend/                  # Next.js app (the only workspace with real code right now)
│   └── src/
│       ├── app/                # App Router routes
│       │   ├── (auth)/          # login-register, logout
│       │   ├── (public)/        # about, faq, contact, lookbook, store-locator, etc.
│       │   ├── (shop)/          # cart, checkout, order tracking, shop/[id]
│       │   ├── admin/           # admin dashboard (users, orders, products, coupons, payments, inventory, reports...) — NO auth guard yet
│       │   ├── dashboard/       # customer account area (account details, address, orders, wishlist)
│       │   └── api/             # a couple of Next.js route handlers (e.g. products) — NOT the main backend
│       ├── features/<domain>/   # feature-based modules: components/, services/, hooks/ per domain
│       │   (e.g. features/auth, features/cart, features/shop, features/admin, features/dashboard, features/blog)
│       ├── store/               # one Zustand slice per domain: authSlice.js, cartSlice.js, blogStore.js, useProductStore.js
│       ├── components/          # shared/non-domain components: common/, navigation/, ui/, dashboard/
│       ├── providers/           # e.g. QueryProvider.jsx (React Query client)
│       ├── lib/                 # small shared utils (e.g. cn() helper for Tailwind class merging)
│       ├── constants/           # icons.jsx, assets.jsx
│       └── helpers/dummyData.js # MOCK data + fake auth (authenticateDemoUser/registerDemoUser) — being phased out as real backend work lands
└── backend/                    # empty workspace, to be built out (Express + MongoDB planned)
```

**Convention to follow**: when adding a new domain feature, mirror the existing pattern — `features/<domain>/components/`, `features/<domain>/services/` (API calls), `features/<domain>/hooks/` (React Query hooks) — rather than inventing a new structure. Look at `features/blog` or `features/shop` as reference examples before adding a new feature folder.

**Auth UI currently has three separate, duplicated entry points — this is real existing duplication, not a misunderstanding to "clean up" silently:**
1. `features/auth/components/Login.jsx` + `Register.jsx` — rendered inside the navbar's "Account" slide-in panel (`components/navigation/navbar/components/NavIcons.jsx`), each with its own local form state/validation.
2. `features/auth/components/regiLog/RegiLog.jsx` — a **separate, independent** implementation (not a wrapper around #1) with its own tabbed login/register form, its own validation (including a password regex requiring upper/lower/number/special char), and its own "logged-in account" view with a logout button. It's used in three places: the `/login-register` page, a **global login modal** (`components/common/ModalWrapper.jsx`, shown via `useLoginModalStore`/`openLoginModal()` from `Product.jsx` and `features/shop/components/shopSingle/Top.jsx` when a guest tries to wishlist/interact), and reused as-is inside `features/dashboard/components/dashboardAllComponent/LogOut.jsx` — so `/logout` doesn't have real logout logic of its own; it just renders `RegiLog`, which happens to show the logged-in/logout view if a user is set in the store.

When real auth work lands, this duplication should be consolidated into one shared hook/service (e.g. `features/auth/hooks/useAuth.js` or similar) that all three surfaces call into, rather than fixing the same login/register logic three times independently. Flag this consolidation as a step rather than doing a silent big refactor.

## 4. Known current gaps (don't be surprised by these, and don't "fix" them silently without being asked)

- **Auth is fake right now, in all three places it's implemented** (`Login.jsx`/`Register.jsx`, and independently in `RegiLog.jsx`) — all of them call `authenticateDemoUser()` / `registerDemoUser()` from `helpers/dummyData.js`, which just checks against an in-memory/localStorage demo user list (`localStorage` key `uomo-demo-users`). `store/authSlice.js` only stores a `user` object — no tokens, no real session. There's no `/lost-password` page yet even though both `Login.jsx` and `RegiLog.jsx` link to it.
- **`/admin/**` has zero access control** — anyone can currently open the admin dashboard routes. Do not assume it's protected.
- **No `middleware.js`** exists in `frontend/` yet.
- **Blog data comes from the public dev.to API** (`features/blog/services/blogApi.js`), and **product data comes from the public dummyjson.com API** (proxied through `frontend/src/app/api/products/route.js`, consumed via `features/shop/hooks/useAllProduct.jsx`, and also called directly from the navbar live search in `NavIcons.jsx`) — none of this is this project's own backend. That's intentional for now, not a bug.
- **No automated test suite exists yet.** Don't assume `npm test` does anything meaningful, and don't silently add a testing framework unless asked.
- **`backend/` has no code at all** — no Express app, no models, no routes. Treat any backend request as building from scratch.

## 5. Style & conventions to respect

- Components are React function components, `'use client'` at the top when they use hooks/state/browser APIs.
- Tailwind utility classes directly in JSX; shared conditional-class logic goes through the `cn()` helper in `lib/utils.js` (clsx + tailwind-merge), not manual string concatenation.
- Custom design tokens like `texts_14_regular`, `text-head`, `text-second`, `border-footer` are already defined in the Tailwind setup — reuse them instead of introducing new ad-hoc classes/colors when editing existing UI.
- State: Zustand for client/UI state (one slice per domain in `store/`), React Query for server/data state. Don't introduce Redux or another state library.
- Keep existing visual design/markup intact when a task is about wiring up logic (e.g., real auth) — change the data layer, not the layout/styling, unless redesign is explicitly requested.
- ESLint config is `eslint-config-next/core-web-vitals` — keep code compatible with it (don't disable rules broadly to silence warnings).

## 6. General rules for agents working here

- Don't touch `node_modules`, lockfiles (beyond what package installs naturally update), or `.git` internals directly.
- Don't add new major dependencies/frameworks (e.g., swap Zustand for Redux, add NextAuth, add a UI kit) without flagging it first — this is a learning project and unexpected architecture changes make it harder to follow along.
- When a task is scoped to a specific level (e.g., "intermediate-level auth"), stay inside that scope even if you can see how to make it more robust — call out what you're leaving out rather than adding it silently.
- Prefer small, explainable steps over one large sweeping change, and briefly comment non-obvious code (especially security-related logic like tokens/sessions) since the person is actively learning these concepts, not just shipping.
- If you're unsure whether something belongs in `backend/` (real Express API) vs. `frontend/src/app/api/*` (Next.js route handlers, currently only used for a couple of product endpoints), default to `backend/` for anything auth/business-logic related — the Next.js API routes are not the intended main backend.