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
    <section className="px-4 py-12 md:px-8 lg:px-12">
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
