import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import { HyperText } from "@/components/ui/hyper-text";
import UgcReelsPhone from "@/components/ui/UgcReelsPhone";

/**
 * Room 05 — CREATOR ENGINE / AI UGC Section.
 */
export default function UgcSection() {
  return (
    <RoomShell index="05" label="Creator Engine" id="ugc" right="NO SHOOTS. NO CREWS. NO RETAKES.">
      <div className="relative px-6 md:px-10 pt-16 md:pt-24 pb-12">
        {/* Centered top section heading — HyperText scramble animation */}
        <Reveal className="text-center -mt-6 md:-mt-10 mb-8 md:mb-12 flex justify-center">
          <HyperText
            as="h2"
            startOnView
            animateOnHover
            interval={5000}
            duration={1400}
            className="font-heading font-extrabold uppercase text-[clamp(1.15rem,2.1vw,1.65rem)] tracking-[0.2em] text-dim"
          >
            CREATOR  ENGINE
          </HyperText>
        </Reveal>

        <UgcReelsPhone />
      </div>
    </RoomShell>
  );
}
