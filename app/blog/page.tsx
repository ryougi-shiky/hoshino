import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getSortedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, guides, and reflections on astrophotography and travel.",
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent-gold)] font-medium">
          ✦ Writing
        </p>
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">Blog</h1>
        <p className="text-[var(--text-secondary)] max-w-lg">
          Guides, travel diaries, and reflections on a life spent under the stars.
        </p>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-[var(--text-muted)] py-12 text-center">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
