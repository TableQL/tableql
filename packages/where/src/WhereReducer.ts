import { Where } from './Where';

/**
 * The reducer of a predicate. Used to reduce predicates to a single value of other type.
 * For example, to transform a composite predicate to an object accepted by SQL.
 *
 * @typeParam T the type of the input to the predicate
 * @typeParam R the type of the reduced value
 */
export interface WhereReducer<T, R> {

  /**
   * Returns reduced value of `and` predicate. For example,
   *
   * ```
   * return left.reduce(this) + " AND " + right.reduce(this);
   * ```
   *
   * @param left first predicate used in logical AND operation
   * @param right second predicate used in logical AND operation
   */
  and(left: Where<T>, right: Where<T>): R;

  /**
   * Returns reduced value of `or` predicate. For example,
   *
   * ```
   * return left.reduce(this) + " OR " + right.reduce(this);
   * ```
   *
   * @param left first predicate used in logical OR operation
   * @param right second predicate used in logical OR operation
   */
  or(left: Where<T>, right: Where<T>): R;

  /**
   * Returns reduced value of `equal` predicate.
   *
   * @param attribute the name of an attribute
   * @param value the value of an attribute
   * @param valueFunction the function that would be invoked with the input to the predicate
   */
  equal(attribute: string, value: any, valueFunction: (t: T) => any): R;

  /**
   * Returns reduced value of `not` predicate.
   *
   * @param test a negated predicate
   */
  not(test: Where<T>): R;

  /**
   * Returns reduced value of `alwaysTrue` predicate.
   */
  alwaysTrue(): R;

  /**
   * Returns reduced value of `alwaysFalse` predicate.
   */
  alwaysFalse(): R;
}
