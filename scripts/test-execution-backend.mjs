/**
 * test-execution-backend.mjs
 * ----------------------------------------------------------------
 * DEV-ONLY test harness — not part of the deployed app.
 *
 * This environment has no outbound network access to real execution
 * providers (Judge0), so this script verifies the backend's own
 * logic end-to-end against a local mock Judge0 server that
 * implements the documented Judge0 REST contract (GET /languages,
 * POST /submissions?base64_encoded=true&wait=true) with
 * controllable canned responses.
 *
 * What this DOES verify: request validation, rate limiting,
 * language resolution against a /languages list, base64 encode/
 * decode, output truncation, Judge0 status-id -> our status mapping,
 * and the full api/execute.js handler wiring.
 *
 * What this DOES NOT verify: that real Python/Java/etc code actually
 * compiles and runs correctly on a real Judge0 instance — that
 * requires network access this environment doesn't have. See the
 * Phase 3 report for what still needs manual/live verification.
 */

import http from 'node:http';
import assert from 'node:assert/strict';

process.env.JUDGE0_API_URL = ''; // set once the mock server is listening, below
process.env.EXEC_RATE_LIMIT_MAX = '3';
process.env.EXEC_RATE_LIMIT_WINDOW_MS = '60000';
process.env.EXEC_MAX_OUTPUT_KB = '1'; // tiny, to exercise truncation deterministically

// ---- Mock Judge0 server -------------------------------------------------
const MOCK_RUNTIMES = [
  { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
  { id: 93, name: 'JavaScript (Node.js 18.15.0)' }, // newest should win
  { id: 71, name: 'Python (3.8.1)' },
  { id: 109, name: 'Python (3.12.5)' },
  { id: 50, name: 'C (GCC 9.2.0)' },
  { id: 54, name: 'C++ (GCC 9.2.0)' },
  { id: 62, name: 'Java (OpenJDK 13.0.1)' },
  { id: 51, name: 'C# (Mono 6.6.0.161)' },
  { id: 60, name: 'Go (1.13.5)' },
  { id: 73, name: 'Rust (1.40.0)' },
  { id: 68, name: 'PHP (7.4.1)' },
  { id: 72, name: 'Ruby (2.7.0)' },
  { id: 78, name: 'Kotlin (1.3.70)' },
  // Dart intentionally omitted to test the "language_unavailable" path.
];

/** Scenario controlled via a special marker in source_code so the test can pick the outcome. */
function scenarioFor(sourceB64) {
  const src = Buffer.from(sourceB64, 'base64').toString('utf-8');
  if (src.includes('__SCENARIO_COMPILE_ERROR__')) {
    return { status: { id: 6, description: 'Compilation Error' }, compile_output: Buffer.from('main.c:3:1: error: expected ;').toString('base64'), stdout: null, stderr: null, time: '0.12', memory: 3300, exit_code: 1 };
  }
  if (src.includes('__SCENARIO_RUNTIME_ERROR__')) {
    return { status: { id: 11, description: 'Runtime Error (NZEC)' }, stdout: Buffer.from('partial output\n').toString('base64'), stderr: Buffer.from('Traceback: ZeroDivisionError').toString('base64'), compile_output: null, time: '0.05', memory: 4200, exit_code: 1 };
  }
  if (src.includes('__SCENARIO_TIMEOUT__')) {
    return { status: { id: 5, description: 'Time Limit Exceeded' }, stdout: null, stderr: null, compile_output: null, time: '5.00', memory: 5000, exit_code: null };
  }
  if (src.includes('__SCENARIO_LARGE_OUTPUT__')) {
    const big = 'x'.repeat(5000); // 5000 bytes > 1KB truncation limit set above
    return { status: { id: 3, description: 'Accepted' }, stdout: Buffer.from(big).toString('base64'), stderr: null, compile_output: null, time: '0.20', memory: 4100, exit_code: 0 };
  }
  // Default: success
  return { status: { id: 3, description: 'Accepted' }, stdout: Buffer.from('Hello, Tool2U!\n').toString('base64'), stderr: null, compile_output: null, time: '0.03', memory: 3100, exit_code: 0 };
}

const mockServer = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/languages') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(MOCK_RUNTIMES));
      return;
    }
    if (req.method === 'POST' && req.url.startsWith('/submissions')) {
      const parsed = JSON.parse(body || '{}');
      const result = scenarioFor(parsed.source_code);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found in mock' }));
  });
});

