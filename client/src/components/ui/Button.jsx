import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const VARIANTS = {
  primary:
    'bg-teal-800 text-white hover:bg-teal-700 dark:bg-mint-500 dark:text-teal-950 dark:hover:bg-mint-400 shadow-sm',
  secondary:
    'bg-white text-ink border border-ink/10 hover:border-ink/20 hover:bg-paper-dim dark:bg-surface-dark-raised dark:text-white dark:border-white/10 dark:hover:bg-white/5',
  ghost:
    'bg-transparent text-ink-soft hover:bg-ink/5 dark:text-white/70 dark:hover:bg-white/5',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

const SIZES = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      isLoading = false,
      disabled = false,
      icon: Icon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium',
          'transition-all duration-150 active:scale-[0.98]',
          'disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-surface-dark',
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          Icon && <Icon className="size-4" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
