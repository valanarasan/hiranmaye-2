import { CanvasTexture, SRGBColorSpace } from 'three';
import type { HeroCard, SceneConfig } from '@/content/scene';

/**
 * Every face in the hero is drawn with the 2D canvas API rather than loaded as
 * an image: the words then come from `src/content` like the rest of the site,
 * and the hero ships no asset files at all.
 */

function finish(canvas: HTMLCanvasElement): CanvasTexture {
  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function posterTexture(config: SceneConfig): CanvasTexture {
  const W = 1024;
  const H = Math.round((W * config.panel.height) / config.panel.width);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return finish(canvas);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = config.colors.hairline;
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, W - 8, H - 8);

  drawLotus(ctx, 150, 214, 96, config.colors.accent);

  ctx.fillStyle = config.colors.muted;
  ctx.font = '500 21px Inter, Helvetica, sans-serif';
  ctx.fillText(config.poster.eyebrow, 272, 116);

  ctx.fillStyle = config.colors.accent;
  ctx.fillRect(272, 134, 80, 4);

  // One line per line: the poster never wraps, so the copy in content/scene.ts
  // is exactly what appears, and nothing can collide at an awkward width.
  ctx.fillStyle = config.colors.ink;
  ctx.font = '400 92px "Playfair Display", Georgia, serif';
  config.poster.lines.forEach((line, index) => {
    ctx.fillText(line, 272, 222 + index * 96);
  });

  ctx.fillStyle = '#a2740f';
  ctx.font = 'italic 400 40px "Playfair Display", Georgia, serif';
  ctx.fillText(config.poster.closer, 272, 222 + config.poster.lines.length * 96 + 26);

  return finish(canvas);
}

export function cardTexture(card: HeroCard, config: SceneConfig): CanvasTexture {
  const W = 512;
  const H = 320;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return finish(canvas);

  ctx.fillStyle = card.accent ? config.colors.ink : '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // A printed card has a trim edge. On a white page that edge is the only thing
  // separating the card from the background, so it carries real weight.
  ctx.strokeStyle = card.accent ? 'rgba(207,154,40,0.7)' : config.colors.hairline;
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, W - 6, H - 6);

  ctx.fillStyle = config.colors.accent;
  ctx.fillRect(44, 96, 48, 4);

  ctx.fillStyle = card.accent ? '#f4f6fa' : config.colors.ink;
  ctx.font = '500 50px "Playfair Display", Georgia, serif';
  ctx.fillText(card.label, 44, 174);

  ctx.fillStyle = card.accent ? 'rgba(244,246,250,0.65)' : config.colors.muted;
  ctx.font = '400 22px Inter, Helvetica, sans-serif';
  ctx.fillText(card.sub, 44, 212);

  ctx.fillStyle = card.accent ? 'rgba(207,154,40,0.9)' : config.colors.hairline;
  ctx.fillRect(W - 74, H - 58, 30, 4);

  return finish(canvas);
}

/** The lotus mark: five filled petals fanned from one base point. */
function drawLotus(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  colour: string,
): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = colour;
  for (let i = -2; i <= 2; i += 1) {
    const h = size * (1 - Math.abs(i) * 0.16);
    ctx.save();
    ctx.rotate(i * 0.44);
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.55, h * 0.2, h * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}
