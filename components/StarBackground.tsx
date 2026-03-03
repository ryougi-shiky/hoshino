"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      stars.length = 0;
      const count = Math.floor((window.innerWidth * window.innerHeight) / 2500);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });
    }

    let lastTime = 0;
    function animate(time: number) {
      if (time - lastTime > 50) {
        // cap at 20fps (50ms per frame) for performance
        draw(time);
        lastTime = time;
      }
      animationId = requestAnimationFrame(animate);
    }

    resize();
    createStars();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      createStars();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      aria-hidden="true"
    />
  );
}
