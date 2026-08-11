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
    <section className="px-4 py-10 md:px-8 lg:px-12">
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
