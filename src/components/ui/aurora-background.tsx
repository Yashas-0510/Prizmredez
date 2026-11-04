"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

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
        "relative flex flex-col items-center justify-center bg-[#070708] text-slate-950",
        className
      )}
      {...props}
    >
      {/* Zero-repaint GPU-composited ambient light atmosphere */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{ contain: "strict" }}
      >
        <div
          className={cn(
            "absolute -inset-[10%] opacity-[0.11] pointer-events-none transform-gpu",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
          style={{
            background:
              "radial-gradient(60% 50% at 20% 25%, rgba(165, 180, 252, 0.28) 0%, transparent 70%), radial-gradient(55% 45% at 80% 65%, rgba(96, 165, 250, 0.22) 0%, transparent 70%), radial-gradient(45% 40% at 50% 90%, rgba(201, 156, 255, 0.18) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
