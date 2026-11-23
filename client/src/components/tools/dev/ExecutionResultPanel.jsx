import { AlertTriangle, CheckCircle2, Clock, Cpu, Info, TerminalSquare, XCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import { cn } from '@/utils/cn';

/**
 * ExecutionResultPanel
 * ----------------------------------------------------------------
 * Display shell for a code-execution result, matching the shape of
 * `CompileResult` returned by `POST /api/execute` (Phase 3) — see
 * `lib/api/devToolsService.js` and `server/execution/judge0Client.js`.
 *
 * SECURITY NOTE: this component only *renders* a result object that
 * a backend sandbox already produced. It must never be handed raw
 * code to run client-side (no `eval`, no `new Function()`, no
 * unsandboxed iframe) — all execution happens in the isolated
 * provider behind `/api/execute`.
 *
 * @param {Object} props
 * @param {'idle'|'running'|'success'|'compile_error'|'runtime_error'|'timeout'|'provider_error'|'error'} [props.status]
 * @param {{
 *   stdout?: string, stderr?: string, compileOutput?: string,
 *   exitCode?: number|null, executionTimeMs?: number|null, memoryKb?: number|null,
 *   statusDescription?: string, truncated?: boolean,
 * }} [props.result]
 */
function SqlResultTable({ block }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs font-medium text-ink-soft dark:text-white/60">
        <span>{block.title}</span>
        <span className="font-normal text-ink-soft/60 dark:text-white/40">
          {block.totalRows ?? block.rows.length} row{(block.totalRows ?? block.rows.length) === 1 ? '' : 's'}
        </span>
      </div>
      <div className="max-h-80 overflow-auto rounded-xl border border-ink/10 dark:border-white/10">
        <table className="w-full border-collapse text-left font-mono text-xs">
          <thead className="sticky top-0 bg-paper-dim dark:bg-surface-dark-raised">
            <tr>
              {block.columns.map((c, i) => (
                <th key={i} className="whitespace-nowrap border-b border-ink/10 px-3 py-2 font-semibold text-ink dark:border-white/10 dark:text-white">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.length === 0 ? (
              <tr>
                <td colSpan={block.columns.length} className="px-3 py-3 text-ink-soft/60 dark:text-white/40">
                  No rows returned
                </td>
              </tr>
            ) : (
              block.rows.map((row, r) => (
                <tr key={r} className="odd:bg-white even:bg-paper-dim/40 dark:odd:bg-surface-dark dark:even:bg-white/[0.02]">
                  {row.map((cell, c) => (
                    <td key={c} className="max-w-[320px] truncate whitespace-nowrap px-3 py-1.5 text-ink dark:text-white/90" title={cell == null ? 'NULL' : String(cell)}>
                      {cell === null || cell === undefined ? (
                        <span className="italic text-ink-soft/50 dark:text-white/30">NULL</span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {block.truncated && (
        <p className="mt-1 text-xs text-ink-soft/60 dark:text-white/40">
          Showing the first {block.rows.length} of {block.totalRows} rows.
        </p>
      )}
    </div>
  );
}

export default function ExecutionResultPanel({ status = 'idle', result, hint, className = '' }) {
  if (status === 'idle') return null;

  if (status === 'running') {
    return (
      <Card className={`p-6 ${className}`}>
        <Loader label="Running your code…" />
        {hint && <p className="mt-3 text-center text-xs text-ink-soft/70 dark:text-white/40">{hint}</p>}
      </Card>
    );
  }

  const isSuccess = status === 'success';
  const isCompileError = status === 'compile_error';
  const isTimeout = status === 'timeout';
  const isProviderIssue = status === 'provider_error' || status === 'error';

  const STATUS_LABEL = {
    success: 'Ran successfully',
    compile_error: 'Compilation error',
    runtime_error: 'Runtime error',
    timeout: 'Execution timed out',
    provider_error: 'Execution provider error',
    error: 'Execution failed',
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {isSuccess ? (
          <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden="true" />
        ) : isCompileError || isProviderIssue ? (
          <AlertTriangle className="size-4 shrink-0 text-amber-500" aria-hidden="true" />
        ) : (
          <XCircle className="size-4 shrink-0 text-red-500" aria-hidden="true" />
        )}
        <span
          className={cn(
            'text-sm font-semibold',
            isSuccess
              ? 'text-emerald-600 dark:text-emerald-400'
              : isCompileError || isProviderIssue
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-red-600 dark:text-red-400'
          )}
        >
          {result?.label || STATUS_LABEL[status] || 'Execution failed'}
        </span>
        {typeof result?.exitCode === 'number' && (
          <span className="text-xs text-ink-soft/60 dark:text-white/40">exit code {result.exitCode}</span>
        )}
        <div className="ml-auto flex items-center gap-3">
          {typeof result?.executionTimeMs === 'number' && (
            <span className="flex items-center gap-1 text-xs text-ink-soft/60 dark:text-white/40">
              <Clock className="size-3" /> {result.executionTimeMs}ms
            </span>
          )}
          {typeof result?.memoryKb === 'number' && (
            <span className="flex items-center gap-1 text-xs text-ink-soft/60 dark:text-white/40">
              <Cpu className="size-3" /> {Math.round(result.memoryKb / 1024)}MB
            </span>
          )}
        </div>
      </div>

      {isTimeout && (
        <p className="mb-3 text-sm text-ink-soft dark:text-white/55">
          Your program didn&apos;t finish within the execution time limit — check for infinite loops or reduce the workload.
        </p>
      )}

      {result?.note && (
        <p className="mb-3 flex items-start gap-1.5 text-xs text-ink-soft/70 dark:text-white/45">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" /> {result.note}
        </p>
      )}

      {Array.isArray(result?.blocks) &&
        result.blocks.map((block, i) =>
          block.type === 'table' ? (
            <SqlResultTable key={i} block={block} />
          ) : (
            <p
              key={i}
              className="mb-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-mono text-xs text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06] dark:text-emerald-300"
            >
              {block.text}
            </p>
          )
        )}

      {result?.preview && (
        <div className="mb-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-soft dark:text-white/60">
            <TerminalSquare className="size-3.5" /> Preview
          </div>
          {/* No allow-same-origin: the previewed page gets an opaque origin and cannot touch this app. */}
          <iframe
            title="Code preview"
            sandbox="allow-scripts allow-modals"
            csp="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data:"
            srcDoc={result.preview.html}
            referrerPolicy="no-referrer"
            className="h-80 w-full rounded-xl border border-ink/10 bg-white dark:border-white/10"
          />
        </div>
      )}

      {result?.compileOutput && (
        <div className="mb-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            <TerminalSquare className="size-3.5" /> Compile output
          </div>
          <pre className="w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-amber-200 bg-amber-50 p-4 font-mono text-sm text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/[0.06] dark:text-amber-300">
            {result.compileOutput}
          </pre>
        </div>
      )}

      {result?.stdout && (
        <div className="mb-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-soft dark:text-white/60">
            <TerminalSquare className="size-3.5" /> stdout
          </div>
          <pre className="w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-ink/10 bg-paper-dim p-4 font-mono text-sm text-ink dark:border-white/10 dark:bg-surface-dark dark:text-white">
            {result.stdout}
          </pre>
        </div>
      )}

      {result?.stderr && (
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-red-500">
            <TerminalSquare className="size-3.5" /> stderr
          </div>
          <pre className="w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-red-200 bg-red-50 p-4 font-mono text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/[0.06] dark:text-red-400">
            {result.stderr}
          </pre>
        </div>
      )}

      {isSuccess &&
        !result?.stdout &&
        !result?.stderr &&
        !result?.compileOutput &&
        !result?.preview &&
        !(Array.isArray(result?.blocks) && result.blocks.length > 0) && (
          <p className="text-sm text-ink-soft dark:text-white/55">The program finished without printing any output.</p>
        )}

      {result?.truncated && (
        <p className="mt-3 text-xs text-ink-soft/60 dark:text-white/40">
          Some output was truncated to keep the response size reasonable.
        </p>
      )}
    </Card>
  );
}
