import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { CaseCard } from '@/components/CaseCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { layout } from '@/theme/tokens';

describe('small-screen and screen-reader basics', () => {
  it('keeps long case content flexible and exposes a disabled state', async () => {
    const screen = await render(
      <CaseCard
        difficulty="Orta"
        estimatedMinutes={15}
        numberLabel="DOSYA / 03"
        onPress={jest.fn()}
        status="locked"
        statusLabel="Kilitli"
        summary="Dar ekranlarda birden çok satıra yayılması gereken uzun vaka açıklaması."
        title="Yanlış Yolcu ve Uzun Bir Erişilebilir Başlık"
      />,
    );
    expect(screen.getByRole('button').props.accessibilityState).toEqual({ disabled: true });
    expect(screen.getByText(/Dar ekranlarda/)).toBeTruthy();
  });

  it('keeps the primary control at least 48 dp tall', async () => {
    const screen = await render(<PrimaryButton label="Devam et" onPress={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(StyleSheet.flatten(button.props.style).minHeight).toBe(layout.minTouchTarget);
  });
});
