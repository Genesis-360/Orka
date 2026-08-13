"use client";

import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import DocsSearch from "./DocsSearch";
import { DocsNavToggle } from "./docs-nav";

interface DocsTopbarProps {
  breadcrumbs: { label: string; href?: string }[];
  accent?: string;
}

export default function DocsTopbar({ breadcrumbs, accent }: DocsTopbarProps) {
  return (
    <div className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-black/[0.06] bg-[#fffaf2]/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile menu toggle */}
      <DocsNavToggle />

      {/* Breadcrumb */}
      <nav className="hidden min-w-0 flex-1 items-center gap-1.5 text-[12px] font-medium text-[#5f6b86] sm:flex">
        <Link
          href="/docs"
          className="shrink-0 transition-colors hover:text-[#082033]"
        >
          Home
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex min-w-0 items-center gap-1.5">
            <ChevronRight size={10} className="shrink-0 text-[#5f6b86]/40" />
            {crumb.href && i < breadcrumbs.length - 1 ? (
              <Link
                href={crumb.href}
                className="truncate transition-colors hover:text-[#082033]"
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className="truncate font-bold"
                style={accent ? { color: accent } : undefined}
              >
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex-1 sm:hidden" />

      {/* Search + Ask AI */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="w-48 sm:w-72">
          <DocsSearch variant="light" compact />
        </div>

        <Link
          href="/docs/ai/generate-proposal"
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[#9474ff] to-[#7c5cff] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm shadow-[#9474ff]/30 transition-all hover:from-[#8a66ff] hover:to-[#6f4eff] hover:shadow-md hover:shadow-[#9474ff]/40"
        >
          <Sparkles size={12} />
          <span className="hidden sm:inline">Ask AI</span>
        </Link>
      </div>
    </div>
  );
}