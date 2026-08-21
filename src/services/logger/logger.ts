type LogDetails = Readonly<Record<string, string | number | boolean | null>>;

type LogSink = (message: string, details: LogDetails) => void;

type Logger = {
  warn: (message: string, details?: LogDetails) => void;
};

export function createLogger(enabled: boolean, sink: LogSink): Logger {
  return {
    warn(message, details = {}): void {
      if (enabled) sink(message, details);
    },
  };
}

export const logger = createLogger(__DEV__, (message, details) => {
  console.warn(message, details);
});
