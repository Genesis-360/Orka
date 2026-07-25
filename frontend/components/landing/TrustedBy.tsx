"use client";

import { motion } from "framer-motion";

const logos = [
  "Linear",
  "Raycast",
  "Vercel",
  "Stripe",
  "Figma",
  "Notion",
  "Loom",
  "Supabase",
];

export default function TrustedBy() {
  return (
    <section className="border-t border-white/5 bg-[#081B2E] py-20">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <p className="mb-10 text-sm font-medium uppercase tracking-widest text-white/30">
          Trusted by forward-thinking teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-lg font-bold tracking-tight text-white/20 transition-colors hover:text-white/40"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
