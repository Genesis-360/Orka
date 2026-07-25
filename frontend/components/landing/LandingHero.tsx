"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoBackground from "./VideoBackground";
import Particles from "./Particles";
import Dashboard from "./Dashboard";

gsap.registerPlugin(ScrollTrigger);

export default function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Dashboard slides up from below, covers heading (which stays fixed)
        tl.fromTo(
          dashboardRef.current,
          { y: "120vh" },
          { y: 0, ease: "power3.inOut" },
          0,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#081B2E] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <VideoBackground />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#081B2E] via-transparent to-[#081B2E]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-violet/10 blur-[150px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-orange/10 blur-[120px] animate-pulse" />
      </div>

      {/* Particles */}
      <Particles />

      {/* Content wrapper - fills full height */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        {/* Tag pill */}
        <div className="mb-6 animate-fade-in rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-[14px]">
          Launch — start building today
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="display mx-auto max-w-5xl text-center text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4.4rem] md:text-[6.4rem] lg:text-[7.3rem]"
          style={{ willChange: "transform, opacity" }}
        >
          Autonomous <span className="text-orange">financial OS</span> for{" "}
          global <span className="text-violet">service work.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base font-normal leading-7 text-white/70 sm:text-lg sm:leading-8">
          ORKA eliminates the admin tax of proposals, escrow, milestone
          verification, payouts, invoices, and financial records for agencies
          and freelancers working across borders.
        </p>

        <div className="mt-8 flex justify-center gap-4">
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
        </div>
      </div>

      {/* Dashboard - starts from below viewport, slides up over the heading */}
      <div
        ref={dashboardRef}
        className="relative z-30 mx-auto mt-8 w-full max-w-[1400px] px-6 pb-32"
      >
        <Dashboard />
      </div>
    </section>
  );
}
