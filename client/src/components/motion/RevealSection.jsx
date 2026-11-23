import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, VIEWPORT } from '@/lib/motion';

/**
 * RevealSection — wraps a block of content and fades/lifts it in once
 * when it enters the viewport. Use for cards, panels, and section blocks
 * that aren't part of a staggered list (see Stagger.jsx for lists).
 */
export default function RevealSection({ children, className, delay = 0, as = 'div', ...props }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = (typeof as === 'string' && motion[as]) || motion.div;

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
