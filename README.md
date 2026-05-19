# OGCIO Certificate Lookup Component

Prototype of the Irish government’s "Order a certificate" service — a
single-screen lookup for birth, marriage, and death certificates, built on the
gov.ie design system.

## Links

- **Repository:** https://github.com/gilesr-nearform/ogcio-cert-lookup-component
- **Live preview:** _(Vercel deployment pending — see Deployment below)_

## What’s in here

- **Step 1 lookup** with 6 states (initial, loading, single result, multi
  result, not found, service unavailable) driven by a mock API
- **Per-cert-type defaults** — Birth defaults to "Someone else", Marriage to
  "Yourself", Death hides the dropdown
- **Pre-populated PPSN** is masked with an eye-icon toggle
- **`maskName`** utility plus `maskIfNotUser` — the signed-in user’s own name
  passes through unmasked, everyone else is bullet-masked
- **Step 2 confirmation** of name + email + terms acceptance
- **PaymentsIE handoff** placeholder (full-screen dark page) standing in for
  the real payment integration
- **Debug start** at `/` with happy-path buttons and unhappy-path shortcuts

## Demo PPSNs

In any of the three flows you can enter these to see different responses:

| PPSN        | Behaviour                                                       |
|-------------|-----------------------------------------------------------------|
| `1234567T`  | Working demo record (single result) for **any** cert type       |
| `7823641W`  | Birth — Fiadh Rose Murphy (Aoife’s child)                       |
| `5612908T`  | Marriage — Aoife’s own (multi-result)                           |
| `4421567S`  | Death — Maeve Catherine Murphy née Byrne                        |
| `9087432P`  | Marriage — Cathal Brendan O’Sullivan (single, someone else)     |
| `1111111X`  | No record found (any cert type)                                 |
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

## Deployment

The local prototype builds to a static bundle (`npm run build` outputs to
`dist/`). To put a live preview behind the repo:

1. Connect the GitHub repo to Vercel (Dashboard → Import Project)
2. Vercel auto-detects Vite; no configuration needed
3. The live URL will be added to the top of this README once it’s connected

## Source design

[Figma: Life event POC Flows](https://www.figma.com/design/T4x8ATNV9xIf7HqekT3e65/Life-event--POC-Flows)
