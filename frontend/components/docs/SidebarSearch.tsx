"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import { Search, FileText, X } from "lucide-react";

interface SearchEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  url: string;
}

export default function SidebarSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const indexRef = useRef<MiniSearch | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadIndex() {
      if (indexRef.current) return;
      setLoading(true);
      try {
        const res = await fetch("/search-index.json");
        const entries: SearchEntry[] = await res.json();
        const ms = new MiniSearch({
          fields: ["title", "content", "category", "description"],
          storeFields: ["title", "category", "description", "url"],
          searchOptions: {
            boost: { title: 3, category: 2, description: 1.5 },
            prefix: true,
            fuzzy: 0.2,
          },
        });
        ms.addAll(entries);
        indexRef.current = ms;
      } catch (e) {
        console.error("Failed to load search index:", e);
      }
      setLoading(false);
    }
    loadIndex();
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim() || !indexRef.current) {
      setResults([]);
      return;
    }
    const found = indexRef.current.search(query).slice(0, 8);
    setResults(
      found.map((r) => ({
        id: r.id,
        title: r.title as string,
        category: r.category as string,
        description: r.description as string,
        content: "",
        url: r.url as string,
      }))
    );
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const navigateTo = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
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
        navigateTo(results[selectedIndex].url);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [results, selectedIndex, navigateTo]
  );

  return (
    <div ref={containerRef} className="relative">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#f7f8fc] px-3 py-2.5 text-[13px] font-medium text-[#5f6b86] transition-colors hover:border-[#9474ff]/30 hover:bg-[#9474ff]/[0.03]"
        >
          <Search size={14} className="shrink-0 opacity-50" />
          <span className="flex-1 text-left">Search docs</span>
          <kbd className="hidden rounded-md border border-black/[0.06] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#5f6b86] sm:inline-block">
            ⌘K
          </kbd>
        </button>
      ) : (
        <div className="rounded-xl border border-[#9474ff]/30 bg-white shadow-sm ring-1 ring-[#9474ff]/20">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <Search size={14} className="shrink-0 text-[#5f6b86]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search docs..."
              className="flex-1 bg-transparent text-[13px] text-[#082033] outline-none placeholder:text-[#5f6b86]/50"
            />
            <button
              onClick={() => setOpen(false)}
              className="shrink-0 rounded p-0.5 text-[#5f6b86]/50 hover:text-[#082033]"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-xl">
          <div className="max-h-[300px] overflow-y-auto p-1.5">
            {loading && (
              <p className="py-4 text-center text-[11px] text-[#5f6b86]">Loading...</p>
            )}
            {!loading && query && results.length === 0 && (
              <p className="py-4 text-center text-[11px] text-[#5f6b86]">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
            {!loading && results.length > 0 && (
              <ul>
                {results.map((result, i) => (
                  <li key={result.id}>
                    <button
                      onClick={() => navigateTo(result.url)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${
                        i === selectedIndex
                          ? "bg-[#9474ff]/5 text-[#9474ff]"
                          : "text-[#082033] hover:bg-[#f7f8fc]"
                      }`}
                    >
                      <FileText size={12} className="shrink-0 text-[#5f6b86]/40" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold truncate">{result.title}</p>
                        <p className="text-[10px] font-medium text-[#5f6b86] truncate">
                          {result.category}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {!loading && !query && (
              <p className="py-4 text-center text-[11px] text-[#5f6b86]/60">Type to search...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
