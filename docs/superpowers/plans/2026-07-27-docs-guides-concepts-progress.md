# Docs Guides, Concepts & Reading Progress — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Guides and Concepts documentation categories with persistent reading progress, sidebar checkmarks, category completion percentages, confetti animation, and cross-section related articles.

**Architecture:** React Context (`DocsProgressProvider`) reads/writes `orka-docs-progress` in localStorage. Sidebar reads context for checkmarks/progress bars. Page bottom gets `CompletionSection` replacing `Feedback`. Custom canvas confetti on completion. Config gets new sections + `related` field on `DocItem`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, lucide-react icons, gray-matter for frontmatter, custom MDX renderer.

## Global Constraints

- Keep existing routing unchanged (`/docs/{section}/{item}` catch-all)
- Keep current design system (Tailwind v4 CSS-first, color palette: `#9474ff`, `#22bd93`, `#ff8a22`, `#3b82f6`, `#5f6b86`, `#082033`)
- Maintain responsive behavior (sidebar 260px, right sidebar 300px)
- Preserve accessibility (ARIA labels, keyboard nav, focus states)
- No new npm dependencies
- No backend changes
- localStorage key: `orka-docs-progress`
- Reading time: 200 WPM auto-calculation
- Difficulty: inferred from section (Guides = mixed, Concepts = Beginner)

---

## File Map

### New Files (19)

| File | Purpose |
|------|---------|
| `frontend/lib/docs/progress.tsx` | DocsProgressProvider context |
| `frontend/components/docs/CompletionSection.tsx` | Bottom section: helpful + completed + next reading |
| `frontend/components/docs/ConfettiCanvas.tsx` | Canvas confetti animation |
| `frontend/content/docs/guides/send-first-invoice.mdx` | Guide page |
| `frontend/content/docs/guides/create-first-proposal.mdx` | Guide page |
| `frontend/content/docs/guides/milestone-payments.mdx` | Guide page |
| `frontend/content/docs/guides/manage-clients.mdx` | Guide page |
| `frontend/content/docs/guides/international-payments.mdx` | Guide page |
| `frontend/content/docs/guides/team-collaboration.mdx` | Guide page |
| `frontend/content/docs/guides/agency-workflow.mdx` | Guide page |
| `frontend/content/docs/concepts/workspaces.mdx` | Concept page |
| `frontend/content/docs/concepts/clients.mdx` | Concept page |
| `frontend/content/docs/concepts/projects.mdx` | Concept page |
| `frontend/content/docs/concepts/milestones.mdx` | Concept page |
| `frontend/content/docs/concepts/escrow.mdx` | Concept page |
| `frontend/content/docs/concepts/wallets.mdx` | Concept page |
| `frontend/content/docs/concepts/permissions.mdx` | Concept page |

### Modified Files (8)

| File | Changes |
|------|---------|
| `frontend/lib/docs/config.ts` | Add `related` field to `DocItem`, add Guides/Concepts sections, update `getRelatedArticles` |
| `frontend/components/docs/DocsSidebar.tsx` | Add checkmarks, progress bars, new icons (`map`, `lightbulb`) |
| `frontend/components/docs/DocsRightSidebar.tsx` | Remove Feedback widget |
| `frontend/components/docs/RelatedArticles.tsx` | Support cross-section resolution |
| `frontend/app/(docs)/layout.tsx` | Wrap with `DocsProgressProvider` |
| `frontend/app/(docs)/docs/[...slug]/page.tsx` | Add reading time, replace Feedback with CompletionSection |
| `frontend/app/(docs)/docs/page.tsx` | Add progress widget |
| `frontend/public/search-index.json` | Add 14 new entries |

---

## Tasks

### Task 1: Config — Add `related` field and new sections

**Files:**
- Modify: `frontend/lib/docs/config.ts`

**Interfaces:**
- Produces: Updated `DocItem` type with `related?: string[]`, two new `DocSection` entries in `docsNavigation`, updated `getRelatedArticles` function

- [ ] **Step 1: Add `related` field to `DocItem` interface**

In `frontend/lib/docs/config.ts`, update the `DocItem` interface (line 11-18):

```typescript
export interface DocItem {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  businessTip?: string;
  children?: DocItem[];
  related?: string[];
}
```

- [ ] **Step 2: Add Guides section to `docsNavigation`**

Insert after the "Start Here" section (after line 73, before the Clients section at line 74):

```typescript
  {
    title: "Guides",
    slug: "guides",
    icon: "map",
    color: "#ff8a22",
    description: "Step-by-step workflows to get things done.",
    items: [
      {
        title: "Send First Invoice",
        slug: "send-first-invoice",
        description: "Create and send your first invoice in minutes.",
        related: ["payments/generate-invoice", "payments/escrow"],
      },
      {
        title: "Create First Proposal",
        slug: "create-first-proposal",
        description: "Draft and send a winning proposal to a client.",
        related: ["ai/generate-proposal", "projects/create-project"],
      },
      {
        title: "Milestone Payments",
        slug: "milestone-payments",
        description: "Set up milestone-based payments and escrow.",
        related: ["projects/milestones", "payments/escrow"],
      },
      {
        title: "Manage Clients",
        slug: "manage-clients",
        description: "Build and maintain strong client relationships.",
        related: ["clients/add-client", "clients/client-profiles"],
      },
      {
        title: "International Payments",
        slug: "international-payments",
        description: "Send and receive payments across borders.",
        related: ["payments/cross-border-payments", "payments/escrow"],
      },
      {
        title: "Team Collaboration",
        slug: "team-collaboration",
        description: "Work together with your team seamlessly.",
        related: ["team/invite-members", "team/roles"],
      },
      {
        title: "Agency Workflow",
        slug: "agency-workflow",
        description: "Run your agency end-to-end with Orka.",
        related: ["start-here/your-first-project", "team/approvals"],
      },
    ],
  },
```

- [ ] **Step 3: Add Concepts section to `docsNavigation`**

Insert after the new Guides section (before the Clients section):

```typescript
  {
    title: "Concepts",
    slug: "concepts",
    icon: "lightbulb",
    color: "#3b82f6",
    description: "Understand the ideas behind Orka's features.",
    items: [
      {
        title: "Workspaces",
        slug: "workspaces",
        description: "What workspaces are and how they organize your business.",
        related: ["start-here/create-workspace", "workspace/branding"],
      },
      {
        title: "Clients",
        slug: "clients",
        description: "How client relationships work in Orka.",
        related: ["clients/add-client", "clients/client-portal"],
      },
      {
        title: "Projects",
        slug: "projects",
        description: "How projects structure your work and deliverables.",
        related: ["projects/create-project", "projects/milestones"],
      },
      {
        title: "Milestones",
        slug: "milestones",
        description: "Breaking work into trackable, payable units.",
        related: ["projects/milestones", "payments/escrow"],
      },
      {
        title: "Escrow",
        slug: "escrow",
        description: "How Stellar-powered escrow protects both parties.",
        related: ["payments/escrow", "payments/release-payments"],
      },
      {
        title: "Wallets",
        slug: "wallets",
        description: "Connecting and managing Stellar wallets in Orka.",
        related: ["start-here/connect-wallet", "payments/cross-border-payments"],
      },
      {
        title: "Permissions",
        slug: "permissions",
        description: "Role-based access control for teams and clients.",
        related: ["team/permissions", "team/roles"],
      },
    ],
  },
```

