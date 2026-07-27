# Orka Documentation Redesign — Design Spec

## Overview

Complete redesign of the Orka documentation experience from feature-based to journey-based. Light theme only. Core layout + homepage first (detail page later).

**Reference designs:** Two mockups showing homepage (hero, quick start, learning paths, browse) and detail page (3-column layout with sidebar, article, context panel).

---

## Architecture

### Routes
```
app/(docs)/
  layout.tsx              ← New docs shell (sidebar + topbar)
  docs/
    page.tsx              ← Homepage
    [...slug]/
      page.tsx            ← Detail page (3-column)
```

### Navigation Config
Replace `lib/docs/config.ts` with 9 journey-based categories:
1. **Start Here** (rocket) — Welcome, Why Orka, Create Workspace, Connect Wallet, Invite Team, First Project
2. **Clients** (users) — Add Client, Client Profiles, Client Portal, Import Clients, Permissions
3. **Projects** (folder) — Create Project, Milestones, Deliverables, Templates, Project Status, Files
4. **Payments** (wallet) — Generate Invoice, Escrow, Release Payments, Cross-border, Payment History, Refunds
5. **AI** (sparkles) — Generate Proposal, AI Contracts, Smart Suggestions, AI Invoice Assistant, Coming Soon
6. **Team** (people) — Invite Members, Roles, Permissions, Activity, Approvals
7. **Workspace** (settings) — Branding, Notifications, Integrations, Preferences, Themes
8. **Developers** (code) — API, Authentication, SDK, Webhooks, Examples
9. **Resources** (book) — FAQ, Roadmap, Changelog, Support, Community, GitHub

### Component Tree
```
components/docs/
  DocsSidebar.tsx         ← Vertical sticky sidebar
  DocsTopbar.tsx          ← Slim top bar (breadcrumb + search + Ask AI)
  DocsSearchModal.tsx     ← Cmd+K search overlay (updated styling)
  DocsToc.tsx             ← On This Page (right sidebar, detail page)
  DocsBreadcrumbs.tsx     ← Breadcrumb navigation
  PrevNextNav.tsx         ← Previous/Next with journey context
  Feedback.tsx            ← Was this helpful?
  RelatedArticles.tsx     ← Related articles
  Callout.tsx             ← Tip/Warning/Business Tip
  QuickStart.tsx          ← 6-card onboarding checklist
  LearningPaths.tsx       ← 4 path cards (Freelancer, Agency, Developer, Client)
  PopularGuides.tsx       ← 6 popular guide cards
  BrowseCategories.tsx    ← Category grid with article counts
  WhatsNew.tsx            ← Recent updates list
  NeedHelp.tsx            ← Support/Community/GitHub links
  OrkaAiCard.tsx          ← AI promo card for sidebar
```

---

## Visual Design

### Color System (Light Theme Only)
- Background: `#fffaf2` (paper)
- Sidebar: `#ffffff` with `border-right: 1px solid rgba(0,0,0,0.06)`
- Cards: `#ffffff` with `border: 1px solid rgba(0,0,0,0.06)`
- Primary: `#9474ff` (violet) — buttons, active states, links
- Text primary: `#082033` (night)
- Text secondary: `#5f6b86` (muted)
- Success: `#22bd93` (teal)
- Warning: `#ff8a22` (orange)
- Danger: `#ff4f42` (coral)
- Info: `#3b82f6` (blue)

### Category Icon Colors
- Start Here: `#9474ff` (violet)
- Clients: `#3b82f6` (blue)
- Projects: `#9474ff` (violet)
- Payments: `#22bd93` (teal)
- AI: `#ff8a22` (orange)
- Team: `#3b82f6` (blue)
- Workspace: `#5f6b86` (gray)
- Developers: `#22bd93` (teal)
- Resources: `#9474ff` (violet)

### Typography
- Headings: DM Sans (bold/black)
- Body: DM Sans (regular/medium)
- Code: JetBrains Mono
- Display: Anton (for hero section only)

---

## Component Specifications

### 1. DocsSidebar (260px, sticky, full height)
- Orka logo at top
- Search bar (Cmd+K trigger) below logo
- 9 categories with icons, expandable children
- Accordion: only one category expanded at a time
- Active page: violet left border + violet text
- Orka AI promo card at bottom (gradient violet)
- Need help? links at very bottom (Support, Community, GitHub)

