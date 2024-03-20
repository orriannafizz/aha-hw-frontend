/**
 * tailwind class joiner
 * @param {string[]} classes all the classes to be joined
 * @return  {string} joined classes
 */
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