- [ ] **Step 4: Update `getRelatedArticles` for cross-section support**

Replace the `getRelatedArticles` function (lines 444-456):

```typescript
export function getRelatedArticles(slug: string, limit = 4): DocItem[] {
  const parts = slug.split("/");
  const sectionSlug = parts[0];
  const itemSlug = parts[1];

  const section = docsNavigation.find((s) => s.slug === sectionSlug);
  const currentItem = section?.items.find((i) => i.slug === itemSlug);

  if (currentItem?.related) {
    const relatedItems: DocItem[] = [];
    for (const relSlug of currentItem.related) {
      const [sSlug, iSlug] = relSlug.split("/");
      const s = docsNavigation.find((sec) => sec.slug === sSlug);
      const item = s?.items.find((i) => i.slug === iSlug);
      if (item) {
        relatedItems.push({ ...item, slug: relSlug });
      }
    }
    return relatedItems.slice(0, limit);
  }

  if (!section) return [];
  return section.items
    .filter((item) => `${section.slug}/${item.slug}` !== slug)
    .slice(0, limit);
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/lib/docs/config.ts
git commit -m "docs: add Guides and Concepts sections to sidebar config"
```

---

### Task 2: Progress Context Provider

**Files:**
- Create: `frontend/lib/docs/progress.tsx`

**Interfaces:**
- Consumes: `docsNavigation` from `@/lib/docs/config`
- Produces: `DocsProgressProvider`, `useDocsProgress` hook

- [ ] **Step 1: Create progress context file**

Create `frontend/lib/docs/progress.tsx`:

```typescript
"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { docsNavigation, DocItem } from "./config";

const STORAGE_KEY = "orka-docs-progress";

interface DocsProgressContextValue {
  completedSlugs: Set<string>;
  markCompleted: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  getSectionProgress: (sectionSlug: string) => { completed: number; total: number; percent: number };
  getNextRecommended: (currentSlug: string) => DocItem | null;
  isLoaded: boolean;
}

const DocsProgressContext = createContext<DocsProgressContextValue | null>(null);

function loadProgress(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch {
    // ignore malformed data
  }
  return new Set();
}

function saveProgress(slugs: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
}

export function DocsProgressProvider({ children }: { children: ReactNode }) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCompletedSlugs(loadProgress());
    setIsLoaded(true);
  }, []);

  const markCompleted = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      next.add(slug);
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (slug: string) => completedSlugs.has(slug),
    [completedSlugs]
  );

  const getSectionProgress = useCallback(
    (sectionSlug: string) => {
      const section = docsNavigation.find((s) => s.slug === sectionSlug);
      if (!section) return { completed: 0, total: 0, percent: 0 };

      const total = section.items.length;
      const completed = section.items.filter((item) =>
        completedSlugs.has(`${section.slug}/${item.slug}`)
      ).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      return { completed, total, percent };
    },
    [completedSlugs]
  );

  const getNextRecommended = useCallback(
    (currentSlug: string): DocItem | null => {
      const allItems = docsNavigation.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          slug: `${section.slug}/${item.slug}`,
        }))
      );

      const currentIndex = allItems.findIndex((item) => item.slug === currentSlug);
      if (currentIndex === -1) return null;

      // First, look for the next uncompleted item
      for (let i = currentIndex + 1; i < allItems.length; i++) {
        if (!completedSlugs.has(allItems[i].slug)) {
          return allItems[i];
        }
      }
      // Wrap around
      for (let i = 0; i < currentIndex; i++) {
        if (!completedSlugs.has(allItems[i].slug)) {
          return allItems[i];
        }
      }
      return null;
    },
    [completedSlugs]
  );

  return (
    <DocsProgressContext.Provider
      value={{
        completedSlugs,
        markCompleted,
        isCompleted,
        getSectionProgress,
        getNextRecommended,
        isLoaded,
      }}
    >
      {children}
    </DocsProgressContext.Provider>
  );
}

export function useDocsProgress() {
  const context = useContext(DocsProgressContext);
  if (!context) {
    throw new Error("useDocsProgress must be used within a DocsProgressProvider");
  }
  return context;
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/lib/docs/progress.tsx
git commit -m "feat: add DocsProgressProvider for reading progress tracking"
```

---

### Task 3: Confetti Canvas Component

**Files:**
- Create: `frontend/components/docs/ConfettiCanvas.tsx`

**Interfaces:**
- Produces: `ConfettiCanvas` component, accepts `active: boolean` prop

- [ ] **Step 1: Create confetti component**

Create `frontend/components/docs/ConfettiCanvas.tsx`:

```typescript
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  gravity: number;
}

const COLORS = ["#9474ff", "#22bd93", "#ff8a22", "#3b82f6", "#f59e0b", "#ec4899"];

function createParticles(canvas: HTMLCanvasElement): Particle[] {
  const particles: Particle[] = [];
  const count = 50;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 14 - 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 6 + 4,
      opacity: 1,
      gravity: 0.3,
    });
  }
  return particles;
}

interface ConfettiCanvasProps {
  active: boolean;
  onComplete?: () => void;
}

export default function ConfettiCanvas({ active, onComplete }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = createParticles(canvas);
    const startTime = Date.now();
    const duration = 700;

    function draw() {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - elapsed / duration);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/docs/ConfettiCanvas.tsx
git commit -m "feat: add canvas confetti animation component"
```

---

### Task 4: CompletionSection Component

**Files:**
- Create: `frontend/components/docs/CompletionSection.tsx`

**Interfaces:**
- Consumes: `useDocsProgress` from `@/lib/docs/progress`
- Produces: `CompletionSection` component, accepts `slug: string` and `readingTime: number` props

- [ ] **Step 1: Create CompletionSection component**

Create `frontend/components/docs/CompletionSection.tsx`:

