import RoomShell from "./RoomShell";
import AdCreativesStickyScroll from "@/components/ui/AdCreativesStickyScroll";

/**
 * Room 04 — Ad Creatives Sticky Scroll Experience.
 * Full-bleed video entrance that smoothly shrinks into a framed cinema screen on scroll.
 */
export default function AdCreativesSection() {
  return (
    <RoomShell index="04" label="Ad Creatives" id="ads" right="PERFORMANCE / PAID SOCIAL">
      <AdCreativesStickyScroll />
    </RoomShell>
  );
}
