"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [istTime, setIstTime] = useState("");
  const [copied, setCopied] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { index: "01", name: "Studio", href: "#studio" },
    { index: "02", name: "Web Experiences", href: "#work" },
    { index: "03", name: "Motion Design", href: "#motion" },
    { index: "04", name: "Ad Creatives", href: "#ads" },
    { index: "05", name: "UGC", href: "#ugc" },
    { index: "06", name: "Social Systems", href: "#social" },
    { index: "07", name: "Contact", href: "#contact" },
  ];

  const handleCopyEmail = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("hello@prizmstudio.in");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  useEffect(() => {
    let rafId = 0;
    let maxScroll = 1;

    const measure = () => {
      maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    const update = () => {
      rafId = 0;
      if (progressBarRef.current) {
        const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        progressBarRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const handleResize = () => {
      measure();
      handleScroll();
    };

    measure();
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime("GMT+5:30 IST");
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Global Viewport Top Spectrum Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[95] pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left will-change-transform"
          style={{
            background: "var(--spectrum)",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* Floating Pill Navbar — Visible from Hero across the entire experience */}
      <nav
        className={`fixed top-5 md:top-6 left-1/2 -translate-x-1/2 z-[90] transition-all duration-500 ${
          !menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-12 pointer-events-none"
        }`}
      >
        <div className="relative bg-black/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)] rounded-full px-6 py-2.5 flex items-center justify-between gap-8 min-w-[260px] sm:min-w-[340px] transition-all duration-300 hover:border-white/35">
          {/* Left: Mail icon button */}
          <a
            href="#contact"
            className="flex items-center justify-center p-1.5 text-white/75 hover:text-white transition-colors group"
            title="Get in touch"
            aria-label="Get in touch"
            data-cursor
            data-cursor-text="MAIL"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Center: Logo */}
          <a
            href="#"
            className="flex items-center"
            aria-label="PRIZM Studio Home"
            data-cursor
            data-cursor-text="TOP"
          >
            <Image
              src="/prizmlogo-transparent.png"
              alt="Prizm Studio"
              width={1039}
              height={223}
              priority
              className="h-5 w-auto"
            />
          </a>

          {/* Right: Menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center justify-center p-1.5 text-white/75 hover:text-white transition-colors group cursor-pointer"
            aria-label="Open menu"
            data-cursor
            data-cursor-text="MENU"
          >
            <Menu className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Full-screen Navigation Overlay */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[100] bg-[#070709]/96 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:p-16 transition-all duration-500 overflow-y-auto ${
          menuOpen
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-6">
          <Image
            src="/prizmlogo-transparent.png"
            alt="Prizm Studio"
            width={1039}
            height={223}
            className="h-6 w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main 2-Column Menu Stage: Navigation Left, Live Studio Info Column Right */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 my-auto py-8 items-center">
          {/* Left Column: 7 Indexed Room Links */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${idx * 40}ms` : "0ms",
                }}
                className={`group flex items-baseline gap-4 text-bone hover:spectrum-text transition-all duration-500 ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="font-mono text-xs text-white/40 group-hover:spectrum-text transition-colors w-6">
                  [{link.index}]
                </span>
                <span className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight group-hover:translate-x-3 transition-transform">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Right Column: Live Studio Telemetry & Direct Dispatch Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1.5px] spectrum-line" />

            {/* Live Mumbai Clock & Commission Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.24em] uppercase text-white/45">
                <span>STUDIO TELEMETRY</span>
                <span className="text-bone/90 tabular-nums font-semibold">
                  {istTime || "MUMBAI · IST"}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 font-mono text-[9.5px] uppercase tracking-[0.2em] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVAILABLE FOR NEW COMMISSIONS</span>
              </div>
            </div>

            {/* Studio Positioning Copy */}
            <div className="border-t border-white/10 pt-5">
              <div className="font-mono text-[9.5px] tracking-[0.24em] text-white/40 uppercase mb-2">
                PRACTICE &amp; CAPABILITIES
              </div>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-sans">
                High-converting Next.js web experiences, programmatic 3D &amp; UI motion, paid social ad creatives, and synthetic AI creator pipelines.
              </p>
            </div>

            {/* Direct Contact Dispatch Actions */}
            <div className="border-t border-white/10 pt-5 space-y-3">
              <div className="font-mono text-[9.5px] tracking-[0.24em] text-white/40 uppercase">
                DIRECT DISPATCH
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 text-xs font-mono tracking-wider text-bone transition-all cursor-pointer"
              >
                <span>hello@prizmstudio.in</span>
                <span className="text-[10px] spectrum-text font-bold uppercase">
                  {copied ? "COPIED ✓" : "COPY"}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://wa.me/917975323635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-black hover:bg-bone font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all"
                >
                  <span>WHATSAPP ↗</span>
                </a>
                <a
                  href="https://www.instagram.com/prizmstudio.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-all"
                >
                  <span>INSTAGRAM ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50 font-mono uppercase tracking-widest">
          <span>MUMBAI · INDIA · WORLDWIDE</span>
          <span>© 2026 PRIZM STUDIO</span>
        </div>
      </div>
    </>
  );
}
