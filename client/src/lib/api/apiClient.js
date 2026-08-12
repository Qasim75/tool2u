/**
 * apiClient
 * ----------------------------------------------------------------
 * Thin, framework-free fetch wrapper for talking to a future
 * Tool2U backend (the code execution/compile sandbox and the
 * AI developer tools). Tool2U is currently a 100% static,
 * client-only site — no backend exists yet, and nothing in the
 * current app calls this module.
 *
 * When a backend is introduced (Phase 2+), it should:
 *   1. Live behind its own service, never accept raw code to `eval`/`Function()`.
 *   2. Run any code execution in an isolated, resource-limited sandbox
 *      (container/VM), not inside the Node/API process itself.
 *   3. Rate-limit and validate/size-cap all input server-side.
 *
 * Until `VITE_API_BASE_URL` is configured, every request rejects
 * fast with a clear `service_unavailable` error instead of silently
 * hitting a relative URL — this keeps the client safe to ship with
 * no backend at all, which is the current state of the project.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const DEFAULT_TIMEOUT_MS = 20_000;

export class ApiError extends Error {
  constructor(message, { status = null, code = 'unknown_error', details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isBackendConfigured() {
  return Boolean(BASE_URL);
}

/**
 * @param {string} path e.g. '/v1/dev-tools/format'
 * @param {Object} [options]
 * @param {'GET'|'POST'|'PUT'|'DELETE'} [options.method]
 * @param {Object} [options.body]
 * @param {AbortSignal} [options.signal]
 * @param {number} [options.timeoutMs]
 */
export async function apiRequest(path, { method = 'GET', body, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!isBackendConfigured()) {
    throw new ApiError(
      'This tool needs a backend service that is not configured yet. Set VITE_API_BASE_URL to enable it.',
      { code: 'service_unavailable' }
    );
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  // Allow the caller's own AbortSignal (e.g. from useApiRequest) to also cancel us.
  const onExternalAbort = () => controller.abort();
  signal?.addEventListener('abort', onExternalAbort);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    let payload = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        payload = await response.json();
      } catch {
        // Declared JSON but failed to parse — payload stays null, handled below.
      }
    }

    if (!response.ok || payload === null) {
      throw new ApiError(payload?.message || `Request failed with status ${response.status}`, {
        status: response.status,
        code: payload?.code || 'request_failed',
        details: payload?.details ?? null,
      });
    }

    return payload;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err?.name === 'AbortError') throw err;
    throw new ApiError(err?.message || 'Network error. Please check your connection and try again.', {
      code: 'network_error',
    });
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener('abort', onExternalAbort);
  }
}

export const apiClient = {
  get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
  isBackendConfigured,
};

export default apiClient;
