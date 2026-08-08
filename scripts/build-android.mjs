import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const androidRoot = resolve(projectRoot, 'android');
const requestedVariant = process.argv[2];

const variants = {
  debug: {
    task: 'app:assembleDebug',
    gradleArgs: ['-PreactNativeArchitectures=x86_64'],
    source: 'app/build/outputs/apk/debug/app-debug.apk',
    artifact: 'black-box-debug.apk',
  },
  preview: {
    task: 'app:assembleRelease',
    gradleArgs: ['-PreactNativeArchitectures=x86_64'],
    source: 'app/build/outputs/apk/release/app-release.apk',
    artifact: 'black-box-preview.apk',
  },
};

if (requestedVariant !== 'debug' && requestedVariant !== 'preview') {
  console.error('Kullanım: node scripts/build-android.mjs <debug|preview>');
  process.exit(1);
}

const variant = variants[requestedVariant];
const wrapper = resolve(androidRoot, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
const build = spawnSync(wrapper, [variant.task, ...variant.gradleArgs, '--console=plain'], {
  cwd: androidRoot,
  env: {
    ...process.env,
    NODE_ENV: requestedVariant === 'preview' ? 'production' : 'development',
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (build.error) {
  console.error(build.error.message);
  process.exit(1);
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const source = resolve(androidRoot, variant.source);
const destination = resolve(projectRoot, 'artifacts/builds', variant.artifact);
mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
console.log(`APK hazır: ${destination}`);
