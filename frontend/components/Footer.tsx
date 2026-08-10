"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Clock } from "lucide-react"
import { RiDiscordFill, RiTwitterXFill, RiLinkedinFill, RiYoutubeFill, RiMailFill } from "react-icons/ri"

const socials = [
  { label: "Discord", href: "https://discord.gg/orka" },
  { label: "X (Twitter)", href: "https://x.com/get_orka" },
  { label: "LinkedIn", href: "https://linkedin.com/company/orka" },
  { label: "YouTube", href: "https://youtube.com/@orka" },
  { label: "Email", href: "mailto:hello@orka.live" },
]

const col1 = [
  ["Home", "/"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Blogs", "/blog"],
  ["Pricing", "/pricing"],
];

const col2 = [
  ["Documentation", "/docs"],
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
  ["Changelog", "/changelog"],
  ["Disclaimer", "/disclaimer"],
];

const techLogos = [
  { label: "Next.js", href: "https://nextjs.org", src: "https://cdn.simpleicons.org/nextdotjs/111" },
  { label: "Stellar", href: "https://stellar.org", src: "https://cdn.simpleicons.org/stellar/111" },
  { label: "Rust", href: "https://rust-lang.org", src: "https://cdn.simpleicons.org/rust/111" },
  { label: "Tailwind", href: "https://tailwindcss.com", src: "https://cdn.simpleicons.org/tailwindcss/111" },
]

function UtcClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toUTCString().split(" ")[4])
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-3xl font-medium tracking-[-0.04em] text-night sm:text-6xl">
      {time || "—"}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid size-20 place-items-center rounded-full sm:size-24">
                <Image
                  src="/Logo/logo.svg"
                  alt="ORKA"
                  width={120}
                  height={120}
                  className="size-full object-contain"
                />
              </span>
              <h2
                className="display font-normal uppercase tracking-normal text-night"
                style={{
                  fontSize: "clamp(48px, 8vw, 240px)",
                  lineHeight: 0.95,
                }}>
                ORKA
              </h2>
            </div>
            <p className="mt-4 text-xl italic font-light tracking-[-0.01em] text-muted-foreground">
              <em>The Autonomous Financial OS—</em>
            </p>
          </div>
          <div className="flex flex-col items-end gap-4 text-right">
            <div className="flex items-center gap-1 text-2xl font-light leading-snug tracking-[-0.03em] text-muted-foreground">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-orange" />
              </span>
              <span className="max-w-105">
                Network healthy. Escrow contracts active on Stellar. Everything
                running. Payments secured on Stellar.
              </span>
            </div>
            <div className="flex flex-col gap-4 items-end">
              <p className="text-md font-bold tracking-tight text-night flex items-center gap-1.5">
                <Clock size={14} />
                Server Time (UTC)
              </p>
              <UtcClock />
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ marginTop: "88px" }}>
          <div className="flex flex-col" style={{ gap: "20px" }}>
            {col1.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-lg font-normal tracking-[-0.01em] text-night transition-colors hover:text-orange"
                style={{ lineHeight: "2.2" }}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col" style={{ gap: "20px" }}>
            {col2.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-lg font-normal tracking-[-0.01em] text-night transition-colors hover:text-orange"
                style={{ lineHeight: "2.2" }}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col rounded-[18px] border border-border bg-card p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-night">Stay in Orbit</h3>
            <p className="mt-2 text-md font-semibold leading-relaxed text-muted-foreground">
              Product updates, escrow tips, and new features for agencies.
            </p>
            <div className="mt-6 flex items-center gap-2 border-b border-border pb-2">
              <input
                type="email"
                placeholder="your email"
                className="min-w-0 flex-1 bg-transparent px-0 py-1 text-sm text-night placeholder:text-muted-foreground/60"
                style={{ outline: "none" }}
              />
              <button className="inline-flex shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-orange">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-border/40 rounded-[18px] border border-border bg-card shadow-sm">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-6 py-4 text-md font-semibold text-night transition-colors hover:text-orange">
                <span className="flex items-center gap-4">
                  <span className="inline-flex size-5 items-center justify-center text-night transition-colors group-hover:text-orange">
                    <SocialIcon label={label} />
                  </span>
                  {label}
                </span>
                <span className="text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-orange">
                  <ChevronRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border pb-12 md:pb-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm font-normal text-muted-foreground md:flex-row md:px-8 lg:px-12">
          <p>&copy; 2026 ORKA. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide text-night mr-3">
              BUILT WITH
            </span>
            {techLogos.map((t, i) => (
              <span key={t.label} className="flex items-center gap-1.5">
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-opacity hover:opacity-70">
                  <img src={t.src} alt={t.label} className="size-4" />
                  <span>{t.label}</span>
                </a>
                {i < techLogos.length - 1 && (
                  <span className="text-border">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  const size = "size-full"
  switch (label) {
    case "Discord":
      return <RiDiscordFill className={size} />
    case "X (Twitter)":
      return <RiTwitterXFill className={size} />
    case "LinkedIn":
      return <RiLinkedinFill className={size} />
    case "YouTube":
      return <RiYoutubeFill className={size} />
    case "Email":
      return <RiMailFill className={size} />
    default:
      return null
  }
}
