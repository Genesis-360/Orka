import { RiLinkedinFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri";
import { Mail } from "lucide-react";

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
    <section id="team" className="px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
          The Humans
        </p>
        <h2 className="display text-4xl uppercase leading-[1.05] text-night sm:text-5xl">
          The team behind{" "}
          <span className="text-violet">Orka.</span>
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {founders.map(({ initial, name, role, bio, gradient, github }) => (
            <div
              key={name}
              className="flex items-start gap-5 rounded-3xl border border-border/50 bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div
                className={`size-20 shrink-0 rounded-full bg-gradient-to-br ${gradient} p-[2px]`}
              >
                <div className="flex size-full items-center justify-center rounded-full bg-white text-2xl font-bold text-night">
                  {initial}
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-bold text-night">{name}</h3>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-night/40">
                  {role}
                </p>
                <p className="mt-2 text-sm leading-5 text-night/55">
                  {bio}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="#"
                    className="text-night/25 transition-colors hover:text-violet"
                    aria-label={`${name} on X`}
                  >
                    <RiTwitterXFill size={16} />
                  </a>
                  <a
                    href="#"
                    className="text-night/25 transition-colors hover:text-violet"
                    aria-label={`${name} on LinkedIn`}
                  >
                    <RiLinkedinFill size={16} />
                  </a>
                  <a
                    href={github}
                    className="text-night/25 transition-colors hover:text-violet"
                    aria-label={`${name} on GitHub`}
                  >
                    <RiGithubFill size={16} />
                  </a>
                  <a
                    href="mailto:hello@orka.live"
                    className="text-night/25 transition-colors hover:text-violet"
                    aria-label={`${name} via email`}
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
