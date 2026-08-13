import Reveal from "../motion/Reveal";

export default function AboutMission() {
  const values = [
    {
      num: "01",
      title: "Transparent",
      desc: "Clear flows and open systems. No hidden fees, ever.",
      accent: "text-violet",
      bar: "bg-violet",
    },
    {
      num: "02",
      title: "Automated",
      desc: "We automate the boring, so you can focus on growth.",
      accent: "text-orange",
      bar: "bg-orange",
    },
    {
      num: "03",
      title: "Secure",
      desc: "On-chain security with enterprise-grade infrastructure.",
      accent: "text-teal",
      bar: "bg-teal",
    },
    {
      num: "04",
      title: "Fair",
      desc: "Fair escrows. Fair releases. Fair for everyone.",
      accent: "text-lime",
      bar: "bg-lime",
    },
  ];

  return (
    <section id="mission" className="px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night">
        <div className="relative px-8 py-12 md:px-14 md:py-16">
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
                Freelancers and agencies shouldn&apos;t need spreadsheets
                to run a project. Orka brings escrow, milestones
                and settlements on-chain — simple, transparent,
                and built for the real world.
              </p>
            </div>

            {/* Right — Values grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map(({ num, title, desc, accent, bar }, index) => (
                <Reveal key={num} delay={index * 0.08}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <span
                      className={`pointer-events-none absolute inset-y-0 left-0 w-1 ${bar} transition-all duration-500 group-hover:w-1.5`}
                      aria-hidden="true"
                    />
                    <div className={`display text-4xl leading-none ${accent} opacity-60`}>
                      {num}
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-white/50">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}