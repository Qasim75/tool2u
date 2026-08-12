/**
 * errors.js
 * ----------------------------------------------------------------
 * Small, dependency-free error type + response helper shared by
 * every /api handler in this project. Keeps error responses
 * consistent: { error: { code, message, details? } }.
 */

export class ApiError extends Error {
  /**
   * @param {number} status  HTTP status code
   * @param {string} code    machine-readable error code (snake_case)
   * @param {string} message human-readable message, safe to show to the caller
   * @param {any} [details]
   */
  constructor(status, code, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function sendError(res, err) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: { code: err.code, message: err.message, details: err.details ?? undefined },
    });
    return;
  }
  // Never leak internal error details (stack traces, provider internals) to the client.
  console.error('[api] unexpected error:', err);
  res.status(500).json({
    error: { code: 'internal_error', message: 'Something went wrong while handling your request.' },
  });
}

export function sendJson(res, status, body) {
  res.status(status).json(body);
}
