import { where } from './Where';

/**
 * Returns a predicate that always evaluates to `false`.
 */
export const alwaysFalse = () => where((t: any) => false, v => v.alwaysFalse());
