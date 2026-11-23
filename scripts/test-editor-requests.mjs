/**
 * test-editor-requests.mjs
 * Regression tests for the Online Code Editor's request lifecycle
 * (client/src/lib/requestRunner.js, client/src/lib/api/executionApiClient.js).
 * Plain Node, no framework — same style as the other scripts in /scripts.
 */
import assert from 'node:assert/strict';
import { createRequestRunner } from '../client/src/lib/requestRunner.js';

let passed = 0;
let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    console.log(`  \u2713 ${name}`);
    passed++;
  } catch (err) {
    console.error(`  \u2717 ${name}\n    ${err?.stack || err}`);
    failed++;
  }
}

function harness() {
  const state = { data: null, error: null, loading: false, dataWrites: 0 };
  const runner = createRequestRunner({
    onStart: () => { state.loading = true; state.error = null; },
    onSuccess: (r) => { state.data = r; state.dataWrites++; },
    onError: (e) => { state.error = e; },
    onSettled: () => { state.loading = false; },
    onCancel: () => { state.loading = false; },
  });
  // Mirrors the hook's reset(): cancel + clear.
  const reset = () => { runner.cancel(); state.data = null; state.error = null; state.loading = false; };
  return { state, runner, reset };
}

const deferred = () => { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; };
const tick = () => new Promise((r) => setTimeout(r, 0));

console.log('\nRunning editor request-lifecycle tests...\n');

await test('a normal run sets data and clears loading', async () => {
  const { state, runner } = harness();
  await runner.run(async () => 'ok');
  assert.equal(state.data, 'ok');
  assert.equal(state.loading, false);
});

await test('errors are normalized and clear loading', async () => {
  const { state, runner } = harness();
  await runner.run(async () => { throw Object.assign(new Error('boom'), { code: 'x', status: 500 }); });
  assert.deepEqual(state.error, { message: 'boom', status: 500, code: 'x' });
  assert.equal(state.loading, false);
});

await test('REGRESSION: starting run B while A is in flight keeps loading=true until B finishes', async () => {
  const { state, runner } = harness();
  const a = deferred(); const b = deferred();
  const pa = runner.run(() => a.promise);
  const pb = runner.run(() => b.promise);
  a.reject(Object.assign(new Error('Aborted'), { name: 'AbortError' }));
  await pa;
  assert.equal(state.loading, true, 'loading flag must stay on while B is running');
  b.resolve('B');
  await pb;
  assert.equal(state.data, 'B');
  assert.equal(state.loading, false);
});

await test('REGRESSION: a superseded run that ignores abort cannot overwrite newer data', async () => {
  const { state, runner } = harness();
  const a = deferred(); const b = deferred();
  const pa = runner.run(() => a.promise); // e.g. SQL runner: ignores the signal
  const pb = runner.run(() => b.promise);
  b.resolve('NEW');
  await pb;
  a.resolve('STALE');
  await pa;
  assert.equal(state.data, 'NEW');
});

await test('REGRESSION: Stop, then late result from the stopped run is discarded', async () => {
  const { state, runner } = harness();
  const a = deferred();
  const pa = runner.run(() => a.promise);
  assert.equal(runner.cancel(), true);
  assert.equal(state.loading, false);
  a.resolve('LATE');
  await pa;
  assert.equal(state.data, null);
  assert.equal(state.dataWrites, 0);
});

await test('REGRESSION: Clear/language-change (reset) during a run: late result does not reappear', async () => {
  const { state, runner, reset } = harness();
  const a = deferred();
  const pa = runner.run(() => a.promise);
  reset();
  a.resolve('OLD-LANGUAGE-OUTPUT');
  await pa;
  assert.equal(state.data, null);
  assert.equal(state.loading, false);
});

await test('cancel() aborts the signal handed to the request function', async () => {
  const { runner } = harness();
  let seen;
  const d = deferred();
  const p = runner.run((ctx) => { seen = ctx.signal; return d.promise; });
  runner.cancel();
  assert.equal(seen.aborted, true);
  d.resolve(1); await p;
});

await test('REGRESSION: AbortError on the CURRENT request (client timeout) surfaces as an error, not silence', async () => {
  const { state, runner } = harness();
  await runner.run(async () => { throw Object.assign(new Error('Aborted'), { name: 'AbortError' }); });
  assert.ok(state.error, 'error must be set');
  assert.equal(state.loading, false);
});

await test('run after a failed run works and clears the old error', async () => {
  const { state, runner } = harness();
  await runner.run(async () => { throw new Error('first failed'); });
  assert.ok(state.error);
  await runner.run(async () => 'second ok');
  assert.equal(state.error, null);
  assert.equal(state.data, 'second ok');
});

