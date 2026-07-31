"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * GsapSpinWord — GSAP 3D letter spin animation.
 * Letters spin on 3D axes and flash in spectrum gradient ONLY while tumbling,
 * then return to clean white (text-bone) when static.
 */
export default function GsapSpinWord({
  word,
  className = "",
}: {
  word: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const letters = lettersRef.current.filter(Boolean);
    if (letters.length === 0) return;

    // Trigger animation when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playSpin();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    const playSpin = () => {
      const tl = gsap.timeline();

      tl.fromTo(
        letters,
        {
          rotateX: -180,
          rotateY: 120,
          scale: 0.6,
          opacity: 0,
        },
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "back.out(1.5)",
          stagger: {
            amount: 0.45,
            from: "start",
            onStart: function () {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const target = (this as any).targets?.()[0] as HTMLElement;
              if (target) {
                target.classList.add("spectrum-text");
                target.classList.remove("text-bone");
              }
            },
            onComplete: function () {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const target = (this as any).targets?.()[0] as HTMLElement;
              if (target) {
                target.classList.remove("spectrum-text");
                target.classList.add("text-bone");
              }
            },
          },
        }
      );
    };

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    const letters = lettersRef.current.filter(Boolean);
    gsap.fromTo(
      letters,
      {
        rotateY: 0,
        scale: 1,
      },
      {
        rotateY: 360,
        scale: 1.1,
        duration: 0.65,
        ease: "power2.inOut",
        stagger: {
          amount: 0.25,
          onStart: function () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const target = (this as any).targets?.()[0] as HTMLElement;
            if (target) {
              target.classList.add("spectrum-text");
              target.classList.remove("text-bone");
            }
          },
          onComplete: function () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const target = (this as any).targets?.()[0] as HTMLElement;
            if (target) {
              target.classList.remove("spectrum-text");
              target.classList.add("text-bone");
            }
          },
        },
        onComplete: () => {
          gsap.to(letters, { scale: 1, duration: 0.2 });
        },
      }
    );
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-flex select-none cursor-pointer ${className}`}
      style={{ perspective: "800px" }}
    >
      {word.split("").map((char, index) => (
        <span
          key={index}
          ref={(node) => {
            lettersRef.current[index] = node;
          }}
          className="inline-block will-change-transform text-bone transition-colors duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
