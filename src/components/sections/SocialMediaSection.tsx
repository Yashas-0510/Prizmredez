"use client";

import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import { HyperText } from "@/components/ui/hyper-text";
import { ZoomParallax, ZoomParallaxImage } from "@/components/ui/zoom-parallax";

const socialImages: ZoomParallaxImage[] = [
  {
    src: "/social/kay-beauty.png",
    alt: "Kay Beauty — Feed System",
    title: "KAY BEAUTY",
    category: "BEAUTY & COSMETICS",
  },
  {
    src: "/social/myntra.png",
    alt: "Myntra — Fashion Campaign System",
    title: "MYNTRA FASHION",
    category: "E-COMMERCE",
  },
  {
    src: "/social/noise.png",
    alt: "Noise — Smart Wearables",
    title: "NOISE WEARABLES",
    category: "SMART TECH",
  },
  {
    src: "/social/bonkers-corner.png",
    alt: "Bonkers Corner — Streetwear System",
    title: "BONKERS CORNER",
    category: "STREETWEAR",
  },
  {
    src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1280&h=900&fit=crop&q=80",
    alt: "Abstract Metallic Brand Grid",
    title: "BRAND SPECTRUM",
    category: "VISUAL SYSTEMS",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&h=900&fit=crop&q=80",
    alt: "Minimalist Editorial Grid",
    title: "EDITORIAL GRID",
    category: "SOCIAL ARCHITECTURE",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=900&fit=crop&q=80",
    alt: "Atmospheric Brand Campaign",
    title: "ATMOSPHERIC SHOTS",
    category: "CAMPAIGN DIRECTION",
  },
];

/**
 * Room 06 — Social Systems with Zoom Parallax multi-image expansion.
 */
export default function SocialMediaSection() {
  return (
    <RoomShell index="06" label="Social Systems" id="social" right="FEEDS THAT STOP THUMBS">
      <div className="relative pt-16 md:pt-24">
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

        {/* Narrative Copy Block */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 px-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">
              Grids. Reels. Stories. One Sovereign Visual System.
            </span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-wider text-white uppercase font-sans leading-tight drop-shadow-md">
            <span className="spectrum-text">CULTURE</span> IS THE CURRENCY.
          </h3>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-white/70 font-light leading-relaxed max-w-xl">
            Scroll down to watch our social design systems expand in full 3D zoom parallax.
          </p>
        </div>

        {/* 3D Zoom Parallax Component */}
        <ZoomParallax images={socialImages} />
      </div>
    </RoomShell>
  );
}
