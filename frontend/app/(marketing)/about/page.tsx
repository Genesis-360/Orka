import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Workflow, Globe, Eye, Heart, Cpu, Leaf, Quote } from "lucide-react";
import { RiLinkedinFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri";
import { Safari } from "@/components/ui/safari";
import { AvatarCircles } from "@/components/ui/avatar-circles";

export const metadata: Metadata = {
  title: "About ORKA",
  description:
    "ORKA is the autonomous financial operating system for the global service economy — Web2 UX, AI-driven operations, and Stellar/Soroban infrastructure underneath.",
};

const differences = [
  {
    icon: Sparkles,
    title: "AI First",
    desc: "Generate proposals, contracts and invoices instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Powered",
    desc: "Escrow and milestone payments secured on Stellar.",
  },
  {
    icon: Workflow,
    title: "Everything Connected",
    desc: "Every workflow starts from one project.",
  },
  {
    icon: Globe,
    title: "Built for Global Work",
    desc: "Cross-border payments, transparent records and faster settlements.",
  },
];

const values = [
  { icon: Eye, title: "Transparency", desc: "Everyone sees the same project status." },
  { icon: Heart, title: "Trust", desc: "Funds stay secure until milestones are completed." },
  { icon: Cpu, title: "Automation", desc: "Less admin. More actual work." },
  { icon: Leaf, title: "Simplicity", desc: "One platform. Not ten." },
];

const stats = [
  { value: "50+", label: "Agencies building on ORKA" },
  { value: "AI", label: "Powered Workflows" },
  { value: "Stellar", label: "Secure Settlements" },
  { value: "2026", label: "Launch Year" },
];

const founders = [
  {
    initial: "J",
    name: "Janhvi",
    role: "Co-Founder",
    bio: "Building the future of service business operations. Passionate about removing friction from cross-border work.",
    gradient: "from-violet to-orange",
  },
  {
    initial: "S",
    name: "Siddharth",
    role: "Co-Founder",
    bio: "Engineer and builder. Focused on making blockchain infrastructure invisible so users never have to think about it.",
    gradient: "from-teal to-lime",
  },
];

const faqItems = [
  {
    q: "Why blockchain?",
    a: "Blockchain provides a neutral, programmable third party for escrow and payment settlements. Funds are locked in a smart contract, not a company bank account, so neither party can unilaterally change the terms after work starts.",
  },
  {
    q: "Why Stellar?",
    a: "Stellar is built for payments — fast settlement (3-5 seconds), low fees (fractions of a cent), built-in decentralized exchange for currency conversion, and the Soroban smart contract platform that lets us build programmable escrow.",
  },
  {
    q: "Is Orka only for agencies?",
    a: "No. Orka works for freelancers, independent experts, studios, agencies, and any service business that manages projects, deliverables, and payments across borders.",
  },
  {
    q: "Is escrow mandatory?",
    a: "For on-chain payment flows, yes — escrow is the default. It protects both parties: clients fund milestones upfront, and funds only release when work is approved.",
  },
  {
    q: "When are you launching?",
    a: "We're in private beta with design partners. Sign up for the waitlist to get early access and be the first to know when we launch publicly.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper">

      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden rounded-b-[42px] bg-night px-4 pb-16 pt-5 text-white md:rounded-b-[72px] md:px-8 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-5xl pt-16 pb-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/8 px-3 py-1.5 text-[13px] font-medium text-white/80 sm:text-[14px]">
              <span className="rounded-full bg-violet px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">New</span>
              Building the future of service work
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-white/40">
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-widest">About</span>
            <span className="h-px w-12 bg-white/10" />
          </div>

          <h1 className="display mx-auto mt-6 max-w-5xl text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4.4rem] md:text-[6rem]">
            Building the financial <span className="text-orange">operating system</span> for service businesses.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-7 text-white/78 sm:text-lg sm:leading-8">
            Orka helps freelancers, agencies, and service businesses automate proposals,
            contracts, escrow, milestone payments, invoices, and financial operations — all
            from one platform powered by AI and blockchain.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-violet px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#a78cff] hover:-translate-y-0.5">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white/80 transition-all hover:bg-white/8 hover:text-white hover:-translate-y-0.5">
              Explore Platform
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 animate-in fade-in duration-700 dark"
          style={{
            maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        >
          <Safari url="orka.app / dashboard" imageSrc="/dashboard.png" mode="default" />
        </div>

        <div className="mx-auto mt-[-10px] flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:flex-row lg:justify-between lg:items-end lg:text-left relative z-10">
          <div className="flex items-center gap-4">
            <AvatarCircles numPeople={50} avatarUrls={[
              { imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80", profileUrl: "#" },
              { imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=160&q=80", profileUrl: "#" },
              { imageUrl: "https://images.unsplash.com/photo-1500649297466-74794c70acfc?w=160&q=80", profileUrl: "#" },
            ]} />
            <div className="text-left">
              <p className="text-lg font-bold text-white">50+ agencies building on ORKA</p>
              <p className="text-base text-white/50">From freelancers to enterprise</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Our Story ─── */}
      <section className="px-4 py-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-4">Our Story</p>
          <h2 className="text-4xl font-bold tracking-tight text-night sm:text-5xl">
            We started Orka to kill the admin tax.
          </h2>
          <div className="mx-auto mt-8 space-y-6 text-left text-base leading-8 text-night/70 sm:text-lg">
            <p>
              Freelancers and agencies shouldn&apos;t need seven tools to run one project. Proposals in
              Google Docs, contracts in PDFs, payments through banks, invoices in a separate tool,
              and a spreadsheet just to track where everything stands.
            </p>
            <p>
              Managing work became almost harder than doing the work. So we built Orka — one
              intelligent workflow that connects every step from proposal to payment.
            </p>
            <p className="text-night/90 font-semibold">
              Our mission: make running a service business as simple as managing a single project.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. Stats ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-night/8 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <p className="text-3xl font-bold text-night sm:text-4xl">{value}</p>
                <p className="mt-2 text-sm font-medium text-night/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. What Makes Orka Different ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-4">What Makes Orka Different</p>
            <h2 className="text-4xl font-bold tracking-tight text-night sm:text-5xl">
              Built differently from the ground up.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differences.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-night/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-violet/10 text-violet">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-night">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-night/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Our Values ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-4">Our Values</p>
            <h2 className="text-4xl font-bold tracking-tight text-night sm:text-5xl">
              The principles that guide every decision.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-night/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-lime/10 text-lime-700">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-night">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-night/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Built on Stellar ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night">
          <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
          <div className="grid gap-10 px-8 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:px-14 md:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Built on Stellar</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Enterprise-grade settlement infrastructure.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">
                Orka runs on the Stellar network — a decentralized, open-source blockchain designed
                for global payments. Every escrow, milestone release, and settlement is secured by the
                same infrastructure that processes billions of dollars annually.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Secure Payments", "Fast Settlement", "Low Fees", "Programmable Escrow", "Global Reach"].map((item) => (
                  <span key={item} className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex size-40 items-center justify-center rounded-full border-2 border-white/15 bg-white/5 sm:size-52">
                <span className="text-4xl font-bold text-white/80 sm:text-5xl">Stellar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Meet the Founders ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-4">Meet the Founders</p>
          <h2 className="text-4xl font-bold tracking-tight text-night sm:text-5xl">
            The team behind Orka.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {founders.map(({ initial, name, role, bio, gradient }) => (
              <div key={name} className="rounded-2xl border border-night/8 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className={`mx-auto size-24 rounded-full bg-gradient-to-br ${gradient} p-1`}>
                  <div className="flex size-full items-center justify-center rounded-full bg-white text-3xl font-bold text-night">
                    {initial}
                  </div>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-night">{name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-night/40">{role}</p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-night/60">{bio}</p>
                <div className="mt-5 flex items-center justify-center gap-4">
                  <a href="#" className="rounded-lg p-2 text-night/30 transition-all hover:text-violet">
                    <RiLinkedinFill size={18} />
                  </a>
                  <a href="#" className="rounded-lg p-2 text-night/30 transition-all hover:text-violet">
                    <RiTwitterXFill size={18} />
                  </a>
                  <a href={name === "Siddharth" ? "https://github.com/x0lg0n" : "#"} className="rounded-lg p-2 text-night/30 transition-all hover:text-violet">
                    <RiGithubFill size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-4">FAQ</p>
            <h2 className="text-4xl font-bold tracking-tight text-night sm:text-5xl">
              Common questions.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-night/60">
              Everything you want to know about Orka, blockchain, and what we&apos;re building.
            </p>
          </div>

          <div className="mt-10 divide-y divide-night/8">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group py-5 open:pb-8">
                <summary className="flex cursor-pointer items-start gap-4">
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-night text-white transition-all duration-500 group-open:rotate-45 group-open:bg-violet">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                  </span>
                  <span className="text-lg font-semibold leading-7 text-night transition-colors group-open:text-violet">
                    {q}
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] transition-all duration-500 group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 text-base leading-7 text-night/60 max-w-2xl">{a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Final CTA ─── */}
      <section className="px-4 pb-24 md:px-8 lg:px-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night text-center">
          <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-60 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 px-8 py-16 md:px-14 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">Get Started</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to spend less time managing work?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
              Run proposals, contracts, escrow, invoices, and payments from one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup" className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-white px-8 py-3.5 text-base font-bold text-night transition-all hover:bg-lime hover:-translate-y-0.5">
                Join Waitlist <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
