import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Metadata } from "next"
import { Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Changelog · ORKA",
  description: "Latest updates, improvements, and releases from the ORKA team.",
}

const releases = [
  {
    date: "2026-07-26",
    version: "0.8",
    title: "Landing Page Polish & Cleanup",
    tags: ["UI", "DX", "Performance"],
    highlights: [
      "Fixed ThemeProvider default to light mode for fresh production visits",
      "Replaced all custom inline SVGs with lucide-react and react-icons/ri",
      "Removed 31 unused files — legacy dashboard, orphaned components, dead utilities",
      "Removed dead auth-v2 system (17 files); real auth uses Supabase",
      "Redesigned pricing page with billing toggle, 3-tier cards, comparison table",
      "Rewired contact page with decorative hero, floating SVG elements, gradient CTA",
      "Bumped next@16.2.11, postcss@8.5.18, sharp@0.35.0 to fix 10 CVEs",
    ],
    features: [
      "Pricing page with monthly/yearly toggle and feature comparison table",
      "Contact page with floating SVG decorations and gradient CTA button",
      "Changelog page with timeline layout",
    ],
    fixes: [
      "Theme default inconsistent between SSR and client (now light)",
      "Input focus rings showing violet bounding box (removed globally)",
      "Custom SVGs not scaling correctly across components",
    ],
  },
  {
    date: "2026-07-25",
    version: "0.7",
    title: "New Landing Sections & Open Source",
    tags: ["Feature", "UI", "Performance"],
    highlights: [
      "Added ClickSpark, DashboardFeatures, FeatureBento, OpenSource sections",
      "Integrated Interactive IconCloud with live tech stack icons",
      "Redesigned Footer with newsletter signup, social links, tech bar",
      "Updated Hero with avatar circles and refined copy",
      "Added UI primitives: avatar-circles, bento-grid, logo-cloud-2, safari",
      "Installed lenis for smooth-scroll experience",
    ],
    features: [
      "IconCloud component showing ORKA tech stack",
      "Open Source section with GitHub contribution CTA",
      "Footer newsletter signup with inline form",
      "Smooth scrolling via lenis library",
    ],
    fixes: [
      "Simple Icons CDN rendering issues (reverted to CDN URLs)",
      "React-icons/si appearing tiny and black on canvas",
    ],
  },
  {
    date: "2026-07-20",
    version: "0.6",
    title: "Core Workspace & Escrow MVP",
    tags: ["Release", "Escrow", "Stellar"],
    highlights: [
      "Workspace creation and project management flows",
      "USDC escrow funding on Stellar testnet",
      "Milestone approval and release workflow",
      "Client portal with shared token access",
      "Dual-mode custody: ORKA-managed and self-custody (Freighter)",
    ],
    features: [
      "Project workspace with slug-based routing",
      "Soroban escrow contract with multi-sig release",
      "Client portal with shared_token RPC access",
      "Dual custody modes (managed + self-custody)",
    ],
    fixes: [
      "Service role key fallback chain for Supabase",
      "Org creation RLS policy",
    ],
  },
  {
    date: "2026-07-15",
    version: "0.5",
    title: "Dashboard & Onboarding",
    tags: ["Feature", "UI", "Auth"],
    highlights: [
      "App shell with sidebar navigation and workspace switcher",
      "Project detail pages with tabs (overview, milestones, escrow, files)",
      "Sign-in / sign-up flows via Supabase Auth",
      "Auth callback route for OAuth redirects",
    ],
    features: [
      "Responsive sidebar with collapsible sections",
      "Workspace switcher with slug management",
      "Supabase Auth integration (email + OAuth)",
      "Project detail pages with tabbed navigation",
    ],
    fixes: [],
  },
  {
    date: "2026-07-10",
    version: "0.4",
    title: "Foundation & Waitlist",
    tags: ["Release", "Infrastructure"],
    highlights: [
      "Next.js 16 App Router setup with Tailwind v4",
      "Supabase integration with waitlist table and API route",
      "Resend email notifications for waitlist signups",
      "Marketing pages: Home, About, Blog, Pricing, Contact",
      "Stellar SDK package with escrow contract bindings",
    ],
    features: [
      "Waitlist signup with email notification",
      "Soroban smart contracts (orka-escrow)",
      "Rust backend with Axum",
      "TypeScript SDK package",
    ],
    fixes: [],
  },
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-10">
          <h1 className="text-3xl font-semibold tracking-tight text-night">
            Changelog
          </h1>
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-5xl px-6 pt-10 lg:px-10">
        {releases.map((r) => (
          <div key={r.date} className="flex flex-col gap-y-6 md:flex-row">
            {/* Left column — date + version */}
            <div className="shrink-0 md:w-48">
              <div className="pb-10 md:sticky md:top-8">
                <time className="mb-3 block text-sm font-medium text-muted-foreground">
                  {r.date}
                </time>
                <div className="inline-flex relative z-10 size-10 items-center justify-center rounded-lg border border-border bg-card text-sm font-bold text-night shadow-sm">
                  {r.version}
                </div>
              </div>
            </div>

            {/* Right column — content */}
            <div className="relative flex-1 pb-10 md:pl-8">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 hidden h-full w-px bg-border md:block">
                <div className="absolute -left-[5px] size-3 rounded-full bg-primary" />
              </div>

              <Card className="space-y-6 rounded-xl border p-6 shadow-sm md:p-8">
                {/* Title + tags */}
                <div className="relative z-10 flex flex-col gap-2">
                  <h2 className="text-balance text-2xl font-semibold tracking-tight text-night">
                    {r.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="h-6 rounded-full border px-2 text-[11px] font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2">
                  {r.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Sparkles size={14} className="mt-0.5 shrink-0 text-orange" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Collapsible sections */}
                {(r.features.length > 0 || r.fixes.length > 0) && (
                  <Accordion type="multiple" className="w-full">
                    {r.features.length > 0 && (
                      <AccordionItem value="features">
                        <AccordionTrigger className="text-sm font-semibold text-night">
                          Features
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1.5">
                            {r.features.map((f) => (
                              <li
                                key={f}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-teal" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {r.fixes.length > 0 && (
                      <AccordionItem value="fixes">
                        <AccordionTrigger className="text-sm font-semibold text-night">
                          Bug Fixes
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1.5">
                            {r.fixes.map((f) => (
                              <li
                                key={f}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-orange" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                )}
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
