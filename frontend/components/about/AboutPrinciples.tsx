import Reveal from "../motion/Reveal";

export default function AboutPrinciples() {
  const principles = [
    {
      num: "01",
      title: "Transparency",
      desc: "Open systems build real trust.",
      color: "bg-violet",
      dot: "bg-violet",
    },
    {
      num: "02",
      title: "Trust",
      desc: "Escrow, milestones and on-chain truth.",
      color: "bg-teal",
      dot: "bg-teal",
    },
    {
      num: "03",
      title: "Automation",
      desc: "Remove friction. Empower people.",
      color: "bg-orange",
      dot: "bg-orange",
    },
    {
      num: "04",
      title: "Simplicity",
      desc: "Powerful systems that are simple to use.",
      color: "bg-lime",
      dot: "bg-lime",
    },
    {
      num: "05",
      title: "Ownership",
      desc: "We build with long-term vision, not quick wins.",
      color: "bg-info",
      dot: "bg-info",
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
          {principles.map(({ num, title, desc, color, dot }, index) => (
            <Reveal key={num} delay={index * 0.07}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_14px_40px_-14px_rgba(8,32,51,0.18)]"
              >
                <span
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${color} transition-all duration-500 group-hover:h-1.5`}
                  aria-hidden="true"
                />
                <div className="display text-6xl leading-none text-night/8 transition-colors duration-300 group-hover:text-night/15">
                  {num}
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
                  <h3 className="font-semibold text-night">{title}</h3>
                </div>
                <p className="mt-1.5 text-sm leading-5 text-night/55">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}