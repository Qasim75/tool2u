/**
 * rateLimit.js
 * ----------------------------------------------------------------
 * Best-effort request throttling for POST /api/execute, keyed by
 * client IP, using a fixed-window counter kept in memory.
 *
 * IMPORTANT LIMITATION: serverless functions are stateless and
 * horizontally scaled — this in-memory counter is only shared across
 * requests that happen to land on the same warm instance. Under
 * real traffic (multiple concurrent instances, cold starts) this
 * will under-count and is NOT a substitute for a distributed limiter.
 * It still meaningfully blocks the common case (a single client
 * hammering the endpoint in a tight loop) and costs nothing to run.
 *
 * For production-grade, distributed rate limiting, replace this
 * with a shared store — Vercel KV, Upstash Redis, or similar — kept
 * behind the same `checkRateLimit()` function signature so the
 * handler doesn't need to change.
 */

const WINDOW_MS = Number(process.env.EXEC_RATE_LIMIT_WINDOW_MS || 60_000);
const MAX_REQUESTS_PER_WINDOW = Number(process.env.EXEC_RATE_LIMIT_MAX || 10);

const buckets = new Map(); // ip -> { count, windowStart }

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * @returns {{ limited: boolean, retryAfterSeconds: number, remaining: number }}
 */
export function checkRateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    buckets.set(ip, { count: 1, windowStart: now });
    // Opportunistic cleanup so the Map doesn't grow unbounded on a long-lived warm instance.
    if (buckets.size > 5000) {
      for (const [key, val] of buckets) {
        if (now - val.windowStart >= WINDOW_MS) buckets.delete(key);
      }
    }
    return { limited: false, retryAfterSeconds: 0, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  bucket.count += 1;
  const remaining = MAX_REQUESTS_PER_WINDOW - bucket.count;
  if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000);
    return { limited: true, retryAfterSeconds, remaining: 0 };
  }
  return { limited: false, retryAfterSeconds: 0, remaining };
}
