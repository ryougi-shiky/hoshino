import PhotoCard from "@/components/PhotoCard";
import type { Photo } from "@/lib/photos";

interface GalleryGridProps {
  photos: Photo[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  return (
    <div className="masonry-grid">
      {photos.map((photo, i) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          linkable
          priority={i < 4}
        />
      ))}
    </div>
  );
}
