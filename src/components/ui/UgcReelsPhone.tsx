"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";

const UGC_REELS = [
  {
    id: "shoe",
    index: "01",
    handle: "@brooks.run",
    caption: "High-octane footwear unboxing & creator reels. Zero shoots, zero retakes, pure performance.",
    brand: "BROOKS",
    category: "FOOTWEAR & SPORT",
    src: "/UGC/shoeugc.mp4",
  },
  {
    id: "dove",
    index: "02",
    handle: "@dove.care",
    caption: "Velvet hydration, AI-engineered. High-converting hair & body care UGC reels delivered in hours.",
    brand: "DOVE",
    category: "HAIR & BODY CARE",
    src: "/UGC/doveugc.mp4",
  },
  {
    id: "cera",
    index: "03",
    handle: "@cerave.skin",
    caption: "SPF 50 Invisible Hydrating Fluid creator reel generated in hours. Zero camera crew needed.",
    brand: "CERAVE",
    category: "DERMA SKINCARE",
    src: "/UGC/ceraugc.mp4",
  },
  {
    id: "wholetruth",
    index: "04",
    handle: "@thewholetruth",
    caption: "20g protein bar clean-label nutrition campaign generated overnight. Rapid hook testing at scale.",
    brand: "THE WHOLE TRUTH",
    category: "CLEAN NUTRITION",
    src: "/UGC/ugcwhole.mp4",
  },
  {
    id: "jewellery",
    index: "05",
    handle: "@lumina.atelier",
    caption: "Fine diamond jewelry aesthetics engineered for high-converting paid social campaigns.",
    brand: "LUMINA JEWELS",
    category: "FINE JEWELRY",
    src: "/UGC/jewelleryugc.mp4",
  },
  {
    id: "minimalist",
    index: "06",
    handle: "@beminimalist",
    caption: "Niacinamide 10% clinical skincare reels crafted for multi-variant paid social testing.",
    brand: "MINIMALIST",
    category: "CLINICAL BEAUTY",
    src: "/UGC/ugcminimalist.mp4",
  },
];

