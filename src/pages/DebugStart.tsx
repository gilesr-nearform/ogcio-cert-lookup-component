import { Link as RouterLink } from 'react-router-dom';
import { Button, Heading, Link, Paragraph } from '@govie-ds/react';
import {
  AUTHENTICATED_USER,
  EXAMPLE_PPSN,
  RATE_LIMITED_PPSN,
  SERVICE_UNAVAILABLE_PPSN,
} from '../data/scenarios';

const happyPaths = [
  {
    label: 'Birth certificate',
    description: `Empty form — try entering ${EXAMPLE_PPSN} (or Fiadh’s 7823641W) to see a result.`,
    href: '/birth',
  },
  {
    label: 'Marriage certificate',
    description: `Pre-filled as “Yourself” (Aoife) for the multi-result flow; switch to “Someone else” and try ${EXAMPLE_PPSN} for a single record.`,
    href: '/marriage',
  },
  {
    label: 'Death certificate',
    description: `Empty form — try ${EXAMPLE_PPSN} (or Maeve’s 4421567S) to see a result.`,
    href: '/death',
  },
];

const unhappyPaths = [
  {
    label: 'PPSN with no record (1111111X)',
    description: 'Returns the amber “We couldn’t find a matching certificate” panel.',
    href: `/birth?ppsn=1111111X&autosubmit=1`,
  },
  {
    label: `Multiple failed attempts (${RATE_LIMITED_PPSN})`,
    description: 'Returns the amber “Multiple failed attempts detected” warning with the “1 attempt remaining” copy.',
    href: `/birth?ppsn=${RATE_LIMITED_PPSN}&autosubmit=1`,
  },
  {
    label: `Service unavailable (${SERVICE_UNAVAILABLE_PPSN})`,
    description: 'Returns the red “We can’t check this right now” panel.',
    href: `/birth?ppsn=${SERVICE_UNAVAILABLE_PPSN}&autosubmit=1`,
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
          {AUTHENTICATED_USER.ppsn}). Pick a journey to start.{' '}
          <strong>{EXAMPLE_PPSN}</strong> is a working demo PPSN in any of the
          three flows.
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
        <Heading as="h2">Unhappy paths</Heading>
        <Paragraph>
          These auto-submit so you land directly in the failure state.
        </Paragraph>
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
