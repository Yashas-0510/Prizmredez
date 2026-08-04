"use client";

import React, { useEffect, useRef } from "react";

interface TubesCursorProps {
  className?: string;
}

export default function TubesCursor({ className }: TubesCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
  };

  useEffect(() => {
    let isMounted = true;

    const initTimer = setTimeout(() => {
      // Dynamic import function bypassing TS static module check
      const loadTubesModule = new Function(
        `return import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js")`
      );

      loadTubesModule()
        .then((module: any) => {
          if (!isMounted) return;
          const TubesCursorImpl = module.default;

          if (canvasRef.current) {
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
        .catch((err: any) => console.error("Failed to load TubesCursor module:", err));
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
      if (appRef.current && typeof appRef.current.dispose === "function") {
        try {
          appRef.current.dispose();
        } catch (e) {
          // ignore cleanup error
        }
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-80"
      />
    </div>
  );
}
