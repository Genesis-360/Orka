"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, FileText, Mail, Rss, Star, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { companyLinks, productLinks, resourcesLinks } from "../lib/content";
import { blogPosts } from "../lib/blog-data";
import StaggeredMenu, { type StaggeredMenuItem, type StaggeredMenuSocialItem } from "./ui/staggered-menu";

const GITHUB_URL = "https://github.com/x0lg0n/Orka";

type MenuLink = {
  label: string;
  description: string;
  href: string;
  icon: typeof ArrowRight;
};

type MenuGroup = {
  id: string;
  label: string;
  eyebrow: string;
  heading: string;
  links: MenuLink[];
  featured: { label: string; title: string; copy: string; href: string };
};

const menuGroups: MenuGroup[] = [
  {
    id: "product",
    label: "Product",
    eyebrow: "The operating system",
    heading: "Keep client work and payment records in one flow.",
    links: [
      { label: "Proposals & agreements", description: "Turn an approved scope into a shared source of truth.", href: "/proposals", icon: FileText },
      { label: "Milestone workflow", description: "Coordinate delivery, evidence, reviews, and approvals.", href: "/milestones", icon: BookOpen },
      { label: "Payment records", description: "See every funded, pending, and settled milestone clearly.", href: "/payments", icon: FileText },
      { label: "ORKA AI", description: "Get help drafting, summarising, and moving work forward.", href: "/ai", icon: FileText },
    ],
    featured: { label: "See the product", title: "Work is easier to trust when everyone sees the same next step.", copy: "Explore what ORKA brings together for global client teams.", href: "/signup" },
  },
  {
    id: "solutions",
    label: "Solutions",
    eyebrow: "Built around real roles",
    heading: "A cleaner handoff for everyone involved in a project.",
    links: [
      { label: "Agencies & studios", description: "Run client work with a more dependable operating rhythm.", href: "/agencies", icon: FileText },
      { label: "Independent experts", description: "Make scope, approvals, and payment status easier to follow.", href: "/independents", icon: FileText },
      { label: "Clients", description: "Review a project through one clear, shared client portal.", href: "/clients", icon: FileText },
    ],
    featured: { label: "Start with ORKA", title: "Bring order to the project before delivery begins.", copy: "Create your ORKA workspace and get started.", href: "/signup" },
  },
  {
    id: "resources",
    label: "Resources",
    eyebrow: "Learn and decide",
    heading: "Everything you need to understand the ORKA approach.",
    links: [
      { label: "Documentation", description: "Product notes, setup guidance, and practical references.", href: "/docs", icon: BookOpen },
      { label: "About", description: "Learn more about ORKA and the team behind it.", href: "/about", icon: User },
      { label: "Blog", description: "Product updates, guides, and industry insights.", href: "/blog", icon: Rss },
      { label: "Contact", description: "Get in touch with the ORKA team.", href: "/contact", icon: Mail },
      { label: "Privacy", description: "How ORKA collects, uses, and protects your data.", href: "/privacy", icon: FileText },
      { label: "Terms & conditions", description: "The terms governing access to ORKA.", href: "/terms", icon: FileText },
    ],
    featured: { label: "For teams", title: "An operating system for global client work.", copy: "ORKA helps teams run client work with a calmer, clearer project lifecycle.", href: "/signup" },
  },
];

const recentPosts = blogPosts.slice(1, 4);

type NavGroup = { id: string; label: string; links: { label: string; href: string }[] };

const desktopGroups: NavGroup[] = [
  { id: "product", label: "Product", links: productLinks },
  { id: "resources", label: "Resources", links: resourcesLinks },
  { id: "company", label: "Company", links: companyLinks },
];

const mobileMenuItems: StaggeredMenuItem[] = [
  ...productLinks.map((l) => ({ label: l.label, ariaLabel: l.label, link: l.href })),
  ...resourcesLinks.map((l) => ({ label: l.label, ariaLabel: l.label, link: l.href })),
  ...companyLinks.map((l) => ({ label: l.label, ariaLabel: l.label, link: l.href })),
  { label: "Sign Up", ariaLabel: "Sign up", link: "/signup" },
];

const mobileSocialItems: StaggeredMenuSocialItem[] = [
  { label: "X", link: "https://x.com/get_orka" },
  { label: "GitHub", link: GITHUB_URL },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
  }, []);

  return (
    <header
      ref={navRef}
      className="relative z-50 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Main navigation"
        className="flex h-18 items-center border-b border-white/12">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white"
          aria-label="ORKA home">
          <Image
            src="/Logo/logo.svg"
            alt=""
            width={32}
            height={32}
            className="size-8"
            priority
          />
          <span className="text-[1.5rem] font-bold tracking-[-0.04em]">
            ORKA
          </span>
        </Link>

        {/* Desktop dropdown groups */}
        <div ref={navRef} className="hidden items-center gap-2 md:flex">
          {desktopGroups.map((group) => (
            <div key={group.id} className="relative">
              <button
                onClick={() => setOpen(open === group.id ? null : group.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-normal uppercase text-white transition-all ${
                  open === group.id ? "bg-orange" : "hover:bg-orange"
                }`}
                aria-expanded={open === group.id}
                aria-haspopup="true">
                {group.label}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${open === group.id ? "rotate-180" : ""}`}
                />
              </button>

              {open === group.id && (
                <div className="dropdown-panel absolute left-0 top-full mt-2 min-w-[180px] rounded-2xl border border-white/10 bg-night p-2 shadow-hard">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(null)}
                      className="block rounded-full px-4 py-2 text-sm font-normal uppercase text-white transition-all hover:bg-orange">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <a
            href="https://github.com/x0lg0n/Orka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/18 px-3 py-2 text-sm font-medium text-white/78 transition-colors hover:text-white hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star
          </a>
          <Link
            href="/signin"
            className="rounded-md px-3 py-2 text-sm font-medium text-white/78 transition-colors hover:text-white hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-violet px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#a78cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Explore Platform <ArrowRight size={15} />
          </Link>
        </div>

        {/* CTA — Sign Up (desktop) */}
        <Link
          href="/signup"
          className="hidden rounded-full px-6 py-3 text-[18px] font-black uppercase text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-4 hover:border-white md:flex">
          Sign Up
        </Link>
        {/* CTA — Star on GitHub (desktop) */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-4 rounded-full border-4 border-white bg-white px-6 py-3 text-[18px] font-black uppercase text-night transition-all duration-200 hover:-translate-y-0.5 hover:bg-transparent hover:text-white hover:border-white md:flex">
          <Star size={18} fill="current" className="star-wiggle shrink-0" />
          Star
        </a>



        {/* Staggered menu (mobile only) */}
        <div className="md:hidden">
          <StaggeredMenu
            position="right"
            items={mobileMenuItems}
            socialItems={mobileSocialItems}
            displaySocials
            displayItemNumbering
            accentColor="#9474ff"
            colors={["#9474ff", "#5227FF", "#1a1a1a"]}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen
            isFixed
            onMenuClose={() => {
              document.body.style.overflow = "";
            }}
            onMenuOpen={() => {
              document.body.style.overflow = "hidden";
            }}
          />
        </div>
      </nav>
    </header>
  );
}
