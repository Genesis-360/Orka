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
import SidebarSearch from "./SidebarSearch";

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

interface DocsSidebarProps {}

export default function DocsSidebar({}: DocsSidebarProps) {
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
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/10 bg-[#071426]">
      {/* Logo — fixed at top */}
      <div className="flex h-14 shrink-0 items-center px-5">
        <Link href="/docs" className="flex items-center gap-2">
          <img src="/Logo/orka-logo.png" alt="Orka" className="size-7 rounded-lg object-contain" />
          <span className="font-display text-lg font-black uppercase tracking-tight text-white">
            orka
          </span>
        </Link>
      </div>

      {/* Search */}
      <div className="shrink-0 px-3 pb-4">
        <SidebarSearch variant="dark" />
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
                <p className="text-[12px] font-bold text-white">
                  Orka AI
                </p>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-white/50">
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
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-white/40">
            Need help?
          </p>
          <div className="space-y-2">
            <a
              href="/contact"
              className="flex items-center gap-2.5 text-[12px] font-medium text-white/50 transition-colors hover:text-white"
            >
              <Headphones size={13} />
              Support
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 text-[12px] font-medium text-white/50 transition-colors hover:text-white"
            >
              <MessageSquare size={13} />
              Community
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 text-[12px] font-medium text-white/50 transition-colors hover:text-white"
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
            ? "bg-white/10 text-white"
            : "text-white/60 hover:bg-white/5 hover:text-white"
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
          } ${isExpanded ? "text-[#9474ff]" : "text-white/30"}`}
        />
      </button>

      {isExpanded && (
        <div className="ml-[18px] mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {/* Progress bar */}
          {isLoaded && progress.completed > 0 && (
            <div className="mb-2 px-2.5">
              <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
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
                    ? "bg-white/10 font-semibold text-[#9474ff]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
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
