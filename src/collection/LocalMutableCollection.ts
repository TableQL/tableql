import { MutableCollection } from './MutableCollection';
import { LocalCollection } from './LocalCollection';
import { Where, not } from './Where';

/**
 * An in-memory mutable collection. Element uniqueness is checked using value equality (`===` operator).
 */
export class LocalMutableCollection<T> extends LocalCollection<T> implements MutableCollection<T> {
  
  /**
   * Creates an `LocalMutableCollection`.
   *
   * @param set a backing set
   */
  constructor(set?: Set<T>) {
    super(set);
  }

  /** @inheritdoc */
  async save(t: T): Promise<T> {
    this.set.add(t);
    return t;
  }

  /** @inheritdoc */
  async remove(where: Where<T>): Promise<T[]> {
    const toRemove = Array.from(this.set).filter(where);
    toRemove.forEach(value => this.set.delete(value));
    return toRemove;
  }
}
