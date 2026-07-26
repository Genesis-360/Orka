"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Clock } from "lucide-react"

const socials = [
  { label: "Discord", href: "https://discord.gg/orka" },
  { label: "X (Twitter)", href: "https://x.com/get_orka" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Email", href: "mailto:hello@orka.app" },
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
  switch (label) {
    case "Discord":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
          <path d="M8.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M15.5 17.5V19a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-3" />
          <path d="M8.5 17.5V19a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-3" />
          <path d="M5.5 14V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9" />
        </svg>
      )
    case "X (Twitter)":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case "Email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
          <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      )
    default:
      return null
  }
}
