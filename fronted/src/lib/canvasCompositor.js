// High-resolution Canvas Compositor for Hacker House Goa 2026 - Glitch Paradise Theme
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { THEMES } from './constants';

export const CARD_WIDTH = 800;
export const CARD_HEIGHT = 1200;
export const PFP_SIZE = 1080;

/**
 * Helper to draw image with cover fit, zoom, pan, and CSS filter emulation
 */
function drawImageWithTransform(ctx, img, x, y, w, h, zoom = 1, panX = 0, panY = 0, filterId = 'normal') {
  if (!img) return;

  ctx.save();
  if (filterId === 'sunset') {
    ctx.filter = 'sepia(0.15) saturate(1.3) contrast(1.05)';
  } else if (filterId === 'vintage') {
    ctx.filter = 'contrast(1.1) brightness(1.08) saturate(1.1) sepia(0.15)';
  } else if (filterId === 'cyber') {
    ctx.filter = 'contrast(1.2) saturate(1.4) hue-rotate(15deg)';
  } else if (filterId === 'golden') {
    ctx.filter = 'brightness(1.08) saturate(1.25) sepia(0.2)';
  } else if (filterId === 'bw') {
    ctx.filter = 'grayscale(1) contrast(1.25)';
  } else {
    ctx.filter = 'none';
  }

  const imgRatio = img.width / img.height;
  const frameRatio = w / h;
  let drawW, drawH;

  if (imgRatio > frameRatio) {
    drawH = h * zoom;
    drawW = h * zoom * imgRatio;
  } else {
    drawW = w * zoom;
    drawH = (w * zoom) / imgRatio;
  }

  const centerX = x + w / 2;
  const centerY = y + h / 2;
  const offsetX = (panX * (drawW - w)) / 2;
  const offsetY = (panY * (drawH - h)) / 2;

  const finalX = centerX - drawW / 2 + offsetX;
  const finalY = centerY - drawH / 2 + offsetY;

  ctx.drawImage(img, finalX, finalY, drawW, drawH);
  ctx.restore();
}

/**
 * Generates an in-memory Barcode Canvas
 */
function createBarcodeCanvas(codeString) {
  const canvas = document.createElement('canvas');
  try {
    JsBarcode(canvas, codeString.replace(/[^A-Za-z0-9_-]/g, ''), {
      format: 'CODE128',
      width: 2.2,
      height: 48,
      displayValue: false,
      margin: 4,
      background: '#2e2870',
      lineColor: '#ffffff',
    });
    return canvas;
  } catch {
    return null;
  }
}

/**
 * Generates an in-memory QR Code Canvas
 */
async function createQrCodeCanvas(text) {
  const canvas = document.createElement('canvas');
  try {
    await QRCode.toCanvas(canvas, text, {
      width: 90,
      margin: 1,
      color: {
        dark: '#2e2870',
        light: '#ffffff',
      },
    });
    return canvas;
  } catch {
    return null;
  }
}

/**
 * Draw the Sun illustration peeking right behind photo frame
 */
function drawSunIllustration(ctx, x, y, radius = 48, sunColor = '#fde047') {
  ctx.save();
  ctx.translate(x, y);

  // Radial Rays
  ctx.strokeStyle = sunColor;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  const rayCount = 9;
  for (let i = 0; i < rayCount; i++) {
    const angle = (Math.PI / (rayCount - 1)) * i;
    const innerR = radius + 6;
    const outerR = radius + 18;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * innerR, -Math.sin(angle) * innerR);
    ctx.lineTo(Math.cos(angle) * outerR, -Math.sin(angle) * outerR);
    ctx.stroke();
  }

  // Sun Semi-Circle
  ctx.fillStyle = sunColor;
  ctx.beginPath();
  ctx.arc(0, 0, radius, Math.PI, 0, false);
  ctx.fill();
  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

/**
 * Renders the Official Hacker House Goa Builder ID Card (Glitch Paradise Theme)
 */
