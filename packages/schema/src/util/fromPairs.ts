export function fromPairs<T>(pairs: ArrayLike<[string, T?]> | null): Record<string, T | undefined> {
  let index = -1;
  const length = pairs === null ? 0 : pairs.length;
  const result: Record<string, T | undefined> = {};

  while (++index < length) {
    const pair = pairs![index];
    result[pair[0]] = pair[1];
  }
  return result;
}
