"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

const WEB_PROJECTS = [
  {
    index: "01",
    name: "OVAL BOX",
    category: "SPORTS TECH · BOOKING",
    stack: "NEXT.JS · MOTION · BOOKING",
    title: "OVAL BOX — TURF BOOKING",
    url: "https://ovalboxarena.vercel.app/",
  },
  {
    index: "02",
    name: "TATTOO SUTRA",
    category: "LUXURY ARTISTRY · STUDIO",
    stack: "NEXT.JS · GSAP · GALLERY",
    title: "TATTOO SUTRA — STUDIO",
    url: "https://tattoo-sutra.vercel.app/",
  },
  {
    index: "03",
    name: "GM CELEBRATION",
    category: "BESPOKE HOSPITALITY",
    stack: "NEXT.JS · EDITORIAL · UI",
    title: "GM CELEBRATION — CATERING",
    url: "https://www.gmcelebrations.in/",
  },
  {
    index: "04",
    name: "BARBELL CARTEL",
    category: "PERFORMANCE ATHLETICS",
    stack: "NEXT.JS · KINETIC · WEB",
    title: "BARBELL CARTEL — GYM & FITNESS",
    url: "https://barbell-cartel-wf.vercel.app/",
  },
  {
    index: "05",
    name: "PUSH UP",
    category: "FITNESS ECOSYSTEM",
    stack: "NEXT.JS · 3D · SYSTEM",
    title: "PUSH UP — FITNESS SYSTEM",
    url: "https://pushup-omega.vercel.app/",
  },
];

/**
 * WebExperiencesStickyScroll — Relay Pass-Through Gallery inspired by Nudot Studio.
 * Pins the viewport while scrolling 400vh. Central headline copy stays fixed while
 * 5 cards travel strictly from bottom (+100vh) up to top (-100vh) in an overlapping relay sequence.
 * Clicking any card opens a live modal popup with an interactive iframe preview.
 */
