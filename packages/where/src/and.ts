import { Where, where } from './Where';

/**
 * Returns a composed predicate representing a short-circuiting logical AND of `left` and `right` predicates.
 *
 * @param left a first predicate that will be used in logical AND operation
 * @param right a second predicate that will be used in logical AND operation
 */
export const and = <T>(left: Where<T>, right: Where<T>) =>
  where((t: T) => left(t) && right(t), r => r.and(left, right));
