import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Mail, MessageSquare } from "lucide-react"
import { RiDiscordFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Contact · ORKA",
  description: "Get in touch with the ORKA team. We reply within one business day.",
}

export default function ContactPage() {
  return (
    <div className="bg-paper overflow-hidden">
      {/* Hero — Let's Stay Connected */}
      <section className="relative overflow-hidden rounded-b-[42px] bg-night px-4 pb-16 pt-5 text-white md:rounded-b-[72px] md:px-8 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />

        {/* Floating SVG decorations */}
        <Image
          src="/Elements/star-violet.svg"
          alt=""
          aria-hidden
          width={40}
          height={40}
          className="pointer-events-none absolute right-[12%] top-[22%] hidden w-8 object-contain opacity-60 md:block lg:w-10 float-1"
        />
        <Image
          src="/Elements/plus-teal.svg"
          alt=""
          aria-hidden
          width={36}
          height={36}
          className="pointer-events-none absolute left-[10%] top-[30%] hidden w-7 object-contain opacity-50 md:block lg:w-9 float-2"
        />
        <Image
          src="/Elements/asterisk-orange.svg"
          alt=""
          aria-hidden
          width={30}
          height={30}
          className="pointer-events-none absolute right-[18%] top-[50%] hidden w-6 object-contain opacity-50 lg:block float-5"
        />
        <Image
          src="/Elements/plus-lime.svg"
          alt=""
          aria-hidden
          width={32}
          height={32}
          className="pointer-events-none absolute left-[6%] bottom-[28%] hidden w-7 object-contain opacity-40 sm:block float-4"
        />
        <Image
          src="/Elements/star-blue.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className="pointer-events-none absolute right-[8%] bottom-[22%] hidden w-6 object-contain opacity-40 sm:block float-3"
        />

        <div className="relative z-10 mx-auto max-w-4xl pt-16 pb-4 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 text-sm text-white/40">
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-widest">Reach out anytime</span>
            <span className="h-px w-12 bg-white/10" />
          </div>

          {/* Heading */}
          <h1 className="display mt-6 text-[2.6rem] uppercase leading-[1.05] text-white sm:text-[4rem] md:text-[5.5rem]">
            Let&apos;s Stay <span className="text-orange">Connected</span>
          </h1>

          {/* Copy */}
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
            Got questions or want to collaborate? We&apos;re open to new projects or just a casual chat.
          </p>

          {/* Gradient button */}
          <div className="mt-8 flex justify-center">
            <a
              href="#form"
              className="inline-flex h-12 items-center justify-center rounded-[10px] bg-gradient-to-r from-violet via-purple-500 to-cyan-400 p-[3px] shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97]"
            >
              <span className="flex h-full items-center gap-2 rounded-[8px] bg-night px-6 text-sm font-bold uppercase tracking-wider text-white transition-all">
                Contact us <ArrowRight size={16} />
              </span>
            </a>
          </div>

          {/* Socials */}
          <div className="mt-10 flex items-center justify-center gap-6 text-white/40">
            <a
              href="https://x.com/get_orka"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-white/5 hover:text-white"
              aria-label="X"
            >
              <RiTwitterXFill size={22} />
            </a>
            <span className="h-6 w-px bg-white/10" />
            <a
              href="https://discord.gg/KbW5pPCDyY"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-white/5 hover:text-white"
              aria-label="Discord"
            >
              <RiDiscordFill size={22} />
            </a>
            <span className="h-6 w-px bg-white/10" />
            <a
              href="https://github.com/Genesis-360/Orka"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-white/5 hover:text-white"
              aria-label="GitHub"
            >
              <RiGithubFill size={22} />
            </a>
          </div>

          {/* Email */}
          <p className="mt-6">
            <a
              href="mailto:hello@orka.live"
              className="inline-block text-sm text-white/40 underline underline-offset-4 transition-all duration-200 hover:scale-105 hover:text-white"
            >
              hello@orka.live
            </a>
          </p>

          {/* Bottom bar */}
          <div className="mx-auto mt-12 h-px max-w-lg bg-white/5" />
          <p className="mt-4 text-xs font-semibold text-white/30">&copy; 2026 ORKA — The Autonomous Financial OS</p>
        </div>
      </section>

      {/* Form + CTA section */}
      <section id="form" className="px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            {/* Form */}
            <div className="lg:col-span-5">
              <div className="rounded-[18px] border border-border bg-card shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      ORKA Support
                    </p>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-night">
                      Send us a message
                    </h3>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-night text-white">
                    <MessageSquare size={16} />
                  </div>
                </div>

                <form className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                      Your name <span className="text-border">*</span>
                    </Label>
                    <Input id="name" placeholder="Jane Doe" required className="mt-1 focus-visible:!ring-0 focus-visible:!border-border" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                      Email <span className="text-border">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Mail size={16} className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input id="email" type="email" placeholder="you@example.com" required className="pl-9 focus-visible:!ring-0 focus-visible:!border-border" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs font-semibold text-muted-foreground">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us what you're building."
                      className="mt-1 w-full resize-y rounded-xl border border-border bg-input/30 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:!ring-0 focus-visible:!border-border"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2 rounded-xl font-semibold">
                    Send message <ArrowRight size={16} />
                  </Button>
                  <p className="text-[11px] font-semibold text-muted-foreground/50">
                    By submitting, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>

            {/* Dark CTA card */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-night text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.06),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.05),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]" />
                </div>

                <div className="relative">
                  <h2 className="text-[16vw] sm:text-[12vw] lg:text-[6vw] leading-[0.9] font-semibold tracking-tighter">
                    <span className="block text-white/90">Ready to build</span>
                    <span className="block text-white/40">on ORKA?</span>
                  </h2>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-white/40">Email</p>
                      <a
                        href="mailto:hello@orka.live"
                        className="mt-2 inline-flex items-center gap-3 text-xl font-medium tracking-tight text-white sm:text-2xl"
                      >
                        <Mail size={20} className="shrink-0 stroke-[1.5]" />
                        <span className="break-all">hello@orka.live</span>
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-white/40">Schedule</p>
                      <a
                        href="/signup"
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-night transition-colors duration-200 hover:bg-white/90"
                      >
                        <Calendar size={18} />
                        Book a demo
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-white/40">Follow</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a
                          href="https://x.com/get_orka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-night transition-colors duration-200 hover:bg-white/90"
                        >
                          <RiTwitterXFill size={14} /> X
                        </a>
                        <a
                          href="https://discord.gg/KbW5pPCDyY"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex size-10 items-center justify-center rounded-full bg-white text-night transition-colors duration-200 hover:bg-white/90"
                          aria-label="Discord"
                        >
                          <RiDiscordFill size={18} />
                        </a>
                        <a
                          href="https://github.com/Genesis-360/Orka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex size-10 items-center justify-center rounded-full bg-white text-night transition-colors duration-200 hover:bg-white/90"
                          aria-label="GitHub"
                        >
                          <RiGithubFill size={18} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/10" />

                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-white/40">Explore</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <Link href="/" className="font-medium tracking-tight text-white/70 transition-colors hover:text-white">Home</Link>
                        <Link href="/pricing" className="font-medium tracking-tight text-white/70 transition-colors hover:text-white">Pricing</Link>
                        <Link href="/about" className="font-medium tracking-tight text-white/70 transition-colors hover:text-white">About</Link>
                        <Link href="/blog" className="font-medium tracking-tight text-white/70 transition-colors hover:text-white">Blog</Link>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-white/40">Legal</p>
                      <div className="mt-3 flex flex-col gap-2 text-sm">
                        <a href="/terms" className="font-medium tracking-tight text-white/70 transition-colors hover:text-white">Terms of Service</a>
                        <a href="/privacy" className="font-medium tracking-tight text-white/70 transition-colors hover:text-white">Privacy Policy</a>
                      </div>
                    </div>
                  </div>

                  <p className="mt-8 text-center text-xs font-semibold text-white/40">
                    &copy; 2026 ORKA — The Autonomous Financial OS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
