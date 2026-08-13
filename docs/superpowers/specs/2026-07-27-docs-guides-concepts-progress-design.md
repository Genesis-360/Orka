# Design: Orka Documentation — Guides, Concepts & Reading Progress

**Date:** 2026-07-27
**Status:** Approved

## Overview

Extend Orka's existing documentation with two new categories (Guides, Concepts), a persistent reading progress system, and UX improvements that transform static feature docs into a guided learning experience.

## Architecture Decisions

- **Completion tracking:** React Context + localStorage (`DocsProgressProvider`)
- **Related articles:** Cross-section with manual `related` field on `DocItem`, fallback to same-section
- **Reading time:** Auto-calculated server-side from MDX word count (200 WPM)
- **Confetti:** Custom canvas animation (~80 lines), no library dependency
- **Progress UI:** Consolidated at page bottom (no right sidebar feedback widget)

---

## 1. New Content — Guides (7 pages)

**Directory:** `frontend/content/docs/guides/`

| File | Title | Category Slug |
|------|-------|---------------|
| `send-first-invoice.mdx` | Send First Invoice | guides |
| `create-first-proposal.mdx` | Create First Proposal | guides |
| `milestone-payments.mdx` | Milestone Payments | guides |
| `manage-clients.mdx` | Manage Clients | guides |
| `international-payments.mdx` | International Payments | guides |
| `team-collaboration.mdx` | Team Collaboration | guides |
| `agency-workflow.mdx` | Agency Workflow | guides |

**Frontmatter format** (same as existing):
```yaml
---
title: "Send First Invoice"
description: "Step-by-step guide to creating and sending your first invoice."
category: "guides"
order: 1
---
```

**Content structure per page:**
- Overview
- Why it matters
- Before you begin
- Step-by-step walkthrough
- Best practices
- Common mistakes
- What's next
- Related Articles (cross-section links)

---

## 2. New Content — Concepts (7 pages)

**Directory:** `frontend/content/docs/concepts/`

| File | Title | Category Slug |
|------|-------|---------------|
| `workspaces.mdx` | Workspaces | concepts |
| `clients.mdx` | Clients | concepts |
| `projects.mdx` | Projects | concepts |
| `milestones.mdx` | Milestones | concepts |
| `escrow.mdx` | Escrow | concepts |
| `wallets.mdx` | Wallets | concepts |
| `permissions.mdx` | Permissions | concepts |

**Content structure per page:**
- What is it?
- Why does Orka use it?
- How does it work?
- When should you use it?
- Common misconceptions
- Related documentation

---

## 3. Sidebar Configuration Updates

**File:** `frontend/lib/docs/config.ts`

### 3a. New `DocItem.related` field
```typescript
interface DocItem {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  businessTip?: string;
  children?: DocItem[];
  related?: string[]; // NEW: slugs like "payments/escrow"
}
```

### 3b. New sections in `docsNavigation`

Insert after "Start Here" and before "Clients":

```typescript
{
  title: "Guides",
  slug: "guides",
  icon: "map",       // NEW icon
  color: "#ff8a22",
  description: "Step-by-step workflows to get things done.",
  items: [
    { title: "Send First Invoice", slug: "send-first-invoice", related: ["payments/generate-invoice", "payments/escrow"] },
    { title: "Create First Proposal", slug: "create-first-proposal", related: ["ai/generate-proposal", "projects/create-project"] },
    { title: "Milestone Payments", slug: "milestone-payments", related: ["projects/milestones", "payments/escrow"] },
    { title: "Manage Clients", slug: "manage-clients", related: ["clients/add-client", "clients/client-profiles"] },
    { title: "International Payments", slug: "international-payments", related: ["payments/cross-border-payments", "payments/escrow"] },
    { title: "Team Collaboration", slug: "team-collaboration", related: ["team/invite-members", "team/roles"] },
    { title: "Agency Workflow", slug: "agency-workflow", related: ["start-here/your-first-project", "team/approvals"] },
  ],
},
{
  title: "Concepts",
  slug: "concepts",
  icon: "lightbulb",  // NEW icon
  color: "#3b82f6",
  description: "Understand the ideas behind Orka's features.",
  items: [
    { title: "Workspaces", slug: "workspaces", related: ["start-here/create-workspace", "workspace/branding"] },
    { title: "Clients", slug: "clients", related: ["clients/add-client", "clients/client-portal"] },
    { title: "Projects", slug: "projects", related: ["projects/create-project", "projects/milestones"] },
    { title: "Milestones", slug: "milestones", related: ["projects/milestones", "payments/escrow"] },
    { title: "Escrow", slug: "escrow", related: ["payments/escrow", "payments/release-payments"] },
    { title: "Wallets", slug: "wallets", related: ["start-here/connect-wallet", "payments/cross-border-payments"] },
    { title: "Permissions", slug: "permissions", related: ["team/permissions", "team/roles"] },
  ],
},
```

### 3c. Sidebar order in `docsNavigation` array

```
1. Start Here
2. Guides         (NEW)
3. Concepts       (NEW)
4. Clients
5. Projects
6. Payments
7. AI
8. Team
9. Workspace
10. Developers
11. Resources
```

---

## 4. Completion Tracking System

### 4a. Progress Context

**New file:** `frontend/lib/docs/progress.tsx`

```typescript
"use client";

interface DocsProgressContextValue {
  completedSlugs: Set<string>;
  markCompleted: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  getSectionProgress: (sectionSlug: string) => { completed: number; total: number; percent: number };
  getNextRecommended: (currentSlug: string) => DocItem | null;
}
```

