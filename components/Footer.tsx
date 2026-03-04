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
        <p>© {year} Hoshino. All rights reserved.</p>
      </div>
    </footer>
  );
}
