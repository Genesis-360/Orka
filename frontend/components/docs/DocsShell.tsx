"use client";

import DocsSidebar from "./DocsSidebar";
import { DocsNavProvider } from "./docs-nav";

export default function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <DocsNavProvider>
      <div className="flex min-h-screen bg-[#fffaf2]">
        <DocsSidebar />
        <main className="flex-1 lg:ml-[260px]">{children}</main>
      </div>
    </DocsNavProvider>
  );
}