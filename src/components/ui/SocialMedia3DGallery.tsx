"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useSpring } from "framer-motion";

export interface SocialFeedItem {
  id: string;
  brand: string;
  category: string;
  handle: string;
  src: string;
  reach: string;
  engagement: string;
  summary: string;
  accentColor: string;
}

export const SOCIAL_FEEDS: SocialFeedItem[] = [
  {
    id: "redbull",
    brand: "RED BULL",
    category: "ENERGY & CAMPAIGNS",
    handle: "@redbull",
    src: "/social/redbullcen.png",
    reach: "42.8M",
    engagement: "8.1%",
    summary: "High-voltage social media ecosystem for Red Bull. Cinematic campaign visual direction, drop strategy, and active community engagement.",
    accentColor: "#ef4444",
  },
  {
    id: "noise",
    brand: "NOISE WEARABLES",
    category: "SMART TECH",
    handle: "@gonoise",
    src: "/social/NoiseLver.png",
    reach: "18.9M",
    engagement: "6.1%",
    summary: "Futuristic tech aesthetic for Noise wearables. High-energy launch assets, carousel breakdowns, and product storytelling.",
    accentColor: "#3b82f6",
  },
  {
    id: "nike",
    brand: "NIKE SPORTSWEAR",
    category: "ATHLETICS & SPORTS",
    handle: "@nike",
    src: "/social/nikerightcen.png",
    reach: "65.4M",
    engagement: "9.3%",
    summary: "Iconic athletic brand visual system. Bold typography, high-impact campaign reels, and cultural storytelling.",
    accentColor: "#f97316",
  },
  {
    id: "myntra",
    brand: "MYNTRA",
    category: "E-COMMERCE FASHION",
    handle: "@myntra",
    src: "/social/myntra.png",
    reach: "28.5M",
    engagement: "4.8%",
    summary: "High-tempo social media design system for Myntra's flagship fashion properties and seasonal trend campaigns.",
    accentColor: "#ec4899",
  },
  {
    id: "bonkers-corner",
    brand: "BONKERS CORNER",
    category: "STREETWEAR & APPAREL",
    handle: "@bonkers.corner",
    src: "/social/bonkers-corner.png",
    reach: "11.6M",
    engagement: "7.2%",
    summary: "Bold, raw streetwear social system for Bonkers Corner. Hyper-stylized grid graphics, drop teasers, and community reels.",
    accentColor: "#eab308",
  },
  {
    id: "kay-beauty",
    brand: "KAY BEAUTY",
    category: "BEAUTY & COSMETICS",
    handle: "@kaybykatrina",
    src: "/social/kay-beauty.png",
    reach: "14.2M",
    engagement: "5.4%",
    summary: "Sovereign visual identity for Kay Beauty. Cohesive grid strategy, editorial stories, and high-conversion launch reels.",
    accentColor: "#f43f5e",
  },
];

export default function SocialMedia3DGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<SocialFeedItem | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mouse Gyro Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const gyroRotateY = useSpring(mousePos.x * 16, { stiffness: 100, damping: 20 });
  const gyroRotateX = useSpring(mousePos.y * -16, { stiffness: 100, damping: 20 });

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SOCIAL_FEEDS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SOCIAL_FEEDS.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 select-none">
      {/* 3D Interactive Carousel Stage */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        style={{ perspective: 1000 }}
        className="relative w-full max-w-5xl min-h-[460px] sm:min-h-[520px] flex items-center justify-center py-4 overflow-hidden"
      >
        {/* Render Carousel Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {SOCIAL_FEEDS.map((feed, idx) => {
            const offset = idx - activeIndex;
            const isActive = idx === activeIndex;
            const isPrev = offset === -1 || (activeIndex === 0 && idx === SOCIAL_FEEDS.length - 1 && SOCIAL_FEEDS.length > 2);
            const isNext = offset === 1 || (activeIndex === SOCIAL_FEEDS.length - 1 && idx === 0 && SOCIAL_FEEDS.length > 2);

            // Compute 3D position & rotation for mobile & desktop
            let xOffset = offset * 210;
            if (offset > 1) xOffset = 480;
            if (offset < -1) xOffset = -480;

            const rotateY = offset * -18;
            const scale = isActive ? 1.02 : 0.82;
            const opacity = isActive ? 1 : isPrev || isNext ? 0.6 : 0;
            const zIndex = isActive ? 30 : 20 - Math.abs(offset);

            return (
              <motion.div
                key={feed.id}
                initial={false}
                animate={{
                  x: xOffset,
                  scale,
                  rotateY: isActive ? gyroRotateY.get() : rotateY,
                  rotateX: isActive ? gyroRotateX.get() : 0,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 22,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset: dragOffset, velocity }) => {
                  if (dragOffset.x < -35 || velocity.x < -200) {
                    handleNext();
                  } else if (dragOffset.x > 35 || velocity.x > 200) {
                    handlePrev();
                  }
                }}
                onClick={() => {
                  if (isActive) {
                    setActiveModal(feed);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className="absolute w-[260px] sm:w-[320px] md:w-[380px] rounded-2xl border border-white/15 bg-black/90 backdrop-blur-md p-3 shadow-2xl cursor-pointer group flex flex-col items-center touch-pan-y"
              >
                {/* Brand Header Bar */}
                <div className="w-full flex items-center justify-between px-2 py-1.5 mb-2 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white tracking-wider">{feed.brand}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50 uppercase">{feed.category}</span>
                </div>

                {/* Feed Image Thumbnail */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner group-hover:border-white/30 transition-colors">
                  <Image
                    src={feed.src}
                    alt={feed.brand}
                    fill
                    sizes="(max-width: 768px) 340px, 400px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Click to expand overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-mono font-medium backdrop-blur-md shadow-lg">
                      EXPAND FEED ↗
                    </span>
                  </div>
                </div>

                {/* Bottom Metric Badges */}
                <div className="w-full flex items-center justify-between px-2 pt-3 text-xs font-mono">
                  <span className="text-white/60">REACH: <strong className="text-white">{feed.reach}</strong></span>
                  <span className="text-white/60">ENGAGEMENT: <strong className="text-emerald-400">{feed.engagement}</strong></span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Pagination Dots */}
      <div className="flex items-center space-x-6 mt-6 z-20">
        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-lg"
          aria-label="Previous Feed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
          {SOCIAL_FEEDS.map((feed, idx) => (
            <button
              key={feed.id}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex ? "w-5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Jump to ${feed.brand}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-lg"
          aria-label="Next Feed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Full-Screen Feed Viewer Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/20 bg-ink-soft overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Image Display */}
              <div className="relative w-full md:w-3/5 h-[350px] md:h-auto min-h-[400px] bg-black overflow-y-auto">
                <Image
                  src={activeModal.src}
                  alt={activeModal.brand}
                  width={1200}
                  height={1500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Modal Info Column */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-black/40 border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-1">
                    {activeModal.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider font-sans">
                    {activeModal.brand}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mt-1">{activeModal.handle}</p>

                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-4">
                    {activeModal.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60">CAMPAIGN REACH</span>
                    <span className="text-white font-bold">{activeModal.reach}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60">AVG ENGAGEMENT RATE</span>
                    <span className="text-emerald-400 font-bold">{activeModal.engagement}</span>
                  </div>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full mt-4 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    CLOSE VIEWER
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
