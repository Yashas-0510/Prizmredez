export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#070708] select-none">
      {/* Layer 0 — the monumental word. Bleeds off the bottom-left corner.
          Sits in the section's root stacking context so the image blends over it. */}
      <h1
        className="monument absolute -bottom-[0.14em] left-1/2 -translate-x-1/2 text-[clamp(8rem,17vw,18rem)] whitespace-nowrap"
        aria-label="PRIZM"
      >
        PRIZM
      </h1>

      {/* Layer 1 — the sovereign object. Screen blend: black vanishes into ink,
          the crystal burst burns THROUGH the letters. Core pushed right so the
          wordmark lives in the dark field. Mask crushes the object's own edges
          back to ink — the letters stay bone-bright beneath it. */}
      <img
        src="/art/sn-kf2.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none"
        style={{
          objectPosition: "62% 42%",
          maskImage:
            "radial-gradient(ellipse 78% 68% at 58% 40%, black 42%, rgba(0,0,0,0.55) 66%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 68% at 58% 40%, black 42%, rgba(0,0,0,0.55) 66%, transparent 92%)",
        }}
      />

      {/* Layer 3 — metadata constellation */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* top-left */}
        <div className="absolute top-24 left-6 md:left-10 flex flex-col gap-1.5">
          <span className="meta text-white/80">AI Creative Studio</span>
          <span className="meta">Est. 2024 — V_2.0</span>
        </div>

        {/* top-right — coordinates */}
        <div className="absolute top-24 right-6 md:right-10 text-right flex flex-col gap-1.5">
          <span className="meta">50.4501° N / 30.5234° E</span>
          <span className="meta">Kyiv — Worldwide</span>
        </div>

        {/* right edge — service index */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3">
          <span className="meta text-white/70">01 Web Design</span>
          <span className="meta">02 Ad Creatives</span>
          <span className="meta">03 AI UGC</span>
          <span className="meta">04 Social Media</span>
        </div>

        {/* left edge — scroll cue */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <span className="meta [writing-mode:vertical-lr] rotate-180">Scroll</span>
          <span className="w-px h-16 bg-white/15" />
        </div>

        {/* the one spectral statement — left column, dark water zone */}
        <div className="absolute left-6 md:left-10 bottom-[27%]">
          <p className="meta spectrum-text text-[11px] font-bold">
            Light in. Spectrum out.
          </p>
        </div>
      </div>

      {/* Layer 4 — the single CTA, right edge on the same baseline as the tagline */}
      <div className="absolute bottom-[27%] right-6 md:right-10 z-30">
        <a
          href="#contact"
          className="group flex flex-col gap-2"
          data-cursor
          data-cursor-text="START"
        >
          <span className="meta text-white group-hover:text-white/80 transition-colors">
            Start a project ↗
          </span>
          <span className="spectrum-line w-full origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500" />
        </a>
      </div>

      {/* bottom-left room label */}
      <div className="absolute bottom-10 left-6 md:left-10 z-30">
        <span className="meta">01 — Origin</span>
      </div>
    </section>
  );
}
