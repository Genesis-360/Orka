import { ArrowRight } from "lucide-react";
import Link from "next/link";

const socials = [
  { label: "Discord", href: "https://discord.gg/orka" },
  { label: "X (Twitter)", href: "https://x.com/get_orka" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Email", href: "mailto:hello@orka.app" },
];

const col1 = [
  ["Home", "/"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Docs", "/docs"],
];

const col2 = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
  ["Disclaimer", "/disclaimer"],
];

const techLogos = [
  { label: "Next.js", href: "https://nextjs.org" },
  { label: "Stellar", href: "https://stellar.org" },
  { label: "Rust", href: "https://rust-lang.org" },
  { label: "Tailwind", href: "https://tailwindcss.com" },
];

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left: Branding ── */}
          <div className="lg:col-span-4">
            <div>
              <h2 className="display text-[56px] font-bold uppercase leading-none tracking-tighter text-night sm:text-[72px]">
                ORKA
              </h2>
              <p className="mt-1 text-lg italic leading-snug text-muted-foreground">
                <em>The Autonomous Financial OS—</em>
              </p>
            </div>
          </div>

          {/* ── Center: Navigation ── */}
          <div className="lg:col-span-3">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex flex-col gap-2">
                {col1.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[15px] font-medium text-night transition-colors hover:text-orange"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {col2.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className={`text-[15px] font-medium transition-colors ${
                      label === "More Resources"
                        ? "text-night underline hover:text-orange"
                        : "text-night hover:text-orange"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* ── Right: Status / Newsletter / Social ── */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* Status message */}
            <div className="flex items-center gap-2.5 text-sm text-night/70">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-orange" />
              </span>
              <span>
                All systems nominal. Escrow engine live on Stellar.
              </span>
            </div>

            {/* Newsletter card */}
            <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-night">Stay in the Loop</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Mission logs, product updates, and new module releases from ORKA
                directly to your inbox.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="email"
                  placeholder="your email frequency"
                  className="min-w-0 flex-1 rounded-xl border border-border/60 bg-paper px-4 py-2.5 text-sm text-night placeholder:text-muted-foreground/60 outline-none focus:border-orange/50"
                />
                <button className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange text-white transition-colors hover:bg-orange/90">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Social card */}
            <div className="divide-y divide-border/40 rounded-2xl border border-border/60 bg-white shadow-sm">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 text-[14px] font-medium text-night transition-colors hover:text-orange"
                >
                  <span className="inline-flex size-5 items-center justify-center text-muted-foreground">
                    <SocialIcon label={label} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider + Footer bar ── */}
      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-8 lg:px-12">
          <p className="text-[13px] text-muted-foreground">
            &copy; 2026 ORKA. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span className="font-semibold tracking-wide text-night">BUILT WITH</span>
            {techLogos.map((t, i) => (
              <span key={t.label}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  {t.label}
                </a>
                {i < techLogos.length - 1 && (
                  <span className="mx-1.5 text-border">·</span>
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
      );
    case "X (Twitter)":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "Email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
          <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      );
    default:
      return null;
  }
}
