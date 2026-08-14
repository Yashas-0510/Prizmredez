"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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

function DesktopZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.slice(0, 7).map(({ src, alt, objectPosition }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
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
              } `}
            >
              <div className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black group">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  className={`h-full w-full ${objectPosition || "object-cover object-top"} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SocialCard({ item }: { item: ZoomParallaxImage }) {
  const activeSrc = item.mobileSrc || item.src;
  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d10] shadow-[0_10px_30px_rgba(0,0,0,0.6)] group shrink-0">
      <Image
        src={activeSrc || "/placeholder.svg"}
        alt={item.alt || item.title || "Social Campaign"}
        fill
        sizes="50vw"
        quality={85}
        className={`w-full h-full ${item.objectPosition || "object-cover object-top"} transition-transform duration-500`}
      />
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

function MobileKineticFeed({ images }: ZoomParallaxProps) {
  // Distribute images across 2 staggered columns
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 !== 0);

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
              {col1.map((item, idx) => (
                <SocialCard key={`col1-track1-${idx}`} item={item} />
              ))}
            </div>
            {/* Cloned Track for gapless seamless loop */}
            <div className="flex flex-col gap-3.5 pb-3.5 shrink-0" aria-hidden="true">
              {col1.map((item, idx) => (
                <SocialCard key={`col1-track2-${idx}`} item={item} />
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
              {col2.map((item, idx) => (
                <SocialCard key={`col2-track1-${idx}`} item={item} />
              ))}
            </div>
            {/* Cloned Track for gapless seamless loop */}
            <div className="flex flex-col gap-3.5 pb-3.5 shrink-0" aria-hidden="true">
              {col2.map((item, idx) => (
                <SocialCard key={`col2-track2-${idx}`} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopZoomParallax images={images} />
      </div>
      <div className="block md:hidden">
        <MobileKineticFeed images={images} />
      </div>
    </>
  );
}
