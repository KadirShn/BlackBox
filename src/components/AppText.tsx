import { StyleSheet, Text, type TextProps } from 'react-native';

import { getTextScale, useSettingsStore } from '@/stores/useSettingsStore';

export function AppText({ style, ...props }: TextProps) {
  const textSize = useSettingsStore((state) => state.textSize);
  const flattened = StyleSheet.flatten(style);
  const scale = getTextScale(textSize);
  const scaledStyle = {
    fontSize: typeof flattened?.fontSize === 'number' ? flattened.fontSize * scale : undefined,
    lineHeight:
      typeof flattened?.lineHeight === 'number' ? flattened.lineHeight * scale : undefined,
  };
  return <Text {...props} allowFontScaling style={[style, scaledStyle]} />;
}
