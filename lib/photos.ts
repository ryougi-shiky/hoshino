export interface Photo {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  /** Width in pixels of the original image (used for layout hints) */
  width: number;
  /** Height in pixels of the original image (used for layout hints) */
  height: number;
  /** Path under /public */
  src: string;
  /** Optional: path to a smaller placeholder */
  placeholder?: string;
  featured?: boolean;
}

const photos: Photo[] = [
  {
    id: "mt-cook",
    title: "Mt Cook",
    description:
      "Mt Cook in New Zealand",
    location: "Mt Cook, New Zealand",
    date: "2024-06-12",
    tags: ["mt-cook", "newzealand"],
    width: 4000,
    height: 3000,
    src: "/images/mt-cook.jpg",
    featured: true,
  },
  {
    id: "queenstown",
    title: "Queenstown",
    description:
      "Queenstown in New Zealand",
    location: "Queenstown, New Zealand",
    date: "2024-06-11",
    tags: ["queenstown", "newzealand"],
    width: 4000,
    height: 3000,
    src: "/images/queenstown.jpg",
    featured: true,
  },
  {
    id: "roots",
    title: "Roots",
    description:
      "Roots of the tree",
    location: "N/A",
    date: "2026-04-11",
    tags: ["roots", "tree"],
    width: 8256,
    height: 5504,
    src: "/images/roots.jpg",
    featured: true,
  },
  {
    id: "garden-leaves",
    title: "Garden Leaves",
    description:
      "Leaves of the garden",
    location: "N/A",
    date: "2026-04-12",
    tags: ["garden", "leaves"],
    width: 5504,
    height: 8256,
    src: "/images/purple-leaves.jpg",
    featured: false,
  },
];

export default photos;

export function getAllPhotos(): Photo[] {
  return photos;
}

export function getFeaturedPhotos(): Photo[] {
  return photos.filter((p) => p.featured);
}

export function getPhotoById(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}
