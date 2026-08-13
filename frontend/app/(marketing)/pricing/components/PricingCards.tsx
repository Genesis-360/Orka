"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap } from "lucide-react";

export const tiers = [
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
];

export default function PricingCards() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="px-4 py-16 md:px-8 lg:px-12" id="plans">
      <div className="mx-auto max-w-6xl">
        {/* Billing toggle */}
        <div className="mb-10 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="flex gap-1 rounded-full border border-border bg-muted p-1"
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={`flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold transition-all duration-200 ${
                yearly
                  ? "text-muted-foreground hover:text-foreground"
                  : "bg-white text-foreground shadow-sm"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={`flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold transition-all duration-200 ${
                yearly
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider transition-colors duration-200 ${
                  yearly ? "bg-lime text-night" : "bg-foreground/10 text-muted-foreground"
                }`}
              >
                −2 mo
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {tiers.map((t) => {
            const price = yearly ? t.yearly : t.monthly;
            const custom = price === "Custom";
            const free = price === "$0";
            return (
              <div
                key={t.name}
                className={`group relative flex flex-col rounded-[20px] border-2 p-8 transition-all duration-500 hover:-translate-y-1 ${
                  t.highlight
                    ? "border-lime bg-night text-white shadow-hard"
                    : "border-border bg-card shadow-product-card hover:shadow-hard"
                }`}
              >
                {t.highlight && (
                  <span className="sticker z-10 absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 text-xs font-black uppercase tracking-wider text-night shadow-hard">
                    Most popular
                  </span>
                )}

                <div className="mb-6 flex items-center justify-between">
                  <h2
                    className={`display text-2xl uppercase ${
                      t.highlight ? "text-white" : "text-night"
                    }`}
                  >
                    {t.name}
                  </h2>
                  {t.highlight && (
                    <Zap
                      size={22}
                      className="shrink-0 text-lime transition-transform duration-300 group-hover:rotate-12"
                    />
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span
                    className={`display text-5xl tracking-tight ${
                      t.highlight ? "text-white" : "text-night"
                    }`}
                  >
                    {price}
                  </span>
                  {!custom && (
                    <span
                      className={`text-sm font-bold ${
                        t.highlight ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      /{yearly ? "yr" : "month"}
                    </span>
                  )}
                </div>
                {yearly && !free && !custom && (
                  <p className="mt-1 text-sm font-bold text-orange">
                    Save 2 months — billed annually
                  </p>
                )}
                <p
                  className={`mt-2 text-sm font-bold ${
                    t.highlight ? "text-white/60" : "text-muted-foreground"
                  }`}
                >
                  {t.blurb}
                </p>

                <ul
                  className={`mt-6 flex-1 space-y-3 ${
                    t.highlight ? "text-white/85" : "text-night/70"
                  }`}
                >
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm font-bold"
                    >
                      <Check
                        size={15}
                        className={`shrink-0 ${
                          t.highlight ? "text-lime" : "text-teal"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={custom ? "/contact" : "/signup"}
                  className={`mt-8 flex min-h-13 items-center justify-center rounded-full px-6 text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                    t.highlight
                      ? "bg-lime text-night hover:bg-orange hover:text-white"
                      : "border-2 border-night/15 text-night hover:border-night/30"
                  }`}
                >
                  {custom ? "Contact sales" : free ? "Get started" : "Start trial"}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-teal" />
            Escrow funds held on-chain (Stellar / USDC)
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap size={16} className="text-orange" />
            Activate or cancel in one click
          </span>
          <span className="inline-flex items-center gap-2">
            <Check size={16} className="text-violet" />
            No hidden fees — ever
          </span>
        </div>
      </div>
    </section>
  );
}