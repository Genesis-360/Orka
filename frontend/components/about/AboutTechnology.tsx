import {
  SiNextdotjs,
  SiPostgresql,
  SiRust,
  SiStellar,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function AboutTechnology() {
  const techStack = [
    { name: "Stellar", icon: SiStellar, cls: "bg-orange text-night", rotate: "-rotate-2" },
    { name: "Next.js", icon: SiNextdotjs, cls: "bg-coral", rotate: "rotate-1" },
    { name: "TypeScript", icon: SiTypescript, cls: "bg-violet", rotate: "-rotate-1" },
    { name: "Tailwind CSS", icon: SiTailwindcss, cls: "bg-teal text-night", rotate: "rotate-2" },
    { name: "Supabase", icon: SiSupabase, cls: "bg-lime text-night", rotate: "-rotate-2" },
    { name: "Rust", icon: SiRust, cls: "bg-orange", rotate: "rotate-2" },
    { name: "PostgreSQL", icon: SiPostgresql, cls: "bg-violet", rotate: "-rotate-1" },
  ];

  return (
    <section className="px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-night lg:rounded-[36px]">
        <div className="relative px-8 py-14 md:px-14 md:py-16">
          {/* Grid overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -right-24 -bottom-24 size-64 rounded-full bg-teal/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="section-label text-orange">Tech we build on</p>
              <h2 className="mt-4 display text-4xl uppercase leading-[1.05] text-white sm:text-5xl md:text-[3.4rem]">
                Modern. Scalable.
                <br />
                <span className="text-lime">Future-ready.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/60">
                A battle-tested stack: Stellar for settlement, Next.js on the
                edge, and smart contracts audited for real money.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {techStack.map(({ name, icon: Icon, cls, rotate }) => (
                <span
                  key={name}
                  className={`sticker flex select-none items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase shadow-hard ${cls} ${rotate} transition-transform duration-300 hover:scale-105`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}