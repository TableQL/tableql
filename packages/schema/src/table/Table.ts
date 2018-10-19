import { HitPolicy } from './HitPolicy';
import { Input } from './Input';
import { Output } from './Output';

/**
 * A tabular represantation of inputs and outputs.
 */
export interface Table {
  id: string;
  name: string;
  hitPolicy: HitPolicy | null;
  inputs: Input[];
  outputs: Output[];
  rows: string[][];
}