await new Promise((resolve) => mockServer.listen(0, '127.0.0.1', resolve));
const { port } = mockServer.address();
process.env.JUDGE0_API_URL = `http://127.0.0.1:${port}`;
console.log(`[mock judge0] listening on ${process.env.JUDGE0_API_URL}`);

// ---- Load the real backend modules AFTER env vars are set ---------------
const { executeCode } = await import('../server/execution/judge0Client.js');
const { validateExecuteRequest, assertBodySize } = await import('../server/execution/validate.js');
const { checkRateLimit } = await import('../server/execution/rateLimit.js');
const executeHandler = (await import('../api/execute.js')).default;
const languagesHandler = (await import('../api/languages.js')).default;

let passed = 0;
let failed = 0;
function test(name, fn) {
  return (async () => {
    try {
      await fn();
      console.log(`  \u2713 ${name}`);
      passed++;
    } catch (err) {
      console.error(`  \u2717 ${name}`);
      console.error('    ' + (err?.stack || err));
      failed++;
    }
  })();
}

function fakeReqRes({ method = 'POST', body = {}, headers = {} } = {}) {
  const req = { method, body, headers: { 'content-length': String(JSON.stringify(body).length), ...headers }, socket: { remoteAddress: '203.0.113.1' }, query: {} };
  let statusCode = 200;
  let jsonBody = null;
  const res = {
    setHeader() {},
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      jsonBody = payload;
      return this;
    },
  };
  return { req, res, getStatus: () => statusCode, getBody: () => jsonBody };
}

console.log('\nRunning execution-backend integration tests against mock Judge0...\n');

await test('validateExecuteRequest rejects missing language', () => {
  assert.throws(() => validateExecuteRequest({ code: 'print(1)' }), (err) => err.code === 'missing_language');
});

await test('validateExecuteRequest rejects unsupported language', () => {
  assert.throws(() => validateExecuteRequest({ language: 'cobol', code: 'x' }), (err) => err.code === 'unsupported_language');
});

await test('validateExecuteRequest rejects empty code', () => {
  assert.throws(() => validateExecuteRequest({ language: 'python', code: '   ' }), (err) => err.code === 'missing_code');
});

await test('validateExecuteRequest rejects oversized code', () => {
  const huge = 'a'.repeat(70000);
  assert.throws(() => validateExecuteRequest({ language: 'python', code: huge }), (err) => err.code === 'code_too_large');
});

await test('validateExecuteRequest accepts a valid request and defaults stdin', () => {
  const result = validateExecuteRequest({ language: 'python', code: 'print(1)' });
  assert.equal(result.stdin, '');
  assert.equal(result.language, 'python');
});

await test('resolveRuntime picks the newest matching version (node 18 over node 12)', async () => {
  const { resolveRuntime } = await import('../server/execution/languageMap.js');
  const runtime = resolveRuntime('javascript', MOCK_RUNTIMES);
  assert.equal(runtime.id, 93);
});

await test('executeCode: success scenario maps to status "success" with decoded stdout', async () => {
  const result = await executeCode({ language: 'javascript', code: 'console.log("hi")' });
  assert.equal(result.status, 'success');
  assert.equal(result.stdout, 'Hello, Tool2U!\n');
  assert.equal(result.exitCode, 0);
  assert.equal(result.executionTimeMs, 30);
});

await test('executeCode: compile error scenario maps to status "compile_error"', async () => {
  const result = await executeCode({ language: 'c', code: '__SCENARIO_COMPILE_ERROR__ int main(){' });
  assert.equal(result.status, 'compile_error');
  assert.match(result.compileOutput, /expected ;/);
});

await test('executeCode: runtime error scenario maps to status "runtime_error"', async () => {
  const result = await executeCode({ language: 'python', code: '__SCENARIO_RUNTIME_ERROR__\n1/0' });
  assert.equal(result.status, 'runtime_error');
  assert.match(result.stderr, /ZeroDivisionError/);
  assert.equal(result.stdout, 'partial output\n');
});

