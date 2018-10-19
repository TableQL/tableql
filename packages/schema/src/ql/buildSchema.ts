import { MutableCollection } from '../../../collection/src/MutableCollection';
import { Table, LocalTable, HitPolicy } from '../table';
import { GraphQLSchema } from 'graphql';
import { LocalMutableCollection } from '../../../collection/src/LocalMutableCollection';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { buildQueryType } from './buildQueryType';
import { buildMutationType } from './buildMutationType';
import { TableTypeConfig, buildTableType } from './buildTableType';

/**
 * Schema options for building schema using {@link buildSchema}.
 */
export interface SchemaConfig extends TableTypeConfig {

  /**
   * A factory to create table instance.
   */
  table?: () => Table;

  /**
   * A supplier of table collection. If value is a collection instance, then that collection will be
   * shared (singleton). Otherwise, if value is a function, then it will invoked each time a table collection is
   * needed. Use function, if access to GraphQL `context` is necessary.
   */
  tables?: MutableCollection<Table> | ((context: any) => MutableCollection<Table>);
}

/**
 * Default schema configuration.
 */
export const schemaDefaults: SchemaConfig = {
  table: () => new LocalTable(),
  tables: new LocalMutableCollection<Table>(),
  hitPolicies: Object.values(HitPolicy),
  expressionLanguages: ['FEEL']
};

/**
 * Creates a GraphQL schema to work with tables. A schema is a foremost component in GraphQL execution.
 * 
 * Certain patterns (e.g. caching {@link https://github.com/facebook/dataloader | `dataloader`} per request) may use
 * GraphQL execution context. For that matter, if needed, GraphQL context can be accessed by table collection supplier.
 * For example,
 * 
 * ```
 * buildSchema({
 *   tables: context => context.perRequestTables
 * })
 * ```
 * 
 * How to use created schema, check out {@link https://graphql.org/graphql-js/ | Getting Started With GraphQL.js}.
 * 
 * @param config schema configuration, defaulted to {@link schemaDefaults}
 */
export function buildSchema(config?: SchemaConfig): GraphQLSchema {
  const { table, tables, ...configRest } = { ...schemaDefaults, ...config };
  const tablesSupplier = typeof tables === 'function' ? tables : (context: any) => tables!;
  
  const tableType = buildTableType(configRest);
  
  return new GraphQLSchema({
    query: buildQueryType(new Query(tablesSupplier), tableType),
    mutation: buildMutationType(new Mutation(table!, tablesSupplier), tableType),
  });
}