export default function UgcReelsPhone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedMap, setLikedMap] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isInViewRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const shadowScaledX = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const shadowScaledY = useTransform(mouseY, [-0.5, 0.5], [0.95, 1.05]);

  const shadowX = useSpring(shadowScaledX, { stiffness: 100, damping: 20 });
  const shadowScaleX = useSpring(shadowScaledY, { stiffness: 100, damping: 20 });

  // Scroll Progress Tracking for 3D Docking & Text Sequence (Lenis already smooths scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // 3D Phone Docking Entrance Transforms
  const phoneRotateY = useTransform(scrollYProgress, [0.0, 0.75], [-24, 0]);
  const phoneScale = useTransform(scrollYProgress, [0.0, 0.75], [0.82, 1.0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.0, 0.45], [0.15, 1.0]);
  const phoneY = useTransform(scrollYProgress, [0.0, 0.75], ["40px", "0px"]);

  // Staggered Right Side Text Sequence
  const copyOpacity = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);
  const maskY1 = useTransform(scrollYProgress, [0.30, 0.65], ["115%", "0%"]);
  const maskY2 = useTransform(scrollYProgress, [0.35, 0.70], ["115%", "0%"]);
  const paragraphY = useTransform(scrollYProgress, [0.40, 0.75], ["20px", "0px"]);
  const metricsScale = useTransform(scrollYProgress, [0.45, 0.80], [0.88, 1.0]);

  // Explicit video playback management & sound lock (prevents stuck videos)
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        vid.muted = idx === activeIndex ? isMuted : true;
        if (idx === activeIndex) {
          if (isPlaying && isInViewRef.current) {
            const playPromise = vid.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            vid.pause();
          }
        } else {
          vid.pause();
          try {
            vid.currentTime = 0;
          } catch {
            // video reset fallback
          }
        }
      }
    });
  }, [isMuted, activeIndex, isPlaying]);

  // Viewport observation: auto-pause all videos when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isInViewRef.current = inView;
        const currentVid = videoRefs.current[activeIndex];
        if (!currentVid) return;
        if (!inView && !currentVid.paused) {
          currentVid.pause();
        } else if (inView && currentVid.paused && isPlaying) {
          currentVid.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeIndex, isPlaying]);

  const handleNext = () => {
    setIsPlaying(true);
    setActiveIndex((prev) => (prev === UGC_REELS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(true);
    setActiveIndex((prev) => (prev === 0 ? UGC_REELS.length - 1 : prev - 1));
  };

  const toggleLike = (index: number) => {
    setLikedMap((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDragEnd = (_e: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const swipeThreshold = 35;
    if (info.offset.y < -swipeThreshold || info.velocity.y < -200) {
      // Swiped UP -> Next Reel
      handleNext();
    } else if (info.offset.y > swipeThreshold || info.velocity.y > 200) {
      // Swiped DOWN -> Previous Reel
      handlePrev();
    }
  };

  const currentReel = UGC_REELS[activeIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-8 select-none bg-transparent"
    >
      {/* Main Split Layout: Phone Left on PC, Copy & Controls Right on PC */}
      <div className="relative z-20 w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-16 my-auto">
        
        {/* --- SLEEK AWWWARDS VERTICAL PAGINATION TRACK --- */}
        <div className="hidden xl:flex flex-col items-center justify-between h-[380px] my-auto pr-4 text-white/30 font-mono text-[10px] select-none">
          <span className="tracking-widest">01</span>
          <div className="relative w-[2px] h-64 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{
                top: `${(activeIndex / (UGC_REELS.length - 1)) * 88}%`,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              className="absolute left-0 w-full h-8 bg-gradient-to-b from-white via-emerald-400 to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            />
          </div>
          <span className="tracking-widest">0{UGC_REELS.length}</span>
        </div>

        {/* --- LEFT SIDE: SINGLE 3D SMARTPHONE DEVICE WITH CINEMATIC MOUSE GYRO & FLOOR SHADOW --- */}
        <div style={{ perspective: 1200 }} className="relative shrink-0 mx-auto lg:mx-0 flex flex-col items-center">
          <motion.div
            style={{
              rotateY: phoneRotateY,
              scale: phoneScale,
              opacity: phoneOpacity,
              y: phoneY,
              transformStyle: "preserve-3d",
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-[285px] sm:w-[325px] md:w-[345px] aspect-[9/19] rounded-[44px] border-[6px] border-neutral-800 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden bg-black flex flex-col cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {/* Phone Speaker / Dynamic Notch Header */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/90 rounded-b-xl z-40 border-b border-white/10 flex items-center justify-center pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-white/15 border border-white/20 mr-2" />
              <div className="w-7 h-1 rounded-full bg-white/20" />
            </div>

            {/* Top Reels Header Bar */}
            <div className="absolute top-5 left-4 right-4 z-30 flex items-center justify-between pointer-events-none text-white text-xs font-semibold drop-shadow">
              <span className="bg-black/40 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-md">
                Reels
              </span>
              <span className="text-[10px] text-white/70 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                {activeIndex + 1} / {UGC_REELS.length}
              </span>
            </div>

            {/* Animated Swipe Up/Down Micro-Interaction Hint Badge */}
            <div className="absolute top-11 left-1/2 -translate-x-1/2 z-35 pointer-events-none flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md shadow-xl">
              <svg className="w-3 h-3 text-white/80 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l5-5 5 5M7 8l5-5 5 5" />
              </svg>
              <span className="text-[9px] font-mono text-white/90 font-medium uppercase tracking-widest">
                SWIPE FEED
              </span>
            </div>

            {/* Vertical Feed Container (Slides Up/Down) */}
            <motion.div
              animate={{ y: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="w-full h-full flex flex-col pointer-events-none"
            >
              {UGC_REELS.map((reel, idx) => {
                const dist = Math.abs(idx - activeIndex);
                const isNear = dist <= 1 || dist === UGC_REELS.length - 1;
                return (
                <div
                  key={reel.id}
                  onClick={() => idx === activeIndex && setIsPlaying(!isPlaying)}
                  className="relative w-full h-full shrink-0 overflow-hidden bg-black cursor-pointer"
                >
                  {/* Video Element — Only attaches src for active & immediate adjacent reels to save GPU decoders */}
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={isNear ? reel.src : undefined}
                    loop
                    muted={idx === activeIndex ? isMuted : true}
                    playsInline
                    preload={idx === activeIndex ? "metadata" : "none"}
                    className="w-full h-full object-cover"
                  />

                  {/* Paused Indicator Overlay */}
                  {!isPlaying && idx === activeIndex && (
                    <div className="absolute inset-0 z-25 bg-black/40 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                      <div className="p-4 rounded-full bg-black/65 border border-white/25 text-emerald-400 shadow-2xl">
                        <svg className="w-8 h-8 fill-emerald-400" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Right Action Icons (Reels Overlay) */}
                  <div className="absolute bottom-12 right-3 z-30 flex flex-col items-center space-y-3.5 pointer-events-auto">
                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(idx);
                      }}
                      className="flex flex-col items-center group cursor-pointer"
                      aria-label="Like video"
                    >
                      <div className="p-2.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md group-hover:scale-110 transition-transform">
                        <svg
                          className={`w-5 h-5 transition-colors ${
                            likedMap[idx] ? "text-rose-500 fill-rose-500" : "text-white"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Play / Pause Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md cursor-pointer hover:scale-110 transition-transform shadow-lg"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-emerald-400 fill-emerald-400" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      )}
                    </button>

                    {/* Sound Mute Toggle & Animated Waveform Bar */}
                    <div className="flex flex-col items-center space-y-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md cursor-pointer hover:scale-110 transition-transform shadow-lg flex items-center justify-center"
                        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                      >
                        {isMuted ? (
                          <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>

                      {/* Equalizer Bar Animation when Unmuted */}
                      {!isMuted && (
                        <div className="flex items-end space-x-[2px] h-3 px-1 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40">
                          <span className="w-[2px] bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-full" />
                          <span className="w-[2px] bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.15s] h-[60%]" />
                          <span className="w-[2px] bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.3s] h-[85%]" />
                          <span className="w-[2px] bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-[40%]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Left Creator Handle & Caption Overlay */}
                  <div className="absolute bottom-4 left-3 right-16 z-30 text-left pointer-events-none">
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span className="text-xs font-bold text-white drop-shadow">{reel.handle}</span>
                      <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-white/15 border border-white/15 text-bone font-mono uppercase tracking-wider">
                        {reel.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/80 line-clamp-2 font-light leading-snug drop-shadow">
                      {reel.caption}
                    </p>
                  </div>

                  {/* Inner Ambient Vignette */}
                  <div className="absolute inset-0 z-15 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
                </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* 3D Spatial Floor Shadow */}
          <motion.div
            style={{
              x: shadowX,
              scaleX: shadowScaleX,
            }}
            className="w-[85%] h-5 rounded-full bg-black/90 blur-xl mt-3 pointer-events-none shadow-[0_15px_30px_rgba(0,0,0,0.95)] opacity-80"
          />
        </div>

        {/* --- RIGHT SIDE: CINEMATIC STAGGERED NARRATIVE TEXT SEQUENCE --- */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
        >
          {/* Headline with 3D Mask Clip Reveal */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white uppercase font-sans leading-tight drop-shadow-md flex flex-col items-center lg:items-start">
            <span className="block overflow-hidden py-1">
              <motion.span style={{ y: maskY1 }} className="block will-change-transform">
                <span className="spectrum-text">COMPUTE</span> IS
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span style={{ y: maskY2 }} className="block text-white will-change-transform">
                THE NEW CAMERA.
              </motion.span>
            </span>
          </h2>

          {/* Value Narrative Body with Interactive Keyphrase Accents */}
          <motion.p
            style={{ y: paragraphY }}
            className="mt-4 text-xs sm:text-sm lg:text-base text-white/70 font-light leading-relaxed max-w-lg"
          >
            What used to take 6 weeks, location permits, and a 10-lakh budget — we deliver in{" "}
            <span className="text-white font-medium underline decoration-emerald-400/50 underline-offset-4 hover:decoration-emerald-400 transition-colors">
              48 hours
            </span>
            . Test{" "}
            <span className="text-white font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors">
              100s of hook variations
            </span>{" "}
            and photorealistic avatars without scheduling a single shoot.
          </motion.p>

          {/* Kinetic Badges */}
          <motion.div
            style={{ scale: metricsScale }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6"
          >
            <span className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-white/80 backdrop-blur-md">
              OVERNIGHT DELIVERY
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-white/80 backdrop-blur-md">
              ZERO CREW COSTS
            </span>
          </motion.div>

          {/* Feed Controls (Up / Down & Direct Brand Selector Grid) */}
          <div className="flex flex-col items-center lg:items-start space-y-4 mt-8 w-full">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-lg"
                aria-label="Previous Reel Feed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReel.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-xs font-mono text-white/90 font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0b0b0e] border border-white/20 shadow-md"
                >
                  <span className="spectrum-text font-bold">[{currentReel.index}/06]</span>
                  <span>{currentReel.brand}</span>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-lg"
                aria-label="Next Reel Feed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7-7-7-7" />
                </svg>
              </button>
            </div>

            {/* Direct 6-Brand Selector Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
              {UGC_REELS.map((reel, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={reel.id}
                    onClick={() => {
                      setIsPlaying(true);
                      setActiveIndex(idx);
                    }}
                    className={`px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? "bg-white text-black border-white font-bold shadow-md"
                        : "bg-white/[0.03] border-white/10 text-white/55 hover:text-white hover:border-white/25"
                    }`}
                  >
                    {reel.index} {reel.brand}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
