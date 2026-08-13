"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import { Search, FileText, ArrowRight, Loader2 } from "lucide-react";

interface SearchEntry {
  id: string;
  title: string;
  category: string;
  sectionSlug: string;
  description: string;
  content: string;
  url: string;
  tags: string[];
}

interface SearchData {
  ms: MiniSearch;
  entries: SearchEntry[];
}

let dataPromise: Promise<SearchData | null> | null = null;
let dataCache: SearchData | null = null;

function loadIndex(): Promise<SearchData | null> {
  if (dataCache) return Promise.resolve(dataCache);
  if (!dataPromise) {
    dataPromise = fetch("/search-index.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`Search index unavailable (${res.status})`);
        return res.json() as Promise<SearchEntry[]>;
      })
      .then((entries) => {
        if (!Array.isArray(entries) || entries.length === 0) return null;
        const ms = new MiniSearch({
          fields: ["title", "tags", "description", "content"],
          storeFields: ["title", "category", "description", "url"],
          searchOptions: {
            boost: { title: 4, tags: 3, description: 2, content: 1 },
            prefix: true,
            fuzzy: 0.2,
            combineWith: "OR",
          },
        });
        ms.addAll(entries);
        dataCache = { ms, entries };
        return dataCache;
      })
      .catch((e) => {
        console.error("Failed to load search index:", e);
        return null;
      })
      .finally(() => {
        dataPromise = null;
      });
  }
  return dataPromise;
}

function getTerms(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);
}

function highlight(text: string, terms: string[]): React.ReactNode {
  const lowered = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const term of terms) {
    const idx = lowered.indexOf(term, cursor);
    if (idx === -1) continue;
    if (idx > cursor) parts.push(text.slice(cursor, idx));
    parts.push(
      <mark key={`${idx}-${term}`} className="rounded-sm bg-[#9474ff]/15 text-[#9474ff]">
        {text.slice(idx, idx + term.length)}
      </mark>
    );
    cursor = idx + term.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts.length > 0 ? parts : text;
}

function makeSnippet(entry: SearchEntry | undefined, terms: string[]): string {
  if (!entry) return "";
  const content = entry.content;
  let target = -1;
  for (const term of terms) {
    const idx = content.toLowerCase().indexOf(term);
    if (idx !== -1 && (target === -1 || idx < target)) target = idx;
  }
  if (target === -1) {
    const base = entry.description || content.slice(0, 160);
    return base.length > 160 ? `${base.slice(0, 160).trimEnd()}…` : base;
  }
  const start = Math.max(0, target - 90);
  const end = Math.min(content.length, target + 140);
  let snippet = content.slice(start, end).trim();
  if (start > 0) snippet = `…${snippet}`;
  if (end < content.length) snippet = `${snippet}…`;
  return snippet;
}

const POPULAR_SLUGS = [
  { title: "Create Workspace", url: "/docs/start-here/create-workspace" },
  { title: "Send First Invoice", url: "/docs/guides/send-first-invoice" },
  { title: "Escrow Explained", url: "/docs/payments/escrow" },
  { title: "Generate Proposal with AI", url: "/docs/ai/generate-proposal" },
  { title: "API Authentication", url: "/docs/developers/authentication" },
  { title: "Webhooks", url: "/docs/developers/webhooks" },
];

