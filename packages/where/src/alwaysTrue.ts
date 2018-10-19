import { where } from './Where';

/**
 * Returns a predicate that always evaluates to `true`.
 */
export const alwaysTrue = () => where((t: any) => true, v => v.alwaysTrue());
