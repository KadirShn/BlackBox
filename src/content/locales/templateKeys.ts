// Generated content carries its variable values inside the translation key:
// "daily.server.trigger.body?system=ATLAS-3&time=01:42" fills {system} and {time}.
export type TemplateParams = Readonly<Record<string, string>>;

export function withParams(key: string, params: TemplateParams): string {
  const query = Object.entries(params)
    .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
    .join('&');
  return query.length === 0 ? key : `${key}?${query}`;
}

export function splitTemplateKey(key: string): { base: string; params: Record<string, string> } {
  const separator = key.indexOf('?');
  if (separator < 0) return { base: key, params: {} };
  const params: Record<string, string> = {};
  for (const pair of key.slice(separator + 1).split('&')) {
    const [name, value = ''] = pair.split('=');
    if (name !== undefined && name.length > 0) {
      params[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  }
  return { base: key.slice(0, separator), params };
}

const placeholderPattern = /\{(\w+)\}/g;

export function fillTemplate(text: string, params: Readonly<Record<string, string>>): string {
  return text.replace(placeholderPattern, (match, name: string) => params[name] ?? match);
}

export function missingPlaceholders(
  text: string,
  params: Readonly<Record<string, string>>,
): string[] {
  return [...text.matchAll(placeholderPattern)]
    .map((match) => match[1] ?? '')
    .filter((name) => params[name] === undefined);
}
