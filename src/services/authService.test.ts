import { normalizeEmail, pickAuthResult } from './authService';

describe('authService - normalizeEmail', () => {
  test('trims and lowercases', () => {
    expect(normalizeEmail('  Joao@Coop.BR  ')).toBe('joao@coop.br');
  });
});

describe('authService - pickAuthResult', () => {
  test('milkman takes priority', () => {
    expect(pickAuthResult('M-01', 'A-01', 'P-014')).toEqual({ profile: 'milkman', userId: 'M-01' });
  });

  test('admin when no milkman', () => {
    expect(pickAuthResult(undefined, 'A-01', 'P-014')).toEqual({ profile: 'admin', userId: 'A-01' });
  });

  test('producer when only producer matches', () => {
    expect(pickAuthResult(undefined, undefined, 'P-014')).toEqual({ profile: 'producer', userId: 'P-014' });
  });

  test('null when nothing matches', () => {
    expect(pickAuthResult(undefined, undefined, undefined)).toBeNull();
  });
});
