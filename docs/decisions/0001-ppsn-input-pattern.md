# 0001 — PPSN input pattern: one empty field, no defaults, optional "Use my own PPSN" link

**Status:** Accepted
**Date:** 2026-05-20
**Decision-makers:** Giles Routledge (Nearform), with research input from the prototype team

## TL;DR

We removed the "Who is this certificate for?" dropdown / selector entirely. The
PPSN field starts empty for every cert type. Birth and Marriage show a small
"Use my own PPSN" link below the field that one-clicks the signed-in user's
PPSN into the input. Death has no link. Nothing is pre-selected; nothing is
pre-filled by default.

## Why we made this change

### What we had

Earlier iterations of the prototype tried several patterns:

1. A `<Select>` dropdown labelled "Who is this certificate for?" with
   per-cert-type defaults (Birth → "Someone else"; Marriage → "Yourself").
2. The dropdown replaced by a single inline link ("Order a birth
   certificate for someone else" / "…for myself instead"), with Birth and
   Marriage both defaulting to **"Yourself" + a pre-filled, masked PPSN**.

Both patterns set a default for a two-state choice. That turned out to
conflict with three things:

### 1. GOV.UK Design System explicitly says don't pre-select

The [Radios](https://design-system.service.gov.uk/components/radios/),
[Checkboxes](https://design-system.service.gov.uk/components/checkboxes/),
and [Select](https://design-system.service.gov.uk/components/select/)
components in the GOV.UK Design System all say (verbatim):

> "Do not pre-select radio options as this makes it more likely that users
> will submit the form without thinking about their answer."

The same guidance applies to checkboxes and selects. Pre-selection causes
rubber-stamping — users blow through the question without considering it.

In our flow this matters because a parent ordering their **child's**
birth cert could sleepwalk through a default of "Yourself" and pay €22
for the wrong cert.

### 2. The real UK and Irish certificate-ordering services don't ask the question

Neither service asks "are you ordering for yourself or someone else":

- The [UK GRO certificate ordering service](https://www.gro.gov.uk/gro/content/certificates/)
  just asks for details about the **subject** of the certificate (name,
  date, place of the event).
- The [Irish HSE order-a-certificate service](https://www2.hse.ie/services/births-deaths-and-marriages/order/)
  works the same way — email-based form, anyone can order any cert, you
  provide details about the subject, not yourself.

The "for me / for someone else" framing is a category error. A certificate
is always *for* its subject — the person born / married / deceased.
The requester is a separate role, and the law in both jurisdictions
doesn't constrain who the requester can be.

### 3. NN/g's bar for defaults isn't met

Nielsen Norman Group's
[The Power of Defaults](https://www.nngroup.com/articles/the-power-of-defaults/)
allows pre-filled values, **but only when ~90% of users would pick that
value**. Our own product research doesn't claim 90% for any cert type:

| Cert type | Dominant case | Hits the 90% bar? |
|-----------|---------------|-------------------|
| Birth     | Parents requesting child's cert (>50%) | No |
| Marriage  | Citizens requesting own cert (likely high but unverified) | Maybe |
| Death     | Always for the deceased | n/a — no choice |

Defaulting "Yourself" for Birth specifically is wrong on the data.

## What we chose

**Pattern: empty PPSN field, optional "Use my own PPSN" quick-fill link.**

```
PPSN
Enter the PPSN of the person whose certificate you need.
Example, 1234567T
┌──────────────────────────┐
│                          │   ← empty, editable, focused on load
└──────────────────────────┘
Use my own PPSN              ← link (Birth and Marriage only)

[Continue]
```

- Field starts empty for every cert type
- Field is editable (not read-only)
- No eye-toggle masking
- Click "Use my own PPSN" → field populates with the signed-in user's
  PPSN, still editable, no masking
- Link stays visible after click so users can re-populate if they edited
- Death has no link (the question doesn't apply; no plausible "use my
  own" case)

## How this beats the alternatives

| Option | GOV.UK aligned? | Friction for typical case | Risk of rubber-stamping |
|--------|-----------------|---------------------------|--------------------------|
| Dropdown / radios + default | ❌ | Low | High |
| Inline link + default ("Yourself" pre-filled) | ❌ | Low | High |
| Radios on a separate page, no default | ✅ | Extra page everyone pays | Low |
| Inline radios, no default | ✅ | Forces choice every time | Low |
| **Empty field + "Use my own PPSN" link (chosen)** | **✅** | **One click for self-cert** | **Low** |

## Consequences

### What we accept

- Birth's typical user (a parent) types their child's PPSN with no
  helper. That's the same as the current Irish HSE service today —
  no regression in real terms.
- We lose the implicit "trust signal" of seeing your own PPSN
  pre-filled. The "Use my own PPSN" link is the explicit signal
  instead, and the signed-in chip in the header (when we add it) will
  carry the rest.
- The eye-toggle masking pattern is gone. Since the user actively
  populates the field (via typing or the link), the privacy concern
  is much weaker. Worth user research if shoulder-surfing turns out
  to be a real concern.

### What we gain

- A pattern that fully matches GOV.UK Design System guidance — easier
  to defend in accessibility review and easier for new team members
  to recognise.
- Death no longer needs a special-case "this is the exception" rule.
  The same field is used everywhere; the link just doesn't apply to
  Death.
- Simpler code: no `LookupRequester` state machine, no `ppsnReadOnly`
  toggle, no eye-icon button wiring, no per-cert-type link copy.

### Open items to revisit with user research

- Does the "Use my own PPSN" link discover well, or do self-cert users
  miss it and type their PPSN by hand? (A11y point too — link order
  vs. field tab order.)
- Should the link also pre-fill the PPSN when the user is requesting
  cert-of-their-own-child (sibling/spouse PPSN auto-suggest)? Not for
  v1, but a "useful helper" candidate later.
- For Death specifically: do users ever lookup their own pre-arranged
  death cert? Vanishingly rare per Irish stats, but worth a sentence
  in the research plan.

## Sources

- [Radios – GOV.UK Design System](https://design-system.service.gov.uk/components/radios/)
- [Select – GOV.UK Design System](https://design-system.service.gov.uk/components/select/)
- [Checkboxes – GOV.UK Design System](https://design-system.service.gov.uk/components/checkboxes/)
- [Question pages – GOV.UK Design System](https://design-system.service.gov.uk/patterns/question-pages/)
- [Designing good questions – GOV.UK Service Manual](https://www.gov.uk/service-manual/design/designing-good-questions)
- [Order a birth, death, marriage or civil partnership certificate – GOV.UK](https://www.gov.uk/order-copy-birth-death-marriage-certificate)
- [General Register Office certificate ordering service](https://www.gro.gov.uk/gro/content/certificates/)
- [Order a certificate – HSE Ireland](https://www2.hse.ie/services/births-deaths-and-marriages/order/)
- [Get a passport for your child – GOV.UK](https://www.gov.uk/get-a-child-passport)
- ['Apply' service pattern – MOJ Design System](https://design-patterns.service.justice.gov.uk/service-patterns/apply/)
- [The Power of Defaults – NN/g](https://www.nngroup.com/articles/the-power-of-defaults/)
- [Website Forms Usability: Top 10 Recommendations – NN/g](https://www.nngroup.com/articles/web-form-design/)
