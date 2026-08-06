"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 121;
// loader hands off once this many frames are ready; the rest stream in
const READY_THRESHOLD = 30;
const INITIAL_BATCH = 15;

const frameSrc = (i: number) =>
  `/prizmframes-hd/frame-${String(i + 1).padStart(3, "0")}.webp`;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const lastDrawnRef = useRef(-1);
  const loadedCountRef = useRef(0);
  const readyRef = useRef(false);

  const progressRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  /* ---------------- Chunked Preload Strategy ---------------- */
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    const handleFrameLoad = (index: number) => {
      if (cancelled) return;
      if (!loadedRef.current[index]) {
        loadedRef.current[index] = true;
        loadedCountRef.current++;
        lastDrawnRef.current = -1; // force redraw with newest available frame

        const count = loadedCountRef.current;
        const pct = Math.round((count / FRAME_COUNT) * 100);

        if (textRef.current) {
          textRef.current.textContent = `Loading sequence — ${pct}%`;
        }

        if (!readyRef.current && count >= READY_THRESHOLD) {
          readyRef.current = true;
          if (loaderRef.current) {
            loaderRef.current.style.opacity = "0";
            loaderRef.current.style.pointerEvents = "none";
          }
        }
      }
    };

    const loadFrame = (i: number) => {
      if (cancelled || images[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => handleFrameLoad(i);
      images[i] = img;
    };

    // Phase 1: Load critical initial batch immediately
    for (let i = 0; i < INITIAL_BATCH; i++) {
      loadFrame(i);
    }

    // Phase 2: Stream remaining frames in idle / background chunks
    let current = INITIAL_BATCH;
    const loadNextChunk = () => {
      if (cancelled || current >= FRAME_COUNT) return;
      const end = Math.min(current + 10, FRAME_COUNT);
      for (let i = current; i < end; i++) {
        loadFrame(i);
      }
      current = end;
      if (current < FRAME_COUNT) {
        if (typeof window.requestIdleCallback === "function") {
          window.requestIdleCallback(loadNextChunk, { timeout: 200 });
        } else {
          setTimeout(loadNextChunk, 30);
        }
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(loadNextChunk, { timeout: 300 });
    } else {
      setTimeout(loadNextChunk, 50);
    }

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, []);

  /* ---------------- IntersectionObserver + Render Loop ---------------- */
  useEffect(() => {
    let raf = 0;
    let isVisible = false;
    let cachedTotal = 0;
    let cachedTop = 0;

    const updateDimensions = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedTotal = rect.height - window.innerHeight;
    };

    const sizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        lastDrawnRef.current = -1; // Canvas resized, force redraw
      }
    };

    const draw = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext("2d", { alpha: false });
      }
      const ctx = ctxRef.current;
      if (!ctx) return;

      // Find nearest loaded frame
      let pick = -1;
      for (let i = index; i >= 0; i--) {
        if (loadedRef.current[i]) {
          pick = i;
          break;
        }
      }
      if (pick === -1) {
        for (let i = index + 1; i < FRAME_COUNT; i++) {
          if (loadedRef.current[i]) {
            pick = i;
            break;
          }
        }
      }

      if (pick === -1 || pick === lastDrawnRef.current) return;

      const img = imagesRef.current[pick];
      if (!img || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawnRef.current = pick;
    };

    const loop = () => {
      if (!isVisible) return;

      const section = sectionRef.current;
      if (section) {
        sizeCanvas();

        const scrollY = window.scrollY;
        const relativeScroll = scrollY - cachedTop;
        const p = cachedTotal > 0 ? Math.min(1, Math.max(0, relativeScroll / cachedTotal)) : 0;

        draw(Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT)));

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    // IntersectionObserver to pause loop when off-screen
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          updateDimensions();
          sizeCanvas();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    if (section) {
      observer.observe(section);
      updateDimensions();
      sizeCanvas();
    }

    const handleResize = () => {
      updateDimensions();
      sizeCanvas();
      lastDrawnRef.current = -1; // force redraw on resize
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (section) observer.unobserve(section);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[480vh] bg-[#070708]">
      {/* sticky cinema viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* first frame as instant poster + insurance if canvas ever fails */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(0)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* ------- spectrum progress line ------- */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-30">
          <div
            ref={progressRef}
            className="h-full w-full origin-left"
            style={{
              background: "var(--spectrum)",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* ------- loader ------- */}
        <div
          ref={loaderRef}
          className="absolute inset-0 z-40 bg-[#070708] flex items-center justify-center transition-opacity duration-700"
        >
          <span ref={textRef} className="meta">
            Loading sequence — 0%
          </span>
        </div>
      </div>
    </section>
  );
}