```typescript
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Check, ArrowRight, Clock } from "lucide-react";
import { useDocsProgress } from "@/lib/docs/progress";
import ConfettiCanvas from "./ConfettiCanvas";

interface CompletionSectionProps {
  slug: string;
  readingTime: number;
}

function getStoredFeedback(slug: string): "helpful" | "not-helpful" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`docs-feedback-${slug}`);
  if (stored === "helpful" || stored === "not-helpful") return stored;
  return null;
}

export default function CompletionSection({ slug, readingTime }: CompletionSectionProps) {
  const { markCompleted, isCompleted, getNextRecommended } = useDocsProgress();
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(
    () => getStoredFeedback(slug)
  );
  const [justCompleted, setJustCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const completed = isCompleted(slug);
  const nextDoc = getNextRecommended(slug);

  const handleFeedback = useCallback(
    (value: "helpful" | "not-helpful") => {
      setFeedback(value);
      localStorage.setItem(`docs-feedback-${slug}`, value);
    },
    [slug]
  );

  const handleMarkCompleted = useCallback(() => {
    if (completed) return;
    markCompleted(slug);
    setJustCompleted(true);
    setShowConfetti(true);
  }, [completed, markCompleted, slug]);

  return (
    <>
      <ConfettiCanvas
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <div className="mt-10 space-y-8">
        {/* Reading time + difficulty */}
        <div className="flex items-center gap-3 text-[12px] font-medium text-[#5f6b86]">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readingTime} min read
          </span>
          <span className="text-[#5f6b86]/30">·</span>
          <span>Beginner</span>
        </div>

        {/* Was this page helpful? */}
        {!feedback ? (
          <div className="rounded-xl border border-black/[0.06] p-5 text-center">
            <p className="text-[13px] font-bold text-[#082033]">
              Was this page helpful?
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <button
                onClick={() => handleFeedback("helpful")}
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.06] px-4 py-2 text-[12px] font-medium text-[#5f6b86] transition-all hover:border-[#22bd93] hover:text-[#22bd93]"
              >
                <ThumbsUp size={13} />
                Yes
              </button>
              <button
                onClick={() => handleFeedback("not-helpful")}
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.06] px-4 py-2 text-[12px] font-medium text-[#5f6b86] transition-all hover:border-[#ff4f42] hover:text-[#ff4f42]"
              >
                <ThumbsDown size={13} />
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#22bd93]/20 bg-[#22bd93]/[0.04] p-4 text-center">
            <p className="text-[13px] font-bold text-[#22bd93]">
              Thanks for your feedback!
            </p>
          </div>
        )}

        {/* Mark as Completed */}
        <div className="rounded-xl border border-black/[0.06] p-5 text-center">
          {completed ? (
            <div className="flex items-center justify-center gap-2 text-[13px] font-bold text-[#22bd93]">
              <Check size={16} />
              Completed
            </div>
          ) : (
            <button
              onClick={handleMarkCompleted}
              className="inline-flex items-center gap-2 rounded-xl border border-[#22bd93]/30 bg-[#22bd93]/[0.06] px-5 py-2.5 text-[13px] font-bold text-[#22bd93] transition-all hover:bg-[#22bd93]/[0.12] hover:shadow-md"
            >
              <Check size={14} />
              Mark as Completed
            </button>
          )}
        </div>

        {/* Next recommended */}
        {(justCompleted || completed) && nextDoc && (
          <div className="rounded-xl border border-[#9474ff]/20 bg-[#9474ff]/[0.04] p-5">
            <p className="text-[12px] font-bold text-[#9474ff]">
              {justCompleted ? "Nice work!" : "Next up"}
            </p>
            <p className="mt-1 text-[13px] font-bold text-[#082033]">
              Next Recommended
            </p>
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="mt-3 flex items-center justify-between rounded-lg border border-black/[0.06] bg-white p-3 transition-all hover:border-[#9474ff]/20 hover:shadow-md"
            >
              <div>
                <p className="text-[13px] font-bold text-[#082033] hover:text-[#9474ff]">
                  → {nextDoc.title}
                </p>
                {nextDoc.description && (
                  <p className="mt-0.5 text-[11px] text-[#5f6b86]">
                    {nextDoc.description}
                  </p>
                )}
              </div>
              <ArrowRight size={14} className="shrink-0 text-[#9474ff]" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/docs/CompletionSection.tsx
git commit -m "feat: add CompletionSection with helpful vote, mark complete, next reading"
```

---

### Task 5: Create Guide MDX Pages (7 pages)

**Files:**
- Create: `frontend/content/docs/guides/send-first-invoice.mdx`
- Create: `frontend/content/docs/guides/create-first-proposal.mdx`
- Create: `frontend/content/docs/guides/milestone-payments.mdx`
- Create: `frontend/content/docs/guides/manage-clients.mdx`
- Create: `frontend/content/docs/guides/international-payments.mdx`
- Create: `frontend/content/docs/guides/team-collaboration.mdx`
- Create: `frontend/content/docs/guides/agency-workflow.mdx`

- [ ] **Step 1: Create `guides/` directory**

```bash
mkdir -p frontend/content/docs/guides
```

- [ ] **Step 2: Create `send-first-invoice.mdx`**

Create `frontend/content/docs/guides/send-first-invoice.mdx`:

```markdown
---
title: "Send First Invoice"
description: "Step-by-step guide to creating and sending your first invoice in Orka."
category: "guides"
order: 1
---

Sending your first invoice in Orka takes just a few minutes. This guide walks you through the entire process.

## Why it matters

A professional invoice gets you paid faster. Orka's invoices include payment details, transaction tracking, and automatic reminders — so you spend less time chasing payments.

## Before you begin

Make sure you have:

- An active Orka workspace
- At least one client added
- A project with completed milestones (or a standalone invoice)
- Your payment details configured

## Step-by-step walkthrough

### Step 1: Navigate to Invoices

Open your workspace and click **Invoices** in the sidebar. This shows all your existing invoices and their status.

### Step 2: Create a new invoice

Click **New Invoice** in the top right. You can also generate an invoice directly from a completed milestone.

### Step 3: Add line items

For each line item, enter:

- **Description** — What you're billing for
- **Quantity** — Hours, deliverables, or units
- **Rate** — Price per unit
- **Amount** — Calculated automatically

### Step 4: Set payment terms

Choose your payment terms:

- **Due on receipt** — Payment expected immediately
- **Net 15** — Payment due within 15 days
- **Net 30** — Payment due within 30 days
- **Custom** — Set your own terms

### Step 5: Review and send

Preview the invoice, then click **Send Invoice**. The client receives it via email with a link to view and pay.

## Best practices

- Send invoices promptly after completing milestones
- Include clear descriptions for each line item
- Set reasonable payment terms (Net 15 is common)
- Use Orka's automatic reminders for overdue invoices

## Common mistakes

- Waiting too long to send invoices — send them while the work is fresh
- Vague line item descriptions — be specific about what you delivered
- Not setting a due date — always include clear payment terms

## What's next

Once your client pays, the funds are released to your wallet. Learn more about [payment releases](/docs/payments/release-payments) and [escrow](/docs/payments/escrow).
```

- [ ] **Step 3: Create `create-first-proposal.mdx`**

Create `frontend/content/docs/guides/create-first-proposal.mdx`:

```markdown
---
title: "Create First Proposal"
description: "Draft and send a winning proposal to your client using Orka's AI-powered tools."
category: "guides"
order: 2
---

A strong proposal sets expectations, defines scope, and wins clients. Orka's AI helps you create professional proposals in minutes.

## Why it matters

Proposals protect both you and your client. They define scope, timeline, and pricing — so there are no surprises later. A professional proposal also builds trust with new clients.

## Before you begin

Before creating a proposal, you need:

- A client added to your workspace
- A clear understanding of the project scope
- An idea of pricing and timeline

## Step-by-step walkthrough

### Step 1: Start a new proposal

Navigate to your project and click **New Proposal**. You can also create a proposal from the AI section.

### Step 2: Use the AI generator (optional)

Click **Generate with AI** and provide:

- Project brief or description
- Services you're offering
- Budget range
- Timeline expectations

The AI creates a draft proposal with sections for scope, milestones, pricing, and terms.

### Step 3: Edit and customize

Review the AI draft and adjust:

- **Scope** — Make sure deliverables are clear
- **Milestones** — Break work into measurable units
- **Pricing** — Set fair prices for each milestone
- **Timeline** — Add realistic deadlines
- **Terms** — Include payment terms and revision policies

### Step 4: Add your branding

Your proposal automatically includes your workspace branding — logo, colors, and contact information.

### Step 5: Send to client

Click **Send Proposal**. The client receives a professional, branded proposal they can review and accept digitally.

## Best practices

- Always use escrow-backed proposals for projects over $1,000
- Break large projects into 3-5 milestones
- Include a clear scope of work section
- Set payment terms that work for both parties

## Common mistakes

- Skipping the proposal and jumping straight to work
- Not defining scope clearly enough
- Underpricing to win the bid — value your work appropriately

## What's next

After the client accepts, Orka can auto-generate a contract. Learn about [AI contracts](/docs/ai/ai-contracts) and [milestone setup](/docs/projects/milestones).
```

