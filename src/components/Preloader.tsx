"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  setPreloaderActive,
  setPreloaderTransitioning,
} from "@/lib/loading";

// Pre-baked 132x28 True-Color 3D Crystal Facet Matrix of /prizmlogo-transparent.png
// 1 = Diamond Specular White Bevel Ridge (#FFFFFF)
// 2 = Luminous Crystal Ice (#EBF3FF)
// 3 = Electric Sapphire Blue (#78B0FF)
// 4 = Radiant Glacier Cyan (#73F8FF)
// 5 = Holographic Amethyst Violet (#CA98FF)
// 6 = Iridescent Rose-Magenta (#FF8CE2)
// 7 = Solar Caustic Gold (#FFE082)
const PRIZM_CRYSTAL_MAP = [
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "002443333333333333333300000000000000003333333333333433321300000000003500003332433333333344444444333000000000340000000033000000003200",
  "031333333444333333333520000000000000031333333333355522255300000000013300003233522225555553333333313000000001330000000333000000023200",
  "033133333334444333335221000000000000342333333333555525212100000000213300000535122222555533335531330000000013330000003333000000253300",
  "033313333333333332551222200000000003421333333333325221112100000002612500000043113333355535552233300000000222310000031532000005552300",
  "033332533333333442221222210000000032111443333333222221122100000032535300000052122433334422114434000000001525520000421111000056215500",
  "033333333222122235553331221000000311233344343335521212125200000226155300000003241333342121123343000000012123550004111311000525252500",
  "033333352111124444333333322100003134333443333333331112255300001225653500000000143334222211141330000000221132230041111112005122652500",
  "033355521111123333333353333330013343333333333333412122215300011626553300000000013334222211111200000002111331330211117124022272221100",
  "000000000000000000000000000000000000000000000000032111213300331166653300000000000000042111212000000003313521434211272224222272212100",
  "003133335222533333333333333330044333333333333335321121134400335266653500000000000000111111110000000003331522331113111434277177771100",
  "035555552553333333333333333130033335333333333333411111534500335666665600000000000001171111200000000003331253411133224341121277742300",
  "033265552225553333333332151300033156553333334422511255355000335666555500000000000022774212300000000003322132211333234311112777422100",
  "035355221125333333335262523000033355522433333333322535330000335666565200000000000217742143000000000003344321113352333122111772471100",
  "033355222113333333335755230000033355222433333333333331534000335526252200000000000177121430000000000003443211113552441221211722771100",
  "033332222215333333333213300000033366512233333333233333534300335162722200000000002771514200000000000003434111133534422212522127727100",
  "033335272213333333333443000000033365222333333334423333323300035127221100000000027712344000000000000002331111355353125132122427717200",
  "033335222113353335533330000000033362225323333351344333333300423172221100000000227153340000000000000003121113553112221333311127127200",
  "033335122430000000000000000000033322271330000000443333353300423271221100000001221533313333333000000003211165233332115333242212212200",
  "033535272720000000000000000000035552772250000000023535352300141177772300000022233333333333331300000002111671430333552233032324221200",
  "035555727100000000000000000000035522772600000000005531552500242227773000000024233533333335551630000001122721300355576250032252122000",
  "035332222000000000000000000000022312226000000000000331552200222177230000000444333333333355516570000002227275000356262500033334450000",
  "032521220000000000000000000000032212150000000000000022221100222772200000002223153333333335256762000002272750000533525000033333200000",
  "033321200000000000000000000000032112500000000000000001122100413273000000031213333333333333353322100001227200000553510000033335000000",
  "013112000000000000000000000000021112000000000000000000125100712220000000411333333333333555335333730001123000000442100000032220000000",
  "014440000000000000000000000000044220000000000000000000012100142300000000333333333333333333333334434002240000000342000000034100000000",
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
];

// Vibrant, high-luminance crystal facet palette (0-indexed for codes 1..7)
const CRYSTAL_FACET_PALETTE = [
  "#FFFFFF", // 0 (Code 1): Pure Brilliant Diamond Specular White
  "#EBF3FF", // 1 (Code 2): Luminous Crystal Ice White-Blue
  "#78B0FF", // 2 (Code 3): Electric Sapphire Crystal Blue
  "#73F8FF", // 3 (Code 4): Radiant Glacier Cyan
  "#CA98FF", // 4 (Code 5): Holographic Amethyst Violet
  "#FF8CE2", // 5 (Code 6): Iridescent Rose-Magenta
  "#FFE082", // 6 (Code 7): Warm Solar Caustic Gold
];

