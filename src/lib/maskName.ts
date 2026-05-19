const BULLET = '•';

export function maskName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '';
  if (parts.length === 1) return maskComponent(parts[0]);

  const surname = parts[parts.length - 1];
  const givenNames = parts.slice(0, -1).map(maskComponent);
  return [...givenNames, surname].join(' ');
}

export function maskIfNotUser(name: string, userName: string): string {
  if (sameName(name, userName)) return name;
  return maskName(name);
}

function sameName(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function maskComponent(name: string): string {
  if (name.length === 0) return '';
  if (name.length === 1) return name;
  return name[0] + BULLET.repeat(name.length - 1);
}
