const url = '_~0125634789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function nonSecureId(size = 21): string {
  let id = '';
  while (0 < size--) {
    id += url[Math.random() * 64 | 0];
  }
  return id;
}
