# OGCIO Certificate Lookup Component

Prototype of the Irish government’s "Order a certificate" service — a
single-screen lookup for birth, marriage, and death certificates, built on the
gov.ie design system.

## Links

- **Live preview:** https://ogcio-cert-lookup-component.vercel.app
- **Repository:** https://github.com/gilesr-nearform/ogcio-cert-lookup-component

## What’s in here

- **Step 1 lookup** with 6 states (initial, loading, single result, multi
  result, not found, service unavailable) driven by a mock API
- **PPSN input pattern**: single empty field, no defaults; Birth and Marriage
  show a "Use my own PPSN" quick-fill link, Death does not. See
  [`docs/decisions/0001-ppsn-input-pattern.md`](./docs/decisions/0001-ppsn-input-pattern.md)
  for the rationale and sources.
- **`maskName`** utility plus `maskIfNotUser` — the signed-in user’s own name
  passes through unmasked, everyone else is bullet-masked
- **Step 2 confirmation** of name + email + terms acceptance
- **PaymentsIE handoff** placeholder (full-screen dark page) standing in for
  the real payment integration
- **Debug start** at `/` with happy-path buttons and unhappy-path shortcuts

## Demo PPSNs

The PPSN field starts empty for every cert type. Type or paste any of these
to see different responses (Birth and Marriage also have a "Use my own PPSN"
link that one-clicks `5612908T` into the field):

| PPSN        | Behaviour                                                       |
|-------------|-----------------------------------------------------------------|
| `1234567T`  | Working demo record (single result) for **any** cert type       |
| `7823641W`  | Birth — Fiadh Rose Murphy (Aoife’s child)                       |
| `5612908T`  | Birth — Aoife’s own; Marriage — Aoife’s own (multi-result)      |
| `4421567S`  | Death — Maeve Catherine Murphy née Byrne                        |
| `9087432P`  | Marriage — Cathal Brendan O’Sullivan (single, someone else)     |
| `1111111X`  | No record found (any cert type)                                 |
| `2222222X`  | Multiple failed attempts warning (1 attempt remaining)          |
| `0000000X`  | Service unavailable error                                       |

## Stack

- Vite + React 19 + TypeScript
- Tailwind v3.4 configured via `@ogcio/design-system-tailwind` `createTheme()`
- `@govie-ds/react` components, `@govie-ds/theme-govie` tokens
- `@ogcio/design-system-tokens` primitives
- `react-router-dom` for routing
- Vitest + Testing Library

## Getting started

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build (tsc -b && vite build)
npm test          # run the unit tests
```

## Routes

- `/` — debug start screen (dev-only, removed in production)
- `/birth` — birth certificate flow
- `/marriage` — marriage certificate flow
- `/death` — death certificate flow

## Project layout

```
src/
  components/    AppShell, CertLookup, ResultCard, MultiResultSelector
  data/          mockApi, scenarios (fixtures), content (per-cert copy)
  lib/           maskName, ppsn (validation)
  pages/         DebugStart, journey/(JourneyPage, StepConfirmation, StepSubmitted)
  state/         useLookup hook, journey state machine
  types.ts       CertType, CertRecord, LookupState, etc.
```

## Design & UX decisions

Rationales for the non-obvious product calls live in
[`docs/decisions/`](./docs/decisions/). These are short, dated docs you can
hand to a stakeholder before a meeting. Start with
[0001 — PPSN input pattern](./docs/decisions/0001-ppsn-input-pattern.md).

## Deployment

The repo is connected to Vercel. Pushes to `main` redeploy
https://ogcio-cert-lookup-component.vercel.app automatically; preview
URLs are generated for branch pushes. `vercel.json` rewrites all SPA
routes to `index.html` so deep links like `/birth?ppsn=…` work.

## Source design

[Figma: Life event POC Flows](https://www.figma.com/design/T4x8ATNV9xIf7HqekT3e65/Life-event--POC-Flows)
