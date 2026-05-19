import type { CertRecord, CertType } from '../types';

export type JourneyStep = 'lookup' | 'payment' | 'confirmation' | 'submitted';

export type JourneyState = {
  certType: CertType;
  step: JourneyStep;
  selectedRecord: CertRecord | null;
  deliveryEmail: string;
  termsAccepted: boolean;
  referenceNumber: string | null;
};

export function makeInitialJourney(certType: CertType): JourneyState {
  return {
    certType,
    step: 'lookup',
    selectedRecord: null,
    deliveryEmail: '',
    termsAccepted: false,
    referenceNumber: null,
  };
}

export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `CL-${year}-${rand}`;
}
