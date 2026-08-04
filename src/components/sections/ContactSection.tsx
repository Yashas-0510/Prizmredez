import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/ui/gradient-orb";

/**
 * Room 07 — Contact Section
 * Features:
 * - Centered headline: "LET'S CRAFT BRILLIANCE TOGETHER!"
 * - Grand 420px 3D Shader Gradient Orb CTA ("Let's work ↗")
 * - Footer: hello@prizmstudio.in, Social SVG Logos (Instagram, X, WhatsApp, Facebook), Copyright anchored at absolute bottom.
 */
export default function ContactSection() {
  return (
    <RoomShell index="07" label="Contact" id="contact" right="KYIV — WORLDWIDE">
      <div className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-start px-6 md:px-12 pt-10 pb-24 text-center overflow-hidden">
        
        {/* Main Content Block (Centered Top Area) */}
        <div className="my-auto flex flex-col items-center justify-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Centered Massive Title — Monument Extended Futuristic Typography */}
          <Reveal delay={100}>
            <h2 className="monument text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wider text-white leading-[1.2] max-w-4xl">
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
                Let's work
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">↗</span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Footer Meta Row — Strictly Anchored at the Absolute Bottom End */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-6 md:inset-x-12 z-30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <a
            href="mailto:hello@prizmstudio.in"
            className="meta text-white/70 hover:text-white transition-colors tracking-widest uppercase font-mono"
          >
            hello@prizmstudio.in
          </a>

          {/* Social Media SVG Icon Logos (Instagram, X, WhatsApp, Facebook) */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-emerald-400 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.82 0-3.52-.49-4.996-1.34l-.358-.207-3.714.974.991-3.619-.227-.362c-.93-1.481-1.421-3.21-1.421-4.98 0-5.187 4.221-9.407 9.407-9.407 2.512 0 4.873.979 6.65 2.756 1.777 1.777 2.756 4.138 2.756 6.651 0 5.188-4.222 9.408-9.408 9.408M12.051 0C5.396 0 0 5.397 0 12.051c0 2.126.555 4.202 1.61 6.03L0 24l6.096-1.599a11.966 11.966 0 005.955 1.584h.005c6.654 0 12.051-5.397 12.051-12.051C24.102 5.397 18.705 0 12.051 0"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white/60 hover:text-blue-400 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          <span className="meta">© 2026 PRIZM STUDIO</span>
        </div>

      </div>
    </RoomShell>
  );
}
