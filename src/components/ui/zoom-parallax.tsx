"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

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

export interface ZoomParallaxImage {
  src: string;
  mobileSrc?: string;
  alt?: string;
  title?: string;
  category?: string;
  objectPosition?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: ZoomParallaxImage[];
}

function DesktopZoomParallax({
  images,
  onSelect,
}: ZoomParallaxProps & { onSelect: (index: number) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 3.6]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 4.5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 5.5]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 6.5]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 7.2]);

  const scales = [
    scaleCenter,
    scale5,
    scale6,
    scale5,
    scale6,
    scale7,
    scale8,
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.slice(0, 7).map(({ src, alt, title, category, objectPosition }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none transform-gpu ${
                index === 1
                  ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]"
                  : ""
              } ${
                index === 6
                  ? "[&>div]:!top-[26vh] [&>div]:!left-[27.5vw] [&>div]:!h-[20vh] [&>div]:!w-[18vw]"
                  : ""
              }`}
            >
              <div
                onClick={() => onSelect(index)}
                data-cursor
                data-cursor-text="VIEW FULL"
                className="relative h-[26vh] w-[26vw] rounded-2xl overflow-hidden border border-white/20 hover:border-white/50 bg-[#0b0b0e] group pointer-events-auto cursor-pointer transition-colors duration-300"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={alt || title || `Parallax image ${index + 1}`}
                  fill
                  loading="eager"
                  decoding="async"
                  sizes={index === 0 ? "85vw" : "32vw"}
                  quality={85}
                  className={`h-full w-full ${objectPosition || "object-cover object-top"}`}
                />
                {/* Hover Expand Icon Pill */}
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/65 border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <Maximize2 className="w-3 h-3" />
                </div>
                {/* Subtle Brand & Category Tag Overlay */}
                {(title || category) && (
                  <div className="absolute inset-x-0 bottom-0 p-3 pt-6 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex items-end justify-between gap-2 pointer-events-none">
                    <div className="flex flex-col min-w-0">
                      {title && (
                        <span className="font-heading font-extrabold text-[10px] lg:text-[11px] text-white tracking-wider uppercase truncate">
                          {title}
                        </span>
                      )}
                      {category && (
                        <span className="font-mono text-[8px] text-bone/75 uppercase tracking-widest truncate">
                          {category}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[8px] text-white/45 shrink-0">
                      [0{index + 1}]
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SocialCard({
  item,
  index,
  onSelect,
}: {
  item: ZoomParallaxImage;
  index: number;
  onSelect: (index: number) => void;
}) {
  const activeSrc = item.mobileSrc || item.src;
  return (
    <div
      onClick={() => onSelect(index)}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 active:border-white/40 bg-[#0d0d10] shadow-[0_10px_30px_rgba(0,0,0,0.6)] group shrink-0 cursor-pointer"
    >
      <Image
        src={activeSrc || "/placeholder.svg"}
        alt={item.alt || item.title || "Social Campaign"}
        fill
        sizes="50vw"
        quality={85}
        className={`w-full h-full ${item.objectPosition || "object-cover object-top"} transition-transform duration-500`}
      />
      {/* Top Right Tap-to-Expand Icon */}
      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 pointer-events-none">
        <Maximize2 className="w-3 h-3" />
      </div>
      {/* Frosted Brand Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end pointer-events-none">
        {item.title && (
          <span className="font-heading font-extrabold text-[10px] sm:text-[11px] text-white tracking-wider uppercase drop-shadow-sm truncate">
            {item.title}
          </span>
        )}
        {item.category && (
          <span className="font-mono text-[8px] text-bone/70 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-spectrum shrink-0" />
            <span className="truncate">{item.category}</span>
          </span>
        )}
      </div>
    </div>
  );
}

function MobileKineticFeed({
  images,
  onSelect,
}: ZoomParallaxProps & { onSelect: (index: number) => void }) {
  // Distribute images across 2 staggered columns while preserving original index
  const indexed = images.slice(0, 7).map((item, idx) => ({ item, idx }));
  const col1 = indexed.filter((_, i) => i % 2 === 0);
  const col2 = indexed.filter((_, i) => i % 2 !== 0);

  return (
    <div className="relative w-full h-[580px] overflow-hidden py-2 [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]">
      {/* Subtle ambient backdrop aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.10),rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-2 gap-3.5 px-3 h-full">
        {/* Column 1: Upward Continuous Drift (100% seamless infinite track) */}
        <div className="overflow-hidden h-full">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
            className="flex flex-col will-change-transform"
          >
            {/* Primary Track */}
            <div className="flex flex-col gap-3.5 pb-3.5 shrink-0">
              {col1.map(({ item, idx }) => (
                <SocialCard
                  key={`col1-track1-${idx}`}
                  item={item}
                  index={idx}
                  onSelect={onSelect}
                />
              ))}
            </div>
            {/* Cloned Track for gapless seamless loop */}
            <div className="flex flex-col gap-3.5 pb-3.5 shrink-0" aria-hidden="true">
              {col1.map(({ item, idx }) => (
                <SocialCard
                  key={`col1-track2-${idx}`}
                  item={item}
                  index={idx}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Column 2: Downward Continuous Drift (100% seamless infinite track) */}
        <div className="overflow-hidden h-full">
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 18,
            }}
            className="flex flex-col will-change-transform"
          >
            {/* Primary Track */}
            <div className="flex flex-col gap-3.5 pb-3.5 shrink-0">
              {col2.map(({ item, idx }) => (
                <SocialCard
                  key={`col2-track1-${idx}`}
                  item={item}
                  index={idx}
                  onSelect={onSelect}
                />
              ))}
            </div>
            {/* Cloned Track for gapless seamless loop */}
            <div className="flex flex-col gap-3.5 pb-3.5 shrink-0" aria-hidden="true">
              {col2.map(({ item, idx }) => (
                <SocialCard
                  key={`col2-track2-${idx}`}
                  item={item}
                  index={idx}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const isMobile = useIsMobile();
  const visibleImages = images.slice(0, 7);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + visibleImages.length) % visibleImages.length
    );
  }, [visibleImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % visibleImages.length
    );
  }, [visibleImages.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const activeItem = selectedIndex !== null ? visibleImages[selectedIndex] : null;

  return (
    <>
      {isMobile ? (
        <MobileKineticFeed images={visibleImages} onSelect={setSelectedIndex} />
      ) : (
        <DesktopZoomParallax images={visibleImages} onSelect={setSelectedIndex} />
      )}

      {/* Full-Screen Campaign Lightbox Modal */}
      <AnimatePresence>
        {activeItem && selectedIndex !== null && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[120] bg-black/92 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none"
          >
            {/* Top Bar: Campaign Index, Brand Title, Category & Close Button */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 z-10"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs spectrum-text font-bold tracking-[0.2em]">
                  [0{selectedIndex + 1} / 0{visibleImages.length}]
                </span>
                <span className="font-heading font-extrabold text-sm sm:text-lg text-white uppercase tracking-wider">
                  {activeItem.title}
                </span>
                {activeItem.category && (
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 font-mono text-[9.5px] text-bone/80 uppercase tracking-[0.18em]">
                    {activeItem.category}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close full image view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Center Uncropped Full Image Stage + Prev/Next Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 w-full max-w-6xl mx-auto my-4 flex items-center justify-center overflow-hidden"
            >
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95"
                aria-label="Previous campaign"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <motion.div
                key={activeItem.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-full max-h-[74vh] flex items-center justify-center"
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt || activeItem.title || "Full campaign creative"}
                  fill
                  sizes="92vw"
                  quality={95}
                  className="object-contain"
                />
              </motion.div>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95"
                aria-label="Next campaign"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Campaign Switcher Strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-1.5 pt-3 border-t border-white/10 z-10"
            >
              {visibleImages.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-black font-bold shadow-md"
                        : "bg-white/[0.04] hover:bg-white/15 text-white/60 hover:text-white border border-white/10"
                    }`}
                  >
                    0{idx + 1} {item.title}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
