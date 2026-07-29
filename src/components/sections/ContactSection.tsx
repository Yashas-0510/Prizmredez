import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Room 07 — Contact. One invitation, one spectrum line, and the
 * wordmark bookend sunk into the bottom of the page.
 */
export default function ContactSection() {
  return (
    <RoomShell index="07" label="Contact" id="contact" right="KYIV — WORLDWIDE">
      <div className="relative px-6 md:px-10 pt-36 pb-[30vh]">
        <Reveal>
          <p className="meta mb-10">GOT A BRIEF?</p>
          <a
            href="mailto:hello@prizm.studio"
            className="group inline-flex flex-col gap-4"
            data-cursor
            data-cursor-text="GO"
          >
            <span className="font-heading font-extrabold uppercase text-[clamp(2.2rem,6vw,5.5rem)] leading-none text-bone group-hover:translate-x-3 transition-transform duration-500">
              Start a project ↗
            </span>
            <span className="spectrum-line w-full origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500" />
          </a>
        </Reveal>

        <Reveal delay={150} className="mt-14 flex flex-col gap-2">
          <a href="mailto:hello@prizm.studio" className="meta text-white/80 hover:text-white transition-colors w-fit">
            HELLO@PRIZM.STUDIO
          </a>
          <span className="meta">REPLIES WITHIN 24H</span>
        </Reveal>

        {/* footer meta row — interwoven with the wordmark via blend */}
        <div className="absolute bottom-10 inset-x-6 md:inset-x-10 flex flex-wrap items-baseline justify-between gap-4 z-30 mix-blend-difference">
          <span className="meta">© 2026 PRIZM STUDIO</span>
          <div className="flex gap-8">
            <a href="#" className="meta hover:text-white transition-colors">INSTAGRAM ↗</a>
            <a href="#" className="meta hover:text-white transition-colors">TELEGRAM ↗</a>
            <a href="#" className="meta hover:text-white transition-colors">LINKEDIN ↗</a>
          </div>
          <span className="meta">50.4501° N / 30.5234° E — V_2.0</span>
        </div>

        {/* wordmark bookend */}
        <h2
          aria-label="Prizm"
          className="monument absolute -bottom-[0.14em] left-1/2 -translate-x-1/2 text-[clamp(8rem,17vw,18rem)] pointer-events-none whitespace-nowrap"
        >
          PRIZM
        </h2>
      </div>
    </RoomShell>
  );
}
