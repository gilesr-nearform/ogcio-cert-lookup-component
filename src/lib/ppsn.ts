const PPSN_PATTERN = /^\d{7}[A-Z]{1,2}$/;

export function normalisePpsn(value: string): string {
  return value.trim().toUpperCase();
}

export function isValidPpsnFormat(value: string): boolean {
  return PPSN_PATTERN.test(normalisePpsn(value));
}
