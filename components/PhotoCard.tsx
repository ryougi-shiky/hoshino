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

  const content = (
    <article className="group relative overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] cursor-pointer transition-all duration-300 hover:border-[var(--accent-silver)] hover:shadow-lg hover:shadow-[rgba(74,158,255,0.1)] hover:-translate-y-0.5">
      {/* Image */}
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
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        {/* Tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {photo.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[rgba(6,9,24,0.8)] text-[var(--accent-gold)] border border-[var(--accent-gold)] border-opacity-30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug mb-1 line-clamp-1">
          {photo.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
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
    </article>
  );

  if (!linkable) return content;

  return (
    <Link href={`/photos/${photo.id}`} className="block masonry-item">
      {content}
    </Link>
  );
}
