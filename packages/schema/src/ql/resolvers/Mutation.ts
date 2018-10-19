import { Table } from '../../table';
import { MutableCollection } from '../../../../collection/src';
import { Tables } from './Tables';
import { GraphQLFieldResolver } from 'graphql';

export class Mutation {
  constructor(
    private table: () => Table,
    private tablesSupplier: (context: any) => MutableCollection<Table>) {}

  createTable(): GraphQLFieldResolver<any, any> {
    return (_, { input }, context) =>
      this.save(input, context, Promise.resolve(this.table()));
  }

  updateTable(): GraphQLFieldResolver<any, any> {
    return (_, { input }, context) =>
      this.save(input, context, this.newTables(context).findById(input.id));
  }

  deleteTable(): GraphQLFieldResolver<any, any> {
    return (_, { input }, context) =>
      this.newTables(context)
        .removeById(input.id)
        .then(table => table.id);
  }

  private async save(input: any, context: any, promise: Promise<Table>): Promise<Table> {
    return this.tablesSupplier(context).save(Object.assign(await promise, input));
  }

  private newTables(context: any): Tables {
    return new Tables(this.tablesSupplier(context));
  }
}
