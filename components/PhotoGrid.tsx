"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";
import Lightbox from "@/components/Lightbox";

interface PhotoGridProps {
  photos: Photo[];
  blurMap: Record<string, string>;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PhotoGrid({ photos, blurMap }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const groups = groupByYear(photos);

  return (
    <>
      <div className="space-y-16">
        {groups.map(({ year, photos: yearPhotos, startIndex }) => (
          <section key={year}>
            <h2 className="text-xs font-medium text-[var(--text-muted)] tracking-widest uppercase mb-6">
              {year}
            </h2>
            <div className="space-y-10">
              {yearPhotos.map((photo, i) => {
                const globalIndex = startIndex + i;
                const blurDataURL = blurMap[photo.src];
                const isPortrait = photo.width < photo.height;

                return (
                  <article
                    key={`${photo.src}-${globalIndex}`}
                    className={`flex flex-col md:flex-row gap-8 md:items-center ${
                      isPortrait ? "md:h-[65vh]" : "md:h-[45vh]"
                    }`}
                  >
                    <div
                      className="w-full md:w-auto md:h-full md:shrink-0 overflow-hidden rounded-lg cursor-pointer photo-card"
                      onClick={() => setLightboxIndex(globalIndex)}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={photo.width}
                        height={photo.height}
                        className="w-full md:w-auto md:h-full rounded-lg object-cover"
                        sizes={isPortrait ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 60vw"}
                        priority={globalIndex < 2}
                        {...(blurDataURL && { placeholder: "blur" as const, blurDataURL })}
                      />
                    </div>

                    <div className="w-full md:flex-1 space-y-2">
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                        {photo.caption}
                      </p>
                      <div className="text-xs text-[var(--text-muted)] space-y-0.5">
                        <p>{formatDate(photo.date)}</p>
                        {photo.location && photo.location !== "N/A" && (
                          <p className="flex items-center gap-1">
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
                            {photo.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
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
