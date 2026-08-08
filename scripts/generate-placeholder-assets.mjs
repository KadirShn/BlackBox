import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) === 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const output = Buffer.alloc(12 + data.length);
  output.writeUInt32BE(data.length, 0);
  name.copy(output, 4);
  data.copy(output, 8);
  output.writeUInt32BE(crc32(Buffer.concat([name, data])), 8 + data.length);
  return output;
}

function createCanvas(size, background) {
  const pixels = new Uint8Array(size * size * 4);
  const setPixel = (x, y, color) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const offset = (y * size + x) * 4;
    pixels.set(color, offset);
  };
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) setPixel(x, y, background);
  return { size, pixels, setPixel };
}

function roundedRect(canvas, x0, y0, x1, y1, radius, color) {
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const dx = Math.max(x0 + radius - x, 0, x - (x1 - radius - 1));
      const dy = Math.max(y0 + radius - y, 0, y - (y1 - radius - 1));
      if (dx * dx + dy * dy <= radius * radius) canvas.setPixel(x, y, color);
    }
  }
}

function circle(canvas, cx, cy, radius, color) {
  for (let y = cy - radius; y <= cy + radius; y += 1)
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) canvas.setPixel(x, y, color);
    }
}

function line(canvas, x0, y0, x1, y1, width, color) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let step = 0; step <= steps; step += 1) {
    const ratio = step / steps;
    circle(
      canvas,
      Math.round(x0 + (x1 - x0) * ratio),
      Math.round(y0 + (y1 - y0) * ratio),
      Math.round(width / 2),
      color,
    );
  }
}

function drawMark(size, transparent = false, monochrome = false) {
  const scale = size / 1024;
  const canvas = createCanvas(size, transparent ? [0, 0, 0, 0] : [11, 15, 20, 255]);
  const p = (value) => Math.round(value * scale);
  const cyan = monochrome ? [255, 255, 255, 255] : [85, 214, 190, 255];
  const white = [244, 247, 250, 255];
  roundedRect(
    canvas,
    p(224),
    p(224),
    p(800),
    p(800),
    p(104),
    monochrome ? white : [21, 31, 42, 255],
  );
  line(canvas, p(272), p(224), p(752), p(224), p(48), cyan);
  line(canvas, p(224), p(272), p(224), p(752), p(48), cyan);
  line(canvas, p(272), p(800), p(752), p(800), p(48), cyan);
  line(canvas, p(800), p(272), p(800), p(752), p(48), cyan);
  if (!monochrome) {
    line(canvas, p(332), p(650), p(470), p(512), p(48), white);
    line(canvas, p(470), p(512), p(562), p(604), p(48), white);
    line(canvas, p(562), p(604), p(704), p(424), p(48), white);
    circle(canvas, p(704), p(424), p(48), [242, 197, 114, 255]);
  }
  return canvas;
}

function writePng(path, canvas) {
  const scanlines = Buffer.alloc((canvas.size * 4 + 1) * canvas.size);
  for (let y = 0; y < canvas.size; y += 1) {
    const destination = y * (canvas.size * 4 + 1);
    scanlines[destination] = 0;
    Buffer.from(canvas.pixels.subarray(y * canvas.size * 4, (y + 1) * canvas.size * 4)).copy(
      scanlines,
      destination + 1,
    );
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(canvas.size, 0);
  header.writeUInt32BE(canvas.size, 4);
  header[8] = 8;
  header[9] = 6;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(scanlines, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  writeFileSync(path, png);
}

writePng('assets/images/icon.png', drawMark(1024));
writePng('assets/images/android-icon-foreground.png', drawMark(1024, true));
writePng('assets/images/android-icon-background.png', createCanvas(1024, [11, 15, 20, 255]));
writePng('assets/images/android-icon-monochrome.png', drawMark(432, true, true));
writePng('assets/images/splash-icon.png', drawMark(512, true));
writePng('assets/images/favicon.png', drawMark(64));
