"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const REELS = [
  { id: "bella", title: "BELLA — 15S", src: "/ad-creatives/bellaad.mp4" },
  { id: "boat", title: "BOAT — 15S", src: "/ad-creatives/boattad.mp4" },
  { id: "poppi", title: "POPPI — 15S", src: "/ad-creatives/poppiad.mp4" },
  { id: "sleepyowl", title: "SLEEPY OWL — 15S", src: "/ad-creatives/sleepyowlad.mp4" },
];

export default function AdCreativesStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Track scroll progress across the 250vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for silky animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Scale: 1.0 (full screen 100vw) -> 0.40 (shrunk cinema screen)
  const videoScale = useTransform(smoothProgress, [0.0, 0.75], [1.0, 0.40]);

  // Border Radius: 0px (edge-to-edge) -> 16px (rounded screen)
  const borderRadius = useTransform(smoothProgress, [0.0, 0.75], ["0px", "16px"]);

  // Controls Opacity: 0 -> 1 as screen shrinks
  const controlsOpacity = useTransform(smoothProgress, [0.25, 0.65], [0, 1]);

  // Keep videos synced with muted state
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.muted = isMuted;
      }
    });
  }, [isMuted]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? REELS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === REELS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center select-none bg-ink">
        {/* Background Image (adbg.png) */}
        <Image
          src="/adbg.png?v=2"
          alt="Ad Creatives Stage Background"
          fill
          priority
          unoptimized
          className="object-cover pointer-events-none select-none z-0 opacity-100"
        />

        {/* --- MAIN CINEMA SCREEN VIDEO CONTAINER --- */}
        <motion.div
          style={{
            scale: videoScale,
            borderRadius: borderRadius,
          }}
          className="relative z-20 w-full h-full max-w-[100vw] max-h-[100vh] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden bg-black flex items-center justify-center"
        >
          {REELS.map((reel, idx) => (
            <video
              key={reel.id}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={reel.src}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                idx === activeIndex ? "opacity-100 relative z-10" : "opacity-0 absolute inset-0 z-0 pointer-events-none"
              }`}
            />
          ))}

          {/* Interactive Mute / Unmute Icon Button ON the video card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-4 right-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/85 border border-white/25 text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-110"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 z-15 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
        </motion.div>

        {/* Bottom Reel Navigation Arrows (Subtle & Minimalist) */}
        <motion.div
          style={{ opacity: controlsOpacity }}
          className="absolute bottom-6 md:bottom-8 z-30 flex items-center justify-center space-x-3 pointer-events-auto"
        >
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Reel"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Pagination Indicators */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/30 border border-white/10 backdrop-blur-md">
            {REELS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex ? "w-3 h-1 bg-bone" : "w-1 h-1 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to reel ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md active:scale-95"
            aria-label="Next Reel"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
