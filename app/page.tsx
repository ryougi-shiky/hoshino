import Link from "next/link";
import Image from "next/image";
import GalleryGrid from "@/components/GalleryGrid";
import PostCard from "@/components/PostCard";
import { getFeaturedPhotos } from "@/lib/photos";
import { getSortedPosts } from "@/lib/posts";

export default function HomePage() {
  const featuredPhotos = getFeaturedPhotos();
  const recentPosts = getSortedPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-24">
      {/* Hero */}
      <section className="text-center py-20 space-y-6">
        <p className="text-xs tracking-[0.4em] uppercase text-[var(--accent-gold)] font-medium">
          ✦ Night Sky Photography
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="gradient-text">星野</span>
          <br />
          <span className="text-[var(--text-primary)] text-4xl md:text-6xl font-light tracking-wide">
            Hoshino
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
          Chasing the night sky across continents — astrophotography, travel
          stories, and the quiet wonder of looking up.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Link
            href="/gallery"
            className="btn-primary px-6 py-2.5 rounded-full bg-[var(--accent-blue)] text-white text-sm font-medium"
          >
            View Gallery
          </Link>
          <Link
            href="/blog"
            className="btn-outline px-6 py-2.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm font-medium"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Featured Photos */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Featured Shots</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">Hand-picked from the archive</p>
          </div>
          <Link
            href="/gallery"
            className="text-sm text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors"
          >
            All photos →
          </Link>
        </div>
        <GalleryGrid photos={featuredPhotos} />
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "8+", label: "Countries visited" },
          { value: "500+", label: "Nights under the stars" },
          { value: "50k+", label: "Photos taken" },
          { value: "∞", label: "Wonder remaining" },
        ].map(({ value, label }) => (
          <div key={label} className="glass-card p-5 text-center">
            <p className="text-3xl font-bold gradient-text mb-1">{value}</p>
            <p className="text-xs text-[var(--text-muted)]">{label}</p>
          </div>
        ))}
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">From the Blog</h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">Stories, guides, and observations</p>
            </div>
            <Link
              href="/blog"
              className="text-sm text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors"
            >
              All posts →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* About CTA */}
      <section className="glass-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-4">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent-gold)]">✦ About Hoshino</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Stars have guided explorers for millennia.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Hoshino (星野) means &ldquo;field of stars&rdquo; in Japanese. This blog is a personal
            archive of nights spent far from city lights, searching for dark skies and the stories
            written in starlight.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Every photograph here is taken on location — no artificial composites, no studio effects.
            Just light, time, and the sky above.
          </p>
        </div>
        <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden shrink-0">
          <Image
            src="/images/milky-way-mountains.svg"
            alt="Milky Way over mountains"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
