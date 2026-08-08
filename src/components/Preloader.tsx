"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FRAME_TOTAL,
  READY_THRESHOLD,
  getFrameCount,
  onFrames,
} from "@/lib/loading";

type Dot = {
  x: number;
  y: number;
  s: number;
  a: number;
  th: number;
  sx: number;
  sy: number;
  ph: number;
  sp: number;
};

const LOGO_SRC = "/prizmlogo-transparent.png";
const LOGO_RATIO = 1024 / 393;
const MIN_VISIBLE = 4;
const EXIT_DURATION = 4;
const SAFETY_CAP = 9;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;

    const root = rootRef.current;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    const wash = washRef.current;
    if (!root || !wrap || !canvas || !counter || !bar || !wash) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let disposed = false;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let ratio = LOGO_RATIO;
    let dots: Dot[] = [];
    let imgEl: HTMLImageElement | null = null;
    let resolved = false;
    let exiting = false;
    let fontsOk = false;
    const startT = performance.now() / 1000;

    const state = {
      display: 0,
      raw: getFrameCount() / FRAME_TOTAL,
    };

    const unsub = onFrames((count) => {
      state.raw = count / FRAME_TOTAL;
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        fontsOk = true;
      });
    }
    const fontTimer = window.setTimeout(() => {
      fontsOk = true;
    }, 2500);

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const prevent = (e: Event) => e.preventDefault();
    const scrollKeys = [
      " ",
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ];
    const preventKey = (e: KeyboardEvent) => {
      if (scrollKeys.includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", preventKey);

    const fallbackMark = (
      w: number,
      h: number,
      octx: CanvasRenderingContext2D
    ) => {
      const cx = w / 2;
      const pad = h * 0.1;
      const side = h - pad * 2;
      octx.strokeStyle = "#ffffff";
      octx.lineWidth = Math.max(2, h * 0.045);
      for (let ring = 0; ring < 3; ring++) {
        const r = side * (1 - ring * 0.3);
        octx.beginPath();
        octx.moveTo(cx, h / 2 - r / 2);
        octx.lineTo(cx + r / 2, h / 2 + r / 2);
        octx.lineTo(cx - r / 2, h / 2 + r / 2);
        octx.closePath();
        octx.stroke();
      }
    };

    const buildDots = (img: HTMLImageElement | null) => {
      const markW = Math.min(width * 0.72, 620);
      const markH = markW / ratio;
      const offX = (width - markW) / 2;
      const offY = (height - markH) / 2;

      const scale = 2;
      const off = document.createElement("canvas");
      off.width = Math.max(2, Math.round(markW * scale));
      off.height = Math.max(2, Math.round(markH * scale));
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      if (img && img.naturalWidth > 0) {
        octx.drawImage(img, 0, 0, off.width, off.height);
      } else {
        fallbackMark(off.width, off.height, octx);
      }
      const data = octx.getImageData(0, 0, off.width, off.height).data;

      const pitch = Math.max(3, markW / 160);
      const cx = markW / 2;
      const cy = markH / 2;
      const maxDist = Math.hypot(cx, cy);
      const next: Dot[] = [];

      for (let y = pitch / 2; y < markH; y += pitch) {
        for (let x = pitch / 2; x < markW; x += pitch) {
          const sx = Math.min(off.width - 1, Math.floor(x * scale));
          const sy = Math.min(off.height - 1, Math.floor(y * scale));
          const alpha = data[(sy * off.width + sx) * 4 + 3];
          if (alpha < 60) continue;
          const dist = Math.hypot(x - cx, y - cy) / maxDist;
          const ang = Math.random() * Math.PI * 2;
          const d = 60 + Math.random() * Math.max(240, width * 0.5);
          next.push({
            x: offX + x,
            y: offY + y,
            s: (0.8 + (alpha / 255) * 0.9) * Math.max(1.1, pitch * 0.42),
            a: 0.35 + 0.65 * (alpha / 255),
            th: Math.min(0.9, dist * 0.55 + Math.random() * 0.42),
            sx: Math.cos(ang) * d,
            sy: Math.sin(ang) * d,
            ph: Math.random() * Math.PI * 2,
            sp: 0.5 + Math.random(),
          });
        }
      }
      dots = next;
    };

    const sizeAll = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = root.getBoundingClientRect();
      width = Math.max(2, Math.round(rect.width));
      height = Math.max(2, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (resolved) buildDots(imgEl);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sizeAll, 150);
    };
    window.addEventListener("resize", onResize);

    sizeAll();

    const loader = new Image();
    loader.onload = () => {
      if (disposed) return;
      imgEl = loader;
      resolved = true;
      if (loader.naturalWidth > 0 && loader.naturalHeight > 0) {
        ratio = loader.naturalWidth / loader.naturalHeight;
        wrap.style.aspectRatio = `${loader.naturalWidth} / ${loader.naturalHeight}`;
      }
      sizeAll();
    };
    loader.onerror = () => {
      if (disposed) return;
      resolved = true;
      sizeAll();
    };
    loader.src = LOGO_SRC;

    let timeline: ReturnType<typeof gsap.timeline> | null = null;

    const finish = () => {
      setDone(true);
    };

    const beginExit = () => {
      if (exiting) return;
      exiting = true;
      const d = reduced ? 0.35 : 1;
      const logo = logoRef.current;
      const glow = glowRef.current;
      timeline = gsap.timeline({ onComplete: finish });
      timeline.to(
        state,
        { display: 1, duration: 0.5 * d, ease: "power2.inOut" },
        0
      );
      if (logo) {
        timeline.to(
          logo,
          { opacity: 1, duration: 0.6 * d, ease: "power2.inOut" },
          0.1 * d
        );
      }
      timeline.to(
        wrap,
        { scale: 1.06, duration: 0.45 * d, ease: "power2.in" },
        0.7 * d
      );
      timeline.to(
        canvas,
        { filter: "brightness(1.9)", duration: 0.45 * d, ease: "power2.in" },
        0.7 * d
      );
      if (glow) {
        timeline.to(
          glow,
          { opacity: 1, scale: 1.7, duration: 0.45 * d, ease: "power2.in" },
          0.7 * d
        );
      }
      timeline.to(
        wash,
        {
          clipPath: "circle(140% at 50% 50%)",
          duration: 1.3 * d,
          ease: "power2.inOut",
        },
        1.15 * d
      );
      timeline.fromTo(
        wash,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 2.8 * d,
          ease: "none",
        },
        1.15 * d
      );
      timeline.to(
        root,
        { yPercent: -100, duration: 1.1 * d, ease: "power4.inOut" },
        2.9 * d
      );
    };

    const frame = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      const t = now / 1000;

      if (!exiting) {
        state.display += (state.raw - state.display) * 0.05;
        if (state.raw - state.display < 0.0005) state.display = state.raw;

        const loaded = getFrameCount();
        const elapsed = t - startT;
        const contentReady =
          loaded >= FRAME_TOTAL || (loaded >= READY_THRESHOLD && fontsOk);
        if (
          (contentReady &&
            elapsed >= MIN_VISIBLE - EXIT_DURATION &&
            state.display > 0.985) ||
          (loaded >= READY_THRESHOLD && elapsed >= SAFETY_CAP)
        ) {
          beginExit();
        }
      }

      const p = state.display;
      counter.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
      bar.style.transform = `scaleX(${p})`;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f2f0eb";
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const kRaw = reduced ? 1 : clamp01((p * 1.18 - dot.th) / 0.18);
        const k = kRaw * kRaw * (3 - 2 * kRaw);
        const wob = 1 - k;
        const jx =
          Math.sin(t * dot.sp * 2 + dot.ph) * 14 * wob +
          Math.sin(t * 0.7 + dot.ph) * 8 * wob;
        const jy = Math.cos(t * dot.sp * 1.7 + dot.ph) * 14 * wob;
        ctx.globalAlpha = dot.a * (0.22 + 0.78 * k);
        ctx.fillRect(
          dot.x + dot.sx * wob + jx,
          dot.y + dot.sy * wob + jy,
          dot.s,
          dot.s
        );
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(fontTimer);
      unsub();
      timeline?.kill();
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", preventKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] bg-[#070708] flex items-center justify-center select-none"
    >
      <div className="absolute top-6 left-6 meta">
        Prizm® — Creative Studio
      </div>
      <div className="absolute top-6 right-6 meta">©2026</div>

      <div
        ref={glowRef}
        className="absolute w-[42vmin] h-[42vmin] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(242,240,235,0.05) 0%, transparent 70%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        ref={wrapRef}
        className="relative w-[min(72vw,620px)] pointer-events-none"
        style={{ aspectRatio: `${LOGO_RATIO}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src={LOGO_SRC}
          alt=""
          draggable={false}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-contain opacity-0"
        />
      </div>

      <div className="absolute bottom-10 left-8 text-bone/90 text-base md:text-xl">
        Gathering light.
      </div>
      <span
        ref={counterRef}
        className="absolute bottom-10 right-8 font-mono text-base md:text-xl tracking-[0.25em] text-bone/90"
      >
        000%
      </span>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-bone"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div
        ref={washRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "var(--spectrum)",
          backgroundSize: "200% 100%",
          clipPath: "circle(0% at 50% 50%)",
        }}
      />

      <div className="absolute top-full left-0 right-0 h-[12vh] bg-[#070708]" />
    </div>
  );
}
