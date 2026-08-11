"use client";

import Link from "next/link";
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
  TrendingUp,
  Star,
} from "lucide-react";
import { docsNavigation } from "@/lib/docs/config";
import { learningPathFlows } from "@/lib/docs/config";
import { useDocsProgress } from "@/lib/docs/progress";
import DocsSearch from "@/components/docs/DocsSearch";
import { DocsNavToggle } from "@/components/docs/docs-nav";

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

function ContinueLearningProgress() {
  const { getSectionProgress, isLoaded } = useDocsProgress();

  if (!isLoaded) return null;

  const sections = ["start-here", "guides", "concepts", "clients", "projects", "payments", "ai", "team", "workspace", "developers", "resources"];
  let totalCompleted = 0;
  let totalItems = 0;

  for (const sectionSlug of sections) {
    const progress = getSectionProgress(sectionSlug);
    totalCompleted += progress.completed;
    totalItems += progress.total;
  }

  if (totalItems === 0) return null;

  const percent = Math.round((totalCompleted / totalItems) * 100);
  const isComplete = totalCompleted === totalItems;

  return (
    <section className="border-b border-black/[0.06] bg-[#fffaf2] px-8 py-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-6 rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm">
          <div className="flex-1">
            <p className="text-[14px] font-bold text-[#082033]">
              {isComplete ? "🎉 Documentation Complete" : "Continue Learning"}
            </p>
            <p className="mt-1 text-[13px] text-[#5f6b86]">
              {totalCompleted} / {totalItems} pages completed
            </p>
            <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className="h-full rounded-full bg-[#22bd93] transition-all duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2 text-[12px] font-bold text-[#22bd93]">
              {percent}%{!isComplete && " — Keep going!"}
            </p>
          </div>
          {isComplete && (
            <div className="text-[2rem]">🎉</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function DocsPage() {

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#071426] px-8 py-16 lg:px-12">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />
        {/* Soft color washes */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#9474ff]/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-[#22bd93]/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <DocsNavToggle />
          </div>
          <div className="flex items-start justify-between gap-12">
          <div className="max-w-2xl">
          <Link
            href="/docs/resources/changelog"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-bold text-white/80 backdrop-blur transition-colors hover:border-[#9474ff]/50 hover:text-white"
          >
            <Sparkles size={13} className="text-[#9474ff]" />
            What&apos;s new in ORKA
            <ArrowRight size={12} className="text-white/50" />
          </Link>
          <h1 className="mt-4 text-[2.5rem] font-black leading-[1.08] tracking-tight text-white sm:text-[3rem] md:text-[3.5rem]">
            Everything you need to
            <br />
            run your service business
            <br />
            with Orka.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
            Step-by-step guides, best practices and resources to help you
            win clients, deliver great work and get paid — faster.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-lg">
            <DocsSearch variant="dark" />
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs/start-here/create-workspace"
              className="inline-flex items-center gap-2 rounded-xl bg-[#9474ff] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#9474ff]/90 hover:shadow-lg hover:shadow-[#9474ff]/30"
            >
              Start Learning
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs/developers/sdk"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:border-white/30 hover:bg-white/5"
            >
              <Code size={14} />
              API &amp; SDK Docs
            </Link>
          </div>
          </div>

        {/* Dashboard Preview (decorative) */}
            <div className="pointer-events-none hidden shrink-0 lg:block">
              <div className="w-[260px] space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/50">
                  Total Paid
                </span>
                <TrendingUp size={14} className="text-[#22bd93]" />
              </div>
              <p className="mt-1 text-[22px] font-black text-white">
                $125,430
              </p>
              <p className="text-[11px] font-medium text-[#22bd93]">
                +12% this month
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/50">
                  Projects in Progress
                </span>
                <BarChart3 size={14} className="text-[#9474ff]" />
              </div>
              <p className="mt-1 text-[22px] font-black text-white">8</p>
              <p className="text-[11px] font-medium text-[#22bd93]">
                +2 this week
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/50">
                  Recent Payment
                </span>
                <Star size={14} className="text-[#ff8a22]" />
              </div>
              <p className="mt-1 text-[22px] font-black text-white">
                $4,250
              </p>
              <p className="text-[11px] font-medium text-white/50">
                From Acme Inc.
              </p>
            </div>
          </div>
          </div>
          </div>
        </div>
      </section>

      {/* Continue Learning Progress */}
      <ContinueLearningProgress />

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
                  className="group relative rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#9474ff]/20 hover:shadow-lg hover:shadow-[#9474ff]/[0.06]"
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
      <section className="border-t border-black/[0.06] bg-[#fffaf2] px-8 py-14 lg:px-12">
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
              const flow = learningPathFlows.find(
                (f) => f.title.toLowerCase() === path.title.toLowerCase()
              );
              const firstStepSlug = flow?.steps[0]?.slug;
              return (
                <div
                  key={path.title}
                  className={`flex flex-col rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all ${
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
                  <div className="mt-4 border-t border-black/[0.06] pt-3">
                    {firstStepSlug && !path.disabled ? (
                      <Link
                        href={`/docs/${firstStepSlug}`}
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80"
                      >
                        Start Path
                        <ArrowRight size={12} />
                      </Link>
                    ) : (
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
                  className="group flex items-start gap-3.5 rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#9474ff]/20 hover:shadow-lg hover:shadow-[#9474ff]/[0.06]"
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
      <section className="border-t border-black/[0.06] bg-[#fffaf2] px-8 py-14 lg:px-12">
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
                  href={`/docs/${section.slug}/${section.items[0].slug}`}
                  className="group flex items-center gap-3.5 rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#9474ff]/20 hover:shadow-lg hover:shadow-[#9474ff]/[0.06]"
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
                className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm"
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
      <section className="border-t border-black/[0.06] bg-[#9474ff] px-8 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[16px] font-bold text-white">
              Need help? We&apos;re here.
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="/contact"
                className="group flex items-center gap-2 text-[13px] font-medium text-white/85 transition-colors hover:text-white"
              >
                <Headphones size={14} className="transition-transform group-hover:scale-110" />
                Support
              </a>
              <a
                href="#"
                className="group flex items-center gap-2 text-[13px] font-medium text-white/85 transition-colors hover:text-white"
              >
                <MessageSquare size={14} className="transition-transform group-hover:scale-110" />
                Community
              </a>
              <a
                href="#"
                className="group flex items-center gap-2 text-[13px] font-medium text-white/85 transition-colors hover:text-white"
              >
                <GitBranch size={14} className="transition-transform group-hover:scale-110" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
