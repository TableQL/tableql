import { Collection } from './Collection';
import { Where } from './Where';

/**
 * A type of collection providing mutation methods.
 */
export interface MutableCollection<T> extends Collection<T> {

  /**
   * Either replaces existing element or inserts new element to this collection. When more than one element
   * represented by `t` is in collection, it is undefined which of the matching elements will be replaced.
   * Therefore, it is sensible to ensure that at most one element matches the `t`, e.g. by using unique id.
   * 
   * @param t element to replace or insert
   * @returns a promise of either replaced or inserted element
   */
  save(t: T): Promise<T>;

  /**
   * Removes elements matching `where` predicate from this collection.
   * 
   * @param where a predicate matching elements to be removed
   * @returns a promise of an array of removed elements
   */
  remove(where: Where<T>): Promise<T[]>;
}
