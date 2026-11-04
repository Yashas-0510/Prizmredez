"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const REELS = [
  { id: "lenskart", index: "01", brand: "LENSKART", title: "LENSKART — 15S", src: "/ad-creatives/Lenskartad.mp4" },
  { id: "laneige", index: "02", brand: "LANEIGE", title: "LANEIGE — 15S", src: "/ad-creatives/laneigead.mp4" },
  { id: "skincare", index: "03", brand: "THE ORDINARY", title: "THE ORDINARY — 15S", src: "/ad-creatives/skincaread.mp4" },
  { id: "sleepyowl", index: "04", brand: "SLEEPY OWL", title: "SLEEPY OWL — 15S", src: "/ad-creatives/sleepyowlad.mp4" },
  { id: "perfume", index: "05", brand: "ARVEEN", title: "ARVEEN — 15S", src: "/ad-creatives/perfumead.mp4" },
  { id: "boat", index: "06", brand: "BOAT", title: "BOAT — 15S", src: "/ad-creatives/boattad.mp4" },
];

export default function AdCreativesStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Measure window width for mobile vs desktop responsive transforms
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progress across the 250vh track (Lenis already smooths scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive target scale: 0.36 for Mobile (reduced by 5%), 0.34 for PC/Laptop
  const videoScale = useTransform(
    scrollYProgress,
    [0.0, 0.75],
    [1.20, isMobile ? 0.36 : 0.34]
  );

  // Responsive vertical offset: "-6px" for Mobile, "16px" for PC/Laptop
  const videoY = useTransform(
    scrollYProgress,
    [0.0, 0.75],
    ["0px", isMobile ? "-6px" : "16px"]
  );

  // Border Radius: 0px (edge-to-edge entrance) -> 16px (rounded target screen)
  const borderRadius = useTransform(scrollYProgress, [0.0, 0.75], ["0px", "16px"]);

  // Controls Opacity: 0 -> 1 as screen shrinks
  const controlsOpacity = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);

  // Copy Opacity & 3D Mask Clip Reveal transforms as screen shrinks
  const copyOpacity = useTransform(scrollYProgress, [0.30, 0.65], [0, 1]);
  const maskY1 = useTransform(scrollYProgress, [0.30, 0.65], ["115%", "0%"]);
  const maskY2 = useTransform(scrollYProgress, [0.38, 0.72], ["115%", "0%"]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isInViewRef = useRef(false);

  // Auto-pause video when scrolled away, auto-resume when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isInViewRef.current = inView;
        const video = videoRef.current;
        if (!video) return;
        if (!inView && !video.paused) {
          video.pause();
        } else if (inView && video.paused) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync active video playback and mute state for single persistent video decoder
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    const targetSrc = REELS[activeIndex].src;
    if (!video.src.endsWith(targetSrc)) {
      video.src = targetSrc;
    }
    if (isInViewRef.current) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [activeIndex, isMuted]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? REELS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === REELS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInViewRef.current) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center select-none bg-ink">
        {/* Desktop Background Image (adbg.webp — 70KB, eager decode so zero scroll pop-in) */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/adbg.webp"
            alt="Ad Creatives Stage Background"
            fill
            sizes="100vw"
            loading="eager"
            decoding="async"
            className="object-cover pointer-events-none select-none opacity-100"
          />
        </div>

        {/* Mobile Background Image (adbgmob.webp — 90KB, eager decode so zero scroll pop-in) */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <Image
            src="/adbgmob.webp"
            alt="Ad Creatives Mobile Stage Background"
            fill
            sizes="100vw"
            loading="eager"
            decoding="async"
            className="object-cover object-[center_30%] pointer-events-none select-none opacity-100"
          />
        </div>

        {/* --- NARRATIVE MANIFESTO HEADLINE (CAMERAS OFF. CREATIVE ON.) WITH 3D MASK CLIP REVEAL --- */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute top-28 md:top-36 lg:top-40 z-30 max-w-3xl text-center px-6 pointer-events-none"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wider text-white uppercase font-sans drop-shadow-md flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span className="inline-block overflow-hidden py-1">
              <motion.span style={{ y: maskY1 }} className="inline-block">
                CAMERAS OFF.
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <motion.span style={{ y: maskY2 }} className="inline-block text-white/70">
                CREATIVE ON.
              </motion.span>
            </span>
          </h2>
        </motion.div>

        {/* --- MAIN CINEMA SCREEN VIDEO CONTAINER --- */}
        <motion.div
          style={{
            scale: videoScale,
            y: videoY,
            borderRadius: borderRadius,
          }}
          onClick={() => setIsMuted(!isMuted)}
          data-cursor
          data-cursor-text={isMuted ? "UNMUTE" : "MUTE"}
          className="relative z-20 w-full h-full max-w-[92vw] max-h-[105vh] border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden bg-black flex items-center justify-center will-change-transform cursor-pointer"
        >
          {/* Single Active Video Player Engine (Only 1 decoder in DOM, auto-advances on finish) */}
          <video
            ref={videoRef}
            src={REELS[activeIndex].src}
            muted={isMuted}
            playsInline
            preload="metadata"
            onEnded={handleNext}
            className="w-full h-full object-cover relative z-10 transition-opacity duration-300"
          />

          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 z-15 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
        </motion.div>

        {/* --- 1:1 UNSCALED CINEMA CONTROL DOCK (BRAND SWITCHER + PREV/NEXT + AUDIO TOGGLE) --- */}
        <motion.div
          style={{ opacity: controlsOpacity }}
          className="absolute bottom-6 md:bottom-10 z-30 flex flex-col items-center gap-2.5 px-4 w-full max-w-3xl pointer-events-auto"
        >
          {/* Desktop Direct Brand Switcher Dock (Solid GPU-friendly surface, no multi-pass backdrop blur over video) */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-[#09090c]/90 border border-white/15 shadow-2xl">
            {REELS.map((reel, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={reel.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className={isSelected ? "text-black/60" : "text-white/35"}>
                    {reel.index}
                  </span>
                  <span>{reel.brand}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Prev / Active Title (Mobile) / Next / 1:1 Audio Toggle */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-[#09090c]/90 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous Reel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Active Brand Pill (Visible on Mobile & Desktop) */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#09090c]/90 border border-white/15 font-mono text-[10px] tracking-[0.2em] uppercase text-bone shadow-lg">
              <span className="spectrum-text font-bold">
                [{REELS[activeIndex].index}/06]
              </span>
              <span className="font-semibold">{REELS[activeIndex].title}</span>
            </div>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-[#09090c]/90 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label="Next Reel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Full-Scale 1:1 Audio Mute / Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#09090c]/90 hover:bg-white/15 border border-white/15 text-white transition-all duration-200 cursor-pointer shadow-lg font-mono text-[9.5px] uppercase tracking-[0.18em]"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <>
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span className="hidden sm:inline text-white/70">MUTED</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="hidden sm:inline text-white font-semibold">AUDIO ON</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
