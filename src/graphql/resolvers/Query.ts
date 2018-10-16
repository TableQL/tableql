import { MutableCollection } from '../../collection';
import { Table } from '../../table';
import { GraphQLFieldResolver } from 'graphql';
import { Tables } from './Tables';

export class Query {
  constructor(private tablesSupplier: (context: any) => MutableCollection<Table>) {}

  tables(): GraphQLFieldResolver<any, any> {
    return (_, __, context) => this.tablesSupplier(context).all();
  }

  table(): GraphQLFieldResolver<any, any> {
    return (_, { id }, context) =>
      new Tables(this.tablesSupplier(context)).findById(id);
  }
}
