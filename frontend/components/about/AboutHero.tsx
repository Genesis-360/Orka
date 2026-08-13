"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden rounded-b-[42px] bg-night px-4 pt-14 pb-10 text-white md:rounded-b-[72px] md:px-8 lg:px-12">
      <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />

      <Image
        src="/Elements/star-violet.svg"
        alt=""
        aria-hidden
        width={40}
        height={40}
        className="pointer-events-none absolute right-[14%] top-[18%] hidden w-8 object-contain md:block lg:w-10 float-1"
      />
      <Image
        src="/Elements/plus-teal.svg"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="pointer-events-none absolute left-[10%] top-[30%] hidden w-7 object-contain md:block lg:w-9 float-2"
      />
      <Image
        src="/Elements/asterisk-orange.svg"
        alt=""
        aria-hidden
        width={30}
        height={30}
        className="pointer-events-none absolute right-[8%] top-[52%] hidden w-6 object-contain lg:block float-5"
      />
      <Image
        src="/Elements/star-blue.svg"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="pointer-events-none absolute left-[6%] bottom-[24%] hidden w-6 object-contain opacity-60 sm:block float-3"
      />
      <Image
        src="/Elements/plus-lime.svg"
        alt=""
        aria-hidden
        width={32}
        height={32}
        className="pointer-events-none absolute right-[16%] bottom-[20%] hidden w-7 object-contain opacity-60 sm:block float-4"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          {/* Left — Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet mb-6">
              About Orka
            </p>
            <h1 className="display text-5xl uppercase leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              The why
              <br />
              behind{" "}
              <span className="text-violet">Orka.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Orka is the financial operating system for service businesses —
              built to simplify payments, escrow, milestones, and settlements
              on Stellar.
            </p>
            <p className="mt-3 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Transparent. Automated. Built for scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#team"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-violet px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#a78cff] hover:-translate-y-0.5"
              >
                Meet the Team <ArrowRight size={16} />
              </Link>
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-bold text-white/80 transition-all hover:bg-white/8 hover:text-white hover:-translate-y-0.5"
              >
                Explore Product
              </Link>
            </div>
          </div>

          {/* Right — Identity composition */}
          <div className="relative flex items-center justify-center py-8">
            {/* Outer orbit ring */}
            <div className="absolute size-[280px] rounded-full border border-dashed border-white/15 sm:size-[320px] md:size-[360px]" />
            {/* Inner orbit ring */}
            <div className="absolute size-[180px] rounded-full border border-dashed border-white/10 sm:size-[210px] md:size-[240px]" />

            {/* Orbital dots on outer ring — cardinal points + scattered */}
            <span className="absolute size-2.5 rounded-full bg-teal shadow-[0_0_6px_rgba(34,189,147,0.5)]" style={{ top: "0%", left: "50%", transform: "translate(-50%, -50%)" }} />
            <span className="absolute size-2.5 rounded-full bg-orange shadow-[0_0_6px_rgba(255,138,34,0.5)]" style={{ bottom: "0%", left: "50%", transform: "translate(-50%, 50%)" }} />
            <span className="absolute size-2 rounded-full bg-violet shadow-[0_0_5px_rgba(148,116,255,0.5)]" style={{ top: "50%", right: "0%", transform: "translate(50%, -50%)" }} />
            <span className="absolute size-2 rounded-full bg-coral shadow-[0_0_5px_rgba(255,79,66,0.5)]" style={{ top: "15%", right: "6%" }} />
            <span className="absolute size-1.5 rounded-full bg-lime shadow-[0_0_4px_rgba(234,255,53,0.5)]" style={{ bottom: "20%", left: "4%" }} />
            <span className="absolute size-1.5 rounded-full bg-teal shadow-[0_0_4px_rgba(34,189,147,0.4)]" style={{ top: "40%", left: "0%", transform: "translate(-50%, -50%)" }} />

            {/* Orbital dots on inner ring */}
            <span className="absolute size-1.5 rounded-full bg-violet shadow-[0_0_4px_rgba(148,116,255,0.4)]" style={{ top: "10%", right: "28%" }} />
            <span className="absolute size-1.5 rounded-full bg-orange shadow-[0_0_4px_rgba(255,138,34,0.4)]" style={{ bottom: "15%", left: "22%" }} />
            <span className="absolute size-1 rounded-full bg-teal" style={{ top: "60%", left: "8%" }} />

            {/* Logo center */}
            <div className="relative z-10 flex size-28 items-center justify-center rounded-full bg-white shadow-lg sm:size-32">
              <Image
                src="/Logo/logo.svg"
                alt="Orka"
                width={56}
                height={56}
                className="object-contain scale-150"
              />
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-4 -right-4 z-20 max-w-[180px] rounded-2xl border border-border/50 bg-white p-4 shadow-sm sm:-top-6 sm:-right-2 md:-top-8 md:right-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-teal" />
                <span className="text-xs font-bold text-night">
                  Built on Stellar
                </span>
              </div>
              <p className="text-[11px] leading-4 text-night/60">
                Fast, low-cost and borderless payments.
              </p>
            </div>

            {/* Floating card — left */}
            <div className="absolute left-0 top-1/2 z-20 max-w-[175px] -translate-y-1/2 rounded-2xl border border-border/50 bg-white p-4 shadow-sm sm:-left-4 md:-left-6">
              <span className="text-xs font-bold text-night">
                For Service Businesses
              </span>
              <p className="mt-1 text-[11px] leading-4 text-night/60">
                Freelancers, agencies and their clients.
              </p>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -bottom-4 -right-4 z-20 max-w-[180px] rounded-2xl border border-border/50 bg-white p-4 shadow-sm sm:-bottom-6 sm:-right-2 md:-bottom-8 md:right-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-violet" />
                <span className="text-xs font-bold text-night">
                  Our Mission
                </span>
              </div>
              <p className="text-[11px] leading-4 text-night/60">
                Eliminate admin tax and bring fairness to payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
