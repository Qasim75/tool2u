/**
 * executionApiClient
 * ----------------------------------------------------------------
 * Fetch wrapper for the code-execution backend introduced in Phase
 * 3 (`/api/execute`, `/api/languages` — see the `/api` and `/server`
 * directories at the project root). Unlike `apiClient.js` (which
 * targets a *future*, separately-hosted backend for the AI tools and
 * requires `VITE_API_BASE_URL`), this one always calls same-origin
 * paths, because the execution API is a Vercel serverless function
 * deployed alongside this frontend — no base URL, no CORS, and the
 * provider's own API key never leaves the server (see
 * server/execution/judge0Client.js).
 */

const DEFAULT_TIMEOUT_MS = 20_000;

export class ExecutionApiError extends Error {
  constructor(message, { status = null, code = 'unknown_error', details = null } = {}) {
    super(message);
    this.name = 'ExecutionApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * @param {string} path e.g. '/api/execute'
 * @param {Object} [options]
 * @param {'GET'|'POST'} [options.method]
 * @param {Object} [options.body]
 * @param {AbortSignal} [options.signal]
 * @param {number} [options.timeoutMs]
 */
export async function executionApiRequest(path, { method = 'GET', body, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  const onExternalAbort = () => controller.abort();
  signal?.addEventListener('abort', onExternalAbort);

  try {
    const response = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    // A response is only trustworthy if it's actually JSON. If this app is
    // hosted somewhere that doesn't run the /api serverless functions (a
    // plain static host, a misconfigured rewrite, etc), a POST to
    // `/api/execute` commonly gets silently caught by the SPA's own
    // catch-all fallback and comes back as `index.html` with a 200 OK.
    // Without this check that looked like success with an empty payload —
    // the Run button would spin, then quietly show "No output yet" with no
    // error at all. Treat anything that isn't real JSON as a hard failure.
    const contentType = response.headers.get('content-type') || '';
    const looksLikeJson = contentType.includes('application/json');

    let payload = null;
    if (looksLikeJson) {
      try {
        payload = await response.json();
      } catch {
        // Declared JSON but failed to parse — fall through, handled below.
      }
    }

    if (!response.ok || !looksLikeJson || payload === null) {
      const err = payload?.error;
      const message =
        err?.message ||
        (looksLikeJson
          ? `Request failed with status ${response.status}`
          : "The execution backend didn't return a valid response. If this site isn't deployed somewhere that runs serverless functions (e.g. Vercel), or /api/execute isn't reachable, the Run button can't work yet.");
      throw new ExecutionApiError(message, {
        status: response.status,
        code: err?.code || (looksLikeJson ? 'request_failed' : 'invalid_backend_response'),
        details: err?.details ?? null,
      });
    }

    return payload;
  } catch (err) {
    if (err instanceof ExecutionApiError) throw err;
    if (err?.name === 'AbortError') throw err;
    throw new ExecutionApiError(err?.message || 'Network error. Please check your connection and try again.', {
      code: 'network_error',
    });
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener('abort', onExternalAbort);
  }
}

export const executionApiClient = {
  get: (path, options) => executionApiRequest(path, { ...options, method: 'GET' }),
  post: (path, body, options) => executionApiRequest(path, { ...options, method: 'POST', body }),
};

export default executionApiClient;
