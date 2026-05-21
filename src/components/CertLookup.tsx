import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Details,
  FormField,
  Heading,
  InputCheckbox,
  InputText,
  Link,
  Paragraph,
  Spinner,
  Tag,
} from '@govie-ds/react';
import type {
  AuthUser,
  CertRecord,
  CertType,
  MarriageRecord,
} from '../types';
import { CERT_CONTENT } from '../data/content';
import { isValidPpsnFormat, normalisePpsn } from '../lib/ppsn';
import { useLookup } from '../state/useLookup';
import { ResultCard } from './ResultCard';
import { MultiResultSelector } from './MultiResultSelector';

type Props = {
  certType: CertType;
  user: AuthUser;
  initialPpsn?: string;
  autoSubmit?: boolean;
  onConfirm: (record: CertRecord) => void;
  onBack: () => void;
};

export function CertLookup({
  certType,
  user,
  initialPpsn,
  autoSubmit,
  onConfirm,
  onBack,
}: Props) {
  const content = CERT_CONTENT[certType];
  const showUseMyPpsnLink = certType !== 'death';

  const [ppsnValue, setPpsnValue] = useState<string>(() => initialPpsn ?? '');
  const [ppsnError, setPpsnError] = useState<string | null>(null);
  const [ppsnAutoPopulated, setPpsnAutoPopulated] = useState(false);
  const [ppsnRevealed, setPpsnRevealed] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [singleConfirmed, setSingleConfirmed] = useState(false);
  const [consented, setConsented] = useState(false);

  const ppsnInputRef = useRef<HTMLInputElement>(null);
  const { state, showLoadingIndicator, submittedPpsn, lookup, reset } =
    useLookup(certType);

  useEffect(() => {
    if (!autoSubmit || !initialPpsn) return;
    if (isValidPpsnFormat(initialPpsn)) {
      void lookup(initialPpsn);
    }
  }, [autoSubmit, initialPpsn, lookup]);

  const records: CertRecord[] = state.status === 'found' ? state.records : [];
  const isMultipleResult = records.length > 1;
  const selectedRecord: CertRecord | null = useMemo(() => {
    if (records.length === 0) return null;
    if (records.length === 1) return records[0];
    return records.find((r) => r.id === selectedRecordId) ?? null;
  }, [records, selectedRecordId]);

  const hasSelection = isMultipleResult
    ? selectedRecordId !== null
    : records.length === 1 && singleConfirmed;
  const consentVisible = hasSelection;
  const canProceed = hasSelection && consented;

  function useMyPpsn() {
    setPpsnValue(user.ppsn);
    setPpsnAutoPopulated(true);
    setPpsnRevealed(false);
    setPpsnError(null);
  }

  function handlePpsnChange(next: string) {
    if (ppsnAutoPopulated && next !== user.ppsn) {
      setPpsnAutoPopulated(false);
      setPpsnRevealed(false);
    }
    setPpsnValue(next);
    // If the user edits the PPSN after a result has come back, clear the
    // result so they're not staring at stale data while typing a new PPSN.
    if (state.status !== 'initial' && state.status !== 'loading') {
      reset();
      setSelectedRecordId(null);
      setSingleConfirmed(false);
      setConsented(false);
      setPpsnError(null);
    }
  }

  function handlePpsnBlur() {
    if (ppsnValue.trim() === '') {
      setPpsnError(null);
      return;
    }
    if (!isValidPpsnFormat(ppsnValue)) {
      setPpsnError(
        'Enter a PPSN in the correct format — 7 digits followed by 1 or 2 letters, for example 1234567T.',
      );
    } else {
      setPpsnError(null);
    }
  }

  function handleCheckAvailability() {
    if (!isValidPpsnFormat(ppsnValue)) {
      setPpsnError(
        'Enter a PPSN in the correct format — 7 digits followed by 1 or 2 letters, for example 1234567T.',
      );
      return;
    }
    setSelectedRecordId(null);
    setSingleConfirmed(false);
    setConsented(false);
    void lookup(normalisePpsn(ppsnValue));
  }

  function handleNext() {
    if (canProceed && selectedRecord) onConfirm(selectedRecord);
  }

  const isLoading = state.status === 'loading';
  const canSubmit =
    !isLoading && ppsnValue.trim().length > 0 && isValidPpsnFormat(ppsnValue);

  return (
    <div className="flex flex-col gap-2xl max-w-[704px]">
      <div className="flex flex-col gap-md">
        <Paragraph>Step 1 of 2</Paragraph>
        <Heading as="h1">{content.pageTitle}</Heading>
        <Paragraph>{content.intro}</Paragraph>
      </div>

      <div className="flex flex-col gap-xl w-full md:max-w-[459px]">
        <div className="flex flex-col gap-xs">
          <FormField
            label={{ text: 'PPSN' }}
            hint={{ text: content.ppsnHint }}
            error={ppsnError ? { text: ppsnError } : undefined}
          >
            <InputText
              ref={ppsnInputRef}
              value={
                ppsnAutoPopulated && !ppsnRevealed
                  ? '•'.repeat(ppsnValue.length)
                  : ppsnValue
              }
              onChange={(e) => handlePpsnChange(e.target.value)}
              onBlur={handlePpsnBlur}
              readOnly={ppsnAutoPopulated && !ppsnRevealed}
              disabled={isLoading}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              aria-describedby="ppsn-hint"
              inputActionButton={
                ppsnAutoPopulated
                  ? {
                      icon: ppsnRevealed ? 'visibility_off' : 'visibility',
                      onClick: () => setPpsnRevealed((v) => !v),
                      ariaLabel: ppsnRevealed ? 'Hide PPSN' : 'Show PPSN',
                    }
                  : undefined
              }
            />
          </FormField>
          {showUseMyPpsnLink && !isLoading && (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                useMyPpsn();
              }}
            >
              Use my own PPSN
            </Link>
          )}
        </div>

        {showLoadingIndicator ? (
          <div className="flex items-center gap-sm" aria-live="polite">
            <Spinner size="sm" inline />
            <span>Checking availability…</span>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-md sm:flex-row sm:items-center">
            <Button
              variant="primary"
              onClick={handleCheckAvailability}
              disabled={!canSubmit}
            >
              Continue
            </Button>
          </div>
        )}
      </div>

      {state.status === 'found' && (
        <div className="flex flex-col gap-lg">
          {isMultipleResult ? (
            <>
              <Alert variant="success" title={`${records.length} certificates found`}>
                Select the certificate you want to order to continue. If you
                can’t see the one you’re looking for, enter a different PPSN
                above and click Continue again.
              </Alert>
              <MultiResultSelector
                records={records as MarriageRecord[]}
                user={user}
                selectedId={selectedRecordId}
                onSelect={setSelectedRecordId}
              />
            </>
          ) : (
            <>
              <Alert variant="success" title="Certificate found">
                Review the certificate below and confirm to continue. If this
                isn’t the one you’re looking for, enter a different PPSN above
                and click Continue again.
              </Alert>
              <ResultCard
                record={records[0]}
                user={user}
                selectable
                selectionType="checkbox"
                checked={singleConfirmed}
                onSelect={() => setSingleConfirmed((v) => !v)}
              />
            </>
          )}
        </div>
      )}

      {state.status === 'not-found' && (
        <Alert
          variant="warning"
          title="We couldn’t find a matching certificate"
        >
          We couldn’t find a certificate registered to PPSN {submittedPpsn}.
          Check the details and try again. Older records may not yet be in the
          digital system — you can{' '}
          <a
            href="https://www.gov.ie/en/organisation/general-register-office/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            contact the General Register Office
          </a>{' '}
          to request them directly.
        </Alert>
      )}

      {state.status === 'error' && (
        <Alert variant="danger" title="We can’t check this right now">
          Something went wrong on our side. Please try again in a few minutes.
          If the problem keeps happening,{' '}
          <a href="#" className="underline">
            contact us
          </a>
          .
        </Alert>
      )}

      {consentVisible && (
        <fieldset className="flex flex-col gap-md border-0 p-0 m-0">
          <legend className="flex items-end gap-xs pb-md">
            <span className="font-bold text-lg">Consent</span>
            <Tag text="Required" type="default" />
          </legend>
          <div className="flex flex-col gap-md bg-gray-100 px-md py-lg">
            <InputCheckbox
              label="I agree to receive my certificate securely through MessagingIE."
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
            />
            <Details label="More about secure messages with MessagingIE">
              <div className="flex flex-col gap-sm">
                <p>
                  MessagingIE is the government’s secure messaging service. We
                  use it to deliver important communications about your
                  application.
                </p>
                <p>
                  <strong>What we’ll send:</strong> A notification when your
                  certificate is ready to download from your Life Events
                  Dashboard. If we can’t retrieve your certificate, we’ll send a
                  message explaining what happened and arrange a refund.
                </p>
                <p>
                  <strong>What it contains:</strong> A short notification with a
                  link to your Dashboard. The certificate itself is never sent
                  in the message — it stays in your secure Dashboard.
                </p>
                <p>
                  <strong>Cost:</strong> Free.
                </p>
                <p>
                  Receiving these messages is part of how this service works. To
                  order a certificate, you need to agree to receive them.
                </p>
              </div>
            </Details>
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-md sm:gap-xl">
        <Button variant="flat" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={!canProceed}>
          Next
        </Button>
      </div>
    </div>
  );
}
