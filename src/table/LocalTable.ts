import { AbstractTable } from './AbstractTable';
import { nonSecureId } from '../util/nonSecureId';

export interface LocalTableConfig {
  id?: () => string;
}

export class LocalTable extends AbstractTable {
  constructor(config?: LocalTableConfig) {
    super();
    this.id = (config && config.id || nonSecureId)();
  }
}
