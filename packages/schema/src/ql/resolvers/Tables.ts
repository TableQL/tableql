import {
  ForwardingMutableCollection,
  MutableCollection,
  equal,
  Where,
} from '@tableql/collection';
import { Table } from '../../table';

export class Tables extends ForwardingMutableCollection<Table> {

  constructor(private tables: MutableCollection<Table>) {
    super();
  }

  async findById(id: string): Promise<Table> {
    return this.firstOrDefault(this.byId(id), () => {
      throw new Error(`Table with id of '${id}' was not found`);
    });
  }

  async removeById(id: string): Promise<Table> {
    return this.remove(this.byId(id)).then(tables => tables[0]);
  }

  protected delegate(): MutableCollection<Table> {
    return this.tables;
  }

  private byId(id: string): Where<Table> {
    return equal('id', id);
  }
}
