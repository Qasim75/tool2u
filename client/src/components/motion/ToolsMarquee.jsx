import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

const CHIP_CLASS =
  'shrink-0 whitespace-nowrap rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-mint-500/50 hover:text-ink dark:border-white/10 dark:bg-surface-dark-raised dark:text-white/60 dark:hover:text-white';

/**
 * ToolsMarquee — an infinite, edge-faded "reel" of the site's most
 * important tools, scrolling right-to-left beneath the hero headline.
 *
 * The list is duplicated once so the loop is seamless (translate exactly
 * -50% then reset). Pausing on hover/focus is pure CSS (`.marquee:hover`
 * in index.css) so there's no JS state to manage. The duplicated half is
 * `aria-hidden` and unfocusable — a screen reader or keyboard user only
 * ever sees the real list once.
 *
 * For prefers-reduced-motion, this renders as a plain wrapped, static
 * row instead (no duplication, no animation) — same pattern the rest of
 * the site's motion components follow.
 */
export default function ToolsMarquee({ tools, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
        {tools.map((tool) => (
          <Link key={tool.id} to={tool.path} className={CHIP_CLASS}>
            {tool.shortName}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'marquee relative w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        '[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className
      )}
    >
      <div className="marquee-track flex w-max items-center gap-2.5">
        {tools.map((tool) => (
          <Link key={tool.id} to={tool.path} className={CHIP_CLASS}>
            {tool.shortName}
          </Link>
        ))}
        {tools.map((tool) => (
          <Link
            key={`${tool.id}-dup`}
            to={tool.path}
            className={CHIP_CLASS}
            aria-hidden="true"
            tabIndex={-1}
          >
            {tool.shortName}
          </Link>
        ))}
      </div>
    </div>
  );
}
