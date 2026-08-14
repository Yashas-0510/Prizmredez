"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export interface ZoomParallaxImage {
  src: string;
  mobileSrc?: string;
  alt?: string;
  title?: string;
  category?: string;
  objectPosition?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: ZoomParallaxImage[];
}

function DesktopZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.map(({ src, alt, objectPosition }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1
                  ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]"
                  : ""
              } ${
                index === 6
                  ? "[&>div]:!top-[26vh] [&>div]:!left-[27.5vw] [&>div]:!h-[20vh] [&>div]:!w-[18vw]"
                  : ""
              } `}
            >
              <div className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black group">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  className={`h-full w-full ${objectPosition || "object-cover object-top"} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MobileZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale0 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

  const x0 = useTransform(scrollYProgress, [0, 1], ["0vw", "0vw"]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-75vw"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0vw", "75vw"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0vw", "-75vw"]);
  const x4 = useTransform(scrollYProgress, [0, 1], ["0vw", "75vw"]);

  const y0 = useTransform(scrollYProgress, [0, 1], ["0vh", "0vh"]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-75vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-75vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "75vh"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0vh", "75vh"]);

  const mobileTransforms = [
    { scale: scale0, x: x0, y: y0 },
    { scale: scale1, x: x1, y: y1 },
    { scale: scale2, x: x2, y: y2 },
    { scale: scale3, x: x3, y: y3 },
    { scale: scale4, x: x4, y: y4 },
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.slice(0, 5).map(({ src, mobileSrc, alt, objectPosition }, index) => {
          const transform = mobileTransforms[index];
          const activeSrc = mobileSrc || src;

          return (
            <motion.div
              key={index}
              style={{
                scale: transform.scale,
                x: transform.x,
                y: transform.y,
              }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 0 ? "z-20" : "z-10"
              } ${
                index === 1
                  ? "[&>div]:!-top-[26vh] [&>div]:!-left-[23vw] [&>div]:!h-[22vh] [&>div]:!w-[38vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[22vh] [&>div]:!left-[23vw] [&>div]:!h-[26vh] [&>div]:!w-[36vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!top-[24vh] [&>div]:!-left-[23vw] [&>div]:!h-[26vh] [&>div]:!w-[36vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[24vh] [&>div]:!left-[23vw] [&>div]:!h-[20vh] [&>div]:!w-[38vw]"
                  : ""
              } `}
            >
              <div className="relative h-[28vh] w-[46vw] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black group">
                <Image
                  src={activeSrc || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  className={`h-full w-full ${objectPosition || "object-cover object-top"} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopZoomParallax images={images} />
      </div>
      <div className="block md:hidden">
        <MobileZoomParallax images={images} />
      </div>
    </>
  );
}
