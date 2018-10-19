import { GraphQLValidatedString } from './definition';

export const GraphQLNonEmptyString = new GraphQLValidatedString({
  name: 'NonEmptyString',
  description: 'Represents a non-empty string.'
}).nonEmpty();
