import { Link as RouterLink } from 'react-router-dom';
import { Button, Heading, Link, Paragraph } from '@govie-ds/react';
import {
  AUTHENTICATED_USER,
  SERVICE_UNAVAILABLE_PPSN,
  SOMEONE_ELSE_MARRIAGE_PPSN,
} from '../data/scenarios';

const happyPaths = [
  {
    label: 'Birth certificate',
    description: 'Aoife requesting her child Fiadh’s birth cert',
    href: '/birth',
  },
  {
    label: 'Marriage certificate',
    description: 'Aoife requesting her own marriage cert (multi-result)',
    href: '/marriage',
  },
  {
    label: 'Death certificate',
    description: 'Aoife requesting her deceased mother’s death cert',
    href: '/death',
  },
];

const unhappyPaths = [
  {
    label: 'No record found',
    description: 'Birth lookup with a PPSN that has no record',
    href: `/birth?ppsn=1111111X&autosubmit=1`,
  },
  {
    label: 'Service unavailable',
    description: 'Lookup hits the error response',
    href: `/birth?ppsn=${SERVICE_UNAVAILABLE_PPSN}&autosubmit=1`,
  },
  {
    label: 'Marriage — Yourself (multi-result)',
    description: 'Aoife’s own PPSN, 3 visible + 2 historical records',
    href: `/marriage?ppsn=${AUTHENTICATED_USER.ppsn}&autosubmit=1`,
  },
  {
    label: 'Marriage — Someone else (single)',
    description: 'A different PPSN, one marriage record',
    href: `/marriage?ppsn=${SOMEONE_ELSE_MARRIAGE_PPSN}&autosubmit=1`,
  },
  {
    label: 'Birth — Someone else (single)',
    description: 'Fiadh’s PPSN, auto-submitted',
    href: `/birth?ppsn=7823641W&autosubmit=1`,
  },
  {
    label: 'Birth — Yourself (single)',
    description: 'Aoife’s own birth record',
    href: `/birth?ppsn=${AUTHENTICATED_USER.ppsn}&autosubmit=1`,
  },
  {
    label: 'Death — Maeve (single)',
    description: 'Maeve’s PPSN, auto-submitted',
    href: `/death?ppsn=4421567S&autosubmit=1`,
  },
];

export function DebugStart() {
  return (
    <div className="flex flex-col gap-2xl max-w-[704px]">
      <div className="flex flex-col gap-md">
        <Paragraph>Prototype debug start (dev only)</Paragraph>
        <Heading as="h1">Order a certificate</Heading>
        <Paragraph>
          Signed in as <strong>{AUTHENTICATED_USER.name}</strong> (PPSN{' '}
          {AUTHENTICATED_USER.ppsn}). Pick a journey to start.
        </Paragraph>
      </div>

      <section className="flex flex-col gap-lg">
        <Heading as="h2">Start a journey</Heading>
        <div className="flex flex-col gap-md">
          {happyPaths.map((p) => (
            <div key={p.href} className="flex flex-col gap-xs">
              <RouterLink to={p.href}>
                <Button>{p.label}</Button>
              </RouterLink>
              <span className="text-color-muted">{p.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-lg">
        <Heading as="h2">Unhappy paths (QA shortcuts)</Heading>
        <div className="flex flex-col gap-sm">
          {unhappyPaths.map((p) => (
            <div key={p.label} className="flex flex-col gap-2xs">
              <Link href={p.href}>{p.label}</Link>
              <span className="text-color-muted">{p.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-md">
        <Heading as="h2">Reset</Heading>
        <Paragraph>
          State is held in memory only — reload the page or click below to
          reset.
        </Paragraph>
        <Button
          variant="secondary"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Reset state
        </Button>
      </section>
    </div>
  );
}
