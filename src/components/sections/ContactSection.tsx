import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Room 07 — Redesigned Contact Section
 * Inspired by reference designs:
 * - Sub-tag: "Got An Idea?"
 * - Centered headline: "Let's craft brilliance together!"
 * - Red glowing pill CTA button: "Get A Free Audit ↗"
 * - Clean bottom footer row with hello@prizm.studio, socials, and copyright.
 */
export default function ContactSection() {
  return (
    <RoomShell index="07" label="Contact" id="contact" right="KYIV — WORLDWIDE">
      <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-between px-6 md:px-12 py-16 md:py-24 text-center">
        
        {/* Main Content Block (Centered) */}
        <div className="my-auto flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8 md:space-y-10">
          
          {/* Sub-heading / Tag */}
          <Reveal>
            <p className="meta text-xs sm:text-sm md:text-base text-white/60 tracking-[0.25em] uppercase font-mono">
              Got An Idea?
            </p>
          </Reveal>

          {/* Centered Massive Title */}
          <Reveal delay={100}>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.1] max-w-3xl">
              Let’s craft <span className="spectrum-text">brilliance</span> together!
            </h2>
          </Reveal>

          {/* Red / Spectrum Glowing Pill Button */}
          <Reveal delay={200}>
            <a
              href="mailto:hello@prizm.studio"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-400 border border-rose-500/60 bg-rose-500/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-[0_0_40px_rgba(244,63,94,0.6)]"
              data-cursor
              data-cursor-text="CONTACT"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get A Free Audit
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Footer Meta Row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 text-xs text-white/50 z-20">
          <a
            href="mailto:hello@prizm.studio"
            className="meta text-white/70 hover:text-white transition-colors"
          >
            hello@prizm.studio
          </a>

          <div className="flex items-center gap-6 sm:gap-8">
            <a href="#" className="meta hover:text-white transition-colors">INSTAGRAM ↗</a>
            <a href="#" className="meta hover:text-white transition-colors">TELEGRAM ↗</a>
            <a href="#" className="meta hover:text-white transition-colors">LINKEDIN ↗</a>
          </div>

          <span className="meta">© 2026 PRIZM STUDIO</span>
        </div>

      </div>
    </RoomShell>
  );
}
