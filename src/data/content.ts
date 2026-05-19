import type { CertContent, CertType } from '../types';

const SHARED_PPSN_HINT =
  'Please enter the Personal Public Service Number (PPSN) of the person whose certificate you are requesting. Example, 1234567T';

export const CERT_CONTENT: Record<CertType, CertContent> = {
  birth: {
    pageTitle: 'Order a birth certificate',
    intro:
      "Tell us whose certificate you need and we'll take it from there.",
    ppsnHint: SHARED_PPSN_HINT,
    feeCents: 2200,
  },
  marriage: {
    pageTitle: 'Order a marriage certificate',
    intro:
      "Tell us whose certificate you need and we'll take it from there.",
    ppsnHint: SHARED_PPSN_HINT,
    feeCents: 2200,
  },
  death: {
    pageTitle: 'Order a death certificate',
    intro:
      "Enter the PPSN of the deceased. We'll find their death certificate for you.",
    ppsnHint:
      'Please enter the Personal Public Service Number (PPSN) of the deceased person. Example, 1234567T',
    feeCents: 2200,
  },
};

export const CERT_TYPE_LABEL: Record<CertType, string> = {
  birth: 'Birth Certificate',
  marriage: 'Marriage Certificate',
  death: 'Death Certificate',
};
