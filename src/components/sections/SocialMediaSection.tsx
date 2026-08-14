"use client";

import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import { HyperText } from "@/components/ui/hyper-text";
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
    alt: "Belvish — Visual Identity",
    title: "BELVISH",
    category: "LUXURY AESTHETICS",
  },
  {
    src: "/social/vantara1.webp",
    alt: "Vantara — Wildlife & Brand",
    title: "VANTARA",
    category: "CAMPAIGN SYSTEM",
  },
  {
    src: "/social/krossanmob.webp",
    alt: "Krossan — Artisanal Bakery",
    title: "KROSSAN",
    category: "ARTISANAL PATISSERIE",
  },
  {
    src: "/social/auric1.webp",
    alt: "Auric — Visual Systems",
    title: "AURIC",
    category: "VISUAL SYSTEMS",
  },
  {
    src: "/social/toxic.webp",
    alt: "Toxic — Visual Direction",
    title: "TOXIC",
    category: "CREATIVE REEL",
  },
];

/**
 * Room 06 — Social Systems with Zoom Parallax multi-image expansion.
 */
export default function SocialMediaSection() {
  return (
    <RoomShell index="06" label="Social Systems" id="social" right="FEEDS THAT STOP THUMBS">
      <div className="relative pt-16 md:pt-24 min-h-screen">
        {/* Centered top section heading — HyperText scramble animation */}
        <Reveal className="text-center -mt-6 md:-mt-10 mb-6 md:mb-8 flex justify-center px-6">
          <HyperText
            as="h2"
            startOnView
            animateOnHover
            interval={5000}
            duration={1400}
            className="font-heading font-extrabold uppercase text-[clamp(1.15rem,2.1vw,1.65rem)] tracking-[0.2em] text-dim"
          >
            SOCIAL  SYSTEMS
          </HyperText>
        </Reveal>

        {/* Narrative Copy Block: Split Layout (Headline Left, Subheadline Right) */}
        <div className="relative z-20 grid grid-cols-12 gap-6 md:gap-8 items-end w-full mt-12 sm:mt-16 md:mt-24 mb-4 px-4 sm:px-8 md:px-12 lg:px-16 pointer-events-none">
          {/* Left Side: Headline */}
          <div className="col-span-12 lg:col-span-7 text-left pointer-events-auto pl-4 sm:pl-8 lg:pl-12">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider text-white uppercase font-sans leading-tight drop-shadow-md max-w-xl">
              STRATEGY. CONTENT. COMMUNITY.
            </h3>
          </div>

          {/* Right Side: Subheadline */}
          <div className="col-span-12 lg:col-span-5 text-left lg:text-right pb-1 pl-4 sm:pl-8 lg:pl-0 lg:pr-20 pointer-events-auto">
            <p className="text-xs sm:text-sm md:text-base text-white/70 font-light leading-relaxed max-w-[280px] sm:max-w-[300px] lg:ml-auto translate-y-4 sm:translate-y-16 lg:translate-y-28">
              Full-funnel social media management, campaign strategy, graphic design, bespoke content creation, and active community building engineered for cult followings.
            </p>
          </div>
        </div>

        {/* 3D Zoom Parallax Component (Desktop) & Kinetic Dual-Column Feed (Mobile) */}
        <div className="mt-8 sm:-mt-16 md:-mt-32 relative z-10 w-full">
          <ZoomParallax images={socialImages} />
        </div>
      </div>
    </RoomShell>
  );
}
