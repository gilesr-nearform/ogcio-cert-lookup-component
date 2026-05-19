import type { ReactNode } from 'react';
import type { AuthUser, CertRecord, MarriageRecord } from '../types';
import { maskIfNotUser } from '../lib/maskName';

type Props = {
  record: CertRecord;
  user: AuthUser;
  selectable?: boolean;
  selectionType?: 'radio' | 'checkbox';
  checked?: boolean;
  onSelect?: () => void;
  name?: string;
};

type CardContent = { title: string; lines: ReactNode[] };

function birthContent(record: Extract<CertRecord, { certType: 'birth' }>, user: AuthUser): CardContent {
  return {
    title: maskIfNotUser(record.fullName, user.name),
    lines: [`Born ${record.dateOfBirth}`, record.placeOfBirth],
  };
}

function deathContent(record: Extract<CertRecord, { certType: 'death' }>, user: AuthUser): CardContent {
  return {
    title: maskIfNotUser(record.fullName, user.name),
    lines: [
      `Born ${record.dateOfBirth}`,
      `Died ${record.dateOfDeath}`,
      record.placeOfDeath,
    ],
  };
}

function marriageContent(record: MarriageRecord, user: AuthUser): CardContent {
  const primaryIsUser =
    record.fullName.trim().toLowerCase() === user.name.trim().toLowerCase();
  const maskedSpouse = maskIfNotUser(record.spouseName, user.name);
  if (primaryIsUser) {
    return {
      title: `Married to ${maskedSpouse}`,
      lines: [record.dateOfMarriage, record.placeOfMarriage],
    };
  }
  return {
    title: maskIfNotUser(record.fullName, user.name),
    lines: [
      `Married to ${maskedSpouse}`,
      record.dateOfMarriage,
      record.placeOfMarriage,
    ],
  };
}

function getContent(record: CertRecord, user: AuthUser): CardContent {
  if (record.certType === 'birth') return birthContent(record, user);
  if (record.certType === 'death') return deathContent(record, user);
  return marriageContent(record, user);
}

export function ResultCard({
  record,
  user,
  selectable = false,
  selectionType = 'radio',
  checked = false,
  onSelect,
  name = 'record-choice',
}: Props) {
  const { title, lines } = getContent(record, user);
  const inputId = `card-${record.id}`;

  const card = (
    <div className="flex flex-col gap-xs flex-1">
      <strong className="text-lg">{title}</strong>
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </div>
  );

  if (!selectable) {
    return (
      <div className="flex items-start gap-md p-md border-2 border-gray-200 rounded-sm bg-white">
        {card}
      </div>
    );
  }

  return (
    <label
      htmlFor={inputId}
      className={`flex items-start gap-md p-md border-2 rounded-sm cursor-pointer bg-white ${
        checked ? 'border-black' : 'border-gray-200'
      }`}
    >
      <input
        type={selectionType}
        id={inputId}
        name={selectionType === 'radio' ? name : inputId}
        value={record.id}
        checked={checked}
        onChange={onSelect}
        className="mt-xs w-6 h-6 shrink-0 accent-black"
      />
      {card}
    </label>
  );
}
