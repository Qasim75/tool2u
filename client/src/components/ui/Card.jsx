import { cn } from '@/utils/cn';

export function CardContent({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn('px-6', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default function Card({ children, className = '', as: Tag = 'div', hover = false, ...props }) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-ink/10 bg-white shadow-[0_1px_2px_rgba(20,25,23,0.04),0_8px_24px_-12px_rgba(20,25,23,0.08)]',
        'dark:bg-surface-dark-raised dark:border-white/10 dark:shadow-none',
        hover &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(20,25,23,0.06),0_16px_32px_-16px_rgba(20,25,23,0.16)] hover:border-ink/15 dark:hover:border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
