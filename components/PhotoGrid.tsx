"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";
import Lightbox from "@/components/Lightbox";

interface PhotoGridProps {
  photos: Photo[];
  blurMap: Record<string, string>;
}

export default function PhotoGrid({ photos, blurMap }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const groups = groupByYear(photos);

  return (
    <>
      <div className="space-y-12">
        {groups.map(({ year, photos: yearPhotos, startIndex }) => (
          <section key={year}>
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-widest uppercase mb-4">
              {year}
            </h2>
            <div className="masonry-grid">
              {yearPhotos.map((photo, i) => {
                const globalIndex = startIndex + i;
                const blurDataURL = blurMap[photo.src];
                const aspectRatio = photo.width / photo.height;
                const isPortrait = aspectRatio < 0.85;
                const isPanoramic = aspectRatio > 1.8;

                return (
                  <div
                    key={`${photo.src}-${globalIndex}`}
                    className="masonry-item"
                    onClick={() => setLightboxIndex(globalIndex)}
                  >
                    <article className="photo-card group">
                      <div
                        className={`relative w-full overflow-hidden ${
                          isPortrait ? "pb-[133%]" : isPanoramic ? "pb-[50%]" : "pb-[66%]"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.caption}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          priority={globalIndex < 4}
                          {...(blurDataURL && { placeholder: "blur" as const, blurDataURL })}
                        />

                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Caption overlay on hover */}
                        <div className="absolute inset-x-0 bottom-0 px-4 py-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-sm text-white leading-snug mb-0.5 drop-shadow line-clamp-2">
                            {photo.caption}
                          </p>
                          {photo.location && photo.location !== "N/A" && (
                            <div className="flex items-center gap-1 text-xs text-white/70">
                              <svg
                                className="w-3 h-3 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                              </svg>
                              <span className="truncate">{photo.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </section>
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

interface YearGroup {
  year: string;
  photos: Photo[];
  startIndex: number;
}

function groupByYear(photos: Photo[]): YearGroup[] {
  const groups: YearGroup[] = [];
  let currentYear = "";

  for (let i = 0; i < photos.length; i++) {
    const year = new Date(photos[i].date).getFullYear().toString();
    if (year !== currentYear) {
      currentYear = year;
      groups.push({ year, photos: [], startIndex: i });
    }
    groups[groups.length - 1].photos.push(photos[i]);
  }

  return groups;
}
