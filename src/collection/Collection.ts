import { Where } from './Where';

/**
 * Represents a group of elements.
 *
 * @typeParam T the type of elements in this collection
 */
export interface Collection<T> {

  /**
   * Filters elements of this collection.test
   *
   * @param where a predicate to apply to each element
   * @returns promise that will be resolved with elements that matches the `where` predicate
   */
  filter(where: Where<T>): Promise<T[]>;

  /**
   * Returns promise of all elements of this collection.
   */
  all(): Promise<T[]>;

  /**
   * Returns promise of a first element of this collection matching `where` predicate. If none matches,
   * promise will be resolved with `undefined`.
   *
   * @param where a predicate to apply to each element to find first match
   */
  first(where: Where<T>): Promise<T | undefined>;

  /**
   * Returns promise of a first element of this collection matching `where` predicate. If none matches,
   * promise is resolved with value returned by `defaultValue` function.
   *
   * @param where a predicate to apply to each element to determine first match
   * @param defaultValue function providing default value if no elements match
   */
  firstOrDefault(where: Where<T>, defaultValue: () => T): Promise<T>;
}
