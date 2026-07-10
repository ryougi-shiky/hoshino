import { getAllPhotos } from "@/lib/photos";
import { getBlurDataURL } from "@/lib/blur";
import PhotoGrid from "@/components/PhotoGrid";

export default function HomePage() {
  const photos = getAllPhotos();

  const blurMap: Record<string, string> = {};
  for (const photo of photos) {
    const blur = getBlurDataURL(photo.src);
    if (blur) blurMap[photo.src] = blur;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <PhotoGrid photos={photos} blurMap={blurMap} />
    </div>
  );
}