### 2. DocsTopbar (48px, sticky, detail pages only)
- Left: Breadcrumb (Home > Category > Page)
- Center: Search trigger (or search bar)
- Right: "Ask AI" button with sparkle icon
- White background, subtle bottom border

### 3. Homepage Sections

#### Hero
- Heading: "Everything you need to run your service business with Orka."
- Subtext: "Step-by-step guides, best practices and resources to help you win clients, deliver great work and get paid — faster."
- Search bar with Cmd+K icon
- CTAs: "Search Documentation" (violet) + "Start Learning" (outline)
- Dashboard preview card floating on right (decorative, not functional)

#### Quick Start
- 6 cards, horizontal grid
- Each: step number (1-6, small badge), icon, title, description
- Cards: Create Workspace, Connect Wallet, Invite Team, Add Client, Create Project, Get Paid

#### Learning Paths
- 4 cards in a row
- Freelancer: checklist (Create Workspace → Connect Wallet → Add Client → Generate Proposal → Create Project → Invoice Client → Receive Payment)
- Agency: checklist (Create Workspace → Invite Team → Add Clients → Create Projects → Milestones → Escrow → Analytics)
- Developer: checklist (Authentication → SDK → API → Webhooks → Examples)
- Client: "Coming soon" badge, disabled state

#### Popular Guides
- 6 cards in 2 rows of 3
- Each: colored icon, title, description, "Read Guide →" link

#### Browse Documentation
- 3-column grid of category cards
- Each: colored icon, title, article count ("X articles")
- Link to category page

#### What's New
- List of 3 recent updates
- Each: title, description, tag (New/Improvement)
- "View all updates →" link

#### Need Help
- Dark background section (night color)
- Left: Support + Community cards
- Right: GitHub card
- Each with icon, title, description, link

### 4. Detail Page (Phase 2 — not this phase)
- 3-column: left sidebar (260px) | center article (740-780px max) | right context (240px)
- Center: breadcrumb, title, summary, reading time, last updated, content, prev/next
- Right: On This Page TOC, reading time, related articles, business tip, last updated, was this helpful, need help

---

## Content Structure

Fresh MDX files in `content/docs/` organized by the 9 categories. Each file has frontmatter:
```yaml
---
title: "Page Title"
description: "Brief description"
category: "start-here"  # matches sidebar category slug
order: 1                 # position within category
icon: "rocket"           # optional, for category pages
---
```

### Minimum Viable Content (Phase 1)
Create placeholder articles for each category with enough content to demonstrate the layout:

**Start Here:** Welcome to Orka, Why Orka, Create Workspace, Connect Wallet, Invite Team, Your First Project
**Clients:** Add Client, Client Profiles, Client Portal
**Projects:** Create Project, Milestones, Deliverables
**Payments:** Generate Invoice, Escrow, Release Payments
**AI:** Generate Proposal, AI Contracts, Smart Suggestions
**Team:** Invite Members, Roles, Permissions
**Workspace:** Branding, Notifications, Integrations
**Developers:** API, Authentication, SDK
**Resources:** FAQ, Roadmap, Changelog

Each article: 200-400 words with headings, callouts, and business tips.

---

## Search Experience

- Cmd+K opens search modal
- Search understands intent (not exact titles)
- Results grouped by category
- Keyboard navigation (up/down arrows, enter to select)
- Recent searches remembered

---

## Responsive Behavior

- Desktop: Sidebar visible, 3-column detail layout
- Tablet (< 1024px): Sidebar collapsed to icons, 2-column detail
- Mobile (< 768px): Sidebar hidden (hamburger menu), single column

---

## Implementation Order

1. **Layout shell** — `app/(docs)/layout.tsx` with sidebar + topbar
2. **Sidebar** — `DocsSidebar.tsx` with categories, search, AI card
3. **Topbar** — `DocsTopbar.tsx` with breadcrumb, search, Ask AI
4. **Homepage** — `docs/page.tsx` with all 7 sections
5. **Content** — Fresh MDX files for all 9 categories
6. **Search** — Update search modal for new styling
7. **Navigation config** — New `lib/docs/config.ts`

---

## Success Criteria

- [ ] Light theme matches reference images
- [ ] Vertical sidebar with 9 categories, expandable, accordion behavior
- [ ] Homepage has all 7 sections (hero, quick start, learning paths, popular guides, browse, what's new, need help)
- [ ] Search works with Cmd+K
- [ ] Responsive across desktop, tablet, mobile
- [ ] Fresh content in all 9 categories
- [ ] Orka AI card in sidebar
- [ ] Ask AI button in topbar
