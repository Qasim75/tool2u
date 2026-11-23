export const COUNTRY_CODES = [
  { code: '+92', label: 'Pakistan (+92)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+880', label: 'Bangladesh (+880)' },
];

/**
 * Builds a wa.me "click to chat" link from a country code, local number
 * and optional pre-filled message.
 */
export function buildWhatsAppLink(countryCode, phoneNumber, message) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const codeDigits = countryCode.replace(/\D/g, '');
  const fullNumber = `${codeDigits}${digitsOnly}`;
  const encodedMessage = message?.trim() ? `?text=${encodeURIComponent(message.trim())}` : '';
  return `https://wa.me/${fullNumber}${encodedMessage}`;
}

export function validateWhatsAppNumber(phoneNumber) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  if (!digitsOnly) return 'Enter a phone number';
  if (digitsOnly.length < 7 || digitsOnly.length > 12) return 'Enter a valid phone number';
  return null;
}
