import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";
import UgcReelsPhone from "@/components/ui/UgcReelsPhone";

/**
 * Room 05 — CREATOR ENGINE / AI UGC Section.
 */
export default function UgcSection() {
  return (
    <RoomShell index="05" label="Creator Engine" id="ugc" right="NO SHOOTS. NO CREWS. NO RETAKES.">
      <div className="relative px-6 md:px-10 pt-16 md:pt-24 pb-12">
        {/* Centered top section heading — First word solid, second hollow */}
        <Reveal className="text-center -mt-6 md:-mt-10 mb-8 md:mb-12 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 mb-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse shrink-0" />
            <span>SYNTHETIC MEDIA · AI UGC / AVATARS / 48H SPRINTS</span>
          </div>
          <h2 className="font-heading font-extrabold uppercase text-[clamp(1.75rem,4.5vw,3.6rem)] leading-[1.04] text-bone tracking-tight">
            CREATOR <span className="text-outline">ENGINE.</span>
          </h2>
        </Reveal>

        <UgcReelsPhone />
      </div>
    </RoomShell>
  );
}
