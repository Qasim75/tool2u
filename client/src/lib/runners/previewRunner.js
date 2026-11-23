/**
 * previewRunner.js
 * ----------------------------------------------------------------
 * Browser-only "run" targets for languages that don't produce stdout:
 *
 *   html -> live preview in a sandboxed iframe (rendered by ExecutionResultPanel)
 *   css  -> preview applied to a built-in sample page
 *   json -> validate + pretty-print, with the error position on failure
 *
 * No alias imports on purpose, so this file is unit-testable in plain Node.
 * Nothing here is sent to a server, and nothing is evaluated in the app's own
 * page: HTML is only ever handed to a sandboxed iframe (no allow-same-origin).
 */

const EMPTY = { stdout: '', stderr: '', compileOutput: '', exitCode: null, executionTimeMs: null, memoryKb: null };

export const CSS_SAMPLE_BODY = `
<main class="container">
  <header><h1>Heading 1</h1><h2>Heading 2</h2></header>
  <p>This is a <strong>paragraph</strong> with a <a href="#">link</a> and <em>emphasis</em>.</p>
  <ul><li>List item one</li><li>List item two</li></ul>
  <button>Button</button>
  <input type="text" placeholder="Text input" />
  <div class="box">A div with class "box"</div>
  <table><tr><th>Name</th><th>Score</th></tr><tr><td>Ali</td><td>82</td></tr></table>
</main>`;

export function buildCssPreview(css) {
  // Neutralise a literal "</style" so user CSS can't break out into the page markup.
  const safeCss = String(css).replace(/<\/style/gi, '<\\/style');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${safeCss}</style></head><body>${CSS_SAMPLE_BODY}</body></html>`;
}

export function runHtml({ code }) {
  return {
    status: 'success',
    statusDescription: 'Preview ready',
    label: 'Preview ready',
    ...EMPTY,
    preview: { html: String(code) },
    note: 'Rendered in an isolated sandbox: scripts can run, but they cannot access this page, its cookies or its storage.',
  };
}

export function runCss({ code }) {
  return {
    status: 'success',
    statusDescription: 'Preview ready',
    label: 'Preview ready',
    ...EMPTY,
    preview: { html: buildCssPreview(code) },
    note: 'Your CSS is applied to a sample page (headings, text, list, button, input, table and a .box div).',
  };
}

/** Converts the character offset from a JSON.parse error message into line/column, when available. */
function locate(text, message) {
  const m = /position (\d+)/i.exec(message);
  if (!m) return '';
  const pos = Math.min(Number(m[1]), text.length);
  const before = text.slice(0, pos).split('\n');
  return ` (line ${before.length}, column ${before[before.length - 1].length + 1})`;
}

export function runJson({ code }) {
  const text = String(code);
  try {
    const parsed = JSON.parse(text);
    return {
      status: 'success',
      statusDescription: 'Valid JSON',
      label: 'Valid JSON',
      ...EMPTY,
      stdout: JSON.stringify(parsed, null, 2),
      note: 'Formatted output shown below.',
    };
  } catch (err) {
    const message = String(err?.message || err);
    return {
      status: 'runtime_error',
      statusDescription: 'Invalid JSON',
      label: 'Invalid JSON',
      ...EMPTY,
      stderr: `${message}${locate(text, message)}`,
    };
  }
}
