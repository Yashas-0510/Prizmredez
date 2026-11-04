"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  LayoutGrid,
  Tv,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface MotionProject {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: "SaaS Launch Film" | "Brand Showreel" | "UI Motion Study" | "Kinetic Telemetry" | "Micro-Interactions";
  categoryKey: "saas-launch" | "showreel" | "ui-study" | "telemetry" | "micro-ui";
  src: string;
  poster: string;
  durationStr: string;
  specs: string;
  tools: string;
  description: string;
  deliverables: string[];
}

const MOTION_PROJECTS: MotionProject[] = [
  {
    id: "unified-chat",
    index: "01",
    title: "UNIFIEDCHAT — SAAS LAUNCH FILM",
    tagline: "Turning multi-app notification chaos into one calm, AI-powered workspace.",
    category: "SaaS Launch Film",
    categoryKey: "saas-launch",
    src: "/motion-design/motiondesign5.mp4",
    poster: "/motion-design/posters/motiondesign5.webp",
    durationStr: "00:40",
    specs: "4K · 60 FPS",
    tools: "Opus 5.5 · Remotion · HyperFrames",
    description:
      "A narrative SaaS product launch film for UnifiedChat. Choreographs floating Slack, WhatsApp, LinkedIn, and Gmail notifications converging into a single AI-assisted inbox workflow rendered entirely in code.",
    deliverables: ["Product Launch Film", "UI Choreography", "Kinetic Typography", "Multi-Channel Cutdowns"],
  },
  {
    id: "claude-reel",
    index: "02",
    title: "CLAUDE — GENERATIVE IDENTITY REEL",
    tagline: "Rhythmic 128 BPM brand identity and Truchet wave systems engineered in pure code.",
    category: "Brand Showreel",
    categoryKey: "showreel",
    src: "/motion-design/motiondesign2.mp4",
    poster: "/motion-design/posters/motiondesign2.webp",
    durationStr: "00:15",
    specs: "1080P · 60 FPS",
    tools: "Opus 5.5 · Remotion · HyperFrames",
    description:
      "An audio-reactive generative motion reel exploring radial logomark geometry, procedural Truchet tile waves, and beat-synced typographic systems at a locked 60 frames per second.",
    deliverables: ["Generative Identity", "Truchet Wave System", "128 BPM Sync", "Programmatic Motion"],
  },
  {
    id: "develop-study",
    index: "03",
    title: "DEVELOP — CROSS-DEVICE UI STUDY",
    tagline: "Tactile liquid-glass controls and seamless mobile-to-desktop spatial handoff.",
    category: "UI Motion Study",
    categoryKey: "ui-study",
    src: "/motion-design/motiondesign3.mp4",
    poster: "/motion-design/posters/motiondesign3.webp",
    durationStr: "00:29",
    specs: "1440P · 60 FPS",
    tools: "Opus 5.5 · Remotion · HyperFrames",
    description:
      "A programmatic interface motion study demonstrating refractive glass sliders, real-time golden-hour lighting shifts, and fluid drag-and-drop asset continuity between iOS and macOS.",
    deliverables: ["Liquid Glass UI", "Cross-Device Continuity", "Cursor Choreography", "Interactive Walkthrough"],
  },
  {
    id: "claude-telemetry",
    index: "04",
    title: "CLAUDE — PHYSICS & PARTICLE SYSTEMS",
    tagline: "Mathematical squash-and-stretch telemetry and high-density orbital particle rings.",
    category: "Kinetic Telemetry",
    categoryKey: "telemetry",
    src: "/motion-design/motiondesign4.mp4",
    poster: "/motion-design/posters/motiondesign4.webp",
    durationStr: "00:15",
    specs: "1080P · 60 FPS",
    tools: "Opus 5.5 · Remotion · HyperFrames",
    description:
      "A technical motion study visualizing live velocity vectors, spring-damped collision physics, and thousands of procedural particles locking into orbital ring formations.",
    deliverables: ["Physics Simulation", "Live HUD Telemetry", "Particle Ring Engine", "Timecode Choreography"],
  },
  {
    id: "tactile-ui",
    index: "05",
    title: "TACTILE UI — MICRO-INTERACTION LAB",
    tagline: "Spring-loaded sliders, elastic cursor physics, and keystroke-level tactile feedback.",
    category: "Micro-Interactions",
    categoryKey: "micro-ui",
    src: "/motion-design/motiondesign1.mp4",
    poster: "/motion-design/posters/motiondesign1.webp",
    durationStr: "00:10",
    specs: "1080P · 60 FPS",
    tools: "Opus 5.5 · Remotion · HyperFrames",
    description:
      "A high-precision component interaction reel highlighting elastic slider momentum, toast notifications, and mechanical key-press choreography on a dark dot-matrix stage.",
    deliverables: ["Component Physics", "Elastic Sliders", "Keystroke Motion", "Design System Specs"],
  },
  {
    id: "cluely-launch",
    index: "06",
    title: "CLUELY — AI MEETING INTELLIGENCE",
    tagline: "All the context, one clear answer — unifying calls, docs, and chats into instant briefs.",
    category: "SaaS Launch Film",
    categoryKey: "saas-launch",
    src: "/motion-design/apcRUlrKwThJuS9g.mp4",
    poster: "/motion-design/posters/apcRUlrKwThJuS9g.webp",
    durationStr: "00:36",
    specs: "4K UHD · 60 FPS",
    tools: "Opus 5.5 · Remotion · HyperFrames",
    description:
      "A flagship product launch film for Cluely. Showcases 3D device rotation, orbiting ecosystem integrations (Slack, Zoom, Meet, Teams), and automated QBR action-item synthesis.",
    deliverables: ["Flagship Launch Film", "3D Device Choreography", "Ecosystem Orbit UI", "Editorial Typography"],
  },
];

