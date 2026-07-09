import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] mt-20">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span>✦</span>
          <span>
            <span className="gradient-text font-semibold">星野 Hoshino</span>{" "}
            — A photography blog
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/feed"
            className="hover:text-[var(--text-primary)] transition-colors"
            title="RSS Feed"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
          </Link>
          <p>© {year} Hoshino. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
