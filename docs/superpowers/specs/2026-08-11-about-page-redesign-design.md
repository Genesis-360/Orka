# About Page Redesign — Design Spec

**Date:** 2026-08-11  
**Scope:** Complete replacement of the existing About page  
**Reference:** Attached design direction image + user specification

---

## 1. Goal

Replace the current About page (`frontend/app/(marketing)/about/page.tsx`) with a completely new, editorial-style About page that visually extends the Orka landing page's design system. The page communicates what Orka is, why it exists, what technology powers it, and who is building it — using an alternating cream/navy visual rhythm.

## 2. What Changes

| Item | Action |
|------|--------|
| `app/(marketing)/about/page.tsx` | **Delete and rewrite** — new page composing new section components |
| `components/about/` (new directory) | **Create** — 9 section components |
| Landing page (`app/page.tsx`) | **No changes** |
| Navbar (`components/Navbar.tsx`) | **No changes** |
| Footer (`components/Footer.tsx`) | **No changes** — imported and rendered as-is |
| Marketing layout | **No changes** |
| `globals.css` | **Minimal additions** — timeline CSS, any needed utility classes only |
| Other routes/components | **No changes** |

## 3. Component Architecture

```
app/(marketing)/about/
  page.tsx                    # Metadata + compose all sections

components/about/
  AboutHero.tsx               # Section 01 — Hero with floating cards
  AboutStats.tsx              # Section 02 — Numbers bar
  AboutMission.tsx            # Section 03 — Dark navy mission
  AboutJourney.tsx            # Section 04 — Timeline
  AboutPrinciples.tsx         # Section 05 — 5 principle cards
  AboutTechnology.tsx         # Section 06 — Dark navy tech stack
  AboutTeam.tsx               # Section 07 — Founder profiles
  AboutCTA.tsx                # Section 08 — Dark navy CTA
```

The page.tsx composes:
```
<AboutHero />
<AboutStats />
<AboutMission />
<AboutJourney />
<AboutPrinciples />
<AboutTechnology />
<AboutTeam />
<AboutCTA />
```

Footer and Navbar come from the `(marketing)/layout.tsx` wrapper — no import needed in page.tsx.

## 4. Section Designs

### Section 01 — AboutHero

**Background:** `bg-paper` (cream)  
**Layout:** Two-column (60/40 split on desktop, stacked on mobile)

**Left column:**
- Eyebrow: `ABOUT ORKA` — small, uppercase, `text-violet`, tracked
- Headline: `THE WHY\nBEHIND ORKA.` — `.display` class (Anton), `text-5xl md:text-7xl`, tight leading. `ORKA.` wrapped in `text-violet`
- Body: "Orka is the financial operating system for service businesses — built to simplify payments, escrow, milestones, and settlements on Stellar."
- Secondary line: "Transparent. Automated. Built for scale." in `text-muted-foreground`
- Two CTA buttons: "Our Mission →" (violet bg, white text) and "Explore Product" (border outline)

**Right column — Identity composition:**
- Centered: ORKA logo (`/Logo/logo.svg`) inside a subtle orbit ring (CSS `border` circle with dashed border, slow rotation animation)
- Three floating cards positioned around the logo:
  - **Top-right:** "Built on Stellar" — "Fast, low-cost and borderless payments." — small green dot indicator
  - **Left:** "For Service Businesses" — "Freelancers, agencies and their clients."
  - **Bottom-right:** "Our Mission" — "Eliminate admin tax and bring fairness to payments." — small purple dot indicator
- Cards: `bg-white border border-border/50 rounded-2xl shadow-sm p-4`, max-w-xs
- Subtle float animation on cards (different delays per card)

**Mobile:** Hero text stacks on top, visual composition moves below. Cards stack vertically with logo centered.

### Section 02 — AboutStats

**Background:** `bg-paper` (cream)  
**Layout:** Full-width cream card with border, rounded-3xl, inside a max-w container

