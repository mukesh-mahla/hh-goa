import React from 'react';

// Natural, elegant Tropical Palm Tree with realistic curved fronds, feathered leaflets, and moving sea breeze animations
export const PalmTree = ({ className = '', flip = false }) => (
  <svg
    viewBox="0 0 240 320"
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Trunk Gradient */}
      <linearGradient id="trunkGrad" x1="0" y1="320" x2="240" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4c1d95" />
        <stop offset="40%" stopColor="#7c3aed" />
        <stop offset="75%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#c4b5fd" />
      </linearGradient>

      {/* Primary Leaf Gradient (Lush Mint & Aqua) */}
      <linearGradient id="leafGrad1" x1="60" y1="30" x2="20" y2="150" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="50%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>

      {/* Secondary Leaf Gradient (Pastel Emerald & Lime) */}
      <linearGradient id="leafGrad2" x1="120" y1="10" x2="220" y2="130" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5eead4" />
        <stop offset="60%" stopColor="#2dd4bf" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>

      {/* Back Frond Shadow Gradient */}
      <linearGradient id="leafGradBack" x1="100" y1="20" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0f766e" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>

      {/* Coconut Gradient */}
      <radialGradient id="coconutGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="40%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
    </defs>

    {/* ================= BACKGROUND FRONDS (Deep Shadow Layer with Wind Motion) ================= */}
    <g opacity="0.85">
      {/* Back Left Drooping Frond */}
      <g className="frond-wind-left">
        <path
          d="M120 125 C95 105 50 95 10 135 C35 125 65 120 90 128 C102 125 112 125 120 125 Z"
          fill="url(#leafGradBack)"
        />
        <path
          d="M10 135 Q25 110 45 115 Q65 95 90 108 Q110 95 120 125 Q105 118 85 120 Q60 122 35 128 Z"
          fill="url(#leafGradBack)"
        />
      </g>

      {/* Back Right Drooping Frond */}
      <g className="frond-wind-right">
        <path
          d="M120 125 C145 100 190 90 230 130 C205 120 175 115 150 122 C138 123 128 124 120 125 Z"
          fill="url(#leafGradBack)"
        />
        <path
          d="M230 130 Q215 105 195 110 Q175 90 150 105 Q130 95 120 125 Q135 115 155 116 Q180 118 205 124 Z"
          fill="url(#leafGradBack)"
        />
      </g>

      {/* Back Top Upright Frond */}
      <g className="frond-wind-top">
        <path
          d="M120 125 C118 80 110 40 105 10 C115 35 122 75 125 105 Z"
          fill="url(#leafGradBack)"
        />
      </g>
    </g>

    {/* ================= NATURAL SEGMENTED CURVED TRUNK ================= */}
    <g>
      {/* Trunk Base & Body with Realistic Organic Curve */}
      <path
        d="M100 320 
           C108 260 112 200 116 140 
           C117 132 118 126 120 125 
           C124 127 125 133 126 142 
           C132 200 138 260 144 320 
           Z"
        fill="url(#trunkGrad)"
        stroke="#2e2870"
        strokeWidth="2.5"
      />

      {/* Natural Trunk Ridges / Bark Rings */}
      {[
        { y: 300, w: 40, x: 104 },
        { y: 280, w: 37, x: 106 },
        { y: 260, w: 34, x: 108 },
        { y: 240, w: 31, x: 110 },
        { y: 220, w: 28, x: 111 },
        { y: 200, w: 25, x: 113 },
        { y: 180, w: 22, x: 114 },
        { y: 160, w: 19, x: 115 },
        { y: 140, w: 16, x: 117 },
      ].map((ring, idx) => (
        <path
          key={idx}
          d={`M${ring.x} ${ring.y} Q${ring.x + ring.w / 2} ${ring.y - 4} ${ring.x + ring.w} ${ring.y}`}
          stroke="#2e2870"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* Trunk Highlight Stroke */}
      <path
        d="M112 315 C118 255 122 195 124 135"
        stroke="#ede9fe"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>

    {/* ================= FOREGROUND NATURAL PALM FRONDS (Moving Wind Layers) ================= */}

    {/* 1. TOP-LEFT NATURAL ARCHING FROND */}
    <g className="frond-wind-left">
      <path
        d="M120 125 C100 80 65 50 15 45"
        stroke="#2e2870"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 125
           C110 95 90 70 50 50 
           L42 58 C75 75 92 98 102 120 
           Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M95 80 C80 60 55 45 15 45 C35 55 58 72 75 92 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M75 68 C55 50 35 42 5 48 C25 58 48 70 60 85 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M50 55 C35 45 18 42 0 52 C15 58 32 68 40 76 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
    </g>

    {/* 2. TOP-RIGHT NATURAL ARCHING FROND */}
    <g className="frond-wind-right">
      <path
        d="M120 125 C140 80 175 48 225 42"
        stroke="#2e2870"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 125
           C130 95 150 70 190 48 
           L198 56 C165 73 148 96 138 120 
           Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M145 78 C160 58 185 44 225 42 C205 52 182 70 165 90 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M165 66 C185 48 205 40 235 45 C215 55 192 68 180 83 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M190 53 C205 43 222 40 240 50 C225 56 208 66 200 74 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
    </g>

    {/* 3. CENTER-TOP UPRIGHT CROWN FROND */}
    <g className="frond-wind-top">
      <path
        d="M120 125 C122 75 125 35 130 5"
        stroke="#2e2870"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M120 125 C115 85 110 50 115 8 C122 25 126 60 124 125 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M120 125 C125 85 130 50 135 5 C130 30 125 70 122 125 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M120 85 C108 65 95 50 80 45 C98 58 112 75 118 92 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.2"
      />
      <path
        d="M124 85 C136 65 148 50 165 45 C146 58 132 75 126 92 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.2"
      />
    </g>

    {/* 4. MID-LEFT DROOPING NATURAL FROND */}
    <g className="frond-wind-left">
      <path
        d="M120 125 C85 110 45 115 5 155"
        stroke="#2e2870"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 125 C95 115 65 118 20 148 C45 135 78 130 110 132 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M95 120 C75 112 45 118 8 152 C32 138 65 132 88 130 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M70 122 C52 118 30 125 0 162 C20 146 45 138 65 134 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
    </g>

    {/* 5. MID-RIGHT DROOPING NATURAL FROND */}
    <g className="frond-wind-right">
      <path
        d="M120 125 C155 110 195 115 235 155"
        stroke="#2e2870"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M120 125 C145 115 175 118 220 148 C195 135 162 130 130 132 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M145 120 C165 112 195 118 232 152 C208 138 175 132 152 130 Z"
        fill="url(#leafGrad1)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
      <path
        d="M170 122 C188 118 210 125 240 162 C220 146 195 138 175 134 Z"
        fill="url(#leafGrad2)"
        stroke="#2e2870"
        strokeWidth="1.5"
      />
    </g>

    {/* ================= TROPICAL COCONUTS BUNCH (Moving with Crown) ================= */}
    <g className="coconuts-wind">
      <circle cx="112" cy="128" r="9" fill="url(#coconutGrad)" stroke="#2e2870" strokeWidth="2" />
      <path d="M108 124 Q111 120 115 122" stroke="#fef08a" strokeWidth="1.5" fill="none" />

      <circle cx="128" cy="130" r="9" fill="url(#coconutGrad)" stroke="#2e2870" strokeWidth="2" />
      <path d="M124 126 Q127 122 131 124" stroke="#fef08a" strokeWidth="1.5" fill="none" />

      <circle cx="120" cy="136" r="8" fill="url(#coconutGrad)" stroke="#2e2870" strokeWidth="2" />
      <path d="M117 132 Q119 129 123 131" stroke="#fef08a" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

// 3D Floating Isometric Pastel Cube (from Glitch Paradise reference image)
export const IsoCube = ({ className = '', size = 50, color1 = '#f472b6', color2 = '#c4b5fd', color3 = '#5eead4' }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ width: size, height: size }}>
    <polygon points="50,15 85,35 50,55 15,35" fill={color1} stroke="#2e2870" strokeWidth="3" />
    <polygon points="85,35 85,75 50,95 50,55" fill={color2} stroke="#2e2870" strokeWidth="3" />
    <polygon points="15,35 50,55 50,95 15,75" fill={color3} stroke="#2e2870" strokeWidth="3" />
  </svg>
);

