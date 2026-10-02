import RoomShell from "./RoomShell";
import AdCreativesStickyScroll from "@/components/ui/AdCreativesStickyScroll";

/**
 * Room 05 — Ad Creatives Sticky Scroll Experience.
 * Full-bleed video entrance that smoothly shrinks into a framed cinema screen on scroll.
 */
export default function AdCreativesSection() {
  return (
    <RoomShell index="05" label="Ad Creatives" id="ads" right="PERFORMANCE / PAID SOCIAL">
      <AdCreativesStickyScroll />
    </RoomShell>
  );
}
