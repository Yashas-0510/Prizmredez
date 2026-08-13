import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden">
      {/* Background Kinetic Text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none z-0">
        <span className="monument text-[25vw] uppercase tracking-tighter text-bone">
          404
        </span>
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        <p className="meta text-white/50 text-[11px] md:text-xs tracking-[0.3em] uppercase mb-4">
          ( ERROR 404 — PAGE NOT FOUND )
        </p>

        <h1 className="monument text-4xl md:text-6xl uppercase tracking-tight text-bone mb-6">
          SPECTRUM <span className="spectrum-text">LOST</span> IN VOID
        </h1>

        <p className="text-bone/70 text-sm md:text-base max-w-md mb-8 leading-relaxed">
          The room or light frequency you are attempting to observe does not exist or has been relocated.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-bone text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105"
        >
          <span>← RETURN TO PRIZM STUDIO</span>
        </Link>
      </div>
    </main>
  );
}
