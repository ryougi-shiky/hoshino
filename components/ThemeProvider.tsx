"use client";

/**
 * ThemeProvider — restores the user's chosen color theme on every page load.
 * The theme is stored in localStorage and applied as a `data-theme` attribute
 * on <html>. CSS variables keyed on that attribute drive the glass-panel tints
 * and body background. Dispatches "hoshino-theme-change" so other client
 * components (e.g. ConditionalStarBackground) can react immediately.
 */

import { useEffect } from "react";

const STORAGE_KEY = "hoshino-theme";

export type Theme = "starfield" | "monochrome" | "white";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "starfield";
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "starfield";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
  // Notify other client components (e.g. ConditionalStarBackground)
  window.dispatchEvent(new Event("hoshino-theme-change"));
}

export default function ThemeProvider() {
  useEffect(() => {
    // Apply the persisted theme as early as possible after hydration
    applyTheme(getStoredTheme());
  }, []);

  return null;
}
