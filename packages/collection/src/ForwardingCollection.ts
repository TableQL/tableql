import { AbstractCollection } from './AbstractCollection';
import { Collection } from './Collection';
import { Where } from '@tableql/where';

/**
 * A collection that forwards all its method calls to another collection.
 */
export abstract class ForwardingCollection<T> extends AbstractCollection<T> {

  /** @inheritdoc */
  async filter(where: Where<T>): Promise<T[]> {
    return this.delegate().filter(where);
  }

  /** @inheritdoc */
  async first(where: Where<T>): Promise<T | undefined> {
    return this.delegate().first(where);
  }

  /**
   * Returns the backing collection instance that methods are forwarded to.
   */
  protected abstract delegate(): Collection<T>;
}
