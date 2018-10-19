import { GraphQLString, GraphQLScalarType, ValueNode } from 'graphql';

type Validator = (value: any) => any;

class GraphQLValidatedScalar extends GraphQLScalarType {
  private validators: Validator[] = [];

  constructor(type: GraphQLScalarType, config: { name: string, description?: string }) {
    super({
      ...config,
      serialize: (value: any) => type.serialize(value),
      parseValue: (value: any) => this.validate(type.parseValue(value)),
      parseLiteral: (ast: ValueNode, variables: { [key: string]: any } | undefined | null) =>
        this.validate(type.parseLiteral(ast, variables))
      });
  }

  protected validate(value: any): any {
    return this.validators.reduce((result, validator) => validator(result), value);
  }

  protected validator(validator: Validator): this {
    this.validators.push(validator);
    return this;
  }
}

export class GraphQLValidatedString extends GraphQLValidatedScalar {
  constructor(config: { name: string, description?: string }) {
    super(GraphQLString, config);
  }

  nonEmpty(): this {
    return this.validator((value: string) => {
      if (!value || !value.length) {
        throw new TypeError(`${this.name} cannot be blank`);
      }
      return value;
    });
  }
}
