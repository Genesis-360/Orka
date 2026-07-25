"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  CheckCircle,
  Wallet,
  BarChart3,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Proposals",
    description: "Generate winning proposals in seconds with AI that knows your past work, rates, and client preferences.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    description: "Every deal is secured by Stellar smart contracts. Funds are released only when milestones are verified.",
    color: "text-teal",
    bg: "bg-teal/10",
  },
  {
    icon: CheckCircle,
    title: "Milestone Verification",
    description: "Automated verification with client approval workflows. No more chasing payments or status updates.",
    color: "text-orange",
    bg: "bg-orange/10",
  },
  {
    icon: Wallet,
    title: "Instant Payouts",
    description: "Multi-currency payouts settle in seconds via Stellar. Freelancers get paid when work is approved.",
    color: "text-lime",
    bg: "bg-lime/10",
  },
  {
    icon: BarChart3,
    title: "Financial Analytics",
    description: "Real-time dashboard of cash flow, project profitability, and financial health across your entire business.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Bell,
    title: "Automated Workflows",
    description: "From proposal to payout — every step is connected. AI handles the admin so you can focus on the work.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="bg-[#081B2E] py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-medium text-violet">
            Everything You Need
          </span>
          <h2 className="display mt-4 text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            One Platform.
            <br />
            <span className="text-orange">Zero Admin Tax.</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div
                className={`mb-4 grid size-11 place-items-center rounded-xl ${f.bg}`}
              >
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
