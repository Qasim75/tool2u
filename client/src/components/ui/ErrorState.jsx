import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please check your input and try again.',
  onRetry,
  retryLabel = 'Try again',
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-card border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-500/20 dark:bg-red-500/[0.06]"
    >
      <div className="rounded-full bg-red-100 p-3 dark:bg-red-500/10">
        <AlertTriangle className="size-6 text-red-500" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-red-700 dark:text-red-300">{title}</h3>
      <p className="max-w-sm text-sm text-red-600/80 dark:text-red-300/70">{description}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
