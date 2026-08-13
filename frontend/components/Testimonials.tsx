"use client";

import { motion, MotionConfig } from "framer-motion";
import { MessageCircle, Users } from "lucide-react";
import { RiDiscordFill, RiGithubFill, RiTwitterXFill } from "react-icons/ri";
import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { testimonials } from "@/lib/content/testimonials";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const sourceIcon: Record<string, React.ReactNode> = {
  Discord: <RiDiscordFill size={12} />,
  GitHub: <RiGithubFill size={12} />,
  X: <RiTwitterXFill size={12} />,
};

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label text-coral">Community</p>
            <h2 className="display mt-3 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Join the community.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover what our community has to say about their ORKA experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://discord.gg/KbW5pPCDyY"
                className="inline-flex items-center gap-2 rounded-md bg-violet px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a78cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet/50"
              >
                <RiDiscordFill size={16} />
                Join us on Discord
              </a>
              <a
                href="https://x.com/get_orka"
                className="inline-flex items-center gap-2 rounded-md border border-border/70 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet/50"
              >
                <RiTwitterXFill size={16} />
                Follow on X
              </a>
            </div>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]"
          >
            {testimonials.map((item, i) =>
              item.type === "tweet" ? (
                <motion.div
                  key={`tweet-${item.id}`}
                  variants={cardVariants}
                  className="mb-4 break-inside-avoid"
                >
                  <ClientTweetCard
                    id={item.id}
                    className="rounded-2xl border-2 border-night/8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:shadow-lg"
                  />
                </motion.div>
              ) : (
                <motion.figure
                  key={`quote-${item.name}-${i}`}
                  variants={cardVariants}
                  className="mb-4 flex flex-col justify-between rounded-2xl border-2 border-night/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:shadow-lg break-inside-avoid"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <MessageCircle size={24} className="text-violet/40" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-night/10 bg-bone px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-night/60">
                        {sourceIcon[item.source] ?? <Users size={12} />}
                        {item.source}
                      </span>
                    </div>
                    <blockquote className="text-sm font-bold leading-6 text-night/80">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br text-xs font-black text-white ${
                        item.avatarColor ?? "from-violet to-orange"
                      }`}
                    >
                      {initialsOf(item.name)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-night">{item.name}</p>
                      <p className="text-xs text-night/50">{item.role}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              )
            )}
          </motion.div>

          <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
            <a
              href="https://x.com/search?q=%23orka&f=live"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-violet"
            >
              #orka on X
            </a>
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}