// ---- executionApiClient: client-side timeout vs user abort ----
globalThis.window = globalThis;
const { executionApiRequest } = await import('../client/src/lib/api/executionApiClient.js');
const hangingFetch = (_url, { signal }) => new Promise((_, reject) => {
  signal.addEventListener('abort', () => reject(Object.assign(new Error('The operation was aborted'), { name: 'AbortError' })));
});

await test('REGRESSION: executionApiRequest timeout throws a visible client_timeout error', async () => {
  globalThis.fetch = hangingFetch;
  await assert.rejects(
    () => executionApiRequest('/api/execute', { method: 'POST', body: { a: 1 }, timeoutMs: 30 }),
    (e) => e.code === 'client_timeout' && /timed out/i.test(e.message)
  );
});

await test('executionApiRequest: user abort still surfaces as AbortError (silent in UI)', async () => {
  globalThis.fetch = hangingFetch;
  const ctrl = new AbortController();
  const p = executionApiRequest('/api/execute', { method: 'POST', body: { a: 1 }, signal: ctrl.signal, timeoutMs: 5000 });
  await tick(); ctrl.abort();
  await assert.rejects(() => p, (e) => e.name === 'AbortError');
});

await test('executionApiRequest: non-JSON 200 (SPA fallback HTML) is a hard error', async () => {
  globalThis.fetch = async () => new Response('<html></html>', { status: 200, headers: { 'content-type': 'text/html' } });
  await assert.rejects(() => executionApiRequest('/api/execute', { method: 'POST', body: {} }), (e) => e.code === 'invalid_backend_response');
});

await test('executionApiRequest: structured server error code and message are preserved', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ error: { code: 'rate_limited', message: 'Slow down' } }), { status: 429, headers: { 'content-type': 'application/json' } });
  await assert.rejects(() => executionApiRequest('/api/execute', { method: 'POST', body: {} }), (e) => e.code === 'rate_limited' && e.status === 429 && e.message === 'Slow down');
});

// ---- Browser-only runners: html / css / json ----
const { runHtml, runCss, runJson, buildCssPreview } = await import('../client/src/lib/runners/previewRunner.js');
const { CODE_EDITOR_LANGUAGES } = await import('../client/src/config/codeEditorLanguages.js');
const { LANGUAGE_MAP } = await import('../server/execution/languageMap.js');

await test('html runner returns a preview with the exact source', () => {
  const r = runHtml({ code: '<h1>Hi</h1><script>document.title="x"</script>' });
  assert.equal(r.status, 'success');
  assert.equal(r.preview.html, '<h1>Hi</h1><script>document.title="x"</script>');
});

await test('css runner wraps CSS in a sample page and cannot break out of <style>', () => {
  const html = buildCssPreview('body{color:red}</style><script>alert(1)</script>');
  assert.ok(html.includes('body{color:red}'));
  assert.ok(!/<\/style><script>alert/i.test(html), 'a </style> in user CSS must be neutralised');
  assert.equal(runCss({ code: 'h1{color:red}' }).status, 'success');
});

await test('json runner: valid JSON is pretty-printed', () => {
  const r = runJson({ code: '{"a":1,"b":[1,2]}' });
  assert.equal(r.status, 'success');
  assert.equal(r.stdout, JSON.stringify({ a: 1, b: [1, 2] }, null, 2));
});

await test('json runner: invalid JSON reports an error (and line/column when the engine gives a position)', () => {
  const r = runJson({ code: '{\n  "a": 1,\n  "b": oops\n}' });
  assert.equal(r.status, 'runtime_error');
  assert.ok(r.stderr.length > 0);
});

await test('json runner: trailing comma and empty-ish input are rejected, not crashed', () => {
  assert.equal(runJson({ code: '{"a":1,}' }).status, 'runtime_error');
  assert.equal(runJson({ code: '   ' }).status, 'runtime_error');
});

const BROWSER_RUNNERS = new Set(['html', 'css', 'json', 'sql', 'python']);
await test('EVERY language in the dropdown is runnable, and has a real run target', () => {
  for (const l of CODE_EDITOR_LANGUAGES) {
    assert.equal(l.executable, true, `${l.id} should be executable`);
    assert.ok(BROWSER_RUNNERS.has(l.id) || l.id in LANGUAGE_MAP, `${l.id} has no browser runner and no backend mapping`);
  }
});

await test('html/css are browser-only: the backend must keep rejecting them', () => {
  assert.ok(!('html' in LANGUAGE_MAP) && !('css' in LANGUAGE_MAP) && !('json' in LANGUAGE_MAP));
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
