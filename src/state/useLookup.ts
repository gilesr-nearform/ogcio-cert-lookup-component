import { useCallback, useRef, useState } from 'react';
import { lookupCertificate } from '../data/mockApi';
import type { CertType, LookupState } from '../types';

const LOADING_INDICATOR_DELAY_MS = 200;

export function useLookup(certType: CertType) {
  const [state, setState] = useState<LookupState>({ status: 'initial' });
  const [submittedPpsn, setSubmittedPpsn] = useState('');
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lookup = useCallback(
    async (ppsn: string) => {
      setSubmittedPpsn(ppsn);
      setState({ status: 'loading' });
      setShowLoadingIndicator(false);

      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = setTimeout(() => {
        setShowLoadingIndicator(true);
      }, LOADING_INDICATOR_DELAY_MS);

      const response = await lookupCertificate(certType, ppsn);

      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      setShowLoadingIndicator(false);

      if (response.kind === 'error') setState({ status: 'error' });
      else if (response.kind === 'rate-limited')
        setState({ status: 'rate-limited' });
      else if (response.kind === 'not-found') setState({ status: 'not-found' });
      else setState({ status: 'found', records: response.records });
    },
    [certType],
  );

  const reset = useCallback(() => {
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    setState({ status: 'initial' });
    setSubmittedPpsn('');
    setShowLoadingIndicator(false);
  }, []);

  return { state, showLoadingIndicator, submittedPpsn, lookup, reset };
}
