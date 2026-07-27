"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { flatSidebarNav } from "@/lib/navigation/workspace-nav";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { SidebarHeader } from "@/components/ui/sidebar/SidebarHeader";
import { SidebarFooter } from "@/components/ui/sidebar/SidebarFooter";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { UserProfile } from "./UserProfile";

export function WorkspaceSidebar({
  orgs,
  currentSlug,
  user,
}: {
  orgs: { slug: string; name: string }[];
  currentSlug: string;
  user: { name: string; email: string; avatarUrl?: string };
}) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader />

      <div className="px-4 pb-5">
        <WorkspaceSwitcher orgs={orgs} currentSlug={currentSlug} />
      </div>

      <nav
        className="flex flex-1 flex-col gap-0.5 px-3 pb-4"
        aria-label="Workspace navigation"
      >
        {flatSidebarNav.map((item) => {
          const href = `/w/${currentSlug}/${item.path}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex h-9 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/[0.08] font-semibold text-white before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-r-full before:bg-primary"
                  : "text-white/55 hover:bg-white/[0.04] hover:text-white/80"
              }`}
            >
              <Icon
                className={`size-4 shrink-0 ${active ? "text-primary" : "text-white/35 group-hover:text-white/60"}`}
                aria-hidden="true"
              />
              <span className="truncate">{item.title}</span>
              {item.badge && (
                <span className="ml-auto rounded-md bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <SidebarFooter>
        <UserProfile user={user} slug={currentSlug} />
      </SidebarFooter>
    </Sidebar>
  );
}
