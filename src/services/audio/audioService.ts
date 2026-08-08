import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

import { logger } from '@/services/logger/logger';

export type UiSound = 'selection' | 'success' | 'warning';

const TONE_URI =
  'data:audio/wav;base64,UklGRqQCAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YYACAAAAAEcJ+hDYFRkXjxSpDmUGI/1o9KLt6unX6Wft/vOB/IoFmg1iE/MV5hRtEEsJrwAF+Lnw++uN6qbs6PFw+f4BKQqcEEoUnhSQEacL3wOD+/Lzae7N64TsbfDb9r3+xgajDTcSxxMVEnANoAbH/jD3GvGB7fbsjO/P9N37igOVCtUPchIFEqQO5Ai7AVf68fOR7+vtP+9Q82z5jwCMBz4NuBBtEUcPpApMBE/90fbj8U/vfe9f8nb36P2jBI0Krw5gEF4P2gtuBgAAoflc9AzxNvD48QL2pvvyAd4HcgzwDvcOigwWCFkCSfzj9gnzWPES8hH10/mM/0kFGQo2DSEOuQxACU0Es/5e+S71zvKe8p/0d/iB/eQCwAdJC+8McwzvCdIFzQC1+2D3gfSN86T0lPfb+8MAfQVBCXcLxgsmCuMGigLV/Yn5WvbK9BP1Jfej+vb+ZQM4B88JwwrxCYIH4gOs/5L7Qfg/9t31Jffa+Yb9jAFCBQ8IfwldCbQHzwQtAWj9HvrY9/D2hvd8+Xv8AAB2A00GEAh7CIEHUgVPAvn+3ft7+TX4O/iF+df7zP7lAaAEjAZdB/cGcAUOAzkAaf0U+5n5Mfnn+Zj79/2dABsDCQUaBiYGMgVrAyABtf6O/AX7VfqW+rb7gv2p/9ABnAPGBCEFowRpA6oBsv/X/WP8kvt/+yj8a/0P/8wAWQJ3A/sD1QMRA9YBWgDe/qD90vyP/N78q/3Q/hkATwFBAskC2AJwAqkBqACZ/6r+AP6z/cn9Of7r/r7/jQA3AaIBwQGWAS0BnAAAAHP/Cv/U/tX+Bf9Z/7z/HABpAJgApQCTAG0APAAPAO3/3v/f/+3/';

const players = new Map<UiSound, AudioPlayer>();
let configured = false;

async function getPlayer(kind: UiSound): Promise<AudioPlayer> {
  if (!configured) {
    await setAudioModeAsync({ interruptionMode: 'mixWithOthers' });
    configured = true;
  }
  const existing = players.get(kind);
  if (existing !== undefined) return existing;
  const player = createAudioPlayer(TONE_URI, { keepAudioSessionActive: false });
  player.volume = 0.18;
  player.setPlaybackRate(kind === 'success' ? 1.35 : kind === 'warning' ? 0.72 : 1);
  players.set(kind, player);
  return player;
}

export async function playUiSound(kind: UiSound, enabled: boolean): Promise<void> {
  if (!enabled) return;
  try {
    const player = await getPlayer(kind);
    await player.seekTo(0);
    player.play();
  } catch (error: unknown) {
    logger.warn('UI sound unavailable', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
  }
}
