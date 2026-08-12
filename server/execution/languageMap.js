/**
 * languageMap.js
 * ----------------------------------------------------------------
 * Maps our internal language ids (the same ids used by
 * `client/src/config/codeEditorLanguages.js`) to a pattern used to
 * find the right runtime from the execution provider's language
 * list — instead of hardcoding a numeric `language_id`.
 *
 * Why not hardcode IDs? Judge0's language IDs are NOT stable across
 * different deployments/versions of the service (self-hosted
 * instances, RapidAPI's hosted instance, and the public CE instance
 * have all been observed with different ID numbers for the same
 * language over time). Hardcoding a number risks silently executing
 * the wrong language — or erroring — the moment the provider updates.
 * Matching by name against the provider's own `/languages` endpoint
 * (see judge0Client.js) is slower by one cached network call but is
 * correct regardless of which Judge0 deployment is configured.
 *
 * `namePattern` is matched case-insensitively against each runtime's
 * `name` field (e.g. "Python (3.11.2)", "C++ (GCC 9.2.0)"). When
 * multiple runtimes match (older + newer compiler versions), the
 * one with the highest version number found in its name wins.
 */

export const LANGUAGE_MAP = {
  javascript: { label: 'JavaScript', namePattern: /^javascript|node\.?js/i, fileName: 'main.js' },
  python: { label: 'Python', namePattern: /^python\b(?!.*pypy)/i, fileName: 'main.py' },
  c: { label: 'C', namePattern: /^c\s*\(/i, fileName: 'main.c' },
  cpp: { label: 'C++', namePattern: /^c\+\+/i, fileName: 'main.cpp' },
  java: { label: 'Java', namePattern: /^java\b(?!script)/i, fileName: 'Main.java' },
  csharp: { label: 'C#', namePattern: /^c#/i, fileName: 'Main.cs' },
  go: { label: 'Go', namePattern: /^go\b/i, fileName: 'main.go' },
  rust: { label: 'Rust', namePattern: /^rust/i, fileName: 'main.rs' },
  php: { label: 'PHP', namePattern: /^php/i, fileName: 'main.php' },
  ruby: { label: 'Ruby', namePattern: /^ruby/i, fileName: 'main.rb' },
  kotlin: { label: 'Kotlin', namePattern: /^kotlin/i, fileName: 'main.kt' },
  dart: { label: 'Dart', namePattern: /^dart/i, fileName: 'main.dart' },
};

export const EXECUTABLE_LANGUAGE_IDS = Object.keys(LANGUAGE_MAP);

export function isKnownLanguage(id) {
  return Object.prototype.hasOwnProperty.call(LANGUAGE_MAP, id);
}

/** Extracts the first version-looking number sequence from a runtime name, for picking the newest match. */
function extractVersion(name) {
  const match = name.match(/(\d+(?:\.\d+){0,3})/);
  if (!match) return [0];
  return match[1].split('.').map(Number);
}

function compareVersions(a, b) {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/**
 * @param {string} internalId one of the LANGUAGE_MAP keys
 * @param {Array<{id: number, name: string}>} runtimes provider's language list
 * @returns {{id: number, name: string} | null}
 */
export function resolveRuntime(internalId, runtimes) {
  const entry = LANGUAGE_MAP[internalId];
  if (!entry) return null;
  const candidates = runtimes.filter((r) => entry.namePattern.test(r.name));
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => compareVersions(extractVersion(b.name), extractVersion(a.name)));
  return candidates[0];
}
