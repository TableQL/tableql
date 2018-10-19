import { where } from './Where';

/**
 * Returns a predicate that tests for property `value` equality.
 *
 * ```
 * [{ name: 'a' }, { name: 'b' }, { name: 'c' }].filter(and('name', 'c'));
 * // result is [{ name: 'c' }]
 * ```
 *
 * @param property the name of a property
 * @param value the value of an property
 * @param valueFunction the function that will be invoked with the input to the predicate
 */
export const equal = <T extends { [key: string]: any }>(
  attribute: string,
  value: any,
  valueFunction: (t: T) => any = t => t[attribute],
) =>
  where(
    (t: T) => value === valueFunction(t),
    v => v.equal(attribute, value, valueFunction),
  );
