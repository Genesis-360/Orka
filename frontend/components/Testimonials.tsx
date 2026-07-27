"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { RiDiscordFill, RiTwitterXFill } from "react-icons/ri";
import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { testimonials } from "@/lib/content/testimonials";

const SHOW_COUNT = 9;
const ROTATE_INTERVAL = 8000;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffleArray(arr).slice(0, count);
}

export default function Testimonials() {
  const [visible, setVisible] = useState(() => pickRandom(testimonials, SHOW_COUNT));

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(pickRandom(testimonials, SHOW_COUNT));
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-coral">Community</p>
          <h2 className="display mt-2 text-4xl uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Join the community.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-night/70 sm:text-lg">
            Discover what our community has to say about their ORKA experience.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md bg-violet px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a78cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet/50"
            >
              <RiDiscordFill size={16} />
              Join us on Discord
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border border-night/15 px-4 py-2.5 text-sm font-semibold text-night/78 transition-colors hover:border-night/30 hover:bg-night/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet/50"
            >
              <RiTwitterXFill size={16} />
              Follow on X
            </a>
          </div>
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]">
          {visible.map((item, i) =>
            item.type === "tweet" ? (
              <ClientTweetCard
                key={`tweet-${item.id}`}
                id={item.id}
                hideTwitterIcon
                className="mb-4 rounded-2xl border-2 border-night/8 bg-white shadow-sm transition-all duration-300 hover:border-violet/40 hover:shadow-md break-inside-avoid"
              />
            ) : (
              <figure
                key={`quote-${i}`}
                className="mb-4 flex flex-col justify-between rounded-2xl border-2 border-night/8 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet/40 hover:shadow-md break-inside-avoid"
              >
                <MessageCircle size={28} className="mb-3 text-violet/40" />
                <blockquote className="text-sm font-bold leading-6 text-night/80">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div
                    className={`size-9 shrink-0 rounded-full bg-linear-to-br ${
                      item.avatarColor ?? "from-violet to-orange"
                    }`}
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-night">{item.name}</p>
                    <p className="text-xs text-night/50">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            )
          )}
        </div>
      </div>
    </section>
  );
}
