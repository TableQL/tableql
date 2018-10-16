import { Mutation } from './resolvers/Mutation';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  getNamedType,
  assertInputType,
  assertObjectType,
  GraphQLType,
  GraphQLInputFieldConfigMap,
  GraphQLList
} from 'graphql';
import { mapValues } from '../util';
import { GraphQLNonEmptyString } from './scalars';

function getInputFields(fromType: GraphQLType): GraphQLInputFieldConfigMap {
  return mapValues(
    assertObjectType(getNamedType(fromType)).getFields(),
    ({ name, type, description }) => ({ name, type: assertInputType(type), description }));
}

export function buildMutationType(mutation: Mutation, tableType: GraphQLObjectType): GraphQLObjectType {
  const tableFields = tableType.getFields();

  const inputInputType = new GraphQLInputObjectType({
    name: 'InputInput',
    fields: getInputFields(tableFields.inputs.type)
  });

  const outputInputType = new GraphQLInputObjectType({
    name: 'OutputInput',
    fields: getInputFields(tableFields.outputs.type)
  });

  const tableInputFields: GraphQLInputFieldConfigMap = {
    name: { type: GraphQLNonEmptyString },
    hitPolicy: { type: assertInputType(tableFields.hitPolicy.type) },
    inputs: { type: new GraphQLList(new GraphQLNonNull(inputInputType)) },
    outputs: { type: new GraphQLList(new GraphQLNonNull(outputInputType)) },
    rows: { type: new GraphQLList(new GraphQLList(GraphQLString)) }
  };

  const createTableInputType = new GraphQLInputObjectType({
    name: 'CreateTableInput',
    fields: { ...tableInputFields }
  });

  const updateTableInputType = new GraphQLInputObjectType({
    name: 'UpdateTableInput',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      ...tableInputFields
    }
  });

  const deleteTableInputType = new GraphQLInputObjectType({
    name: 'DeleteTableInput',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
  });

  return new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createTable: {
        type: new GraphQLNonNull(tableType),
        args: {
          input: { type: createTableInputType }
        },
        resolve: mutation.createTable(),
      },
      updateTable: {
        type: tableType,
        args: {
          input: { type: updateTableInputType }
        },
        resolve: mutation.updateTable(),
      },
      deleteTable: {
        type: GraphQLString,
        args: {
          input: { type: deleteTableInputType }
        },
        resolve: mutation.deleteTable()
      }
    },
  });
}
