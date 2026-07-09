"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 text-sm text-white/70">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous photo"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next photo"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="relative z-[1] max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center">
        <Image
          src={photo.src}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          className="object-contain max-w-full max-h-[85vh] w-auto h-auto rounded-lg"
          sizes="90vw"
          priority
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h3 className="text-white font-medium text-sm">{photo.title}</h3>
        <p className="text-white/60 text-xs mt-0.5">{photo.location}</p>
      </div>
    </div>
  );
}
