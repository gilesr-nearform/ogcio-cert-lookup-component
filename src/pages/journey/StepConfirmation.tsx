import type { ReactNode } from 'react';
import { Button, Heading, Link, Paragraph } from '@govie-ds/react';
import { AUTHENTICATED_USER } from '../../data/scenarios';
import { maskIfNotUser } from '../../lib/maskName';
import type { AuthUser, CertRecord, CertType } from '../../types';
import type { JourneyState } from '../../state/journey';

type Props = {
  journey: JourneyState;
  onBack: () => void;
  onSubmit: () => void;
};

type Row = { key: string; value: ReactNode };

const CARD_TITLE: Record<CertType, string> = {
  birth: 'Birth certificate details',
  marriage: 'Marriage certificate details',
  death: 'Death certificate details',
};

function nameParts(
  fullName: string,
  user: AuthUser,
): { first: string; last: string } {
  const masked = maskIfNotUser(fullName, user.name);
  const parts = masked.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return { first: '', last: '' };
  if (parts.length === 1) return { first: parts[0], last: '' };
  const last = parts[parts.length - 1];
  const first = parts.slice(0, -1).join(' ');
  return { first, last };
}

function rowsForRecord(record: CertRecord, user: AuthUser): Row[] {
  const { first, last } = nameParts(record.fullName, user);
  const base: Row[] = [
    { key: 'PPSN number', value: record.ppsn },
    { key: 'First name', value: first },
    { key: 'Last name', value: last },
  ];

  if (record.certType === 'birth') {
    return [
      ...base,
      { key: 'Date of birth', value: record.dateOfBirth },
      { key: 'Place of birth', value: record.placeOfBirth },
    ];
  }
  if (record.certType === 'marriage') {
    const spouse = nameParts(record.spouseName, user);
    return [
      ...base,
      { key: 'Spouse first name', value: spouse.first },
      { key: 'Spouse last name', value: spouse.last },
      { key: 'Date of marriage', value: record.dateOfMarriage },
      { key: 'Place of marriage', value: record.placeOfMarriage },
    ];
  }
  return [
    ...base,
    { key: 'Date of birth', value: record.dateOfBirth },
    { key: 'Date of death', value: record.dateOfDeath },
    { key: 'Place of death', value: record.placeOfDeath },
  ];
}

export function StepConfirmation({ journey, onBack, onSubmit }: Props) {
  const record = journey.selectedRecord;

  if (!record) {
    return (
      <div className="flex flex-col gap-md max-w-[704px]">
        <Heading as="h1">Certificate lookup</Heading>
        <Paragraph>
          No certificate selected. Please go back and try again.
        </Paragraph>
        <div>
          <Button variant="primary" onClick={onBack}>
            Back to start
          </Button>
        </div>
      </div>
    );
  }

  const rows: Row[] = [
    ...rowsForRecord(record, AUTHENTICATED_USER),
    { key: 'MessagingIE consent', value: 'Yes' },
    { key: 'Terms and conditions consent', value: 'Yes' },
  ];

  return (
    <div className="flex flex-col gap-2xl max-w-[960px]">
      <div className="flex flex-col gap-lg">
        <Heading as="h1">Certificate lookup</Heading>
        <hr className="border-0 border-t border-gray-200 w-full" />
        <div className="flex flex-col gap-sm">
          <Heading as="h2">Confirm certificate details</Heading>
          <Paragraph>
            Review your information before continuing to payment. After payment
            is received, a secure PDF will be sent via secure message within 3
            working days.
          </Paragraph>
        </div>
      </div>

      <div className="border border-gray-200 rounded-sm overflow-hidden">
        <div className="bg-gray-50 px-md py-md flex flex-col gap-sm border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-bold text-xl m-0">{CARD_TITLE[record.certType]}</h3>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Edit
          </Link>
        </div>
        {rows.map((row, i) => (
          <div
            key={row.key}
            className={`px-md py-sm flex flex-col gap-2xs bg-white sm:flex-row sm:gap-md ${
              i < rows.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="font-bold sm:flex-1 sm:basis-0">{row.key}</div>
            <div className="sm:flex-1 sm:basis-0 break-words">{row.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-md sm:gap-xl">
        <Button variant="flat" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}