export async function renderBuilderPass(ctx, {
  image = null,
  name = "YOUR NAME",
  stack = "rust · react · rickshaws",
  role = "BUILDER",
  title = "Sunset Prompt Whisperer",
  badgeId = "#HH-GOA-0017",
  themeId = "glitch",
  zoom = 1,
  pan = { x: 0, y: 0 },
  filter = "normal",
  stickers = [],
}) {
  const W = CARD_WIDTH;
  const H = CARD_HEIGHT;
  const theme = THEMES[themeId] || THEMES.glitch;

  ctx.clearRect(0, 0, W, H);

  // Outer Rounded Bezel
  const cardRadius = 38;
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, cardRadius);
  ctx.fill();

  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();

  // Clip within card boundaries
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(3, 3, W - 6, H - 6, cardRadius - 3);
  ctx.clip();

  // --- 1. RETRO BROWSER TOP BAR WITH TRAFFIC LIGHTS ---
  const barH = 50;
  ctx.fillStyle = '#ede9fe';
  ctx.fillRect(0, 0, W, barH);
  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, barH);
  ctx.lineTo(W, barH);
  ctx.stroke();

  // Traffic light dots (red, yellow, green)
  const dotY = 25;
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(36, dotY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#2e2870';
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(58, dotY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#2e2870';
  ctx.stroke();

  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(80, dotY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#2e2870';
  ctx.stroke();

  // Lanyard punch cutout at top center
  const slotW = 140;
  const slotH = 18;
  const slotX = (W - slotW) / 2;
  const slotY = 16;

  ctx.fillStyle = '#2e2870';
  ctx.beginPath();
  ctx.roundRect(slotX, slotY, slotW, slotH, 9);
  ctx.fill();

  // Browser Address bar text at top right
  ctx.fillStyle = '#2e2870';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('hhg.goa // glitch-paradise', W - 32, 30);

  // --- 2. HEADER BANNER WITH PASTEL GRADIENT ---
  const headerH = 225;
  const headerY = barH;

  const headerGrad = ctx.createLinearGradient(0, headerY, 0, headerY + headerH);
  headerGrad.addColorStop(0, theme.headerBg);
  headerGrad.addColorStop(1, theme.badgeBg);
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, headerY, W, headerH);

  // Subtle pastel grid lines
  ctx.strokeStyle = 'rgba(46, 40, 112, 0.08)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < W; gx += 28) {
    ctx.beginPath();
    ctx.moveTo(gx, headerY);
    ctx.lineTo(gx, headerY + headerH);
    ctx.stroke();
  }

  // Top Logo: "HACKER HOUSE" with crisp indigo stroke
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px "Bowlby One", "Rammetto One", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '2px';

  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 8;
  ctx.strokeText('HACKER HOUSE', W / 2, headerY + 65);
  ctx.fillText('HACKER HOUSE', W / 2, headerY + 65);

  // Overlaid "गोवा" in neon magenta-pink script
  ctx.fillStyle = '#f472b6';
  ctx.font = '900 38px "DM Serif Display", sans-serif';
  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 6;
  ctx.strokeText('गोवा', W / 2 + 100, headerY + 67);
  ctx.fillText('गोवा', W / 2 + 100, headerY + 67);

  // "★ GLITCH PARADISE PASS ★"
  ctx.fillStyle = '#2e2870';
  ctx.font = '900 15px "JetBrains Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('★ GLITCH PARADISE BUILDER PASS ★', W / 2, headerY + 118);
  ctx.restore();

  // --- 3. SUN ILLUSTRATION PEEKING BEHIND PHOTO FRAME ---
  const photoSize = 340;
  const photoX = (W - photoSize) / 2;
  const photoY = headerY + 135;
  drawSunIllustration(ctx, photoX + photoSize + 25, photoY + 20, 52, theme.accentYellow);

  // --- 4. MAIN CARD BODY (LIGHT PASTEL CREAM / WHITE) ---
  const bodyY = headerY + headerH;
  const bodyH = H - bodyY - 140;

  ctx.fillStyle = theme.bodyBg;
  ctx.fillRect(0, bodyY, W, bodyH);

  // Subtle dither/grid
  ctx.strokeStyle = 'rgba(46, 40, 112, 0.05)';
  ctx.lineWidth = 1;
  for (let py = bodyY; py < bodyY + bodyH; py += 24) {
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(W, py);
    ctx.stroke();
  }

  // --- 5. PHOTO FRAME ---
  const photoRadius = 24;

  ctx.save();
  ctx.shadowColor = 'rgba(46, 40, 112, 0.2)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, photoRadius);
  ctx.fill();

  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // Draw Photo or Placeholder
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(photoX + 4, photoY + 4, photoSize - 8, photoSize - 8, photoRadius - 4);
  ctx.clip();

  if (image) {
    drawImageWithTransform(
      ctx,
      image,
      photoX + 4,
      photoY + 4,
      photoSize - 8,
      photoSize - 8,
      zoom,
      pan?.x || 0,
      pan?.y || 0,
      filter
    );
  } else {
    ctx.fillStyle = '#ede9fe';
    ctx.fillRect(photoX + 4, photoY + 4, photoSize - 8, photoSize - 8);

    ctx.fillStyle = 'rgba(46, 40, 112, 0.5)';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('your photo here', photoX + photoSize / 2, photoY + photoSize / 2);
  }
  ctx.restore();

  // --- 6. BUILDER NAME WITH PINK BRUSH UNDERLINE ---
  const nameY = photoY + photoSize + 60;
  const displayName = (name || "YOUR NAME").trim().toUpperCase();

  ctx.save();
  ctx.fillStyle = '#2e2870';
  ctx.font = '900 40px "DM Serif Display", "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '1px';
  ctx.fillText(displayName, W / 2, nameY);

  // Pink brush underline scribble
  const nameWidth = Math.min(ctx.measureText(displayName).width + 30, 420);
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameWidth / 2, nameY + 28);
  ctx.quadraticCurveTo(W / 2, nameY + 34, W / 2 + nameWidth / 2, nameY + 26);
  ctx.stroke();
  ctx.restore();

  // --- 7. SUBTITLE / STACK TAGS ---
  const stackY = nameY + 65;
  const displayStack = (stack || "builder · dreamer · shipper").trim().toLowerCase();

  ctx.save();
  ctx.fillStyle = '#2e2870';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '1.5px';
  ctx.fillText(displayStack, W / 2, stackY);
  ctx.restore();

  // --- 8. BUILDER TITLE PILL BADGE ---
  const titleY = stackY + 45;
  const displayTitle = (title || "Sunset Prompt Whisperer").trim();

  ctx.save();
  ctx.font = '800 17px "JetBrains Mono", monospace';
  const titleTextW = ctx.measureText(displayTitle).width;
  const pillW = Math.max(titleTextW + 48, 280);
  const pillH = 46;
  const pillX = (W - pillW) / 2;

  // Pill Shadow
  ctx.fillStyle = 'rgba(46, 40, 112, 0.25)';
  ctx.beginPath();
  ctx.roundRect(pillX + 3, titleY - pillH / 2 + 3, pillW, pillH, 23);
  ctx.fill();

  // Pill Body
  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.roundRect(pillX, titleY - pillH / 2, pillW, pillH, 23);
  ctx.fill();

  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Title Text
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayTitle, W / 2, titleY);
  ctx.restore();

  // --- 8B. PINNED STICKERS ---
  if (stickers && stickers.length > 0) {
    ctx.save();
    stickers.slice(0, 3).forEach((st, idx) => {
      const sx = 60 + idx * 240;
      const sy = titleY + 45;
      
      ctx.fillStyle = st.bg || '#fde047';
      ctx.beginPath();
      ctx.roundRect(sx, sy, 190, 34, 17);
      ctx.fill();
      ctx.strokeStyle = '#2e2870';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = st.text || '#2e2870';
      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(st.label, sx + 95, sy + 17);
    });
    ctx.restore();
  }

  // --- 9. BOTTOM SECTION: PASTEL PURPLE/INDIGO BAR WITH BARCODE & QR CODE ---
  const footerH = 140;
  const footerY = H - footerH;

  ctx.fillStyle = '#2e2870';
  ctx.fillRect(0, footerY, W, footerH);

  // Border top line
  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, footerY);
  ctx.lineTo(W, footerY);
  ctx.stroke();

  // Left: Barcode + ID
  const barcodeCanvas = createBarcodeCanvas(badgeId || '#HH-GOA-0017');
  if (barcodeCanvas) {
    ctx.drawImage(barcodeCanvas, 40, footerY + 22, 200, 48);
  }

  ctx.save();
  ctx.fillStyle = '#fde047';
  ctx.font = '900 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(badgeId || '#HH-GOA-0017', 40, footerY + 98);
  ctx.restore();

  // Center-Right: #FrameInGoa & Info
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('#FrameInGoa', W - 160, footerY + 48);

  ctx.fillStyle = 'rgba(237, 233, 254, 0.85)';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillText('glitch paradise · vagator · 2026', W - 160, footerY + 80);
  ctx.restore();

  // Right: Real Scannable QR Code
  const qrCanvas = await createQrCodeCanvas('https://hackerhouse.goa/verify/' + (badgeId || '0017'));
  if (qrCanvas) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(W - 130, footerY + 18, 94, 94, 10);
    ctx.fill();
    ctx.strokeStyle = '#2e2870';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.drawImage(qrCanvas, W - 128, footerY + 20, 90, 90);
    ctx.restore();
  }

  ctx.restore(); // end card clip
}

