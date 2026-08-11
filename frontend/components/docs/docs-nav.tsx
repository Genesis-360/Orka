"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Menu, X } from "lucide-react";

const DocsNavContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function useDocsNav() {
  return useContext(DocsNavContext);
}

export function DocsNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DocsNavContext.Provider value={{ open, setOpen }}>
      {children}
    </DocsNavContext.Provider>
  );
}

export function DocsNavToggle({ className = "" }: { className?: string }) {
  const { open, setOpen } = useDocsNav();
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={open ? "Close documentation navigation" : "Open documentation navigation"}
      aria-expanded={open}
      className={`grid size-9 shrink-0 place-items-center rounded-lg border border-black/[0.08] bg-white text-[#082033] shadow-sm transition-colors hover:border-[#9474ff]/30 hover:text-[#9474ff] lg:hidden ${className}`}
    >
      {open ? <X size={16} /> : <Menu size={16} />}
    </button>
  );
}