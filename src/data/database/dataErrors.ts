export class DataValidationError extends Error {
  public constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'DataValidationError';
  }
}

export function parseStoredJson(value: string, context: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch (error: unknown) {
    throw new DataValidationError(`Invalid JSON stored for ${context}`, { cause: error });
  }
}