- [ ] **Step 4: Create `milestone-payments.mdx`**

Create `frontend/content/docs/guides/milestone-payments.mdx`:

```markdown
---
title: "Milestone Payments"
description: "Set up milestone-based payments with escrow to get paid securely."
category: "guides"
order: 3
---

Milestone payments break your project into payable units. Each milestone has its own deliverable, deadline, and payment — keeping cash flow steady and work on track.

## Why it matters

Getting paid per milestone means you don't have to wait until the end of a large project. It improves cash flow, reduces risk, and keeps both you and your client aligned.

## Before you begin

Make sure you have:

- A project with defined milestones
- A client who has funded escrow (or is ready to)
- Your wallet connected for receiving payments

## Step-by-step walkthrough

### Step 1: Define milestones in your project

Open your project and click **Add Milestone**. For each milestone, enter:

- **Name** — Clear, descriptive title
- **Description** — What deliverable the client receives
- **Amount** — Payment for this milestone
- **Deadline** — Due date

### Step 2: Client funds escrow

Once milestones are set, the client funds escrow for the project. Funds are held on the Stellar blockchain until milestones are approved.

### Step 3: Complete the work

Deliver the milestone deliverables. Upload files, share links, or mark tasks as complete.

### Step 4: Client approves

The client reviews your work and approves the milestone. This triggers the release of funds from escrow.

### Step 5: Payment released

Once approved, funds are released to your wallet. An invoice is automatically generated for your records.

## Best practices

- Keep milestones small and focused (1-2 week deliverables work well)
- Define clear acceptance criteria for each milestone
- Communicate regularly with your client during each milestone
- Use partial releases for large milestones

## Common mistakes

- Making milestones too large — break them into smaller chunks
- Not defining acceptance criteria — the client needs to know what "done" looks like
- Skipping the approval step — always get formal sign-off

## What's next

Learn more about [escrow security](/docs/payments/escrow) and [releasing payments](/docs/payments/release-payments).
```

- [ ] **Step 5: Create `manage-clients.mdx`**

Create `frontend/content/docs/guides/manage-clients.mdx`:

```markdown
---
title: "Manage Clients"
description: "Build and maintain strong client relationships in Orka."
category: "guides"
order: 4
---

Good client management is the foundation of a successful service business. Orka helps you track everything from contact details to project history.

## Why it matters

Strong client relationships lead to repeat business, referrals, and a better reputation. Orka keeps all your client information organized so you can focus on delivering great work.

## Before you begin

Make sure you have:

- An active Orka workspace
- Your team roles configured
- Basic client information (name, email, company)

## Step-by-step walkthrough

### Step 1: Add a new client

Navigate to **Clients** and click **Add Client**. Enter their details:

- **Name** — Contact person or company name
- **Email** — Primary contact email
- **Company** — Business name
- **Phone** — Optional contact number
- **Notes** — Any relevant context

### Step 2: Set up the client portal

Enable the client portal to give your client a shared view of projects, invoices, and files. Go to client settings and toggle **Portal Access**.

### Step 3: Organize with tags

Use tags to categorize clients:

- **VIP** — High-value clients
- **Retainer** — Monthly retainer clients
- **New** — Recently onboarded
- **International** — Cross-border clients

### Step 4: Track communication

Use the activity feed to track all client interactions. Log meetings, decisions, and important messages.

### Step 5: Review client health

Regularly check your client dashboard for:

- Active projects
- Outstanding invoices
- Recent activity
- Payment history

## Best practices

- Keep client profiles updated with current information
- Use the client portal for transparency
- Set up automatic payment reminders
- Document important decisions in the activity feed

## Common mistakes

- Not adding clients until projects start — add them early for smoother workflows
- Ignoring the client portal — it builds trust and reduces back-and-forth
- Skipping documentation — keep records of agreements and decisions

## What's next

Learn about [client permissions](/docs/clients/permissions) and [importing clients](/docs/clients/import-clients) from other tools.
```

- [ ] **Step 6: Create `international-payments.mdx`**

Create `frontend/content/docs/guides/international-payments.mdx`:

```markdown
---
title: "International Payments"
description: "Send and receive payments across borders with multi-currency support."
category: "guides"
order: 5
---

Orka supports international payments through Stellar's global network. Send and receive payments in multiple currencies with minimal fees.

## Why it matters

Working with international clients shouldn't mean expensive wire transfers and slow processing. Stellar's network settles transactions in 3-5 seconds with fees under a cent, regardless of borders.

## Before you begin

Make sure you have:

- A connected wallet
- Understanding of your client's preferred currency
- Knowledge of local regulations for cross-border payments

## Step-by-step walkthrough

### Step 1: Set project currency

When creating a project, select the currency for billing. Orka supports XLM, USD, EUR, GBP, and more.

### Step 2: Create the invoice

Generate an invoice in the project's currency. The client sees the amount in their preferred currency.

### Step 3: Client pays

The client pays using their preferred method. Stellar handles the currency conversion automatically.

### Step 4: Receive funds

Funds arrive in your wallet in your preferred currency. Conversion happens seamlessly.

## Best practices

- Discuss currency preferences with your client upfront
- Use stablecoins for reduced volatility risk
- Keep records of exchange rates for tax purposes
- Set up automatic conversion to your local currency

## Common mistakes

- Not discussing currency upfront — it can cause confusion at payment time
- Ignoring exchange rate fluctuations — use stablecoins for predictable payments
- Forgetting tax implications — consult a tax professional for international income

## What's next

Learn more about [cross-border payments](/docs/payments/cross-border-payments) and [payment history](/docs/payments/payment-history).
```

- [ ] **Step 7: Create `team-collaboration.mdx`**

Create `frontend/content/docs/guides/team-collaboration.mdx`:

```markdown
---
title: "Team Collaboration"
description: "Work together with your team seamlessly in Orka."
category: "guides"
order: 6
---

Orka makes it easy to collaborate with your team on projects, proposals, and invoices. Set up roles, invite members, and start working together.

## Why it matters

Collaboration improves quality and efficiency. When your team has shared access to projects and clients, everyone stays aligned and work gets done faster.

## Before you begin

Make sure you have:

- An admin or owner role in your workspace
- Team members' email addresses
- Clear understanding of roles and permissions

## Step-by-step walkthrough

### Step 1: Invite team members

Go to **Team** and click **Invite Members**. Enter their email and select a role:

- **Admin** — Full access to manage workspace settings
- **Member** — Access to projects, clients, and invoices
- **Viewer** — Read-only access for oversight

### Step 2: Assign to projects

Once members accept, assign them to projects. Each member sees only the projects they're assigned to.

### Step 3: Set up approval workflows

For milestones and invoices, configure approval workflows:

- Who can approve milestones
- Who can send invoices
- Who can release payments

### Step 4: Use the activity feed

Track all team activity in the project feed. See who did what and when.

### Step 5: Communicate in context

Use project discussions to keep conversations tied to specific work. No more scattered messages across tools.

## Best practices

- Start with Admin and Member roles — add Viewer access for clients who need visibility
- Use approval workflows for financial decisions
- Keep the activity feed updated for transparency
- Review team permissions regularly

## Common mistakes

- Giving everyone Admin access — use the principle of least privilege
- Not setting up approvals — financial decisions should require sign-off
- Ignoring the activity feed — it's your audit trail

## What's next

Learn about [roles](/docs/team/roles) and [permissions](/docs/team/permissions) in detail.
```

