import { GraphQLEnumType } from 'graphql';
import { HitPolicy } from '../table';
import { invert, pick, mapValues } from '../util';

const descriptions: { [key: string]: string } = {
  [HitPolicy.UNIQUE]: 'Uuu',
  [HitPolicy.ANY]: 'Aaa',
  [HitPolicy.PRIORITY]: 'Ppp',
  [HitPolicy.FIRST]: 'Fff',
  [HitPolicy.RULE_ORDER]: 'Rrr',
  [HitPolicy.OUTPUT_ORDER]: 'Ooo',
  [HitPolicy.COLLECT]: 'Ccc',
  [HitPolicy.COLLECT_SUM]: 'C++',
  [HitPolicy.COLLECT_COUNT]: 'C##',
  [HitPolicy.COLLECT_MIN]: 'C<<',
  [HitPolicy.COLLECT_MAX]: 'C>>'
};

const InvertedHitPolicy = invert(HitPolicy);

export function buildHitPolicyType(hitPolicies: HitPolicy[]): GraphQLEnumType {
  return new GraphQLEnumType({
    name: 'HitPolicy',
    description: 'blah',
    values: mapValues(invert(pick(InvertedHitPolicy, hitPolicies)), value => ({
      value,
      description: descriptions[value]
    }))
  });
}
