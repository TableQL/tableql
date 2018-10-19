import { Where, where } from './Where';

/**
 * Returns a composed predicate representing a short-circuiting logical OR of `left` and `right` predicates.
 *
 * @param left a first predicate that will be used in logical OR operation
 * @param right a second predicate that will be used in logical OR operation
 */
export const or = <T>(left: Where<T>, right: Where<T>) =>
  where((t: T) => left(t) || right(t), v => v.or(left, right));
