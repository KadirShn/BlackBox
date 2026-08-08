import { act, render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { AppText } from '@/components/AppText';
import { useSettingsStore } from '@/stores/useSettingsStore';

describe('large text accessibility', () => {
  afterEach(async () => {
    await act(() => useSettingsStore.getState().setTextSize('normal'));
  });

  it('scales font size and line height without disabling system font scaling', async () => {
    await act(() => useSettingsStore.getState().setTextSize('extra-large'));
    const screen = await render(
      <AppText style={{ fontSize: 20, lineHeight: 28 }}>Readable</AppText>,
    );
    const text = screen.getByText('Readable');
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({ fontSize: 26, lineHeight: 36.4 });
    expect(text.props.allowFontScaling).toBe(true);
  });
});
