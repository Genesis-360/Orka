import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AvatarCircles } from "@/components/ui/avatar-circles";

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-night px-4 pb-20 pt-5 text-white rounded-b-[42px] md:rounded-b-[72px] md:px-8 lg:px-12">
      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl"
        aria-hidden="true"
      />

      {/* Floating SVG decorations */}
      <Image
        src="/Elements/star-blue.svg"
        alt=""
        aria-hidden
        width={40}
        height={40}
        className="pointer-events-none absolute right-[14%] top-[20%] hidden w-8 object-contain opacity-60 md:block lg:w-10 float-1"
      />
      <Image
        src="/Elements/plus-lime.svg"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="pointer-events-none absolute left-[10%] top-[32%] hidden w-7 object-contain opacity-50 md:block lg:w-9 float-2"
      />
      <Image
        src="/Elements/asterisk-orange.svg"
        alt=""
        aria-hidden
        width={30}
        height={30}
        className="pointer-events-none absolute right-[8%] top-[52%] hidden w-6 object-contain opacity-50 lg:block float-5"
      />
      <Image
        src="/Elements/star-violet.svg"
        alt=""
        aria-hidden
        width={32}
        height={32}
        className="pointer-events-none absolute left-[6%] bottom-[25%] hidden w-7 object-contain opacity-40 sm:block float-4"
      />
      <Image
        src="/Elements/plus-teal.svg"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="pointer-events-none absolute right-[16%] bottom-[22%] hidden w-6 object-contain opacity-40 sm:block float-3"
      />

      <div className="relative z-10 mx-auto max-w-4xl pt-14 pb-6 text-center animate-in fade-in duration-700">
        {/* Announcement pill */}
        <span className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/8 px-3 py-1.5 text-[13px] font-medium text-white/80 sm:text-[14px]">
          <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-night">
            Free plan
          </span>
          Starter is free forever — no card required
        </span>

        <h1 className="display mx-auto mt-6 max-w-4xl text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4rem] md:text-[5.5rem] lg:text-[6.4rem]">
          Simple, transparent <span className="text-orange">pricing.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Start free. Upgrade when you&apos;re ready.{" "}
          <span className="font-semibold text-orange">Cancel anytime.</span>
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-violet px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#a78cff] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started — it&apos;s free <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white/80 transition-all hover:bg-white/8 hover:text-white hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Talk to sales
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <AvatarCircles
            numPeople={50}
            avatarUrls={[
              {
                imageUrl:
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80",
                profileUrl: "#",
              },
              {
                imageUrl:
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=160&q=80",
                profileUrl: "#",
              },
              {
                imageUrl:
                  "https://images.unsplash.com/photo-1500649297466-74794c70acfc?w=160&q=80",
                profileUrl: "#",
              },
            ]}
          />
          <p className="text-left text-base font-bold text-white">
            50+ agencies billing on ORKA
            <span className="block text-sm font-medium text-white/50">
              From freelancers to enterprise
            </span>
          </p>
        </div>

        {/* Reassurance stickers */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "No setup fees", cls: "bg-teal text-night rotate-[-2deg]" },
            { label: "On-chain escrow", cls: "bg-violet text-white rotate-[2deg]" },
            { label: "Pay with USDC", cls: "bg-orange text-white rotate-[-3deg]" },
            { label: "Cancel anytime", cls: "bg-lime text-night rotate-[1deg]" },
          ].map((s) => (
            <span
              key={s.label}
              className={`sticker rounded-full px-4 py-1.5 text-xs font-black uppercase shadow-hard ${s.cls}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
