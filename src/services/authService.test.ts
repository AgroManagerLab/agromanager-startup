import { determineProfileFromEmail } from './authService';

describe('authService - determineProfileFromEmail', () => {
  test('returns milkman when milkmanId present', () => {
    const result = determineProfileFromEmail('somebody@example.com', 'M-123');
    expect(result).toEqual({ profile: 'milkman', userId: 'M-123' });
  });

  test('returns admin when email starts with admin', () => {
    const result = determineProfileFromEmail('adminuser@coop.org');
    expect(result).toEqual({ profile: 'admin', userId: 'ADMIN' });
  });

  test('returns producer by default', () => {
    const result = determineProfileFromEmail('user@coop.org');
    expect(result).toEqual({ profile: 'producer', userId: 'P-014' });
  });
});
