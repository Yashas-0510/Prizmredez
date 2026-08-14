"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from "react";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type MotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";

type CharacterSet = string[] | readonly string[];

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;
type HyperTextMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"div">, "ref"> & RefAttributes<HTMLElement>
>;

interface HyperTextProps extends Omit<MotionProps, "children"> {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: MotionElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Automatic re-trigger interval in milliseconds (e.g. 5000 for 5s). Set to 0 to disable. */
  interval?: number;
  /** Custom character set for scramble effect. Defaults to geometric prism symbols */
  characterSet?: CharacterSet;
}

export const PRISM_CHARACTER_SET = Object.freeze(
  "✦✧∆∇◈⬩⬪✶✺⊕⊗⊛◊▲▼◆✻".split("")
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 900,
  delay = 0,
  as: Component = "div",
  startOnView = true,
  animateOnHover = true,
  interval = 5000,
  characterSet = PRISM_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = (motionElements[Component] || motion.div) as HyperTextMotionComponent;

  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split("")
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [iterationCount, setIterationCount] = useState(-2);
  const elementRef = useRef<HTMLElement | null>(null);

  const triggerAnimation = useCallback(() => {
    if (!isAnimating) {
      setIterationCount(-2);
      setIsAnimating(true);
    }
  }, [isAnimating]);

  const handleMouseEnter = () => {
    if (animateOnHover) {
      triggerAnimation();
    }
  };

  // Handle initial trigger + periodic auto-retrigger every X milliseconds
  useEffect(() => {
    let intervalTimer: ReturnType<typeof setInterval> | null = null;

    const startAutoLoop = () => {
      triggerAnimation();
      if (interval > 0) {
        intervalTimer = setInterval(() => {
          triggerAnimation();
        }, interval);
      }
    };

    if (!startOnView) {
      const startTimeout = setTimeout(startAutoLoop, delay);
      return () => {
        clearTimeout(startTimeout);
        if (intervalTimer) clearInterval(intervalTimer);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(startAutoLoop, delay);
        } else {
          if (intervalTimer) clearInterval(intervalTimer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [delay, startOnView, interval, triggerAnimation]);

  // Handle scramble animation loop
  useEffect(() => {
    let animationFrameId: number | null = null;

    if (isAnimating) {
      const maxIterations = children.length;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Progress offset ensures index 0 ('W') scrambles for at least 30% of total duration
        const resolvedCount = Math.floor(progress * (maxIterations + 4)) - 2;
        setIterationCount(resolvedCount);

        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= resolvedCount
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)]
          )
        );

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setDisplayText(children.split(""));
          setIsAnimating(false);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden inline-flex items-center select-none cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => {
          const isScrambling = isAnimating && index > iterationCount;
          return (
            <motion.span
              key={index}
              className={cn(
                letter === " " ? "w-[0.25em]" : "",
                isScrambling ? "opacity-75 text-bone/70 font-mono text-[0.88em]" : ""
              )}
            >
              {letter.toUpperCase()}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </MotionComponent>
  );
}
