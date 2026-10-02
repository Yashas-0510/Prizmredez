"use client";

import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import GsapSpinWord from "@/components/ui/GsapSpinWord";
import { HyperText } from "@/components/ui/hyper-text";
import TriangularPrism from "@/components/ui/TriangularPrism";

const marquee = [
  "Web Experience",
  "Motion Design",
  "Brand Identity",
  "Social Systems",
];

/**
 * Room 02 — Studio / About.
 * Manifesto on the left, interactive 3D Triangular Glass Prism on the right.
 * Kinetic marquee closing the section.
 */
export default function AboutSection() {
  return (
    <RoomShell index="02" label="Studio" id="studio">
      <div className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-10 pt-16 md:pt-28 pb-12">
        {/* Centered section heading — HyperText scramble animation */}
        <Reveal className="text-center -mt-6 md:-mt-10 mb-10 md:mb-24 flex justify-center">
          <HyperText
            as="h2"
            startOnView
            animateOnHover
            interval={5000}
            duration={1400}
            className="font-heading font-extrabold uppercase text-[clamp(1.15rem,2.1vw,1.65rem)] tracking-[0.2em] text-dim"
          >
            THE  STUDIO
          </HyperText>
        </Reveal>

        {/* ---- Main content: Manifesto left, 3D Triangular Prism right ---- */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left: Practice Manifesto & Studio Pillars */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7 flex flex-col justify-between self-stretch">
            <Reveal className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold uppercase text-[clamp(1.25rem,5.2vw,3.6rem)] leading-[1.06] text-bone tracking-tight flex flex-wrap gap-x-[0.25em] gap-y-1 items-baseline max-w-full overflow-hidden">
                  <GsapSpinWord word="IMAGINATION" />
                  <span className="text-bone">DRIVEN.</span>
                  <br className="hidden sm:inline" />
                  <GsapSpinWord word="PRECISION" />
                  <span className="text-bone">CRAFTED.</span>
                </h3>
              </div>

              <div className="mt-6 md:mt-10 max-w-[34rem] border-t border-white/10 pt-6">
                <WordReveal
                  text="Refracting bold ideas into high-converting web experiences, cinematic motion, and social systems engineered for modern brands."
                  accent={["refracting"]}
                  className="font-heading text-[clamp(0.95rem,1.7vw,1.35rem)] leading-[1.4] font-medium uppercase text-dim"
                />
              </div>

              {/* Studio Pillars Micro-Grid */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-[36rem]">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
                    <span className="text-white/75 font-semibold">01</span>
                    <span className="text-white/20">/</span>
                    <span>BESPOKE</span>
                  </div>
                  <h4 className="font-heading text-[12px] sm:text-[13px] font-bold text-bone tracking-tight uppercase leading-snug mb-1">
                    Zero Templates
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Custom digital architecture engineered from ground zero.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
                    <span className="text-white/75 font-semibold">02</span>
                    <span className="text-white/20">/</span>
                    <span>SYNTHESIS</span>
                  </div>
                  <h4 className="font-heading text-[12px] sm:text-[13px] font-bold text-bone tracking-tight uppercase leading-snug mb-1">
                    Full Spectrum
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Web, 3D motion, and viral content acting as one engine.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
                    <span className="text-white/75 font-semibold">03</span>
                    <span className="text-white/20">/</span>
                    <span>OUTCOME</span>
                  </div>
                  <h4 className="font-heading text-[12px] sm:text-[13px] font-bold text-bone tracking-tight uppercase leading-snug mb-1">
                    High Impact
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                    Aesthetic mastery calibrated to drive measurable revenue.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Interactive 3D Triangular Glass Prism */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex items-center justify-center">
            <TriangularPrism />
          </div>
        </div>

        {/* Kinetic marquee */}
        <div className="pt-12 md:pt-16">
          <div className="-mx-6 md:-mx-10 border-t border-white/5 overflow-hidden py-5 md:py-7 select-none">
            <div
              className="marquee-track flex w-max shrink-0"
              style={{ willChange: "transform" }}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12"
                >
                  {[...marquee, ...marquee].map((item, idx) => (
                    <span key={`${item}-${idx}`} className="flex items-center gap-8 md:gap-12">
                      <span className="font-heading font-extrabold uppercase leading-none text-[clamp(2.2rem,5.5vw,5rem)] text-outline whitespace-nowrap">
                        {item}
                      </span>
                      <span className="spectrum-text text-[clamp(1rem,2vw,1.8rem)]">
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoomShell>
  );
}
