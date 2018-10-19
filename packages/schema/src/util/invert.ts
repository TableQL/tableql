export function invert(obj: Record<string, any>): Record<string, string> {
  return Object.keys(obj).reduce((r: Record<string, string>, key) => (r[obj[key]] = key, r), {});
}
