"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

interface TubesApp {
  dispose?: () => void;
  tubes?: {
    setColors?: (colors: string[]) => void;
    setLightsColors?: (colors: string[]) => void;
  };
}

type TubesModule = {
  default: (canvas: HTMLCanvasElement, options: object) => TubesApp;
};

function useIsDesktop() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      const isMin768 = window.innerWidth >= 768;
      const isPointerFine =
        window.matchMedia("(pointer: fine)").matches ||
        window.matchMedia("(any-pointer: fine)").matches ||
        !("ontouchstart" in window);
      return isMin768 && isPointerFine;
    },
    () => false
  );
}

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<TubesApp | null>(null);
  const isDesktop = useIsDesktop();

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
  };

  // Initialize Three.js Tubes animation ONLY if isDesktop is true
  useEffect(() => {
    if (!isDesktop) return;
    let isMounted = true;

    const initTimer = setTimeout(() => {
      if (!canvasRef.current || !isMounted) return;

      try {
        const loadTubesModule = new Function(
          `return import("/scripts/tubes1.min.js")`
        );

        loadTubesModule()
          .then((module: TubesModule) => {
            if (!isMounted || !canvasRef.current) return;
            const TubesCursorImpl = module.default;

            if (!appRef.current && typeof TubesCursorImpl === "function") {
              const app = TubesCursorImpl(canvasRef.current, {
                tubes: {
                  colors: ["#5e72e4", "#8965e0", "#f5365c"],
                  lights: {
                    intensity: 200,
                    colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
                  },
                },
              });
              appRef.current = app;
            }
          })
          .catch((err: unknown) => {
            console.error("Failed to load TubesCursor module:", err);
          });
      } catch (err: unknown) {
        console.error("Failed to load TubesCursor dynamic import:", err);
      }
    }, 150);

    const handleGlobalClick = () => {
      if (appRef.current && appRef.current.tubes) {
        const newTubeColors = randomColors(3);
        const newLightColors = randomColors(4);

        if (typeof appRef.current.tubes.setColors === "function") {
          appRef.current.tubes.setColors(newTubeColors);
        }
        if (typeof appRef.current.tubes.setLightsColors === "function") {
          appRef.current.tubes.setLightsColors(newLightColors);
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);

    return () => {
      isMounted = false;
      clearTimeout(initTimer);
      window.removeEventListener("click", handleGlobalClick);
      if (appRef.current) {
        if (typeof appRef.current.dispose === "function") {
          try {
            appRef.current.dispose();
          } catch {}
        }
        appRef.current = null;
      }
    };
  }, [isDesktop]);

  // Completely unmount canvas from DOM on mobile
  if (!isDesktop) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-80 transform-gpu will-change-transform"
      />
    </div>
  );
}
