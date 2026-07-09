"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";
import PhotoCard from "@/components/PhotoCard";
import Lightbox from "@/components/Lightbox";

interface GalleryWithLightboxProps {
  photos: Photo[];
}

export default function GalleryWithLightbox({ photos }: GalleryWithLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="masonry-grid">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="masonry-item cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <PhotoCard photo={photo} linkable={false} priority={i < 4} />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
