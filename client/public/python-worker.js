/* eslint-disable no-restricted-globals */
/**
 * python-worker.js
 * ----------------------------------------------------------------
 * Runs real CPython (compiled to WebAssembly via Pyodide) inside a
 * Web Worker, entirely in the visitor's browser:
 *   - the page never freezes (even on `while True:`) — the main
 *     thread can terminate this worker at any time (Stop / timeout)
 *   - supports input() through the "Program input" box
 *   - pandas, numpy, scipy, matplotlib (no GUI), scikit-learn, etc.
 *     are downloaded automatically the first time a script imports them
 *   - the standard library, including sqlite3, is available
 *
 * Messages in:   { type: 'warmup' } | { type: 'run', id, code, stdin }
 * Messages out:  { type: 'ready' } | { type: 'load_error', id?, message }
 *                { type: 'started', id } | { type: 'result', id, ... }
 */
const PYODIDE_VERSION = '0.26.4';
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// Pyodide's event loop re-raises things like SystemExit as uncaught worker
// errors. We already report those ourselves, so stop them from bubbling up.
self.addEventListener('error', (e) => e.preventDefault());
self.addEventListener('unhandledrejection', (e) => e.preventDefault());

let pyodidePromise = null;

function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      importScripts(`${INDEX_URL}pyodide.js`);
      const py = await self.loadPyodide({ indexURL: INDEX_URL });
      return py;
    })().catch((err) => {
      pyodidePromise = null; // allow a retry on the next run
      throw err;
    });
  }
  return pyodidePromise;
}

/** Removes Pyodide-internal frames from a traceback and renames <exec> to main.py. */
function cleanTraceback(text) {
  const lines = String(text).split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isInternal = /^\s*File "(?:\/lib\/python|\/home\/pyodide|\/_pyodide|\/lib\/pyodide)/.test(line) && /_pyodide|pyodide\/|python3\d+\.zip\/(?:_pyodide|pyodide)/.test(line);
    if (isInternal) {
      // also drop the source line that follows a File ... line
      if (lines[i + 1] && /^\s{4}\S/.test(lines[i + 1]) && !/^\s*File /.test(lines[i + 1])) i++;
      continue;
    }
    out.push(line.replace(/File "<exec>"/, 'File "main.py"'));
  }
  return out.join('\n').trim();
}

self.onmessage = async (event) => {
  const { type, id, code, stdin } = event.data || {};

  if (type === 'warmup') {
    try {
      await getPyodide();
      self.postMessage({ type: 'ready' });
    } catch (err) {
      self.postMessage({ type: 'load_error', message: String(err?.message || err) });
    }
    return;
  }

  if (type !== 'run') return;

  let py;
  try {
    py = await getPyodide();
  } catch (err) {
    self.postMessage({ type: 'load_error', id, message: String(err?.message || err) });
    return;
  }

  self.postMessage({ type: 'started', id });

  let stdout = '';
  let stderr = '';
  const started = performance.now();

  const inputLines = String(stdin ?? '').split('\n');
  if (inputLines.length && inputLines[inputLines.length - 1] === '') inputLines.pop();
  py.setStdin({ stdin: () => (inputLines.length ? inputLines.shift() : null) });
  py.setStdout({ batched: (s) => { stdout += s + '\n'; } });
  py.setStderr({ batched: (s) => { stderr += s + '\n'; } });

  let ok = true;
  let exitCode = 0;
  const globals = py.globals.get('dict')();
  try {
    globals.set('__name__', '__main__');
    try {
      // Auto-install packages the script imports (numpy, pandas, ...).
      await py.loadPackagesFromImports(code);
    } catch (_) {
      /* a missing package will surface as a normal ImportError below */
    }
    await py.runPythonAsync(code, { globals });
  } catch (err) {
    const msg = String(err?.message || err);
    const exit = msg.match(/SystemExit:?\s*(\d*)\s*$/);
    if (exit) {
      exitCode = exit[1] === '' ? 0 : Number(exit[1]);
      ok = exitCode === 0;
    } else {
      ok = false;
      exitCode = 1;
      stderr += cleanTraceback(msg) + '\n';
    }
  } finally {
    try { py.runPython('import sys\nsys.stdout.flush()\nsys.stderr.flush()'); } catch (_) { /* ignore */ }
    try { globals.destroy(); } catch (_) { /* ignore */ }
  }

  self.postMessage({
    type: 'result',
    id,
    ok,
    exitCode,
    stdout,
    stderr: stderr.trimEnd(),
    executionTimeMs: Math.round(performance.now() - started),
  });
};
