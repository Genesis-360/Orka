"use client";

import { useEffect, useState } from "react";
import { RiHeadphoneLine, RiCloseLine } from "react-icons/ri";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocsTocProps {
  headings: TocItem[];
}

export default function DocsToc({ headings }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 }
    );

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);

    headingElements.forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="w-full space-y-8">
      <div>
        <p className="mb-3 text-xs font-black uppercase text-night/50">
          On this page
        </p>
        <nav className="space-y-1.5">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block border-l-[3px] py-1.5 text-[13px] font-bold transition-colors ${
                heading.level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === heading.id
                  ? "border-violet text-violet"
                  : "border-transparent text-night/50 hover:text-night/80"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-night/10 pt-4">
        <div className="text-[11px] font-bold text-night/40">
          <span className="block">Last Updated: Jul 2026</span>
          <span className="block">Reading Time: 5 min</span>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-night/10 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-violet/10">
            <RiHeadphoneLine size={14} className="text-violet" />
          </span>
          <div>
            <p className="text-[12px] font-black text-night">Still stuck?</p>
            <p className="text-[11px] font-bold text-night/50">
              Our support team is here to help.
            </p>
          </div>
        </div>
        <a
          href="/contact"
          className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-violet px-3 py-2 text-[12px] font-black text-white transition hover:bg-violet/90"
        >
          Contact Support
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-night/10 bg-white p-3 text-center">
        <p className="text-[11px] font-black text-night">Was this helpful?</p>
        <p className="text-[10px] font-bold text-night/50">
          Your feedback helps us improve.
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <button className="rounded-lg border border-night/10 px-3 py-1 text-[11px] font-bold text-night/60 transition hover:border-violet hover:text-violet">
            Yes
          </button>
          <button className="rounded-lg border border-night/10 px-3 py-1 text-[11px] font-bold text-night/60 transition hover:border-violet hover:text-violet">
            No
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-night/10 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-violet/10">
            <RiCloseLine size={14} className="text-violet" />
          </span>
          <div>
            <p className="text-[12px] font-black text-night">Join Community</p>
            <p className="text-[11px] font-bold text-night/50">
              Connect with the Orka team.
            </p>
          </div>
        </div>
        <a
          href="#"
          className="mt-3 flex items-center justify-center gap-1 text-[12px] font-black text-violet hover:underline"
        >
          Join on Discord
        </a>
      </div>
    </aside>
  );
}
