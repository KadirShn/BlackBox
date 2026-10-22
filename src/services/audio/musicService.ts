import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

import { logger } from '@/services/logger/logger';

const AMBIENT_LOOP = require('../../../assets/audio/ambient-loop.wav') as number;

let player: AudioPlayer | null = null;

async function getPlayer(): Promise<AudioPlayer> {
  if (player !== null) return player;
  await setAudioModeAsync({ interruptionMode: 'mixWithOthers' });
  const created = createAudioPlayer(AMBIENT_LOOP, { keepAudioSessionActive: false });
  created.loop = true;
  created.volume = 0.35;
  player = created;
  return created;
}

export async function setAmbientMusicPlaying(playing: boolean): Promise<void> {
  try {
    if (!playing) {
      player?.pause();
      return;
    }
    const current = await getPlayer();
    current.play();
  } catch (error: unknown) {
    logger.warn('Ambient music unavailable', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
  }
}
