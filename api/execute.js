/**
 * POST /api/execute
 * ----------------------------------------------------------------
 * Frontend -> this endpoint -> Judge0 (sandboxed provider) -> result -> frontend.
 *
 * SECURITY: this function NEVER executes the submitted code itself.
 * No eval, no Function(), no child_process, no filesystem access to
 * the submitted code. It only validates the request, forwards it to
 * an isolated third-party sandbox (Judge0, running code inside
 * Docker + Isolate — see server/execution/judge0Client.js), and
 * relays back a normalized result. Resource limits (CPU, memory,
 * time) are fixed server-side constants; the client cannot raise them.
 */

import { validateExecuteRequest, assertBodySize } from '../server/execution/validate.js';
import { checkRateLimit } from '../server/execution/rateLimit.js';
import { executeCode } from '../server/execution/judge0Client.js';
import { ApiError, sendError, sendJson } from '../server/execution/errors.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      throw new ApiError(405, 'method_not_allowed', 'Use POST to execute code.');
    }

    assertBodySize(req);

    const rate = checkRateLimit(req);
    res.setHeader('X-RateLimit-Remaining', String(Math.max(rate.remaining, 0)));
    if (rate.limited) {
      res.setHeader('Retry-After', String(rate.retryAfterSeconds));
      throw new ApiError(429, 'rate_limited', `Too many execution requests. Try again in ${rate.retryAfterSeconds}s.`);
    }

    const { language, code, stdin } = validateExecuteRequest(req.body);

    const result = await executeCode({ language, code, stdin });

    sendJson(res, 200, result);
  } catch (err) {
    sendError(res, err);
  }
}
