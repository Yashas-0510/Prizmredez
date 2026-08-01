import RoomShell from "./RoomShell";
import WebExperiencesStickyScroll from "@/components/ui/WebExperiencesStickyScroll";

/**
 * Room 03 — Web Design / Web Experiences.
 * Sticky-scroll interactive showcase with central Nudot-style headline copy
 * and 5 floating project cards that enter sequentially.
 */
export default function WebDesignSection() {
  return (
    <RoomShell index="03" label="Web Design" id="work" right="NEXT.JS / MOTION / SHIPPED">
      <WebExperiencesStickyScroll />
    </RoomShell>
  );
}
