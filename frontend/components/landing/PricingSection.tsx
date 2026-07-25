"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For solo freelancers getting started",
    features: [
      "AI proposal generation",
      "5 active projects",
      "Escrow protection",
      "Milestone tracking",
      "Invoice generation",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing agencies",
    features: [
      "Everything in Starter",
      "Unlimited projects",
      "Smart contracts",
      "Multi-currency payouts",
      "Team collaboration",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees",
      "On-premise option",
      "White-labeling",
      "API access",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="border-t border-white/5 bg-[#0A1F35] py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-medium text-violet">
            Pricing
          </span>
          <h2 className="display mt-4 text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            Simple, Transparent
            <br />
            <span className="text-orange">No Surprises</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-6 transition-all ${
                plan.featured
                  ? "border-violet/30 bg-violet/5 shadow-lg shadow-violet/5"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet px-4 py-1 text-[11px] font-bold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-white/40">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-white/40">{plan.description}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/50">
                    <Check size={14} className="text-teal" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/waitlist"
                className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition-all ${
                  plan.featured
                    ? "bg-violet text-white hover:bg-violet/90"
                    : "border border-white/10 text-white/60 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
