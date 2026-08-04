"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { index: "01", name: "Studio", href: "#studio" },
    { index: "02", name: "Web Experiences", href: "#work" },
    { index: "03", name: "Ad Creatives", href: "#ads" },
    { index: "04", name: "UGC", href: "#ugc" },
    { index: "05", name: "Social Systems", href: "#social" },
    { index: "06", name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const studioEl = document.getElementById("studio");
      if (studioEl) {
        const rect = studioEl.getBoundingClientRect();
        // Show pill navbar ONLY when user has scrolled past hero sequence and entered Studio/About section
        if (rect.top <= window.innerHeight * 0.6) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      } else {
        if (window.scrollY > window.innerHeight * 3.8) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* State 1: Top / Hero Navbar — Logo in middle ONLY */}
      <header
        className={`fixed top-0 left-0 right-0 z-[90] pointer-events-none transition-all duration-500 ${
          scrolled ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-center justify-center px-6 pt-6 md:pt-8">
          <a
            href="#"
            className="pointer-events-auto flex items-center"
            data-cursor
            data-cursor-text="TOP"
          >
            <Image
              src="/prizmlogo-transparent.png"
              alt="Prizm Studio"
              width={1039}
              height={223}
              priority
              className="h-7 md:h-9 w-auto drop-shadow-lg"
            />
          </a>
        </div>
      </header>

      {/* State 2: Scrolled Floating Pill Navbar — Prizm fit */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
          scrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <div className="relative bg-black/45 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.3)] rounded-full px-6 py-2.5 flex items-center justify-between gap-8 min-w-[260px] sm:min-w-[340px] transition-all duration-300">
          {/* Left: Mail icon button */}
          <a
            href="#contact"
            className="flex items-center justify-center p-1.5 text-white/70 hover:text-white transition-colors group"
            title="Get in touch"
            data-cursor
            data-cursor-text="MAIL"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Center: Logo */}
          <a href="#" className="flex items-center" data-cursor data-cursor-text="TOP">
            <Image
              src="/prizmlogo-transparent.png"
              alt="Prizm Studio"
              width={1039}
              height={223}
              className="h-5 w-auto"
            />
          </a>

          {/* Right: Menu trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center p-1.5 text-white/70 hover:text-white transition-colors group"
            aria-label="Toggle menu"
            data-cursor
          >
            {menuOpen ? (
              <X className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            ) : (
              <Menu className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen Navigation Overlay */}
      <div
        className={`fixed inset-0 z-[95] bg-[#070709]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Image
            src="/prizmlogo-transparent.png"
            alt="Prizm Studio"
            width={1039}
            height={223}
            className="h-6 w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:gap-5 my-auto max-w-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-4 text-bone hover:spectrum-text transition-all duration-300"
            >
              <span className="meta text-xs opacity-50">{link.index}</span>
              <span className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight group-hover:translate-x-3 transition-transform">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <span>hello@prizm.studio</span>
          <span>© 2026 PRIZM STUDIO</span>
        </div>
      </div>
    </>
  );
}