// Fast 1024-entry Sine Lookup Table to avoid thousands of Math.sin/cos calls per frame
const LUT_SIZE = 1024;
const LUT_MASK = LUT_SIZE - 1;
const RAD_TO_LUT = LUT_SIZE / (Math.PI * 2);
const SIN_LUT = new Float32Array(LUT_SIZE);
for (let i = 0; i < LUT_SIZE; i++) {
  SIN_LUT[i] = Math.sin((i / LUT_SIZE) * Math.PI * 2);
}
const fastSin = (rad: number) => SIN_LUT[(Math.floor(rad * RAD_TO_LUT) & LUT_MASK)];
const fastCos = (rad: number) => SIN_LUT[((Math.floor(rad * RAD_TO_LUT) + 256) & LUT_MASK)];

const LOGO_RATIO = 1039 / 223;
const CONVERGE_DURATION = 1.75;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const getStatusStep = (p: number) => {
  if (p < 0.28) return { idx: "01", text: "GATHERING LIGHT" };
  if (p < 0.62) return { idx: "02", text: "REFRACTING SPECTRUM" };
  if (p < 0.88) return { idx: "03", text: "SYNTHESIZING VISUAL LOGIC" };
  return { idx: "04", text: "ILLUMINATING PRIZM" };
};

export default function Preloader() {
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const statusIdxRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const metaLeftRef = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (done) return;
    setPreloaderActive(true);

    const root = rootRef.current;
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    const logoImg = logoImgRef.current;
    const canvas = canvasRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    const flash = flashRef.current;
    const statusIdx = statusIdxRef.current;
    const statusText = statusTextRef.current;
    const metaLeft = metaLeftRef.current;
    const metaRight = metaRightRef.current;
    if (
      !root ||
      !stage ||
      !wrap ||
      !canvas ||
      !counter ||
      !bar ||
      !flash ||
      !statusIdx ||
      !statusText
    ) {
      return;
    }

    if (metaLeft && metaRight) {
      gsap.fromTo(
        [metaLeft, metaRight],
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let disposed = false;
    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let exiting = false;
    let currentStepIdx = "01";
    const startT = performance.now() / 1000;

    // Flat Structure-of-Arrays (SoA) for all 2,127 crystal particles
    const N = 2200;
    const dotX = new Float32Array(N);
    const dotY = new Float32Array(N);
    const dotS = new Float32Array(N);
    const dotTh = new Float32Array(N);
    const dotSx = new Float32Array(N);
    const dotSy = new Float32Array(N);
    const dotPh = new Float32Array(N);
    const dotColor = new Uint8Array(N);
    let dotCount = 0;

    let seed = 1337;
    const nextRand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const buildDotsFromMask = () => {
      const markW = Math.min(width * 0.74, 640);
      const markH = markW / LOGO_RATIO;
      const offX = (width - markW) / 2;
      const offY = (height - markH) / 2;

      const rows = PRIZM_CRYSTAL_MAP.length;
      const cols = PRIZM_CRYSTAL_MAP[0].length;
      const cellW = markW / cols;
      const cellH = markH / rows;
      // Slightly fuller particle size (0.76 of cell) so letters look dense, luminous, and cohesive
      const baseSize = Math.max(2.1, cellW * 0.76);
      const cx = markW * 0.5;
      const cy = markH * 0.5;
      const invMaxDist = 1 / Math.hypot(cx, cy);
      const scatterSpan = Math.max(180, width * 0.36);

      seed = 1337;
      let idx = 0;

      for (let r = 0; r < rows; r++) {
        const rowStr = PRIZM_CRYSTAL_MAP[r];
        const y = (r + 0.5) * cellH;
        for (let c = 0; c < cols; c++) {
          const code = rowStr.charCodeAt(c) - 48; // 0..7
          if (code <= 0) continue;

          const x = (c + 0.5) * cellW;
          const dist = Math.hypot(x - cx, y - cy) * invMaxDist;
          const ang = nextRand() * Math.PI * 2;
          const d = 50 + nextRand() * scatterSpan;

          dotX[idx] = offX + x;
          dotY[idx] = offY + y;
          // Specular white bevel ridges (code === 1) are slightly larger so the 3D crystal cuts pop
          dotS[idx] = code === 1 ? baseSize * 1.12 : baseSize;
          dotTh[idx] = Math.min(0.82, dist * 0.48 + nextRand() * 0.32);
          dotSx[idx] = Math.cos(ang) * d;
          dotSy[idx] = Math.sin(ang) * d;
          dotPh[idx] = nextRand() * Math.PI * 2;
          dotColor[idx] = code - 1; // 0..6 index into CRYSTAL_FACET_PALETTE
          idx++;
        }
      }
      dotCount = idx;
    };

    const sizeAll = () => {
      width = Math.max(2, window.innerWidth);
      height = Math.max(2, window.innerHeight);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      buildDotsFromMask();
    };

    sizeAll();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sizeAll, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const state = {
      display: 0,
      flashBoost: 0,
    };

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

    let timeline: ReturnType<typeof gsap.timeline> | null = null;

    const finish = () => {
      setPreloaderTransitioning(false);
      setPreloaderActive(false);
      try {
        sessionStorage.setItem("prizm_loaded", "true");
      } catch {}
      setDone(true);
    };

    const beginExit = () => {
      if (exiting) return;
      exiting = true;
      setPreloaderTransitioning(true);
      const d = reduced ? 0.35 : 1;
      const glow = glowRef.current;
      timeline = gsap.timeline({ onComplete: finish });

      timeline.to(
        state,
        {
          display: 1,
          flashBoost: 1,
          duration: 0.28 * d,
          ease: "power2.out",
        },
        0
      );
      timeline.to(
        stage,
        {
          scale: 1.04,
          duration: 0.34 * d,
          ease: "power2.out",
        },
        0
      );
      if (glow) {
        timeline.to(
          glow,
          { opacity: 0.95, scale: 1.3, duration: 0.34 * d, ease: "power2.out" },
          0
        );
      }

      timeline.fromTo(
        flash,
        { opacity: 0 },
        { opacity: 0.2, duration: 0.24 * d, ease: "power2.out" },
        0.15 * d
      );
      timeline.to(
        flash,
        { opacity: 0, duration: 0.4 * d, ease: "power2.inOut" },
        0.39 * d
      );

      timeline.to(
        root,
        {
          yPercent: -102,
          duration: 0.7 * d,
          ease: "expo.inOut",
        },
        0.28 * d
      );
    };

    const PALETTE_LEN = CRYSTAL_FACET_PALETTE.length;
    const bucketData = Array.from(
      { length: PALETTE_LEN },
      () => new Float32Array(N * 3)
    );
    const bucketCounts = new Int32Array(PALETTE_LEN);
    let lastCounterVal = -1;

    const frame = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      const t = now / 1000;
      const elapsed = Math.max(0, t - startT);

      if (!exiting) {
        const linearP = clamp01(elapsed / CONVERGE_DURATION);
        const easedP = 1 - Math.pow(1 - linearP, 2.4);
        state.display = easedP;

        if (linearP >= 1) {
          beginExit();
        }
      }

      const p = state.display;
      const pctInt = Math.round(p * 100);
      if (pctInt !== lastCounterVal) {
        lastCounterVal = pctInt;
        counter.textContent = `${String(pctInt).padStart(3, "0")}%`;
      }
      bar.style.transform = `scaleX(${p})`;

      // Smoothly materialize the true 3D crystal wordmark underneath as particles lock in (72% -> 98%)
      if (logoImg) {
        const imgAlpha = clamp01((p - 0.72) / 0.26);
        logoImg.style.opacity = `${imgAlpha * 0.92}`;
      }

      const step = getStatusStep(p);
      if (step.idx !== currentStepIdx) {
        currentStepIdx = step.idx;
        statusIdx.textContent = `[${step.idx}/04]`;
        statusText.textContent = step.text;
      }

      ctx.clearRect(0, 0, width, height);
      bucketCounts.fill(0);

      const flashBoost = state.flashBoost;
      const pScaled = p * 1.18;
      const invWindow = 1 / 0.22;
      const tWave = t * 4.2;
      const tFloat = t * 2.5;

      for (let i = 0; i < dotCount; i++) {
        let kRaw = (pScaled - dotTh[i]) * invWindow;
        if (kRaw < 0) kRaw = 0;
        else if (kRaw > 1) kRaw = 1;

        const k = kRaw * kRaw * (3 - 2 * kRaw);
        const wob = 1 - k;
        const ph = dotPh[i];

        const swirl = fastSin(tFloat + ph) * 8 * wob;
        const px = dotX[i] + dotSx[i] * wob + swirl;
        const py = dotY[i] + dotSy[i] * wob + fastCos(tFloat + ph) * 8 * wob;

        const wave = fastSin(dotX[i] * 0.013 + dotY[i] * 0.009 - tWave);
        const s = dotS[i] * (0.48 + 0.52 * k + flashBoost * 0.22);

        // Dynamic prismatic shimmer: on wave crest, refract facet to diamond white or adjacent prism hue
        let c = dotColor[i];
        if (wave > 0.72) {
          c = c === 0 ? 3 : 0; // Sparkle between Diamond White (#FFFFFF) and Glacier Cyan (#73F8FF)
        } else if (wave < -0.75 && c === 2) {
          c = 4; // Shimmer Sapphire into Amethyst Violet
        }

        const offset = bucketCounts[c] * 3;
        bucketData[c][offset] = px;
        bucketData[c][offset + 1] = py;
        bucketData[c][offset + 2] = s;
        bucketCounts[c]++;
      }

      // Draw all 7 luminous crystal facet buckets at full vibrancy (never dull grey!)
      const baseAlpha = Math.min(1, 0.82 + p * 0.18);
      for (let c = 0; c < PALETTE_LEN; c++) {
        const count = bucketCounts[c];
        if (count === 0) continue;
        const arr = bucketData[c];
        ctx.fillStyle = CRYSTAL_FACET_PALETTE[c];
        // Diamond white bevels (c === 0) always render at 100% full brilliance
        ctx.globalAlpha = c === 0 ? 1 : baseAlpha;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const o = i * 3;
          const sz = arr[o + 2];
          ctx.rect(arr[o], arr[o + 1], sz, sz);
        }
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      setPreloaderTransitioning(false);
      setPreloaderActive(false);
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
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
      className="fixed inset-0 z-[100] bg-[#070708] flex items-center justify-center select-none will-change-transform"
    >
      {/* Top Left Architectural Meta */}
      <div className="absolute top-6 left-6 sm:left-10 overflow-hidden pointer-events-none z-20">
        <div ref={metaLeftRef} className="meta opacity-0 flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse" />
          <span className="text-bone/80">PRIZM® — CREATIVE STUDIO</span>
        </div>
      </div>

      {/* Top Right Architectural Meta */}
      <div className="absolute top-6 right-6 sm:right-10 overflow-hidden pointer-events-none z-20">
        <span ref={metaRightRef} className="meta opacity-0 flex items-center gap-2">
          <span className="hidden sm:inline text-white/40">OPTICAL ENGINE //</span>
          <span className="text-bone/90">©2026</span>
        </span>
      </div>

      {/* Ambient Prismatic Center Aura (GPU-composited) */}
      <div
        ref={glowRef}
        className="absolute w-[56vmin] h-[56vmin] rounded-full pointer-events-none opacity-65 transform-gpu will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(138,180,255,0.16) 0%, rgba(202,152,255,0.10) 42%, transparent 70%)",
        }}
      />

      {/* Interactive Particle Stage */}
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        {/* True 3D Holographic Crystal Wordmark — materializes smoothly as particles lock in */}
        <div
          ref={wrapRef}
          className="relative w-[min(74vw,640px)] pointer-events-none flex items-center justify-center"
          style={{ aspectRatio: `${LOGO_RATIO}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoImgRef}
            src="/prizmlogo-transparent.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain opacity-0 will-change-opacity"
          />
          <span className="absolute -top-5 -left-5 w-3 h-3 border-t border-l border-white/35" />
          <span className="absolute -top-5 -right-5 w-3 h-3 border-t border-r border-white/35" />
          <span className="absolute -bottom-5 -left-5 w-3 h-3 border-b border-l border-white/35" />
          <span className="absolute -bottom-5 -right-5 w-3 h-3 border-b border-r border-white/35" />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      {/* Bottom Telemetry & Counter Bar (offset cleanly away from corners) */}
      <div className="absolute bottom-7 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex items-end justify-between gap-4 pointer-events-none z-20">
        <div className="flex flex-col gap-1.5 max-w-[68%] sm:max-w-none">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-white/45 uppercase">
            SYSTEM INITIALIZATION
          </span>
          <div className="flex items-baseline gap-2.5 truncate">
            <span
              ref={statusIdxRef}
              className="font-mono text-xs sm:text-sm tracking-[0.2em] spectrum-text font-bold shrink-0"
            >
              [01/04]
            </span>
            <span
              ref={statusTextRef}
              className="font-heading text-xs sm:text-base md:text-xl tracking-[0.14em] text-white font-extrabold uppercase truncate"
            >
              GATHERING LIGHT
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-white/45 uppercase hidden sm:inline">
            SPECTRUM LOCK
          </span>
          <span
            ref={counterRef}
            className="font-mono text-xl sm:text-2xl md:text-4xl tracking-[0.16em] text-white font-bold tabular-nums leading-none"
          >
            000%
          </span>
        </div>
      </div>

      {/* Bottom Spectrum Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20 overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-full origin-left will-change-transform"
          style={{
            background: "var(--spectrum)",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* Zero-Lag GPU Opacity Flash Veil */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-0 will-change-opacity"
        style={{ background: "var(--spectrum)" }}
      />

      {/* Trailing Curtain Edge */}
      <div className="absolute top-full left-0 right-0 h-[2px] spectrum-line opacity-80" />
    </div>
  );
}
