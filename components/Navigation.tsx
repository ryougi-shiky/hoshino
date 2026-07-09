"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { applyTheme, getStoredTheme, type Theme } from "@/components/ThemeProvider";

interface ThemeOption {
  id: Theme;
  swatch: string;
  label: string;
}

const THEMES: ThemeOption[] = [
  { id: "starfield", swatch: "#4a9eff", label: "Starfield" },
  { id: "monochrome", swatch: "#909098", label: "Dark" },
  { id: "white", swatch: "#e8e8f0", label: "Light" },
];

export default function Navigation() {
  const [activeTheme, setActiveTheme] = useState<Theme>(
    () => (typeof window !== "undefined" ? getStoredTheme() : "starfield")
  );
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);

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
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">✦</span>
          <span className="text-lg font-bold tracking-wide gradient-text group-hover:opacity-90 transition-opacity">
            星野 Hoshino
          </span>
        </Link>

        <div className="relative" ref={themePickerRef}>
          <button
            onClick={() => setThemePickerOpen((v) => !v)}
            aria-label="Choose color theme"
            aria-expanded={themePickerOpen}
            className="w-6 h-6 rounded-full border-2 transition-all duration-150 hover:scale-110 focus:outline-none"
            style={{
              background: activeSwatchColor,
              borderColor: "rgba(255,255,255,0.25)",
            }}
          />
          {themePickerOpen && (
            <div className="absolute right-0 mt-2 glass-card p-2 flex gap-2">
              {THEMES.map(({ id, swatch, label }) => (
                <button
                  key={id}
                  onClick={() => handleTheme(id)}
                  title={label}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-150 hover:scale-110 ${
                    activeTheme === id ? "ring-2 ring-[var(--accent-blue)] ring-offset-1 ring-offset-transparent" : ""
                  }`}
                  style={{
                    background: swatch,
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