- [ ] **Step 8: Create `agency-workflow.mdx`**

Create `frontend/content/docs/guides/agency-workflow.mdx`:

```markdown
---
title: "Agency Workflow"
description: "Run your agency end-to-end with Orka — from proposal to payment."
category: "guides"
order: 7
---

This guide covers the complete agency workflow in Orka — from winning a client to getting paid. Follow these steps to run your agency efficiently.

## Why it matters

Agencies juggle multiple clients, projects, and team members. A consistent workflow ensures nothing falls through the cracks and every project runs smoothly.

## Before you begin

Make sure you have:

- A fully set up workspace with branding
- Team members invited with appropriate roles
- At least one client added
- Payment methods configured

## Step-by-step walkthrough

### Step 1: Win the client

Start with a proposal:

1. Add the client to Orka
2. Create a project for them
3. Generate a proposal with AI
4. Send and get it accepted

### Step 2: Set up the project

Once the proposal is accepted:

1. Define milestones with clear deliverables
2. Set deadlines and pricing for each milestone
3. Client funds escrow for the project

### Step 3: Deliver the work

For each milestone:

1. Complete the deliverables
2. Upload files and share progress
3. Mark the milestone as complete

### Step 4: Get approval and payment

1. Client reviews and approves the milestone
2. Funds release from escrow to your wallet
3. Invoice is automatically generated

### Step 5: Manage the relationship

1. Track all activity in the project feed
2. Use the client portal for transparency
3. Communicate through Orka's messaging

### Step 6: Repeat and scale

1. Use project templates for similar work
2. Leverage AI for proposals and contracts
3. Track analytics across all projects

## Best practices

- Use templates to standardize your workflow
- Set up approval workflows for quality control
- Track time and expenses for accurate billing
- Review analytics monthly to identify improvements

## Common mistakes

- Skipping the proposal — always formalize scope before starting
- Not using escrow — it protects both you and the client
- Ignoring analytics — data helps you improve your agency

## What's next

Explore [project templates](/docs/projects/templates) and [analytics](/docs/workspace/notifications) to optimize your workflow.
```

- [ ] **Step 9: Commit all guide pages**

```bash
git add frontend/content/docs/guides/
git commit -m "docs: add 7 Guide pages with step-by-step workflows"
```

---

### Task 6: Create Concept MDX Pages (7 pages)

**Files:**
- Create: `frontend/content/docs/concepts/workspaces.mdx`
- Create: `frontend/content/docs/concepts/clients.mdx`
- Create: `frontend/content/docs/concepts/projects.mdx`
- Create: `frontend/content/docs/concepts/milestones.mdx`
- Create: `frontend/content/docs/concepts/escrow.mdx`
- Create: `frontend/content/docs/concepts/wallets.mdx`
- Create: `frontend/content/docs/concepts/permissions.mdx`

- [ ] **Step 1: Create `concepts/` directory**

```bash
mkdir -p frontend/content/docs/concepts
```

- [ ] **Step 2: Create `workspaces.mdx`**

Create `frontend/content/docs/concepts/workspaces.mdx`:

```markdown
---
title: "Workspaces"
description: "What workspaces are and how they organize your business in Orka."
category: "concepts"
order: 1
---

A workspace is your agency's home on Orka. It contains all your projects, team members, clients, and billing settings in one place.

## What is it?

A workspace is an organizational container that groups everything related to your business. Think of it as your company's dashboard — all projects, clients, and team members live inside it.

## Why does Orka use it?

Workspaces provide:

- **Isolation** — Different businesses or departments stay separate
- **Organization** — Projects, clients, and team are grouped logically
- **Access control** — Team members are scoped to specific workspaces
- **Branding** — Each workspace can have its own branding and settings

## How does it work?

When you create a workspace:

1. You become the owner
2. You set the default currency and timezone
3. You invite team members
4. You add clients and create projects

All data is scoped to the workspace. A client in one workspace doesn't automatically appear in another.

## When should you use it?

- **One business = one workspace** — Keep things simple
- **Multiple brands = multiple workspaces** — Separate branding and clients
- **Different teams = different workspaces** — Isolate access as needed

## Common misconceptions

- **"I need multiple workspaces for different projects"** — No, projects live within a single workspace
- **"Clients can see other clients"** — No, client access is scoped to their projects
- **"Workspaces are expensive"** — Orka's free tier includes a full workspace

## Related documentation

- [Create Workspace](/docs/start-here/create-workspace)
- [Branding](/docs/workspace/branding)
- [Team Members](/docs/team/invite-members)
```

- [ ] **Step 3: Create `clients.mdx`**

Create `frontend/content/docs/concepts/clients.mdx`:

```markdown
---
title: "Clients"
description: "How client relationships work in Orka."
category: "concepts"
order: 2
---

Clients are the companies or individuals you work with. Orka manages the entire client lifecycle — from first contact to ongoing relationships.

## What is it?

A client in Orka is a record containing contact information, project history, invoices, and communication. Each client can have multiple projects and a dedicated portal.

## Why does Orka use it?

Centralizing client data means:

- **Single source of truth** — All client information in one place
- **Relationship tracking** — See full history of projects and payments
- **Portal access** — Clients can view their own projects and invoices
- **Permission control** — Clients see only what you share

## How does it work?

1. **Add a client** — Enter their details (name, email, company)
2. **Create projects** — Assign projects to the client
3. **Enable portal** — Give clients access to view progress
4. **Track activity** — Log communication and decisions
5. **Manage payments** — Track invoices and payment history

## When should you use it?

Every external person you work with should be a client in Orka. This includes:

- Paying customers
- Partner agencies
- Freelance contractors you hire

## Common misconceptions

- **"Clients can see everything"** — No, they only see what you share through the portal
- **"I can't have multiple contacts per client"** — You can add multiple contacts to a single client record
- **"Clients are just names"** — Orka tracks full relationship history, not just contact info

## Related documentation

- [Add Client](/docs/clients/add-client)
- [Client Portal](/docs/clients/client-portal)
- [Client Profiles](/docs/clients/client-profiles)
```

- [ ] **Step 4: Create `projects.mdx`**

Create `frontend/content/docs/concepts/projects.mdx`:

```markdown
---
title: "Projects"
description: "How projects structure your work and deliverables in Orka."
category: "concepts"
order: 3
---

Projects are the core of Orka. Each project tracks proposals, contracts, milestones, payments, and files for a specific client engagement.

## What is it?

A project is a container for all work related to a specific client engagement. It includes milestones, deliverables, payments, files, and an activity feed.

## Why does Orka use it?

Projects provide:

- **Structure** — Break work into milestones with clear deliverables
- **Payment tracking** — Link payments to specific milestones
- **File management** — Share documents with team and clients
- **Activity feed** — Track all project events in one place

## How does it work?

1. **Create a project** — Name it, assign a client, set currency
2. **Add milestones** — Define deliverables with deadlines and pricing
3. **Track progress** — Use the timeline and activity feed
4. **Manage files** — Upload and share documents
5. **Get paid** — Milestone approvals trigger payment releases

## When should you use it?

Create a project for every distinct engagement with a client. This includes:

- Fixed-scope projects with defined deliverables
- Ongoing retainer work (use a project per month or quarter)
- One-off consulting engagements

## Common misconceptions

- **"Projects are just task lists"** — Projects include payments, files, proposals, and contracts — not just tasks
- **"I need a new project for every milestone"** — No, milestones live within a project
- **"Projects are only for development work"** — Projects work for any service engagement

## Related documentation

- [Create Project](/docs/projects/create-project)
- [Milestones](/docs/projects/milestones)
- [Project Status](/docs/projects/project-status)
```

