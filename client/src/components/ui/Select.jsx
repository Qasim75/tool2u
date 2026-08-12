import { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const Select = forwardRef(
  ({ label, error, hint, className = '', containerClassName = '', id, children, ...props }, ref) => {
    const autoId = useId();
    const selectId = id || autoId;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-ink-soft dark:text-white/70">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={cn(
              'h-11 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-ink',
              'dark:bg-surface-dark dark:text-white',
              'transition-colors focus:outline-none focus:ring-2 focus:ring-mint-500/60',
              error
                ? 'border-red-400 focus:ring-red-400/60'
                : 'border-ink/10 focus:border-mint-500 dark:border-white/10',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft/60 dark:text-white/40"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-xs font-medium text-red-500" role="alert">
            {error}
          </p>
        )}
        {!error && hint && <p className="text-xs text-ink-soft/70 dark:text-white/40">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
