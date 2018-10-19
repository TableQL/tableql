import { Where, where } from './Where';

/**
 * Returns a predicate that negates the `test` predicate.
 *
 * @param test a predicate to negate
 */
export const not = <T>(test: Where<T>) =>
  where((t: T) => !test(t), v => v.not(test));
