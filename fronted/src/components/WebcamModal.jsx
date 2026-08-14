import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, Sparkles } from 'lucide-react';

export default function WebcamModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [capturedData, setCapturedData] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setCapturedData(null);
      setCountdown(null);
      return;
    }

    let activeStream = null;
    navigator.mediaDevices
      ?.getUserMedia({ video: { width: 720, height: 720, facingMode: 'user' } })
      .then((s) => {
        activeStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch((err) => {
        console.error('Camera access error:', err);
        setHasError(true);
      });

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isOpen]);

  const handleTakeSnapshot = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          captureFrame();
          return null;
        }
        return prev - 1;
      });
    }, 800);
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedData(dataUrl);
  };

  const handleConfirm = () => {
    if (capturedData) {
      onCapture(capturedData);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedData(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border-2 border-hh-indigo rounded-3xl p-6 shadow-[8px_8px_0_#2e2870]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-hh-indigo/15">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-hh-pink" />
            <h3 className="font-display text-lg text-hh-indigo">
              SNAP BUILDER PHOTO
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-hh-lavender-light border-2 border-hh-indigo flex items-center justify-center text-hh-indigo hover:bg-hh-pink hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera / Snapshot Surface */}
        <div className="mt-5 relative aspect-square rounded-2xl overflow-hidden bg-black border-2 border-hh-indigo flex items-center justify-center">
          {hasError ? (
            <div className="text-center p-6 font-mono text-xs text-red-500 font-bold">
              Camera access was denied or unavailable. Please check your browser permissions.
            </div>
          ) : capturedData ? (
            <img
              src={capturedData}
              alt="Snapshot preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {countdown && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs font-display text-7xl text-hh-yellow animate-ping">
                  {countdown}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {capturedData ? (
            <>
              <button
                type="button"
                onClick={handleRetake}
                className="btn-outline px-4 py-2.5 rounded-2xl font-mono text-xs flex items-center gap-1.5 font-bold"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RETAKE</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="btn-yellow px-6 py-2.5 rounded-2xl font-mono text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>USE THIS PHOTO</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={hasError || countdown !== null}
              onClick={handleTakeSnapshot}
              className="btn-pink px-8 py-3 rounded-2xl font-mono text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>SNAP PHOTO</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