export default function DocsSearch({
  variant = "light",
  compact = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<SearchEntry & { snippet: string }>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indexReady, setIndexReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryRef = useRef("");

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    function handleGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  useEffect(() => {
    if (!open || indexReady) return;
    loadIndex().then(() => {
      setIndexReady(true);
    });
  }, [open, indexReady]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(t);
      };
    }
  }, [open]);

  useEffect(() => {
    queryRef.current = query;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) return;

    debounceRef.current = setTimeout(async () => {
      const data = await loadIndex();
      const current = queryRef.current;
      if (!data || !current.trim()) return;

      const raw = data.ms.search(current, { prefix: true });
      const terms = getTerms(current);
      const byId = new Map(data.entries.map((e) => [e.url, e]));

      setResults(
        raw.slice(0, 50).map((r, i) => {
          const url = (r.url as string) || "/docs";
          const entry = byId.get(url) || data.entries[i];
          return {
            ...entry,
            snippet: makeSnippet(entry, terms),
          };
        })
      );
      setSelectedIndex(0);
    }, 160);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Array<SearchEntry & { snippet: string }>>();
    for (const r of results) {
      const list = groups.get(r.category) || [];
      list.push(r);
      groups.set(r.category, list);
    }
    return [...groups.entries()];
  }, [results]);

  const navigateTo = useCallback(
    (url: string) => {
      close();
      router.push(url);
    },
    [close, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigateTo(results[selectedIndex].url);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    },
    [results, selectedIndex, navigateTo, close]
  );

  const triggerClasses =
    variant === "dark"
      ? "border border-white/10 bg-white/5 text-white/40 hover:border-[#9474ff]/40 hover:text-white/60"
      : "border border-black/[0.06] bg-white text-[#082033]/40 shadow-sm hover:border-[#9474ff]/20 hover:text-[#082033]/60";

  const sizeClasses = compact
    ? "rounded-lg px-2.5 py-1.5 text-[12px]"
    : "rounded-xl px-3.5 py-2.5 text-[13px]";

  const kbdClasses =
    variant === "dark"
      ? "border-white/15 text-white/30"
      : "border-black/[0.08] text-[#082033]/35";

  const kbdSize = compact ? "hidden text-[9px] xl:inline-block" : "hidden text-[10px] sm:inline-block";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex w-full items-center gap-2.5 font-medium transition-all ${sizeClasses} ${triggerClasses}`}
        aria-label="Open documentation search"
      >
        <Search size={14} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left">Search docs…</span>
        <kbd className={`rounded-md border px-1.5 py-0.5 font-semibold ${kbdSize} ${kbdClasses}`}>
          ⌘K
        </kbd>
      </button>

      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search documentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="fixed inset-0 bg-[#071426]/40 backdrop-blur-sm" aria-hidden="true" />

          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3.5">
              <Search size={16} className="shrink-0 text-[#5f6b86]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search guides, API endpoints, concepts…"
                role="combobox"
                aria-expanded="true"
                aria-controls="docs-search-results"
                aria-activedescendant={`docs-result-${selectedIndex}`}
                className="flex-1 bg-transparent text-[14px] font-medium text-[#082033] outline-none placeholder:text-[#082033]/30"
              />
              {!indexReady && <Loader2 size={14} className="shrink-0 animate-spin text-[#9474ff]" />}
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-lg border border-black/[0.08] px-2 py-1 text-[11px] font-bold text-[#5f6b86] transition-colors hover:bg-black/[0.03] hover:text-[#082033]"
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            <div ref={listRef} className="max-h-[44vh] overflow-y-auto p-2" id="docs-search-results" role="listbox">
              {!indexReady && (
                <p className="py-10 text-center text-[12px] font-medium text-[#5f6b86]">
                  Loading search index…
                </p>
              )}

              {indexReady && !query.trim() && (
                <div className="py-2">
                  <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#5f6b86]/70">
                    Popular docs
                  </p>
                  <ul>
                    {POPULAR_SLUGS.map((doc) => (
                      <li key={doc.url}>
                        <button
                          type="button"
                          onClick={() => navigateTo(doc.url)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#9474ff]/[0.06]"
                        >
                          <FileText size={14} className="shrink-0 text-[#9474ff]" />
                          <span className="flex-1 truncate text-[13px] font-semibold text-[#082033]">
                            {doc.title}
                          </span>
                          <ArrowRight size={12} className="shrink-0 text-[#5f6b86]/40" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {indexReady && query.trim() && grouped.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-[13px] font-semibold text-[#082033]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1 text-[12px] text-[#5f6b86]">
                    Try different keywords, or browse all documentation.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateTo("/docs")}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#9474ff] px-3.5 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#9474ff]/90"
                  >
                    Browse all docs
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}

              {grouped.map(([category, items]) => {
                let offset = 0;
                for (const [, list] of grouped) {
                  if (list === items) break;
                  offset += list.length;
                }
                return (
                  <div key={category} className="mb-1">
                    <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#5f6b86]/70">
                      {category}
                    </p>
                    <ul>
                      {items.map((result, localIdx) => {
                        const globalIdx = offset + localIdx;
                        const active = globalIdx === selectedIndex;
                        return (
                          <li key={result.id} data-index={globalIdx}>
                            <button
                              type="button"
                              id={`docs-result-${globalIdx}`}
                              role="option"
                              aria-selected={active}
                              onClick={() => navigateTo(result.url)}
                              className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                active ? "bg-[#9474ff]/[0.08]" : "hover:bg-black/[0.03]"
                              }`}
                            >
                              <FileText
                                size={14}
                                className={`mt-0.5 shrink-0 ${active ? "text-[#9474ff]" : "text-[#5f6b86]/50"}`}
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-bold text-[#082033]">
                                  {highlight(result.title, getTerms(query))}
                                </p>
                                <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#5f6b86]">
                                  {highlight(result.snippet, getTerms(query))}
                                </p>
                              </div>
                              <ArrowRight
                                size={12}
                                className={`mt-1 shrink-0 transition-all ${
                                  active ? "translate-x-0 text-[#9474ff]" : "text-[#5f6b86]/25"
                                }`}
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-black/[0.06] px-4 py-2.5 text-[10px] font-semibold text-[#5f6b86]/60">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-black/[0.08] px-1 py-0.5">↑</kbd>
                <kbd className="rounded border border-black/[0.08] px-1 py-0.5">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-black/[0.08] px-1 py-0.5">↵</kbd>
                open
              </span>
              <span className="ml-auto flex items-center gap-1">
                <kbd className="rounded border border-black/[0.08] px-1 py-0.5">esc</kbd>
                close
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}