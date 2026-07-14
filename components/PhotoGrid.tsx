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
                const isEven = globalIndex % 2 === 0;
                const isPortrait = photo.width < photo.height;
                const photoWidth = isPortrait ? "md:w-2/5" : "md:w-3/5";
                const infoWidth = isPortrait ? "md:w-3/5" : "md:w-2/5";

                const photoBlock = (
                  <div
                    className={`w-full ${photoWidth} overflow-hidden rounded-lg cursor-pointer photo-card`}
                    onClick={() => setLightboxIndex(globalIndex)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      width={photo.width}
                      height={photo.height}
                      className={isPortrait ? "max-h-[60vh] w-auto h-auto rounded-lg" : "w-full h-auto rounded-lg"}
                      sizes={isPortrait ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 60vw"}
                      priority={globalIndex < 2}
                      {...(blurDataURL && { placeholder: "blur" as const, blurDataURL })}
                    />
                  </div>
                );

                const infoBlock = (
                  <div className={`w-full ${infoWidth} space-y-2 ${isEven ? "md:text-left" : "md:text-right"}`}>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {photo.caption}
                    </p>
                    <div className="text-xs text-[var(--text-muted)] space-y-0.5">
                      <p>{formatDate(photo.date)}</p>
                      {photo.location && photo.location !== "N/A" && (
                        <p className={`flex items-center gap-1 ${isEven ? "" : "md:justify-end"}`}>
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
                );

                return (
                  <article
                    key={`${photo.src}-${globalIndex}`}
                    className="flex flex-col md:flex-row gap-8 md:items-center"
                  >
                    {isEven ? (
                      <>{photoBlock}{infoBlock}</>
                    ) : (
                      <>{infoBlock}{photoBlock}</>
                    )}
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
