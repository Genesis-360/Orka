"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Map,
  Lightbulb,
  Check,
} from "lucide-react";
import { docsNavigation, DocSection } from "@/lib/docs/config";
import { useDocsProgress } from "@/lib/docs/progress";
import { useDocsNav } from "./docs-nav";
import { X } from "lucide-react";

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

export default function DocsSidebar() {
  const pathname = usePathname();
  const { isCompleted, getSectionProgress, isLoaded } = useDocsProgress();
  const { open, setOpen } = useDocsNav();
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
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col border-r border-white/10 bg-[#071426] lg:flex">
        <DocsNavContent
          pathname={pathname}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
          isCompleted={isCompleted}
          getSectionProgress={getSectionProgress}
          isLoaded={isLoaded}
        />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[90] bg-[#071426]/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-[95] flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#071426] transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
<div className="flex h-14 shrink-0 items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2" aria-label="ORKA home" onClick={() => setOpen(false)}>
            <Image
              src="/Logo/logo.svg"
              alt="ORKA"
              width={28}
              height={28}
              className="size-7 object-contain"
              priority
            />
            <span className="font-display text-lg font-black uppercase tracking-tight text-white">
              orka
            </span>
            <span className="ml-0.5 rounded-md bg-[#9474ff]/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9474ff]">
              Docs
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close documentation navigation"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <DocsNavContent
            pathname={pathname}
            expandedSection={expandedSection}
            toggleSection={toggleSection}
            isCompleted={isCompleted}
            getSectionProgress={getSectionProgress}
            isLoaded={isLoaded}
            onNavigate={() => setOpen(false)}
          />
        </div>
      </aside>
    </>
  );
}

function DocsNavContent({
  pathname,
  expandedSection,
  toggleSection,
  isCompleted,
  getSectionProgress,
  isLoaded,
  onNavigate,
}: {
  pathname: string;
  expandedSection: string | null;
  toggleSection: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  getSectionProgress: (sectionSlug: string) => { completed: number; total: number; percent: number };
  isLoaded: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* Logo — desktop only (mobile drawer has its own header) */}
      <div className="hidden h-14 shrink-0 items-center px-5 lg:flex">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="ORKA home">
          <Image
            src="/Logo/logo.svg"
            alt="ORKA"
            width={28}
            height={28}
            className="size-7 object-contain"
            priority
          />
          <span className="font-display text-lg font-black uppercase tracking-tight text-white">
            orka
          </span>
          <span className="ml-0.5 rounded-md bg-[#9474ff]/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9474ff]">
            Docs
          </span>
        </Link>
      </div>

      {/* Navigation */}
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
              onNavigate={onNavigate}
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
                <p className="text-[12px] font-bold text-white">Orka AI</p>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-white/50">
                  Your AI copilot for proposals, invoices and more.
                </p>
              </div>
            </div>
            <Link
              href="/docs/ai"
              onClick={onNavigate}
              className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#9474ff] transition-colors hover:text-[#9474ff]/80">
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
              className="flex items-center gap-2.5 text-[12px] font-medium text-white/50 transition-colors hover:text-white">
              <Headphones size={13} />
              Support
            </a>
            <a
              href="https://discord.gg/KbW5pPCDyY"
              className="flex items-center gap-2.5 text-[12px] font-medium text-white/50 transition-colors hover:text-white">
              <MessageSquare size={13} />
              Community
            </a>
            <a
              href="https://github.com/Genesis-360/Orka"
              className="flex items-center gap-2.5 text-[12px] font-medium text-white/50 transition-colors hover:text-white">
              <GitBranch size={13} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
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
  onNavigate,
}: {
  section: DocSection;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
  isCompleted: (slug: string) => boolean;
  getSectionProgress: (sectionSlug: string) => { completed: number; total: number; percent: number };
  isLoaded: boolean;
  onNavigate?: () => void;
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
                onClick={onNavigate}
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
