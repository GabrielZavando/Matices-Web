import { describe, it, expect } from 'vitest';
import { formatPhoneNumber, isPhoneNumberFormatValid } from './formValidation';

describe('formatPhoneNumber', () => {
  it('formats a +56 Chilean mobile number', () => {
    expect(formatPhoneNumber('+56912345678')).toBe('+56 9 1234 5678');
  });

  it('formats a local 9-digit number into 3-4-2 groups', () => {
    expect(formatPhoneNumber('912345678')).toBe('912 3456 78');
  });

  it('strips non-digit characters while preserving a leading plus', () => {
    expect(formatPhoneNumber('+56 (9) 1234-5678')).toBe('+56 9 1234 5678');
  });

  it('returns an empty string for empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });
});

describe('isPhoneNumberFormatValid', () => {
  it('accepts a formatted +56 number', () => {
    expect(isPhoneNumberFormatValid('+56 9 1234 5678')).toBe(true);
  });

  it('accepts a plain 9-digit number', () => {
    expect(isPhoneNumberFormatValid('912345678')).toBe(true);
  });

  it('rejects too short numbers', () => {
    expect(isPhoneNumberFormatValid('123')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isPhoneNumberFormatValid('')).toBe(false);
  });
});
