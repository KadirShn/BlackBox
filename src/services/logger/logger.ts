type LogDetails = Readonly<Record<string, string | number | boolean | null>>;

export const logger = {
  warn(message: string, details?: LogDetails): void {
    if (__DEV__) {
      console.warn(message, details ?? {});
    }
  },
};
