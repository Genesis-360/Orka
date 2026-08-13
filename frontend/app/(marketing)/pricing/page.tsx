import PricingHero from "./components/PricingHero";
import PricingCards from "./components/PricingCards";
import ComparisonTable from "./components/ComparisonTable";
import PricingFaq, { pricingFaqs } from "./components/PricingFaq";
import PricingCta from "./components/PricingCta";
import FaqJsonLd from "@/components/FaqJsonLd";

export default function PricingPage() {
  return (
    <div className="overflow-hidden bg-paper">
      <FaqJsonLd faqs={pricingFaqs} />
      <PricingHero />
      <PricingCards />
      <ComparisonTable />
      <PricingFaq />
      <PricingCta />
    </div>
  );
}