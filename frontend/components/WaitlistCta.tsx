import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function WaitlistCta() {
  return (
    <section id="waitlist" className="px-4 py-16 md:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-night p-8 md:p-12 lg:rounded-[36px] lg:p-16">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-60 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />

        {/* Side sticker tags */}
        <span className="sticker pointer-events-none absolute left-[5%] top-[14%] hidden rounded-full bg-orange px-4 py-2 text-xs font-black uppercase text-white shadow-hard select-none lg:block" style={{ transform: "rotate(-4deg)" }}>
          Milestone Escrow
        </span>
        <span className="sticker pointer-events-none absolute right-[6%] top-[28%] hidden rounded-full bg-coral px-4 py-2 text-xs font-black uppercase text-white shadow-hard select-none lg:block" style={{ transform: "rotate(3deg)" }}>
          Verified Payouts
        </span>
        <span className="sticker pointer-events-none absolute left-[7%] top-[52%] hidden rounded-full bg-lime px-4 py-2 text-xs font-black uppercase text-night shadow-hard select-none lg:block" style={{ transform: "rotate(-2deg)" }}>
          AI Operations
        </span>
        <span className="sticker pointer-events-none absolute right-[5%] top-[70%] hidden rounded-full bg-violet px-4 py-2 text-xs font-black uppercase text-white shadow-hard select-none lg:block" style={{ transform: "rotate(5deg)" }}>
          Smart Contracts
        </span>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="section-label text-orange">Get started</p>
          <h2 className="display mt-3 text-4xl uppercase leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-none">
            Ready to own your financial{" "}
            <span className="text-orange">operations</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Join agencies and freelancers using ORKA to streamline
            proposals, escrow, and payouts — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-10 py-4 text-lg font-bold text-night transition-all hover:bg-lime hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started{" "}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/pricing"
              className="group inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white/80 transition-all hover:bg-white/8 hover:text-white hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
