/**
 * runners/index.js
 * ----------------------------------------------------------------
 * One entry point for the Online Code Editor's Run button.
 *
 *   html/css -> sandboxed live preview; json -> validate + format (all in the browser)
 *   sql     -> SQLite in WebAssembly (in the browser, persistent DBs)
 *   python  -> Pyodide in a Web Worker (in the browser); falls back to
 *              the server execution API if the runtime can't load
 *   others  -> /api/execute (Judge0 sandbox)
 *
 * Same contract as before: (request, { signal }) => Promise<result>.
 */
import { compileCode } from '@/lib/api/devToolsService';
import { runHtml, runCss, runJson } from './previewRunner';

export async function runCode(request, ctx = {}) {
  const { language } = request;

  if (language === 'html') return runHtml(request);
  if (language === 'css') return runCss(request);
  if (language === 'json') return runJson(request);

  if (language === 'sql') {
    const { runSql } = await import('./sqlRunner');
    return runSql(request);
  }

  if (language === 'python') {
    try {
      const { runPython } = await import('./pythonRunner');
      return await runPython(request, ctx);
    } catch (err) {
      if (err?.code !== 'python_runtime_unavailable') throw err;
      // Browser runtime unavailable — try the server sandbox instead.
      const result = await compileCode(request, ctx);
      return { ...result, note: 'Ran on the server sandbox because the in-browser Python runtime could not be loaded.' };
    }
  }

  return compileCode(request, ctx);
}

export default runCode;
