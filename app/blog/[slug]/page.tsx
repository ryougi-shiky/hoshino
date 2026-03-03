import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return {};
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Blog
      </Link>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[rgba(74,158,255,0.1)] text-[var(--accent-blue)] border border-[rgba(74,158,255,0.2)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          {post.author && (
            <span className="flex items-center gap-1">
              <span>✦</span>
              <span>{post.author}</span>
            </span>
          )}
          {post.author && <span>·</span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--accent-gold)] pl-4 italic">
          {post.excerpt}
        </p>
      </header>

      {/* Content */}
      <article
        className="prose-hoshino"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Footer */}
      <div className="pt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <Link
          href="/blog"
          className="text-sm text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
        >
          ← More posts
        </Link>
        <Link
          href="/gallery"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          View Gallery →
        </Link>
      </div>
    </div>
  );
}
