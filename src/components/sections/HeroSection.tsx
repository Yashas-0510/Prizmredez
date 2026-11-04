"use client";

import { useEffect, useSyncExternalStore, useRef } from "react";
import { reportFrames } from "@/lib/loading";

const INITIAL_BATCH_DESKTOP = 24;
const INITIAL_BATCH_MOBILE = 16;

const FRAME_TOTAL_DESKTOP = 121;
const FRAME_TOTAL_MOBILE = 115;

const getFrameSrc = (isMobile: boolean, i: number) => {
  if (isMobile) {
    return `/prizmmobheroframes/ezgif-frame-${String(i + 1).padStart(3, "0")}.webp`;
  }
  return `/prizmframes-hd/frame-${String(i + 1).padStart(3, "0")}.webp`;
};

function useIsMobile() {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia("(max-width: 767px)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.innerWidth < 768,
    () => false
  );
}

export default function HeroSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const lastDrawnRef = useRef(-1);
  const loadedCountRef = useRef(0);
  const frameTotalRef = useRef(FRAME_TOTAL_DESKTOP);
  const wakeRenderRef = useRef<(() => void) | null>(null);

  const scrollCueRef = useRef<HTMLDivElement>(null);
  const beatOneTagRef = useRef<HTMLDivElement>(null);
  const beatOneHeadRef = useRef<HTMLHeadingElement>(null);
  const beatTwoTagRef = useRef<HTMLDivElement>(null);
  const beatTwoHeadRef = useRef<HTMLHeadingElement>(null);
  const darkVeilRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const total = mobile ? FRAME_TOTAL_MOBILE : FRAME_TOTAL_DESKTOP;
    frameTotalRef.current = total;
    reportFrames(0, total);

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
        reportFrames(loadedCountRef.current, total);
        if (index === 0 || lastDrawnRef.current === -1) {
          lastDrawnRef.current = -1;
          wakeRenderRef.current?.();
        }
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
    const chunkSize = mobile ? 10 : 16;

    const scheduleNext = (fn: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (
          window as unknown as {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number }
            ) => number;
          }
        ).requestIdleCallback(fn, { timeout: 250 });
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
    let sectionTop = 0;
    let totalScroll = 1;
    let lastWidth = 0;
    let isHeroInView = true;

    const draw = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext("2d", {
          alpha: false,
        });
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
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawnRef.current = pick;

      // Hide fallback <img> once canvas has painted its first frame
      if (posterRef.current && posterRef.current.style.display !== "none") {
        posterRef.current.style.display = "none";
      }
    };

    const updateBounds = () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const isMob = window.innerWidth < 768;

      if (lastWidth > 0 && Math.abs(window.innerWidth - lastWidth) < 10) {
        if (section) {
          sectionTop = section.offsetTop;
          totalScroll = Math.max(1, section.offsetHeight - window.innerHeight);
        }
        return;
      }
      lastWidth = window.innerWidth;

      if (section) {
        sectionTop = section.offsetTop;
        totalScroll = Math.max(1, section.offsetHeight - window.innerHeight);
      }
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.round(window.innerWidth * dpr);
        const expandedH = isMob
          ? Math.max(
              window.innerHeight,
              typeof window !== "undefined" && window.screen?.height
                ? window.screen.height
                : window.innerHeight
            )
          : window.innerHeight;
        const h = Math.round(expandedH * dpr);

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          lastDrawnRef.current = -1;
        }
      }
    };

    const tick = () => {
      raf = 0;
      if (!isHeroInView) return;

      const currentScroll = window.scrollY || window.pageYOffset || 0;
      // Direct 1:1 sync with Lenis smooth scroll (no double-lerp frame skipping!)
      const renderP = Math.min(
        1,
        Math.max(0, (currentScroll - sectionTop) / totalScroll)
      );

      const total = frameTotalRef.current;
      const frameIdx = Math.min(total - 1, Math.floor(renderP * total));
      draw(frameIdx);

      // Scroll Cue Fade Out (0% -> 12%)
      if (scrollCueRef.current) {
        const cueAlpha = Math.max(0, Math.min(1, 1 - renderP * 10));
        scrollCueRef.current.style.opacity = `${cueAlpha}`;
        scrollCueRef.current.style.transform = `translate3d(-50%, ${
          renderP * 36
        }px, 0)`;
      }

      // Beat 1 (14% -> 46%): "IMAGINATION UNLEASHED."
      if (beatOneTagRef.current && beatOneHeadRef.current) {
        const enter1 = Math.max(0, Math.min(1, (renderP - 0.14) / 0.09));
        const exit1 = Math.max(0, Math.min(1, (0.46 - renderP) / 0.08));
        const easeIn1 = 1 - Math.pow(1 - enter1, 3);
        const alpha1 = easeIn1 * exit1;
        const y1 = (1 - easeIn1) * 100 - (1 - exit1) * 45;

        beatOneTagRef.current.style.opacity = `${alpha1}`;
        beatOneTagRef.current.style.transform = `translate3d(0, ${y1}%, 0)`;

        beatOneHeadRef.current.style.opacity = `${alpha1}`;
        beatOneHeadRef.current.style.transform = `translate3d(0, ${y1}%, 0)`;
      }

      // Beat 2 (52% -> 84%): "ENGINEERED TO CAPTIVATE."
      if (beatTwoTagRef.current && beatTwoHeadRef.current) {
        const enter2 = Math.max(0, Math.min(1, (renderP - 0.52) / 0.09));
        const exit2 = Math.max(0, Math.min(1, (0.84 - renderP) / 0.08));
        const easeIn2 = 1 - Math.pow(1 - enter2, 3);
        const alpha2 = easeIn2 * exit2;
        const y2 = (1 - easeIn2) * 100 - (1 - exit2) * 45;

        beatTwoTagRef.current.style.opacity = `${alpha2}`;
        beatTwoTagRef.current.style.transform = `translate3d(0, ${y2}%, 0)`;

        beatTwoHeadRef.current.style.opacity = `${alpha2}`;
        beatTwoHeadRef.current.style.transform = `translate3d(0, ${y2}%, 0)`;
      }

      // Seamless atmospheric dark fade into Room 01 over the final 15% (85% -> 100%)
      if (darkVeilRef.current) {
        const veilAlpha = Math.max(0, Math.min(1, (renderP - 0.85) / 0.15));
        darkVeilRef.current.style.opacity = `${veilAlpha * 0.92}`;
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${renderP})`;
      }
    };

    const wakeLoop = () => {
      if (!raf && isHeroInView) {
        raf = requestAnimationFrame(tick);
      }
    };

    wakeRenderRef.current = wakeLoop;

    updateBounds();
    wakeLoop();

    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isHeroInView = entry?.isIntersecting ?? true;
          if (isHeroInView) {
            updateBounds();
            wakeLoop();
          } else if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { rootMargin: "100px 0px" }
      );
      observer.observe(sectionRef.current);
    }

    const onResize = () => {
      updateBounds();
      wakeLoop();
    };

    window.addEventListener("scroll", wakeLoop, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      wakeRenderRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("scroll", wakeLoop);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[320vh] md:h-[350vh] bg-[#070708]">
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* first frame as instant poster until canvas paints frame 0 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={posterRef}
          src={getFrameSrc(isMobile, 0)}
          alt="PRIZM Visual Experience"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.08) saturate(1.15)" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full transform-gpu"
          style={{ filter: "contrast(1.08) saturate(1.15)" }}
        />

        {/* Accessible & SEO Semantic H1 — visually hidden (sr-only) so it does not block the cinematic hero */}
        <h1 className="sr-only">
          PRIZM® — Creative Studio | Web Experiences, 3D Motion, Ad Creatives & AI UGC
        </h1>

        {/* Scroll-Driven Dark Transition Veil (85% -> 100%) to eliminate hard cut into Room 01 */}
        <div
          ref={darkVeilRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-15 bg-[#070708] opacity-0 will-change-opacity"
        />

        {/* Beat 1 (14% -> 46%): Signature Syne Solid + Outline ("IMAGINATION UNLEASHED.") */}
        <div className="absolute bottom-14 md:bottom-20 left-1/2 -translate-x-1/2 z-25 pointer-events-none w-[94vw] max-w-5xl text-center flex flex-col items-center">
          <div className="overflow-hidden py-1 mb-1.5">
            <div
              ref={beatOneTagRef}
              className="flex items-center justify-center gap-2 font-mono text-[9.5px] sm:text-[10.5px] md:text-[11px] uppercase tracking-[0.28em] text-bone [text-shadow:0_2px_12px_rgba(0,0,0,0.95)] opacity-0 will-change-transform"
              style={{ transform: "translate3d(0, 100%, 0)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse shrink-0" />
              <span>PRIZM® — CREATIVE STUDIO</span>
            </div>
          </div>

          <div className="overflow-hidden py-1.5">
            <h2
              ref={beatOneHeadRef}
              className="font-heading font-extrabold uppercase text-[clamp(1.65rem,4.5vw,3.65rem)] leading-[1.04] tracking-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.9)] opacity-0 will-change-transform"
              style={{ transform: "translate3d(0, 100%, 0)" }}
            >
              IMAGINATION{" "}
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.92)",
                  color: "transparent",
                  filter: "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.85))",
                }}
              >
                UNLEASHED.
              </span>
            </h2>
          </div>
        </div>

        {/* Beat 2 (52% -> 84%): Signature Syne Solid + Outline ("ENGINEERED TO CAPTIVATE.") */}
        <div className="absolute bottom-14 md:bottom-20 left-1/2 -translate-x-1/2 z-25 pointer-events-none w-[94vw] max-w-5xl text-center flex flex-col items-center">
          <div className="overflow-hidden py-1 mb-1.5">
            <div
              ref={beatTwoTagRef}
              className="flex items-center justify-center gap-2 font-mono text-[9.5px] sm:text-[10.5px] md:text-[11px] uppercase tracking-[0.26em] text-bone [text-shadow:0_2px_12px_rgba(0,0,0,0.95)] opacity-0 will-change-transform"
              style={{ transform: "translate3d(0, 100%, 0)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse shrink-0" />
              <span>WEB · 3D MOTION · AD CREATIVES · AI UGC</span>
            </div>
          </div>

          <div className="overflow-hidden py-1.5">
            <h2
              ref={beatTwoHeadRef}
              className="font-heading font-extrabold uppercase text-[clamp(1.65rem,4.5vw,3.65rem)] leading-[1.04] tracking-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.9)] opacity-0 will-change-transform"
              style={{ transform: "translate3d(0, 100%, 0)" }}
            >
              ENGINEERED TO{" "}
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.92)",
                  color: "transparent",
                  filter: "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.85))",
                }}
              >
                CAPTIVATE.
              </span>
            </h2>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 z-30 pointer-events-none flex flex-col items-center gap-2"
          style={{ transform: "translate3d(-50%, 0px, 0)" }}
        >
          <div className="px-3.5 py-1.5 md:px-4 md:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center gap-2 md:gap-2.5 shadow-lg max-w-[92vw]">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-spectrum animate-pulse shrink-0" />
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.16em] md:tracking-[0.3em] text-bone/85 whitespace-nowrap">
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
