import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Room 04 — Ad Creatives. Two running films, performance specs,
 * client constellation. Monument ADS under the fold.
 */
export default function AdCreativesSection() {
  return (
    <RoomShell index="04" label="Ad Creatives" id="ads" right="PERFORMANCE / PAID SOCIAL">
      <div className="relative px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* left — statement + specs + clients */}
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="font-heading text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.15] font-bold uppercase text-bone max-w-[26rem]">
                Ads that earn the first second — then convert the next
                fourteen.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-12 flex flex-col gap-5">
              <div>
                <p className="meta">FORMATS</p>
                <p className="meta text-white/80 mt-1">9:16 / 1:1 — 6S · 15S · 30S</p>
              </div>
              <div>
                <p className="meta">PIPELINE</p>
                <p className="meta text-white/80 mt-1">CONCEPT → KEYFRAME → FILM</p>
              </div>
              <div>
                <p className="meta">CLIENTS</p>
                <p className="meta text-white/80 mt-1">BOAT · POPPI · BELLA · SLEEPY OWL</p>
              </div>
            </Reveal>
          </div>

          {/* right — two films */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 gap-8">
            <Reveal>
              <div className="border border-white/10 p-2 bg-ink-soft">
                <video
                  src="/ad-creatives/bellaad.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[62vh] object-cover"
                />
              </div>
              <p className="meta mt-3">REEL 01 — BELLA, 15S</p>
            </Reveal>
            <Reveal delay={150} className="mt-[8vh]">
              <div className="border border-white/10 p-2 bg-ink-soft">
                <video
                  src="/ad-creatives/boattad.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[62vh] object-cover"
                />
              </div>
              <p className="meta mt-3">REEL 02 — BOAT, 15S</p>
            </Reveal>
          </div>
        </div>
      </div>
    </RoomShell>
  );
}
