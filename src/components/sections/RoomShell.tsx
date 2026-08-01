import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * RoomShell — one gallery room of the shrine.
 * Header rule with room index/label on the left, optional meta on the right.
 * Children compose the room: one sovereign object, one monumental word,
 * one metadata constellation, at most one spectral accent.
 */
export default function RoomShell({
  id,
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
  return (
    <section
      id={id}
      className={twMerge(
        "relative min-h-screen border-t border-white/5",
        className
      )}
    >
      {children}
    </section>
  );
}
