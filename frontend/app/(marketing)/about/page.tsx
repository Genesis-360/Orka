import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutMission from "@/components/about/AboutMission";
import AboutJourney from "@/components/about/AboutJourney";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutTechnology from "@/components/about/AboutTechnology";
import AboutTeam from "@/components/about/AboutTeam";
import AboutFaq from "@/components/about/AboutFaq";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About ORKA",
  description:
    "ORKA is the financial operating system for service businesses — built to simplify payments, escrow, milestones, and settlements.",
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutJourney />
      <AboutPrinciples />
      <AboutTechnology />
      <AboutTeam />
      <AboutFaq />
      <AboutCTA />
    </div>
  );
}