- [ ] **Step 5: Create `milestones.mdx`**

Create `frontend/content/docs/concepts/milestones.mdx`:

```markdown
---
title: "Milestones"
description: "Breaking work into trackable, payable units."
category: "concepts"
order: 4
---

Milestones divide your project into clear, manageable units. Each milestone has a deliverable, a deadline, and a payment — keeping work on track and cash flow steady.

## What is it?

A milestone is a defined unit of work within a project. It represents a specific deliverable that the client approves before payment is released.

## Why does Orka use it?

Milestones provide:

- **Clear expectations** — Both parties know what "done" looks like
- **Cash flow** — Get paid as you deliver, not just at the end
- **Accountability** — Deadlines keep work moving
- **Escrow integration** — Payments are tied to milestone approval

## How does it work?

1. **Define milestones** — Name, describe, price, and set deadlines
2. **Client funds escrow** — Payments are locked for each milestone
3. **Complete work** — Deliver the milestone deliverables
4. **Client approves** — Formal sign-off triggers payment release
5. **Payment released** — Funds move to your wallet

## When should you use it?

Use milestones for:

- Projects over $1,000 (protects both parties)
- Multi-week engagements (improves cash flow)
- Complex deliverables (clears up expectations)
- Any work where you want formal approval before payment

## Common misconceptions

- **"Milestones are just tasks"** — Milestones are payable units with approval workflows, not just to-do items
- **"I can't change milestones"** — You can edit milestones before the client funds escrow
- **"Milestones slow things down"** — They actually speed things up by clarifying expectations

## Related documentation

- [Milestones](/docs/projects/milestones)
- [Escrow](/docs/payments/escrow)
- [Release Payments](/docs/payments/release-payments)
```

- [ ] **Step 6: Create `escrow.mdx`**

Create `frontend/content/docs/concepts/escrow.mdx`:

```markdown
---
title: "Escrow"
description: "How Stellar-powered escrow protects both parties in Orka."
category: "concepts"
order: 5
---

Escrow holds funds securely until work is approved. It protects both you and your client — you know payment is guaranteed, and your client knows their money is safe until they're satisfied.

## What is it?

Escrow is a financial arrangement where funds are held by a trusted third party (the Stellar blockchain) until specific conditions are met. In Orka, escrow releases payment when a milestone is approved.

## Why does Orka use it?

- **Security** — Funds are locked on the Stellar blockchain, not held by Orka
- **Trust** — Both parties know the money is safe
- **Automation** — Smart contracts handle release without manual processing
- **Transparency** — All transactions are recorded on-chain

## How does it work?

1. **Client funds escrow** — Deposits are locked in a smart contract on Stellar
2. **Work begins** — You deliver on milestones
3. **Milestone approval** — Client reviews and approves the deliverable
4. **Funds release** — Smart contract releases payment to your wallet
5. **Record created** — Transaction is recorded on-chain and in Orka

## When should you use it?

- **New clients** — Always use escrow until trust is established
- **Projects over $1,000** — The protection is worth it
- **Long engagements** — Milestone-based escrow improves cash flow
- **International payments** — Escrow provides security across borders

## Common misconceptions

- **"Orka holds my money"** — No, funds are on the Stellar blockchain. Orka never has custody
- **"Escrow is slow"** — Stellar transactions confirm in 3-5 seconds
- **"Escrow is expensive"** — Stellar network fees are fractions of a cent
- **"I can't get a refund"** — If work isn't completed, both parties can agree to release funds

## Related documentation

- [Escrow](/docs/payments/escrow)
- [Release Payments](/docs/payments/release-payments)
- [Refunds](/docs/payments/refunds)
```

- [ ] **Step 7: Create `wallets.mdx`**

Create `frontend/content/docs/concepts/wallets.mdx`:

```markdown
---
title: "Wallets"
description: "Connecting and managing Stellar wallets in Orka."
category: "concepts"
order: 6
---

Wallets are how you receive payments on the Stellar network. Orka uses Freighter, a secure browser wallet extension, to manage your Stellar assets.

## What is it?

A Stellar wallet stores your secret keys and signs transactions. Freighter is the most popular Stellar wallet — a browser extension that keeps your keys safe while letting you interact with Orka.

## Why does Orka use it?

- **Self-custody** — You control your keys, not Orka
- **Security** — Private keys never leave your browser
- **Speed** — Sign transactions in one click
- **Compatibility** — Works with all Stellar assets and tokens

## How does it work?

1. **Install Freighter** — Add the browser extension
2. **Create or import a wallet** — Set up your Stellar account
3. **Connect to Orka** — Link your wallet in workspace settings
4. **Receive payments** — Funds arrive directly in your wallet
5. **Sign transactions** — Approve payments in the Freighter popup

## When should you use it?

- **Self-custody mode** — When you want to hold your own keys
- **Receiving payments** — Any time you need to get paid on Stellar
- **Signing transactions** — When approving milestone releases

## Common misconceptions

- **"I need a wallet to use Orka"** — No, Orka has a managed mode where we handle blockchain operations for you
- **"Wallets are complicated"** — Freighter is as simple as a browser extension
- **"I can lose my wallet"** — Always back up your recovery phrase. Orka cannot recover lost keys
- **"Wallets are only for crypto"** — Freighter handles XLM and Stellar-based fiat tokens

## Related documentation

- [Connect Wallet](/docs/start-here/connect-wallet)
- [Cross-border Payments](/docs/payments/cross-border-payments)
- [Escrow](/docs/payments/escrow)
```

- [ ] **Step 8: Create `permissions.mdx`**

Create `frontend/content/docs/concepts/permissions.mdx`:

```markdown
---
title: "Permissions"
description: "Role-based access control for teams and clients in Orka."
category: "concepts"
order: 7
---

Permissions control what team members and clients can see and do in Orka. Orka uses role-based access control (RBAC) to keep your data secure.

## What is it?

Permissions define access levels for users. Each role has specific capabilities — from full admin access to read-only viewing.

## Why does Orka use it?

- **Security** — Team members only access what they need
- **Accountability** — Clear roles mean clear responsibilities
- **Client safety** — Clients see only their own projects
- **Compliance** — Audit trails track who did what

## How does it work?

### Team roles

| Role | Capabilities |
|------|-------------|
| **Owner** | Full access, billing, delete workspace |
| **Admin** | Manage team, projects, and settings |
| **Member** | Edit assigned projects and clients |
| **Viewer** | Read-only access |

### Client access

Clients have separate permissions:

- **Portal access** — View their own projects and invoices
- **File access** — Download shared files
- **No admin access** — Cannot manage workspace settings

## When should you use it?

- **Admin** — Workspace owners and managers
- **Member** — Team members who do the work
- **Viewer** — Clients, advisors, or stakeholders who need visibility

## Common misconceptions

- **"Everyone needs Admin access"** — No, use the principle of least privilege
- **"Clients can see other clients"** — No, client access is scoped to their projects
- **"Permissions are rigid"** — You can customize access per project and client

## Related documentation

- [Roles](/docs/team/roles)
- [Permissions](/docs/team/permissions)
- [Client Portal](/docs/clients/client-portal)
```

