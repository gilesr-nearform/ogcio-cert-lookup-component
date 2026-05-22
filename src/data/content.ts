import type { CertContent, CertType } from '../types';

const SHARED_INTRO =
  'Search for a certificate using a Personal Public Service Number (PPSN).';
const SHARED_HINT = 'For example, 1234567T';

export const CERT_CONTENT: Record<CertType, CertContent> = {
  birth: {
    pageTitle: 'Order a birth certificate',
    subheading:
      'Enter PPSN of the person whose certificate you are requesting.',
    intro: SHARED_INTRO,
    ppsnHint: SHARED_HINT,
    feeCents: 2200,
  },
  marriage: {
    pageTitle: 'Order a marriage certificate',
    subheading:
      'Enter PPSN of the person whose certificate you are requesting.',
    intro: SHARED_INTRO,
    ppsnHint: SHARED_HINT,
    feeCents: 2200,
  },
  death: {
    pageTitle: 'Order a death certificate',
    subheading: 'Enter the PPSN of the deceased.',
    intro: SHARED_INTRO,
    ppsnHint: SHARED_HINT,
    feeCents: 2200,
  },
};

export const CERT_TYPE_LABEL: Record<CertType, string> = {
  birth: 'Birth Certificate',
  marriage: 'Marriage Certificate',
  death: 'Death Certificate',
};
