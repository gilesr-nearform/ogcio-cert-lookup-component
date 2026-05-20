export type CertType = 'birth' | 'marriage' | 'death';

export type AuthUser = {
  name: string;
  ppsn: string;
  email: string;
};

type CommonRecord = {
  id: string;
  ppsn: string;
  fullName: string;
};

export type BirthRecord = CommonRecord & {
  certType: 'birth';
  dateOfBirth: string;
  placeOfBirth: string;
};

export type MarriageRecord = CommonRecord & {
  certType: 'marriage';
  ordinal: 'First' | 'Second' | 'Third' | 'Fourth' | 'Fifth';
  spouseName: string;
  dateOfMarriage: string;
  placeOfMarriage: string;
  historical?: boolean;
};

export type DeathRecord = CommonRecord & {
  certType: 'death';
  dateOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
};

export type CertRecord = BirthRecord | MarriageRecord | DeathRecord;

export type LookupResponse =
  | { kind: 'found'; records: CertRecord[] }
  | { kind: 'not-found' }
  | { kind: 'error' };

export type LookupState =
  | { status: 'initial' }
  | { status: 'loading' }
  | { status: 'found'; records: CertRecord[] }
  | { status: 'not-found' }
  | { status: 'error' };

export type CertContent = {
  pageTitle: string;
  intro: string;
  ppsnHint: string;
  feeCents: number;
};
