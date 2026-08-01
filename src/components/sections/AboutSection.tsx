"use client";

import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import GsapSpinWord from "@/components/ui/GsapSpinWord";
import { HyperText } from "@/components/ui/hyper-text";
import CofoundersZDepth from "@/components/ui/CofoundersZDepth";

const marquee = [
  "Web Experience",
  "Motion Design",
  "Brand Identity",
  "Social Systems",
];

const team = [
  {
    id: "rhea",
    name: "RHEA",
    role: "CO-FOUNDER",
    img: "/rheaprizm.png",
  },
  {
    id: "yash",
    name: "YASH",
    role: "CO-FOUNDER",
    img: "/yashprizm.png",
  },
];

/**
 * Room 02 — Studio / About.
 * Manifesto on the left, Rhea & Yash co-founders pop team cards on the right.
 * Kinetic marquee closing the section.
 */
export default function AboutSection() {
  return (
    <RoomShell index="02" label="Studio" id="studio">
      <div className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-20 md:pt-28 pb-12">
        {/* Centered section heading — HyperText scramble animation */}
        <Reveal className="text-center -mt-6 md:-mt-10 mb-20 md:mb-28 flex justify-center">
          <HyperText
            as="h2"
            startOnView
            animateOnHover
            interval={5000}
            duration={1400}
            className="font-heading font-extrabold uppercase text-[clamp(1.15rem,2.1vw,1.65rem)] tracking-[0.2em] text-dim"
          >
            WHO WE ARE
          </HyperText>
        </Reveal>

        {/* ---- Main content: Manifesto left, Team cards right ---- */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start my-auto">
          {/* Left: Practice Manifesto */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7 flex flex-col justify-between self-stretch">
            <Reveal className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold uppercase text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.06] text-bone tracking-tight flex flex-wrap gap-x-[0.25em] gap-y-1 items-baseline">
                  <GsapSpinWord word="IMAGINATION" />
                  <span className="text-bone">DRIVEN</span>
                  <br className="hidden sm:inline" />
                  <GsapSpinWord word="TECHNOLOGY" />
                  <span className="text-bone">BUILT</span>
                </h3>
              </div>
              <div className="mt-10 md:mt-14 max-w-[34rem] border-t border-white/10 pt-6">
                <WordReveal
                  text="Refracting bold ideas into high-converting web experiences, cinematic motion, and social systems engineered for modern brands."
                  accent={["refracting"]}
                  className="font-heading text-[clamp(1.05rem,1.8vw,1.45rem)] leading-[1.38] font-medium uppercase text-dim"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: Team cards (Rhea & Yash) with 3D Z-axis depth push-forward reveal */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5">
            <CofoundersZDepth />
          </div>
        </div>

        {/* Kinetic marquee */}
        <div className="pt-12 md:pt-16">
          <div className="-mx-6 md:-mx-10 border-t border-white/5 overflow-hidden py-5 md:py-7 select-none">
            <div className="marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12"
                >
                  {marquee.map((item) => (
                    <span key={item} className="flex items-center gap-8 md:gap-12">
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
