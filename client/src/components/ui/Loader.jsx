import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Loader({ label = 'Loading…', size = 'md', className = '' }) {
  const sizes = { sm: 'size-4', md: 'size-6', lg: 'size-9' };
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 py-10 text-ink-soft dark:text-white/50', className)} role="status">
      <Loader2 className={cn('animate-spin text-mint-600 dark:text-mint-400', sizes[size])} aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
