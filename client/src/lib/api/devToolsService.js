import { apiClient } from '@/lib/api/apiClient';
import { executionApiClient } from '@/lib/api/executionApiClient';

/**
 * devToolsService
 * ----------------------------------------------------------------
 * Defines the request/response contract for backend-powered
 * developer & AI tools. Tool components should call these
 * functions, never `fetch`/`apiClient` directly, so the contract
 * stays consistent and swappable (e.g. if the AI provider or
 * sandbox runner changes).
 *
 * IMPORTANT: nothing here executes code in this app's own process.
 * `compileCode` (Phase 3) only ever calls our own `/api/execute`
 * serverless function, which forwards to an isolated sandboxed
 * execution provider — see `server/execution/judge0Client.js`.
 *
 * `compileCode` and `getExecutionLanguages` are live as of Phase 3.
 * `formatCode`, `detectErrors`, and every AI function below are
 * still placeholders: they resolve through `apiClient`, which fails
 * fast with a `service_unavailable` ApiError until a real backend
 * for those specific features is configured (`VITE_API_BASE_URL`).
 */

/**
 * @typedef {Object} CompileRequest
 * @property {string} language   internal language id, e.g. 'python' | 'javascript' | 'cpp'
 * @property {string} code
 * @property {string} [stdin]
 *
 * @typedef {Object} CompileResult
 * @property {'success'|'compile_error'|'runtime_error'|'timeout'|'provider_error'|'error'} status
 * @property {string} statusDescription
 * @property {string} stdout
 * @property {string} stderr
 * @property {string} compileOutput
 * @property {number|null} exitCode
 * @property {number|null} executionTimeMs
 * @property {number|null} memoryKb
 */

/**
 * Runs code through the live, sandboxed execution API introduced in
 * Phase 3 (`POST /api/execute` — see `/api/execute.js` and
 * `server/execution/judge0Client.js`). Nothing executes locally;
 * this only ever calls our own serverless function, which in turn
 * calls the isolated execution provider.
 *
 * @param {CompileRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<CompileResult>}
 */
export function compileCode(request, ctx) {
  return executionApiClient.post('/api/execute', request, ctx);
}

/** Lists the languages the execution API currently supports. */
export function getExecutionLanguages(ctx) {
  return executionApiClient.get('/api/languages', ctx);
}

/**
 * @typedef {Object} FormatRequest
 * @property {'html'|'css'|'javascript'|'sql'|'json'|'markdown'} language
 * @property {string} code
 * @property {'format'|'minify'} mode
 */
/** @param {FormatRequest} request @param {{signal?: AbortSignal}} [ctx] */
export function formatCode(request, ctx) {
  return apiClient.post('/v1/dev-tools/format', request, ctx);
}

/**
 * @typedef {Object} LintRequest
 * @property {string} language
 * @property {string} code
 * @typedef {Object} LintResult
 * @property {boolean} valid
 * @property {Array<{ line: number, column: number, message: string, severity: 'error'|'warning' }>} issues
 */
/** @param {LintRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<LintResult>} */
export function detectErrors(request, ctx) {
  return apiClient.post('/v1/dev-tools/lint', request, ctx);
}

/**
 * @typedef {Object} AIRequest
 * @property {string} language
 * @property {string} code
 * @property {string} [instructions]
 * @typedef {Object} AIResult
 * @property {string} summary
 * @property {Array<{ title: string, detail: string }>} [findings]
 */

/** @param {AIRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<AIResult>} */
export function explainCode(request, ctx) {
  return apiClient.post('/v1/ai-tools/explain', request, ctx);
}

/** @param {AIRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<AIResult>} */
export function detectBugs(request, ctx) {
  return apiClient.post('/v1/ai-tools/bug-detector', request, ctx);
}

/** @param {AIRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<AIResult>} */
export function reviewCode(request, ctx) {
  return apiClient.post('/v1/ai-tools/review', request, ctx);
}

/** @param {AIRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<AIResult>} */
export function optimizeCode(request, ctx) {
  return apiClient.post('/v1/ai-tools/optimize', request, ctx);
}

/** @param {AIRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<AIResult>} */
export function generateDocs(request, ctx) {
  return apiClient.post('/v1/ai-tools/generate-docs', request, ctx);
}

/** @param {AIRequest} request @param {{signal?: AbortSignal}} [ctx] @returns {Promise<AIResult>} */
export function generateTests(request, ctx) {
  return apiClient.post('/v1/ai-tools/generate-tests', request, ctx);
}

export const devToolsService = {
  compileCode,
  formatCode,
  detectErrors,
  explainCode,
  detectBugs,
  reviewCode,
  optimizeCode,
  generateDocs,
  generateTests,
};

export default devToolsService;
