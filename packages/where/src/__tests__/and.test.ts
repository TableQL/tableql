import { and, equal } from '..';

test('matches by the two properties', () => {
  expect([
    { a: 0, b: 0 },
    { a: 0, b: 1 },
    { a: 0, b: 1 }
  ].filter(and(equal('a', 0), equal('b', 1)))).not.toContainEqual({ a: 0, b: 0 });
});

test('short-circuit', () => {
  const mockWhere = jest.fn();
  expect([{ a: 0 }].filter(and(equal('a', 1), mockWhere)).length).toBe(0);
  expect(mockWhere).not.toBeCalled();
});
