import { Table } from './Table';
import { HitPolicy } from './HitPolicy';
import { Input } from './Input';
import { Output } from './Output';

export abstract class AbstractTable implements Table {
  id!: string;
  name!: string;
  hitPolicy!: HitPolicy | null;
  inputs: Input[] = [];
  outputs: Output[] = [];
  rows: string[][] = [];
}
