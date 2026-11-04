"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * RoomShell — one gallery room of the shrine.
 * Header rule with room index/label on the left, optional meta on the right,
 * and a scroll-triggered 1px spectrum light beam that sweeps across the top border.
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
  const headerRef = useRef<HTMLDivElement>(null);
  const [beamLit, setBeamLit] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBeamLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      className={twMerge(
        "relative min-h-screen border-t border-white/10",
        className
      )}
    >
      {/* Scroll-Triggered 1px Spectrum Light Beam Across Top Border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px overflow-hidden pointer-events-none z-20"
      >
        <div
          className={`h-full w-full origin-left transition-transform duration-1000 ease-out will-change-transform ${
            beamLit ? "scale-x-100 opacity-75" : "scale-x-0 opacity-0"
          }`}
          style={{ background: "var(--spectrum)" }}
        />
      </div>

      {hasHeader && (
        <div
          ref={headerRef}
          className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3.5 border-b border-white/5 select-none font-mono text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-white/40"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            {index && (
              <span className="spectrum-text font-bold tracking-[0.28em]">
                [{index}]
              </span>
            )}
            {label && (
              <span className="text-white/70 font-medium">
                {label}
              </span>
            )}
          </div>
          {right && (
            <div className="hidden sm:flex items-center gap-2 text-white/40 tracking-[0.2em] text-[9px] md:text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-spectrum shrink-0" />
              <span>{right}</span>
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

