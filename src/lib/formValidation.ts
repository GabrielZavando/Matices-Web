/**
 * Pure helpers for contact form field validation and formatting.
 * Extracted from contacto.astro so they can be unit-tested without a DOM.
 */

/**
 * Formats a raw phone input into a human-readable grouping.
 * - Keeps a leading "+" and groups Chilean (+56) numbers as "+56 9 1234 5678".
 * - Groups other numbers in chunks of 3/4/4/4.
 * Returns an empty string when there are no digits.
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const hasPlus = value.trim().startsWith('+');
  let formatted = '';

  if (digits.length > 0) {
    if (hasPlus) formatted += '+';

    if (hasPlus && digits.startsWith('56')) {
      const countryCode = digits.substring(0, 2);
      const mobilePrefix = digits.substring(2, 3);
      const part1 = digits.substring(3, 7);
      const part2 = digits.substring(7, 11);
      formatted += countryCode;
      if (mobilePrefix) formatted += ' ' + mobilePrefix;
      if (part1) formatted += ' ' + part1;
      if (part2) formatted += ' ' + part2;
    } else {
      const chunk1 = digits.substring(0, 3);
      const chunk2 = digits.substring(3, 7);
      const chunk3 = digits.substring(7, 11);
      const chunk4 = digits.substring(11, 15);
      formatted += chunk1;
      if (chunk2) formatted += ' ' + chunk2;
      if (chunk3) formatted += ' ' + chunk3;
      if (chunk4) formatted += ' ' + chunk4;
    }
  }

  return formatted;
}

/**
 * Returns true when the phone value is empty or matches a valid international
 * phone pattern (8 to 15 digits, optional leading "+").
 */
export function isPhoneNumberFormatValid(value: string): boolean {
  const stripped = value.replace(/\s+/g, '');
  const phoneRegex = /^\+?\d{8,15}$/;
  return phoneRegex.test(stripped);
}