**Content — 5 statistics in a row:**
| Number | Label |
|--------|-------|
| `50+` | Early Users |
| `$120K+` | Value Locked (Testnet) |
| `2.5K+` | Transactions |
| `10+` | Integrations |
| `2026` | Mainnet Vision |

- Numbers: `.display` class or `font-bold text-3xl md:text-4xl text-night`
- Labels: `text-sm text-muted-foreground`
- Separators: vertical `border-r border-border/30` between items on desktop
- Mobile: 2-column grid, last item spans full width or 3+2 layout
- Eyebrow: `ORKA IN NUMBERS` in violet, above the card

### Section 03 — AboutMission

**Background:** `bg-night` (dark navy `#082033`)  
**Layout:** Two-column (55/45 split), `rounded-3xl` card, `text-white`

**Left column:**
- Eyebrow: `OUR MISSION` in `text-orange`
- Headline: "We started Orka\nto kill the admin tax." — `.display` class, `text-4xl md:text-5xl`. "admin tax" wrapped in `text-orange`
- Body text: "Freelancers and agencies shouldn't need spreadsheets, scattered payment tools, manual reconciliation, and endless follow-ups just to get paid. Orka brings payments, escrow, milestones, reconciliation, and settlement into one financial operating system." — `text-white/70`

**Right column — 2x2 principle grid:**
| Icon | Title | Description | Color |
|------|-------|-------------|-------|
| Eye (lucide) | Transparent | Clear flows and open systems. | `text-violet` |
| Zap (lucide) | Automated | Remove repetitive financial work. | `text-orange` |
| Shield (lucide) | Secure | Built on reliable financial infrastructure. | `text-teal` |
| Heart (lucide) | Fair | Better payment experiences for service businesses. | `text-lime` |

- Each principle: icon in a small colored circle bg, title `font-semibold text-white`, description `text-white/60 text-sm`
- Background: subtle grid pattern overlay (CSS `linear-gradient` grid, low opacity)
- Floating decorative elements: small orbit rings or dots in corners (very subtle)

### Section 04 — AboutJourney

**Background:** `bg-paper` (cream)  
**Layout:** Full-width with max-w container

**Header:**
- Eyebrow: `OUR JOURNEY` in violet
- Headline: "From an idea to something real." — `.display` or `font-bold text-4xl`. "real" in `text-violet`

**Timeline — Horizontal on desktop, vertical on mobile:**

```
2023 -------- 2024 -------- 2025 -------- 2026
  │             │             │             │
The Spark    Building     Growing       What's Next
              Orka        Together
```

- Horizontal line: `border-t-2 border-border/30`
- Year labels: `font-mono text-sm text-violet` (above line)
- Event titles: `font-semibold text-night` (below line)
- Descriptions: `text-sm text-muted-foreground` (below title)
- Current year (2026): green/lime dot indicator on the timeline point
- Timeline points: `w-3 h-3 rounded-full bg-violet border-2 border-paper`

**Timeline data:**
| Year | Title | Description |
|------|-------|-------------|
| 2023 | The Spark | Faced real payment chaos while working with freelancers. |
| 2024 | Building Orka | Shipped testnet, built core flows, got our first users. |
| 2025 | Growing Together | Onboarded agencies, improved product, strong community. |
| 2026 | What's Next | Mainnet launch, more automations, global scale. |

**Right side (desktop only):** A small "live status" card:
- "Currently building" → "Orka" — "Influencer OS & Escrow on Stellar"
- "Learning" → "Midnight" — "Privacy-first smart contracts"
- Green dot indicator for "live"

**Mobile:** Timeline becomes vertical (left-aligned line, events stack below each point).

### Section 05 — AboutPrinciples

**Background:** `bg-paper` (cream)  
**Layout:** 5-column grid on desktop, 2-column + 1 on tablet, single column on mobile

**Header:**
- Eyebrow: `WHAT WE BELIEVE IN` in violet
- Headline: "Principles that guide every decision." — "guide" in `text-violet`

