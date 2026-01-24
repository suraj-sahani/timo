import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";
import HomeHeader from "@/components/home/home-header";
import { HowItWorks } from "@/components/home/how-it-works";
import { Integrations } from "@/components/home/integrations";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Integrations />
      <CTASection />
    </main>
  );
}
