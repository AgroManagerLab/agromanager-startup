import { determineProfileFromCredentials } from './authService';

describe('authService - determineProfileFromCredentials', () => {
  test('returns milkman when milkmanId present', () => {
    const result = determineProfileFromCredentials('somebody@example.com', 'wrong-password', 'M-123');
    expect(result).toEqual({ profile: 'milkman', userId: 'M-123' });
  });

  test('returns admin when email starts with admin and password is valid', () => {
    const result = determineProfileFromCredentials('adminuser@coop.org', 'milkroute');
    expect(result).toEqual({ profile: 'admin', userId: 'ADMIN' });
  });

  test('returns producer when demo producer credentials are valid', () => {
    const result = determineProfileFromCredentials('joao@coopvaleleite.coop.br', 'milkroute');
    expect(result).toEqual({ profile: 'producer', userId: 'P-014' });
  });

  test('rejects admin when password is invalid', () => {
    const result = determineProfileFromCredentials('adminuser@coop.org', 'wrong-password');
    expect(result).toBeNull();
  });

  test('rejects unknown producer email', () => {
    const result = determineProfileFromCredentials('user@coop.org', 'milkroute');
    expect(result).toBeNull();
  });
});
