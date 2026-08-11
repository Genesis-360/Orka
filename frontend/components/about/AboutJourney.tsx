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
      desc: "Official launch, more automations, global scale.",
      current: true,
    },
  ];

  return (
    <section className="px-4 py-12 md:px-8 lg:px-12">
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


      </div>
    </section>
  );
}
