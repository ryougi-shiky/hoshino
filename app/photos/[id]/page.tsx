import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPhotos, getPhotoById } from "@/lib/photos";
import PhotoCard from "@/components/PhotoCard";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllPhotos().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const photo = getPhotoById(id);
  if (!photo) return {};
  return {
    title: photo.title,
    description: photo.description,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const photo = getPhotoById(id);
  if (!photo) notFound();

  const all = getAllPhotos();
  const idx = all.findIndex((p) => p.id === id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const related = all
    .filter((p) => p.id !== id && p.tags.some((t) => photo.tags.includes(t)))
    .slice(0, 3);

  const aspectRatio = photo.width / photo.height;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-10">
      {/* Back link */}
      <Link
        href="/gallery"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Gallery
      </Link>

      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[var(--bg-card)]"
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </div>

      {/* Info */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main info */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">{photo.title}</h1>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base">{photo.description}</p>
        </div>

        {/* Metadata sidebar */}
        <aside className="glass-card p-5 space-y-4 h-fit">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-0.5">
                Location
              </dt>
              <dd className="text-[var(--text-primary)] flex items-start gap-1.5">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--accent-gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                {photo.location}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-0.5">
                Date
              </dt>
              <dd className="text-[var(--text-primary)]">
                <time dateTime={photo.date}>{formatDate(photo.date)}</time>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">
                Tags
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-[rgba(74,158,255,0.1)] text-[var(--accent-blue)] border border-[rgba(74,158,255,0.2)]"
                  >
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-0.5">
                Dimensions
              </dt>
              <dd className="text-[var(--text-primary)]">
                {photo.width.toLocaleString()} × {photo.height.toLocaleString()} px
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Related photos */}
      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Related Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <PhotoCard key={p.id} photo={p} linkable priority={false} />
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <nav className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
        {prev ? (
          <Link
            href={`/photos/${prev.id}`}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors max-w-[45%]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/photos/${next.id}`}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors max-w-[45%] text-right"
          >
            <span className="truncate">{next.title}</span>
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
