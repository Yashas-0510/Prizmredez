import Image from "next/image";
import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

const projects = [
  { name: "OVAL BOX", tag: "TURF BOOKING" },
  { name: "ATELIER SERAPHINE", tag: "HAUTE COUTURE" },
  { name: "BARBELL CARTEL", tag: "FITNESS" },
  { name: "TATTOO SUTRA", tag: "STUDIO" },
  { name: "GM ARTISANS", tag: "CATERING" },
  { name: "PUSH UP", tag: "FITNESS" },
];

/**
 * Room 03 — Web Design. One sovereign build, a project index
 * on hairlines, and a staggered second band of studies.
 */
export default function WebDesignSection() {
  return (
    <RoomShell index="03" label="Web Design" id="work" right="NEXT.JS / MOTION / SHIPPED">
      <div className="relative px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        {/* band 1 — sovereign build + index */}
        <div className="grid grid-cols-12 gap-8 items-start">
          <Reveal className="col-span-12 md:col-span-7 relative">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <Image
                src="/posters/web-oval.png"
                alt="Oval Box — turf booking platform"
                width={1280}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <p className="meta mt-3">FIG. 03 — OVAL BOX, TURF BOOKING</p>
          </Reveal>

          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-10">
            <p className="meta mb-6">SELECTED BUILDS — 06</p>
            <ul>
              {projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 80}>
                  <li className="group border-b border-white/10 py-4 flex items-baseline justify-between gap-4 cursor-pointer">
                    <span className="font-heading font-bold uppercase text-sm md:text-base text-bone group-hover:translate-x-2 transition-transform duration-300">
                      {p.name}
                    </span>
                    <span className="meta">{p.tag}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="meta mt-6 opacity-70">FULL CASES ON REQUEST ↗</p>
          </div>
        </div>

        {/* band 2 — staggered studies */}
        <div className="grid grid-cols-12 gap-8 mt-[14vh] items-start">
          <Reveal className="col-span-6 md:col-span-4">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <Image src="/posters/web-02.jpg" alt="Tattoo Sutra — studio site" width={900} height={600} className="w-full h-auto" />
            </div>
            <p className="meta mt-3">FIG. 04 — TATTOO SUTRA</p>
          </Reveal>
          <Reveal delay={120} className="col-span-6 md:col-span-3 md:mt-[10vh]">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <Image src="/posters/web-gm.jpg" alt="GM Artisans — catering site" width={900} height={600} className="w-full h-auto" />
            </div>
            <p className="meta mt-3">FIG. 05 — GM ARTISANS</p>
          </Reveal>
          <Reveal delay={200} className="col-span-12 md:col-span-4 md:col-start-9 md:mt-[4vh]">
            <div className="border border-white/10 p-2 bg-ink-soft">
              <Image src="/posters/web-03.jpg" alt="Barbell Cartel — gym site" width={900} height={600} className="w-full h-auto" />
            </div>
            <p className="meta mt-3">FIG. 06 — BARBELL CARTEL</p>
          </Reveal>
        </div>
      </div>
    </RoomShell>
  );
}
