"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { applyTheme, getStoredTheme, type Theme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
];

interface ThemeOption {
  id: Theme;
  swatch: string;
  label: string;
}

const THEMES: ThemeOption[] = [
  { id: "starfield",  swatch: "#4a9eff", label: "Starfield ✦" },
  { id: "monochrome", swatch: "#909098", label: "Monochrome" },
  { id: "arctic",     swatch: "#62ccff", label: "Arctic" },
  { id: "ocean",      swatch: "#00c8be", label: "Ocean" },
  { id: "sunset",     swatch: "#f07830", label: "Sunset" },
  { id: "lavender",   swatch: "#b07aff", label: "Lavender" },
  { id: "emerald",    swatch: "#28c864", label: "Emerald" },
  { id: "white",      swatch: "#e8e8f0", label: "White" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Lazy initializer — reads persisted theme once on first render (client-only)
  const [activeTheme, setActiveTheme] = useState<Theme>(
    () => (typeof window !== "undefined" ? getStoredTheme() : "starfield")
  );
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);

  // Close theme picker when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target as Node)) {
        setThemePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleTheme(theme: Theme) {
    applyTheme(theme);
    setActiveTheme(theme);
    setThemePickerOpen(false);
  }

  const activeSwatchColor = THEMES.find((t) => t.id === activeTheme)?.swatch ?? "#4a9eff";

  return (
    <nav className="nav-glass sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">✦</span>
          <span className="text-lg font-bold tracking-wide gradient-text group-hover:opacity-90 transition-opacity">
            星野 Hoshino
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 hover:scale-105 inline-block ${
                    active
                      ? "text-[var(--accent-gold)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Search trigger */}
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* Theme picker */}
          <div className="relative" ref={themePickerRef}>
            <button
              onClick={() => setThemePickerOpen((v) => !v)}
              aria-label="Choose color theme"
              aria-expanded={themePickerOpen}
              title="Choose color theme"
              className="w-7 h-7 rounded-full border-2 transition-all duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-1 focus:ring-offset-transparent"
              style={{
                background: activeSwatchColor,
                borderColor: "rgba(255,255,255,0.25)",
              }}
            />
            {themePickerOpen && (
              <div className="absolute right-0 mt-2 glass-card p-3 flex flex-col gap-2 min-w-[9rem]">
                <p className="text-xs text-[var(--text-muted)] mb-1 tracking-widest uppercase">Theme</p>
                {THEMES.map(({ id, swatch, label }) => (
                  <button
                    key={id}
                    onClick={() => handleTheme(id)}
                    className={`flex items-center gap-2.5 text-xs px-2 py-1 rounded-lg transition-all duration-150 hover:scale-105 w-full text-left ${
                      activeTheme === id
                        ? "bg-[var(--glass-highlight)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ background: swatch }}
                    />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
            <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
            <span className="block w-5 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                      active
                        ? "text-[var(--accent-gold)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
