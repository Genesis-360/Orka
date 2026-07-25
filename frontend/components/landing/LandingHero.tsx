"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import VideoBackground from "./VideoBackground";
import Particles from "./Particles";
import Dashboard from "./Dashboard";

gsap.registerPlugin(ScrollTrigger);

export default function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only run on desktop
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%",
            scrub: 1.2,
            pin: false,
            invalidateOnRefresh: true,
          },
        });

        // Headline moves up
        tl.to(
          headlineRef.current,
          {
            y: -180,
            scale: 0.92,
            opacity: 0.6,
            ease: "power2.out",
          },
          0,
        );

        // Dashboard reveal from bottom
        tl.fromTo(
          dashboardRef.current,
          { y: 300, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
          },
          0.35,
        );

        // Pin the dashboard
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top 5%",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[180vh] bg-[#081B2E] overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <VideoBackground />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#081B2E] via-transparent to-[#081B2E]" />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-violet/10 blur-[150px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-orange/10 blur-[120px] animate-pulse" />
      </div>

      {/* Particles */}
      <Particles />

      {/* Hero content - sits above dashboard */}
      <div
        ref={contentRef}
        className="relative z-20 mx-auto flex max-w-[1400px] flex-col items-center px-6 pt-32 text-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Tag pill */}
        <div className="mb-8 animate-fade-in rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-medium text-violet">
          Launch — Start Building Today
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="display mx-auto max-w-6xl text-[clamp(3rem,12vw,180px)] leading-[0.85] tracking-tighter text-white"
        >
          <span className="block">AUTONOMOUS</span>
          <span className="block text-orange">FINANCIAL OS</span>
          <span className="block">FOR GLOBAL</span>
          <span className="block text-violet">SERVICE WORK.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-[700px] text-base leading-relaxed text-white/50 sm:text-lg">
          ORKA eliminates the admin tax of proposals, escrow, milestone
          verification, payments, contracts, invoices, and financial operations
          for agencies and freelancers working globally.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/waitlist"
            className="group rounded-full bg-violet px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-violet/90 hover:-translate-y-0.5"
          >
            Get Started{" "}
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
          >
            See Pricing
          </Link>
        </div>
      </div>

      {/* Dashboard reveal */}
      <div
        ref={pinRef}
        className="relative z-30 mx-auto mt-[-20vh] w-full max-w-[1400px] px-6 pb-32"
      >
        <div
          ref={dashboardRef}
          className="origin-top"
          style={{ perspective: "1200px", transform: "rotateX(2deg)" }}
        >
          <Dashboard />
        </div>
      </div>
    </section>
  );
}
