"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * CofoundersZDepth — 3D Z-Axis Push-Forward Reveal.
 * Rhea & Yash start deep in 3D back-space (scaled down, blurred, low opacity)
 * and zoom forward on the Z-axis into sharp focus as the user scrolls into view.
 */
export default function CofoundersZDepth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Co-Founders Heading */}
      <div className="text-center mb-2 md:mb-3">
        <p className="meta uppercase text-white/50 text-[11px] md:text-xs tracking-[0.25em]">
          CO-FOUNDERS
        </p>
      </div>

      {/* 3D Perspective Container */}
      <div className="relative flex items-end justify-center max-w-[28rem] mx-auto lg:ml-auto pt-2 md:pt-4 [perspective:1200px]">
        {/* Rhea — Foreground (z-10) pushes forward on Z-axis */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.45,
            z: -250,
            filter: "blur(12px)",
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  scale: 1,
                  z: 20,
                  filter: "blur(0px)",
                }
              : {}
          }
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1], // Custom cubic bezier smooth deceleration
          }}
          className="group relative z-10 w-[56%] transition-transform duration-300 hover:z-20 hover:-translate-y-2 [transform-style:preserve-3d]"
        >
          <div className="relative aspect-[3/4] flex items-end justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rheaprizm.png"
              alt="RHEA — CO-FOUNDER"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-heading font-extrabold uppercase text-lg md:text-xl text-bone group-hover:spectrum-text transition-colors">
              RHEA
            </h3>
          </div>
        </motion.div>

        {/* Yash — Background (z-0) enters from Z-axis depth first */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.4,
            z: -320,
            filter: "blur(16px)",
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  filter: "blur(0px)",
                }
              : {}
          }
          transition={{
            duration: 1.0,
            delay: 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative z-0 w-[56%] -ml-[31%] transition-transform duration-300 hover:z-20 hover:-translate-y-2 [transform-style:preserve-3d]"
        >
          <div className="relative aspect-[3/4] flex items-end justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/yashprizm.png"
              alt="YASH — CO-FOUNDER"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-heading font-extrabold uppercase text-lg md:text-xl text-bone group-hover:spectrum-text transition-colors">
              YASH
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
