"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else if (target.closest("button, a, input, [role='button']")) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer fluid halo cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-cyan-400/40 mix-blend-difference flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-cyan-200 backdrop-blur-[2px]"
        animate={{
          x: mousePosition.x - (isHovered ? 36 : 16),
          y: mousePosition.y - (isHovered ? 36 : 16),
          width: isHovered ? 72 : 32,
          height: isHovered ? 72 : 32,
          scale: isClicking ? 0.85 : 1,
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
          borderColor: isHovered ? "rgba(160, 32, 240, 0.8)" : "rgba(0, 240, 255, 0.3)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 text-center text-white"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_12px_#00f0ff]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 50,
        }}
      />
    </>
  );
}
