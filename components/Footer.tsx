export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] mt-20">
      <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-[var(--text-muted)]">
        <p>© {year} 星野 Hoshino</p>
      </div>
    </footer>
  );
}
