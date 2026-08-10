"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

type ThemeContext = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeCtx = createContext<ThemeContext | null>(null);

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  // Dark mode was removed from the app — ignore any stale value left in
  // localStorage by the earlier theme experiment and clear it.
  if (localStorage.getItem("theme") === "dark") {
    localStorage.removeItem("theme");
  }
  return "light";
}

function applyTheme(t: Theme) {
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(t);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem("theme", t);
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
