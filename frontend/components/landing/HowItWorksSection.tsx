"use client";

import { motion } from "framer-motion";
import { FileText, Shield, CheckCircle, Wallet } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "AI Generates Proposal",
    description: "ORKA AI drafts a winning proposal based on your past work, rates, and the client's requirements. Review, tweak, and send.",
    duration: "30 seconds",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: Shield,
    title: "Smart Contract & Escrow",
    description: "Client signs digitally. Funds are locked in a Stellar smart contract automatically. Both parties are protected.",
    duration: "5 minutes",
    color: "text-teal",
    bg: "bg-teal/10",
  },
  {
    icon: CheckCircle,
    title: "Work Verified",
    description: "Submit work, client approves or requests changes. Milestone-based verification keeps everything transparent.",
    duration: "Ongoing",
    color: "text-orange",
    bg: "bg-orange/10",
  },
  {
    icon: Wallet,
    title: "Instant Payout",
    description: "Approved work triggers automatic release from escrow. Funds arrive in seconds, not days.",
    duration: "3 seconds",
    color: "text-lime",
    bg: "bg-lime/10",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="border-t border-white/5 bg-[#0A1F35] py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-orange/20 bg-orange/10 px-4 py-1.5 text-xs font-medium text-orange">
            How It Works
          </span>
          <h2 className="display mt-4 text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            From Brief to
            <br />
            <span className="text-teal">Payout in Minutes</span>
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute left-[15%] right-[15%] top-[35px] hidden h-px bg-gradient-to-r from-violet via-teal to-lime md:block lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className={`relative z-10 mb-6 grid size-[70px] place-items-center rounded-2xl ${step.bg}`}
              >
                <step.icon size={28} className={step.color} />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-white/10 text-[10px] font-bold text-white/60">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-white/40">
                {step.description}
              </p>
              <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-white/30">
                ~{step.duration}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
