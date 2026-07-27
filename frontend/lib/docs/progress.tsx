"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { docsNavigation, DocItem } from "./config";

const STORAGE_KEY = "orka-docs-progress";

interface DocsProgressContextValue {
  completedSlugs: Set<string>;
  markCompleted: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  getSectionProgress: (sectionSlug: string) => { completed: number; total: number; percent: number };
  getNextRecommended: (currentSlug: string) => DocItem | null;
  isLoaded: boolean;
}

const DocsProgressContext = createContext<DocsProgressContextValue | null>(null);

function loadProgress(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch {
    // ignore malformed data
  }
  return new Set();
}

function saveProgress(slugs: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(slugs)));
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function DocsProgressProvider({ children }: { children: ReactNode }) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(loadProgress);
  const isLoaded = useHydrated();

  const markCompleted = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      next.add(slug);
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (slug: string) => completedSlugs.has(slug),
    [completedSlugs]
  );

  const getSectionProgress = useCallback(
    (sectionSlug: string) => {
      const section = docsNavigation.find((s) => s.slug === sectionSlug);
      if (!section) return { completed: 0, total: 0, percent: 0 };

      const total = section.items.length;
      const completed = section.items.filter((item) =>
        completedSlugs.has(`${section.slug}/${item.slug}`)
      ).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      return { completed, total, percent };
    },
    [completedSlugs]
  );

  const getNextRecommended = useCallback(
    (currentSlug: string): DocItem | null => {
      const allItems = docsNavigation.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          slug: `${section.slug}/${item.slug}`,
        }))
      );

      const currentIndex = allItems.findIndex((item) => item.slug === currentSlug);
      if (currentIndex === -1) return null;

      for (let i = currentIndex + 1; i < allItems.length; i++) {
        if (!completedSlugs.has(allItems[i].slug)) {
          return allItems[i];
        }
      }
      for (let i = 0; i < currentIndex; i++) {
        if (!completedSlugs.has(allItems[i].slug)) {
          return allItems[i];
        }
      }
      return null;
    },
    [completedSlugs]
  );

  return (
    <DocsProgressContext.Provider
      value={{
        completedSlugs,
        markCompleted,
        isCompleted,
        getSectionProgress,
        getNextRecommended,
        isLoaded,
      }}
    >
      {children}
    </DocsProgressContext.Provider>
  );
}

export function useDocsProgress() {
  const context = useContext(DocsProgressContext);
  if (!context) {
    throw new Error("useDocsProgress must be used within a DocsProgressProvider");
  }
  return context;
}
