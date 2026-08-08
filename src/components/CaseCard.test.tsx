import { fireEvent, render } from '@testing-library/react-native';

import { CaseCard } from '@/components/CaseCard';

describe('CaseCard', () => {
  it('opens an available case', async () => {
    const onPress = jest.fn();
    const screen = await render(
      <CaseCard
        difficulty="Eğitim"
        estimatedMinutes={5}
        numberLabel="DOSYA / 00"
        onPress={onPress}
        status="available"
        statusLabel="Hazır"
        summary="Özet"
        title="Kayıp 11 Dakika"
      />,
    );
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not open a locked case', async () => {
    const onPress = jest.fn();
    const screen = await render(
      <CaseCard
        difficulty="Kolay"
        estimatedMinutes={8}
        numberLabel="DOSYA / 01"
        onPress={onPress}
        status="locked"
        statusLabel="Kilitli"
        summary="Özet"
        title="Gece Rotası"
      />,
    );
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
