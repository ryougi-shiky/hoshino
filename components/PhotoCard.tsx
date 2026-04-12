import Link from "next/link";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

interface PhotoCardProps {
  photo: Photo;
  /** When true, renders as a link to the photo detail page */
  linkable?: boolean;
  priority?: boolean;
}

export default function PhotoCard({
  photo,
  linkable = true,
  priority = false,
}: PhotoCardProps) {
  const aspectRatio = photo.width / photo.height;
  const isPortrait = aspectRatio < 0.85;
  const isPanoramic = aspectRatio > 1.8;

  const card = (
    // photo-card handles scale + shadow hover; group drives overlay animations
    <article className="photo-card group">
      {/* Image container — preserves original aspect ratio */}
      <div
        className={`relative w-full overflow-hidden ${
          isPortrait ? "pb-[133%]" : isPanoramic ? "pb-[50%]" : "pb-[66%]"
        }`}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
          priority={priority}
        />

        {/* Gradient overlay — slides in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Metadata overlay — appears on hover */}
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-sm font-semibold text-white leading-snug mb-0.5 drop-shadow line-clamp-1">
            {photo.title}
          </h3>
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
        </div>

        {/* Tag pills — top-left, visible on hover */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {photo.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-black/60 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  if (!linkable) return <div className="masonry-item">{card}</div>;

  return (
    <Link href={`/photos/${photo.id}`} className="block masonry-item">
      {card}
    </Link>
  );
}
