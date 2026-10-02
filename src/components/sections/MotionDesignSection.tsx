import RoomShell from "./RoomShell";
import MotionDesignShowcase from "@/components/ui/MotionDesignShowcase";

/**
 * Room 04 — Motion Design & 3D Cinematic Craft.
 * Interactive Cinema Theater & Multi-Cam Control Room Showcase.
 * Launch videos, UI motion, product teasers, 3D identity reveals, and commercials.
 */
export default function MotionDesignSection() {
  return (
    <RoomShell index="03" label="Motion Design" id="motion" right="3D / LAUNCH FILMS / UI MOTION">
      <MotionDesignShowcase />
    </RoomShell>
  );
}
