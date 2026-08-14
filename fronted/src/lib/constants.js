// Brand and configuration constants for Hacker House Goa 2026 - Glitch Paradise Theme

export const BRAND = {
  name: "HACKER HOUSE",
  editionTitle: "GLITCH PARADISE",
  hindi: "गोवा",
  sub: "GOA 2026",
  edition: "HHG / 26",
  dates: "28–31 OCT 2026",
  location: "GOA, INDIA",
  campus: "Vagator Beach Campus",
  hashtag: "#FrameInGoa",
  tagline: "Make your mark. Hang it loud.",
  subtext: "Upload your photo. Get your Hacker House Goa Glitch Paradise ID card. Download it, share it, and let the internet know you're building from the sand.",
  badgePrefix: "#HH-GOA-",
};

export const FORMATS = [
  {
    id: "card",
    name: "Builder ID Card",
    icon: "📇",
    desc: "Vertical collectible physical pass with lanyard & barcode",
  },
  {
    id: "pfp",
    name: "PFP Frame",
    icon: "🌴",
    desc: "Square / circular avatar frame for Twitter & Discord",
  },
];

export const ROLES = [
  "BUILDER",
  "HACKER",
  "DESIGNER",
  "SPEAKER",
  "MENTOR",
  "ORGANISER",
  "STAFF",
  "PHOTOGRAPHER",
  "VOLUNTEER",
  "SPONSOR",
  "VIP",
];

export const THEMES = {
  glitch: {
    id: "glitch",
    name: "Glitch Paradise",
    badgeBg: "#e0e7ff",
    headerBg: "#c4b5fd",
    headerText: "#2e2870",
    bodyBg: "#FAF8FF",
    accentYellow: "#fde047",
    accentPink: "#f472b6",
    accentMint: "#5eead4",
    dot: "#c4b5fd",
    taglineColor: "#f472b6",
    textColor: "#2e2870",
    border: "#2e2870",
  },
  sunset: {
    id: "sunset",
    name: "Anjuna Dream",
    badgeBg: "#fce7f3",
    headerBg: "#fbcfe8",
    headerText: "#4c0519",
    bodyBg: "#FFF8FA",
    accentYellow: "#fde047",
    accentPink: "#fb7185",
    accentMint: "#7dd3fc",
    dot: "#f472b6",
    taglineColor: "#fb7185",
    textColor: "#4c0519",
    border: "#4c0519",
  },
  mint: {
    id: "mint",
    name: "Arambol Mint",
    badgeBg: "#ccfbf1",
    headerBg: "#99f6e4",
    headerText: "#134e4a",
    bodyBg: "#F4FFFD",
    accentYellow: "#fde047",
    accentPink: "#f472b6",
    accentMint: "#2dd4bf",
    dot: "#5eead4",
    taglineColor: "#0d9488",
    textColor: "#134e4a",
    border: "#134e4a",
  },
  cyber: {
    id: "cyber",
    name: "Cyber Lilac",
    badgeBg: "#f3e8ff",
    headerBg: "#d8b4fe",
    headerText: "#3b0764",
    bodyBg: "#FCF8FF",
    accentYellow: "#fde047",
    accentPink: "#ec4899",
    accentMint: "#a78bfa",
    dot: "#a855f7",
    taglineColor: "#9333ea",
    textColor: "#3b0764",
    border: "#3b0764",
  },
};

export const PHOTO_FILTERS = [
  { id: "normal", name: "Normal", filter: "none" },
  { id: "sunset", name: "Pastel Sunset", filter: "sepia(0.15) saturate(1.3) contrast(1.05) hue-rotate(-5deg)" },
  { id: "vintage", name: "Y2K Dream", filter: "contrast(1.1) brightness(1.08) saturate(1.1) sepia(0.15)" },
  { id: "cyber", name: "Glitch Glow", filter: "contrast(1.2) saturate(1.4) hue-rotate(15deg)" },
  { id: "golden", name: "Golden Hour", filter: "brightness(1.08) saturate(1.25) sepia(0.2)" },
  { id: "bw", name: "B&W Mono", filter: "grayscale(1) contrast(1.25)" },
];

export const FUN_TITLES = [
  "Sunset Prompt Whisperer",
  "Chai-Driven Developer",
  "Solana Sand Surfer",
  "0.01s Latency Wizard",
  "Sandcastle Database Architect",
  "Rickshaw Drift Engineer",
  "Glitch Paradise Navigator",
  "Beachside PR Merger",
  "Palm Tree Prompt Engineer",
  "Tide-Predicting Quant",
  "Vaporwave Synthesizer",
  "Coconuts & Code Craftsman",
  "Zero-Knowledge Sandbagger",
  "High-Throughput Hammock Shipper",
  "Distributed Dreamer",
  "Memory-Unsafe Speed Demon",
  "The Pixel-Obsessed Sorcerer",
  "Smart Contract Shaman",
  "EVM Bytecode Alchemist",
  "The Terminal-Native Pathfinder",
  "Chief Vibes Officer",
  "Fullstack Beachcomber",
  "Async Goroutine Sailor",
  "Type-Safe Coconut Crusher",
  "Night-Shift Code Nomad",
  "Sub-Millisecond Cache Prophet",
  "Vibe-Coding Maestro",
  "Prompt To Production Specialist",
  "The Spec-To-Ship Titan",
  "CSS Houdini on the Beach",
];

export const STICKERS = [
  { id: "shipped", label: "Shipped 🚀", bg: "#fde047", text: "#2e2870" },
  { id: "rust", label: "Rustacean 🦀", bg: "#f472b6", text: "#ffffff" },
  { id: "goa", label: "Goa Vibe 🌴", bg: "#5eead4", text: "#2e2870" },
  { id: "10x", label: "10x Builder ⚡", bg: "#c4b5fd", text: "#2e2870" },
  { id: "chai", label: "Chai Addict ☕", bg: "#ffffff", text: "#2e2870" },
  { id: "solana", label: "Solana 🌊", bg: "#7dd3fc", text: "#2e2870" },
  { id: "winner", label: "Winner 🏆", bg: "#fde047", text: "#2e2870" },
  { id: "ai", label: "AI Alchemist 🔮", bg: "#f472b6", text: "#ffffff" },
];

export const PRESET_PERSONAS = [
  {
    name: "Ada Lovelace",
    stack: "rust · react · rickshaws",
    role: "BUILDER",
    title: "Sunset Prompt Whisperer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Satoshi Nakamoto",
    stack: "solana · c++ · cryptography",
    role: "HACKER",
    title: "Zero-Knowledge Sandbagger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Devi Priya",
    stack: "ai · figma · fullstack",
    role: "DESIGNER",
    title: "The Pixel-Obsessed Sorcerer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
  },
];

export function getRandomTitle() {
  const idx = Math.floor(Math.random() * FUN_TITLES.length);
  return FUN_TITLES[idx];
}

export function generateRandomPassNumber() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${BRAND.badgePrefix}${num}`;
}
