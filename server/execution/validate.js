/**
 * validate.js
 * ----------------------------------------------------------------
 * All request validation for POST /api/execute lives here — kept
 * separate from the handler so the rules are easy to review and
 * adjust in one place. Every limit is configurable via env vars so
 * they can be tuned without a code change.
 */

import { isKnownLanguage, EXECUTABLE_LANGUAGE_IDS } from './languageMap.js';
import { ApiError } from './errors.js';

export const REQUEST_LIMITS = {
  maxCodeLength: Number(process.env.EXEC_MAX_CODE_LENGTH || 65536), // 64k chars
  maxStdinLength: Number(process.env.EXEC_MAX_STDIN_LENGTH || 8192), // 8k chars
  maxBodyBytes: Number(process.env.EXEC_MAX_BODY_BYTES || 200000), // 200 KB, well under Vercel's 4.5MB hard cap
};

/**
 * @param {any} body parsed JSON request body
 * @returns {{ language: string, code: string, stdin: string }}
 * @throws {ApiError} on any validation failure
 */
export function validateExecuteRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new ApiError(400, 'invalid_request', 'Request body must be a JSON object.');
  }

  const { language, code, stdin } = body;

  if (typeof language !== 'string' || !language.trim()) {
    throw new ApiError(400, 'missing_language', 'Field "language" is required.');
  }
  if (!isKnownLanguage(language)) {
    throw new ApiError(
      400,
      'unsupported_language',
      `"${language}" isn't a supported execution language. Supported: ${EXECUTABLE_LANGUAGE_IDS.join(', ')}.`
    );
  }

  if (typeof code !== 'string' || !code.trim()) {
    throw new ApiError(400, 'missing_code', 'Field "code" is required and cannot be empty.');
  }
  if (code.length > REQUEST_LIMITS.maxCodeLength) {
    throw new ApiError(
      413,
      'code_too_large',
      `Code exceeds the ${REQUEST_LIMITS.maxCodeLength.toLocaleString()} character limit.`
    );
  }

  let safeStdin = '';
  if (stdin != null) {
    if (typeof stdin !== 'string') {
      throw new ApiError(400, 'invalid_stdin', 'Field "stdin" must be a string.');
    }
    if (stdin.length > REQUEST_LIMITS.maxStdinLength) {
      throw new ApiError(
        413,
        'stdin_too_large',
        `Input exceeds the ${REQUEST_LIMITS.maxStdinLength.toLocaleString()} character limit.`
      );
    }
    safeStdin = stdin;
  }

  return { language, code, stdin: safeStdin };
}

/** Rejects oversized request bodies before we even look at the JSON. */
export function assertBodySize(req) {
  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > REQUEST_LIMITS.maxBodyBytes) {
    throw new ApiError(
      413,
      'request_too_large',
      `Request body exceeds the ${(REQUEST_LIMITS.maxBodyBytes / 1000).toFixed(0)} KB limit.`
    );
  }
}