/**
 * Renders the Official Hacker House Goa PFP Avatar Frame (Glitch Paradise Theme)
 */
export function renderPfpAvatar(ctx, {
  image = null,
  role = "BUILDER",
  themeId = "glitch",
  zoom = 1,
  pan = { x: 0, y: 0 },
  filter = "normal",
}) {
  const S = PFP_SIZE;
  const theme = THEMES[themeId] || THEMES.glitch;

  ctx.clearRect(0, 0, S, S);

  // Outer Squircle Border
  const outerPad = 16;
  const outerRadius = 140;

  ctx.save();
  const bezelGrad = ctx.createLinearGradient(0, 0, S, S);
  bezelGrad.addColorStop(0, '#c4b5fd');
  bezelGrad.addColorStop(0.5, '#f472b6');
  bezelGrad.addColorStop(1, '#5eead4');

  ctx.fillStyle = bezelGrad;
  ctx.beginPath();
  ctx.roundRect(0, 0, S, S, outerRadius);
  ctx.fill();

  const innerX = outerPad;
  const innerY = outerPad;
  const innerW = S - outerPad * 2;
  const innerH = S - outerPad * 2;
  const innerRadius = 120;

  ctx.beginPath();
  ctx.roundRect(innerX, innerY, innerW, innerH, innerRadius);
  ctx.clip();

  // Background
  ctx.fillStyle = '#FAF8FF';
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // User Photo
  if (image) {
    drawImageWithTransform(
      ctx,
      image,
      innerX,
      innerY,
      innerW,
      innerH,
      zoom,
      pan?.x || 0,
      pan?.y || 0,
      filter
    );
  } else {
    ctx.fillStyle = '#ede9fe';
    ctx.fillRect(innerX, innerY, innerW, innerH);

    ctx.fillStyle = '#2e2870';
    ctx.font = '800 36px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('UPLOAD PHOTO', S / 2, S / 2);
  }

  // Top-Left Branding
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 44px "Bowlby One", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 6;
  ctx.strokeText('HH GOA', innerX + 48, innerY + 48);
  ctx.fillText('HH GOA', innerX + 48, innerY + 48);

  ctx.fillStyle = '#f472b6';
  ctx.font = '900 24px "JetBrains Mono", monospace';
  ctx.fillText('2026 // GLITCH', innerX + 50, innerY + 104);

  // Top-Right Golden Sun
  drawSunIllustration(ctx, innerX + innerW - 90, innerY + 90, 50, theme.accentYellow);

  // Bottom Waves
  ctx.strokeStyle = '#5eead4';
  ctx.lineWidth = 6;
  for (let w = 0; w < 3; w++) {
    const wy = innerY + innerH - 70 + w * 18;
    ctx.beginPath();
    ctx.moveTo(innerX + 30, wy);
    for (let wx = innerX + 30; wx <= innerX + 340; wx += 40) {
      ctx.quadraticCurveTo(wx + 10, wy - 8, wx + 20, wy);
      ctx.quadraticCurveTo(wx + 30, wy + 8, wx + 40, wy);
    }
    ctx.stroke();
  }

  // Bottom-Right Role Badge
  const badgeW = 200;
  const badgeH = 54;
  const badgeX = innerX + innerW - badgeW - 40;
  const badgeY = innerY + innerH - badgeH - 40;

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 27);
  ctx.fill();
  ctx.strokeStyle = '#2e2870';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#2e2870';
  ctx.font = '900 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(role.toUpperCase(), badgeX + badgeW / 2, badgeY + badgeH / 2);

  ctx.restore();
}
