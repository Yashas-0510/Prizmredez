import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

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
  index?: string;
  label?: string;
  id?: string;
  right?: string;
  children?: ReactNode;
  className?: string;
}) {
  const hasHeader = Boolean(index || label || right);

  return (
    <section
      id={id}
      className={twMerge(
        "relative min-h-screen border-t border-white/10",
        className
      )}
    >
      {hasHeader && (
        <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3.5 border-b border-white/5 select-none font-mono text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-white/40">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {index && (
              <span className="text-white/80 font-semibold tracking-[0.28em]">
                [{index}]
              </span>
            )}
            {label && (
              <span className="text-white/60">
                {label}
              </span>
            )}
          </div>
          {right && (
            <div className="hidden sm:flex items-center gap-2 text-white/35 tracking-[0.2em] text-[9px] md:text-[10px]">
              <span className="w-1 h-1 rounded-full bg-spectrum shrink-0" />
              <span>{right}</span>
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

