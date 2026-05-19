import { describe, it, expect } from 'vitest';
import { maskName, maskIfNotUser } from './maskName';

describe('maskName', () => {
  it('masks the spec example "Fiadh Rose Murphy"', () => {
    expect(maskName('Fiadh Rose Murphy')).toBe('F•••• R••• Murphy');
  });

  it('masks a single given name + surname', () => {
    expect(maskName('Aoife Murphy')).toBe('A•••• Murphy');
  });

  it('masks four-part names', () => {
    expect(maskName('Maeve Catherine Murphy Byrne')).toBe(
      'M•••• C•••••••• M••••• Byrne',
    );
  });

  it('leaves single-character given names unchanged', () => {
    expect(maskName('J K Rowling')).toBe('J K Rowling');
  });

  it('leaves the surname unmasked', () => {
    const out = maskName('First Middle Murphy');
    expect(out.endsWith('Murphy')).toBe(true);
  });

  it('returns just the masked component when only one name is given', () => {
    expect(maskName('Mononym')).toBe('M••••••');
  });

  it('handles extra whitespace gracefully', () => {
    expect(maskName('  Aoife   Murphy  ')).toBe('A•••• Murphy');
  });

  it('returns empty string for empty input', () => {
    expect(maskName('')).toBe('');
    expect(maskName('   ')).toBe('');
  });

  it('preserves the length of each given name component in bullets', () => {
    const out = maskName('Ab Cde Fghi');
    expect(out).toBe('A• C•• Fghi');
  });
});

describe('maskIfNotUser', () => {
  it('leaves the user’s own name unmasked', () => {
    expect(maskIfNotUser('Aoife Murphy', 'Aoife Murphy')).toBe('Aoife Murphy');
  });

  it('is case-insensitive on the user match', () => {
    expect(maskIfNotUser('AOIFE MURPHY', 'aoife murphy')).toBe('AOIFE MURPHY');
  });

  it('masks anyone who is not the user', () => {
    expect(maskIfNotUser('Fiadh Rose Murphy', 'Aoife Murphy')).toBe(
      'F•••• R••• Murphy',
    );
  });

  it('masks spouse names even when surname matches', () => {
    expect(maskIfNotUser('John Patrick O’Brien', 'Aoife Murphy')).toBe(
      'J••• P•••••• O’Brien',
    );
  });
});
