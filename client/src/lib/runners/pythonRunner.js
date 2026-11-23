/**
 * pythonRunner.js
 * ----------------------------------------------------------------
 * Main-thread side of the in-browser Python runtime. Talks to
 * /public/python-worker.js (Pyodide = CPython compiled to WASM).
 *
 * - Python runs in a Web Worker, so an infinite loop can never freeze
 *   the page: Stop / the timeout simply terminates the worker.
 * - If the runtime can't be loaded (offline, CDN blocked) this throws
 *   an error with `code: 'python_runtime_unavailable'` so the caller
 *   can fall back to the server-side execution API.
 */

const LOAD_TIMEOUT_MS = 120_000; // first run downloads ~10 MB of runtime + packages
const RUN_TIMEOUT_MS = 30_000;

let worker = null;
let warmed = false;

export function isPythonWarm() {
  return warmed;
}

function createWorker() {
  const w = new Worker(`${import.meta.env.BASE_URL || '/'}python-worker.js`);
  w.addEventListener('message', (e) => {
    if (e.data?.type === 'ready') warmed = true;
  });
  return w;
}

function getWorker() {
  if (!worker) worker = createWorker();
  return worker;
}

function killWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
    warmed = false;
  }
}

/** Starts downloading the Python runtime in the background (call when the user picks Python). */
export function warmUpPython() {
  if (warmed) return;
  try {
    getWorker().postMessage({ type: 'warmup' });
  } catch {
    /* workers unsupported — run() will report it */
  }
}

function abortError() {
  const err = new Error('Aborted');
  err.name = 'AbortError';
  return err;
}

function unavailable(message) {
  const err = new Error(message || 'The in-browser Python runtime could not be loaded.');
  err.code = 'python_runtime_unavailable';
  return err;
}

/**
 * @param {{ code: string, stdin?: string }} request
 * @param {{ signal?: AbortSignal }} [ctx]
 */
export function runPython({ code, stdin = '' }, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError());
    if (typeof Worker === 'undefined') return reject(unavailable('Web Workers are not supported in this browser.'));

    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    let w;
    try {
      w = getWorker();
    } catch (err) {
      return reject(unavailable(err?.message));
    }

    let timer = setTimeout(() => finish(() => {
      killWorker();
      reject(unavailable('Timed out while loading the Python runtime.'));
    }), LOAD_TIMEOUT_MS);
    let settled = false;
    let started = false;

    const cleanup = () => {
      clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      w.removeEventListener('error', onError);
      signal?.removeEventListener('abort', onAbort);
    };
    const finish = (fn) => {
      if (settled) return;
      settled = true;
      cleanup();
      fn();
    };

    function onMessage(e) {
      const msg = e.data || {};
      if (msg.type === 'load_error' && (msg.id === id || msg.id === undefined)) {
        return finish(() => {
          killWorker();
          reject(unavailable(msg.message));
        });
      }
      if (msg.id !== id) return;

      if (msg.type === 'started') {
        started = true;
        warmed = true;
        clearTimeout(timer);
        timer = setTimeout(() => finish(() => {
          killWorker(); // stops runaway loops for real
          resolve({
            status: 'timeout',
            statusDescription: 'Time limit exceeded',
            stdout: '',
            stderr: '',
            compileOutput: '',
            exitCode: null,
            executionTimeMs: RUN_TIMEOUT_MS,
            memoryKb: null,
            runtime: { name: 'Python (Pyodide, in your browser)', fileName: 'main.py' },
          });
        }), RUN_TIMEOUT_MS);
        return;
      }

      if (msg.type === 'result') {
        finish(() =>
          resolve({
            status: msg.ok ? 'success' : 'runtime_error',
            statusDescription: msg.ok ? 'Accepted' : 'Runtime error',
            stdout: msg.stdout,
            stderr: msg.stderr,
            compileOutput: '',
            exitCode: msg.exitCode,
            executionTimeMs: msg.executionTimeMs,
            memoryKb: null,
            runtime: { name: 'Python (Pyodide, in your browser)', fileName: 'main.py' },
          })
        );
      }
    }

    function onError(e) {
      // After the script has started, runtime errors are reported through the
      // normal 'result' message — only a failure to *load* should trigger fallback.
      if (started) return;
      finish(() => {
        killWorker();
        reject(unavailable(e?.message));
      });
    }

    function onAbort() {
      finish(() => {
        killWorker();
        reject(abortError());
      });
    }

    w.addEventListener('message', onMessage);
    w.addEventListener('error', onError);
    signal?.addEventListener('abort', onAbort);
    w.postMessage({ type: 'run', id, code, stdin });
  });
}
