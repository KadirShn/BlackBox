export function firstRouteParam(value: string | string[] | undefined): string | null {
  if (typeof value === 'string') return value;
  return value?.[0] ?? null;
}
