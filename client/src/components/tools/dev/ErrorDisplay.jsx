import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * ErrorDisplay
 * ----------------------------------------------------------------
 * Compact, inline error banner for use *inside* a tool panel (parse
 * errors, validation failures, API errors). For a full-panel error
 * state (e.g. a tool failed to load), use the existing
 * `components/ui/ErrorState` instead — this is the smaller sibling
 * meant to sit directly under a code editor or output block.
 */
export default function ErrorDisplay({ message, title = 'Error', className = '' }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className={cn(
        'mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400',
        className
      )}
    >
      <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      <span>
        <strong>{title}:</strong> {message}
      </span>
    </div>
  );
}
