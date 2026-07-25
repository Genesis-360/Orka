"use client";

import type { ReactNode } from "react";

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Sidebar"
      className="z-40 hidden h-dvh w-[280px] shrink-0 flex-col border-r border-white/10 bg-[#0a0e17] lg:sticky lg:top-0 lg:flex"
    >
      {children}
    </aside>
  );
}
