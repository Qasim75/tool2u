/**
 * GET /api/languages
 * ----------------------------------------------------------------
 * Returns the languages this deployment can execute. The frontend
 * doesn't need this to function (the Run button is gated by
 * `executable: true` in client/src/config/codeEditorLanguages.js),
 * but it's a useful, provider-agnostic health/debug endpoint:
 * `?live=1` actually checks the configured execution provider is
 * reachable and can resolve every language, without ever exposing
 * provider URLs, keys, or numeric language IDs to the caller.
 */

import { LANGUAGE_MAP, resolveRuntime } from '../server/execution/languageMap.js';
import { listAvailableRuntimes } from '../server/execution/judge0Client.js';
import { ApiError, sendError, sendJson } from '../server/execution/errors.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      throw new ApiError(405, 'method_not_allowed', 'Use GET to list languages.');
    }

    const languages = Object.entries(LANGUAGE_MAP).map(([id, meta]) => ({ id, label: meta.label }));

    if (req.query?.live !== '1') {
      sendJson(res, 200, { languages, checked: false });
      return;
    }

    const runtimes = await listAvailableRuntimes();
    const withAvailability = languages.map(({ id, label }) => ({
      id,
      label,
      available: Boolean(resolveRuntime(id, runtimes)),
    }));

    sendJson(res, 200, { languages: withAvailability, checked: true });
  } catch (err) {
    sendError(res, err);
  }
}
