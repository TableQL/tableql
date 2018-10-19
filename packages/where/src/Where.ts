import { WhereReducer } from './WhereReducer';

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
  reduce?<R>(reducer: WhereReducer<T, R>): R;
}

/* tslint:disable:prefer-object-spread */
export const where = <T>(
  test: (t: T) => boolean,
  reduce: <R>(v: WhereReducer<T, R>) => R,
): Where<T> => Object.assign(test, { reduce });
