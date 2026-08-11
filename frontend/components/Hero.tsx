import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Safari } from "@/components/ui/safari";
import { AvatarCircles } from "@/components/ui/avatar-circles";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-night rounded-b-[42px] px-4 pb-16 pt-5 text-white md:rounded-b-[72px] md:px-8 lg:px-12">
      {/* Floating decorations */}
      <Image
        src="/Elements/star-violet.svg"
        alt=""
        aria-hidden
        width={40}
        height={40}
        className="pointer-events-none absolute right-[14%] bottom-[52%] hidden w-8 object-contain md:block lg:w-10 float-1"
      />
      <Image
        src="/Elements/plus-teal.svg"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="pointer-events-none absolute left-[14%] top-[30%] hidden w-7 object-contain md:block lg:w-9 float-2"
      />
      <Image
        src="/Elements/star-blue.svg"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="pointer-events-none absolute left-[5%] bottom-[30%] hidden w-6 object-contain opacity-70 sm:block float-3"
      />
      <Image
        src="/Elements/plus-lime.svg"
        alt=""
        aria-hidden
        width={32}
        height={32}
        className="pointer-events-none absolute right-[6%] bottom-[22%] hidden w-7 object-contain opacity-70 sm:block float-4"
      />
      <Image
        src="/Elements/asterisk-orange.svg"
        alt=""
        aria-hidden
        width={30}
        height={30}
        className="pointer-events-none absolute left-[8%] top-[52%] hidden w-6 object-contain lg:block float-5"
      />
      {/* Nav */}
      <Navbar />
      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl pt-16 pb-8">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/8 px-3 py-1.5 text-center text-[13px] font-medium text-white/80 transition-all duration-300 hover:border-violet/40 hover:text-white sm:text-[14px]">
            <span className="rounded-full bg-violet px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              New
            </span>
            Launch — start building today
          </span>
        </div>

        <h1 className="display mx-auto max-w-5xl text-center text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4.4rem] md:text-[6.4rem] lg:text-[7.3rem]">
          Autonomous <span className="text-orange">financial OS</span> for{" "}
          global <span className="text-violet">service work.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base font-normal leading-7 text-white/78 sm:text-lg sm:leading-8">
          ORKA eliminates the admin tax of proposals, escrow, milestone
          verification, payouts, invoices, and financial records for agencies
          and freelancers working across borders.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-violet px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#a78cff] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started <ArrowRight size={18} />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white/80 transition-all hover:bg-white/8 hover:text-white hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            See pricing
          </Link>
        </div>

        <div className="mt-7 flex justify-center">
          <a
            href="https://tools.launchllama.co?utm_source=badge&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-90"
            aria-label="As seen on Launch Llama Newsletter"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://tools.launchllama.co/featured-badge.png?v=2"
              alt="As seen on Launch Llama Newsletter"
              width={200}
              height={50}
              style={{ display: "block", border: 0 }}
            />
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="origin-center">
            <AvatarCircles
              numPeople={50}
              avatarUrls={[
                {
                  imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80",
                  profileUrl: "#",
                },
                {
                  imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=160&q=80",
                  profileUrl: "#",
                },
                {
                  imageUrl: "https://images.unsplash.com/photo-1500649297466-74794c70acfc?w=160&q=80",
                  profileUrl: "#",
                },
              ]}
            />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-white">50+ agencies building on ORKA</p>
            <p className="text-base text-white/50">From freelancers to enterprise</p>
          </div>
        </div>
      </div>
      {/* Dashboard mockup */}
      <div
        className="mx-auto mt-12 max-w-7xl px-4 animate-in fade-in duration-700 dark"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        <Safari
          url="orka.app / dashboard"
          imageSrc="/dashboard.png"
          mode="default"
        />
      </div>

      {/* Stats + tag cloud row */}
      <div className="mx-auto mt-[-10px] flex max-w-7xl flex-col items-center gap-8 px-6 text-center lg:flex-row lg:justify-between lg:items-end lg:text-left relative z-10">
        {/* Tag cloud */}
        <div className="flex max-w-md flex-wrap justify-center gap-2 lg:justify-start">
          {[
            "Business Growth",
            "Success",
            "Performance Metrics",
            "Global Payments",
            "AI Automation",
          ].map((tag, i) => (
            <span
              key={tag}
              className={`sticker rounded-full px-4 py-1.5 text-xs font-black uppercase shadow-hard ${
                i === 0 ? "bg-orange text-white rotate-[-3deg]"
                : i === 1 ? "bg-coral text-white rotate-[2deg]"
                : i === 2 ? "bg-lime text-night rotate-[-1deg]"
                : i === 3 ? "bg-violet text-white rotate-[3deg]"
                : "bg-teal text-white rotate-[-2deg]"
              }`}>
              {tag}
            </span>
          ))}
          <p className="mt-3 w-full text-[24px] font-medium uppercase leading-[28px] text-white/90 sm:text-[32px] sm:leading-[35px]">
            From rough brief to{" "}
            <span className="text-white/50">
              paid and reconciled in 4 steps.
            </span>
          </p>
        </div>

        {/* Stat cards */}
        <div className="flex max-w-md flex-wrap justify-center gap-4 lg:justify-end">
          <div className="cut-corner group rounded-[14px] bg-teal p-5 text-night shadow-hard transition-transform duration-300 hover:-translate-y-1 min-w-[160px]">
            <div className="flex items-end justify-between">
              <p className="display text-[40px]">50+</p>
              <ArrowUpRight size={40} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <p className="mt-2 text-[14px] font-bold leading-6">
              Agencies & freelancers
              <br />
              running on ORKA
            </p>
          </div>
          <div className="cut-corner group rounded-[14px] bg-lime p-5 text-night shadow-hard transition-transform duration-300 hover:-translate-y-1 min-w-[160px]">
            <div className="flex items-end justify-between">
              <p className="display text-[40px]">99%</p>
              <ArrowUpRight size={40} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <p className="mt-2 text-[14px] font-bold leading-6">
              Admin tasks & workload
              <br />
              eliminated
            </p>
          </div>
          <p className="text-[14px] font-medium text-white/80">
            50+ agencies and freelancers already run escrow and payouts on ORKA.
          </p>
        </div>
      </div>
      {/* Sticker decorations */}
    </section>
  );
}
