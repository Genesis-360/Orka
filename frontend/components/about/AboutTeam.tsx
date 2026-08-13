import { RiLinkedinFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri";
import { Mail } from "lucide-react";
import Image from "next/image";

const founders = [
  {
    image: "/janvi.jpeg",
    name: "Janvi",
    role: "Co-founder & Builder",
    bio: "Full stack engineer and Web3 builder. Loves turning complex problems into simple products.",
    tweeter: "https://x.com/janvibuilds",
    linkedin: "https://www.linkedin.com/in/janvibuilds/",
    email: "janvisinghal10@gmail.com",
    github: "https://github.com/janvibuilds",
  },
  {
    image: "/siddhartha.jpg",
    name: "Siddharth",
    role: "Co-founder & Strategist",
    bio: "Product thinker and growth hacker. Focused on building systems that scale and last.",
    tweeter: "https://x.com/x0lg0n",
    linkedin: "https://www.linkedin.com/in/siddhartha-kunwar/",
    github: "https://github.com/x0lg0n",
    email: "kumarsiddharthakain@gmail.com",
  },
];

export default function AboutTeam() {
  return (
    <section id="team" className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-label text-violet">The humans</p>
          <h2 className="display mt-4 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The team behind{" "}
            <span className="text-violet">Orka.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Two builders who have lived the admin tax — and decided to
            eliminate it for everyone else.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {founders.map(({ image, name, role, bio, tweeter, linkedin, email, github }) => (
            <div
              key={name}
              className="group flex items-start gap-6 rounded-[28px] border border-border/50 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={image}
                  alt={name}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-xl font-bold text-foreground">{name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-violet">
                  {role}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {bio}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                  <a
                    href={tweeter}
                    className="text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-night"
                    aria-label={`${name} on X`}
                  >
                    <RiTwitterXFill size={16} />
                  </a>
                  {linkedin && (
                    <a
                      href={linkedin}
                      className="text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-night"
                      aria-label={`${name} on LinkedIn`}
                    >
                      <RiLinkedinFill size={16} />
                    </a>
                  )}
                  <a
                    href={github}
                    className="text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-night"
                    aria-label={`${name} on GitHub`}
                  >
                    <RiGithubFill size={16} />
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-night"
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