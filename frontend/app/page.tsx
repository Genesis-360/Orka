import LenisProvider from "@/components/landing/LenisProvider";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <LenisProvider>
      <LandingNavbar />
      <main className="bg-[#081B2E]">
        <LandingHero />
        <TrustedBy />
        <Features />
        <HowItWorksSection />
        <Testimonials />
        <PricingSection />
        <LandingFooter />
      </main>
    </LenisProvider>
  );
}
