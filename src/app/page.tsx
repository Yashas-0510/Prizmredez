import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WebDesignSection from "@/components/sections/WebDesignSection";
import AdCreativesSection from "@/components/sections/AdCreativesSection";
import UgcSection from "@/components/sections/UgcSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070708] overflow-x-clip">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WebDesignSection />
      <div id="services">
        <AdCreativesSection />
        <UgcSection />
        <SocialMediaSection />
      </div>
      <ContactSection />
    </main>
  );
}
