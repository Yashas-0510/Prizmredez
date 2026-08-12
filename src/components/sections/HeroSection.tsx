"use client";

import { useEffect, useRef, useState } from "react";
import { reportFrames } from "@/lib/loading";

const INITIAL_BATCH_DESKTOP = 40;
const INITIAL_BATCH_MOBILE = 20;

const FRAME_TOTAL_DESKTOP = 121;
const FRAME_TOTAL_MOBILE = 125;

const getFrameSrc = (isMobile: boolean, i: number) => {
  if (isMobile) {
    return `/prizmmobheroframes/frame-${String(i + 1).padStart(3, "0")}.webp`;
  }
  return `/prizmframes-hd/frame-${String(i + 1).padStart(3, "0")}.webp`;
};

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const lastDrawnRef = useRef(-1);
  const loadedCountRef = useRef(0);
  const frameTotalRef = useRef(FRAME_TOTAL_DESKTOP);

  const scrollCueRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const total = mobile ? FRAME_TOTAL_MOBILE : FRAME_TOTAL_DESKTOP;
    frameTotalRef.current = total;

    let cancelled = false;
    const images: HTMLImageElement[] = new Array(total);
    imagesRef.current = images;
    loadedRef.current = new Array(total).fill(false);
    loadedCountRef.current = 0;
    lastDrawnRef.current = -1;

    const handleFrameLoad = (index: number) => {
      if (cancelled) return;
      if (!loadedRef.current[index]) {
        loadedRef.current[index] = true;
        loadedCountRef.current++;
        lastDrawnRef.current = -1;
        reportFrames(loadedCountRef.current);
      }
    };

    const loadFrame = (i: number) => {
      if (cancelled || images[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameSrc(mobile, i);
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => handleFrameLoad(i))
          .catch(() => {
            img.onload = () => handleFrameLoad(i);
          });
      } else {
        img.onload = () => handleFrameLoad(i);
      }
      images[i] = img;
    };

    // Load initial small batch immediately for fast interactive start
    const initialBatch = mobile ? INITIAL_BATCH_MOBILE : INITIAL_BATCH_DESKTOP;
    const initialCount = Math.min(initialBatch, total);
    for (let i = 0; i < initialCount; i++) {
      loadFrame(i);
    }

    // Smooth idle-priority chunk loading for remaining frames
    let current = initialCount;
    const chunkSize = mobile ? 10 : 20;

    const scheduleNext = (fn: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
          .requestIdleCallback(fn, { timeout: 250 });
      } else {
        setTimeout(fn, mobile ? 32 : 16);
      }
    };

    const loadNextChunk = () => {
      if (cancelled || current >= total) return;
      const end = Math.min(current + chunkSize, total);
      for (let i = current; i < end; i++) {
        loadFrame(i);
      }
      current = end;
      if (current < total) {
        scheduleNext(loadNextChunk);
      }
    };

    scheduleNext(loadNextChunk);

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let renderP = 0;
    let sectionTop = 0;
    let totalScroll = 1;

    const updateBounds = () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      if (section) {
        sectionTop = section.offsetTop;
        totalScroll = Math.max(1, section.offsetHeight - window.innerHeight);
      }
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.round(window.innerWidth * dpr);
        const h = Math.round(window.innerHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          lastDrawnRef.current = -1;
        }
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

      const total = frameTotalRef.current;
      let pick = -1;
      for (let i = index; i >= 0; i--) {
        if (loadedRef.current[i]) {
          pick = i;
          break;
        }
      }
      if (pick === -1) {
        for (let i = index + 1; i < total; i++) {
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
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const targetP = Math.min(
        1,
        Math.max(0, (currentScroll - sectionTop) / totalScroll)
      );

      // Smooth 60FPS Lerp Damping
      renderP += (targetP - renderP) * 0.14;
      if (Math.abs(targetP - renderP) < 0.0001) renderP = targetP;

      const total = frameTotalRef.current;
      draw(Math.min(total - 1, Math.floor(renderP * total)));

      // Scroll Cue Fade Out
      if (scrollCueRef.current) {
        const cueAlpha = Math.max(0, Math.min(1, 1 - renderP * 12));
        scrollCueRef.current.style.opacity = `${cueAlpha}`;
        scrollCueRef.current.style.transform = `translate(-50%, ${
          renderP * 40
        }px)`;
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${renderP})`;
      }
      raf = requestAnimationFrame(loop);
    };

    updateBounds();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", updateBounds, { passive: true });
    window.addEventListener("scroll", updateBounds, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[480vh] bg-[#070708]">
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* first frame as instant poster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFrameSrc(isMobile, 0)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Scroll Cue Indicator */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 z-30 pointer-events-none flex flex-col items-center gap-2"
          style={{ transform: "translate(-50%, 0px)" }}
        >
          <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center gap-2.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-spectrum animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
              SCROLL TO DISPERSE
            </span>
          </div>
        </div>

        {/* Bottom Progress Bar */}
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
      </div>
    </section>
  );
}
