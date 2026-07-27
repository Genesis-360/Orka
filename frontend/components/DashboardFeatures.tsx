"use client";

import { useState } from "react";
import { LayoutDashboard, FolderKanban, ShieldCheck } from "lucide-react";
import { Safari } from "@/components/ui/safari";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "escrow", label: "Escrow & Payments", icon: ShieldCheck },
];

type TabId = (typeof tabs)[number]["id"];

const images: Record<TabId, string> = {
  dashboard: "/dashboard.png",
  projects: "",
  escrow: "/invoices-tab.jpeg",
};

export default function DashboardFeatures() {
  const [active, setActive] = useState<TabId>("dashboard");

  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            <span className="text-foreground">Stay productive and manage your work</span>
            <br className="hidden sm:block" />
            <span className="text-muted-foreground"> without leaving the dashboard.</span>
          </h3>

          <div className="flex gap-2" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-200 lg:px-5 lg:py-2 ${
                    isActive
                      ? "border-foreground bg-background text-foreground opacity-100"
                      : "border-border/60 bg-transparent text-muted-foreground opacity-70 hover:border-foreground/30 hover:text-foreground hover:opacity-100"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          {tabs.map(
            (tab) =>
              active === tab.id && (
                <div key={tab.id} className="animate-in fade-in duration-300">
                  <Safari
                    url={`orka.app / ${tab.id}`}
                    imageSrc={images[tab.id] || undefined}
                    mode="default"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
