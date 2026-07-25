"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WorkspaceSwitcher({
  orgs,
  currentSlug,
}: {
  orgs: { slug: string; name: string }[];
  currentSlug: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const current = orgs.find((o) => o.slug === currentSlug) ?? orgs[0];
  if (!current) return null;

  const urlForSlug = (slug: string) => pathname.replace(/\/w\/[^/]+/, `/w/${slug}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Switch workspace"
          className="group flex w-full items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2.5 text-left transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
            {current.name.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">
              {current.name}
            </span>
            <span className="mt-px block truncate text-xs text-white/40">
              {orgs.length} workspace{orgs.length === 1 ? "" : "s"}
            </span>
          </span>
          <ChevronsUpDown className="size-3.5 shrink-0 text-white/30 transition-colors group-hover:text-white/60" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="border-white/[0.06] bg-[#0f131e] p-1.5"
      >
        <DropdownMenuLabel className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
          Workspaces
        </DropdownMenuLabel>
        {orgs.map((org) => {
          const active = org.slug === current.slug;
          return (
            <DropdownMenuItem
              key={org.slug}
              onSelect={() => router.push(urlForSlug(org.slug))}
              className={`mb-0.5 gap-2.5 rounded-lg px-3 py-2 text-sm font-medium last:mb-0 focus:text-white hover:bg-white/[0.08] hover:text-white ${
                active ? "bg-primary/15 text-white" : "text-white/60"
              }`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-md text-xs font-bold ${
                  active
                    ? "bg-primary/25 text-primary"
                    : "bg-white/[0.06]"
                }`}
              >
                {org.name.charAt(0).toUpperCase()}
              </span>
              <span className="truncate">{org.name}</span>
              {active && <Check className="ml-auto size-3.5 text-primary" aria-hidden />}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator className="bg-white/[0.06]" />
        <DropdownMenuItem asChild className="focus:text-white hover:bg-white/[0.08] hover:text-white">
          <Link href="/workspaces" className="text-sm font-medium text-white/60">
            <Plus className="size-4" aria-hidden />
            Manage workspaces
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
