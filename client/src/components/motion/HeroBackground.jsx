import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroBackground — layered ambient backdrop for the hero section.
 *
 * Three softly-blurred color blobs drift on independent, staggered loops
 * behind a faint dot-grid that's radially masked so it fades at the edges
 * instead of reading as a flat, unbroken texture. A bottom vignette grounds
 * the content into the section below it. All motion is skipped for
 * prefers-reduced-motion, and everything here is purely decorative
 * (aria-hidden) so it never gets in the way of screen readers.
 */
export default function HeroBackground({ image }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper to-paper-dim/60 dark:from-surface-dark dark:via-surface-dark dark:to-surface-dark-raised/50" />

      {/* Drifting aurora blobs */}
      <motion.div
        className="absolute -top-28 -left-24 size-[26rem] rounded-full bg-mint-400/30 blur-[100px] dark:bg-mint-500/10"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 40, -10, 0], y: [0, 30, -20, 0], scale: [1, 1.08, 0.96, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-28 size-[28rem] rounded-full bg-teal-600/20 blur-[110px] dark:bg-teal-600/15"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -30, 20, 0], y: [0, -25, 15, 0], scale: [1, 0.94, 1.06, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/3 size-[24rem] rounded-full bg-amber-400/20 blur-[100px] dark:bg-amber-500/10"
        animate={
          reduceMotion ? undefined : { x: [0, 25, -15, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.97, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Faint hero illustration */}
      {image && (
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.06 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center dark:opacity-[0.04]"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Dot grid, radially masked so it fades at the edges */}
      <div
        className="absolute inset-0 grid-paper opacity-50 dark:opacity-25"
        style={{
          maskImage: 'radial-gradient(ellipse 65% 60% at 50% 38%, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 38%, black 35%, transparent 85%)',
        }}
      />

      {/* Vignette — grounds the content and softens the seam into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper dark:to-surface-dark" />
    </div>
  );
}
