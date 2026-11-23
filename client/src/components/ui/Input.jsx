import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(
  (
    { label, error, hint, className = '', containerClassName = '', id, icon: Icon, ...props },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-soft dark:text-white/70">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft/60 dark:text-white/40"
              aria-hidden="true"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink placeholder:text-ink-soft/50',
              'dark:bg-surface-dark dark:text-white dark:placeholder:text-white/30',
              'transition-colors focus:outline-none focus:ring-2 focus:ring-mint-500/60',
              Icon && 'pl-10',
              error
                ? 'border-red-400 focus:ring-red-400/60'
                : 'border-ink/10 focus:border-mint-500 dark:border-white/10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-500" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-ink-soft/70 dark:text-white/40">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
