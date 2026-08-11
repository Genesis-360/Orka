import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="px-4 pb-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night">
        <div className="relative px-8 py-16 text-center md:px-14 md:py-20">
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 size-60 rounded-full bg-orange/8 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-20 md:block"
            aria-hidden="true"
          >
            <div className="size-48 rounded-full border border-white/20" />
            <div className="absolute inset-4 rounded-full border border-white/15" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Let&apos;s Build the Future
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl display text-4xl uppercase leading-[1.05] text-white sm:text-5xl md:text-[3.4rem]">
              Ready to automate
              <br />
              your{" "}
              <span className="text-orange">financial</span>
              <br />
              operations?
            </h2>
            <div className="mt-8">
              <Link
                href="/signup"
                className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-lime px-8 py-3.5 text-base font-bold text-night transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Started{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
