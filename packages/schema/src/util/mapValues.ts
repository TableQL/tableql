export function mapValues<T, U>(obj: Record<string, T>, f: (value: T, key: string) => U): Record<string, U> {
  return Object.entries(obj).reduce((r: Record<string, U>, [key, value]) => (r[key] = f(value, key), r), {});
}
