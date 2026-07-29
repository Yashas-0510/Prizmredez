import Image from "next/image";
import RoomShell from "./RoomShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Room 02 — Studio. The typographic rest between image rooms:
 * manifesto left, facts constellation right, one small artifact,
 * monumental STUDIO sunk into the bottom fold.
 */
export default function AboutSection() {
  return (
    <RoomShell index="02" label="Studio" id="studio" right="AI-NATIVE SINCE DAY ONE">
      {/* manifesto */}
      <div className="absolute left-6 md:left-10 top-[22%] max-w-[46rem] z-20">
        <Reveal>
          <p className="meta mb-8">THE PRACTICE</p>
          <p className="font-heading text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.15] font-bold uppercase text-bone">
            A brief enters white. It leaves as{" "}
            <span className="spectrum-text">spectrum</span> — sites, ads,
            creators and feeds, made by a small team directing large models.
          </p>
        </Reveal>
      </div>

      {/* facts constellation — right edge */}
      <div className="absolute right-6 md:right-10 top-[24%] flex flex-col gap-5 items-end z-20">
        <Reveal delay={100} className="flex flex-col items-end gap-5">
          <div className="text-right">
            <p className="meta">FOUNDED</p>
            <p className="meta text-white/80 mt-1">2024</p>
          </div>
          <div className="text-right">
            <p className="meta">BASE</p>
            <p className="meta text-white/80 mt-1">50.4501° N / 30.5234° E</p>
          </div>
          <div className="text-right">
            <p className="meta">DISCIPLINES</p>
            <p className="meta text-white/80 mt-1">04 — WEB / ADS / UGC / SOCIAL</p>
          </div>
          <div className="text-right">
            <p className="meta">OUTPUT</p>
            <p className="meta text-white/80 mt-1">TEXT · IMAGE · FILM</p>
          </div>
        </Reveal>
      </div>

      {/* the artifact — small, framed, captioned */}
      <Reveal
        delay={200}
        className="absolute left-[12%] bottom-[19%] w-[16rem] md:w-[20rem] z-10"
      >
        <div className="border border-white/10 p-2 bg-ink-soft">
          <Image
            src="/art/in-kf0.png"
            alt="Raw light — study"
            width={640}
            height={360}
            className="w-full h-auto"
          />
        </div>
        <p className="meta mt-3">FIG. 02 — RAW LIGHT</p>
      </Reveal>

      {/* monument sunk into the fold */}
      <h2
        aria-label="Studio"
        className="monument absolute -bottom-[0.12em] right-0 text-[clamp(6rem,15vw,16rem)] z-10"
      >
        STUDIO
      </h2>
    </RoomShell>
  );
}
