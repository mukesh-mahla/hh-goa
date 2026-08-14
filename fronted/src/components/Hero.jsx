import React from 'react';
import { ArrowDown, Sparkles, Image as ImageIcon, Flame } from 'lucide-react';
import { BRAND } from '../lib/constants';
import { PalmTree, Cloud, Bird, IsoCube, IsoPyramid, IsoTorus, Zigzag, Sun } from './Decorations';

export default function Hero({ onSelectFormat }) {
  return (
    <section className="relative z-10 px-4 md:px-10 pt-4 pb-20 overflow-hidden">
      {/* 3D Floating Isometric Shapes with Interactive Hover Reactions */}
      <div className="absolute top-12 left-8 md:left-24 animate-float-3d hover-iso-shape hidden sm:block">
        <IsoCube size={50} color1="#f472b6" color2="#c4b5fd" color3="#5eead4" />
      </div>
      <div className="absolute top-28 right-12 md:right-28 animate-float-3d-slow hover-iso-shape hidden sm:block">
        <IsoPyramid size={58} color1="#7dd3fc" color2="#c4b5fd" />
      </div>
      <div className="absolute bottom-20 left-16 md:left-32 animate-float-3d hover-iso-shape hidden sm:block">
        <IsoTorus size={46} />
      </div>
      <div className="absolute bottom-24 right-20 animate-float-3d-slow hover-iso-shape hidden sm:block">
        <IsoCube size={42} color1="#fde047" color2="#f472b6" color3="#7dd3fc" />
      </div>

      {/* Background Floating Decor Elements */}
      <Cloud className="absolute top-4 left-1/4 w-20 md:w-28 opacity-70 animate-bob-slow pointer-events-none hover:opacity-100 transition-opacity" />
      <Cloud className="absolute top-8 right-1/4 w-16 md:w-24 opacity-60 animate-bob pointer-events-none hover:opacity-100 transition-opacity" />
      <Bird className="absolute top-16 left-1/3 w-8 pointer-events-none hover:scale-125 transition-transform" />
      <Bird className="absolute top-20 right-1/3 w-6 pointer-events-none hover:scale-125 transition-transform" />
      
      {/* Natural Animated Swaying Palm Trees */}
      <PalmTree className="absolute top-8 right-2 md:right-10 w-36 md:w-64 hidden sm:block animate-tree-right pointer-events-auto" />
      <PalmTree className="absolute top-6 left-2 md:left-8 w-32 md:w-56 opacity-95 hidden sm:block animate-tree-left pointer-events-auto" flip />

      <div className="relative max-w-5xl mx-auto text-center pt-2 md:pt-6">
        {/* Top Floating Badge with Hover Glow */}
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/95 text-hh-indigo border-2 border-hh-indigo font-mono text-xs font-black shadow-[3px_3px_0_#f472b6] rotate-[-2deg] hover:rotate-0 hover:scale-105 hover:shadow-[5px_5px_0_#f472b6] transition-all cursor-pointer">
          <Sparkles className="w-4 h-4 text-hh-pink fill-hh-pink animate-pulse" />
          <span>HACKER HOUSE GOA // GLITCH PARADISE</span>
        </div>

        {/* 3D Stacked Logo with Interactive Hover Pop */}
        <div className="relative inline-block my-2 hover-logo-pop select-none">
          <div className="relative">
            {/* Top HACKER */}
            <div
              className="font-display text-[60px] sm:text-[90px] md:text-[120px] lg:text-[145px] leading-[0.85] text-white tracking-wider transition-colors hover:text-hh-yellow"
              style={{
                WebkitTextStroke: '4px #2e2870',
                filter: 'drop-shadow(6px 6px 0px #2e2870)',
              }}
            >
              HACKER
            </div>

            {/* Overlaid गोवा Calligraphy with Hover Magnification */}
            <div
              className="hindi-script absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 font-serif italic text-hh-pink text-[50px] sm:text-[80px] md:text-[105px] leading-none pointer-events-none rotate-[-6deg] transition-all duration-300"
              style={{
                WebkitTextStroke: '2.5px #2e2870',
                filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.8))',
              }}
            >
              गोवा
            </div>

            {/* Bottom HOUSE */}
            <div
              className="font-display text-[60px] sm:text-[90px] md:text-[120px] lg:text-[145px] leading-[0.85] text-white tracking-wider transition-colors hover:text-hh-yellow"
              style={{
                WebkitTextStroke: '4px #2e2870',
                filter: 'drop-shadow(6px 6px 0px #2e2870)',
              }}
            >
              HOUSE
            </div>
          </div>
        </div>

        {/* Tagline Subhead with Hover Tilt */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="font-mono text-xs md:text-sm font-black tracking-[0.25em] text-hh-indigo uppercase bg-white/90 px-5 py-1.5 rounded-full border-2 border-hh-indigo shadow-[2px_2px_0_#c4b5fd] hover:shadow-[4px_4px_0_#f472b6] hover:scale-105 transition-all cursor-default">
            GLITCH PARADISE · 28–31 OCT 2026
          </span>
        </div>

        {/* Main Punchy Headline */}
        <div className="mt-8 space-y-1 group cursor-default">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-hh-indigo tracking-tight group-hover:translate-x-1 transition-transform">
            Make your mark.
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-hh-pink tracking-tight drop-shadow-[2px_2px_0px_#2e2870] group-hover:-translate-x-1 transition-transform">
            Hang it loud.
          </h2>
        </div>

        {/* Description Copy */}
        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base font-mono text-hh-indigo/90 leading-relaxed font-semibold">
          Upload your photo. Get your Hacker House Goa ID card. Download it, share it,
          and let the internet know you're building from the sand.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onSelectFormat('card')}
            className="btn-pink px-8 py-4 rounded-2xl text-sm md:text-base tracking-wider flex items-center gap-2.5 shadow-[5px_5px_0_#2e2870]"
          >
            <span>BUILD YOUR CARD</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => onSelectFormat('pfp')}
            className="btn-lavender px-7 py-4 rounded-2xl text-sm md:text-base tracking-wider flex items-center gap-2.5 shadow-[5px_5px_0_#2e2870]"
          >
            <ImageIcon className="w-5 h-5 text-hh-indigo group-hover:rotate-12 transition-transform" />
            <span>GENERATE PFP FRAME</span>
          </button>
        </div>

        {/* Interactive Vibe keywords with Bouncy Hover */}
        <div className="mt-10 flex items-center justify-center gap-4 font-mono text-xs tracking-widest text-hh-indigo font-bold flex-wrap">
          <div className="vibe-tag-hover px-3.5 py-1.5 rounded-full bg-white/70 border-2 border-hh-indigo shadow-[2px_2px_0_#2e2870] flex items-center gap-1.5">
            <span>🌴</span>
            <span>SUN</span>
          </div>
          <span>•</span>
          <div className="vibe-tag-hover px-3.5 py-1.5 rounded-full bg-white/70 border-2 border-hh-indigo shadow-[2px_2px_0_#2e2870] flex items-center gap-1.5">
            <span>💻</span>
            <span>CODE</span>
          </div>
          <span>•</span>
          <div className="vibe-tag-hover px-3.5 py-1.5 rounded-full bg-white/70 border-2 border-hh-indigo shadow-[2px_2px_0_#2e2870] flex items-center gap-1.5">
            <span>✨</span>
            <span>VIBES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
