"use client";

import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import { ZoomParallax, ZoomParallaxImage } from "@/components/ui/zoom-parallax";

const socialImages: ZoomParallaxImage[] = [
  {
    src: "/social/wildstone2.webp",
    mobileSrc: "/social/wildstonemob.webp",
    alt: "Wild Stone — Fragrance Campaign",
    title: "WILD STONE",
    category: "FRAGRANCE & STYLE",
  },
  {
    src: "/social/campusmob.webp",
    alt: "Campus — Footwear Campaign",
    title: "CAMPUS SHOES",
    category: "FOOTWEAR & ACTIVEWEAR",
  },
  {
    src: "/social/kalki.webp",
    alt: "Kalki — Visual System",
    title: "KALKI FASHION",
    category: "LUXURY FASHION",
  },
  {
    src: "/social/belvish1.webp",
    mobileSrc: "/social/belvishmob.webp",
    alt: "Belvish — Luxury Fragrance",
    title: "BELVISH",
    category: "LUXURY FRAGRANCE",
  },
  {
    src: "/social/vantara1.webp",
    alt: "Vantara — Wildlife Conservation Initiative",
    title: "VANTARA",
    category: "CAMPAIGN SYSTEM",
  },
  {
    src: "/social/krossanmob.webp",
    alt: "Krossan — Contemporary Menswear",
    title: "KROSSAN",
    category: "CONTEMPORARY APPAREL",
  },
  {
    src: "/social/auric1.webp",
    alt: "Auric — Kesar Attar Heritage Perfumery",
    title: "AURIC",
    category: "HERITAGE PERFUMERY",
  },
];

/**
 * Room 07 — Social Systems with Zoom Parallax multi-image expansion.
 */
export default function SocialMediaSection() {
  return (
    <RoomShell index="06" label="Social Systems" id="social" right="FEEDS THAT STOP THUMBS">
      <div className="relative pt-16 md:pt-24 min-h-screen">
        {/* Centered top section heading — First word solid, second hollow */}
        <Reveal className="text-center -mt-6 md:-mt-10 mb-6 md:mb-8 flex flex-col items-center justify-center px-6">
          <div className="flex items-center justify-center gap-2 mb-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse shrink-0" />
            <span>BRAND ARCHITECTURE · STRATEGY / CONTENT / COMMUNITY</span>
          </div>
          <h2 className="font-heading font-extrabold uppercase text-[clamp(1.75rem,4.5vw,3.6rem)] leading-[1.04] text-bone tracking-tight">
            SOCIAL <span className="text-outline">SYSTEMS.</span>
          </h2>
        </Reveal>

        {/* Narrative Copy Block: Split Layout (Headline Left, Subheadline Right) */}
        <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-12 gap-4 md:gap-8 items-end w-full mt-6 sm:mt-10 mb-8 md:mb-12 px-6 md:px-10">
          {/* Left Side: Headline */}
          <div className="col-span-12 lg:col-span-7 text-left">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider text-white uppercase font-sans leading-tight drop-shadow-md">
              STRATEGY. CONTENT. <span className="spectrum-text">COMMUNITY.</span>
            </h3>
          </div>

          {/* Right Side: Subheadline */}
          <div className="col-span-12 lg:col-span-5 text-left lg:text-right">
            <p className="text-xs sm:text-sm md:text-[15px] text-white/65 font-light leading-relaxed max-w-md lg:ml-auto">
              Full-funnel social media management, campaign direction, bespoke visual systems, and community building engineered for cult followings.
            </p>
          </div>
        </div>

        {/* 3D Zoom Parallax Component (Desktop) & Kinetic Dual-Column Feed (Mobile) */}
        <div className="relative z-10 w-full">
          <ZoomParallax images={socialImages} />
        </div>
      </div>
    </RoomShell>
  );
}
