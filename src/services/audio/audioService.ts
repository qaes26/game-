// Ultra-Low Latency Frontend Audio Service for LUMI
// Clean bridge to unified AudioManager singleton

import { audioManager, AudioManager } from '../../audio/AudioManager';

export const audioService = audioManager;
export type { AudioManager };

