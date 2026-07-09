import Image from "next/image";
import { getAllPhotos } from "@/lib/photos";
import { getBlurDataURL } from "@/lib/blur";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomePage() {
  const photos = getAllPhotos();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-16">
      {photos.map((photo, i) => {
        const blurDataURL = getBlurDataURL(photo.src);
        return (
          <article key={`${photo.src}-${i}`} className="space-y-3">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={photo.src}
                alt={photo.caption}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 720px"
                priority={i < 2}
                {...(blurDataURL && { placeholder: "blur", blurDataURL })}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[var(--text-primary)]">{photo.caption}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {formatDate(photo.date)}
                {photo.location && photo.location !== "N/A" && (
                  <> · {photo.location}</>
                )}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
