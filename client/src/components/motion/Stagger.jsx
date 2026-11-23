import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion';

/**
 * StaggerGroup / StaggerItem — for grids of cards or list items that
 * should reveal with a slight cascade instead of popping in together.
 * Wrap the grid container in <StaggerGroup>, each child in <StaggerItem>.
 */
export function StaggerGroup({ children, className, stagger = 0.07, as = 'div', ...props }) {
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
      variants={staggerContainer(stagger)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ children, className, as = 'div', ...props }) {
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
    <MotionTag className={className} variants={staggerItem} {...props}>
      {children}
    </MotionTag>
  );
}