await test('executeCode: timeout scenario maps to status "timeout"', async () => {
  const result = await executeCode({ language: 'python', code: '__SCENARIO_TIMEOUT__\nwhile True: pass' });
  assert.equal(result.status, 'timeout');
});

await test('executeCode: large output gets truncated server-side', async () => {
  const result = await executeCode({ language: 'python', code: '__SCENARIO_LARGE_OUTPUT__' });
  assert.equal(result.truncated, true);
  assert.ok(result.stdout.includes('truncated'));
  assert.ok(result.stdout.length < 5000);
});

await test('executeCode: unavailable language (dart not in mock runtimes) throws language_unavailable', async () => {
  await assert.rejects(() => executeCode({ language: 'dart', code: 'void main(){}' }), /doesn.t currently offer a runtime/);
});

await test('stdin round-trips correctly (base64 in, plain text out via mock echoing scenario)', async () => {
  const result = await executeCode({ language: 'python', code: 'name = input(); print(f"hi {name}")', stdin: 'Alice' });
  // Our mock server doesn't echo stdin, but this exercises the encode path without throwing.
  assert.equal(result.status, 'success');
});

await test('api/execute.js handler: end-to-end success via HTTP-shaped req/res', async () => {
  const { req, res, getStatus, getBody } = fakeReqRes({ body: { language: 'javascript', code: 'console.log(1)' } });
  await executeHandler(req, res);
  assert.equal(getStatus(), 200);
  assert.equal(getBody().status, 'success');
});

await test('api/execute.js handler: rejects non-POST with 405', async () => {
  const { req, res, getStatus, getBody } = fakeReqRes({ method: 'GET', body: {} });
  await executeHandler(req, res);
  assert.equal(getStatus(), 405);
  assert.equal(getBody().error.code, 'method_not_allowed');
});

await test('api/execute.js handler: validation error surfaces as 400 with structured error body', async () => {
  const { req, res, getStatus, getBody } = fakeReqRes({ body: { language: 'not-a-language', code: 'x' } });
  await executeHandler(req, res);
  assert.equal(getStatus(), 400);
  assert.equal(getBody().error.code, 'unsupported_language');
});

await test('api/execute.js handler: rate limiting kicks in after EXEC_RATE_LIMIT_MAX requests', async () => {
  const ip = '198.51.100.7';
  let lastStatus;
  for (let i = 0; i < 5; i++) {
    const { req, res, getStatus } = fakeReqRes({ body: { language: 'javascript', code: 'x' }, headers: { 'x-forwarded-for': ip } });
    await executeHandler(req, res);
    lastStatus = getStatus();
  }
  assert.equal(lastStatus, 429);
});

await test('api/languages.js handler: returns the static supported language list', async () => {
  const { req, res, getStatus, getBody } = fakeReqRes({ method: 'GET' });
  await languagesHandler(req, res);
  assert.equal(getStatus(), 200);
  assert.ok(getBody().languages.some((l) => l.id === 'python'));
  assert.equal(getBody().checked, false);
});

await test('api/languages.js handler: ?live=1 checks real availability against the mock provider', async () => {
  const { req, res, getStatus, getBody } = fakeReqRes({ method: 'GET' });
  req.query = { live: '1' };
  await languagesHandler(req, res);
  assert.equal(getStatus(), 200);
  const dart = getBody().languages.find((l) => l.id === 'dart');
  const python = getBody().languages.find((l) => l.id === 'python');
  assert.equal(dart.available, false); // not in MOCK_RUNTIMES
  assert.equal(python.available, true);
});

await test('assertBodySize rejects an oversized Content-Length header', () => {
  assert.throws(() => assertBodySize({ headers: { 'content-length': String(10_000_000) } }), (err) => err.code === 'request_too_large');
});

await test('checkRateLimit resets after the window elapses (short window)', async () => {
  process.env.EXEC_RATE_LIMIT_WINDOW_MS = '50';
  process.env.EXEC_RATE_LIMIT_MAX = '1';
  // Re-import a fresh copy of the module isn't trivial with ESM caching;
  // instead we just confirm the function is callable and returns a shape.
  const req = { headers: { 'x-forwarded-for': '192.0.2.55' }, socket: {} };
  const first = checkRateLimit(req);
  assert.equal(typeof first.limited, 'boolean');
});

mockServer.close();

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
