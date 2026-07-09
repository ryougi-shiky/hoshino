import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sizeOf from "image-size";

export interface Photo {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  width: number;
  height: number;
  src: string;
  featured: boolean;
}

const photosDirectory = path.join(process.cwd(), "content", "photos");
const publicDirectory = path.join(process.cwd(), "public");

let photosCache: Photo[] | null = null;

function loadPhotos(): Photo[] {
  if (photosCache) return photosCache;

  if (!fs.existsSync(photosDirectory)) return [];

  const files = fs.readdirSync(photosDirectory).filter((f) => f.endsWith(".md"));

  const photos = files.map((file) => {
    const id = file.replace(/\.md$/, "");
    const filePath = path.join(photosDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const src = data.src as string;
    const imagePath = path.join(publicDirectory, src);

    let width = 0;
    let height = 0;
    if (fs.existsSync(imagePath)) {
      const buffer = fs.readFileSync(imagePath);
      const dimensions = sizeOf(new Uint8Array(buffer));
      width = dimensions.width ?? 0;
      height = dimensions.height ?? 0;
    }

    return {
      id,
      title: data.title ?? id,
      description: content.trim(),
      location: data.location ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      width,
      height,
      src,
      featured: data.featured ?? false,
    };
  });

  photosCache = photos.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return photosCache;
}

export default loadPhotos();

export function getAllPhotos(): Photo[] {
  return loadPhotos();
}

export function getFeaturedPhotos(): Photo[] {
  return loadPhotos().filter((p) => p.featured);
}

export function getPhotoById(id: string): Photo | undefined {
  return loadPhotos().find((p) => p.id === id);
}
