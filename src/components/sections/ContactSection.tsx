"use client";

import { useState, useRef } from "react";
import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/ui/gradient-orb";

const SERVICES = [
  "Web Design & Dev",
  "3D & Motion",
  "UGC Campaigns",
  "Brand Strategy",
  "Full Studio",
];

export default function ContactSection() {
  // Desktop Interactive Service Tag Selector state
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Web Design & Dev",
    "3D & Motion",
  ]);

  // Copy feedback notification toast state
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Magnetic mouse position ref for 3D Orb on Desktop
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const orbWrapperRef = useRef<HTMLDivElement>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleCopy = (text: string, label: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyToast(`${label} copied!`);
      setTimeout(() => setCopyToast(null), 2500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbContainerRef.current || !orbWrapperRef.current) return;
    const rect = orbContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    orbWrapperRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (orbWrapperRef.current) {
      orbWrapperRef.current.style.transform = `translate3d(0px, 0px, 0)`;
    }
  };

  const mailtoSubject = encodeURIComponent(
    `Project Inquiry${selectedServices.length > 0 ? `: ${selectedServices.join(", ")}` : ""
    }`
  );
  const mailtoUrl = `mailto:hello@prizmstudio.in?subject=${mailtoSubject}`;

  return (
    <RoomShell index="07" label="Contact" id="contact" right="KYIV — WORLDWIDE">
      <div className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-between px-6 md:px-12 pt-10 pb-24 text-center overflow-hidden">

        {/* Kinetic Ambient Marquee Banner (Background) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.035] select-none z-0">
          <div className="flex w-max marquee-track">
            <span className="monument text-[13vw] uppercase tracking-tighter whitespace-nowrap px-8 text-bone">
              PRIZM STUDIO — CRAFTING BRILLIANCE — START A PROJECT —
            </span>
            <span className="monument text-[13vw] uppercase tracking-tighter whitespace-nowrap px-8 text-bone">
              PRIZM STUDIO — CRAFTING BRILLIANCE — START A PROJECT —
            </span>
          </div>
        </div>

        {/* Floating Toast Feedback for Direct Email Copy */}
        {copyToast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-black/80 border border-white/20 text-white font-mono text-xs tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {copyToast}
          </div>
        )}

        {/* ============================================================ */}
        {/* MOBILE & TABLET LAYOUT (lg:hidden) — 100% UNTOUCHED        */}
        {/* ============================================================ */}
        <div className="lg:hidden my-auto flex flex-col items-center justify-center max-w-4xl mx-auto space-y-4 sm:space-y-6 z-10">
          {/* Centered Massive Title — Monument Extended Futuristic Typography (+10% on Mobile) */}
          <Reveal delay={100}>
            <h2 className="monument text-[31px] sm:text-[40px] md:text-[53px] uppercase tracking-wider text-white leading-[1.2] max-w-4xl">
              LET’S CRAFT <span className="spectrum-text">BRILLIANCE</span> TOGETHER!
            </h2>
          </Reveal>

          {/* Interactive Grand 3D Gradient Orb CTA */}
          <Reveal delay={200} className="relative flex items-center justify-center mt-1 sm:mt-2 md:mt-3 z-20">
            <a
              href="mailto:hello@prizmstudio.in"
              className="group relative flex items-center justify-center w-80 h-80 sm:w-[384px] sm:h-[384px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden transition-transform duration-500 hover:scale-110 cursor-pointer"
            >
              {/* 3D Shader Gradient Orb */}
              <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                <GradientOrb config={{ background: "transparent", rotationSpeed: 0.5, noiseScale: 0.7 }} />
              </div>

              {/* Centered Clean Text Inside Orb */}
              <span className="relative z-10 font-extrabold uppercase tracking-widest text-white text-xs sm:text-sm drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                Let&apos;s work
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">↗</span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP / LAPTOP AWWWARDS LAYOUT (hidden lg:grid)           */}
        {/* ============================================================ */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full my-auto z-10 px-4 text-left">

          {/* Left Column: Kinetic Headline, Service Tag Selector, Direct Email Copy Card */}
          <div className="col-span-7 flex flex-col justify-center space-y-8">

            {/* Monument Headline */}
            <Reveal delay={100}>
              <h2 className="monument text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wider text-white leading-[1.1]">
                LET’S CRAFT <br />
                <span className="spectrum-text">BRILLIANCE</span> <br />
                TOGETHER!
              </h2>
            </Reveal>

            {/* Interactive Service Tag Selector */}
            <Reveal delay={150} className="space-y-3 pt-2">
              <div className="meta text-white/50 font-mono tracking-widest text-xs uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-spectrum" />
                SELECT YOUR INTERESTS
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border cursor-pointer ${isSelected
                          ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/10 scale-105"
                          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white bg-transparent"
                        }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {service}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Direct Email Copy Button (Pure clean outline) */}
            <Reveal delay={200} className="flex items-center gap-4 pt-2">
              <button
                onClick={() => handleCopy("hello@prizmstudio.in", "Email")}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/20 hover:border-white bg-transparent transition-all duration-300 text-xs font-mono tracking-wider text-white/80 hover:text-white cursor-pointer"
                title="Click to copy email address"
              >
                <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>hello@prizmstudio.in</span>
                <span className="text-[10px] text-white/40 group-hover:text-white/80 uppercase ml-1">COPY</span>
              </button>
            </Reveal>

          </div>

          {/* Right Column: Magnetic Mouse-Tracking 3D Orb CTA */}
          <div
            ref={orbContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="col-span-5 flex flex-col items-center justify-center relative p-8 cursor-pointer"
          >
            <div
              ref={orbWrapperRef}
              className="relative transition-transform duration-200 ease-out flex items-center justify-center"
            >
              {/* Grand 3D Gradient Orb Link */}
              <a
                href={mailtoUrl}
                className="group relative flex items-center justify-center w-[400px] h-[400px] xl:w-[440px] xl:h-[440px] rounded-full overflow-hidden transition-transform duration-500 hover:scale-105 cursor-pointer"
              >
                {/* 3D Shader Gradient Orb */}
                <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  <GradientOrb config={{ background: "transparent", rotationSpeed: 0.6, noiseScale: 0.8 }} />
                </div>

                {/* Dynamic Inner Text inside Orb */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-white/70">
                    {selectedServices.length > 0
                      ? `${selectedServices.length} SERVICE${selectedServices.length > 1 ? "S" : ""} SELECTED`
                      : "READY TO COLLABORATE"}
                  </span>
                  <span className="font-extrabold uppercase tracking-widest text-white text-base xl:text-lg drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex items-center gap-2 group-hover:spectrum-text transition-all duration-300">
                    LET&apos;S WORK
                    <span className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Meta Row — Strictly Anchored at the Absolute Bottom End */}
        <div className="absolute bottom-2 sm:bottom-6 inset-x-4 sm:inset-x-6 md:inset-x-12 z-30 flex flex-col md:grid md:grid-cols-3 items-center gap-2 sm:gap-4 text-xs text-white/50">
          {/* Social Icons — Top on mobile (order-1), Center on desktop (md:order-2) */}
          <div className="flex items-center justify-center gap-5 sm:gap-6 order-1 md:order-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/prizmstudio.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://www.instagram.com/prizmstudio.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/917975323635"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-emerald-400 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.82 0-3.52-.49-4.996-1.34l-.358-.207-3.714.974.991-3.619-.227-.362c-.93-1.481-1.421-3.21-1.421-4.98 0-5.187 4.221-9.407 9.407-9.407 2.512 0 4.873.979 6.65 2.756 1.777 1.777 2.756 4.138 2.756 6.651 0 5.188-4.222 9.408-9.408 9.408M12.051 0C5.396 0 0 5.397 0 12.051c0 2.126.555 4.202 1.61 6.03L0 24l6.096-1.599a11.966 11.966 0 005.955 1.584h.005c6.654 0 12.051-5.397 12.051-12.051C24.102 5.397 18.705 0 12.051 0" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.instagram.com/prizmstudio.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-blue-400 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Copyright — Middle on mobile (order-2), Right on desktop (md:order-3) */}
          <div className="text-center md:text-right order-2 md:order-3">
            <span className="meta">© 2026 PRIZM STUDIO</span>
          </div>

          {/* Disclaimer — Bottom on mobile (order-3), Left on desktop (md:order-1) */}
          <div className="text-center md:text-left order-3 md:order-1">
            <p className="meta text-white/50 tracking-wider uppercase font-mono text-[7.5px] sm:text-[10px] lg:text-xs leading-tight">
              PS: SOME PROJECTS FEATURED ARE CONCEPTUAL CREATIVE EXPLORATIONS.
            </p>
          </div>
        </div>

      </div>
    </RoomShell>
  );
}
