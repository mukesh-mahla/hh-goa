import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PassCard3D from './components/PassCard3D';
import BuilderControls from './components/BuilderControls';
import BeachAudioPlayer from './components/BeachAudioPlayer';
import WebcamModal from './components/WebcamModal';
import { Wave, PalmTree, Sun, Bird, Zigzag, IsoCube, IsoPyramid, IsoTorus } from './components/Decorations';
import { BRAND } from './lib/constants';

export default function App() {
  // Pass State
  const [format, setFormat] = useState('card');
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [role, setRole] = useState('BUILDER');
  const [title, setTitle] = useState('Sunset Prompt Whisperer');
  const [badgeId, setBadgeId] = useState('#HH-GOA-0017');
  const [themeId, setThemeId] = useState('glitch');
  const [photo, setPhoto] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState('normal');
  const [selectedStickers, setSelectedStickers] = useState([
    { id: 'shipped', label: 'Shipped 🚀', bg: '#fde047', text: '#2e2870' },
    { id: 'goa', label: 'Goa Vibe 🌴', bg: '#5eead4', text: '#2e2870' },
  ]);

  // UI state
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState('');

  const passCardRef = useRef(null);
  const studioRef = useRef(null);

  const scrollToStudio = (chosenFormat = null) => {
    if (chosenFormat) setFormat(chosenFormat);
    studioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const link = localStorage.getItem("link")
   const handleShareX = () => {
    
    triggerCelebration();
    const tweetText = encodeURIComponent(
      `Just minted my Hacker House Goa 2026 // Glitch Paradise ${
        format === 'pfp' ? 'PFP Frame' : 'Builder Pass'
      }! 🌴💻\n\nTitle: "${title || 'Sunset Prompt Whisperer'}"\nBadge: ${badgeId}\n\nBuild on the sand: #FrameInGoa ${link}`
    );
    const tweetUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`, '_blank');
  };

  // Trigger celebration confetti
  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#c4b5fd', '#f472b6', '#5eead4', '#fde047', '#7dd3fc', '#ffffff'],
    });
  };

  // High-Resolution PNG Download
  const handleDownload = () => {
    const canvas = passCardRef.current?.getCanvas();
    if (!canvas) return;

    triggerCelebration();

    const link = document.createElement('a');
    const cleanName = (name || 'BUILDER').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    link.download = `HHGOA26-GLITCH-${format.toUpperCase()}-${cleanName}-${badgeId.replace('#', '')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Share to 𝕏 / Twitter Intent
 

  // Copy high-res image to clipboard
  const handleCopyImage = async () => {
    const canvas = passCardRef.current?.getCanvas();
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopiedStatus('image');
          triggerCelebration();
          setTimeout(() => setCopiedStatus(''), 2500);
        } else {
          alert('Direct image copy is not supported in this browser. Please use Download PNG!');
        }
      }, 'image/png');
    } catch {
      alert('Could not copy image to clipboard.');
    }
  };

  // Copy share URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedStatus('link');
    setTimeout(() => setCopiedStatus(''), 2500);
  };

  // Print Pass
  const handlePrint = () => {
    const canvas = passCardRef.current?.getCanvas();
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');

    const printWin = window.open('', '_blank');
    if (!printWin) return;
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hacker House Goa 2026 Pass — ${name || badgeId}</title>
          <style>
            @page { size: auto; margin: 0; }
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-width: 90vw; max-height: 95vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <div className="min-h-screen pastel-mesh-bg dotted-bg-pastel text-hh-indigo selection:bg-hh-pink selection:text-white relative overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar onScrollToStudio={() => scrollToStudio('card')} />

      {/* Hero Section */}
      <Hero onSelectFormat={scrollToStudio} />

      {/* Continuous Animated Marquee Ticker with Hover Pause */}
      <div className="relative z-20 bg-hh-yellow border-y-2 border-hh-indigo py-2.5 overflow-hidden shadow-md group cursor-pointer hover:bg-yellow-200 transition-colors">
        <div className="flex animate-ticker group-hover:[animation-play-state:paused] whitespace-nowrap gap-8 font-display text-hh-indigo text-sm md:text-base tracking-wider font-black">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>#FRAMEINGOA</span>
              <span>✦</span>
              <span>HACKER HOUSE GOA 2026</span>
              <span>✦</span>
              <span>GLITCH PARADISE</span>
              <span>✦</span>
              <span>BUILD ON THE BEACH</span>
              <span>✦</span>
              <span>28–31 OCT 2026</span>
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Interactive Studio Section (Matching Image 2 Layout) */}
      <section
        ref={studioRef}
        id="studio"
        className="relative z-10 py-16 px-4 md:px-10 bg-white/40 backdrop-blur-md border-t-2 border-hh-indigo overflow-hidden"
      >
        {/* Background Ambient Swaying Palm Trees */}
        <PalmTree className="absolute -bottom-10 -left-12 w-48 md:w-72 opacity-30 pointer-events-none animate-tree-left hidden lg:block" />
        <PalmTree className="absolute top-10 -right-16 w-48 md:w-72 opacity-30 pointer-events-none animate-tree-right hidden lg:block" flip />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="chip chip-pink mb-3">✦ LIVE BUILDER STUDIO ✦</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-hh-indigo stroked-indigo leading-tight">
              CREATE YOUR PASS
            </h2>
            <p className="mt-3 font-mono text-xs sm:text-sm text-hh-indigo/80 max-w-lg mx-auto font-semibold">
              Customizable Glitch Paradise ID badge & PFP frame. 3D parallax tilt, scannable barcode,
              dynamic titles, and retina-ready exports.
            </p>
          </div>

          {/* Two-Column Studio Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 3D Interactive Pass Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-8 order-2 lg:order-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-hh-indigo shadow-[6px_6px_0_#2e2870] relative overflow-hidden">
                {/* Floating header tag */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-hh-indigo/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400 border border-hh-indigo"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 border border-hh-indigo"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 border border-hh-indigo"></span>
                  </div>
                  <div className="font-mono text-[10px] text-hh-indigo/70 uppercase tracking-widest font-black">
                    {format === 'card' ? '3D GLITCH PASS' : 'PFP AVATAR FRAME'}
                  </div>
                </div>

                {/* 3D Tiltable Canvas Pass Card */}
                <PassCard3D
                  ref={passCardRef}
                  format={format}
                  image={photo}
                  name={name}
                  stack={stack}
                  role={role}
                  title={title}
                  badgeId={badgeId}
                  themeId={themeId}
                  zoom={zoom}
                  pan={pan}
                  filter={filter}
                  stickers={selectedStickers}
                  onPanChange={setPan}
                />
              </div>
            </div>

            {/* Right Column: Interactive Form Controls */}
            <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-hh-indigo shadow-[6px_6px_0_#2e2870] order-1 lg:order-2">
              <BuilderControls
                format={format}
                setFormat={setFormat}
                name={name}
                setName={setName}
                stack={stack}
                setStack={setStack}
                role={role}
                setRole={setRole}
                title={title}
                setTitle={setTitle}
                badgeId={badgeId}
                setBadgeId={setBadgeId}
                themeId={themeId}
                setThemeId={setThemeId}
                photo={photo}
                setPhoto={setPhoto}
                zoom={zoom}
                setZoom={setZoom}
                pan={pan}
                setPan={setPan}
                filter={filter}
                setFilter={setFilter}
                selectedStickers={selectedStickers}
                setSelectedStickers={setSelectedStickers}
                onOpenWebcam={() => setIsWebcamOpen(true)}
                onDownload={handleDownload}
                onShareX={handleShareX}
                onCopyImage={handleCopyImage}
                onCopyLink={handleCopyLink}
                onPrint={handlePrint}
                copiedStatus={copiedStatus}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 bg-white/70 backdrop-blur-md border-t-2 border-hh-indigo text-center font-mono text-xs text-hh-indigo/80">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg text-hh-indigo">HHG / 26</span>
            <span>•</span>
            <span className="font-black text-hh-indigo">HACKER HOUSE GOA // GLITCH PARADISE</span>
          </div>

          <p className="text-[11px] text-hh-indigo/70 max-w-md font-semibold">
            {BRAND.dates} · {BRAND.location} · {BRAND.campus} · Beachside residency for builders, hackers, and creators.
          </p>

          <div className="flex items-center gap-4 text-hh-indigo text-[11px] font-black">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline hover:text-hh-pink">
              𝕏 / Twitter
            </a>
            <span>•</span>
            <a href="#" onClick={() => scrollToStudio('card')} className="hover:underline hover:text-hh-pink">
              Generator
            </a>
            <span>•</span>
            <span className="text-hh-pink">#FrameInGoa</span>
          </div>
        </div>
      </footer>

      {/* Floating Ambient Beach Soundscape Player */}
      <BeachAudioPlayer />

      {/* Live Webcam Snapshot Modal */}
      <WebcamModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCapture={(imgData) => {
          setPhoto(imgData);
          setZoom(1.0);
          setPan({ x: 0, y: 0 });
        }}
      />
    </div>
  );
}
