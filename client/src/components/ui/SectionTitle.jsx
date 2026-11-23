import { cn } from '@/utils/cn';
import { RevealHeading, RevealParagraph } from '@/components/motion/RevealText';

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  inverted = false,
  className = '',
}) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-3',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
            inverted
              ? 'bg-white/10 text-mint-300'
              : 'bg-mint-500/10 text-teal-700 dark:bg-mint-500/15 dark:text-mint-400'
          )}
        >
          {eyebrow}
        </span>
      )}
      <RevealHeading
        as="h2"
        delay={0.05}
        className={cn('text-3xl font-semibold sm:text-4xl', inverted ? 'text-white' : 'text-ink dark:text-white')}
      >
        {title}
      </RevealHeading>
      {description && (
        <RevealParagraph
          delay={0.12}
          className={cn('text-base', inverted ? 'text-white/60' : 'text-ink-soft dark:text-white/60')}
        >
          {description}
        </RevealParagraph>
      )}
    </div>
  );
}
