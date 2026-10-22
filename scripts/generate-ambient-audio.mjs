import { mkdirSync, writeFileSync } from 'node:fs';

// Procedural ambient loop: every tone completes whole cycles within the loop so it repeats
// without a click, and the sonar pings fully decay before the loop restarts.
const sampleRate = 16000;
const seconds = 12;
const length = sampleRate * seconds;

const pad = [
  { frequency: 55, gain: 0.32, lfo: 0, phase: 0 },
  { frequency: 661 / seconds, gain: 0.22, lfo: 1, phase: 0.6 },
  { frequency: 82.5, gain: 0.18, lfo: 1, phase: 1.7 },
  { frequency: 110, gain: 0.12, lfo: 2, phase: 0.3 },
  { frequency: 130.75, gain: 0.07, lfo: 3, phase: 2.2 },
  { frequency: 164.75, gain: 0.04, lfo: 2, phase: 4.1 },
];
const pings = [
  { start: 1.5, frequency: 880, gain: 0.07 },
  { start: 6.5, frequency: 659.25, gain: 0.05 },
];

const samples = new Float64Array(length);
for (let index = 0; index < length; index += 1) {
  const time = index / sampleRate;
  let value = 0;
  for (const tone of pad) {
    const swell =
      tone.lfo === 0
        ? 1
        : 0.55 + 0.45 * Math.sin((2 * Math.PI * tone.lfo * time) / seconds + tone.phase);
    value += tone.gain * swell * Math.sin(2 * Math.PI * tone.frequency * time);
  }
  for (const ping of pings) {
    const elapsed = time - ping.start;
    if (elapsed < 0) continue;
    const attack = Math.min(1, elapsed / 0.01);
    value +=
      ping.gain *
      attack *
      Math.exp(-elapsed / 0.7) *
      Math.sin(2 * Math.PI * ping.frequency * elapsed);
  }
  samples[index] = value;
}

const peak = samples.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
const data = Buffer.alloc(length * 2);
samples.forEach((value, index) => {
  data.writeInt16LE(Math.round((value / peak) * 0.6 * 32767), index * 2);
});

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + data.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(data.length, 40);

mkdirSync('assets/audio', { recursive: true });
writeFileSync('assets/audio/ambient-loop.wav', Buffer.concat([header, data]));
console.log(`assets/audio/ambient-loop.wav (${seconds}s, ${sampleRate} Hz)`);
