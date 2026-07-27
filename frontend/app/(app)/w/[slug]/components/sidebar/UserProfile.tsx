"use client";

import Link from "next/link";
import { ChevronsUpDown, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "@/components/SignOutButton";

export function UserProfile({
  user,
  slug,
}: {
  user: { name: string; email: string; avatarUrl?: string };
  slug: string;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="group flex w-full items-center gap-2.5 rounded-lg border border-transparent px-3 py-1.5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        >
          <Avatar className="size-7 shrink-0">
            <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
            <AvatarFallback
              style={{ backgroundImage: "linear-gradient(to bottom right, #fb923c, #9474ff)" }}
              className="text-[10px] font-bold text-white"
            >
              {initials || "?"}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-white">
              {user.name}
            </span>
            <span className="block truncate text-xs text-white/35">
              {user.email}
            </span>
          </span>
          <ChevronsUpDown className="size-3.5 shrink-0 self-center text-white/30 transition-colors group-hover:text-white/60" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        className="border-white/[0.06] bg-[#0f131e] p-1.5"
      >
        <div className="border-b border-white/[0.06] px-3 py-2.5">
          <p className="truncate text-sm font-medium text-white">{user.name}</p>
          <p className="mt-0.5 truncate text-xs text-white/40">{user.email}</p>
        </div>
        <div className="p-1">
          <DropdownMenuItem asChild className="focus:text-white hover:bg-white/[0.08] hover:text-white">
            <Link href={`/w/${slug}/settings`} className="gap-2.5 text-sm font-medium text-white/60">
              <User className="size-4" aria-hidden />
              Workspace Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus:text-white hover:bg-white/[0.08] hover:text-white">
            <Link href="/settings" className="gap-2.5 text-sm font-medium text-white/60">
              <Settings className="size-4" aria-hidden />
              Personal Settings
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-white/[0.06]" />
        <div className="p-1">
          <DropdownMenuItem asChild className="focus:text-white hover:bg-white/[0.08] hover:text-white">
            <SignOutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
