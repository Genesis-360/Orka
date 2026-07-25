"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "ORKA cut our proposal-to-payment cycle from 2 weeks to 48 hours. The escrow system means we never chase invoices anymore.",
    author: "Sarah Chen",
    role: "Founder, Design Studio",
    initials: "SC",
  },
  {
    quote: "We closed $120k in new business last month alone. The AI proposals are so good clients think we have a full-time writer.",
    author: "Marcus Williams",
    role: "CEO, Agency Collective",
    initials: "MW",
  },
  {
    quote: "The Stellar integration is a game-changer. Cross-border payments that used to take 5 days now settle in 3 seconds.",
    author: "Priya Patel",
    role: "Freelance Developer",
    initials: "PP",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-white/5 bg-[#081B2E] py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal">
            Testimonials
          </span>
          <h2 className="display mt-4 text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            Loved by
            <br />
            <span className="text-orange">Service Businesses</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10"
            >
              <Quote size={24} className="mb-4 text-violet/30" />
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-white/5 text-sm font-bold text-white/60">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t.author}
                  </p>
                  <p className="text-xs text-white/30">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
