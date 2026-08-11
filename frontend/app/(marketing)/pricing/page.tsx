import PricingHero from "./components/PricingHero";
import PricingCards from "./components/PricingCards";
import ComparisonTable from "./components/ComparisonTable";
import PricingFaq from "./components/PricingFaq";
import PricingCta from "./components/PricingCta";

export default function PricingPage() {
  return (
    <div className="overflow-hidden bg-paper">
      <PricingHero />
      <PricingCards />
      <ComparisonTable />
      <PricingFaq />
      <PricingCta />
    </div>
  );
}