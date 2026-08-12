/**
 * judge0Client.js
 * ----------------------------------------------------------------
 * The ONLY file that knows how to talk to Judge0. Everything else in
 * this backend (api/execute.js, validate.js) works with our own
 * normalized shape, never Judge0's. To switch execution providers
 * later (self-hosted Piston, Sphere Engine, a different Judge0
 * deployment, etc), this is the one file that needs to change.
 *
 * Configuration (environment variables, all optional):
 *   JUDGE0_API_URL    Base URL of the Judge0 instance.
 *                     Defaults to the public Judge0 CE instance.
 *   JUDGE0_API_KEY    RapidAPI key, if using RapidAPI-hosted Judge0.
 *   JUDGE0_API_HOST   RapidAPI host header, if using RapidAPI-hosted Judge0.
 *   JUDGE0_AUTH_TOKEN Self-hosted Judge0 `X-Auth-Token`, if AUTHN is enabled
 *                      on a self-hosted instance instead of RapidAPI.
 *
 * Nothing here trusts the caller for resource limits — cpu/memory/
 * time limits are fixed server-side constants (see EXECUTION_LIMITS
 * below), never taken from the request body.
 */

import { resolveRuntime, LANGUAGE_MAP } from './languageMap.js';
import { ApiError } from './errors.js';

const JUDGE0_API_URL = (process.env.JUDGE0_API_URL || 'https://ce.judge0.com').replace(/\/+$/, '');
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '';
const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || '';
const JUDGE0_AUTH_TOKEN = process.env.JUDGE0_AUTH_TOKEN || '';

/** Server-controlled resource limits. The client can never override these. */
export const EXECUTION_LIMITS = {
  cpuTimeLimitSeconds: Number(process.env.EXEC_CPU_TIME_LIMIT_SECONDS || 5),
  wallTimeLimitSeconds: Number(process.env.EXEC_WALL_TIME_LIMIT_SECONDS || 10),
  memoryLimitKb: Number(process.env.EXEC_MEMORY_LIMIT_KB || 128000), // 128 MB
  maxOutputSizeKb: Number(process.env.EXEC_MAX_OUTPUT_KB || 1024), // 1 MB stdout/stderr each
  providerRequestTimeoutMs: Number(process.env.EXEC_PROVIDER_TIMEOUT_MS || 20000),
};

function authHeaders() {
  const headers = {};
  if (JUDGE0_API_KEY) headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
  if (JUDGE0_API_HOST) headers['X-RapidAPI-Host'] = JUDGE0_API_HOST;
  if (JUDGE0_AUTH_TOKEN) headers['X-Auth-Token'] = JUDGE0_AUTH_TOKEN;
  return headers;
}

async function providerFetch(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EXECUTION_LIMITS.providerRequestTimeoutMs);
  try {
    const response = await fetch(`${JUDGE0_API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...authHeaders(), ...options.headers },
      signal: controller.signal,
    });
    return response;
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw new ApiError(504, 'provider_timeout', 'The execution provider took too long to respond.');
    }
    throw new ApiError(502, 'provider_unreachable', 'Could not reach the execution provider.');
  } finally {
    clearTimeout(timeout);
  }
}

// ---- Runtime list, cached in-memory for the lifetime of the serverless instance ----
let runtimesCache = null;
let runtimesCacheAt = 0;
const RUNTIMES_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getRuntimes() {
  const isFresh = runtimesCache && Date.now() - runtimesCacheAt < RUNTIMES_CACHE_TTL_MS;
  if (isFresh) return runtimesCache;

  const response = await providerFetch('/languages');
  if (!response.ok) {
    throw new ApiError(502, 'provider_error', `Execution provider returned an error listing languages (HTTP ${response.status}).`);
  }
  const runtimes = await response.json();
  runtimesCache = runtimes;
  runtimesCacheAt = Date.now();
  return runtimes;
}

/** Exposed for the /api/languages endpoint (debugging / future language-availability UI). */
export async function listAvailableRuntimes() {
  return getRuntimes();
}

function toBase64(str) {
  return Buffer.from(str ?? '', 'utf-8').toString('base64');
}

function fromBase64(str) {
  if (str == null) return '';
  return Buffer.from(str, 'base64').toString('utf-8');
}

function truncate(str, maxKb) {
  if (!str) return { text: str || '', truncated: false };
  const maxBytes = maxKb * 1024;
  const buf = Buffer.from(str, 'utf-8');
  if (buf.length <= maxBytes) return { text: str, truncated: false };
  return { text: buf.subarray(0, maxBytes).toString('utf-8') + '\n… (output truncated)', truncated: true };
}

/** Maps a Judge0 status.id to our own status vocabulary. */
function mapStatus(statusId) {
  switch (statusId) {
    case 3:
      return 'success';
    case 5:
      return 'timeout';
    case 6:
      return 'compile_error';
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return 'runtime_error';
    case 13:
    case 14:
      return 'provider_error';
    case 1:
    case 2:
      return 'timeout'; // shouldn't happen with wait=true, but handle defensively
    default:
      return 'error';
  }
}

/**
 * @param {{ language: string, code: string, stdin?: string }} request
 * @returns {Promise<{
 *   status: 'success'|'compile_error'|'runtime_error'|'timeout'|'provider_error'|'error',
 *   stdout: string, stderr: string, compileOutput: string,
 *   exitCode: number|null, executionTimeMs: number|null, memoryKb: number|null,
 *   statusDescription: string,
 * }>}
 */
export async function executeCode({ language, code, stdin = '' }) {
  const runtimes = await getRuntimes();
  const runtime = resolveRuntime(language, runtimes);
  if (!runtime) {
    throw new ApiError(503, 'language_unavailable', `The execution provider doesn't currently offer a runtime for "${language}".`);
  }

  const languageMapEntry = LANGUAGE_MAP[language];

  const submitResponse = await providerFetch('/submissions?base64_encoded=true&wait=true', {
    method: 'POST',
    body: JSON.stringify({
      language_id: runtime.id,
      source_code: toBase64(code),
      stdin: toBase64(stdin),
      // Server-controlled limits only — never sourced from the client request.
      cpu_time_limit: EXECUTION_LIMITS.cpuTimeLimitSeconds,
      wall_time_limit: EXECUTION_LIMITS.wallTimeLimitSeconds,
      memory_limit: EXECUTION_LIMITS.memoryLimitKb,
    }),
  });

  if (!submitResponse.ok) {
    const body = await submitResponse.text().catch(() => '');
    throw new ApiError(502, 'provider_error', `Execution provider rejected the request (HTTP ${submitResponse.status}).`, body?.slice(0, 500));
  }

  const submission = await submitResponse.json();
  const stdout = truncate(fromBase64(submission.stdout), EXECUTION_LIMITS.maxOutputSizeKb);
  const stderr = truncate(fromBase64(submission.stderr), EXECUTION_LIMITS.maxOutputSizeKb);
  const compileOutput = truncate(fromBase64(submission.compile_output), EXECUTION_LIMITS.maxOutputSizeKb);
  const message = fromBase64(submission.message);

  return {
    status: mapStatus(submission.status?.id),
    statusDescription: submission.status?.description || message || 'Unknown',
    stdout: stdout.text,
    stderr: stderr.text || message,
    compileOutput: compileOutput.text,
    exitCode: submission.exit_code ?? null,
    executionTimeMs: submission.time != null ? Math.round(Number(submission.time) * 1000) : null,
    memoryKb: submission.memory ?? null,
    runtime: { name: runtime.name, fileName: languageMapEntry?.fileName },
    truncated: stdout.truncated || stderr.truncated || compileOutput.truncated,
  };
}