function MultiCamCard({
  proj,
  idx,
  onSelect,
}: {
  proj: MotionProject;
  idx: number;
  onSelect: (idx: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = cardVideoRef.current;
    if (!video) return;
    if (isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      onClick={() => onSelect(idx)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/grid relative flex flex-col rounded-xl overflow-hidden border border-white/10 bg-ink-soft hover:border-white/40 transition-all cursor-pointer shadow-lg hover:shadow-2xl"
    >
      {/* Video Aspect Frame */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={cardVideoRef}
          src={proj.src}
          poster={proj.poster}
          preload="none"
          muted
          playsInline
          loop
          className="w-full h-full object-cover group-hover/grid:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] tracking-[0.18em]">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-white/80">
            [{proj.index}]
          </span>
          <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/10 text-white/90">
            {proj.specs}
          </span>
        </div>

        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity bg-black/30 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xl pl-0.5">
            <Play className="w-5 h-5 fill-black" />
          </div>
        </div>

        {/* Duration Pill */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 font-mono text-[9px] tracking-[0.16em] text-white/80">
          {proj.durationStr}
        </div>
      </div>

      {/* Content Card Body */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] spectrum-text uppercase mb-1">
            {proj.category}
          </div>
          <h4 className="font-heading font-extrabold uppercase text-[15px] sm:text-[16px] text-bone tracking-tight leading-snug mb-2">
            {proj.title}
          </h4>
          <p className="font-sans text-[12px] text-white/55 leading-relaxed mb-4 line-clamp-2">
            {proj.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[9px] tracking-[0.16em] text-white/40">
          <span>{proj.tools.split("·")[0]}</span>
          <span className="text-white/70 group-hover/grid:text-white group-hover/grid:translate-x-1 transition-all">
            LAUNCH THEATER →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MotionDesignShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [viewMode, setViewMode] = useState<"theater" | "grid">("theater");
  const [showControls, setShowControls] = useState(true);

  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrubberFillRef = useRef<HTMLDivElement>(null);
  const activeStripFillRef = useRef<HTMLDivElement>(null);
  const timecodeSpanRef = useRef<HTMLSpanElement>(null);
  const theaterContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInViewRef = useRef(false);

  const activeProject = MOTION_PROJECTS[activeIndex];

  // Viewport intersection observer: auto-pause when scrolled away, auto-resume when visible
  useEffect(() => {
    const el = showcaseContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isInViewRef.current = inView;
        if (!inView && mainVideoRef.current && !mainVideoRef.current.paused) {
          mainVideoRef.current.pause();
        } else if (inView && mainVideoRef.current && isPlaying) {
          mainVideoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Seamless persistent source switching without DOM unmounting
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;
    if (!video.src.endsWith(activeProject.src)) {
      video.src = activeProject.src;
      video.load();
      if (isPlaying && isInViewRef.current) {
        video.play().catch(() => {});
      }
    }
  }, [activeProject.src, isPlaying]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Video Time Update & Progress Tracking via direct DOM refs (zero React re-renders during playback!)
  const updateProgressDOM = (pct: number, timeText: string) => {
    if (scrubberFillRef.current) {
      scrubberFillRef.current.style.width = `${Math.max(1.5, pct)}%`;
    }
    if (activeStripFillRef.current) {
      activeStripFillRef.current.style.width = `${Math.max(4, pct)}%`;
    }
    if (timecodeSpanRef.current && timecodeSpanRef.current.textContent !== timeText) {
      timecodeSpanRef.current.textContent = timeText;
    }
  };

  const handleTimeUpdate = () => {
    if (!mainVideoRef.current) return;
    const current = mainVideoRef.current.currentTime;
    const dur = mainVideoRef.current.duration || 1;
    updateProgressDOM((current / dur) * 100, formatTime(current));
  };

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (!mainVideoRef.current) return;
    if (mainVideoRef.current.paused) {
      mainVideoRef.current.play();
      setIsPlaying(true);
    } else {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Toggle Mute / Audio
  const toggleMute = useCallback(() => {
    if (!mainVideoRef.current) return;
    mainVideoRef.current.muted = !mainVideoRef.current.muted;
    setIsMuted(mainVideoRef.current.muted);
  }, []);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!theaterContainerRef.current) return;
    if (!document.fullscreenElement) {
      theaterContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Scrub Video Timeline
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !mainVideoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * (mainVideoRef.current.duration || 0);
    mainVideoRef.current.currentTime = newTime;
    updateProgressDOM(pos * 100, formatTime(newTime));
  };

  // Switch Project
  const selectProject = (idx: number) => {
    setActiveIndex(idx);
    setIsPlaying(true);
    updateProgressDOM(0, "00:00");
    if (viewMode === "grid") {
      setViewMode("theater");
    }
  };

  // Next / Prev Project Navigation
  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % MOTION_PROJECTS.length);
  };
  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + MOTION_PROJECTS.length) % MOTION_PROJECTS.length);
  };

  // Auto-hide controls when mouse is inactive in theater
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  // Auto-play next video on finish
  const handleEnded = () => {
    nextProject();
  };

  // Keyboard navigation (scoped to when Motion Design section is in view)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInViewRef.current) return;
      if (["INPUT", "TEXTAREA", "BUTTON"].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === "ArrowRight") {
        nextProject();
      } else if (e.key === "ArrowLeft") {
        prevProject();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleMute]);

  return (
    <div
      ref={showcaseContainerRef}
      className="w-full flex flex-col justify-between px-4 sm:px-6 md:px-10 py-12 md:py-20 select-none"
    >
      {/* Top Header & Console Controls */}
      <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 md:pb-12 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse shrink-0" />
            <span>PROGRAMMATIC MOTION · OPUS 5.5 / REMOTION / HYPERFRAMES</span>
          </div>
          <h2 className="font-heading font-extrabold uppercase text-[clamp(1.75rem,4.5vw,3.6rem)] leading-[1.04] text-bone tracking-tight">
            MOTION <span className="text-outline">DESIGN.</span>
          </h2>
        </div>

        {/* View Mode Toggle: Theater vs Multi-Cam Grid */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm self-start sm:self-auto">
          <button
            onClick={() => setViewMode("theater")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
              viewMode === "theater"
                ? "bg-white text-black font-semibold shadow-md"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Tv className="w-3 h-3" />
            <span>THEATER</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-white text-black font-semibold shadow-md"
                : "text-white/50 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>MULTI-CAM</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-8 md:pt-12">
        <AnimatePresence mode="wait">
          {viewMode === "theater" ? (
            /* ========================================================================= */
            /* 1. CINEMATIC THEATER VIEW (Master 16:9 Screen + Console)                  */
            /* ========================================================================= */
            <motion.div
              key="theater"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col gap-8 lg:gap-12"
            >
              {/* Monumental 16:9 Cinematic Projector Screen */}
              <div
                ref={theaterContainerRef}
                onMouseMove={handleMouseMove}
                className="relative w-full aspect-video max-w-6xl mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.85)] group select-none"
              >
                {/* Active Film Master Video Player — Persistent Hardware Decoder */}
                <video
                  ref={mainVideoRef}
                  src={activeProject.src}
                  poster={activeProject.poster}
                  preload="metadata"
                  loop={false}
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* Subtle Cinematic Ambient Bloom Behind Video Edge */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />

                {/* Big Center Play/Pause Click Overlay */}
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl backdrop-blur-md pl-1 hover:scale-105 transition-transform"
                      >
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Top Overlay: Project Meta & Audio Toggle */}
                <div
                  className={`absolute top-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Left: Project Number & Category Pill */}
                  <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/90">
                      [{activeProject.index} / 06]
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-white/[0.08] backdrop-blur-md border border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {activeProject.category}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-white/60">
                      {activeProject.specs}
                    </span>
                  </div>

                  {/* Right: Soundwave Audio Toggle */}
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={toggleMute}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 transition-all text-white font-mono text-[9px] sm:text-[10px] tracking-[0.2em] cursor-pointer"
                      title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-white/60" />
                          <span className="text-white/60">MUTED</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-spectrum" />
                          {/* Animated Sound Wave Bars */}
                          <div className="flex items-end gap-0.5 h-3 w-3">
                            <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:0.1s] h-full" />
                            <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:0.25s] h-2/3" />
                            <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:0.15s] h-full" />
                          </div>
                          <span className="text-white font-semibold">AUDIO ON</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 transition-all text-white/70 hover:text-white cursor-pointer"
                      title="Fullscreen Theater"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay: Always-Visible Timecode Scrubber Bar & Playback Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                  {/* Interactive Scrub Timeline (Always visible while playing!) */}
                  <div
                    ref={progressBarRef}
                    onClick={handleScrub}
                    className="group/scrub relative w-full h-2 sm:h-2.5 bg-white/25 rounded-full cursor-pointer overflow-hidden mb-3 hover:h-3 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  >
                    <div
                      ref={scrubberFillRef}
                      className="h-full rounded-full relative transition-[width] duration-150"
                      style={{
                        width: "1.5%",
                        background: "var(--spectrum)",
                      }}
                    />
                  </div>

                  {/* Playback info row */}
                  <div className="flex items-center justify-between text-white font-mono text-[9px] sm:text-[11px] tracking-[0.2em]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="hover:text-white text-white/90 transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <div className="flex items-center gap-1.5 tabular-nums">
                        <span ref={timecodeSpanRef} className="text-white font-bold">
                          00:00
                        </span>
                        <span className="text-white/40">/</span>
                        <span className="text-white/70">{activeProject.durationStr}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[9px] sm:text-[10px] text-white/70">
                      <span className="hidden md:inline">{activeProject.tools}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevProject}
                          className="hover:text-white transition-colors cursor-pointer p-1"
                          title="Previous Film (Left Arrow)"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextProject}
                          className="hover:text-white transition-colors cursor-pointer p-1"
                          title="Next Film (Right Arrow)"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive 6-Reel Cinema Filmstrip Bar */}
              <div className="w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {MOTION_PROJECTS.map((proj, idx) => {
                  const isSelected = idx === activeIndex;
                  const shortTitle = proj.title.split("—")[0].trim();
                  return (
                    <button
                      key={proj.id}
                      onClick={() => selectProject(idx)}
                      className={`group relative flex flex-col justify-between text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                        isSelected
                          ? "bg-white/[0.07] border-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                          : "bg-white/[0.02] hover:bg-white/[0.045] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full font-mono text-[9px] tracking-[0.2em] uppercase mb-1.5">
                        <span className={isSelected ? "spectrum-text font-bold" : "text-white/40"}>
                          [{proj.index}]
                        </span>
                        <span className="text-white/35">{proj.durationStr}</span>
                      </div>

                      <div className="font-heading font-bold text-[11px] sm:text-[12px] uppercase tracking-tight text-bone truncate w-full">
                        {shortTitle}
                      </div>

                      <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-white/45 truncate w-full mt-0.5">
                        {proj.category}
                      </div>

                      {/* Active Reel Live Playback Progress Bar */}
                      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10 overflow-hidden">
                        {isSelected && (
                          <div
                            ref={activeStripFillRef}
                            className="h-full transition-[width] duration-150"
                            style={{
                              width: "4%",
                              background: "var(--spectrum)",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Project Details Console & Cinema Navigation */}
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left (lg:col-span-8): Active Project Title, Description & Deliverables */}
                <div className="lg:col-span-8 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-white/45 mb-3">
                    <span className="text-white/80 font-semibold">REEL [{activeProject.index} / 06]</span>
                    <span>·</span>
                    <span className="spectrum-text font-semibold">{activeProject.category}</span>
                    <span>·</span>
                    <span className="text-white/40">{activeProject.specs}</span>
                  </div>

                  <h3 className="font-heading font-extrabold uppercase text-[clamp(1.4rem,3vw,2.4rem)] text-bone tracking-tight leading-[1.12] mb-3">
                    {activeProject.title}
                  </h3>

                  <p className="font-sans text-[13px] sm:text-[14px] md:text-[15px] text-white/65 leading-relaxed max-w-3xl mb-6">
                    {activeProject.description}
                  </p>

                  {/* Deliverable Tags */}
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-2.5">
                      DELIVERABLES & SCOPE
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/75 uppercase tracking-[0.14em]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right (lg:col-span-4): Pipeline Specs + Direct Reel Switcher */}
                <div className="lg:col-span-4 flex flex-col p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                  <div className="mb-5">
                    <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1.5">
                      PIPELINE & STACK
                    </div>
                    <div className="font-mono text-[12px] text-bone/90 font-medium tracking-wide mb-3">
                      {activeProject.tools}
                    </div>

                    <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1.5">
                      RUNTIME & AUDIO
                    </div>
                    <div className="font-mono text-[11px] text-white/60">
                      {activeProject.durationStr} Master Cut · Spatial Sound
                    </div>
                  </div>

                  {/* Direct Reel Number Switcher + Prev / Next */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2.5">
                      <span>SELECT REEL</span>
                      <span className="text-white/60">[{activeProject.index} OF 06]</span>
                    </div>

                    {/* 6 Number Buttons */}
                    <div className="grid grid-cols-6 gap-1.5 mb-3">
                      {MOTION_PROJECTS.map((proj, idx) => {
                        const isSelected = idx === activeIndex;
                        return (
                          <button
                            key={proj.id}
                            onClick={() => selectProject(idx)}
                            className={`py-1.5 rounded text-center font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white text-black font-bold shadow-md"
                                : "bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                            title={proj.title}
                          >
                            {proj.index}
                          </button>
                        );
                      })}
                    </div>

                    {/* Prev / Next Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevProject}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>PREV</span>
                      </button>
                      <button
                        onClick={nextProject}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white transition-all cursor-pointer"
                      >
                        <span>NEXT</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 2. MULTI-CAM CONTROL ROOM GRID VIEW                                      */
            /* ========================================================================= */
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOTION_PROJECTS.map((proj, idx) => (
                  <MultiCamCard key={proj.id} proj={proj} idx={idx} onSelect={selectProject} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Capabilities Ticker Strip at the Bottom */}
      <div className="w-full max-w-6xl mx-auto mt-16 md:mt-24 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
            <span className="text-white/75 font-semibold">01</span>
            <span className="text-white/20">/</span>
            <span>PROGRAMMATIC</span>
          </div>
          <div className="font-heading font-bold text-[13px] text-bone uppercase tracking-tight">
            Code-Driven Motion
          </div>
          <div className="text-[11px] text-white/45 font-sans mt-0.5">
            Opus 5.5, Remotion &amp; HyperFrames.
          </div>
        </div>

        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
            <span className="text-white/75 font-semibold">02</span>
            <span className="text-white/20">/</span>
            <span>INTERACTION</span>
          </div>
          <div className="font-heading font-bold text-[13px] text-bone uppercase tracking-tight">
            UI &amp; Spatial Choreography
          </div>
          <div className="text-[11px] text-white/45 font-sans mt-0.5">
            Liquid glass, tactile sliders &amp; cursor physics.
          </div>
        </div>

        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
            <span className="text-white/75 font-semibold">03</span>
            <span className="text-white/20">/</span>
            <span>LAUNCH FILMS</span>
          </div>
          <div className="font-heading font-bold text-[13px] text-bone uppercase tracking-tight">
            SaaS &amp; Product Reveals
          </div>
          <div className="text-[11px] text-white/45 font-sans mt-0.5">
            High-converting product stories &amp; teasers.
          </div>
        </div>

        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase mb-1 flex items-center gap-1.5">
            <span className="text-white/75 font-semibold">04</span>
            <span className="text-white/20">/</span>
            <span>GENERATIVE</span>
          </div>
          <div className="font-heading font-bold text-[13px] text-bone uppercase tracking-tight">
            Audio-Reactive Systems
          </div>
          <div className="text-[11px] text-white/45 font-sans mt-0.5">
            Beat-synced typography &amp; particle engines.
          </div>
        </div>
      </div>
    </div>
  );
}
