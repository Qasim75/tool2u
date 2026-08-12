export const QR_TYPES = [
  { id: 'url', label: 'URL' },
  { id: 'text', label: 'Text' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'wifi', label: 'WiFi' },
];

function escapeWifi(value = '') {
  // Escape characters with special meaning in the WIFI: URI scheme
  return value.replace(/([\\;,":])/g, '\\$1');
}

/**
 * Builds the raw string that gets encoded into the QR code
 * based on the selected type and current form field values.
 */
export function buildQrPayload(type, fields) {
  switch (type) {
    case 'url': {
      const url = fields.url?.trim();
      if (!url) return '';
      return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    }
    case 'text':
      return fields.text?.trim() || '';
    case 'phone': {
      const phone = fields.phone?.trim();
      return phone ? `tel:${phone.replace(/\s+/g, '')}` : '';
    }
    case 'email': {
      const email = fields.email?.trim();
      if (!email) return '';
      const params = new URLSearchParams();
      if (fields.subject) params.set('subject', fields.subject);
      if (fields.body) params.set('body', fields.body);
      const query = params.toString();
      return `mailto:${email}${query ? `?${query}` : ''}`;
    }
    case 'wifi': {
      const ssid = fields.ssid?.trim();
      if (!ssid) return '';
      const security = fields.security || 'WPA';
      const password = fields.password || '';
      const hidden = fields.hidden ? 'true' : 'false';
      if (security === 'nopass') {
        return `WIFI:T:nopass;S:${escapeWifi(ssid)};H:${hidden};;`;
      }
      return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(password)};H:${hidden};;`;
    }
    default:
      return '';
  }
}

export function validateQrFields(type, fields) {
  const errors = {};
  switch (type) {
    case 'url':
      if (!fields.url?.trim()) errors.url = 'Enter a URL';
      break;
    case 'text':
      if (!fields.text?.trim()) errors.text = 'Enter some text';
      break;
    case 'phone':
      if (!fields.phone?.trim()) errors.phone = 'Enter a phone number';
      else if (!/^[+\d\s-]{6,}$/.test(fields.phone.trim())) errors.phone = 'Enter a valid phone number';
      break;
    case 'email':
      if (!fields.email?.trim()) errors.email = 'Enter an email address';
      else if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errors.email = 'Enter a valid email address';
      break;
    case 'wifi':
      if (!fields.ssid?.trim()) errors.ssid = 'Enter the network name';
      if (fields.security !== 'nopass' && !fields.password) errors.password = 'Enter the password';
      break;
    default:
      break;
  }
  return errors;
}
