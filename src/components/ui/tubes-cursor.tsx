"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

function useIsDesktop() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      const isMin768 = window.innerWidth >= 768;
      const isPointerFine =
        window.matchMedia("(pointer: fine)").matches ||
        window.matchMedia("(any-pointer: fine)").matches ||
        !("ontouchstart" in window);
      return isMin768 && isPointerFine;
    },
    () => false
  );
}

/**
 * Zero-Lag Prismatic Magnetic Cursor & Light Ribbon Trail.
 * Replaces the heavy full-screen 3D WebGL tubes1.min.js shader (which consumed 8-12ms/frame of GPU)
 * with a lightweight 2D prismatic ribbon + interactive cursor reticle that sleeps when the mouse is idle.
 */
export default function TubesCursor() {
  const isDesktop = useIsDesktop();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const TRAIL_LEN = 18;
    const pts = Array.from({ length: TRAIL_LEN }, () => ({
      x: width / 2,
      y: height / 2,
    }));

    const target = { x: width / 2, y: height / 2 };
    const dotPos = { x: width / 2, y: height / 2 };
    let raf = 0;
    let initialized = false;

    const render = () => {
      raf = 0;

      // Smoothly interpolate cursor ring
      dotPos.x += (target.x - dotPos.x) * 0.28;
      dotPos.y += (target.y - dotPos.y) * 0.28;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

      // Update ribbon chain
      pts[0].x += (target.x - pts[0].x) * 0.45;
      pts[0].y += (target.y - pts[0].y) * 0.45;
      let totalDelta =
        Math.abs(target.x - dotPos.x) + Math.abs(target.y - dotPos.y);

      for (let i = 1; i < TRAIL_LEN; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        cur.x += (prev.x - cur.x) * 0.42;
        cur.y += (prev.y - cur.y) * 0.42;
        totalDelta += Math.abs(prev.x - cur.x) + Math.abs(prev.y - cur.y);
      }

      ctx.clearRect(0, 0, width, height);

      if (totalDelta > 0.4) {
        const grad = ctx.createLinearGradient(
          pts[0].x,
          pts[0].y,
          pts[TRAIL_LEN - 1].x,
          pts[TRAIL_LEN - 1].y
        );
        grad.addColorStop(0, "rgba(255, 217, 160, 0.55)");
        grad.addColorStop(0.3, "rgba(255, 158, 198, 0.45)");
        grad.addColorStop(0.65, "rgba(201, 156, 255, 0.35)");
        grad.addColorStop(1, "rgba(142, 197, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < TRAIL_LEN - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) * 0.5;
          const yc = (pts[i].y + pts[i + 1].y) * 0.5;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        raf = requestAnimationFrame(render);
      }
    };

    const wake = () => {
      if (!raf) {
        raf = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!initialized) {
        initialized = true;
        dotPos.x = target.x;
        dotPos.y = target.y;
        for (let i = 0; i < TRAIL_LEN; i++) {
          pts[i].x = target.x;
          pts[i].y = target.y;
        }
      }
      wake();

      // Check for interactive hover target
      const el = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      if (el) {
        setIsHovered(true);
        const txt = el.getAttribute("data-cursor-text") || "";
        setCursorLabel(txt);
      } else {
        setIsHovered(false);
        setCursorLabel("");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[92] overflow-hidden"
      style={{ contain: "strict" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ${
            cursorLabel
              ? "px-3 py-1 bg-black/80 border border-white/30 backdrop-blur-md shadow-lg"
              : isHovered
              ? "w-7 h-7 bg-white/10 border border-white/50"
              : "w-2.5 h-2.5 bg-bone/90 shadow-[0_0_10px_rgba(201,156,255,0.6)]"
          }`}
        >
          {cursorLabel && (
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone whitespace-nowrap">
              {cursorLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
