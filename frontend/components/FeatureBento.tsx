import {
  FolderKanban,
  ShieldCheck,
  ExternalLink,
  Code2,
  FileText,
  BarChart3,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    name: "Project Management",
    description: "Create, track, and deliver projects with milestones, tasks, and team collaboration.",
    href: "#",
    cta: "Manage projects",
    Icon: FolderKanban,
    className: "md:col-span-2",
    background: (
      <div className="pointer-events-none absolute -right-12 -top-12 size-64 rounded-full bg-violet/10 blur-3xl" />
    ),
  },
  {
    name: "Escrow Payments",
    description: "Secure milestone-based payments on Stellar. Funds held in escrow until work is approved.",
    href: "#",
    cta: "View escrow",
    Icon: ShieldCheck,
    className: "md:col-span-1",
    background: (
      <div className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-teal/10 blur-3xl" />
    ),
  },
  {
    name: "Client Portal",
    description: "Share real-time project progress with clients through a dedicated public portal.",
    href: "#",
    cta: "Open portal",
    Icon: ExternalLink,
    className: "md:col-span-1",
    background: (
      <div className="pointer-events-none absolute -left-8 -top-8 size-40 rounded-full bg-orange/10 blur-3xl" />
    ),
  },
  {
    name: "Smart Contracts",
    description: "Soroban-powered smart contracts automate agreements, escrow releases, and dispute resolution.",
    href: "#",
    cta: "Learn more",
    Icon: Code2,
    className: "md:col-span-2",
    background: (
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-lime/8 blur-3xl" />
    ),
  },
  {
    name: "Invoicing & Billing",
    description: "Generate professional invoices, track payments, and manage billing all from the dashboard.",
    href: "#",
    cta: "View invoices",
    Icon: FileText,
    className: "md:col-span-1",
    background: (
      <div className="pointer-events-none absolute -right-8 -bottom-8 size-44 rounded-full bg-coral/10 blur-3xl" />
    ),
  },
  {
    name: "Analytics Dashboard",
    description: "Real-time insights into revenue, active projects, client activity, and business growth.",
    href: "#",
    cta: "See analytics",
    Icon: BarChart3,
    className: "md:col-span-2",
    background: (
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-violet/8 blur-3xl" />
    ),
  },
];

export default function FeatureBento() {
  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-violet">Features</p>
          <h2 className="display mt-2 text-4xl uppercase text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Everything you need.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From project creation to payment delivery — ORKA handles the
            workflow so you can focus on the work.
          </p>
        </div>

        <div className="mt-12">
          <BentoGrid>
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
