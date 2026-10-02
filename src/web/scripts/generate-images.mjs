#!/usr/bin/env node
/**
 * Generates the raster brand images at build time (into public/, git-ignored) from SVG sources:
 *   og-image.png / .webp / .avif   1200x630 Open Graph / Twitter card (PNG is what crawlers fetch)
 *   apple-touch-icon.png           180x180
 *   icon-192.png, icon-512.png (+ .webp)  web app manifest icons
 * The app itself renders no raster images (UI is CSS + inline SVG; video thumbnails come from YouTube),
 * so these are the only rasters shipped.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(pub, { recursive: true });

const NAVY = '#1f3a8a';
const NAVY_DARK = '#13245a';
const AMBER = '#fbbf24';

const mark = (size, x = 0, y = 0) => `
  <g transform="translate(${x} ${y}) scale(${size / 32})">
    <rect width="32" height="32" rx="8" fill="${NAVY}"/>
    <path d="M8 23V9l8 8 8-8v14" fill="none" stroke="${AMBER}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="110" r="260" fill="#ffffff" opacity="0.05"/>
  <circle cx="1150" cy="560" r="180" fill="${AMBER}" opacity="0.08"/>
  <g transform="translate(96 150)">
    <rect width="132" height="132" rx="32" fill="#ffffff" opacity="0.08"/>
    ${mark(116, 8, 8)}
  </g>
  <text x="270" y="250" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="92" font-weight="700" fill="#ffffff">Mastemy</text>
  <text x="96" y="380" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff">Learn from free video lessons.</text>
  <text x="96" y="440" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="44" font-weight="700" fill="${AMBER}">Prove it with real practice.</text>
  <text x="96" y="530" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="28" fill="#dbe4ff">Study notes · MCQ practice · Knowledge-assessment certificates</text>
</svg>`;

const icon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${NAVY}"/>
  ${mark(size * 0.8, size * 0.1, size * 0.1)}
</svg>`;

async function emit(svg, base, formats) {
  const img = sharp(Buffer.from(svg));
  for (const f of formats) {
    const out = path.join(pub, `${base}.${f}`);
    const pipeline =
      f === 'png'
        ? img.clone().png({ compressionLevel: 9, palette: true, quality: 90 })
        : f === 'webp'
          ? img.clone().webp({ quality: 82 })
          : img.clone().avif({ quality: 55 });
    const buf = await pipeline.toBuffer();
    writeFileSync(out, buf);
    console.log(`  ${path.relative(process.cwd(), out)} ${(buf.length / 1024).toFixed(1)} kB`);
  }
}

console.log('generating brand images');
await emit(og, 'og-image', ['png', 'webp', 'avif']);
await emit(icon(180), 'apple-touch-icon', ['png']);
await emit(icon(192), 'icon-192', ['png', 'webp']);
await emit(icon(512), 'icon-512', ['png', 'webp']);
