"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 121;
// loader hands off once this many frames are ready; the rest stream in
const READY_THRESHOLD = 40;
const frameSrc = (i: number) =>
  `/prizmframes-hd/frame-${String(i + 1).padStart(3, "0")}.webp`;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const lastDrawnRef = useRef(-1);

  const progressRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount >= READY_THRESHOLD;

  /* ---------------- preload ---------------- */
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        loadedRef.current[i] = true;
        lastDrawnRef.current = -1; // a fresher frame is available
        setLoadedCount((c) => c + 1);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, []);

  /* ---------------- loader fade-out ---------------- */
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !ready) return;
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
  }, [ready]);

  /* ---------------- scroll scrub + draw loop ---------------- */
  useEffect(() => {
    let raf = 0;

    const sizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        lastDrawnRef.current = -1; // resizing wipes the buffer — force redraw
      }
    };

    const draw = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext("2d");
      }
      const ctx = ctxRef.current;
      if (!ctx) return;

      // nearest loaded frame, preferring earlier ones
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
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawnRef.current = pick;
    };

    const loop = () => {
      const section = sectionRef.current;
      if (section) {
        sizeCanvas();

        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / total));

        draw(Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT)));

        // spectrum progress line
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", sizeCanvas);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
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
          <span className="meta">
            Loading sequence —{" "}
            {Math.round((loadedCount / FRAME_COUNT) * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
