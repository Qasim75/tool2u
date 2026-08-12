import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeUpSm, wordContainer, wordItem, VIEWPORT } from '@/lib/motion';

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
};

/**
 * RevealHeading — scroll-triggered heading reveal.
 *
 * Pass `split` to animate word-by-word (only works with a plain string
 * child). Otherwise the whole heading fades/lifts as one block, which is
 * the right default for most headings — word-splitting is reserved for
 * hero-level moments where the extra motion earns its place.
 */
export function RevealHeading({
  as = 'h2',
  children,
  className,
  delay = 0,
  split = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  if (split && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={wordContainer(0.045, delay)}
        {...props}
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordItem} className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** RevealParagraph — smaller-offset fade for body copy. */
export function RevealParagraph({ as = 'p', children, className, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as] || motion.p;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpSm}
      transition={{ delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
