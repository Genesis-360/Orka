"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { enrichTweet, useTweet } from "react-tweet";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { testimonials } from "@/lib/content/testimonials";
import type { Tweet } from "react-tweet/api";

const tweetIds = testimonials
  .filter((t) => t.type === "tweet")
  .map((t) => t.id);

const accents = ["lime", "orange", "violet", "teal", "coral"] as const;
type Accent = (typeof accents)[number];

const accentClasses: Record<Accent, { dot: string; mark: string }> = {
  lime: { dot: "bg-lime", mark: "text-lime" },
  orange: { dot: "bg-orange", mark: "text-orange" },
  violet: { dot: "bg-violet", mark: "text-violet" },
  teal: { dot: "bg-teal", mark: "text-teal" },
  coral: { dot: "bg-coral", mark: "text-coral" },
};

const withSafeEntities = (
  tweet: Tweet
): Tweet & { entities: Tweet["entities"] } => ({
  ...tweet,
  entities: {
    ...tweet.entities,
    hashtags: tweet.entities?.hashtags ?? [],
    urls: tweet.entities?.urls ?? [],
    symbols: tweet.entities?.symbols ?? [],
    user_mentions: tweet.entities?.user_mentions ?? [],
  },
});

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Kicker({ accentCls }: { accentCls: { dot: string; mark: string } }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/40">
      <span
        className={`size-1.5 animate-pulse rounded-full ${accentCls.dot}`}
        aria-hidden="true"
      />
      Loved by the ORKA community
    </p>
  );
}

function QuoteMark({
  accentCls,
  size = "text-4xl lg:text-5xl",
}: {
  accentCls: { dot: string; mark: string };
  size?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`display mr-1 select-none leading-none ${size} ${accentCls.mark}`}
    >
      “
    </span>
  );
}

function TweetSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true">
      <div className="space-y-2.5">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-11/12 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="flex items-center gap-3">
        <div className="size-10 animate-pulse rounded-full bg-white/10" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="h-2.5 w-20 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function BigTweet({ tweet, accent }: { tweet: Tweet; accent: Accent }) {
  const enriched = useMemo(
    () => enrichTweet(withSafeEntities(tweet)),
    [tweet]
  );
  const accentCls = accentClasses[accent];

  const date = new Date(tweet.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const likes = tweet.favorite_count.toLocaleString("en-US");

  return (
    <figure className="flex flex-col gap-8">
      <Kicker accentCls={accentCls} />

      <blockquote className="text-[22px] font-medium leading-[1.35] tracking-[-0.011em] text-white/90 sm:text-[24px] lg:text-[26px]">
        <QuoteMark accentCls={accentCls} />
        {enriched.entities.map((entity, idx) => {
          switch (entity.type) {
            case "url":
            case "symbol":
            case "hashtag":
            case "mention":
              return (
                <a
                  key={idx}
                  href={entity.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime underline decoration-lime/40 underline-offset-[3px] transition-colors hover:decoration-lime"
                >
                  {entity.text}
                </a>
              );
            case "text":
              return (
                <span
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: entity.text }}
                />
              );
            default:
              return null;
          }
        })}
        <span aria-hidden="true" className={`ml-1 ${accentCls.mark}`}>
          ”
        </span>
      </blockquote>

      <figcaption className="flex flex-col gap-1.5 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <a
            href={enriched.user.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Image
              src={enriched.user.profile_image_url_https}
              alt={`${enriched.user.name} avatar`}
              width={40}
              height={40}
              className="size-10 overflow-hidden rounded-full border border-white/15 object-cover"
            />
          </a>
          <div className="flex min-w-0 flex-col">
            <a
              href={enriched.user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[15px] font-bold text-white transition-colors hover:text-lime"
            >
              {enriched.user.name}
              {(enriched.user.verified || enriched.user.is_blue_verified) && (
                <RiVerifiedBadgeFill
                  className="ml-1.5 inline size-4 text-sky-400"
                  aria-label="Verified account"
                />
              )}
            </a>
            <a
              href={enriched.user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-medium text-white/50 transition-colors hover:text-white/80"
            >
              @{enriched.user.screen_name} · {date}
              {tweet.favorite_count > 0 && ` · ♥ ${likes}`}
            </a>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

function StaticQuote({ accent }: { accent: Accent }) {
  const accentCls = accentClasses[accent];

  return (
    <figure className="flex flex-col gap-8">
      <Kicker accentCls={accentCls} />

      <blockquote className="text-[22px] font-medium leading-[1.35] tracking-[-0.011em] text-white/90 sm:text-[24px] lg:text-[26px]">
        <QuoteMark accentCls={accentCls} />
        Orka is the first tool that feels built around the whole client
        workflow — proposals, invoices and tracking all in one place. It
        quietly gives every agency its time back.
        <span aria-hidden="true" className={`ml-1 ${accentCls.mark}`}>
          ”
        </span>
      </blockquote>

      <figcaption className="flex flex-col gap-1.5 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10"
          >
            <span className={`display text-lg leading-none ${accentCls.mark}`}>
              O
            </span>
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] font-bold text-white">
              The ORKA team
            </span>
            <span className="truncate text-sm font-medium text-white/50">
              What our early community tells us
            </span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function AuthTweets() {
  const [ids] = useState(() => shuffle(tweetIds));
  const [accent] = useState<Accent>(
    () => accents[Math.floor(Math.random() * accents.length)]
  );
  const [attempt, setAttempt] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  const id = ids[attempt % ids.length];
  const { data, error, isLoading } = useTweet(id);

  useEffect(() => {
    if (error && !exhausted) {
      const t = setTimeout(() => {
        if (attempt >= ids.length - 1) setExhausted(true);
        else setAttempt((a) => a + 1);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [error, exhausted, attempt, ids.length]);

  if (exhausted) return <StaticQuote accent={accent} />;
  if (isLoading) return <TweetSkeleton />;
  if (!data) return <TweetSkeleton />;

  return (
    <div
      key={id}
      className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out"
      aria-live="polite"
    >
      <BigTweet tweet={data} accent={accent} />
    </div>
  );
}