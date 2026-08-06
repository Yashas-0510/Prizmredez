"use client";

import { useEffect, useRef } from "react";

/**
 * WordReveal — scroll-scrubbed typographic reveal.
 * Words rise from a dim ghost state to fully lit as the block travels
 * through the viewport. Event-driven + IntersectionObserver for zero offscreen overhead.
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
    let isVisible = false;

    const updateSpans = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom > -100 && rect.top < vh + 100) {
        const p = Math.min(1, Math.max(0, (vh * 0.88 - rect.top) / (vh * 0.5)));
        const n = wordsRef.current.length;
        for (let i = 0; i < n; i++) {
          const span = wordsRef.current[i];
          if (!span) continue;
          const local = Math.min(1, Math.max(0, p * (n + 4) - i));
          span.style.opacity = String(0.12 + 0.88 * local);
          span.style.transform = `translateY(${(1 - local) * 0.3}em)`;
        }
      }
    };

    const handleScroll = () => {
      if (!isVisible) return;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          updateSpans();
          raf = 0;
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateSpans();
          window.addEventListener("scroll", handleScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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

