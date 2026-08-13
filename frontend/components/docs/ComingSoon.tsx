import Link from "next/link";
import { Sparkles, MessageSquare, GitBranch, Hammer } from "lucide-react";

export default function ComingSoon({ features }: { features: string[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-dashed border-[#9474ff]/30 bg-white">
      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-[#9474ff]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9474ff]/20 bg-[#9474ff]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9474ff]">
            <Sparkles size={12} />
            Coming soon
          </span>

          <h2 className="mt-5 flex items-center gap-3 text-[1.6rem] font-black leading-tight tracking-tight text-[#082033] sm:text-[2rem]">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#9474ff]/12">
              <Hammer size={20} className="text-[#9474ff]" />
            </span>
            Our developers are working on it.
          </h2>

          <p className="mt-3 max-w-lg text-[14px] leading-6 text-[#5f6b86]">
            This feature is coming in a future update. While we build it, stay
            in touch — join our Discord to follow progress, get early access,
            and help shape it with your feedback.
          </p>

          {features.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[13px] font-medium text-[#082033]"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#9474ff]" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://discord.gg/KbW5pPCDyY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#9474ff] px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#7c5cf0]"
            >
              <MessageSquare size={15} />
              Join the Discord community
            </a>
            <Link
              href="/docs/resources/changelog"
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2.5 text-[13px] font-bold text-[#5f6b86] transition-colors hover:border-black/20 hover:text-[#082033]"
            >
              <GitBranch size={15} />
              Check the changelog
            </Link>
          </div>

          <p className="mt-6 text-[12px] font-medium text-[#5f6b86]/70">
            Want it sooner? Tell us what you&apos;d love to see in the
            community — every feature request gets reviewed.
          </p>
        </div>
      </div>
    </div>
  );
}