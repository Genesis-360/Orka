"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Rocket,
  Wallet,
  Users,
  Folder,
  CreditCard,
  ArrowRight,
  Sparkles,
  Check,
  FileText,
  Shield,
  BarChart3,
  Code,
  BookOpen,
  Headphones,
  MessageSquare,
  GitBranch,
  Settings,
  Zap,
  Search,
  Clock,
  TrendingUp,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { docsNavigation } from "@/lib/docs/config";

const quickStartItems = [
  {
    step: 1,
    title: "Create Workspace",
    description: "Set up your business hub in minutes.",
    icon: Zap,
    href: "/docs/start-here/create-workspace",
    color: "#9474ff",
  },
  {
    step: 2,
    title: "Connect Wallet",
    description: "Connect your wallet and choose currency.",
    icon: Wallet,
    href: "/docs/start-here/connect-wallet",
    color: "#22bd93",
  },
  {
    step: 3,
    title: "Invite Team",
    description: "Invite your team members.",
    icon: Users,
    href: "/docs/start-here/invite-team",
    color: "#3b82f6",
  },
  {
    step: 4,
    title: "Add Client",
    description: "Add your first client and their details.",
    icon: Users,
    href: "/docs/clients/add-client",
    color: "#ff8a22",
  },
  {
    step: 5,
    title: "Create Project",
    description: "Create your first project.",
    icon: Folder,
    href: "/docs/projects/create-project",
    color: "#9474ff",
  },
  {
    step: 6,
    title: "Get Paid",
    description: "Send invoices and get paid securely.",
    icon: CreditCard,
    href: "/docs/payments/generate-invoice",
    color: "#22bd93",
  },
];

const learningPaths = [
  {
    title: "Freelancer",
    description: "Perfect for solo founders and independent professionals.",
    icon: Rocket,
    color: "#9474ff",
    steps: [
      "Create Workspace",
      "Connect Wallet",
      "Add Client",
      "Generate Proposal",
      "Create Project",
      "Invoice Client",
      "Receive Payment",
    ],
    progress: "0% complete",
    totalSteps: "7 steps",
  },
  {
    title: "Agency",
    description: "Manage your agency, team and multiple clients efficiently.",
    icon: Users,
    color: "#3b82f6",
    steps: [
      "Create Workspace",
      "Invite Team",
      "Add Clients",
      "Create Projects",
      "Milestones",
      "Escrow",
      "Analytics",
    ],
    progress: "0% complete",
    totalSteps: "7 steps",
  },
  {
    title: "Developer",
    description: "Integrate Orka into your product or workflow using our API.",
    icon: Code,
    color: "#22bd93",
    steps: ["Authentication", "SDK", "API", "Webhooks", "Examples"],
    progress: "0% complete",
    totalSteps: "5 steps",
  },
  {
    title: "Client",
    description: "A dedicated experience for your clients.",
    icon: BookOpen,
    color: "#5f6b86",
    steps: [],
    progress: "Coming soon",
    totalSteps: "",
    disabled: true,
  },
];

const popularGuides = [
  {
    title: "How Escrow Works",
    description: "Understand escrow and release funds securely.",
    icon: Shield,
    href: "/docs/payments/escrow",
    color: "#ff8a22",
  },
  {
    title: "Getting Paid",
    description: "Everything about invoices and payments.",
    icon: CreditCard,
    href: "/docs/payments/generate-invoice",
    color: "#22bd93",
  },
  {
    title: "Create Your First Client",
    description: "Add and manage your clients in Orka.",
    icon: Users,
    href: "/docs/clients/add-client",
    color: "#3b82f6",
  },
  {
    title: "Generate Proposal",
    description: "Create professional proposals with AI.",
    icon: FileText,
    href: "/docs/ai/generate-proposal",
    color: "#9474ff",
  },
  {
    title: "Milestones",
    description: "Break projects into milestones and track.",
    icon: BarChart3,
    href: "/docs/projects/milestones",
    color: "#22bd93",
  },
  {
    title: "Invite Team",
    description: "Invite members and manage permissions.",
    icon: Users,
    href: "/docs/team/invite-members",
    color: "#3b82f6",
  },
];

