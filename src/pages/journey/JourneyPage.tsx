import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { CertRecord, CertType } from '../../types';
import { AUTHENTICATED_USER } from '../../data/scenarios';
import {
  makeInitialJourney,
  type JourneyState,
} from '../../state/journey';
import { AppShell } from '../../components/AppShell';
import { CertLookup } from '../../components/CertLookup';
import { StepConfirmation } from './StepConfirmation';
import { StepSubmitted } from './StepSubmitted';

const VALID_CERT_TYPES: CertType[] = ['birth', 'marriage', 'death'];

function isCertType(value: string | undefined): value is CertType {
  return !!value && (VALID_CERT_TYPES as string[]).includes(value);
}

export function JourneyPage() {
  const { certType: certTypeParam } = useParams<{ certType: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!isCertType(certTypeParam)) {
    return (
      <AppShell>
        <div>
          Unknown certificate type. <a href="/">Back to start</a>
        </div>
      </AppShell>
    );
  }

  return (
    <JourneyController
      certType={certTypeParam}
      initialPpsn={searchParams.get('ppsn') ?? undefined}
      autoSubmit={searchParams.get('autosubmit') === '1'}
      onExit={() => navigate('/')}
    />
  );
}

function JourneyController({
  certType,
  initialPpsn,
  autoSubmit,
  onExit,
}: {
  certType: CertType;
  initialPpsn?: string;
  autoSubmit?: boolean;
  onExit: () => void;
}) {
  const [journey, setJourney] = useState<JourneyState>(() =>
    makeInitialJourney(certType),
  );

  function handleLookupConfirm(record: CertRecord) {
    setJourney((prev) => ({
      ...prev,
      selectedRecord: record,
      step: 'confirmation',
    }));
  }

  function handleTermsChange(accepted: boolean) {
    setJourney((prev) => ({ ...prev, termsAccepted: accepted }));
  }

  function handleSubmit() {
    setJourney((prev) => ({
      ...prev,
      step: 'submitted',
    }));
  }

  function backTo(step: JourneyState['step']) {
    setJourney((prev) => ({ ...prev, step }));
  }

  if (journey.step === 'submitted') {
    return <StepSubmitted onHome={onExit} />;
  }

  if (journey.step === 'confirmation') {
    return (
      <AppShell>
        <StepConfirmation
          journey={journey}
          termsAccepted={journey.termsAccepted}
          onTermsChange={handleTermsChange}
          onBack={() => backTo('lookup')}
          onSubmit={handleSubmit}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <CertLookup
        certType={certType}
        user={AUTHENTICATED_USER}
        initialPpsn={initialPpsn}
        autoSubmit={autoSubmit}
        onConfirm={handleLookupConfirm}
        onBack={onExit}
      />
    </AppShell>
  );
}
