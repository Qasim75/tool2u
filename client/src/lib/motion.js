// Tool2U — shared motion variants
//
// A small, deliberate set of animation patterns reused across the site
// instead of one-off transitions per component. Every variant favors
// opacity + short transforms (translateY/scale/blur) over bounce or
// spin, keeps durations under ~0.7s, and is designed to be triggered
// once per element (`viewport={{ once: true }}`) so nothing re-plays
// as the user scrolls back up.
//
// Easing: a soft "decelerate" curve (ease-out-quint-ish) — fast start,
// gentle settle. This is the one curve used everywhere so motion feels
// like a single, consistent hand rather than a library grab-bag.

export const EASE = [0.23, 1, 0.32, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeUpSm = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// Blur-to-sharp — reserved for hero/heading moments, not used everywhere.
export const blurIn = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

// Container for staggered children — pair with `staggerItem` on each child.
export const staggerContainer = (stagger = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// Word-by-word reveal for headings. Each word is an inline-block span;
// the parent supplies staggerChildren via `wordContainer`.
export const wordContainer = (stagger = 0.045, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const wordItem = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE },
  },
};

// Default viewport settings used by scroll-reveal components: fire once,
// a little before the element is fully in view so motion feels anticipatory
// rather than late.
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' };
