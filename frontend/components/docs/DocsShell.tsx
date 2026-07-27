"use client";

import { useState, useEffect, useCallback } from "react";
import DocsSidebar from "./DocsSidebar";
import SearchModal from "./SearchModal";

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <DocsSidebar onOpenSearch={handleOpenSearch} />
      <div className="ml-[260px] flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
