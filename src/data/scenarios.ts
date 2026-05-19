import type {
  AuthUser,
  BirthRecord,
  CertRecord,
  CertType,
  DeathRecord,
  MarriageRecord,
} from '../types';

export const AUTHENTICATED_USER: AuthUser = {
  name: 'Aoife Murphy',
  ppsn: '5612908T',
  email: 'aoife.murphy@example.ie',
};

export const SERVICE_UNAVAILABLE_PPSN = '0000000X';

const aoifeChildBirth: BirthRecord = {
  id: 'b-fiadh-2026',
  certType: 'birth',
  ppsn: '7823641W',
  fullName: 'Fiadh Rose Murphy',
  dateOfBirth: '5 March 2026',
  placeOfBirth: 'University Hospital Galway',
};

const aoifeOwnBirth: BirthRecord = {
  id: 'b-aoife-1986',
  certType: 'birth',
  ppsn: '5612908T',
  fullName: 'Aoife Murphy',
  dateOfBirth: '22 July 1986',
  placeOfBirth: 'St. Finbarr’s Hospital, Cork',
};

const someoneElseMarriage: MarriageRecord = {
  id: 'm-doyle-2014',
  certType: 'marriage',
  ppsn: '9087432P',
  fullName: 'Cathal Brendan O’Sullivan',
  ordinal: 'First',
  spouseName: 'Niamh Maria Quinn',
  dateOfMarriage: '17 June 2014',
  placeOfMarriage: 'Limerick',
};

export const EXAMPLE_PPSN = '1234567T';

const exampleBirth: BirthRecord = {
  id: 'b-example-1234567T',
  certType: 'birth',
  ppsn: EXAMPLE_PPSN,
  fullName: 'Cillian James Mitchell',
  dateOfBirth: '18 March 2025',
  placeOfBirth: 'Cork University Maternity Hospital',
};

const exampleMarriage: MarriageRecord = {
  id: 'm-example-1234567T',
  certType: 'marriage',
  ppsn: EXAMPLE_PPSN,
  fullName: 'Aine Bernadette Doherty',
  ordinal: 'First',
  spouseName: 'Liam Joseph Carroll',
  dateOfMarriage: '12 September 2018',
  placeOfMarriage: 'Galway',
};

const exampleDeath: DeathRecord = {
  id: 'd-example-1234567T',
  certType: 'death',
  ppsn: EXAMPLE_PPSN,
  fullName: 'Patrick Connor Walsh',
  dateOfBirth: '4 May 1942',
  dateOfDeath: '17 March 2024',
  placeOfDeath: 'Mater Misericordiae University Hospital, Dublin',
};

const aoifeMarriages: MarriageRecord[] = [
  {
    id: 'm-obrien-2008',
    certType: 'marriage',
    ppsn: '5612908T',
    fullName: 'Aoife Murphy',
    ordinal: 'First',
    spouseName: 'John Patrick O’Brien',
    dateOfMarriage: '12 June 2008',
    placeOfMarriage: 'Galway',
  },
  {
    id: 'm-hennessy-2015',
    certType: 'marriage',
    ppsn: '5612908T',
    fullName: 'Aoife Murphy',
    ordinal: 'Second',
    spouseName: 'Michael James Hennessy',
    dateOfMarriage: '24 September 2015',
    placeOfMarriage: 'Cork',
  },
  {
    id: 'm-walsh-2022',
    certType: 'marriage',
    ppsn: '5612908T',
    fullName: 'Aoife Murphy',
    ordinal: 'Third',
    spouseName: 'David Conor Walsh',
    dateOfMarriage: '8 May 2022',
    placeOfMarriage: 'Dublin',
  },
];

const maeveDeath: DeathRecord = {
  id: 'd-maeve-2024',
  certType: 'death',
  ppsn: '4421567S',
  fullName: 'Maeve Catherine Murphy née Byrne',
  dateOfBirth: '17 November 1948',
  dateOfDeath: '3 January 2024',
  placeOfDeath: 'Galway University Hospital',
};

type Fixture = {
  matches: (certType: CertType, ppsn: string) => boolean;
  records: CertRecord[];
};

const FIXTURES: Fixture[] = [
  {
    matches: (certType, ppsn) => certType === 'birth' && ppsn === '7823641W',
    records: [aoifeChildBirth],
  },
  {
    matches: (certType, ppsn) =>
      certType === 'birth' && ppsn === AUTHENTICATED_USER.ppsn,
    records: [aoifeOwnBirth],
  },
  {
    matches: (certType, ppsn) => certType === 'birth' && ppsn === EXAMPLE_PPSN,
    records: [exampleBirth],
  },
  {
    matches: (certType, ppsn) =>
      certType === 'marriage' && ppsn === AUTHENTICATED_USER.ppsn,
    records: aoifeMarriages,
  },
  {
    matches: (certType, ppsn) =>
      certType === 'marriage' && ppsn === someoneElseMarriage.ppsn,
    records: [someoneElseMarriage],
  },
  {
    matches: (certType, ppsn) =>
      certType === 'marriage' && ppsn === EXAMPLE_PPSN,
    records: [exampleMarriage],
  },
  {
    matches: (certType, ppsn) => certType === 'death' && ppsn === '4421567S',
    records: [maeveDeath],
  },
  {
    matches: (certType, ppsn) => certType === 'death' && ppsn === EXAMPLE_PPSN,
    records: [exampleDeath],
  },
];

export const SOMEONE_ELSE_MARRIAGE_PPSN = someoneElseMarriage.ppsn;

export function findFixture(certType: CertType, ppsn: string): CertRecord[] {
  for (const fixture of FIXTURES) {
    if (fixture.matches(certType, ppsn)) return fixture.records;
  }
  return [];
}
