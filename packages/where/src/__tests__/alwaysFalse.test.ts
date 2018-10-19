import { alwaysFalse } from '..';

describe('alwaysFalse', () => {
  test('matches none', () => {
    expect([1, 2, 3].filter(alwaysFalse())).toEqual([]);
  });
});
