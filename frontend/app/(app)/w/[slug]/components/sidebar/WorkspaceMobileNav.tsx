"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { flatSidebarNav } from "@/lib/navigation/workspace-nav";

export function WorkspaceMobileNav({
  currentSlug,
  workspaceName,
}: {
  currentSlug: string;
  workspaceName: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background lg:hidden">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <Link
          href={`/w/${currentSlug}/dashboard`}
          className="flex min-w-0 items-center text-sm font-bold tracking-tight text-foreground"
        >
          <span className="shrink-0 text-primary">ORKA</span>
          <span className="mx-2 shrink-0 text-muted-foreground">/</span>
          <span className="min-w-0 truncate">{workspaceName}</span>
        </Link>

        <div className="flex items-center gap-0.5">
          <Link
            href={`/w/${currentSlug}/search`}
            className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Search workspace"
          >
            <Search className="size-4" aria-hidden />
          </Link>
          <Link
            href={`/w/${currentSlug}/notifications`}
            className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Notifications"
          >
            <Bell className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-expanded={open}
            aria-controls="workspace-mobile-menu"
            aria-label={open ? "Close workspace menu" : "Open workspace menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="workspace-mobile-menu" className="fixed inset-x-0 bottom-0 top-14 z-40 flex">
          <button
            type="button"
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close workspace menu"
          />
          <nav
            className="flex w-[min(20rem,86vw)] flex-col border-l border-white/[0.06] bg-[#0a0e17] px-3 py-4"
            aria-label="Workspace navigation"
          >
            <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-white/30">Workspace</p>
            <div className="flex flex-col gap-0.5">
              {flatSidebarNav.map((item) => {
                const href = `/w/${currentSlug}/${item.path}`;
                const active = pathname === href || pathname.startsWith(`${href}/`);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex h-9 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/[0.08] font-semibold text-white before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-r-full before:bg-primary"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                  >
                    <Icon className={`size-4 ${active ? "text-primary" : "text-white/35 group-hover:text-white/60"}`} aria-hidden />
                    <span>{item.title}</span>
                    {item.badge ? (
                      <span className="ml-auto rounded-md bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/workspaces"
              onClick={() => setOpen(false)}
              className="mt-auto rounded-md px-3 py-2 text-sm font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white/80"
            >
              Switch workspace
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
