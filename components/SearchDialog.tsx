"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface SearchItem {
  type: "photo" | "post";
  title: string;
  href: string;
  subtitle: string;
  tags: string[];
}

interface SearchDialogProps {
  items: SearchItem[];
}

export default function SearchDialog({ items }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results =
    query.length < 2
      ? []
      : items.filter((item) => {
          const q = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.subtitle.toLowerCase().includes(q) ||
            item.tags.some((t) => t.toLowerCase().includes(q))
          );
        });

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        handleClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-lg mx-4 glass-card overflow-hidden shadow-2xl">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
          <svg className="w-5 h-5 text-[var(--text-muted)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos and posts..."
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-sm"
          />
          <kbd className="hidden sm:inline-block text-xs px-1.5 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-muted)]">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query.length < 2 ? (
            <p className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
              Type at least 2 characters to search
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul>
              {results.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--glass-bg)] transition-colors"
                  >
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--glass-bg)] border border-[var(--border-subtle)] text-[var(--text-muted)] uppercase shrink-0">
                      {item.type}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-[var(--text-primary)] truncate">{item.title}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{item.subtitle}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
