import { createLogger } from '@/services/logger/logger';

describe('logger', () => {
  it('does not emit production logs', () => {
    const sink = jest.fn();
    const productionLogger = createLogger(false, sink);

    productionLogger.warn('not emitted', { reason: 'test' });

    expect(sink).not.toHaveBeenCalled();
  });

  it('emits structured development diagnostics', () => {
    const sink = jest.fn();
    const developmentLogger = createLogger(true, sink);

    developmentLogger.warn('diagnostic', { reason: 'Error' });

    expect(sink).toHaveBeenCalledWith('diagnostic', { reason: 'Error' });
  });
});
