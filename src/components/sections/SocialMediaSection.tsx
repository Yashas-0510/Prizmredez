import Image from "next/image";
import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Room 06 — Social. An asymmetric feed wall: one sovereign post,
 * satellites at offsets. Monument SOCIAL bottom-right.
 */
export default function SocialMediaSection() {
  return (
    <RoomShell index="06" label="Social Media" id="social" right="FEEDS THAT STOP THUMBS">
      <div className="relative px-6 md:px-10 pt-32 pb-[36vh]">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* sovereign post */}
          <Reveal className="col-span-12 md:col-span-5">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <Image src="/social/kay-beauty.png" alt="Kay Beauty — feed system" width={900} height={1100} className="w-full h-auto" />
            </div>
            <p className="meta mt-3">FEED 01 — KAY BEAUTY</p>
          </Reveal>

          {/* satellites */}
          <div className="col-span-6 md:col-span-3 md:mt-[12vh]">
            <Reveal delay={120}>
              <div className="border border-white/10 p-2 bg-ink-soft">
                <Image src="/social/myntra.png" alt="Myntra — feed system" width={700} height={850} className="w-full h-auto" />
              </div>
              <p className="meta mt-3">FEED 02 — MYNTRA</p>
            </Reveal>
          </div>
          <div className="col-span-6 md:col-span-3 md:mt-[5vh]">
            <Reveal delay={200}>
              <div className="border border-white/10 p-2 bg-ink-soft">
                <Image src="/social/noise.png" alt="Noise — feed system" width={700} height={850} className="w-full h-auto" />
              </div>
              <p className="meta mt-3">FEED 03 — NOISE</p>
            </Reveal>
          </div>
        </div>

        {/* statement + fourth satellite */}
        <div className="grid grid-cols-12 gap-8 mt-[12vh] items-start">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="font-heading text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.15] font-bold uppercase text-bone max-w-[26rem]">
                Grids, reels and stories — one visual system, posted on
                rhythm.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="col-span-6 md:col-span-3 md:col-start-8">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <Image src="/social/bonkers-corner.png" alt="Bonkers Corner — feed system" width={700} height={850} className="w-full h-auto" />
            </div>
            <p className="meta mt-3">FEED 04 — BONKERS CORNER</p>
          </Reveal>
        </div>

        {/* monument */}
        <h2
          aria-label="Social"
          className="monument absolute -bottom-[0.12em] right-0 text-[clamp(6rem,17vw,18rem)] pointer-events-none"
        >
          SOCIAL
        </h2>
      </div>
    </RoomShell>
  );
}
