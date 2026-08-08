"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface TextAnimateProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: keyof typeof motionElements;
  animation?: "blurInUp" | "blurIn" | "slideUp" | "fadeIn";
  by?: "word" | "character" | "line";
  startOnView?: boolean;
  once?: boolean;
}

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

export function TextAnimate({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  as: Component = "p",
  animation = "blurInUp",
  by = "word",
  startOnView = true,
  once = false,
}: TextAnimateProps) {
  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: by === "character" ? 0.03 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: animation === "blurInUp" ? 18 : 0,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const MotionComponent = motionElements[Component] || motion.p;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={!startOnView ? "show" : undefined}
      viewport={{ once }}
      className={className}
    >
      {by === "word" &&
        words.map((word, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block whitespace-pre mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      {by === "character" &&
        children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
    </MotionComponent>
  );
}
