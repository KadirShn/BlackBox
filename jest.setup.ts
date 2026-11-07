jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    loop: false,
    seekTo: jest.fn(async () => undefined),
    setPlaybackRate: jest.fn(),
    volume: 1,
  })),
  setAudioModeAsync: jest.fn(async () => undefined),
}));

jest.mock('expo-store-review', () => ({
  isAvailableAsync: jest.fn(async () => true),
  requestReview: jest.fn(async () => undefined),
}));
