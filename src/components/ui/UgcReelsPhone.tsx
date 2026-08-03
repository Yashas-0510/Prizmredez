"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UGC_REELS = [
  {
    id: "shoe",
    handle: "@hyper.run",
    caption: "High-octane sportswear ads. No shoots, no retakes, pure performance. 👟 #Footwear #UGC",
    likes: "320.1K",
    comments: "8.7K",
    brand: "HYPER RUN",
    src: "/UGC/shoeugc.mp4",
    color: "#ef4444",
    metric: "+5.2X ROAS",
  },
  {
    id: "dove",
    handle: "@dove.official",
    caption: "Real beauty, AI-engineered. High-converting body care UGC reels delivered in hours. 🕊️ #Dove #SkinCare",
    likes: "194.5K",
    comments: "3.8K",
    brand: "DOVE",
    src: "/UGC/doveugc.mp4",
    color: "#0284c7",
    metric: "4.3X ROAS",
  },
  {
    id: "cera",
    handle: "@cerave.official",
    caption: "Derma-grade AI UGC created in seconds. Zero camera crew needed. #AIUGC #SkincareAds",
    likes: "148.2K",
    comments: "3.4K",
    brand: "CERAVE",
    src: "/UGC/ceraugc.mp4",
    color: "#3b82f6",
    metric: "4.8X ROAS",
  },
  {
    id: "wholetruth",
    handle: "@wholetruth.co",
    caption: "Clean label nutrition ads generated overnight. Pure transparency. 🍫 #WholeTruth #AIUGC",
    likes: "189.6K",
    comments: "4.9K",
    brand: "WHOLE TRUTH",
    src: "/UGC/ugcwhole.mp4",
    color: "#f97316",
    metric: "+410% CONV",
  },
  {
    id: "jewellery",
    handle: "@lumina.jewelry",
    caption: "Luxury aesthetics engineered for high-converting social campaigns. 💎 #JewelryAds #PrizmAI",
    likes: "212.9K",
    comments: "5.1K",
    brand: "LUMINA",
    src: "/UGC/jewelleryugc.mp4",
    color: "#eab308",
    metric: "+320% CTR",
  },
  {
    id: "minimalist",
    handle: "@minimalist.skin",
    caption: "Clean, science-first skincare UGC reels. High ROAS guaranteed. ✨ #Minimalist #BeautyAds",
    likes: "175.4K",
    comments: "4.2K",
    brand: "MINIMALIST",
    src: "/UGC/ugcminimalist.mp4",
    color: "#a855f7",
    metric: "4.1X ROAS",
  },
];

export default function UgcReelsPhone() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedMap, setLikedMap] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Explicit video playback management & sound lock (prevents stuck videos)
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        vid.muted = idx === activeIndex ? isMuted : true;
        if (idx === activeIndex) {
          if (isPlaying) {
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
          } catch (_) {}
        }
      }
    });
  }, [isMuted, activeIndex, isPlaying]);

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

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-8 select-none bg-ink">
      {/* Main Split Layout: Phone Left on PC, Copy & Controls Right on PC */}
      <div className="relative z-20 w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-16 my-auto">
        {/* --- LEFT SIDE: SINGLE 3D SMARTPHONE DEVICE (SWIPEABLE UP / DOWN) --- */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative shrink-0 w-[285px] sm:w-[325px] md:w-[345px] aspect-[9/19] rounded-[44px] border-[6px] border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] shadow-white/10 overflow-hidden bg-black flex flex-col mx-auto lg:mx-0 cursor-grab active:cursor-grabbing touch-pan-y"
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
            {UGC_REELS.map((reel, idx) => (
              <div
                key={reel.id}
                onClick={() => idx === activeIndex && setIsPlaying(!isPlaying)}
                className="relative w-full h-full shrink-0 overflow-hidden bg-black cursor-pointer"
              >
                {/* Video Element */}
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={reel.src}
                  autoPlay
                  loop
                  muted={idx === activeIndex ? isMuted : true}
                  playsInline
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
                    <span className="text-[10px] text-white font-medium mt-1 drop-shadow">{reel.likes}</span>
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

                  {/* Sound Mute Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md cursor-pointer hover:scale-110 transition-transform shadow-lg"
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
                </div>

                {/* Bottom Left Creator Handle & Caption Overlay */}
                <div className="absolute bottom-4 left-3 right-16 z-30 text-left pointer-events-none">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="text-xs font-bold text-white drop-shadow">{reel.handle}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono uppercase">
                      AI Creator
                    </span>
                  </div>
                  <p className="text-[10px] text-white/80 line-clamp-2 font-light leading-snug drop-shadow">
                    {reel.caption}
                  </p>
                </div>

                {/* Inner Ambient Vignette */}
                <div className="absolute inset-0 z-15 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: HIGH-IMPACT NARRATIVE COPY & CONTROLS (ON PC) --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
          {/* Sub-tag */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">
              No cameras. No location permits. No ghosting creators.
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white uppercase font-sans leading-tight drop-shadow-md">
            <span className="spectrum-text">COMPUTE</span> IS <br className="hidden lg:block" />
            THE NEW CAMERA.
          </h2>

          {/* Value Narrative Body */}
          <p className="mt-4 text-xs sm:text-sm lg:text-base text-white/70 font-light leading-relaxed max-w-lg">
            What used to take 6 weeks, location permits, and a 10-lakh budget — we deliver in 48 hours. Test 100s of hook variations and photorealistic avatars without scheduling a single shoot.
          </p>

          {/* Metric Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6">
            <span className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-emerald-400 font-bold backdrop-blur-md">
              {currentReel.metric}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-white/80 backdrop-blur-md">
              OVERNIGHT DELIVERY
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-white/80 backdrop-blur-md">
              ZERO CREW COSTS
            </span>
          </div>

          {/* Feed Controls (Up / Down & Reel Pagination) */}
          <div className="flex flex-col items-center lg:items-start space-y-4 mt-8 w-full">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-lg"
                aria-label="Previous Reel Feed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              <span className="text-xs font-mono text-white/80 uppercase tracking-widest px-4 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md">
                {currentReel.brand}
              </span>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-lg"
                aria-label="Next Reel Feed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7-7-7-7" />
                </svg>
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              {UGC_REELS.map((reel, idx) => (
                <button
                  key={reel.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Jump to ${reel.brand}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
