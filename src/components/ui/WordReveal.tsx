"use client";

import { useEffect, useRef } from "react";

/**
 * WordReveal — scroll-scrubbed typographic reveal.
 * Words rise from a dim ghost state to fully lit as the block travels
 * through the viewport (noth.in manifesto style). rAF-driven, direct
 * DOM mutation — plays nicely with Lenis, zero re-renders.
 */
export default function WordReveal({
  text,
  accent = [],
  className = "",
}: {
  text: string;
  /** lowercase words to render in the spectrum gradient once lit */
  accent?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(" ");
  const accents = new Set(accent.map((a) => a.toLowerCase()));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const loop = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // only compute while near the viewport
      if (rect.bottom > -100 && rect.top < vh + 100) {
        // sweep runs while the block travels from 88% to 38% viewport height
        const p = Math.min(1, Math.max(0, (vh * 0.88 - rect.top) / (vh * 0.5)));
        const n = wordsRef.current.length;
        for (let i = 0; i < n; i++) {
          const span = wordsRef.current[i];
          if (!span) continue;
          // +4 tail so the final words still reach full light
          const local = Math.min(1, Math.max(0, p * (n + 4) - i));
          span.style.opacity = String(0.12 + 0.88 * local);
          span.style.transform = `translateY(${(1 - local) * 0.3}em)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const stripped = w.toLowerCase().replace(/[^a-z-]/g, "");
        return (
          <span
            key={i}
            ref={(node) => {
              wordsRef.current[i] = node;
            }}
            aria-hidden
            className={`inline-block will-change-transform ${
              accents.has(stripped) ? "spectrum-text" : ""
            }`}
            style={{ opacity: 0.12 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