- [ ] **Step 9: Commit all concept pages**

```bash
git add frontend/content/docs/concepts/
git commit -m "docs: add 7 Concept pages explaining Orka's core ideas"
```

---

### Task 7: Update Sidebar — Checkmarks and Progress

**Files:**
- Modify: `frontend/components/docs/DocsSidebar.tsx`

**Interfaces:**
- Consumes: `useDocsProgress` from `@/lib/docs/progress`

- [ ] **Step 1: Update DocsSidebar imports and add new icons**

In `frontend/components/docs/DocsSidebar.tsx`, update the import block (lines 1-22):

```typescript
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
```

- [ ] **Step 2: Add new icons to iconMap**

Update the `iconMap` (line 24-34):

```typescript
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
```

- [ ] **Step 3: Update DocsSidebar to use progress context**

Replace the `DocsSidebar` component (lines 40-155):

```typescript
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
```

- [ ] **Step 4: Update SidebarSection to show checkmarks and progress**

Replace the `SidebarSection` component (lines 157-226):

```typescript
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
```

- [ ] **Step 5: Commit**

```bash
git add frontend/components/docs/DocsSidebar.tsx
git commit -m "feat: add checkmarks and progress bars to docs sidebar"
```

---

### Task 8: Wire Up Layout and Page

**Files:**
- Modify: `frontend/app/(docs)/layout.tsx`
- Modify: `frontend/app/(docs)/docs/[...slug]/page.tsx`
- Modify: `frontend/components/docs/DocsRightSidebar.tsx`

**Interfaces:**
- Consumes: `DocsProgressProvider` from `@/lib/docs/progress`, `CompletionSection` from components

- [ ] **Step 1: Wrap layout with DocsProgressProvider**

In `frontend/app/(docs)/layout.tsx`, add the import and wrap children:

```typescript
import DocsShell from "@/components/docs/DocsShell";
import { DocsProgressProvider } from "@/lib/docs/progress";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsProgressProvider>
      <DocsShell>{children}</DocsShell>
    </DocsProgressProvider>
  );
}
```

- [ ] **Step 2: Update doc page to use CompletionSection**

In `frontend/app/(docs)/docs/[...slug]/page.tsx`, update imports and add reading time + CompletionSection:

Add to imports (after line 17):

```typescript
import CompletionSection from "@/components/docs/CompletionSection";
```

Add reading time calculation (after `extractHeadings` function, around line 38):

```typescript
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

In the component, after `const renderedContent = renderMDX(source);` (line 69), add:

```typescript
  const readingTime = calculateReadingTime(source);
```

Replace the Feedback section (lines 88-90) with CompletionSection:

```typescript
            <CompletionSection slug={slugPath} readingTime={readingTime} />
```

- [ ] **Step 3: Simplify DocsRightSidebar**

In `frontend/components/docs/DocsRightSidebar.tsx`, remove Feedback import and usage:

```typescript
"use client";

import DocsToc, { TocItem } from "./DocsToc";

interface DocsRightSidebarProps {
  headings: TocItem[];
  slug: string;
}

