import { GraphQLEnumType } from 'graphql';
import { fromPairs, mapValues } from '../util';

export function buildExpressionLanguageType(expressionLanguages: Array<string | [string, string?]>): GraphQLEnumType {
  const normalized = expressionLanguages.map<[string, string?]>(value => Array.isArray(value) ? value : [value]);
  return new GraphQLEnumType({
    name: 'ExpressionLanguage',
    description: 'blah',
    values: mapValues(fromPairs(normalized), (description, value) => ({ value, description }))
  });
}
