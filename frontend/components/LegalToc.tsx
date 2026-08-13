"use client";

import { useEffect, useState } from "react";

type TocSection = { id: string; title: string };

export default function LegalToc({
  sections,
  label,
}: {
  sections: readonly TocSection[];
  label: string;
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label={`${label} contents`}
      className="sticky top-0 z-30 border-b border-night/10 bg-paper/95 px-0 pb-2 pt-1 backdrop-blur lg:top-24 lg:z-auto lg:max-h-[calc(100vh-7.5rem)] lg:min-w-0 lg:self-start lg:overflow-y-auto lg:border-b-0 lg:bg-transparent lg:pb-0 lg:pt-0 lg:backdrop-blur-none"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
        On this page
      </p>
      <ol className="mt-2 flex gap-x-5 gap-y-1 overflow-x-auto pb-1 lg:mt-4 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id} className={isActive ? "lg:rounded lg:bg-bone/70 lg:px-2" : "lg:px-2"}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-2 whitespace-nowrap py-1 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet lg:whitespace-normal ${
                  isActive ? "text-night lg:font-bold" : "text-night/70 hover:text-night"
                }`}
              >
                <span className="font-mono text-xs text-violet">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    isActive
                      ? "underline decoration-orange decoration-2 underline-offset-4"
                      : "group-hover:underline group-hover:decoration-orange group-hover:decoration-2 group-hover:underline-offset-4"
                  }
                >
                  {section.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}