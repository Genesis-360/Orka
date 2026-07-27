"use client";

import { useEffect, useState } from "react";

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
    <nav className="space-y-1.5">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`block border-l-[3px] py-1.5 text-[13px] font-bold transition-colors ${
            heading.level === 3 ? "pl-6" : "pl-3"
          } ${
            activeId === heading.id
              ? "border-[#9474ff] text-[#082033]"
              : "border-transparent text-[#5f6b86] hover:text-[#082033]/80"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
