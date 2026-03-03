import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="glass-card p-6 transition-all duration-300 hover:border-[var(--accent-silver)] hover:-translate-y-0.5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[rgba(74,158,255,0.1)] text-[var(--accent-blue)] border border-[rgba(74,158,255,0.2)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-silver)] transition-colors leading-snug">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1 text-[var(--accent-gold)] group-hover:gap-2 transition-all">
            Read more
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
