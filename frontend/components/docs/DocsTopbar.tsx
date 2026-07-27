"use client";

import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";

interface DocsTopbarProps {
  breadcrumbs: { label: string; href?: string }[];
}

export default function DocsTopbar({ breadcrumbs }: DocsTopbarProps) {
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
        <SearchBar />

        <button className="flex items-center gap-1.5 rounded-lg bg-[#9474ff] px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-[#9474ff]/90">
          <Sparkles size={12} />
          Ask AI
        </button>
      </div>
    </div>
  );
}
