"use client";

/**
 * ConditionalStarBackground — mounts the animated star canvas only when the
 * "Starfield" theme is active. Listens for "hoshino-theme-change" events so
 * the canvas is created/destroyed immediately when the user switches themes,
 * stopping the rAF loop and freeing GPU resources for non-starfield themes.
 */

import { useState, useEffect } from "react";
import StarBackground from "@/components/StarBackground";

export default function ConditionalStarBackground() {
  // Start false to avoid a flash on SSR; hydrate on client after theme is known.
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    function check() {
      const theme = document.documentElement.getAttribute("data-theme");
      // Show stars when theme is "starfield" or not yet set (first-visit default)
      setShowStars(!theme || theme === "starfield");
    }
    check();
    window.addEventListener("hoshino-theme-change", check);
    return () => window.removeEventListener("hoshino-theme-change", check);
  }, []);

  return showStars ? <StarBackground /> : null;
}
