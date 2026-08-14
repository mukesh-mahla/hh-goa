import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { BRAND } from '../lib/constants';

export default function Navbar({ onScrollToStudio }) {
  return (
    <nav className="relative z-30 flex items-center justify-between px-4 md:px-12 py-5 max-w-7xl mx-auto">
      {/* Top Left: Mini Logo & Edition */}
      <a href="#" className="flex items-center gap-3 group">
        <div className="w-10 h-10 flex items-center justify-center bg-hh-yellow rounded-xl border-2 border-hh-indigo font-display text-hh-indigo text-lg shadow-[3px_3px_0_#2e2870] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
          HH
        </div>
        <div className="flex flex-col">
          <div className="font-display text-sm tracking-widest text-hh-indigo flex items-center gap-2">
            <span>{BRAND.edition}</span>
            <span className="chip chip-pink text-[8px] py-0.5 px-1.5 hidden sm:inline-block">
              GLITCH PARADISE
            </span>
          </div>
          <span className="font-mono text-[10px] text-hh-indigo/70 tracking-wider">
            {BRAND.location}
          </span>
        </div>
      </a>

      {/* Top Right: CTA & Live Builder Pass Counter */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border-2 border-hh-indigo font-mono text-[11px] text-hh-indigo shadow-[2px_2px_0_#2e2870]">
          <span className="w-2 h-2 rounded-full bg-hh-mint animate-pulse"></span>
          <span>1,428 passes minted</span>
        </div>

        <button
          type="button"
          onClick={onScrollToStudio}
          className="btn-yellow px-4 md:px-6 py-2.5 rounded-xl flex items-center gap-2 text-xs md:text-sm font-bold shadow-[3px_3px_0_#f472b6]"
        >
          <span>BUILD YOUR PASS</span>
          <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
