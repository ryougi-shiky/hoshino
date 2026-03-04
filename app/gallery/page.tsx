import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { getAllPhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The full astrophotography gallery — Milky Way, auroras, star trails, meteors, and more.",
};

export default function GalleryPage() {
  const photos = getAllPhotos();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent-gold)] font-medium">
          ✦ Archive
        </p>
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">Gallery</h1>
        <p className="text-[var(--text-secondary)] max-w-lg">
          {photos.length} photographs from across the globe. Click any image for
          the full story.
        </p>
      </div>

      {/* Gallery */}
      <GalleryGrid photos={photos} />
    </div>
  );
}
