export function parseJsonSafely(rawText) {
  try {
    const data = JSON.parse(rawText);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

function normalizeToRows(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return [data];
  throw new Error('JSON must be an object or an array of objects to convert to CSV.');
}

function flattenValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function escapeCsvCell(value) {
  const needsQuoting = /[",\n\r]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuoting ? `"${escaped}"` : escaped;
}

/**
 * Converts parsed JSON (array of objects, or a single object) into a CSV string.
 * Column headers are the union of all keys across rows, preserving first-seen order.
 */
export function jsonToCsv(data) {
  const rows = normalizeToRows(data);
  if (rows.length === 0) return '';

  const headers = [];
  const headerSet = new Set();
  for (const row of rows) {
    if (row && typeof row === 'object' && !Array.isArray(row)) {
      for (const key of Object.keys(row)) {
        if (!headerSet.has(key)) {
          headerSet.add(key);
          headers.push(key);
        }
      }
    }
  }

  if (headers.length === 0) {
    // Array of primitives rather than objects
    const lines = ['value', ...rows.map((r) => escapeCsvCell(flattenValue(r)))];
    return lines.join('\r\n');
  }

  const headerLine = headers.map(escapeCsvCell).join(',');
  const dataLines = rows.map((row) =>
    headers.map((key) => escapeCsvCell(flattenValue(row?.[key]))).join(',')
  );

  return [headerLine, ...dataLines].join('\r\n');
}