export default function WebExperiencesStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const hudIndexRef = useRef<HTMLSpanElement>(null);
  const hudNameRef = useRef<HTMLSpanElement>(null);
  const [activeModal, setActiveModal] = useState<{ title: string; url: string } | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Track scroll progress throughout the 400vh container (Lenis provides smooth inertia directly)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update bottom HUD via direct DOM ref (zero React re-renders during scroll!)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const nextIdx =
      v < 0.22 ? 0 : v < 0.41 ? 1 : v < 0.59 ? 2 : v < 0.76 ? 3 : 4;
    if (nextIdx !== activeIdxRef.current) {
      activeIdxRef.current = nextIdx;
      const proj = WEB_PROJECTS[nextIdx];
      if (hudIndexRef.current) {
        hudIndexRef.current.textContent = `[${proj.index} / 05]`;
      }
      if (hudNameRef.current) {
        hudNameRef.current.textContent = proj.name;
      }
    }
  });

  const openPreviewModal = (item: { title: string; url: string }) => {
    setIframeLoading(true);
    setPreviewDevice("desktop");
    setActiveModal(item);
  };

  // Gently soften the center background copy while cards travel across the stage (prevents collision on mobile & desktop)
  const centerCopyOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.06, 0.14, 0.88, 0.96, 1.0],
    [1, 0.7, 0.28, 0.28, 0.75, 1]
  );
  const centerCopyScale = useTransform(
    scrollYProgress,
    [0.0, 0.14, 0.88, 1.0],
    [1, 0.96, 0.96, 1]
  );

  // --- CARD 1 (Left Side — Oval Box) --- Range: [0.00, 0.32]
  const c1Y = useTransform(scrollYProgress, [0.0, 0.15, 0.32], ["100vh", "0vh", "-100vh"]);
  const c1Opacity = useTransform(scrollYProgress, [0.0, 0.08, 0.24, 0.32], [0, 1, 1, 0]);
  const c1Scale = useTransform(scrollYProgress, [0.0, 0.15, 0.32], [0.95, 1.0, 0.95]);
  const c1Aura = useTransform(scrollYProgress, [0.0, 0.15, 0.32], [0, 1, 0]);

  // --- CARD 2 (Right Side — Tattoo Sutra) --- Range: [0.18, 0.50]
  const c2Y = useTransform(scrollYProgress, [0.18, 0.33, 0.50], ["100vh", "0vh", "-100vh"]);
  const c2Opacity = useTransform(scrollYProgress, [0.18, 0.26, 0.42, 0.50], [0, 1, 1, 0]);
  const c2Scale = useTransform(scrollYProgress, [0.18, 0.33, 0.50], [0.95, 1.0, 0.95]);
  const c2Aura = useTransform(scrollYProgress, [0.18, 0.33, 0.50], [0, 1, 0]);

  // --- CARD 3 (Left Side — GM Celebration) --- Range: [0.36, 0.68]
  const c3Y = useTransform(scrollYProgress, [0.36, 0.51, 0.68], ["100vh", "0vh", "-100vh"]);
  const c3Opacity = useTransform(scrollYProgress, [0.36, 0.44, 0.60, 0.68], [0, 1, 1, 0]);
  const c3Scale = useTransform(scrollYProgress, [0.36, 0.51, 0.68], [0.95, 1.0, 0.95]);
  const c3Aura = useTransform(scrollYProgress, [0.36, 0.51, 0.68], [0, 1, 0]);

  // --- CARD 4 (Right Side — Barbell Cartel) --- Range: [0.54, 0.86]
  const c4Y = useTransform(scrollYProgress, [0.54, 0.69, 0.86], ["100vh", "0vh", "-100vh"]);
  const c4Opacity = useTransform(scrollYProgress, [0.54, 0.62, 0.78, 0.86], [0, 1, 1, 0]);
  const c4Scale = useTransform(scrollYProgress, [0.54, 0.69, 0.86], [0.95, 1.0, 0.95]);
  const c4Aura = useTransform(scrollYProgress, [0.54, 0.69, 0.86], [0, 1, 0]);

  // --- CARD 5 (Center Stage — Push Up) --- Range: [0.72, 1.0]
  const c5Y = useTransform(scrollYProgress, [0.72, 0.87, 1.0], ["100vh", "0vh", "-75vh"]);
  const c5Opacity = useTransform(scrollYProgress, [0.72, 0.80, 0.94, 1.0], [0, 1, 1, 0]);
  const c5Scale = useTransform(scrollYProgress, [0.72, 0.87, 1.0], [0.95, 1.02, 0.95]);
  const c5Aura = useTransform(scrollYProgress, [0.72, 0.87, 1.0], [0, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">

        {/* Central Headline Copy — Softly dims while cards pass over the stage */}
        <motion.div
          style={{ opacity: centerCopyOpacity, scale: centerCopyScale }}
          className="relative z-10 text-center pointer-events-none px-4 md:px-8 max-w-[90vw] md:max-w-4xl will-change-transform"
        >
          <p className="meta text-white/50 text-[11px] md:text-xs tracking-[0.3em] uppercase mb-3">
            ( DIGITAL VISUAL ENGINE )
          </p>
          <motion.h2
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-heading font-extrabold uppercase text-[clamp(1.55rem,3.5vw,3.5rem)] leading-[1.02] tracking-tight text-bone drop-shadow-lg my-3 flex flex-col items-center"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="block"
            >
              ARCHIVE OF
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="block"
            >
              THE SELECTED
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="block"
            >
              WORKS
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="block"
            >
              BY <span className="spectrum-text">PRIZM</span>
            </motion.span>
          </motion.h2>
          <p className="meta text-white/50 text-[11px] md:text-xs tracking-[0.25em] uppercase mt-4">
            DIGITAL EXPERIENCES ENGINEERED IN PURE CODE
          </p>
        </motion.div>

        {/* --- CARD 1 (Left Side — Oval Box) --- */}
        <motion.div
          style={{
            y: c1Y,
            opacity: c1Opacity,
            scale: c1Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 left-[3%] md:left-[5%] z-20 w-[86vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] will-change-transform"
        >
          {/* Ambient Emerald Aura */}
          <motion.div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              opacity: c1Aura,
              background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
            }}
          />
          <div
            onClick={() => openPreviewModal(WEB_PROJECTS[0])}
            data-cursor
            data-cursor-text="PREVIEW ↗"
            className="relative border border-white/15 hover:border-white/35 p-3 bg-[#0b0b0e] shadow-2xl rounded-xl group transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden"
          >
            {/* Top Architectural Case-Study Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="spectrum-text font-bold">[01]</span>
                <span className="text-bone font-bold tracking-[0.16em]">OVAL BOX</span>
              </div>
              <span className="text-white/45 hidden sm:inline">SPORTS TECH · BOOKING</span>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/posters/web-oval.webp"
                alt="Oval Box — Turf Booking"
                width={1280}
                height={800}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 86vw, (max-width: 1024px) 42vw, 36vw"
                quality={85}
                className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Bottom Architectural Case-Study Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/45 truncate pr-2">NEXT.JS · MOTION · BOOKING</span>
              <span className="flex items-center gap-1.5 text-bone group-hover:spectrum-text font-semibold shrink-0 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PREVIEW ↗</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 2 (Right Side — Tattoo Sutra) --- */}
        <motion.div
          style={{
            y: c2Y,
            opacity: c2Opacity,
            scale: c2Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 right-[3%] md:right-[5%] z-20 w-[86vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] will-change-transform"
        >
          {/* Ambient Crimson Aura */}
          <motion.div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              opacity: c2Aura,
              background: "radial-gradient(circle, rgba(244,63,94,0.22) 0%, rgba(225,29,72,0.08) 45%, transparent 70%)",
            }}
          />
          <div
            onClick={() => openPreviewModal(WEB_PROJECTS[1])}
            data-cursor
            data-cursor-text="PREVIEW ↗"
            className="relative border border-white/15 hover:border-white/35 p-3 bg-[#0b0b0e] shadow-2xl rounded-xl group transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden"
          >
            {/* Top Architectural Case-Study Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="spectrum-text font-bold">[02]</span>
                <span className="text-bone font-bold tracking-[0.16em]">TATTOO SUTRA</span>
              </div>
              <span className="text-white/45 hidden sm:inline">LUXURY ARTISTRY · STUDIO</span>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/posters/web-02.webp"
                alt="Tattoo Sutra — Studio"
                width={1280}
                height={800}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 86vw, (max-width: 1024px) 42vw, 36vw"
                quality={85}
                className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Bottom Architectural Case-Study Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/45 truncate pr-2">NEXT.JS · GSAP · GALLERY</span>
              <span className="flex items-center gap-1.5 text-bone group-hover:spectrum-text font-semibold shrink-0 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PREVIEW ↗</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 3 (Left Side — GM Celebration) --- */}
        <motion.div
          style={{
            y: c3Y,
            opacity: c3Opacity,
            scale: c3Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 left-[3%] md:left-[5%] z-20 w-[86vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] will-change-transform"
        >
          {/* Ambient Warm Amber/Gold Aura */}
          <motion.div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              opacity: c3Aura,
              background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(217,119,6,0.08) 45%, transparent 70%)",
            }}
          />
          <div
            onClick={() => openPreviewModal(WEB_PROJECTS[2])}
            data-cursor
            data-cursor-text="PREVIEW ↗"
            className="relative border border-white/15 hover:border-white/35 p-3 bg-[#0b0b0e] shadow-2xl rounded-xl group transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden"
          >
            {/* Top Architectural Case-Study Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="spectrum-text font-bold">[03]</span>
                <span className="text-bone font-bold tracking-[0.16em]">GM CELEBRATION</span>
              </div>
              <span className="text-white/45 hidden sm:inline">BESPOKE HOSPITALITY</span>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/posters/web-04.webp"
                alt="GM Celebration — Catering"
                width={1280}
                height={800}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 86vw, (max-width: 1024px) 42vw, 36vw"
                quality={85}
                className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Bottom Architectural Case-Study Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/45 truncate pr-2">NEXT.JS · EDITORIAL · UI</span>
              <span className="flex items-center gap-1.5 text-bone group-hover:spectrum-text font-semibold shrink-0 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PREVIEW ↗</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 4 (Right Side — Barbell Cartel) --- */}
        <motion.div
          style={{
            y: c4Y,
            opacity: c4Opacity,
            scale: c4Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 right-[3%] md:right-[5%] z-20 w-[86vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] will-change-transform"
        >
          {/* Ambient Electric Sapphire Aura */}
          <motion.div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              opacity: c4Aura,
              background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(37,99,235,0.08) 45%, transparent 70%)",
            }}
          />
          <div
            onClick={() => openPreviewModal(WEB_PROJECTS[3])}
            data-cursor
            data-cursor-text="PREVIEW ↗"
            className="relative border border-white/15 hover:border-white/35 p-3 bg-[#0b0b0e] shadow-2xl rounded-xl group transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden"
          >
            {/* Top Architectural Case-Study Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="spectrum-text font-bold">[04]</span>
                <span className="text-bone font-bold tracking-[0.16em]">BARBELL CARTEL</span>
              </div>
              <span className="text-white/45 hidden sm:inline">PERFORMANCE ATHLETICS</span>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/posters/web-03.webp"
                alt="Barbell Cartel — Gym & Fitness"
                width={1280}
                height={800}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 86vw, (max-width: 1024px) 42vw, 36vw"
                quality={85}
                className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Bottom Architectural Case-Study Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/45 truncate pr-2">NEXT.JS · KINETIC · WEB</span>
              <span className="flex items-center gap-1.5 text-bone group-hover:spectrum-text font-semibold shrink-0 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PREVIEW ↗</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 5 (Center Stage — Push Up Fitness) --- */}
        <motion.div
          style={{
            y: c5Y,
            opacity: c5Opacity,
            scale: c5Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 w-[86vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] will-change-transform"
        >
          {/* Ambient Iridescent Violet Aura */}
          <motion.div
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{
              opacity: c5Aura,
              background: "radial-gradient(circle, rgba(168,85,247,0.24) 0%, rgba(236,72,153,0.09) 45%, transparent 70%)",
            }}
          />
          <div
            onClick={() => openPreviewModal(WEB_PROJECTS[4])}
            data-cursor
            data-cursor-text="PREVIEW ↗"
            className="relative border border-white/15 hover:border-white/35 p-3 bg-[#0b0b0e] shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-xl group transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden"
          >
            {/* Top Architectural Case-Study Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="spectrum-text font-bold">[05]</span>
                <span className="text-bone font-bold tracking-[0.16em]">PUSH UP</span>
              </div>
              <span className="text-white/45 hidden sm:inline">FITNESS ECOSYSTEM</span>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/posters/web-pushup.webp"
                alt="Push Up — Fitness System"
                width={1280}
                height={800}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 86vw, (max-width: 1024px) 42vw, 36vw"
                quality={85}
                className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Bottom Architectural Case-Study Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/45 truncate pr-2">NEXT.JS · 3D · SYSTEM</span>
              <span className="flex items-center gap-1.5 text-bone group-hover:spectrum-text font-semibold shrink-0 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PREVIEW ↗</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Sticky Bottom Corner Telemetry HUD ([01 / 05] Active Project Indicator) */}
        <div className="absolute bottom-6 inset-x-6 md:inset-x-10 z-25 pointer-events-none flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0b0b0e]/90 border border-white/10">
            <span ref={hudIndexRef} className="spectrum-text font-bold">
              [01 / 05]
            </span>
            <span className="text-white/25">—</span>
            <span ref={hudNameRef} className="text-bone/90 font-semibold">
              OVAL BOX
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0b0b0e]/90 border border-white/10">
            <span className="text-white/45 text-[9px]">CLICK ANY CARD FOR LIVE INTERACTIVE PREVIEW</span>
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full w-full origin-left bg-spectrum will-change-transform"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Live Preview Modal Popup */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="relative w-full max-w-5xl h-[86vh] bg-ink-soft border border-white/20 rounded-xl overflow-hidden flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Window Top Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-ink border-b border-white/10 select-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* Device Switcher (Desktop / Mobile) */}
                <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      previewDevice === "desktop"
                        ? "bg-white/20 text-white font-semibold"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      previewDevice === "mobile"
                        ? "bg-white/20 text-white font-semibold"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    Mobile
                  </button>
                </div>

                {/* Address Bar preview */}
                <div className="flex items-center px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-mono max-w-[180px] sm:max-w-xs truncate">
                  <span className="text-emerald-400 mr-2 shrink-0">🔒</span>
                  <span className="truncate">{activeModal.url}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={activeModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-bone/70 hover:text-bone underline underline-offset-4 tracking-wider flex items-center gap-1 transition-colors"
                  >
                    Open Tab ↗
                  </a>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Live Preview Iframe with Loading Indicator & Responsive Viewport */}
              <div className="flex-1 w-full bg-black relative flex items-center justify-center overflow-hidden">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink-soft/90 z-10 space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <p className="font-mono text-xs text-white/60 tracking-wider uppercase">Loading Live Experience...</p>
                  </div>
                )}
                <div
                  className={`h-full transition-all duration-300 relative ${
                    previewDevice === "mobile"
                      ? "w-[375px] max-w-full my-auto rounded-[24px] border-4 border-white/20 overflow-hidden shadow-2xl bg-black"
                      : "w-full rounded-none border-0"
                  }`}
                >
                  <iframe
                    src={activeModal.url}
                    title={activeModal.title}
                    onLoad={() => setIframeLoading(false)}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
