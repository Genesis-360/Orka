"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rocket,
  Users,
  Folder,
  Wallet,
  Sparkles,
  Settings,
  Code,
  BookOpen,
  ChevronDown,
  Search,
  Headphones,
  MessageSquare,
  GitBranch,
  Zap,
  Map,
  Lightbulb,
  Check,
} from "lucide-react";
import { docsNavigation, DocSection } from "@/lib/docs/config";
import { useDocsProgress } from "@/lib/docs/progress";

const iconMap: Record<string, typeof Rocket> = {
  rocket: Rocket,
  users: Users,
  folder: Folder,
  wallet: Wallet,
  sparkles: Sparkles,
  people: Users,
  settings: Settings,
  code: Code,
  book: BookOpen,
  map: Map,
  lightbulb: Lightbulb,
};

interface DocsSidebarProps {
  onOpenSearch?: () => void;
}

export default function DocsSidebar({ onOpenSearch }: DocsSidebarProps) {
  const pathname = usePathname();
  const { isCompleted, getSectionProgress, isLoaded } = useDocsProgress();
  const [expandedSection, setExpandedSection] = useState<string | null>(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "docs" && parts[1]) {
      return parts[1];
    }
    return "start-here";
  });

  const toggleSection = (slug: string) => {
    setExpandedSection(expandedSection === slug ? null : slug);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-black/[0.06] bg-white">
      {/* Logo — fixed at top */}
      <div className="flex h-14 shrink-0 items-center px-5">
        <Link href="/docs" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#9474ff]">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-display text-lg font-black uppercase tracking-tight text-[#082033]">
            orka
          </span>
        </Link>
      </div>

      {/* Search — fixed at top */}
      <div className="shrink-0 px-3 pb-4">
        <button
          onClick={onOpenSearch}
          className="flex w-full items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#f7f8fc] px-3 py-2.5 text-[13px] font-medium text-[#5f6b86] transition-colors hover:border-[#9474ff]/30 hover:bg-[#9474ff]/[0.03]"
        >
          <Search size={14} className="shrink-0 opacity-50" />
          <span className="flex-1 text-left">Search docs</span>
          <kbd className="hidden rounded-md border border-black/[0.06] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#5f6b86] sm:inline-block">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Everything below scrolls as one unit */}
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {/* Navigation categories */}
        <div className="space-y-1">
          {docsNavigation.map((section) => (
            <SidebarSection
              key={section.slug}
              section={section}
              isExpanded={expandedSection === section.slug}
              onToggle={() => toggleSection(section.slug)}
              pathname={pathname}
              isCompleted={isCompleted}
              getSectionProgress={getSectionProgress}
              isLoaded={isLoaded}
            />
          ))}
        </div>

        {/* Orka AI Card */}
        <div className="mt-5">
          <div className="overflow-hidden rounded-xl border border-[#9474ff]/20 bg-gradient-to-br from-[#9474ff]/10 via-[#9474ff]/5 to-transparent p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#9474ff]/15">
                <Sparkles size={14} className="text-[#9474ff]" />
              </span>
              <div>
                <p className="text-[12px] font-bold text-[#082033]">
                  Orka AI
                </p>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-[#5f6b86]">
                  Your AI copilot for proposals, invoices and more.
                </p>
              </div>
            </div>
            <Link
              href="/docs/ai"
              className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80"
            >
              Learn more
              <span className="text-[10px]">→</span>
            </Link>
          </div>
        </div>

        {/* Need Help */}
        <div className="mt-5 border-t border-black/[0.06] pt-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#5f6b86]/60">
            Need help?
          </p>
          <div className="space-y-2">
            <a
              href="/contact"
              className="flex items-center gap-2.5 text-[12px] font-medium text-[#5f6b86] transition-colors hover:text-[#082033]"
            >
              <Headphones size={13} />
              Support
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 text-[12px] font-medium text-[#5f6b86] transition-colors hover:text-[#082033]"
            >
              <MessageSquare size={13} />
              Community
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 text-[12px] font-medium text-[#5f6b86] transition-colors hover:text-[#082033]"
            >
              <GitBranch size={13} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarSection({
  section,
  isExpanded,
  onToggle,
  pathname,
  isCompleted,
  getSectionProgress,
  isLoaded,
}: {
  section: DocSection;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
  isCompleted: (slug: string) => boolean;
  getSectionProgress: (sectionSlug: string) => { completed: number; total: number; percent: number };
  isLoaded: boolean;
}) {
  const Icon = iconMap[section.icon] || Rocket;
  const progress = getSectionProgress(section.slug);

  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
          isExpanded
            ? "bg-[#9474ff]/[0.06] text-[#082033]"
            : "text-[#5f6b86] hover:bg-black/[0.03] hover:text-[#082033]"
        }`}
      >
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-md"
          style={{
            backgroundColor: isExpanded
              ? `${section.color}15`
              : "transparent",
            color: isExpanded ? section.color : undefined,
          }}
        >
          <Icon size={14} />
        </span>
        <span className="flex-1 text-left">{section.title}</span>
        {isLoaded && progress.completed > 0 && (
          <span className="text-[10px] font-bold text-[#22bd93]">
            {progress.completed}/{progress.total}
          </span>
        )}
        <ChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-150 ${
            isExpanded ? "rotate-180" : ""
          } ${isExpanded ? "text-[#9474ff]" : "text-[#5f6b86]/40"}`}
        />
      </button>

      {isExpanded && (
        <div className="ml-[18px] mt-1 space-y-0.5 border-l border-black/[0.06] pl-3">
          {/* Progress bar */}
          {isLoaded && progress.completed > 0 && (
            <div className="mb-2 px-2.5">
              <div className="h-[3px] overflow-hidden rounded-full bg-black/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress.percent}%`,
                    backgroundColor: section.color,
                  }}
                />
              </div>
            </div>
          )}

          {section.items.map((item) => {
            const itemPath = `/docs/${section.slug}/${item.slug}`;
            const isItemActive =
              pathname === itemPath ||
              pathname.startsWith(itemPath + "/");
            const itemCompleted = isLoaded && isCompleted(`${section.slug}/${item.slug}`);

            return (
              <Link
                key={item.slug}
                href={itemPath}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                  isItemActive
                    ? "bg-[#9474ff]/[0.06] font-semibold text-[#9474ff]"
                    : "text-[#5f6b86] hover:bg-black/[0.03] hover:text-[#082033]"
                }`}
              >
                {itemCompleted ? (
                  <Check size={12} className="shrink-0 text-[#22bd93]" />
                ) : (
                  <span className="size-[12px] shrink-0" />
                )}
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
