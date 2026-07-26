"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const tiers = [
  {
    name: "Starter",
    monthly: "$0",
    yearly: "$0",
    blurb: "For freelancers testing the waters.",
    features: [
      "1 active workspace",
      "Up to 3 projects",
      "On-chain escrow (USDC)",
      "Client portal links",
    ],
    highlight: false,
  },
  {
    name: "Studio",
    monthly: "$29",
    yearly: "$290",
    blurb: "For growing teams running real engagements.",
    features: [
      "Unlimited projects",
      "Milestone automation",
      "Proposals & invoices",
      "Analytics dashboard",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    yearly: "Custom",
    blurb: "For agencies with custom compliance needs.",
    features: [
      "Everything in Studio",
      "SSO & audit logs",
      "Dedicated chain infra",
      "White-glove onboarding",
    ],
    highlight: false,
  },
]

const comparisons = [
  ["Active workspaces", "1", "Unlimited", "Unlimited"],
  ["Projects", "Up to 3", "Unlimited", "Unlimited"],
  ["On-chain escrow (USDC)", "✓", "✓", "✓"],
  ["Client portal links", "✓", "✓", "✓"],
  ["Milestone automation", "—", "✓", "✓"],
  ["Proposals & invoices", "—", "✓", "✓"],
  ["Analytics dashboard", "—", "✓", "✓"],
  ["SSO & audit logs", "—", "—", "✓"],
  ["Dedicated chain infra", "—", "—", "✓"],
  ["White-glove onboarding", "—", "—", "✓"],
  ["Support", "Community", "Priority email", "Dedicated manager"],
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="bg-paper overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-night px-4 pb-16 pt-5 text-white rounded-b-[42px] md:rounded-b-[72px] md:px-8 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />

        {/* Floating SVG decorations */}
        <Image
          src="/Elements/star-blue.svg"
          alt=""
          aria-hidden
          width={40}
          height={40}
          className="pointer-events-none absolute right-[14%] top-[20%] hidden w-8 object-contain opacity-60 md:block lg:w-10 float-1"
        />
        <Image
          src="/Elements/plus-lime.svg"
          alt=""
          aria-hidden
          width={36}
          height={36}
          className="pointer-events-none absolute left-[10%] top-[32%] hidden w-7 object-contain opacity-50 md:block lg:w-9 float-2"
        />
        <Image
          src="/Elements/asterisk-orange.svg"
          alt=""
          aria-hidden
          width={30}
          height={30}
          className="pointer-events-none absolute right-[8%] top-[52%] hidden w-6 object-contain opacity-50 lg:block float-5"
        />
        <Image
          src="/Elements/star-violet.svg"
          alt=""
          aria-hidden
          width={32}
          height={32}
          className="pointer-events-none absolute left-[6%] bottom-[25%] hidden w-7 object-contain opacity-40 sm:block float-4"
        />
        <Image
          src="/Elements/plus-teal.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className="pointer-events-none absolute right-[16%] bottom-[22%] hidden w-6 object-contain opacity-40 sm:block float-3"
        />

        <div className="relative z-10 mx-auto max-w-4xl pt-16 pb-4 text-center">
          <span className="section-label text-orange">Pricing</span>
          <h1 className="display mx-auto mt-4 max-w-3xl text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4rem] md:text-[5.5rem]">
            Simple, transparent <span className="text-orange">pricing.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Start free. Upgrade when you&apos;re ready.{" "}
            <span className="font-semibold text-orange">Cancel anytime.</span>
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Billing toggle */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <Label
              htmlFor="billing-toggle"
              className={`cursor-pointer text-sm font-bold ${yearly ? "text-muted-foreground" : "text-night"}`}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={yearly}
              onCheckedChange={setYearly}
            />
            <Label
              htmlFor="billing-toggle"
              className={`flex cursor-pointer items-center gap-2 text-sm font-bold ${yearly ? "text-night" : "text-muted-foreground"}`}
            >
              Yearly
              <span className="rounded-full border border-orange/20 bg-orange/10 px-2.5 py-0.5 text-xs font-black text-orange">
                2 months free
              </span>
            </Label>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => {
              const price = yearly ? t.yearly : t.monthly
              return (
                <div
                  key={t.name}
                  className={`group relative flex flex-col rounded-[20px] border-2 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-hard ${
                    t.highlight
                      ? "border-lime bg-white shadow-hard"
                      : "border-border bg-card"
                  }`}
                >
                  {t.highlight && (
                    <span className="sticker absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 text-xs font-black uppercase tracking-wider text-night shadow-hard">
                      Most popular
                    </span>
                  )}

                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="display text-2xl uppercase text-night">{t.name}</h2>
                      <p className="mt-0.5 text-sm font-bold text-muted-foreground">{t.blurb}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="display text-4xl tracking-tight text-night">
                      {price}
                    </span>
                    {price !== "Custom" && (
                      <span className="text-sm font-bold text-muted-foreground">/{yearly ? "yr" : "month"}</span>
                    )}
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-bold text-night/70">
                        <Check size={15} className="shrink-0 text-teal" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/signup"
                    className={`mt-8 flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                      t.highlight
                        ? "bg-lime text-night hover:bg-orange hover:text-white"
                        : "border-2 border-night/15 text-night hover:border-night/30"
                    }`}
                  >
                    {price === "$0" ? "Get started" : price === "Custom" ? "Contact sales" : "Start trial"}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Feature comparison table */}
          <div className="mx-auto mt-20 max-w-5xl">
            <h2 className="display text-center text-3xl uppercase text-night sm:text-4xl">
              Compare plans
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border-2 border-border bg-card transition-colors duration-500 hover:border-night/25">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Feature</th>
                    {tiers.map((t) => (
                      <th key={t.name} className="px-5 py-4 text-center">
                        <span className="display text-xl uppercase text-night">{t.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {comparisons.map(([feature, ...vals]) => (
                    <tr key={feature} className="transition-colors duration-300 hover:bg-night/[0.02]">
                      <td className="px-5 py-4 font-bold text-night/70">{feature}</td>
                      {vals.map((v, i) => {
                        const isCheck = v === "✓"
                        const isDash = v === "—"
                        return (
                          <td key={i} className="px-5 py-4 text-center">
                            {isCheck ? (
                              <span className="inline-flex items-center gap-1 text-teal">
                                <Check size={15} />
                              </span>
                            ) : isDash ? (
                              <span className="text-border">—</span>
                            ) : (
                              <span className="font-bold text-muted-foreground">{v}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-right text-xs font-bold text-muted-foreground/50">
              * Contact sales for volume and enterprise pricing details.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
