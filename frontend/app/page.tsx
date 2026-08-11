import Hero from "../components/Hero";
import { LogoCloud } from "../components/ui/logo-cloud-2";
import FeatureBento from "../components/FeatureBento";
import DashboardFeatures from "../components/DashboardFeatures";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import OpenSource from "../components/OpenSource";
import WaitlistCta from "../components/WaitlistCta";
import Footer from "../components/Footer";
import ClickSpark from "../components/ClickSpark";

export default function Home() {
  return (
    <ClickSpark sparkColor="#9474ff" sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
    <main className="overflow-hidden bg-paper">
      <Hero />
      <FeatureBento />
      <section className="relative mx-auto grid max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-2xl">
          Companies we{" "}
          <span className="font-semibold text-primary">collaborate</span> with.
        </h2>
        <LogoCloud />
      </section>
      <DashboardFeatures />
      <Testimonials />
      <OpenSource />
      <Faq />
      <WaitlistCta />
      <Footer />
    </main>
    </ClickSpark>
  );
}
