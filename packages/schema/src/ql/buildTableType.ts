import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFieldConfigMap
} from 'graphql';
import { GraphQLNonEmptyString } from './scalars';
import { HitPolicy } from '../table';
import { buildExpressionLanguageType } from './buildExpressionLanguageType';
import { buildHitPolicyType } from './buildHitPolicyType';

export interface TableTypeConfig {
  hitPolicies: HitPolicy[];
  expressionLanguages: Array<string | [string, string?]>;
}

export function buildTableType(config: TableTypeConfig): GraphQLObjectType {
  const columnFields: GraphQLFieldConfigMap<any, any> = {
    label: { type: GraphQLString },
    type: { type: GraphQLString },
    allowedValues: { type: new GraphQLList(GraphQLString) }
  };
  
  const inputType = new GraphQLObjectType({
    name: 'Input',
    fields: {
      ...columnFields,
      expression: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
      expressionLanguage: { type: new GraphQLNonNull(buildExpressionLanguageType(config.expressionLanguages)) },
    }
  });

  const outputType = new GraphQLObjectType({
    name: 'Output',
    fields: {
      ...columnFields,
      name: { type: new GraphQLNonNull(GraphQLNonEmptyString)}
    }
  });

  return new GraphQLObjectType({
    name: 'Table',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLNonEmptyString) },
      hitPolicy: { type: buildHitPolicyType(config.hitPolicies) },
      inputs: { type: new GraphQLList(new GraphQLNonNull(inputType)) },
      outputs: { type: new GraphQLList(new GraphQLNonNull(outputType)) },
      rows: { type: new GraphQLList(new GraphQLList(GraphQLString))}
    }
  });
}
