/**
 * Represents a predicate.
 *
 * @typeParam T the type of the input to the predicate
 */
export interface Where<T> {

  /**
   * Evaluates this predicate on the given argument.
   *
   * @param t the input argument
   * @returns `true` if the input argument matches the predicate, otherwise `false`
   */
  (t: T): boolean;

  /**
   * Reduces this predicate to a single value.
   *
   * @typeParam R the type of a single value that predicate was reduced to
   * @param reducer a predicate reducer
   * @returns a single value this predicate was reduced to
   */
  reduce<R>(reducer: WhereReducer<T, R>): R;
}

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

/* tslint:disable:prefer-object-spread */
const where = <T>(
  test: (t: T) => boolean,
  reduce: <R>(v: WhereReducer<T, R>) => R,
): Where<T> => Object.assign(test, { reduce });

/**
 * Returns a composed predicate representing a short-circuiting logical AND of `left` and `right` predicates.
 *
 * @param left a first predicate that will be used in logical AND operation
 * @param right a second predicate that will be used in logical AND operation
 */
export const and = <T>(left: Where<T>, right: Where<T>) =>
  where((t: T) => left(t) && right(t), r => r.and(left, right));

/**
 * Returns a composed predicate representing a short-circuiting logical OR of `left` and `right` predicates.
 *
 * @param left a first predicate that will be used in logical OR operation
 * @param right a second predicate that will be used in logical OR operation
 */
export const or = <T>(left: Where<T>, right: Where<T>) =>
  where((t: T) => left(t) || right(t), v => v.or(left, right));

/**
 * Returns a predicate that tests if the `value` of an attribute is equal to value returned by `valueFunction`.
 *
 * ```
 * [{ name: 'a' }, { name: 'b' }, { name: 'c' }].filter(and('name', 'c', p => p.name));
 * // result is [{ name: 'c' }]
 * ```
 *
 * @param attribute the name of an attribute
 * @param value the value of an attribute
 * @param valueFunction the function that will be invoked with the input to the predicate
 */
export const equal = <T>(
  attribute: string,
  value: any,
  valueFunction: (t: T) => any,
) =>
  where(
    (t: T) => value === valueFunction(t),
    v => v.equal(attribute, value, valueFunction),
  );

/**
 * Returns a predicate that negates the `test` predicate.
 *
 * @param test a predicate to negate
 */
export const not = <T>(test: Where<T>) =>
  where((t: T) => !test(t), v => v.not(test));

/**
 * Returns a predicate that always evaluates to `true`.
 */
export const alwaysTrue = () => where((t: any) => true, v => v.alwaysTrue());

/**
 * Returns a predicate that always evaluates to `false`
 */
export const alwaysFalse = () => where((t: any) => false, v => v.alwaysFalse());
