import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Room 05 — AI UGC. Three creators mid-feed, staggered like a
 * scrolling timeline. Monument UGC bleeding behind them.
 */
export default function UgcSection() {
  return (
    <RoomShell index="05" label="AI UGC" id="ugc" right="NO SHOOTS. NO CREWS. NO RETAKES.">
      <div className="relative px-6 md:px-10 pt-32 pb-[36vh]">
        <Reveal className="max-w-[30rem]">
          <p className="font-heading text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.15] font-bold uppercase text-bone">
            Creators who never miss a deadline — because they&apos;re made of
            light.
          </p>
        </Reveal>

        <div className="grid grid-cols-12 gap-8 mt-[8vh] items-start">
          <Reveal className="col-span-6 md:col-span-3 md:col-start-2">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <video src="/UGC/ugcoura.mp4" autoPlay muted loop playsInline className="w-full h-[58vh] object-cover" />
            </div>
            <p className="meta mt-3">CREATOR 01 — OURA</p>
          </Reveal>
          <Reveal delay={120} className="col-span-6 md:col-span-3 md:mt-[9vh]">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <video src="/UGC/ugcpoppi.mp4" autoPlay muted loop playsInline className="w-full h-[58vh] object-cover" />
            </div>
            <p className="meta mt-3">CREATOR 02 — POPPI</p>
          </Reveal>
          <Reveal delay={220} className="col-span-6 md:col-span-3 md:mt-[4vh]">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <video src="/UGC/ugcwhole.mp4" autoPlay muted loop playsInline className="w-full h-[58vh] object-cover" />
            </div>
            <p className="meta mt-3">CREATOR 03 — WHOLE TRUTH</p>
          </Reveal>
        </div>

        {/* monument */}
        <h2
          aria-label="UGC"
          className="monument absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 text-[clamp(9rem,26vw,28rem)] pointer-events-none whitespace-nowrap"
        >
          UGC
        </h2>
      </div>
    </RoomShell>
  );
}
