import { getAllPhotos } from "@/lib/photos";
import { getSortedPosts } from "@/lib/posts";
import SearchDialog from "./SearchDialog";

export default function Search() {
  const photos = getAllPhotos();
  const posts = getSortedPosts();

  const items = [
    ...photos.map((p) => ({
      type: "photo" as const,
      title: p.title,
      href: `/photos/${p.id}`,
      subtitle: p.location,
      tags: p.tags,
    })),
    ...posts.map((p) => ({
      type: "post" as const,
      title: p.title,
      href: `/blog/${p.slug}`,
      subtitle: p.excerpt,
      tags: p.tags,
    })),
  ];

  return <SearchDialog items={items} />;
}