- Provider wraps `app/(docs)/layout.tsx`
- Reads `orka-docs-progress` from localStorage on mount
- Writes on every `markCompleted`
- `getSectionProgress` computes from `docsNavigation` + completed set
- `getNextRecommended` follows sidebar order, skips completed pages

### 4b. localStorage schema

Key: `orka-docs-progress`
Value: `string[]` — array of completed slugs (e.g., `["start-here/welcome-to-orka", "guides/send-first-invoice"]`)

---

## 5. Sidebar Updates

**File:** `frontend/components/docs/DocsSidebar.tsx`

### 5a. Checkmarks
Each item gets a green `✓` when completed. Replace the bullet or sit beside title.

### 5b. Section progress
When expanded, show `{completed}/{total}` count + thin progress bar (3px height, section color, animated width).

### 5c. New icons
Add `map` and `lightbulb` to `iconMap`:
```typescript
import { Map, Lightbulb } from "lucide-react";

const iconMap = {
  // ... existing
  map: Map,
  lightbulb: Lightbulb,
};
```

---

## 6. Page Bottom — CompletionSection

**New file:** `frontend/components/docs/CompletionSection.tsx`

Replaces `Feedback.tsx` at bottom of doc pages. Layout:

```
Was this page helpful?
[👍 Yes]  [👎 No]
───────────────────────
[✓ Mark as Completed]
(click → animation → "✓ Completed" green)
───────────────────────
Nice work! 🎉
Next Recommended
→ Invite Team
Estimated Time: 2 min
[Continue Reading]
```

- Feedback uses existing localStorage pattern (`docs-feedback-{slug}`)
- Completion calls `markCompleted` from context
- Confetti fires once on completion
- Next recommended uses `getNextRecommended` from context

### Reading time
Auto-calculated in `page.tsx`:
```typescript
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

Display: `5 min read · Beginner` above article title.

---

## 7. Right Sidebar Simplification

**File:** `frontend/components/docs/DocsRightSidebar.tsx`

Remove `Feedback` import and rendering. Keep only `DocsToc`.

---

## 8. Related Articles (Cross-Section)

**File:** `frontend/lib/docs/config.ts`

Update `getRelatedArticles`:
```typescript
export function getRelatedArticles(slug: string, limit = 4): DocItem[] {
  const parts = slug.split("/");
  const sectionSlug = parts[0];
  const itemSlug = parts[1];

  // Find the current item's related field
  const section = docsNavigation.find((s) => s.slug === sectionSlug);
  const currentItem = section?.items.find((i) => i.slug === itemSlug);

  if (currentItem?.related) {
    // Resolve related slugs to DocItems
    return currentItem.related
      .map((relSlug) => {
        const [sSlug, iSlug] = relSlug.split("/");
        const s = docsNavigation.find((sec) => sec.slug === sSlug);
        return s?.items.find((i) => i.slug === iSlug);
      })
      .filter(Boolean)
      .slice(0, limit) as DocItem[];
  }

  // Fallback: same section items
  if (!section) return [];
  return section.items
    .filter((item) => `${section.slug}/${item.slug}` !== slug)
    .slice(0, limit);
}
```

---

## 9. Search Index Update

**File:** `frontend/public/search-index.json`

Add 14 new entries for Guides and Concepts pages. Each follows existing format:
```json
{
  "id": "guides/send-first-invoice",
  "title": "Send First Invoice",
  "category": "Guides",
  "description": "Step-by-step guide to creating and sending your first invoice.",
  "content": "...extracted text...",
  "url": "/docs/guides/send-first-invoice"
}
```

---

## 10. Docs Homepage Progress Widget

**File:** `frontend/app/(docs)/docs/page.tsx`

Add "Continue Learning" card above Quick Start section:
- Shows `{completed} / {total} pages completed`
- Progress bar (animated)
- Percentage
- "Keep going!" or "🎉 Documentation Complete" when 100%

Uses `DocsProgressContext` via `useContext`.

---

## 11. Confetti Animation

**New file:** `frontend/components/docs/ConfettiCanvas.tsx`

- Full-screen fixed canvas (pointer-events: none, z-50)
- 40-60 particles, Orka palette colors
- Physics: gravity, rotation, opacity fade
- Auto-removes after 700ms
- Triggered by completion state change

---

## Files to Create

| File | Purpose |
|------|---------|
| `frontend/content/docs/guides/*.mdx` (7) | Guide pages |
| `frontend/content/docs/concepts/*.mdx` (7) | Concept pages |
| `frontend/lib/docs/progress.tsx` | Completion context + provider |
| `frontend/components/docs/CompletionSection.tsx` | Bottom section (helpful + completed + next) |
| `frontend/components/docs/ConfettiCanvas.tsx` | Confetti animation |

## Files to Modify

| File | Changes |
|------|---------|
| `frontend/lib/docs/config.ts` | Add sections, `related` field, update `getRelatedArticles` |
| `frontend/components/docs/DocsSidebar.tsx` | Add checkmarks, progress bars, new icons |
| `frontend/components/docs/DocsRightSidebar.tsx` | Remove Feedback widget |
| `frontend/app/(docs)/docs/[...slug]/page.tsx` | Add reading time, replace Feedback with CompletionSection |
| `frontend/app/(docs)/layout.tsx` | Wrap with DocsProgressProvider |
| `frontend/app/(docs)/docs/page.tsx` | Add progress widget |
| `frontend/public/search-index.json` | Add 14 new entries |
| `frontend/components/docs/RelatedArticles.tsx` | Support cross-section resolution |

## Constraints

- Keep existing routing unchanged
- Keep current design system (Tailwind v4, color palette)
- Maintain responsive behavior
- Support dark/light themes (existing CSS variables)
- Preserve accessibility (ARIA labels, keyboard nav)
- No new npm dependencies
- No backend changes
