"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/**
 * WebExperiencesStickyScroll — Relay Pass-Through Gallery inspired by Nudot Studio.
 * Pins the viewport while scrolling 400vh. Central headline copy stays fixed while
 * 5 cards travel strictly from bottom (+100vh) up to top (-100vh) in an overlapping relay sequence.
 * Clicking any card opens a live modal popup with an interactive iframe preview.
 */
export default function WebExperiencesStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<{ title: string; url: string } | null>(null);

  // Track scroll progress throughout the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Physics spring for silky smooth scroll motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // --- CARD 1 (Left Side — Oval Box) --- Range: [0.00, 0.32]
  const c1Y = useTransform(smoothProgress, [0.0, 0.15, 0.32], ["100vh", "0vh", "-100vh"]);
  const c1Opacity = useTransform(smoothProgress, [0.0, 0.08, 0.24, 0.32], [0, 1, 1, 0]);
  const c1Clip = useTransform(smoothProgress, [0.0, 0.15, 0.32], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const c1Scale = useTransform(smoothProgress, [0.0, 0.15, 0.32], [0.95, 1.0, 0.95]);
  const c1Aura = useTransform(smoothProgress, [0.0, 0.15, 0.32], [0, 1, 0]);

  // --- CARD 2 (Right Side — Tattoo Sutra) --- Range: [0.18, 0.50]
  const c2Y = useTransform(smoothProgress, [0.18, 0.33, 0.50], ["100vh", "0vh", "-100vh"]);
  const c2Opacity = useTransform(smoothProgress, [0.18, 0.26, 0.42, 0.50], [0, 1, 1, 0]);
  const c2Clip = useTransform(smoothProgress, [0.18, 0.33, 0.50], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const c2Scale = useTransform(smoothProgress, [0.18, 0.33, 0.50], [0.95, 1.0, 0.95]);
  const c2Aura = useTransform(smoothProgress, [0.18, 0.33, 0.50], [0, 1, 0]);

  // --- CARD 3 (Left Side — GM Celebration) --- Range: [0.36, 0.68]
  const c3Y = useTransform(smoothProgress, [0.36, 0.51, 0.68], ["100vh", "0vh", "-100vh"]);
  const c3Opacity = useTransform(smoothProgress, [0.36, 0.44, 0.60, 0.68], [0, 1, 1, 0]);
  const c3Clip = useTransform(smoothProgress, [0.36, 0.51, 0.68], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const c3Scale = useTransform(smoothProgress, [0.36, 0.51, 0.68], [0.95, 1.0, 0.95]);
  const c3Aura = useTransform(smoothProgress, [0.36, 0.51, 0.68], [0, 1, 0]);

  // --- CARD 4 (Right Side — Barbell Cartel) --- Range: [0.54, 0.86]
  const c4Y = useTransform(smoothProgress, [0.54, 0.69, 0.86], ["100vh", "0vh", "-100vh"]);
  const c4Opacity = useTransform(smoothProgress, [0.54, 0.62, 0.78, 0.86], [0, 1, 1, 0]);
  const c4Clip = useTransform(smoothProgress, [0.54, 0.69, 0.86], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const c4Scale = useTransform(smoothProgress, [0.54, 0.69, 0.86], [0.95, 1.0, 0.95]);
  const c4Aura = useTransform(smoothProgress, [0.54, 0.69, 0.86], [0, 1, 0]);

  // --- CARD 5 (Center Stage — Push Up) --- Range: [0.72, 1.0]
  const c5Y = useTransform(smoothProgress, [0.72, 0.87, 1.0], ["100vh", "0vh", "-75vh"]);
  const c5Opacity = useTransform(smoothProgress, [0.72, 0.80, 0.94, 1.0], [0, 1, 1, 0]);
  const c5Clip = useTransform(smoothProgress, [0.72, 0.87, 1.0], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const c5Scale = useTransform(smoothProgress, [0.72, 0.87, 1.0], [0.95, 1.02, 0.95]);
  const c5Aura = useTransform(smoothProgress, [0.72, 0.87, 1.0], [0, 1, 0]);

  // --- CENTRAL HEADLINE 3D DEPTH PARALLAX & STAGGERED MASK REVEAL ---
  const line1Y = useTransform(smoothProgress, [0.00, 0.10], ["115%", "0%"]);
  const line2Y = useTransform(smoothProgress, [0.03, 0.13], ["115%", "0%"]);
  const line3Y = useTransform(smoothProgress, [0.06, 0.16], ["115%", "0%"]);
  const line4Y = useTransform(smoothProgress, [0.09, 0.19], ["115%", "0%"]);
  const textOpacity = useTransform(smoothProgress, [0.00, 0.08], [0, 1]);

  // Depth scale & subtle opacity pulse when cards cross center stage
  const textScale = useTransform(smoothProgress, [0.0, 0.35, 0.50, 0.75, 1.0], [1.0, 0.93, 1.0, 0.93, 1.0]);
  const textDepthOpacity = useTransform(smoothProgress, [0.0, 0.30, 0.50, 0.70, 1.0], [1.0, 0.85, 1.0, 0.85, 1.0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">

        {/* Central Headline Copy (Option 3: Staggered Blur-In Up) */}
        <div className="relative z-10 text-center pointer-events-none px-4 md:px-8 max-w-[90vw] md:max-w-4xl">
          <p className="meta text-white/50 text-[11px] md:text-xs tracking-[0.3em] uppercase mb-3">
            ( DIGITAL VISUAL ENGINE )
          </p>
          <motion.h2
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="font-heading font-extrabold uppercase text-[clamp(1.55rem,3.5vw,3.5rem)] leading-[1.02] tracking-tight text-bone drop-shadow-lg my-3 flex flex-col items-center"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 18 },
                show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5 } },
              }}
              className="block"
            >
              ARCHIVE OF
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 18 },
                show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5 } },
              }}
              className="block"
            >
              THE SELECTED
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 18 },
                show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5 } },
              }}
              className="block"
            >
              WORKS
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 18 },
                show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5 } },
              }}
              className="block"
            >
              BY <span className="spectrum-text">PRIZM</span>
            </motion.span>
          </motion.h2>
          <p className="meta text-white/50 text-[11px] md:text-xs tracking-[0.25em] uppercase mt-4">
            DIGITAL EXPERIENCES ENGINEERED IN PURE CODE
          </p>
        </div>

        {/* --- CARD 1 (Left Side — Oval Box) --- */}
        <motion.div
          style={{
            y: c1Y,
            opacity: c1Opacity,
            clipPath: c1Clip,
            scale: c1Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 left-[3%] md:left-[5%] z-20 w-[84vw] sm:w-[58vw] md:w-[40vw] lg:w-[34vw] will-change-transform"
        >
          {/* Ambient Emerald Aura */}
          <motion.div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              opacity: c1Aura,
              background: "radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(6,182,212,0.12) 55%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
          <div
            onClick={() =>
              setActiveModal({
                title: "OVAL BOX — TURF BOOKING",
                url: "https://ovalboxarena.vercel.app/",
              })
            }
            className="relative border border-white/20 p-2.5 bg-[#0c0c0e]/95 backdrop-blur-sm shadow-2xl rounded-sm group transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <Image
              src="/posters/web-oval.png"
              alt="Oval Box — Turf Booking"
              width={1280}
              height={800}
              sizes="(max-width: 768px) 84vw, (max-width: 1024px) 40vw, 34vw"
              quality={85}
              className="w-full aspect-[16/10] object-cover object-top rounded-sm"
            />
            {/* Interactive Click/Tap Badge Indicator */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-bone text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="block md:hidden">TAP TO PREVIEW ↗</span>
              <span className="hidden md:block">CLICK TO PREVIEW ↗</span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 2 (Right Side — Tattoo Sutra) --- */}
        <motion.div
          style={{
            y: c2Y,
            opacity: c2Opacity,
            clipPath: c2Clip,
            scale: c2Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 right-[3%] md:right-[5%] z-20 w-[84vw] sm:w-[58vw] md:w-[40vw] lg:w-[34vw] will-change-transform"
        >
          {/* Ambient Crimson Aura */}
          <motion.div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              opacity: c2Aura,
              background: "radial-gradient(circle, rgba(244,63,94,0.30) 0%, rgba(225,29,72,0.12) 55%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
          <div
            onClick={() =>
              setActiveModal({
                title: "TATTOO SUTRA — STUDIO",
                url: "https://tattoo-sutra.vercel.app/",
              })
            }
            className="relative border border-white/20 p-2.5 bg-[#0c0c0e]/95 backdrop-blur-sm shadow-2xl rounded-sm group transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <Image
              src="/posters/web-02.jpg"
              alt="Tattoo Sutra — Studio"
              width={1280}
              height={800}
              sizes="(max-width: 768px) 84vw, (max-width: 1024px) 40vw, 34vw"
              quality={85}
              className="w-full aspect-[16/10] object-cover object-top rounded-sm"
            />
            {/* Interactive Click/Tap Badge Indicator */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-bone text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="block md:hidden">TAP TO PREVIEW ↗</span>
              <span className="hidden md:block">CLICK TO PREVIEW ↗</span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 3 (Left Side — GM Celebration) --- */}
        <motion.div
          style={{
            y: c3Y,
            opacity: c3Opacity,
            clipPath: c3Clip,
            scale: c3Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 left-[3%] md:left-[5%] z-20 w-[84vw] sm:w-[58vw] md:w-[40vw] lg:w-[34vw] will-change-transform"
        >
          {/* Ambient Warm Amber/Gold Aura */}
          <motion.div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              opacity: c3Aura,
              background: "radial-gradient(circle, rgba(245,158,11,0.30) 0%, rgba(217,119,6,0.12) 55%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
          <div
            onClick={() =>
              setActiveModal({
                title: "GM CELEBRATION — CATERING",
                url: "https://www.gmcelebrations.in/",
              })
            }
            className="relative border border-white/20 p-2.5 bg-[#0c0c0e]/95 backdrop-blur-sm shadow-2xl rounded-sm group transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <Image
              src="/posters/web-04.jpg"
              alt="GM Celebration — Catering"
              width={1280}
              height={800}
              sizes="(max-width: 768px) 84vw, (max-width: 1024px) 40vw, 34vw"
              quality={85}
              className="w-full aspect-[16/10] object-cover object-top rounded-sm"
            />
            {/* Interactive Click/Tap Badge Indicator */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-bone text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="block md:hidden">TAP TO PREVIEW ↗</span>
              <span className="hidden md:block">CLICK TO PREVIEW ↗</span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 4 (Right Side — Barbell Cartel) --- */}
        <motion.div
          style={{
            y: c4Y,
            opacity: c4Opacity,
            clipPath: c4Clip,
            scale: c4Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 right-[3%] md:right-[5%] z-20 w-[84vw] sm:w-[58vw] md:w-[40vw] lg:w-[34vw] will-change-transform"
        >
          {/* Ambient Electric Sapphire Aura */}
          <motion.div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              opacity: c4Aura,
              background: "radial-gradient(circle, rgba(59,130,246,0.30) 0%, rgba(37,99,235,0.12) 55%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
          <div
            onClick={() =>
              setActiveModal({
                title: "BARBELL CARTEL — GYM & FITNESS",
                url: "https://barbell-cartel-wf.vercel.app/",
              })
            }
            className="relative border border-white/20 p-2.5 bg-[#0c0c0e]/95 backdrop-blur-sm shadow-2xl rounded-sm group transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <Image
              src="/posters/web-03.jpg"
              alt="Barbell Cartel — Gym & Fitness"
              width={1280}
              height={800}
              sizes="(max-width: 768px) 84vw, (max-width: 1024px) 40vw, 34vw"
              quality={85}
              className="w-full aspect-[16/10] object-cover object-top rounded-sm"
            />
            {/* Interactive Click/Tap Badge Indicator */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-bone text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="block md:hidden">TAP TO PREVIEW ↗</span>
              <span className="hidden md:block">CLICK TO PREVIEW ↗</span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 5 (Center Stage — Push Up Fitness) --- */}
        <motion.div
          style={{
            y: c5Y,
            opacity: c5Opacity,
            clipPath: c5Clip,
            scale: c5Scale,
          }}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 w-[84vw] sm:w-[58vw] md:w-[40vw] lg:w-[34vw] will-change-transform"
        >
          {/* Ambient Iridescent Violet Aura */}
          <motion.div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              opacity: c5Aura,
              background: "radial-gradient(circle, rgba(168,85,247,0.32) 0%, rgba(236,72,153,0.14) 55%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
          <div
            onClick={() =>
              setActiveModal({
                title: "PUSH UP — FITNESS SYSTEM",
                url: "https://pushup-omega.vercel.app/",
              })
            }
            className="relative border border-white/20 p-2.5 bg-[#0c0c0e]/95 backdrop-blur-sm shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-sm group transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <Image
              src="/posters/web-pushup.png"
              alt="Push Up — Fitness System"
              width={1280}
              height={800}
              sizes="(max-width: 768px) 84vw, (max-width: 1024px) 40vw, 34vw"
              quality={85}
              className="w-full aspect-[16/10] object-cover object-top rounded-sm"
            />
            {/* Interactive Click/Tap Badge Indicator */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-bone text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="block md:hidden">TAP TO PREVIEW ↗</span>
              <span className="hidden md:block">CLICK TO PREVIEW ↗</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Live Preview Modal Popup */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="relative w-full max-w-5xl h-[82vh] bg-ink-soft border border-white/20 rounded-lg overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.95)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Window Top Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-ink border-b border-white/10 select-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* Address Bar preview */}
                <div className="flex items-center px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-mono max-w-xs sm:max-w-sm truncate">
                  <span className="text-emerald-400 mr-2">🔒</span>
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
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Live Preview Iframe */}
              <div className="flex-1 w-full bg-black relative">
                <iframe
                  src={activeModal.url}
                  title={activeModal.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
