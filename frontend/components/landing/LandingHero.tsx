"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Dashboard from "./Dashboard";

export default function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const dashY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250vh] bg-[#081B2E]"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 flex min-h-screen flex-col overflow-hidden">
        {/* Hero text at top with generous spacing */}
        <div className="z-20 flex flex-col items-center px-6 pt-28 pb-8 text-center">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-[14px]">
                Launch — start building today
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="display mx-auto max-w-5xl text-center text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4.4rem] md:text-[6.4rem] lg:text-[7.3rem]"
            >
              Autonomous <span className="text-orange">financial OS</span> for{" "}
              global <span className="text-violet">service work.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-center text-base font-normal leading-7 text-white/70 sm:text-lg sm:leading-8"
            >
              ORKA eliminates the admin tax of proposals, escrow, milestone
              verification, payouts, invoices, and financial records for
              agencies and freelancers working across borders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex justify-center gap-4"
            >
              <Link
                href="/signup"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-violet px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#a78cff] hover:-translate-y-0.5"
              >
                Get started <ArrowRight size={18} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white/80 transition-all hover:bg-white/8 hover:text-white hover:-translate-y-0.5"
              >
                See pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Video + Dashboard area — pushed below, covers heading on scroll */}
        <div className="mt-auto w-full flex-shrink-0 relative z-30">
          <div
            className="relative w-screen overflow-hidden"
            style={{
              marginLeft: "calc(-50vw + 50%)",
              aspectRatio: "16 / 9",
            }}
          >
            {/* Background video with quality improvements */}
            <video
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
                type="video/mp4"
              />
            </video>

            {/* Gradient overlay on video */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#081B2E]/60 via-transparent to-[#081B2E]" />

            {/* Dashboard (replaces with static image once available) */}
            <motion.div
              style={{ y: dashY }}
              className="absolute left-1/2 top-1/2 w-[90%] max-w-5xl -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
                <Dashboard />
              </div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 bg-gradient-to-b from-transparent to-[#081B2E]" />
          </div>
        </div>
      </div>
    </section>
  );
}
