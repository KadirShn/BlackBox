import { render } from '@testing-library/react-native';

import { EmptyState, LoadingState } from '@/components/StateViews';

describe('state views', () => {
  it('announces loading content', async () => {
    const screen = await render(<LoadingState label="Yükleniyor" />);
    expect(screen.getByText('Yükleniyor')).toBeTruthy();
  });

  it('renders an empty explanation', async () => {
    const screen = await render(<EmptyState message="Kayıt yok" title="Arşiv boş" />);
    expect(screen.getByText('Kayıt yok')).toBeTruthy();
  });
});
