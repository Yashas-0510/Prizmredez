"use client";

import { useState, useRef, useEffect } from "react";
import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const GradientOrb = dynamic(
  () => import("@/components/ui/gradient-orb").then((mod) => mod.GradientOrb),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-full bg-radial from-violet-500/20 via-fuchsia-500/10 to-transparent animate-pulse" />
    ),
  }
);

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

  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoadOrb, setShouldLoadOrb] = useState(false);
  const contactRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!contactRootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadOrb(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px 0px" }
    );
    observer.observe(contactRootRef.current);
    return () => observer.disconnect();
  }, []);

  // Copy feedback notification toast state
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [projectNotes, setProjectNotes] = useState("");

  useEffect(() => {
    if (!briefModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBriefModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [briefModalOpen]);

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

  const servicesListStr =
    selectedServices.length > 0 ? selectedServices.join(", ") : "General Inquiry";

  const mailtoSubject = encodeURIComponent(
    `Project Inquiry${selectedServices.length > 0 ? `: ${selectedServices.join(", ")}` : ""}`
  );
  const mailtoBody = encodeURIComponent(
    `Hi PRIZM Studio,\n\n${
      clientName ? `Name / Brand: ${clientName}\n` : ""
    }Services of Interest: ${servicesListStr}\n${
      projectNotes ? `\nProject Details:\n${projectNotes}\n` : ""
    }\nLet's connect!`
  );
  const mailtoUrl = `mailto:hello@prizmstudio.in?subject=${mailtoSubject}&body=${mailtoBody}`;

  const whatsappMessage = encodeURIComponent(
    `Hi PRIZM Studio!${
      clientName ? ` I'm ${clientName}.` : ""
    } I'd love to discuss a project.\n\n• Services: ${servicesListStr}${
      projectNotes ? `\n• Details: ${projectNotes}` : ""
    }`
  );
  const whatsappUrl = `https://wa.me/917975323635?text=${whatsappMessage}`;

  return (
    <RoomShell index="07" label="Contact" id="contact" right="INDIA · MUMBAI · WORLDWIDE">
      <div ref={contactRootRef} className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-between px-6 md:px-12 pt-10 pb-24 text-center overflow-hidden">

        {/* Kinetic Ambient Marquee Banner (Background) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.035] select-none z-0">
          <div className="flex w-max marquee-track shrink-0">
            <span className="monument text-[13vw] uppercase tracking-tighter whitespace-nowrap px-8 text-bone shrink-0">
              PRIZM STUDIO — CRAFTING BRILLIANCE — START A PROJECT —
            </span>
            <span className="monument text-[13vw] uppercase tracking-tighter whitespace-nowrap px-8 text-bone shrink-0">
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
            <button
              type="button"
              onClick={() => setBriefModalOpen(true)}
              className="group relative flex items-center justify-center w-80 h-80 sm:w-[384px] sm:h-[384px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden transition-transform duration-500 hover:scale-110 cursor-pointer"
            >
              {/* 3D Shader Gradient Orb */}
              <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                {!isDesktop && shouldLoadOrb && (
                  <GradientOrb config={{ background: "transparent", rotationSpeed: 0.5, noiseScale: 0.7 }} />
                )}
              </div>

              {/* Centered Clean Text Inside Orb */}
              <span className="relative z-10 font-extrabold uppercase tracking-widest text-white text-xs sm:text-sm drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                Let&apos;s work
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">↗</span>
              </span>
            </button>
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

            {/* Direct Email Copy Button + 1-Click WhatsApp Dispatch */}
            <Reveal delay={200} className="flex flex-wrap items-center gap-3.5 pt-2">
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

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-white/20 hover:border-emerald-400/60 bg-white/[0.03] hover:bg-emerald-500/10 transition-all duration-300 text-xs font-mono tracking-wider text-white/85 hover:text-white cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WHATSAPP DIRECT ↗</span>
              </a>
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
              {/* Grand 3D Gradient Orb Trigger */}
              <button
                type="button"
                onClick={() => setBriefModalOpen(true)}
                data-cursor
                data-cursor-text="START BRIEF"
                className="group relative flex items-center justify-center w-[400px] h-[400px] xl:w-[440px] xl:h-[440px] rounded-full overflow-hidden transition-transform duration-500 hover:scale-105 cursor-pointer"
              >
                {/* 3D Shader Gradient Orb */}
                <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  {isDesktop && shouldLoadOrb && (
                    <GradientOrb config={{ background: "transparent", rotationSpeed: 0.6, noiseScale: 0.8 }} />
                  )}
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
              </button>
            </div>
          </div>

        </div>

        {/* Footer Meta Row — Strictly Anchored at the Absolute Bottom End */}
        <div className="absolute bottom-1.5 sm:bottom-6 inset-x-4 sm:inset-x-6 md:inset-x-12 z-30 flex flex-col md:grid md:grid-cols-3 items-center gap-1.5 sm:gap-4 text-xs text-white/50">
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

            {/* X / Twitter (Redirects to Instagram) */}
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
          </div>

          {/* Copyright — Middle on mobile (order-2), Right on desktop (md:order-3) */}
          <div className="text-center md:text-right order-2 md:order-3 mt-1.5 sm:mt-0">
            <span className="meta">© 2026 PRIZM STUDIO</span>
          </div>

          {/* Disclaimer — Bottom on mobile (order-3), Left on desktop (md:order-1) */}
          <div className="text-center md:text-left order-3 md:order-1 mt-2 sm:mt-0">
            <p className="font-mono text-white/50 tracking-normal sm:tracking-wider uppercase text-[8px] sm:text-[10px] lg:text-xs leading-relaxed sm:leading-tight whitespace-normal sm:whitespace-nowrap max-w-[92vw] sm:max-w-none mx-auto">
              PS: SOME PROJECTS FEATURED ARE CONCEPTUAL CREATIVE EXPLORATIONS.
            </p>
          </div>
        </div>

        {/* Interactive Quick Project Brief Modal */}
        <AnimatePresence>
          {briefModalOpen && (
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setBriefModalOpen(false)}
              className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl rounded-2xl bg-[#0b0b0e] border border-white/15 p-6 sm:p-8 text-left shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] spectrum-line" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-white/45 flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse" />
                      <span>INITIATE PROJECT BRIEF</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-bone">
                      START A CONVERSATION
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBriefModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Pills inside Modal */}
                <div className="mb-5">
                  <label className="block font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/45 mb-2">
                    SELECT SERVICES
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer border ${
                            isSelected
                              ? "border-white text-black bg-white font-bold"
                              : "border-white/15 text-white/60 hover:border-white/35 hover:text-white bg-white/[0.02]"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name / Brand Input */}
                <div className="mb-4">
                  <label className="block font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/45 mb-1.5">
                    YOUR NAME OR BRAND
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Aryan — Founder at Nova"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/45 text-sm text-white placeholder:text-white/30 outline-none transition-colors font-sans"
                  />
                </div>

                {/* Project Notes Input */}
                <div className="mb-6">
                  <label className="block font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/45 mb-1.5">
                    PROJECT GOALS / TIMELINE (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Tell us what you're building or launching..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/45 text-sm text-white placeholder:text-white/30 outline-none transition-colors font-sans resize-none"
                  />
                </div>

                {/* Instant Dispatch Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black hover:bg-bone font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all cursor-pointer shadow-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>SEND ON WHATSAPP ↗</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/20 text-white font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer"
                  >
                    <span>SEND VIA EMAIL ↗</span>
                  </a>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/45">
                  <span>hello@prizmstudio.in</span>
                  <button
                    type="button"
                    onClick={() => handleCopy("hello@prizmstudio.in", "Email")}
                    className="text-bone/80 hover:text-white underline underline-offset-4 uppercase tracking-wider cursor-pointer"
                  >
                    COPY EMAIL ADDRESS
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </RoomShell>
  );
}
