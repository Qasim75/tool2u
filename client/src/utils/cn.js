/**
 * Joins class names, skipping falsy values.
 * Lightweight replacement for the `clsx` package.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