// 3D Floating Isometric Pyramid (from Glitch Paradise reference image)
export const IsoPyramid = ({ className = '', size = 60, color1 = '#7dd3fc', color2 = '#c4b5fd' }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ width: size, height: size }}>
    <polygon points="50,10 15,85 50,95" fill={color1} stroke="#2e2870" strokeWidth="3" />
    <polygon points="50,10 85,85 50,95" fill={color2} stroke="#2e2870" strokeWidth="3" />
  </svg>
);

// 3D Pastel Torus / Ring
export const IsoTorus = ({ className = '', size = 45 }) => (
  <svg viewBox="0 0 80 80" className={className} style={{ width: size, height: size }}>
    <ellipse cx="40" cy="40" rx="32" ry="18" fill="#fde047" stroke="#2e2870" strokeWidth="3.5" />
    <ellipse cx="40" cy="40" rx="16" ry="8" fill="#e0e7ff" stroke="#2e2870" strokeWidth="3" />
  </svg>
);

// Pastel Sun with Outline
export const Sun = ({ className = '' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <circle cx="40" cy="40" r="20" fill="#fde047" stroke="#2e2870" strokeWidth="3" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <line
        key={a}
        x1="40"
        y1="40"
        x2={40 + 32 * Math.cos((a * Math.PI) / 180)}
        y2={40 + 32 * Math.sin((a * Math.PI) / 180)}
        stroke="#fde047"
        strokeWidth="4"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

// Pastel Cloud
export const Cloud = ({ className = '' }) => (
  <svg viewBox="0 0 100 50" className={className}>
    <ellipse cx="25" cy="30" rx="18" ry="15" fill="#ffffff" opacity="0.9" />
    <ellipse cx="50" cy="25" rx="22" ry="18" fill="#ffffff" opacity="0.95" />
    <ellipse cx="75" cy="30" rx="18" ry="14" fill="#ffffff" opacity="0.9" />
    <ellipse cx="25" cy="30" rx="18" ry="15" stroke="#c4b5fd" strokeWidth="2" fill="none" />
    <ellipse cx="50" cy="25" rx="22" ry="18" stroke="#c4b5fd" strokeWidth="2" fill="none" />
    <ellipse cx="75" cy="30" rx="18" ry="14" stroke="#c4b5fd" strokeWidth="2" fill="none" />
  </svg>
);

// Bird
export const Bird = ({ className = '' }) => (
  <svg viewBox="0 0 40 20" className={className}>
    <path d="M2 12 Q10 2 20 12 Q30 2 38 12" stroke="#2e2870" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Pastel Wave Divider
export const Wave = ({ className = '', color = '#c4b5fd' }) => (
  <svg viewBox="0 0 400 40" className={className} preserveAspectRatio="none">
    <path d="M0 20 Q50 0 100 20 T200 20 T300 20 T400 20 L400 40 L0 40 Z" fill={color} />
  </svg>
);

// Zigzag
export const Zigzag = ({ className = '', color = '#f472b6' }) => (
  <svg viewBox="0 0 200 20" className={className} preserveAspectRatio="none">
    <path d="M0 10 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20 L140 0 L160 20 L180 0 L200 10" stroke={color} strokeWidth="4" fill="none" />
  </svg>
);
