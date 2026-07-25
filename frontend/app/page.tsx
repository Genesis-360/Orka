import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/landing/LenisProvider";
import LandingHero from "@/components/landing/LandingHero";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";

export default function Home() {
  return (
    <LenisProvider>
      <div className="bg-[#081B2E]">
        <div className="bg-[#081B2E] pt-5">
          <Navbar />
        </div>
        <main>
          <LandingHero />
          <TrustedBy />
          <Features />
          <HowItWorksSection />
          <Testimonials />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
