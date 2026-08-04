"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#070708] text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            backgroundPosition: [
              "50% 50%, 50% 50%",
              "180% 50%, 180% 50%",
              "50% 50%, 50% 50%",
            ],
          }}
          transition={{
            duration: 42,
            ease: "linear",
            repeat: Infinity,
          }}
          className={cn(
            `
          [--white-gradient:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,#000000_0%,#000000_7%,transparent_10%,transparent_12%,#000000_16%)]
          [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)]
          [background-image:var(--dark-gradient),var(--aurora)]
          [background-size:200%,_150%]
          filter blur-[24px]
          after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] 
          after:[background-size:150%,_100%] 
          after:mix-blend-difference
          pointer-events-none
          absolute -inset-[10px] opacity-[0.13] will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
