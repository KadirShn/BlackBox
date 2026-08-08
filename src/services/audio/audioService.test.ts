import { createAudioPlayer } from 'expo-audio';

import { playUiSound } from '@/services/audio/audioService';

describe('UI audio service', () => {
  it('stays silent when effects are disabled', async () => {
    await playUiSound('selection', false);
    expect(createAudioPlayer).not.toHaveBeenCalled();
  });

  it('lazily creates and reuses a low-volume player', async () => {
    await playUiSound('success', true);
    await playUiSound('success', true);
    expect(createAudioPlayer).toHaveBeenCalledTimes(1);
  });
});