**5 Cards:**

| # | Title | Description | Accent Color |
|---|-------|-------------|--------------|
| 01 | Transparency | Open systems build real trust. | `text-violet` |
| 02 | Trust | Escrow, milestones and on-chain truth. | `text-teal` |
| 03 | Automation | Remove friction. Empower people. | `text-orange` |
| 04 | Simplicity | Powerful systems that are simple to use. | `text-lime` |
| 05 | Ownership | We build with long-term vision, not quick wins. | `text-violet` |

- Card style: `bg-white border border-border/50 rounded-2xl p-6`
- Number: `text-xs font-mono text-muted-foreground` (top of card)
- Icon: small lucide icon in the card's accent color
- Title: `font-semibold text-night`
- Description: `text-sm text-muted-foreground`
- Hover: subtle `shadow-sm` transition

### Section 06 — AboutTechnology

**Background:** `bg-night` (dark navy)  
**Layout:** Two-column split, `rounded-3xl`, `text-white`

**Left column:**
- Eyebrow: `TECH WE BUILD ON` in `text-orange`
- Headline: "Modern. Scalable.\nFuture-ready." — `.display` class, "Future-ready." in `text-lime`
- Body: "Orka is built with modern, proven technology — designed for reliability, speed, and global scale." — `text-white/70`

**Right column — Tech grid:**
Display as a polished grid of technology badges/chips:

| Tech | Exists in codebase |
|------|-------------------|
| Stellar | ✅ `lib/stellar.ts`, `@orka/stellar-sdk` |
| Next.js | ✅ `package.json` |
| TypeScript | ✅ `tsconfig.json` |
| Tailwind CSS | ✅ `globals.css` |
| Supabase | ✅ `lib/supabase.ts` |
| Node.js | ✅ backend dependency |
| PostgreSQL | ✅ via Supabase |

- Each tech: small chip with icon (from CDN `cdn.simpleicons.org` like footer uses) + name
- Chip style: `bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white`
- Grid: 2-3 columns inside the dark section

### Section 07 — AboutTeam

**Background:** `bg-paper` (cream)  
**Layout:** Two founder cards side-by-side on desktop, stacked on mobile

**Header:**
- Eyebrow: `THE HUMANS` in violet
- Headline: "The team behind Orka." — "Orka" in `text-violet`

**Founder cards (2):**

**Card 1 — Janvi:**
- Initial avatar with gradient bg (`from-violet to-orange`)
- Name: `Janvi`
- Role: `Co-founder & Builder`
- Bio: "Full stack engineer and Web3 builder. Loves turning complex problems into simple products."
- Social: X, LinkedIn, GitHub, Email icons

**Card 2 — Siddharth:**
- Initial avatar with gradient bg (`from-teal to-lime`)
- Name: `Siddharth`
- Role: `Co-founder & Strategist`
- Bio: "Product thinker and growth hacker. Focused on building systems that scale and last."
- Social: X, LinkedIn, GitHub, Email icons (GitHub links to `https://github.com/x0lg0n`)

- Card style: `bg-white border border-border/50 rounded-3xl p-8`
- Avatar: `w-20 h-20 rounded-full` with gradient bg and initial letter
- Social icons: lucide or react-icons, `text-muted-foreground hover:text-night`

### Section 08 — AboutCTA

**Background:** `bg-night` (dark navy)  
**Layout:** Centered text, `rounded-3xl`, with decorative orbit graphic on right

**Content:**
- Eyebrow: `LET'S BUILD THE FUTURE` in `text-orange`
- Headline: "Ready to automate\nyour financial\noperations?" — `text-4xl md:text-5xl font-bold text-white`. "financial" in `text-orange`
- CTA: "Get Started →" button — `bg-lime text-night font-semibold rounded-full px-8 py-4`
- Subtle orbit/network graphic on the right side (CSS-drawn circles + dots, low opacity)

