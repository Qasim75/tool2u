import { cn } from '@/utils/cn';

/**
 * CodeEditor
 * ----------------------------------------------------------------
 * Reusable code input surface shared by every developer/AI tool.
 * Deliberately a styled <textarea>, not a full editor (Monaco/
 * CodeMirror) — Phase 1 is architecture only, so we keep the
 * dependency footprint at zero. The prop surface below is written
 * so a real editor can be swapped in behind this same component
 * later without changing any call sites.
 *
 * This component only ever holds text in React state — it never
 * evaluates, imports, or executes the code it displays.
 */
export default function CodeEditor({
  value,
  onChange,
  language,
  placeholder = 'Paste or write your code here…',
  rows = 12,
  readOnly = false,
  error = false,
  className = '',
  id,
  ...props
}) {
  return (
    <div className="relative">
      {language && (
        <span className="pointer-events-none absolute right-3 top-2.5 select-none rounded-md bg-ink/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft/70 dark:bg-white/5 dark:text-white/40">
          {language}
        </span>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        spellCheck={false}
        placeholder={placeholder}
        className={cn(
          'w-full resize-y rounded-xl border bg-white px-4 py-3 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 dark:bg-surface-dark dark:text-white',
          error
            ? 'border-red-500 focus:ring-red-500/20'
            : 'border-ink/10 focus:border-mint-500 focus:ring-mint-500/60 dark:border-white/10',
          readOnly && 'cursor-default bg-paper-dim dark:bg-surface-dark-raised',
          className
        )}
        {...props}
      />
    </div>
  );
}
