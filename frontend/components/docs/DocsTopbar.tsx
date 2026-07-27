"use client";

import Link from "next/link";
import { Search, Sparkles, ChevronRight } from "lucide-react";

interface DocsTopbarProps {
  breadcrumbs: { label: string; href?: string }[];
  onOpenSearch?: () => void;
}

export default function DocsTopbar({
  breadcrumbs,
  onOpenSearch,
}: DocsTopbarProps) {
  return (
    <div className="sticky top-0 z-30 flex h-12 items-center border-b border-black/[0.06] bg-white/80 px-6 backdrop-blur-md">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] font-medium text-[#5f6b86]">
        <Link
          href="/docs"
          className="transition-colors hover:text-[#082033]"
        >
          Home
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={10} className="text-[#5f6b86]/40" />
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-[#082033]"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[#082033]">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Search + Ask AI */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-lg border border-black/[0.06] bg-[#f7f8fc] px-3 py-1.5 text-[12px] font-medium text-[#5f6b86] transition-colors hover:border-[#9474ff]/30"
        >
          <Search size={12} />
          <span>Search</span>
          <kbd className="hidden rounded border border-black/[0.06] bg-white px-1 py-0.5 text-[9px] font-semibold sm:inline-block">
            ⌘K
          </kbd>
        </button>

        <button className="flex items-center gap-1.5 rounded-lg bg-[#9474ff] px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-[#9474ff]/90">
          <Sparkles size={12} />
          Ask AI
        </button>
      </div>
    </div>
  );
}