**Mobile:** Centered, graphic hidden or reduced.

## 5. Reused Existing Elements

| Element | Source | How Used |
|---------|--------|----------|
| Navbar | `components/Navbar.tsx` | Via `(marketing)/layout.tsx` — no changes |
| Footer | `components/Footer.tsx` | Via `(marketing)/layout.tsx` — no changes |
| ORKA logo | `public/Logo/logo.svg` | In hero composition, team section |
| Button component | `components/ui/button.tsx` | CTA buttons throughout |
| lucide-react icons | Already installed | Icons for principles, tech, team |
| react-icons | Already installed | Social icons in team section |
| Color tokens | `globals.css` | `bg-paper`, `bg-night`, `text-violet`, `text-orange`, `text-lime`, `text-teal` |
| Font classes | `globals.css` | `.display`, `.section-label`, `font-mono` |
| `cn()` utility | `lib/utils.ts` | Class merging |

## 6. Animation Plan

| Element | Animation | Method |
|---------|-----------|--------|
| Hero cards | Subtle float (different delays) | CSS `@keyframes float-y` with `animation-delay` |
| Stats numbers | Fade-in on scroll | CSS `@keyframes fadeSlideIn` or framer-motion `whileInView` |
| Mission section | Fade-up on scroll | framer-motion `whileInView` + `viewport={{ once: true }}` |
| Timeline points | Reveal on scroll | CSS transition with Intersection Observer |
| Principle cards | Stagger fade-in | framer-motion staggerChildren |
| Tech chips | Fade-in on scroll | framer-motion `whileInView` |
| CTA orbit | Slow rotation | CSS `@keyframes spin` at very low speed |
| All sections | `prefers-reduced-motion` respected | CSS media query disables animations |

## 7. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| ≥1280px | Full editorial layouts, 5-col principles, horizontal timeline |
| 1024px | Reduced spacing, 3-col principles, horizontal timeline |
| 768px | 2-col grids, timeline still horizontal but compressed |
| <768px | Single column, vertical timeline, hero stacks, cards stack |

## 8. Content Sources

All copy is derived from existing About page content and user specification:

- **Founders:** Hardcoded in current `about/page.tsx` — reuse names, roles, bios
- **Stats:** 50+ agencies, 2026 launch year from current page; $120K+, 2.5K+, 10+ from user spec
- **Values:** Transparency, Trust, Automation, Simplicity from current page + Ownership added
- **Tech stack:** Verified from `package.json`, `globals.css`, `lib/stellar.ts`
- **Social links:** From current About page and Footer
- **FAQ:** NOT included in new design (removed per user's 9-section spec)
- **Timeline:** 2023-2026 from user spec — matches project genesis narrative

## 9. What Is NOT Changed

- Landing page (`app/page.tsx`)
- All landing page components (`Hero.tsx`, `FeatureBento.tsx`, etc.)
- Navbar component
- Footer component
- Marketing layout
- Auth pages
- Dashboard/workspace pages
- Global CSS design tokens (only additions, no modifications)
- Any other route or component

## 10. Verification Criteria

After implementation:
- [ ] Old About page content completely replaced
- [ ] 9 sections render in correct order
- [ ] Cream background is primary canvas
- [ ] Dark navy sections at positions 03, 06, 08
- [ ] Purple accent used for eyebrows and highlights
- [ ] Orange accent used for mission eyebrow, tech eyebrow, CTA eyebrow
- [ ] Green/lime used for timeline current year, CTA button
- [ ] Existing Navbar renders correctly on About page
- [ ] Existing Footer renders correctly on About page
- [ ] No duplicate footer created
- [ ] All team data matches existing founders
- [ ] All tech matches codebase dependencies
- [ ] Timeline is horizontal on desktop, vertical on mobile
- [ ] No horizontal overflow at any breakpoint
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Landing page unchanged
- [ ] `prefers-reduced-motion` respected
