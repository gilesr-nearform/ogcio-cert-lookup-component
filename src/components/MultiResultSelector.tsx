import type { AuthUser, MarriageRecord } from '../types';
import { ResultCard } from './ResultCard';

type Props = {
  records: MarriageRecord[];
  user: AuthUser;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const MAX_RECORDS = 3;

function byDateDesc(a: MarriageRecord, b: MarriageRecord): number {
  return parseDate(b.dateOfMarriage) - parseDate(a.dateOfMarriage);
}

function parseDate(s: string): number {
  const parsed = new Date(s);
  return isNaN(parsed.valueOf()) ? 0 : parsed.valueOf();
}

export function MultiResultSelector({
  records,
  user,
  selectedId,
  onSelect,
}: Props) {
  const ordered = [...records].sort(byDateDesc).slice(0, MAX_RECORDS);

  return (
    <fieldset className="flex flex-col gap-sm border-0 p-0 m-0">
      <legend className="sr-only">Select a marriage record</legend>
      {ordered.map((record) => (
        <ResultCard
          key={record.id}
          record={record}
          user={user}
          selectable
          checked={selectedId === record.id}
          onSelect={() => onSelect(record.id)}
        />
      ))}
    </fieldset>
  );
}
