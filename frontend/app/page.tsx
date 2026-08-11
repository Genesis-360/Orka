import Hero from "../components/Hero";
import { LogoCloud } from "../components/ui/logo-cloud-2";
import FeatureBento from "../components/FeatureBento";
import DashboardFeatures from "../components/DashboardFeatures";
import Faq from "../components/Faq";
import FaqJsonLd from "../components/FaqJsonLd";
import Testimonials from "../components/Testimonials";
import OpenSource from "../components/OpenSource";
import LaunchCta from "../components/LaunchCta";
import Footer from "../components/Footer";
import ClickSpark from "../components/ClickSpark";
import { faqs } from "../lib/content";

export default function Home() {
  return (
    <ClickSpark
      sparkColor="#9474ff"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}>
      <main className="overflow-hidden bg-paper">
        <Hero />
        <FaqJsonLd faqs={faqs} />
        <section className="relative mx-auto grid max-w-3xl px-4 py-14">
          <h2 className="mb-8 text-center text-balance font-medium text-lg tracking-tight text-muted-foreground md:text-2xl">
            Companies we{" "}
            <span className="font-semibold text-primary">collaborate</span>{" "}
            with.
          </h2>
          <LogoCloud />
        </section>
        <FeatureBento />
        <DashboardFeatures />
        <Testimonials />
        <OpenSource />
        <Faq />
        <LaunchCta />
        <Footer />
      </main>
    </ClickSpark>
  );
}
