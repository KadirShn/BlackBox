jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn(async () => undefined),
    setPlaybackRate: jest.fn(),
    volume: 1,
  })),
  setAudioModeAsync: jest.fn(async () => undefined),
}));
