import type { ReactNode } from "react";

/**
 * RoomShell — one gallery room of the shrine.
 * Header rule with room index/label on the left, optional meta on the right.
 * Children compose the room: one sovereign object, one monumental word,
 * one metadata constellation, at most one spectral accent.
 */
export default function RoomShell({
  index,
  label,
  id,
  right,
  children,
  className = "",
}: {
  index: string;
  label: string;
  id?: string;
  right?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative min-h-screen overflow-hidden border-t border-white/5 ${className}`}
    >
      {/* header row */}
      <div className="absolute top-0 inset-x-6 md:inset-x-10 flex items-baseline justify-between pt-6 z-30">
        <span className="meta text-white/70">
          {index} — {label}
        </span>
        {right ? <span className="meta hidden md:block">{right}</span> : null}
      </div>
      <div className="rule absolute top-[4.25rem] inset-x-6 md:inset-x-10 h-px z-30" />

      {children}
    </section>
  );
}
