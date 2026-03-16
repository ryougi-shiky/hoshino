"use client";

/**
 * ThemeProvider — restores the user's chosen color theme on every page load.
 * The theme is stored in localStorage and applied as a `data-theme` attribute
 * on <html>. CSS variables keyed on that attribute drive the glass-panel tints.
 */

import { useEffect } from "react";

const STORAGE_KEY = "hoshino-theme";

export type Theme =
  | "monochrome"
  | "arctic"
  | "ocean"
  | "sunset"
  | "lavender"
  | "emerald";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "monochrome";
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "monochrome";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export default function ThemeProvider() {
  useEffect(() => {
    // Apply the persisted theme as early as possible after hydration
    const saved = getStoredTheme();
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return null;
}
