import { MutableCollection } from './MutableCollection';
import { ForwardingCollection } from './ForwardingCollection';
import { Where } from '@tableql/where';

/**
 * A mutable collection that forwards all its method calls to another mutable collection.
 */
export abstract class ForwardingMutableCollection<T> extends ForwardingCollection<T> implements MutableCollection<T> {

  /** @inheritdoc */
  async save(t: T): Promise<T> {
    return this.delegate().save(t);
  }

  /** @inheritdoc */
  async remove(where: Where<T>): Promise<T[]> {
    return this.delegate().remove(where);
  }

  /**
   * Returns the backing mutable collection instance that methods are forwarded to.
   */
  protected abstract delegate(): MutableCollection<T>;
}
