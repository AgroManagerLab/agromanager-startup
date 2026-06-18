import { isValidEmail, requiredText, minLength, isPositiveNumber, parseVolume } from './validation';

describe('validation', () => {
  describe('isValidEmail', () => {
    test('accepts valid emails', () => {
      expect(isValidEmail('joao@coop.com.br')).toBe(true);
      expect(isValidEmail('  a@b.co  ')).toBe(true);
    });
    test('rejects invalid emails', () => {
      expect(isValidEmail('joao')).toBe(false);
      expect(isValidEmail('joao@coop')).toBe(false);
      expect(isValidEmail('a @b.co')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('requiredText', () => {
    test('true when non-empty', () => expect(requiredText(' x ')).toBe(true));
    test('false when blank', () => expect(requiredText('   ')).toBe(false));
  });

  describe('minLength', () => {
    test('respects length after trim', () => {
      expect(minLength('1234', 4)).toBe(true);
      expect(minLength(' 12 ', 4)).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    test('accepts positive numbers with comma or dot', () => {
      expect(isPositiveNumber('12')).toBe(true);
      expect(isPositiveNumber('12,5')).toBe(true);
      expect(isPositiveNumber('0.5')).toBe(true);
    });
    test('rejects zero, negative and non-numeric', () => {
      expect(isPositiveNumber('0')).toBe(false);
      expect(isPositiveNumber('-3')).toBe(false);
      expect(isPositiveNumber('abc')).toBe(false);
      expect(isPositiveNumber('')).toBe(false);
    });
  });

  describe('parseVolume', () => {
    test('parses valid volume', () => expect(parseVolume('12,5')).toBe(12.5));
    test('null for invalid', () => expect(parseVolume('x')).toBeNull());
  });
});