export default function DocsRightSidebar({ headings, slug }: DocsRightSidebarProps) {
  return (
    <div className="hidden w-[300px] shrink-0 self-stretch lg:block">
      <div className="sticky top-[96px] space-y-8 py-8">
        <DocsToc headings={headings} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add frontend/app/(docs)/layout.tsx frontend/app/\(docs\)/docs/\[...slug\]/page.tsx frontend/components/docs/DocsRightSidebar.tsx
git commit -m "feat: wire up progress provider, CompletionSection, and reading time"
```

---

### Task 9: Update RelatedArticles for Cross-Section

**Files:**
- Modify: `frontend/components/docs/RelatedArticles.tsx`

**Interfaces:**
- Consumes: `getRelatedArticles` from `@/lib/docs/config` (already updated in Task 1)

- [ ] **Step 1: Update RelatedArticles to use config function**

Replace the entire `RelatedArticles.tsx`:

```typescript
"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { getRelatedArticles } from "@/lib/docs/config";

interface RelatedArticlesProps {
  slug: string;
}

export default function RelatedArticles({ slug }: RelatedArticlesProps) {
  const related = getRelatedArticles(slug, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-10 border-t border-black/[0.06] pt-8">
      <h3 className="text-[14px] font-bold text-[#082033]">Related Articles</h3>
      <div className="mt-4 space-y-2">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/docs/${item.slug}`}
            className="group flex items-center justify-between rounded-xl border border-black/[0.06] p-3.5 transition-all hover:border-[#9474ff]/20 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-[#9474ff]/10">
                <FileText size={14} className="text-[#9474ff]" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-[#082033] group-hover:text-[#9474ff]">
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-[11px] text-[#5f6b86]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <ArrowRight
              size={14}
              className="shrink-0 text-[#5f6b86]/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#9474ff]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/docs/RelatedArticles.tsx
git commit -m "feat: support cross-section related articles"
```

---

### Task 10: Update Search Index

**Files:**
- Modify: `frontend/public/search-index.json`

- [ ] **Step 1: Add 14 new entries to search-index.json**

Add the following entries to the end of the array in `frontend/public/search-index.json` (before the closing `]`):

```json
,
  {
    "id": "guides/send-first-invoice",
    "title": "Send First Invoice",
    "category": "Guides",
    "description": "Step-by-step guide to creating and sending your first invoice.",
    "content": "Send First Invoice Sending your first invoice in Orka takes just a few minutes. This guide walks you through the entire process. Why it matters A professional invoice gets you paid faster. Before you begin Make sure you have an active workspace, at least one client, and a project with completed milestones. Step-by-step Navigate to Invoices, create new invoice, add line items, set payment terms, review and send.",
    "url": "/docs/guides/send-first-invoice"
  },
  {
    "id": "guides/create-first-proposal",
    "title": "Create First Proposal",
    "category": "Guides",
    "description": "Draft and send a winning proposal to a client using Orka's AI-powered tools.",
    "content": "Create First Proposal A strong proposal sets expectations, defines scope, and wins clients. Why it matters Proposals protect both you and your client. Before you begin You need a client, clear scope understanding, and pricing ideas. Step-by-step Start new proposal, use AI generator, edit and customize, add branding, send to client.",
    "url": "/docs/guides/create-first-proposal"
  },
  {
    "id": "guides/milestone-payments",
    "title": "Milestone Payments",
    "category": "Guides",
    "description": "Set up milestone-based payments with escrow to get paid securely.",
    "content": "Milestone Payments Break your project into payable units. Each milestone has its own deliverable, deadline, and payment. Why it matters Getting paid per milestone improves cash flow and reduces risk. Step-by-step Define milestones, client funds escrow, complete work, client approves, payment released.",
    "url": "/docs/guides/milestone-payments"
  },
  {
    "id": "guides/manage-clients",
    "title": "Manage Clients",
    "category": "Guides",
    "description": "Build and maintain strong client relationships in Orka.",
    "content": "Manage Clients Good client management is the foundation of a successful service business. Why it matters Strong client relationships lead to repeat business and referrals. Step-by-step Add new client, set up client portal, organize with tags, track communication, review client health.",
    "url": "/docs/guides/manage-clients"
  },
  {
    "id": "guides/international-payments",
    "title": "International Payments",
    "category": "Guides",
    "description": "Send and receive payments across borders with multi-currency support.",
    "content": "International Payments Orka supports international payments through Stellar's global network. Send and receive payments in multiple currencies with minimal fees. Step-by-step Set project currency, create invoice, client pays, receive funds.",
    "url": "/docs/guides/international-payments"
  },
  {
    "id": "guides/team-collaboration",
    "title": "Team Collaboration",
    "category": "Guides",
    "description": "Work together with your team seamlessly in Orka.",
    "content": "Team Collaboration Orka makes it easy to collaborate with your team on projects, proposals, and invoices. Step-by-step Invite team members, assign to projects, set up approval workflows, use activity feed, communicate in context.",
    "url": "/docs/guides/team-collaboration"
  },
  {
    "id": "guides/agency-workflow",
    "title": "Agency Workflow",
    "category": "Guides",
    "description": "Run your agency end-to-end with Orka — from proposal to payment.",
    "content": "Agency Workflow This guide covers the complete agency workflow in Orka. From winning a client to getting paid. Step-by-step Win the client with proposal, set up project with milestones, deliver the work, get approval and payment, manage the relationship, repeat and scale.",
    "url": "/docs/guides/agency-workflow"
  },
  {
    "id": "concepts/workspaces",
    "title": "Workspaces",
    "category": "Concepts",
    "description": "What workspaces are and how they organize your business in Orka.",
    "content": "Workspaces A workspace is your agency's home on Orka. It contains all your projects, team members, clients, and billing settings. Why does Orka use it? Isolation, organization, access control, branding. How does it work? Create workspace, set currency, invite team, add clients.",
    "url": "/docs/concepts/workspaces"
  },
  {
    "id": "concepts/clients",
    "title": "Clients",
    "category": "Concepts",
    "description": "How client relationships work in Orka.",
    "content": "Clients Clients are the companies or individuals you work with. Orka manages the entire client lifecycle. What is it? A record with contact info, project history, invoices, and communication. Why does Orka use it? Single source of truth, relationship tracking, portal access, permission control.",
    "url": "/docs/concepts/clients"
  },
  {
    "id": "concepts/projects",
    "title": "Projects",
    "category": "Concepts",
    "description": "How projects structure your work and deliverables in Orka.",
    "content": "Projects Projects are the core of Orka. Each project tracks proposals, contracts, milestones, payments, and files. Why does Orka use it? Structure, payment tracking, file management, activity feed. How does it work? Create project, add milestones, track progress, manage files, get paid.",
    "url": "/docs/concepts/projects"
  },
  {
    "id": "concepts/milestones",
    "title": "Milestones",
    "category": "Concepts",
    "description": "Breaking work into trackable, payable units.",
    "content": "Milestones Milestones divide your project into clear, manageable units. Each has a deliverable, deadline, and payment. Why does Orka use it? Clear expectations, cash flow, accountability, escrow integration. How does it work? Define milestones, client funds escrow, complete work, client approves, payment released.",
    "url": "/docs/concepts/milestones"
  },
  {
    "id": "concepts/escrow",
    "title": "Escrow",
    "category": "Concepts",
    "description": "How Stellar-powered escrow protects both parties in Orka.",
    "content": "Escrow Escrow holds funds securely until work is approved. It protects both you and your client. Why does Orka use it? Security, trust, automation, transparency. How does it work? Client funds escrow, work begins, milestone approval, funds release, record created.",
    "url": "/docs/concepts/escrow"
  },
  {
    "id": "concepts/wallets",
    "title": "Wallets",
    "category": "Concepts",
    "description": "Connecting and managing Stellar wallets in Orka.",
    "content": "Wallets Wallets are how you receive payments on the Stellar network. Orka uses Freighter, a secure browser wallet extension. Why does Orka use it? Self-custody, security, speed, compatibility. How does it work? Install Freighter, create wallet, connect to Orka, receive payments, sign transactions.",
    "url": "/docs/concepts/wallets"
  },
  {
    "id": "concepts/permissions",
    "title": "Permissions",
    "category": "Concepts",
    "description": "Role-based access control for teams and clients in Orka.",
    "content": "Permissions Permissions control what team members and clients can see and do. Orka uses role-based access control. Team roles: Owner, Admin, Member, Viewer. Client access: Portal access, file access, no admin access. Why does Orka use it? Security, accountability, client safety, compliance.",
    "url": "/docs/concepts/permissions"
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add frontend/public/search-index.json
git commit -m "docs: add Guides and Concepts to search index"
```

---

### Task 11: Docs Homepage Progress Widget

**Files:**
- Modify: `frontend/app/(docs)/docs/page.tsx`

**Interfaces:**
- Consumes: `useDocsProgress` from `@/lib/docs/progress`

- [ ] **Step 1: Add progress widget to docs homepage**

In `frontend/app/(docs)/docs/page.tsx`, add the import (after line 31):

```typescript
import { useDocsProgress } from "@/lib/docs/progress";
```

Add the progress widget section after the hero section and before Quick Start (after line 339, before line 341):

```typescript
      {/* Continue Learning Progress */}
      <ContinueLearningProgress />
```

Add the component definition before the `export default function DocsPage()` (before line 206):

```typescript
function ContinueLearningProgress() {
  const { getSectionProgress, isLoaded } = useDocsProgress();

  if (!isLoaded) return null;

  // Calculate total across all sections
  const sections = ["start-here", "guides", "concepts", "clients", "projects", "payments", "ai", "team", "workspace", "developers", "resources"];
  let totalCompleted = 0;
  let totalItems = 0;

  for (const sectionSlug of sections) {
    const progress = getSectionProgress(sectionSlug);
    totalCompleted += progress.completed;
    totalItems += progress.total;
  }

  if (totalItems === 0) return null;

  const percent = Math.round((totalCompleted / totalItems) * 100);
  const isComplete = totalCompleted === totalItems;

  return (
    <section className="border-b border-black/[0.06] bg-white px-8 py-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-6 rounded-xl border border-black/[0.06] bg-[#f7f8fc] p-5">
          <div className="flex-1">
            <p className="text-[14px] font-bold text-[#082033]">
              {isComplete ? "🎉 Documentation Complete" : "Continue Learning"}
            </p>
            <p className="mt-1 text-[13px] text-[#5f6b86]">
              {totalCompleted} / {totalItems} pages completed
            </p>
            <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className="h-full rounded-full bg-[#22bd93] transition-all duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2 text-[12px] font-bold text-[#22bd93]">
              {percent}%{!isComplete && " — Keep going!"}
            </p>
          </div>
          {isComplete && (
            <div className="text-[2rem]">🎉</div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/app/\(docs\)/docs/page.tsx
git commit -m "feat: add progress widget to docs homepage"
```

---

## Verification

After all tasks are complete, verify:

1. `pnpm build` in `frontend/` succeeds with no errors
2. `pnpm lint` passes
3. Navigate to `/docs` — progress widget shows, new sections appear in sidebar
4. Navigate to `/docs/guides/send-first-invoice` — content renders, reading time shows, CompletionSection appears
5. Click "Mark as Completed" — confetti fires, button changes to "✓ Completed", sidebar shows checkmark
6. Refresh page — completion persists (localStorage)
7. Navigate to `/docs/concepts/escrow` — content renders, Related Articles shows cross-section links
8. Search for "escrow" — returns both Guide and Concept pages
9. Sidebar progress bars update as pages are completed
10. Docs homepage progress widget updates in real-time
