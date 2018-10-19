import { or, equal } from '..';

test('matches by either of the two properties', () => {
  expect([
    { a: 1, b: 3 },
    { a: 2, b: 2 },
    { a: 3, b: 1 }
  ].filter(or(equal('a', 1), equal('b', 1)))).not.toContainEqual({ a: 2, b: 2 });
});

test('short-circuit', () => {
  const mockWhere = jest.fn();
  expect([{ a: 0 }].filter(or(equal('a', 0), mockWhere)).length).toBe(1);
  expect(mockWhere).not.toBeCalled();
});
