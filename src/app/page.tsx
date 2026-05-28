import { AnimatedGradientBg } from "@/components/shared/animated-gradient-bg";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedGradientBg />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
