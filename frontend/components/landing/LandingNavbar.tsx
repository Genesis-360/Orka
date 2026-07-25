"use client";

import { useEffect, useState } from "react";
import { Menu, X, Star } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Product", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#081B2E]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black uppercase tracking-tighter text-white">
            ORKA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="https://github.com/x0lg0n/Orka"
            target="_blank"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            <Star size={14} className="fill-yellow-500/40 text-yellow-500/60" />
            <span>Star on GitHub</span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/waitlist"
            className="rounded-full bg-violet px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-violet/90 hover:-translate-y-0.5"
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#081B2E]/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-white/60 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <hr className="border-white/10" />
            <Link
              href="/login"
              className="text-base font-medium text-white/60"
            >
              Sign In
            </Link>
            <Link
              href="/waitlist"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-violet px-5 py-3 text-sm font-bold text-white"
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
