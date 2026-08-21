import { render } from '@testing-library/react-native';

import { AppErrorBoundary } from '@/components/AppErrorBoundary';
import { useSettingsStore } from '@/stores/useSettingsStore';

function BrokenScreen({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('test render failure');
  return null;
}

describe('AppErrorBoundary', () => {
  it('shows a safe fallback without exposing the error detail', async () => {
    useSettingsStore.getState().setLanguage('tr');
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      const screen = await render(
        <AppErrorBoundary>
          <BrokenScreen shouldThrow />
        </AppErrorBoundary>,
      );

      expect(screen.getByText('İnceleme güvenli biçimde durduruldu')).toBeTruthy();
      expect(screen.queryByText('test render failure')).toBeNull();
      expect(screen.getByRole('button', { name: 'Yeniden dene' })).toBeTruthy();
    } finally {
      consoleError.mockRestore();
      consoleWarn.mockRestore();
    }
  });
});
