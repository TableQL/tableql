import { Query } from './resolvers/Query';
import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';

export function buildQueryType(query: Query, tableType: GraphQLObjectType): GraphQLObjectType {
  return new GraphQLObjectType({
    name: 'Query',
    fields: {
      tables: {
        type: new GraphQLNonNull(new GraphQLList(tableType)),
        resolve: query.tables()
      },
      table: {
        type: tableType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: query.table()
      }
    },
  });
}
