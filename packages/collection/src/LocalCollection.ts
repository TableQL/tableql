import { AbstractCollection } from './AbstractCollection';
import { Where } from '@tableql/where';

/**
 * An in-memory collection.
 */
export class LocalCollection<T> extends AbstractCollection<T> {

  /**
   * Creates an `LocalCollection`.
   *
   * @param set a backing set
   */
  constructor(protected set = new Set<T>()) {
    super();
  }

  /** @inheritdoc */
  async filter(where: Where<T>): Promise<T[]> {
    return Array.from(this.set).filter(where);
  }

  /** @inheritdoc */
  async first(where: Where<T>): Promise<T | undefined> {
    return Array.from(this.set).find(where);
  }
}
