import fs from "fs";
import path from "path";
import { parse } from "yaml";
import sizeOf from "image-size";

export interface Photo {
  src: string;
  date: string;
  location: string;
  caption: string;
  width: number;
  height: number;
}

const PHOTOS_FILE = path.join(process.cwd(), "content", "photos.yml");
const PUBLIC_DIR = path.join(process.cwd(), "public");

let cache: Photo[] | null = null;

export function getAllPhotos(): Photo[] {
  if (cache) return cache;

  if (!fs.existsSync(PHOTOS_FILE)) return [];

  const raw = fs.readFileSync(PHOTOS_FILE, "utf8");
  const entries = parse(raw) as Array<{
    src: string;
    date: string;
    location: string;
    caption: string;
  }>;

  cache = entries.map((entry) => {
    const imagePath = path.join(PUBLIC_DIR, entry.src);
    let width = 0;
    let height = 0;
    if (fs.existsSync(imagePath)) {
      const buffer = fs.readFileSync(imagePath);
      const dimensions = sizeOf(new Uint8Array(buffer));
      width = dimensions.width ?? 0;
      height = dimensions.height ?? 0;
    }

    return {
      src: entry.src,
      date: entry.date,
      location: entry.location,
      caption: entry.caption,
      width,
      height,
    };
  });

  cache.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return cache;
}
