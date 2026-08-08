export const colors = {
  background: {
    primary: '#070B12',
    elevated: '#0D1620',
  },
  surface: {
    card: '#111D28EE',
    pressed: '#183040',
    glass: '#0C1824CC',
  },
  text: {
    primary: '#F4F7FA',
    secondary: '#9EB1BF',
    inverse: '#07110F',
  },
  accent: {
    primary: '#55F2D0',
    secondary: '#F2B84B',
    muted: '#123C3A',
  },
  status: {
    success: '#75D59B',
    warning: '#F2C572',
    danger: '#FF8E8E',
    locked: '#8B99A8',
  },
  border: {
    subtle: '#29404E',
    focused: '#8DFFE7',
    signal: '#55F2D044',
  },
  evidence: {
    selected: '#234D5A',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const typography = {
  display: { fontSize: 38, lineHeight: 44, fontWeight: '800' as const },
  screenTitle: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const },
  sectionTitle: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '700' as const },
  log: { fontSize: 14, lineHeight: 20, fontFamily: 'monospace' },
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const layout = {
  minTouchTarget: 48,
  maxContentWidth: 720,
} as const;
