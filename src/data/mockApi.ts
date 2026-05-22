import type { CertType, LookupResponse } from '../types';
import { normalisePpsn } from '../lib/ppsn';
import {
  findFixture,
  RATE_LIMITED_PPSN,
  SERVICE_UNAVAILABLE_PPSN,
} from './scenarios';

const API_DELAY_MS = 800;

export async function lookupCertificate(
  certType: CertType,
  rawPpsn: string,
): Promise<LookupResponse> {
  const ppsn = normalisePpsn(rawPpsn);
  await new Promise((r) => setTimeout(r, API_DELAY_MS));

  if (ppsn === SERVICE_UNAVAILABLE_PPSN) {
    return { kind: 'error' };
  }
  if (ppsn === RATE_LIMITED_PPSN) {
    return { kind: 'rate-limited' };
  }

  const records = findFixture(certType, ppsn);
  if (records.length === 0) return { kind: 'not-found' };
  return { kind: 'found', records };
}
