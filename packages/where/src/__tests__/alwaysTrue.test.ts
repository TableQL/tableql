import { alwaysTrue } from '..';

test('matches all', () => {
  expect([1, 2, 3].filter(alwaysTrue())).toEqual([1, 2, 3]);
});
