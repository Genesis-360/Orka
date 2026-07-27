"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Sparkles,
  Globe,
  LayoutDashboard,
  Workflow as WorkflowIcon,
  Briefcase,
  Building,
  Users,
  ChevronDown,
  Zap,
  FileText,
  Folder,
  Receipt,
  Repeat,
  Palette,
  Code,
  Eye,
  LinkIcon,
} from "lucide-react";

/* ─── Hero ─── */
export function Hero({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
}) {
  return (
    <div className="mb-10 rounded-2xl border border-black/[0.06] bg-gradient-to-br from-[#9474ff]/10 via-[#f5f3ff] to-[#9474ff]/5 p-8">
      <h1 className="text-[2rem] font-black leading-tight tracking-tight text-[#082033] sm:text-[2.5rem]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-[15px] font-semibold text-[#9474ff]">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5f6b86]">
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── OnboardingProgress ─── */
export function OnboardingProgress({
  currentStep,
  totalSteps,
  steps,
}: {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}) {
  return (
    <div className="mb-10 flex items-center gap-1 overflow-x-auto pb-2">
      {steps.map((step, i) => {
        const num = i + 1;
        const isActive = num === currentStep;
        const isDone = num < currentStep;
        return (
          <div key={step} className="flex items-center gap-1">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                isDone
                  ? "bg-[#22bd93] text-white"
                  : isActive
                    ? "bg-[#9474ff] text-white"
                    : "bg-black/[0.06] text-[#5f6b86]"
              }`}
            >
              {isDone ? <Check size={12} /> : num}
            </span>
            <span
              className={`hidden text-[11px] font-medium sm:inline ${
                isActive ? "text-[#082033]" : "text-[#5f6b86]"
              }`}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`mx-1 h-[2px] w-4 ${
                  isDone ? "bg-[#22bd93]" : "bg-black/[0.06]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Checklist ─── */
export function Checklist({ children }: { children: ReactNode }) {
  return <div className="my-6 space-y-2">{children}</div>;
}

export function CheckItem({ children }: { children: ReactNode }) {
  const text = typeof children === "string" ? children : String(children);
  const cleaned = text.replace(/^[\u2705\s]+/, "").trim();
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-[#22bd93]/[0.06] px-4 py-2.5 text-[13px] font-medium text-[#082033]">
      <Check size={14} className="shrink-0 text-[#22bd93]" />
      {cleaned}
    </div>
  );
}

/* ─── CardGroup + Card ─── */
export function CardGroup({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: number;
}) {
  const gridClass =
    cols === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";
  return <div className={`my-6 grid gap-3 ${gridClass}`}>{children}</div>;
}

export function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: ReactNode;
}) {
  const iconMap: Record<string, typeof Sparkles> = {
    "layout-dashboard": LayoutDashboard,
    workflow: WorkflowIcon,
    sparkles: Sparkles,
    globe: Globe,
    briefcase: Briefcase,
    building: Building,
    users: Users,
    lightbulb: Sparkles,
    target: Sparkles,
    shield: Sparkles,
    dollar: Sparkles,
    "file-text": FileText,
    folder: Folder,
    receipt: Receipt,
    repeat: Repeat,
    palette: Palette,
    code: Code,
  };
  const Icon = icon ? iconMap[icon] || Sparkles : Sparkles;

  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-4 transition-all hover:border-[#9474ff]/20 hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-[#9474ff]/10">
          <Icon size={14} className="text-[#9474ff]" />
        </span>
        <p className="text-[13px] font-bold text-[#082033]">{title}</p>
      </div>
      <div className="mt-2.5 text-[12px] leading-relaxed text-[#5f6b86]">
        {children}
      </div>
    </div>
  );
}

/* ─── Workflow ─── */
export function Workflow({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-black/[0.06] bg-[#f7f8fc] p-5">
      <pre className="overflow-x-auto text-[13px] leading-6 text-[#082033]/80 [&_code]:bg-transparent">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ─── Grid + FeatureCard ─── */
export function Grid({
  children,
  cols = 3,
}: {
  children: ReactNode;
  cols?: number;
}) {
  const gridClass =
    cols === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";
  return <div className={`my-6 grid gap-3 ${gridClass}`}>{children}</div>;
}

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  const iconMap: Record<string, typeof Briefcase> = {
    briefcase: Briefcase,
    building: Building,
    users: Users,
    palette: Palette,
    code: Code,
    sparkles: Sparkles,
  };
  const Icon = icon ? iconMap[icon] || Briefcase : Briefcase;

  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-4">
      <span className="grid size-9 place-items-center rounded-lg bg-[#9474ff]/10">
        <Icon size={16} className="text-[#9474ff]" />
      </span>
      <p className="mt-2.5 text-[13px] font-bold text-[#082033]">{title}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-[#5f6b86]">
        {description}
      </p>
    </div>
  );
}

/* ─── FeatureGrid + Feature ─── */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>
  );
}

export function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-[#f7f8fc] p-3.5">
      <p className="text-[12px] font-bold text-[#082033]">{title}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-[#5f6b86]">
        {description}
      </p>
    </div>
  );
}

/* ─── BusinessTip ─── */
export function BusinessTip({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-xl border-l-4 border-[#9474ff] bg-[#9474ff]/[0.04] p-5">
      {children}
    </div>
  );
}

/* ─── Figure ─── */
export function Figure({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-[#f7f8fc]">
        <div className="flex h-48 items-center justify-center text-[13px] text-[#5f6b86]">
          [Image: {caption || src}]
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[11px] text-[#5f6b86]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Accordion ─── */
export function Accordion({ children }: { children: ReactNode }) {
  return <div className="my-6 space-y-2">{children}</div>;
}

export function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-xl border border-black/[0.06] bg-white">
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-[13px] font-bold text-[#082033]">
        {title.replace(/^#{1,4}\s*/, "")}
        <ChevronDown
          size={14}
          className="shrink-0 text-[#5f6b86] transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-black/[0.06] px-4 py-3 text-[13px] leading-relaxed text-[#5f6b86]">
        {children}
      </div>
    </details>
  );
}

/* ─── RelatedGuides ─── */
export function RelatedGuides({ children }: { children: ReactNode }) {
  const text = typeof children === "string" ? children : "";
  const items = text
    .split("\n")
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
  return (
    <div className="my-6 rounded-xl border border-black/[0.06] bg-[#f7f8fc] p-4">
      <p className="mb-3 text-[12px] font-bold text-[#082033]">
        Related Guides
      </p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-[12px] text-[#5f6b86]"
          >
            <ArrowRight size={10} className="text-[#9474ff]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── NextStepCard ─── */
export function NextStepCard({
  title,
  description,
  href,
}: {
  title: string;
  description?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="my-6 flex items-center justify-between rounded-xl border border-[#9474ff]/20 bg-[#9474ff]/[0.04] p-5 transition-all hover:border-[#9474ff]/40 hover:shadow-md"
    >
      <div>
        <p className="text-[11px] font-bold text-[#9474ff]">Next Step</p>
        <p className="mt-1 text-[14px] font-bold text-[#082033]">{title}</p>
        {description && (
          <p className="mt-0.5 text-[12px] text-[#5f6b86]">{description}</p>
        )}
      </div>
      <ArrowRight size={16} className="shrink-0 text-[#9474ff]" />
    </Link>
  );
}

/* ─── DocsPagination ─── */
export function DocsPagination({ next }: { next?: string; prev?: string }) {
  return null; // Handled by PrevNextNav component
}

/* ─── Quote ─── */
export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#9474ff] bg-[#9474ff]/[0.04] py-4 pl-6 pr-4">
      <div className="text-[15px] font-semibold leading-relaxed text-[#082033]">
        {children}
      </div>
    </blockquote>
  );
}

/* ─── ComparisonTable ─── */
export function ComparisonTable({ children }: { children: ReactNode }) {
  const text = typeof children === "string" ? children : "";
  const lines = text.split("\n").filter((l) => l.trim());
  const rows: string[][] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && !trimmed.match(/^\|[\s\-:|]+\|$/)) {
      const cells = trimmed
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.length >= 2) rows.push(cells);
    }
  }
  if (rows.length === 0) return null;
  const header = rows[0];
  const body = rows.slice(1);
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-black/[0.06]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr>
            {header.map((cell, j) => (
              <th
                key={j}
                className="border-b border-black/[0.06] bg-[#f7f8fc] px-4 py-3 text-[12px] font-bold uppercase text-[#5f6b86]"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border-b border-black/[0.06] px-4 py-3 text-[14px] font-medium text-[#082033]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── HeroCard ─── */
export function HeroCard({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-[#9474ff]/20 bg-gradient-to-br from-[#9474ff]/[0.06] via-white to-[#22bd93]/[0.04] p-6">
      {children}
    </div>
  );
}

/* ─── FeatureComparison ─── */
export function FeatureComparison({ children }: { children: ReactNode }) {
  const text = typeof children === "string" ? children : "";
  const lines = text.split("\n").filter((l) => l.trim());
  const rows: string[][] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && !trimmed.match(/^\|[\s\-:|]+\|$/)) {
      const cells = trimmed
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.length >= 2) rows.push(cells);
    }
  }
  if (rows.length === 0) return null;
  const header = rows[0];
  const body = rows.slice(1);
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-black/[0.06]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr>
            {header.map((cell, j) => (
              <th
                key={j}
                className="border-b border-black/[0.06] bg-[#f7f8fc] px-4 py-3 text-[12px] font-bold uppercase text-[#5f6b86]"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border-b border-black/[0.06] px-4 py-3 text-[14px] font-medium text-[#082033]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Callout ─── */
export function Callout({
  type,
  children,
}: {
  type?: string;
  children: ReactNode;
}) {
  const colors: Record<string, { border: string; bg: string; icon: typeof Sparkles }> = {
    vision: { border: "border-[#9474ff]", bg: "bg-[#9474ff]/[0.04]", icon: Eye },
    info: { border: "border-[#3b82f6]", bg: "bg-[#3b82f6]/[0.04]", icon: Sparkles },
    warning: { border: "border-[#ff8a22]", bg: "bg-[#ff8a22]/[0.04]", icon: Zap },
  };
  const style = colors[type || "info"] || colors.info;
  const Icon = style.icon;
  return (
    <div className={`my-8 rounded-xl border-l-4 ${style.border} ${style.bg} p-5`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/60">
          <Icon size={12} className="text-[#9474ff]" />
        </span>
        <div className="text-[13px] leading-relaxed text-[#082033]/80">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── FounderNote ─── */
export function FounderNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 rounded-2xl border border-[#9474ff]/20 bg-gradient-to-br from-[#9474ff]/[0.06] to-transparent p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="grid size-8 place-items-center rounded-full bg-[#9474ff]/15">
          <Zap size={14} className="text-[#9474ff]" />
        </span>
        <span className="text-[12px] font-bold text-[#9474ff]">
          Founder&apos;s Note
        </span>
      </div>
      <div className="text-[13px] leading-relaxed text-[#082033]/80 space-y-3">
        {children}
      </div>
    </div>
  );
}
