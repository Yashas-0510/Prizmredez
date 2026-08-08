"use client";

import React, { useEffect, useRef, useState } from "react";

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

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<TubesApp | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
  };

  // Measure device capability & screen width
  useEffect(() => {
    const checkIsDesktop = () => {
      const isMin768 = window.innerWidth >= 768;
      const isPointerFine = window.matchMedia("(pointer: fine)").matches;
      return isMin768 && isPointerFine;
    };

    const handleCheck = () => {
      const desktop = checkIsDesktop();
      setIsDesktop(desktop);
      if (!desktop && appRef.current) {
        if (typeof appRef.current.dispose === "function") {
          try {
            appRef.current.dispose();
          } catch {}
        }
        appRef.current = null;
      }
    };

    handleCheck();
    window.addEventListener("resize", handleCheck);
    return () => window.removeEventListener("resize", handleCheck);
  }, []);

  // Initialize Three.js Tubes animation ONLY if isDesktop is true
  useEffect(() => {
    if (!isDesktop) return;
    let isMounted = true;

    const initTimer = setTimeout(() => {
      if (!canvasRef.current || !isMounted) return;

      const loadTubesModule = new Function(
        `return import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js")`
      );

      loadTubesModule()
        .then((module: TubesModule) => {
          if (!isMounted || !canvasRef.current) return;
          const TubesCursorImpl = module.default;

          if (!appRef.current) {
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
        .catch((err: unknown) => console.error("Failed to load TubesCursor module:", err));
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
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-80"
      />
    </div>
  );
}
