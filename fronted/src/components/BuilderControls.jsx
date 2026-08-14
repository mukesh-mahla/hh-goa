import React, { useRef, useState } from 'react';
import {
  Upload,
  Camera,
  Dices,
  Download,
  Share2,
  Copy,
  Printer,
  Sparkles,
  RefreshCw,
  Minus,
  Plus,
  Trash2,
  Check,
  Tag,
  Palette,
  UserCheck,
} from 'lucide-react';
import {
  FORMATS,
  ROLES,
  THEMES,
  PHOTO_FILTERS,
  STICKERS,
  PRESET_PERSONAS,
  getRandomTitle,
  generateRandomPassNumber,
} from '../lib/constants';

export default function BuilderControls({
  format,
  setFormat,
  name,
  setName,
  stack,
  setStack,
  role,
  setRole,
  title,
  setTitle,
  badgeId,
  setBadgeId,
  themeId,
  setThemeId,
  photo,
  setPhoto,
  zoom,
  setZoom,
  pan,
  setPan,
  filter,
  setFilter,
  selectedStickers,
  setSelectedStickers,
  onOpenWebcam,
  onDownload,
  onShareX,
  onCopyImage,
  onCopyLink,
  onPrint,
  copiedStatus,
}) {
  
  const fileInputRef = useRef(null);

  // File upload handler
  const  handleFileUpload =async (file) => {
    if (!file) return;
    
      const formdata = new FormData();
   

  const signeddUrl =   await fetch("https://hh-goa-1onj.onrender.com/get-url",{
      method:"POST"
    })

      const { timestamp, signature, folder, apiKey } = await signeddUrl.json();
    
       formdata.append("folder", folder);
    formdata.append("timestamp", timestamp.toString());
    formdata.append("signature", signature);
    formdata.append("api_key", apiKey);
    formdata.append("file", file);

 const cloudnaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/w8utk0ut/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    );
const data = await cloudnaryResponse.json();
    localStorage.setItem("link",data.secure_url)

    setPhoto(data.secure_url)
  };



  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) handleFileUpload(file);
        break;
      }
    }
  };

  const handleRerollTitle = () => {
    const newTitle = getRandomTitle();
    setTitle(newTitle);
  };

  const handleRerollId = () => {
    setBadgeId(generateRandomPassNumber());
  };

  const handleApplyPersona = (p) => {
    setName(p.name);
    setStack(p.stack);
    setRole(p.role);
    setTitle(p.title);
    setPhoto(p.avatar);
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  const handleToggleSticker = (sticker) => {
    if (selectedStickers.some((s) => s.id === sticker.id)) {
      setSelectedStickers(selectedStickers.filter((s) => s.id !== sticker.id));
    } else {
      if (selectedStickers.length < 3) {
        setSelectedStickers([...selectedStickers, sticker]);
      }
    }
  };

  return (
    <div className="space-y-6" onPaste={handlePaste}>
      {/* 1. Format Switcher Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-3">
        {FORMATS.map((f) => {
          const isActive = format === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              className={`px-5 py-2.5 rounded-2xl font-mono text-xs md:text-sm font-black flex items-center gap-2 border-2 transition-all shadow-[3px_3px_0_#2e2870] ${
                isActive
                  ? 'bg-hh-yellow text-hh-indigo border-hh-indigo scale-105 shadow-[4px_4px_0_#f472b6]'
                  : 'bg-white/80 text-hh-indigo/80 border-hh-indigo/40 hover:border-hh-indigo hover:bg-white'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Photo Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative rounded-2xl border-2 border-dashed border-hh-indigo/50 bg-white/70 backdrop-blur-sm p-5 text-center hover:border-hh-indigo hover:bg-white/90 transition-all shadow-[3px_3px_0_rgba(46,40,112,0.15)]"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFileUpload(e.target.files?.[0])}
        />

        {photo ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={photo}
                alt="Selected"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-hh-indigo shadow-md"
              />
              <div className="text-left">
                <div className="font-mono text-xs font-black text-hh-indigo flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Photo Loaded
                </div>
                <div className="font-mono text-[10px] text-hh-indigo/70 font-semibold">
                  Drag on badge to reposition
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-hh-yellow text-hh-indigo font-mono text-[11px] font-black border-2 border-hh-indigo hover:bg-hh-yellow-light transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="p-1.5 rounded-xl bg-red-100 border border-red-300 text-red-600 hover:bg-red-200 transition-colors"
                title="Remove photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-3">
            <div className="w-12 h-12 rounded-2xl bg-hh-lavender-light border-2 border-hh-indigo flex items-center justify-center mb-2 text-hh-indigo shadow-[2px_2px_0_#2e2870]">
              <Camera className="w-6 h-6" />
            </div>
            <div className="font-mono text-sm font-black text-hh-indigo">
              Drop / tap / paste your photo
            </div>
            <div className="mt-1 font-mono text-[10px] text-hh-indigo/70 font-semibold">
              JPG · PNG · WebP · HEIC (iPhone) — no login, ever
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-yellow px-4 py-1.5 rounded-xl font-mono text-[11px] flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={onOpenWebcam}
                className="btn-pink px-4 py-1.5 rounded-xl font-mono text-[11px] flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Snap Selfie</span>
              </button>
            </div>
          </div>
        )}

        {/* Zoom & Filters bar if photo exists */}
        {photo && (
          <div className="mt-4 pt-3 border-t border-hh-indigo/15 space-y-3">
            {/* Zoom Slider */}
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] font-bold text-hh-indigo flex items-center gap-1">
                ZOOM: {zoom.toFixed(1)}x
              </span>
              <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                <button
                  type="button"
                  onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                  className="w-6 h-6 rounded bg-hh-lavender border border-hh-indigo text-hh-indigo flex items-center justify-center text-xs font-bold"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-hh-pink cursor-pointer h-1.5 bg-hh-lavender-light rounded"
                />
                <button
                  type="button"
                  onClick={() => setZoom(Math.min(2.5, zoom + 0.1))}
                  className="w-6 h-6 rounded bg-hh-lavender border border-hh-indigo text-hh-indigo flex items-center justify-center text-xs font-bold"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Photo Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {PHOTO_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap border-2 transition-all ${
                    filter === f.id
                      ? 'bg-hh-pink text-white border-hh-indigo font-bold shadow-[2px_2px_0_#2e2870]'
                      : 'bg-white text-hh-indigo/80 border-hh-indigo/30 hover:border-hh-indigo'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. NAME Input Box */}
      <div className="space-y-1.5">
        <label className="font-mono text-[11px] font-black tracking-widest text-hh-indigo uppercase">
          NAME
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ada Lovelace"
          maxLength={28}
          className="w-full px-4 py-3 rounded-2xl bg-white text-hh-indigo font-mono text-sm font-bold placeholder:text-hh-indigo/40 border-2 border-hh-indigo shadow-[4px_4px_0_#c4b5fd]"
        />
      </div>

      {/* 4. STACK / ROLE Input Box */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[11px] font-black tracking-widest text-hh-indigo uppercase">
            STACK / ROLE
          </label>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-hh-indigo/70 font-bold">PASS:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-hh-lavender-light text-hh-indigo font-mono text-[10px] font-black rounded-lg px-2 py-0.5 border-2 border-hh-indigo cursor-pointer"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          type="text"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="rust · react · rickshaws"
          maxLength={40}
          className="w-full px-4 py-3 rounded-2xl bg-white text-hh-indigo font-mono text-sm font-bold placeholder:text-hh-indigo/40 border-2 border-hh-indigo shadow-[4px_4px_0_#c4b5fd]"
        />
      </div>

      {/* 5. BUILDER TITLE Generator with REROLL */}
      <div className="space-y-1.5">
        <label className="font-mono text-[11px] font-black tracking-widest text-hh-indigo uppercase">
          BUILDER TITLE
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sunset Prompt Whisperer..."
              className="w-full px-4 py-3 rounded-2xl bg-white text-hh-indigo font-mono text-sm font-black border-2 border-hh-indigo shadow-[4px_4px_0_#c4b5fd]"
            />
          </div>
          <button
            type="button"
            onClick={handleRerollTitle}
            className="btn-pink px-4 py-3 rounded-2xl font-mono text-xs md:text-sm flex items-center gap-1.5 shrink-0"
            title="Roll a random funny Goa builder title"
          >
            <Dices className="w-4 h-4" />
            <span>reroll</span>
          </button>
        </div>
      </div>

      {/* 6. Theme Selector & Unique Pass ID Roll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label className="font-mono text-[10px] font-black tracking-widest text-hh-indigo uppercase mb-1.5 block">
            THEME PALETTE
          </label>
          <div className="flex flex-wrap gap-1.5">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                className={`px-2.5 py-1.5 rounded-xl font-mono text-[11px] flex items-center gap-1.5 border-2 transition-all ${
                  themeId === t.id
                    ? 'bg-hh-yellow text-hh-indigo border-hh-indigo font-black shadow-[2px_2px_0_#2e2870]'
                    : 'bg-white text-hh-indigo border-hh-indigo/30 hover:border-hh-indigo'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block border border-hh-indigo"
                  style={{ backgroundColor: t.dot }}
                />
                <span>{t.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] font-black tracking-widest text-hh-indigo uppercase mb-1.5 block">
            PASS ID CODE
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-hh-indigo bg-white px-3 py-2 rounded-xl border-2 border-hh-indigo flex-1 text-center shadow-[2px_2px_0_#c4b5fd]">
              {badgeId}
            </span>
            <button
              type="button"
              onClick={handleRerollId}
              className="px-2.5 py-2 rounded-xl bg-hh-yellow text-hh-indigo font-mono text-[10px] font-black border-2 border-hh-indigo hover:bg-hh-yellow-light shadow-[2px_2px_0_#2e2870]"
              title="Generate new pass ID number"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 7. Interactive Stickers Picker */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] font-black tracking-widest text-hh-indigo uppercase">
            PIN BADGE STICKERS (UP TO 3)
          </label>
          <span className="font-mono text-[10px] text-hh-pink font-black">
            {selectedStickers.length}/3 selected
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STICKERS.map((st) => {
            const isSelected = selectedStickers.some((s) => s.id === st.id);
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleToggleSticker(st)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold border-2 transition-all ${
                  isSelected
                    ? 'bg-hh-pink text-white border-hh-indigo shadow-[2px_2px_0_#2e2870] scale-105'
                    : 'bg-white text-hh-indigo/80 border-hh-indigo/30 hover:border-hh-pink'
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Quick Preset Personas */}
      <div className="pt-2">
        <label className="font-mono text-[10px] font-black tracking-widest text-hh-indigo/70 uppercase mb-1.5 block">
          QUICK PERSONA PRESETS
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_PERSONAS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => handleApplyPersona(p)}
              className="px-3 py-1 rounded-xl bg-white/90 border-2 border-hh-indigo/40 text-hh-indigo hover:border-hh-indigo font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-[2px_2px_0_rgba(46,40,112,0.1)]"
            >
              <UserCheck className="w-3 h-3" />
              <span>{p.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 9. Action Buttons */}
      <div className="pt-4 space-y-3">
        {/* Share to X / Twitter Button */}
        <button
          type="button"
          onClick={onShareX}
          className="w-full py-3.5 px-6 rounded-2xl font-mono text-sm font-black bg-hh-mint text-hh-indigo border-2 border-hh-indigo shadow-[4px_4px_0_#2e2870] flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
        >
          <span className="font-display text-base">𝕏</span>
          <span>Share with #FrameInGoa</span>
        </button>

        {/* Download High-Res PNG Button */}
        <button
          type="button"
          onClick={onDownload}
          className="btn-pink w-full py-4 px-6 rounded-2xl font-mono text-base font-black flex items-center justify-center gap-2.5 shadow-[5px_5px_0_#2e2870] hover:scale-[1.01]"
        >
          <Download className="w-5 h-5" />
          <span>Download PNG</span>
        </button>

        {/* Auxiliary Actions */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={onCopyImage}
            className="btn-outline py-2 rounded-xl font-mono text-[11px] flex items-center justify-center gap-1"
            title="Copy high-res pass directly to clipboard"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedStatus === 'image' ? 'Copied!' : 'Copy Img'}</span>
          </button>

          <button
            type="button"
            onClick={onCopyLink}
            className="btn-outline py-2 rounded-xl font-mono text-[11px] flex items-center justify-center gap-1"
            title="Copy link to generator"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedStatus === 'link' ? 'Copied!' : 'Share Link'}</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="btn-outline py-2 rounded-xl font-mono text-[11px] flex items-center justify-center gap-1"
            title="Print Pass"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
