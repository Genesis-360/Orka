# About Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing About page with a completely new editorial-style page that extends the Orka landing page's design system.

**Architecture:** 8 section components in `components/about/`, composed by a clean `page.tsx`. Alternating cream/navy visual rhythm. No changes to landing page, navbar, footer, or other routes.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4 (CSS-first), lucide-react, react-icons, framer-motion (already installed), existing shadcn/ui Button component.

## Global Constraints

- Cream background: `bg-paper` (#fffaf2)
- Dark navy: `bg-night` (#082033)
- Purple accent: `text-violet` (#9474ff)
- Orange accent: `text-orange` (#ff8a22)
- Green/lime: `text-lime` (#eaff35) / `bg-lime`
- Teal: `text-teal` (#22bd93)
- Display font: `.display` class (Anton)
- Body font: DM Sans (default)
- Rounded corners: `rounded-3xl` for sections, `rounded-2xl` for cards
- Max width: `max-w-6xl` or `max-w-5xl` for content containers
- No changes to landing page, navbar, footer, or other routes
- Reuse existing `Button` from `components/ui/button.tsx`
- Reuse lucide-react icons (already installed)
- Reuse react-icons for social links (already installed)

---

### Task 1: Create AboutHero component

**Files:**
- Create: `frontend/components/about/AboutHero.tsx`

**Interfaces:**
- Consumes: None (first component)
- Produces: `<AboutHero />` export used by page.tsx

- [ ] **Step 1: Create the about components directory**

```bash
mkdir -p frontend/components/about
```

- [ ] **Step 2: Create AboutHero.tsx**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative px-4 pt-20 pb-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          {/* Left — Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-6">
              About Orka
            </p>
            <h1 className="display text-5xl uppercase leading-[1.05] text-night sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              The why
              <br />
              behind{" "}
              <span className="text-violet">Orka.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-night/70 sm:text-lg sm:leading-8">
              Orka is the financial operating system for service businesses —
              built to simplify payments, escrow, milestones, and settlements
              on Stellar.
            </p>
            <p className="mt-3 text-sm font-medium text-night/50">
              Transparent. Automated. Built for scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#mission"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-violet px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#a78cff] hover:-translate-y-0.5"
              >
                Our Mission <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-night/15 px-7 py-3 text-sm font-bold text-night transition-all hover:bg-night/5 hover:-translate-y-0.5"
              >
                Explore Product
              </Link>
            </div>
          </div>

          {/* Right — Identity composition */}
          <div className="relative flex items-center justify-center">
            {/* Orbit ring */}
            <div className="absolute size-56 rounded-full border-2 border-dashed border-violet/20 sm:size-64 md:size-72" />

            {/* Logo center */}
            <div className="relative z-10 flex size-28 items-center justify-center rounded-full bg-white shadow-lg sm:size-32">
              <Image
                src="/Logo/logo.svg"
                alt="Orka"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-2 right-0 z-20 max-w-[200px] rounded-2xl border border-border/50 bg-white p-4 shadow-sm float-1 sm:-top-4 sm:right-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-teal" />
                <span className="text-xs font-bold text-night">
                  Built on Stellar
                </span>
              </div>
              <p className="text-xs leading-5 text-night/60">
                Fast, low-cost and borderless payments.
              </p>
            </div>

            {/* Floating card — left */}
            <div className="absolute -left-4 top-1/2 z-20 max-w-[190px] -translate-y-1/2 rounded-2xl border border-border/50 bg-white p-4 shadow-sm float-2 sm:-left-8">
              <span className="text-xs font-bold text-night">
                For Service Businesses
              </span>
              <p className="mt-1 text-xs leading-5 text-night/60">
                Freelancers, agencies and their clients.
              </p>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -bottom-2 right-0 z-20 max-w-[200px] rounded-2xl border border-border/50 bg-white p-4 shadow-sm float-3 sm:-bottom-4 sm:right-2">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-violet" />
                <span className="text-xs font-bold text-night">
                  Our Mission
                </span>
              </div>
              <p className="text-xs leading-5 text-night/60">
                Eliminate admin tax and bring fairness to payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify the component compiles**

Run: `cd frontend && pnpm build 2>&1 | head -30`
Expected: No errors related to AboutHero (page.tsx doesn't import it yet, so no build impact)

- [ ] **Step 4: Commit**

```bash
git add frontend/components/about/AboutHero.tsx
git commit -m "feat(about): add AboutHero section component"
```

---

### Task 2: Create AboutStats component

**Files:**
- Create: `frontend/components/about/AboutStats.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutStats />` export used by page.tsx

- [ ] **Step 1: Create AboutStats.tsx**

```tsx
export default function AboutStats() {
  const stats = [
    { value: "50+", label: "Early Users" },
    { value: "$120K+", label: "Value Locked (Testnet)" },
    { value: "2.5K+", label: "Transactions" },
    { value: "10+", label: "Integrations" },
    { value: "2026", label: "Mainnet Vision" },
  ];

  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
          Orka in Numbers
        </p>
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border/50 bg-white px-8 py-10 shadow-sm sm:grid-cols-3 md:grid-cols-5">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1
                  ? "border-r border-border/30 max-sm:border-r-0 max-sm:border-b max-sm:pb-6 max-sm:last:border-b-0 max-sm:last:pb-0 md:border-r md:last:border-r-0"
                  : ""
              }`}
            >
              <span className="display text-3xl text-night sm:text-4xl">
                {value}
              </span>
              <span className="mt-1.5 text-xs text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutStats.tsx
git commit -m "feat(about): add AboutStats section component"
```

---

### Task 3: Create AboutMission component

**Files:**
- Create: `frontend/components/about/AboutMission.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutMission />` export used by page.tsx

- [ ] **Step 1: Create AboutMission.tsx**

```tsx
import { Eye, Zap, Shield, Heart } from "lucide-react";

export default function AboutMission() {
  const principles = [
    {
      icon: Eye,
      title: "Transparent",
      desc: "Clear flows and open systems.",
      color: "text-violet",
      bg: "bg-violet/10",
    },
    {
      icon: Zap,
      title: "Automated",
      desc: "Remove repetitive financial work.",
      color: "text-orange",
      bg: "bg-orange/10",
    },
    {
      icon: Shield,
      title: "Secure",
      desc: "Built on reliable financial infrastructure.",
      color: "text-teal",
      bg: "bg-teal/10",
    },
    {
      icon: Heart,
      title: "Fair",
      desc: "Better payment experiences for service businesses.",
      color: "text-lime",
      bg: "bg-lime/15",
    },
  ];

  return (
    <section id="mission" className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night">
        <div className="relative px-8 py-14 md:px-14 md:py-20">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            {/* Left — Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                Our Mission
              </p>
              <h2 className="mt-3 display text-4xl uppercase leading-[1.05] text-white sm:text-5xl md:text-[3.4rem]">
                We started Orka
                <br />
                to kill the{" "}
                <span className="text-orange">admin tax.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/60">
                Freelancers and agencies shouldn&apos;t need spreadsheets,
                scattered payment tools, manual reconciliation, and endless
                follow-ups just to get paid. Orka brings payments, escrow,
                milestones, reconciliation, and settlement into one financial
                operating system.
              </p>
            </div>

            {/* Right — Principles grid */}
            <div className="grid grid-cols-2 gap-6">
              {principles.map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="flex gap-3">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${bg}`}
                  >
                    <Icon size={18} className={color} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-white/50">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutMission.tsx
git commit -m "feat(about): add AboutMission section component"
```

---

### Task 4: Create AboutJourney component

**Files:**
- Create: `frontend/components/about/AboutJourney.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutJourney />` export used by page.tsx

- [ ] **Step 1: Create AboutJourney.tsx**

```tsx
"use client";

export default function AboutJourney() {
  const events = [
    {
      year: "2023",
      title: "The Spark",
      desc: "Faced real payment chaos while working with freelancers.",
    },
    {
      year: "2024",
      title: "Building Orka",
      desc: "Shipped testnet, built core flows, got our first users.",
    },
    {
      year: "2025",
      title: "Growing Together",
      desc: "Onboarded agencies, improved product, strong community.",
    },
    {
      year: "2026",
      title: "What's Next",
      desc: "Mainnet launch, more automations, global scale.",
      current: true,
    },
  ];

  return (
    <section className="px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
          Our Journey
        </p>
        <h2 className="display text-4xl uppercase leading-[1.05] text-night sm:text-5xl">
          From an idea to something{" "}
          <span className="text-violet">real.</span>
        </h2>

        {/* Desktop — horizontal timeline */}
        <div className="relative mt-14 hidden md:block">
          {/* Line */}
          <div className="absolute left-0 right-0 top-[5px] h-px bg-border" />

          <div className="grid grid-cols-4 gap-8">
            {events.map(({ year, title, desc, current }) => (
              <div key={year} className="relative">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-0 size-3 rounded-full border-2 border-paper ${
                    current
                      ? "bg-lime shadow-[0_0_0_4px_rgba(234,255,53,0.25)]"
                      : "bg-violet"
                  }`}
                />

                <div className="pt-8">
                  <span className="font-mono text-xs text-violet">{year}</span>
                  <h3 className="mt-2 font-semibold text-night">{title}</h3>
                  <p className="mt-1.5 text-sm leading-5 text-night/55">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="relative mt-10 md:hidden">
          <div className="absolute bottom-0 top-0 left-[5px] w-px bg-border" />

          <div className="space-y-8">
            {events.map(({ year, title, desc, current }) => (
              <div key={year} className="relative flex gap-5">
                <div
                  className={`relative z-10 mt-1 size-3 shrink-0 rounded-full border-2 border-paper ${
                    current
                      ? "bg-lime shadow-[0_0_0_4px_rgba(234,255,53,0.25)]"
                      : "bg-violet"
                  }`}
                />
                <div>
                  <span className="font-mono text-xs text-violet">{year}</span>
                  <h3 className="mt-1 font-semibold text-night">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-night/55">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live status card — desktop only */}
        <div className="mt-12 hidden justify-end md:flex">
          <div className="max-w-xs rounded-2xl border border-border/50 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs text-night/40">// live status</span>
              <span className="size-1.5 rounded-full bg-teal" />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-night/40">
              Currently building
            </p>
            <p className="text-lg font-bold text-night">Orka</p>
            <p className="text-xs text-night/50">
              Influencer OS &amp; Escrow on Stellar
            </p>
            <div className="my-3 h-px bg-border/50" />
            <p className="text-[11px] uppercase tracking-wider text-night/40">
              Learning
            </p>
            <p className="text-lg font-bold text-night">Midnight</p>
            <p className="text-xs text-night/50">
              Privacy-first smart contracts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutJourney.tsx
git commit -m "feat(about): add AboutJourney section component"
```

---

### Task 5: Create AboutPrinciples component

**Files:**
- Create: `frontend/components/about/AboutPrinciples.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutPrinciples />` export used by page.tsx

- [ ] **Step 1: Create AboutPrinciples.tsx**

```tsx
import { Eye, Heart, Zap, Sparkles, Shield } from "lucide-react";

export default function AboutPrinciples() {
  const principles = [
    {
      num: "01",
      icon: Eye,
      title: "Transparency",
      desc: "Open systems build real trust.",
      color: "text-violet",
    },
    {
      num: "02",
      icon: Heart,
      title: "Trust",
      desc: "Escrow, milestones and on-chain truth.",
      color: "text-teal",
    },
    {
      num: "03",
      icon: Zap,
      title: "Automation",
      desc: "Remove friction. Empower people.",
      color: "text-orange",
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Simplicity",
      desc: "Powerful systems that are simple to use.",
      color: "text-lime",
    },
    {
      num: "05",
      icon: Shield,
      title: "Ownership",
      desc: "We build with long-term vision, not quick wins.",
      color: "text-violet",
    },
  ];

  return (
    <section className="px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
          What We Believe In
        </p>
        <h2 className="display text-4xl uppercase leading-[1.05] text-night sm:text-5xl">
          Principles that{" "}
          <span className="text-violet">guide</span> every decision.
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map(({ num, icon: Icon, title, desc, color }) => (
            <div
              key={num}
              className="rounded-2xl border border-border/50 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <span className="font-mono text-[11px] text-night/30">
                {num}
              </span>
              <Icon size={20} className={`mt-3 ${color}`} />
              <h3 className="mt-4 font-semibold text-night">{title}</h3>
              <p className="mt-1.5 text-sm leading-5 text-night/55">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutPrinciples.tsx
git commit -m "feat(about): add AboutPrinciples section component"
```

---

### Task 6: Create AboutTechnology component

**Files:**
- Create: `frontend/components/about/AboutTechnology.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutTechnology />` export used by page.tsx

- [ ] **Step 1: Create AboutTechnology.tsx**

```tsx
export default function AboutTechnology() {
  const techStack = [
    { name: "Stellar", icon: "★" },
    { name: "Next.js", icon: "N" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind CSS", icon: "TW" },
    { name: "Supabase", icon: "S" },
    { name: "Node.js", icon: "JS" },
    { name: "PostgreSQL", icon: "PG" },
  ];

  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night">
        <div className="relative px-8 py-14 md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 size-64 rounded-full bg-teal/8 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                Tech We Build On
              </p>
              <h2 className="mt-3 display text-4xl uppercase leading-[1.05] text-white sm:text-5xl">
                Modern. Scalable.
                <br />
                <span className="text-lime">Future-ready.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {techStack.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5"
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-[11px] font-bold text-white">
                    {icon}
                  </span>
                  <span className="text-sm font-medium text-white/80">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutTechnology.tsx
git commit -m "feat(about): add AboutTechnology section component"
```

---

### Task 7: Create AboutTeam component

**Files:**
- Create: `frontend/components/about/AboutTeam.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutTeam />` export used by page.tsx

- [ ] **Step 1: Create AboutTeam.tsx**

```tsx
import { RiLinkedinFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri";

const founders = [
  {
    initial: "J",
    name: "Janvi",
    role: "Co-founder & Builder",
    bio: "Full stack engineer and Web3 builder. Loves turning complex problems into simple products.",
    gradient: "from-violet to-orange",
    github: "#",
  },
  {
    initial: "S",
    name: "Siddharth",
    role: "Co-founder & Strategist",
    bio: "Product thinker and growth hacker. Focused on building systems that scale and last.",
    gradient: "from-teal to-lime",
    github: "https://github.com/x0lg0n",
  },
];

export default function AboutTeam() {
  return (
    <section className="px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
          The Humans
        </p>
        <h2 className="display text-4xl uppercase leading-[1.05] text-night sm:text-5xl">
          The team behind{" "}
          <span className="text-violet">Orka.</span>
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {founders.map(({ initial, name, role, bio, gradient, github }) => (
            <div
              key={name}
              className="rounded-3xl border border-border/50 bg-white p-8 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div
                className={`size-20 rounded-full bg-gradient-to-br ${gradient} p-[2px]`}
              >
                <div className="flex size-full items-center justify-center rounded-full bg-white text-2xl font-bold text-night">
                  {initial}
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold text-night">{name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-night/40">
                {role}
              </p>
              <p className="mt-3 text-sm leading-6 text-night/55">{bio}</p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="#"
                  className="text-night/25 transition-colors hover:text-violet"
                  aria-label={`${name} on X`}
                >
                  <RiTwitterXFill size={18} />
                </a>
                <a
                  href="#"
                  className="text-night/25 transition-colors hover:text-violet"
                  aria-label={`${name} on LinkedIn`}
                >
                  <RiLinkedinFill size={18} />
                </a>
                <a
                  href={github}
                  className="text-night/25 transition-colors hover:text-violet"
                  aria-label={`${name} on GitHub`}
                >
                  <RiGithubFill size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutTeam.tsx
git commit -m "feat(about): add AboutTeam section component"
```

---

### Task 8: Create AboutCTA component

**Files:**
- Create: `frontend/components/about/AboutCTA.tsx`

**Interfaces:**
- Consumes: None
- Produces: `<AboutCTA />` export used by page.tsx

- [ ] **Step 1: Create AboutCTA.tsx**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="px-4 pb-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night">
        <div className="relative px-8 py-16 text-center md:px-14 md:py-20">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 size-60 rounded-full bg-orange/8 blur-3xl"
            aria-hidden="true"
          />

          {/* Orbit decoration — right side */}
          <div
            className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-20 md:block"
            aria-hidden="true"
          >
            <div className="size-48 rounded-full border border-white/20" />
            <div className="absolute inset-4 rounded-full border border-white/15" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Let&apos;s Build the Future
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl display text-4xl uppercase leading-[1.05] text-white sm:text-5xl md:text-[3.4rem]">
              Ready to automate
              <br />
              your{" "}
              <span className="text-orange">financial</span>
              <br />
              operations?
            </h2>
            <div className="mt-8">
              <Link
                href="/signup"
                className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-lime px-8 py-3.5 text-base font-bold text-night transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Started{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/about/AboutCTA.tsx
git commit -m "feat(about): add AboutCTA section component"
```

---

### Task 9: Rewrite the About page to compose all sections

**Files:**
- Rewrite: `frontend/app/(marketing)/about/page.tsx`

**Interfaces:**
- Consumes: All 8 section components from `@/components/about/*`
- Produces: The complete About page

- [ ] **Step 1: Replace the entire about/page.tsx**

```tsx
import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutMission from "@/components/about/AboutMission";
import AboutJourney from "@/components/about/AboutJourney";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutTechnology from "@/components/about/AboutTechnology";
import AboutTeam from "@/components/about/AboutTeam";
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
      <AboutCTA />
    </div>
  );
}
```

- [ ] **Step 2: Run build to verify**

Run: `cd frontend && pnpm build 2>&1 | tail -20`
Expected: Build succeeds with no errors

- [ ] **Step 3: Run lint to verify**

Run: `cd frontend && pnpm lint`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add frontend/app/\(marketing\)/about/page.tsx
git commit -m "feat(about): replace about page with new editorial design"
```

---

### Task 10: Add prefers-reduced-motion support for about page animations

**Files:**
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: Existing CSS animation keyframes (`float-y`, `float-bob`)
- Produces: Reduced-motion rules for about page float classes

- [ ] **Step 1: Check if reduced-motion already covers float classes**

The existing `@media (prefers-reduced-motion: reduce)` block at line 364 already disables `.float-1` through `.float-5`. The AboutHero uses these same classes, so no additional CSS is needed.

- [ ] **Step 2: Skip — no changes required**

The existing reduced-motion rules already cover the float animations used in AboutHero. No additional CSS modifications needed.

- [ ] **Step 3: Final build + lint verification**

Run: `cd frontend && pnpm build 2>&1 | tail -10 && pnpm lint`
Expected: Both pass cleanly

---

### Task 11: Final verification

- [ ] **Step 1: Verify landing page is untouched**

Run: `cd frontend && git diff app/page.tsx`
Expected: No changes

- [ ] **Step 2: Verify footer is untouched**

Run: `cd frontend && git diff components/Footer.tsx`
Expected: No changes

- [ ] **Step 3: Verify navbar is untouched**

Run: `cd frontend && git diff components/Navbar.tsx`
Expected: No changes

- [ ] **Step 4: Verify no duplicate footer created**

Run: `find frontend/components -name "*footer*" -o -name "*Footer*" | grep -i about`
Expected: No results

- [ ] **Step 5: Full build**

Run: `cd frontend && pnpm build`
Expected: Build succeeds

- [ ] **Step 6: Full lint**

Run: `cd frontend && pnpm lint`
Expected: No errors
