import { act, render } from '@testing-library/react-native';
import { Animated } from 'react-native';

import { AppText } from '@/components/AppText';
import { ScreenFrame } from '@/components/ScreenFrame';
import { useSettingsStore } from '@/stores/useSettingsStore';

describe('reduced motion', () => {
  afterEach(async () => {
    await act(() => useSettingsStore.getState().setReduceMotion(false));
    jest.restoreAllMocks();
  });

  it('skips the entrance timing animation when enabled', async () => {
    await act(() => useSettingsStore.getState().setReduceMotion(true));
    const timing = jest.spyOn(Animated, 'timing');
    await render(
      <ScreenFrame>
        <AppText>Content</AppText>
      </ScreenFrame>,
    );
    expect(timing).not.toHaveBeenCalled();
  });
});
