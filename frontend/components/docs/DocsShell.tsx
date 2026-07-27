"use client";

import DocsSidebar from "./DocsSidebar";

export default function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      <DocsSidebar />
      <main className="ml-[260px] flex-1">
        {children}
      </main>
    </div>
  );
}
