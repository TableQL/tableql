import { Where, alwaysTrue } from './Where';
import { Collection } from './Collection';

/**
 * A collection with default implementation of {@link all} and {@link firstOrDefault}.
 */
export abstract class AbstractCollection<T> implements Collection<T> {
  
  /** @inheritdoc */
  abstract async filter(where: Where<T>): Promise<T[]>;

  /** @inheritdoc */
  abstract async first(where: Where<T>): Promise<T | undefined>;

  /** @inheritdoc */
  async all(): Promise<T[]> {
    return this.filter(alwaysTrue());
  }

  /** @inheritdoc */
  async firstOrDefault(where: Where<T>, defaultValue: () => T): Promise<T> {
    return this.first(where).then(t => t || defaultValue());
  }
}
