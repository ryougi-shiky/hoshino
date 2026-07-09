"use client";

import { useState, useMemo } from "react";
import type { Photo } from "@/lib/photos";
import PhotoCard from "@/components/PhotoCard";

interface GalleryFilterProps {
  photos: Photo[];
}

export default function GalleryFilter({ photos }: GalleryFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [photos]);

  const filteredPhotos = activeTag
    ? photos.filter((p) => p.tags.includes(activeTag))
    : photos;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            activeTag === null
              ? "bg-[var(--accent-blue)] border-[var(--accent-blue)] text-white"
              : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeTag === tag
                ? "bg-[var(--accent-blue)] border-[var(--accent-blue)] text-white"
                : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Photo count */}
      <p className="text-xs text-[var(--text-muted)]">
        {filteredPhotos.length} photo{filteredPhotos.length !== 1 && "s"}
        {activeTag && (
          <>
            {" "}tagged <span className="text-[var(--accent-gold)]">{activeTag}</span>
          </>
        )}
      </p>

      {/* Grid */}
      <div className="masonry-grid">
        {filteredPhotos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            linkable
            priority={i < 4}
          />
        ))}
      </div>
    </>
  );
}
