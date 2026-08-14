import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { renderBuilderPass, renderPfpAvatar, CARD_WIDTH, CARD_HEIGHT, PFP_SIZE } from '../lib/canvasCompositor';

const PassCard3D = forwardRef(function PassCard3D({
  format = 'card',
  image = null,
  name = 'YOUR NAME',
  stack = 'rust · react · rickshaws',
  role = 'BUILDER',
  title = 'Sunset Prompt Whisperer',
  badgeId = '#HH-GOA-0017',
  themeId = 'glitch',
  zoom = 1,
  pan = { x: 0, y: 0 },
  filter = 'normal',
  stickers = [],
  onPanChange = null,
}, ref) {
  const canvasRef = useRef(null);
  const cardContainerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, isHovered: false });
  const [htmlImg, setHtmlImg] = useState(null);

  // Load HTML Image element when image src changes
  useEffect(() => {
    if (!image) {
      setHtmlImg(null);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!cancelled) setHtmlImg(img);
    };
    img.onerror = () => {
      if (!cancelled) setHtmlImg(null);
    };
    img.src = image;
    return () => {
      cancelled = true;
    };
  }, [image]);

  // Expose canvas through ref for downloads
  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  // Re-render canvas whenever fields change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (format === 'card') {
      canvas.width = CARD_WIDTH;
      canvas.height = CARD_HEIGHT;
      renderBuilderPass(ctx, {
        image: htmlImg,
        name,
        stack,
        role,
        title,
        badgeId,
        themeId,
        zoom,
        pan,
        filter,
        stickers,
      });
    } else {
      canvas.width = PFP_SIZE;
      canvas.height = PFP_SIZE;
      renderPfpAvatar(ctx, {
        image: htmlImg,
        role,
        themeId,
        zoom,
        pan,
        filter,
      });
    }
  }, [format, htmlImg, name, stack, role, title, badgeId, themeId, zoom, pan, filter, stickers]);

  // 3D Parallax Tilt Handler
  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -12; // tilt X
    const ry = ((x - centerX) / centerX) * 12;  // tilt Y

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rx, ry, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  // Drag photo support on card surface
  const handlePointerDown = (e) => {
    if (!onPanChange || !htmlImg) return;
    e.preventDefault();
    const startX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const startY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    const initialPan = { ...pan };

    const handleMove = (moveEvent) => {
      const curX = moveEvent.clientX ?? (moveEvent.touches && moveEvent.touches[0]?.clientX) ?? 0;
      const curY = moveEvent.clientY ?? (moveEvent.touches && moveEvent.touches[0]?.clientY) ?? 0;
      const dx = (curX - startX) / 120;
      const dy = (curY - startY) / 120;

      onPanChange({
        x: Math.max(-1, Math.min(1, initialPan.x + dx)),
        y: Math.max(-1, Math.min(1, initialPan.y + dy)),
      });
    };

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[420px] mx-auto py-4">
      {/* 3D Physical Lanyard Strap Hanging from Top (Glitch Paradise Lavender/Lilac Ribbon) */}
      {format === 'card' && (
        <div className="relative z-10 flex flex-col items-center -mb-7 pointer-events-none lanyard-sway">
          {/* Lanyard Fabric Loop */}
          <div className="w-10 h-24 bg-gradient-to-b from-[#7c3aed] via-[#c4b5fd] to-[#f472b6] border-x-2 border-hh-indigo rounded-t-md shadow-md flex items-center justify-center">
            <span className="text-[7px] font-mono font-black text-hh-indigo uppercase tracking-widest rotate-90 whitespace-nowrap">
              #HHG-GOA-26
            </span>
          </div>

          {/* Metallic / Pastel Clip Hook */}
          <div className="relative -mt-1 w-6 h-9 rounded-sm bg-gradient-to-b from-gray-200 via-white to-gray-300 border-2 border-hh-indigo shadow-md flex flex-col items-center justify-end pb-0.5">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-hh-indigo bg-[#c4b5fd]"></div>
          </div>
        </div>
      )}

      {/* 3D Perspective Card Container */}
      <div
        ref={cardContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        className="badge-3d-perspective relative w-full cursor-grab active:cursor-grabbing transition-transform duration-100"
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className={`badge-3d-card relative w-full overflow-hidden rounded-[2.2rem] border-2 border-hh-indigo shadow-[8px_12px_0_#2e2870] ${
            format === 'pfp' ? 'aspect-square' : 'aspect-[2/3]'
          }`}
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${
              tilt.isHovered ? 1.02 : 1
            }, ${tilt.isHovered ? 1.02 : 1}, 1)`,
            '--mouse-x': `${tilt.glareX}%`,
            '--mouse-y': `${tilt.glareY}%`,
            '--glare-opacity': tilt.isHovered ? 0.35 : 0,
            '--holo-pos': `${tilt.glareX}% ${tilt.glareY}%`,
            '--holo-opacity': tilt.isHovered ? 0.3 : 0,
          }}
        >
          {/* Real High-Resolution Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain block bg-[#ede9fe]"
            aria-label="Hacker House Goa generated pass"
          />

          {/* Interactive Holographic Glare Sheen Layers */}
          <div className="badge-holo-sheen" />
          <div className="badge-glare" />

          {/* 3D Drag Hint Overlay */}
          {htmlImg && (
            <div className="absolute bottom-2 right-2 z-30 px-2 py-0.5 rounded-md bg-black/60 text-[9px] font-mono text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              ⠿ Drag to Pan
            </div>
          )}
        </div>
      </div>

      {/* Under-Card Micro Hint */}
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-hh-indigo/80 font-bold">
        <span className="w-2 h-2 rounded-full bg-hh-pink animate-ping"></span>
        <span>Hover or move mouse over badge for 3D holographic tilt</span>
      </div>
    </div>
  );
});

export default PassCard3D;
