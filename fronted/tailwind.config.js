/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hh-indigo': {
          DEFAULT: '#2e2870',
          dark: '#1e1a4f',
          deep: '#15123a',
        },
        'hh-purple': {
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        'hh-lavender': {
          DEFAULT: '#c4b5fd',
          light: '#ede9fe',
          soft: '#f5f3ff',
          deep: '#8b5cf6',
        },
        'hh-pink': {
          DEFAULT: '#f472b6',
          light: '#fce7f3',
          neon: '#ec4899',
        },
        'hh-mint': {
          DEFAULT: '#5eead4',
          light: '#ccfbf1',
          teal: '#14b8a6',
        },
        'hh-cyan': {
          DEFAULT: '#7dd3fc',
          light: '#e0f2fe',
        },
        'hh-yellow': {
          DEFAULT: '#fde047',
          light: '#fef08a',
          warm: '#facc15',
        },
        'hh-cream': {
          DEFAULT: '#faf9f6',
          light: '#ffffff',
        },
      },
      fontFamily: {
        display: ['"Bowlby One"', '"Rammetto One"', '"Archivo Black"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'retro-sm': '3px 3px 0 #2e2870',
        'retro': '5px 5px 0 #2e2870',
        'retro-lg': '8px 8px 0 #2e2870',
        'retro-pink': '5px 5px 0 #f472b6',
        'retro-yellow': '5px 5px 0 #fde047',
        'glow-pastel': '0 0 30px rgba(196, 181, 253, 0.6)',
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'bob': 'bob 3s ease-in-out infinite',
        'bob-slow': 'bob-slow 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-3d': 'float3D 6s ease-in-out infinite',
        'float-3d-slow': 'float3DSlow 8s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bobSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
