/**
 * devToolsRegistry
 * ----------------------------------------------------------------
 * Additional, opt-in metadata for the developer & AI-developer
 * tools described in the Phase 1 architecture brief. This does NOT
 * replace or modify `constants/tools.js` (the source of truth for
 * routing, nav, and SEO listing) — it layers on extra information
 * that only the future compiler/AI tool UIs need:
 *
 *   - `engine`   how the tool actually runs
 *   - `status`   whether it's live yet
 *   - `capabilities` what it can do, for shared UI (e.g. tool toolbar)
 *
 * Nothing currently imports this file into a route. It exists so
 * Phase 2+ can build against a single, documented source instead of
 * inventing per-tool ad hoc config.
 */

/** How a tool's processing actually happens. */
export const TOOL_ENGINE = {
  /** Runs fully in the browser (regex/string ops, small parser libs). Safe today. */
  CLIENT: 'client',
  /** Needs the future sandboxed backend (arbitrary code execution). */
  COMPILER_API: 'compiler-api',
  /** Needs the future AI backend. */
  AI_API: 'ai-api',
};

/** Lifecycle status for a tool entry. */
export const TOOL_STATUS = {
  ACTIVE: 'active', // shipped and working today
  PLANNED: 'planned', // architecture ready, backend/UI not built yet
  // Backend is fully implemented and deployed as real code, but has not
  // been exercised against a live execution provider from this dev
  // environment (no outbound network access to third-party providers here).
  // Promote to ACTIVE only after a real deployment confirms it end-to-end.
  BUILT_UNVERIFIED: 'built-unverified',
};

/** Shared capability tags, used to drive which toolbar actions render. */
export const TOOL_CAPABILITY = {
  FORMAT: 'format',
  MINIFY: 'minify',
  VALIDATE: 'validate',
  LINT: 'lint',
  EXECUTE: 'execute',
  EXPLAIN: 'explain',
  REVIEW: 'review',
  OPTIMIZE: 'optimize',
  GENERATE_DOCS: 'generate-docs',
  GENERATE_TESTS: 'generate-tests',
};

/**
 * @typedef {Object} DevToolMeta
 * @property {string} id            matches the `id` in constants/tools.js where applicable
 * @property {string} label
 * @property {string} engine        one of TOOL_ENGINE
 * @property {string} status        one of TOOL_STATUS
 * @property {string[]} capabilities
 * @property {string[]} [languages] language ids this tool understands
 */

/** @type {DevToolMeta[]} */
export const DEVELOPER_TOOLS_REGISTRY = [
  // ---- Already live (client-side, regex/JSON-based) ----
  { id: 'json-formatter', label: 'JSON Formatter', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.FORMAT, TOOL_CAPABILITY.MINIFY, TOOL_CAPABILITY.VALIDATE], languages: ['json'] },
  { id: 'json-validator', label: 'JSON Validator', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.VALIDATE], languages: ['json'] },
  { id: 'json-minifier', label: 'JSON Minifier', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.MINIFY], languages: ['json'] },
  { id: 'html-formatter', label: 'HTML Formatter', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.FORMAT], languages: ['html'] },
  { id: 'html-minifier', label: 'HTML Minifier', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.MINIFY], languages: ['html'] },
  { id: 'css-beautifier', label: 'CSS Beautifier', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.FORMAT], languages: ['css'] },
  { id: 'css-minifier', label: 'CSS Minifier', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.MINIFY], languages: ['css'] },
  { id: 'js-beautifier', label: 'JavaScript Beautifier', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.FORMAT], languages: ['javascript'] },
  { id: 'js-minifier', label: 'JavaScript Minifier', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.MINIFY], languages: ['javascript'] },
  { id: 'sql-formatter', label: 'SQL Formatter', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.FORMAT], languages: ['sql'] },
  { id: 'regex-tester', label: 'Regex Tester', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.VALIDATE], languages: ['regex'] },
  { id: 'markdown-preview', label: 'Markdown Preview', engine: TOOL_ENGINE.CLIENT, status: TOOL_STATUS.ACTIVE, capabilities: [TOOL_CAPABILITY.FORMAT], languages: ['markdown'] },

  // ---- Execution backend built in Phase 3, pending live verification ----
  // /api/execute + server/execution/* implement real sandboxed execution via
  // Judge0. Status is BUILT_UNVERIFIED (not ACTIVE) because this environment
  // has no outbound network access to Judge0 to run a live end-to-end test —
  // see the Phase 3 report for exactly what was and wasn't verified.
  {
    id: 'online-code-editor',
    label: 'Online Code Editor',
    engine: TOOL_ENGINE.COMPILER_API,
    status: TOOL_STATUS.BUILT_UNVERIFIED,
    capabilities: [TOOL_CAPABILITY.EXECUTE],
    languages: ['javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'php', 'go', 'rust', 'dart', 'ruby', 'kotlin', 'html', 'css', 'json', 'sql'],
    executableLanguages: ['javascript', 'python', 'c', 'cpp', 'java', 'csharp', 'go', 'rust', 'php', 'ruby', 'kotlin', 'dart'],
  },
  { id: 'sql-validator', label: 'SQL Validator', engine: TOOL_ENGINE.COMPILER_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.VALIDATE], languages: ['sql'] },
  { id: 'code-error-detector', label: 'Code Error Detector', engine: TOOL_ENGINE.COMPILER_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.LINT], languages: ['javascript', 'python', 'cpp', 'java'] },
];

/** @type {DevToolMeta[]} */
export const AI_DEVELOPER_TOOLS_REGISTRY = [
  { id: 'ai-code-explainer', label: 'AI Code Explainer', engine: TOOL_ENGINE.AI_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.EXPLAIN] },
  { id: 'ai-bug-detector', label: 'AI Bug Detector', engine: TOOL_ENGINE.AI_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.LINT, TOOL_CAPABILITY.EXPLAIN] },
  { id: 'ai-code-reviewer', label: 'AI Code Reviewer', engine: TOOL_ENGINE.AI_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.REVIEW] },
  { id: 'ai-code-optimizer', label: 'AI Code Optimizer', engine: TOOL_ENGINE.AI_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.OPTIMIZE] },
  { id: 'ai-documentation-generator', label: 'AI Documentation Generator', engine: TOOL_ENGINE.AI_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.GENERATE_DOCS] },
  { id: 'ai-test-case-generator', label: 'AI Test Case Generator', engine: TOOL_ENGINE.AI_API, status: TOOL_STATUS.PLANNED, capabilities: [TOOL_CAPABILITY.GENERATE_TESTS] },
];

/** Languages supported across the code-editor-based tools (drives LanguageSelector options). */
export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
];

export function getDevToolMeta(id) {
  return (
    DEVELOPER_TOOLS_REGISTRY.find((t) => t.id === id) ||
    AI_DEVELOPER_TOOLS_REGISTRY.find((t) => t.id === id) ||
    null
  );
}

export function isToolActive(id) {
  return getDevToolMeta(id)?.status === TOOL_STATUS.ACTIVE;
}