const whatsNew = [
  {
    title: "AI Proposal Generator is here",
    description: "Create winning proposals in seconds with AI.",
    tag: "New",
    tagColor: "#22bd93",
  },
  {
    title: "Multi-currency payments",
    description: "Get paid in multiple currencies worldwide.",
    tag: "Improvement",
    tagColor: "#9474ff",
  },
  {
    title: "Team approvals for invoices",
    description: "Add approval workflows before sending invoices.",
    tag: "New",
    tagColor: "#22bd93",
  },
];

export default function DocsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // Trigger the Cmd+K search modal instead
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "k",
            metaKey: true,
          })
        );
      }
    },
    [searchQuery]
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#f5f3ff] px-8 py-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-start justify-between gap-12">
          <div className="max-w-2xl">
          <h1 className="text-[2.5rem] font-black leading-[1.08] tracking-tight text-[#082033] sm:text-[3rem] md:text-[3.5rem]">
            Everything you need to
            <br />
            run your service business
            <br />
            with Orka.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#5f6b86]">
            Step-by-step guides, best practices and resources to help you
            win clients, deliver great work and get paid — faster.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-lg">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6b86]/50"
              />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", {
                      key: "k",
                      metaKey: true,
                    })
                  )
                }
                className="w-full rounded-xl border border-black/[0.08] bg-[#f7f8fc] py-3.5 pl-11 pr-20 text-[14px] text-[#082033] outline-none transition-colors placeholder:text-[#5f6b86]/50 focus:border-[#9474ff]/40 focus:ring-2 focus:ring-[#9474ff]/10"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-black/[0.06] bg-white px-2 py-1 text-[11px] font-semibold text-[#5f6b86]">
                ⌘ K
              </kbd>
            </div>
          </form>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs/start-here/welcome-to-orka"
              className="inline-flex items-center gap-2 rounded-xl bg-[#9474ff] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#9474ff]/90 hover:shadow-lg hover:shadow-[#9474ff]/20"
            >
              Start Learning
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs/developers"
              className="inline-flex items-center gap-2 rounded-xl border border-[#082033]/10 px-5 py-2.5 text-[13px] font-bold text-[#082033] transition-all hover:border-[#082033]/20 hover:bg-black/[0.02]"
            >
              <Code size={14} />
              API &amp; SDK Docs
            </Link>
          </div>
          </div>

        {/* Dashboard Preview (decorative) */}
            <div className="pointer-events-none hidden shrink-0 lg:block">
              <div className="w-[260px] space-y-3">
            <div className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#5f6b86]">
                  Total Paid
                </span>
                <TrendingUp size={14} className="text-[#22bd93]" />
              </div>
              <p className="mt-1 text-[22px] font-black text-[#082033]">
                $125,430
              </p>
              <p className="text-[11px] font-medium text-[#22bd93]">
                +12% this month
              </p>
            </div>
            <div className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#5f6b86]">
                  Projects in Progress
                </span>
                <BarChart3 size={14} className="text-[#9474ff]" />
              </div>
              <p className="mt-1 text-[22px] font-black text-[#082033]">8</p>
              <p className="text-[11px] font-medium text-[#22bd93]">
                +2 this week
              </p>
            </div>
            <div className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#5f6b86]">
                  Recent Payment
                </span>
                <Star size={14} className="text-[#ff8a22]" />
              </div>
              <p className="mt-1 text-[22px] font-black text-[#082033]">
                $4,250
              </p>
              <p className="text-[11px] font-medium text-[#5f6b86]">
                From Acme Inc.
              </p>
            </div>
          </div>
          </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[22px] font-black text-[#082033]">
            Quick Start
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {quickStartItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.step}
                  href={item.href}
                  className="group relative rounded-xl border border-black/[0.06] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#9474ff]/20 hover:shadow-lg hover:shadow-[#9474ff]/[0.06]"
                >
                  <span
                    className="absolute -top-2 -left-2 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </span>
                  <span
                    className="grid size-9 place-items-center rounded-lg"
                    style={{ backgroundColor: `${item.color}12` }}
                  >
                    <Icon size={16} style={{ color: item.color }} />
                  </span>
                  <p className="mt-2.5 text-[12px] font-bold text-[#082033]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-[1.4] text-[#5f6b86]">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="border-t border-black/[0.06] bg-white px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-black text-[#082033]">
              Learning Paths
            </h2>
            <Link
              href="#"
              className="flex items-center gap-1 text-[12px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80"
            >
              View all paths
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.title}
                  className={`flex flex-col rounded-xl border border-black/[0.06] bg-[#fffaf2] p-5 transition-all ${
                    path.disabled
                      ? "opacity-60"
                      : "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="grid size-8 place-items-center rounded-lg"
                      style={{ backgroundColor: `${path.color}12` }}
                    >
                      <Icon size={15} style={{ color: path.color }} />
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-[#082033]">
                        {path.title}
                      </p>
                      {path.disabled && (
                        <span className="text-[10px] font-semibold text-[#5f6b86]">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] leading-[1.5] text-[#5f6b86]">
                    {path.description}
                  </p>
                  {path.steps.length > 0 && (
                    <div className="mt-3 flex-1 space-y-1.5">
                      {path.steps.map((step) => (
                        <div
                          key={step}
                          className="flex items-center gap-2 text-[11px] text-[#5f6b86]"
                        >
                          <Check size={11} className="text-[#22bd93]" />
                          {step}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3">
                    <span className="text-[10px] font-semibold text-[#5f6b86]">
                      {path.progress}
                    </span>
                    {path.totalSteps && (
                      <span className="text-[10px] font-semibold text-[#5f6b86]">
                        {path.totalSteps}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-black text-[#082033]">
              Popular Guides
            </h2>
            <Link
              href="#"
              className="flex items-center gap-1 text-[12px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80"
            >
              View all guides
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="group flex items-start gap-3.5 rounded-xl border border-black/[0.06] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#9474ff]/20 hover:shadow-lg hover:shadow-[#9474ff]/[0.06]"
                >
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-lg"
                    style={{ backgroundColor: `${guide.color}12` }}
                  >
                    <Icon size={16} style={{ color: guide.color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[#082033]">
                      {guide.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-[1.4] text-[#5f6b86]">
                      {guide.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#9474ff] opacity-0 transition-opacity group-hover:opacity-100">
                      Read Guide
                      <ArrowRight
                        size={10}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse Documentation */}
      <section className="border-t border-black/[0.06] bg-white px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-black text-[#082033]">
              Browse Documentation
            </h2>
            <Link
              href="#"
              className="flex items-center gap-1 text-[12px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80"
            >
              Explore all categories
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {docsNavigation.map((section) => {
              const Icon =
                {
                  rocket: Rocket,
                  users: Users,
                  folder: Folder,
                  wallet: Wallet,
                  sparkles: Sparkles,
                  people: Users,
                  settings: Settings,
                  code: Code,
                  book: BookOpen,
                }[section.icon] || Rocket;

              return (
                <Link
                  key={section.slug}
                  href={`/docs/${section.slug}`}
                  className="group flex items-center gap-3.5 rounded-xl border border-black/[0.06] bg-[#fffaf2] p-4 transition-all hover:-translate-y-0.5 hover:border-[#9474ff]/20 hover:shadow-lg hover:shadow-[#9474ff]/[0.06]"
                >
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-lg"
                    style={{ backgroundColor: `${section.color}12` }}
                  >
                    <Icon size={16} style={{ color: section.color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[#082033]">
                      {section.title}
                    </p>
                    <p className="text-[11px] font-medium text-[#5f6b86]">
                      {section.items.length} articles
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-[#5f6b86]/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#9474ff]"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-black text-[#082033]">
              What&apos;s New
            </h2>
            <Link
              href="/docs/resources/changelog"
              className="flex items-center gap-1 text-[12px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80"
            >
              View all updates
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            {whatsNew.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-bold text-[#082033]">
                      {item.title}
                    </p>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{
                        backgroundColor: `${item.tagColor}12`,
                        color: item.tagColor,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-[1.4] text-[#5f6b86]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help */}
      <section className="border-t border-black/[0.06] bg-[#f5f3ff] px-8 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#082033]">Need help?</h2>
            <div className="flex items-center gap-5">
              <a
                href="/contact"
                className="flex items-center gap-2 text-[13px] font-medium text-[#5f6b86] transition-colors hover:text-[#082033]"
              >
                <Headphones size={14} />
                Support
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-[13px] font-medium text-[#5f6b86] transition-colors hover:text-[#082033]"
              >
                <MessageSquare size={14} />
                Community
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-[13px] font-medium text-[#5f6b86] transition-colors hover:text-[#082033]"
              >
                <GitBranch size={14} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
