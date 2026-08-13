"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  FolderKanban,
  ShieldCheck,
  ExternalLink,
  Code2,
  FileText,
  BarChart3,
} from "lucide-react";
import { Bento3Tile1 } from "@/components/bento3-tile1";
import {
  AnalyticsVisual,
  ContractsVisual,
  InvoicingVisual,
  PortalVisual,
  ProjectVisual,
} from "@/components/bento-tiles";

type Tile = {
  icon: LucideIcon;
  title: string;
  desc: string;
  gauge?: boolean;
  visual?: "project" | "portal" | "contracts" | "invoicing" | "analytics";
};

const tiles: Tile[] = [
  {
    icon: FolderKanban,
    title: "Project Management",
    desc: "Organize tasks, milestones, and deliverables in one place with our intuitive project management tools.",
    visual: "project",
  },
  {
    icon: ShieldCheck,
    title: "Escrow Payments",
    desc: "Securely hold funds in escrow until project milestones are met, ensuring trust between parties.",
    gauge: true,
  },
  {
    icon: ExternalLink,
    title: "Client Portal",
    desc: "Provide clients with a branded portal to view project progress and approve work.",
    visual: "portal",
  },
  {
    icon: Code2,
    title: "Smart Contracts",
    desc: "Automate agreements, escrow, and payouts with Soroban contracts.",
    visual: "contracts",
  },
  {
    icon: FileText,
    title: "Invoicing & Billing",
    desc: "Create professional invoices and track payments from one dashboard.",
    visual: "invoicing",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Gain insights into your workflow and performance with our analytics tools.",
    visual: "analytics",
  },
];

const visuals = {
  project: ProjectVisual,
  portal: PortalVisual,
  contracts: ContractsVisual,
  invoicing: InvoicingVisual,
  analytics: AnalyticsVisual,
} as const;

export default function FeatureBento() {
  return (
    <section className="px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-violet">Features</p>
          <h2 className="display mt-3 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Everything you need.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From project creation to payment delivery — ORKA handles the
            workflow so you can focus on the work.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[22rem]">
          {tiles.map(({ icon: Icon, title, desc, gauge = false, visual }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-md lg:p-8"
            >
              <div className="grid h-40 place-items-center overflow-hidden">
                {gauge ? (
                  <Bento3Tile1 percentage={100} label="Escrow secured" />
                ) : (
                  (() => {
                    const Visual = visuals[visual as "project"];
                    return <Visual />;
                  })()
                )}
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                    <Icon size={16} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}