"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import { Search, FileText, ArrowRight, X } from "lucide-react";

interface SearchEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  url: string;
}

export default function SearchBar() {
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
    function handleGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
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
    const mapped = found.map((r) => ({
      id: r.id,
      title: r.title as string,
      category: r.category as string,
      description: r.description as string,
      content: "",
      url: r.url as string,
    }));
    setResults(mapped);
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
          className="flex items-center gap-2 rounded-lg border border-black/[0.06] bg-white px-3 py-1.5 text-[12px] font-medium text-[#082033]/40 shadow-sm transition-all hover:border-[#9474ff]/20 hover:text-[#082033]/60"
        >
          <Search size={13} />
          <span>Search</span>
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-lg border border-[#9474ff]/20 bg-white px-3 py-1.5 shadow-sm">
          <Search size={13} className="shrink-0 text-[#082033]/30" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-56 bg-transparent text-[12px] text-[#082033] outline-none placeholder:text-[#082033]/30"
          />
          <button
            onClick={() => setOpen(false)}
            className="shrink-0 rounded p-0.5 text-[#082033]/30 hover:text-[#082033]/60"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-black/[0.04] bg-[#fffaf2] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12),0_2px_6px_-2px_rgba(0,0,0,0.06)]">
          <div className="max-h-[360px] overflow-y-auto p-2">
            {loading && (
              <p className="py-6 text-center text-[12px] text-[#082033]/40">
                Loading...
              </p>
            )}
            {!loading && query && results.length === 0 && (
              <p className="py-6 text-center text-[12px] text-[#082033]/40">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
            {!loading && results.length > 0 && (
              <ul>
                {results.map((result, i) => (
                  <li key={result.id}>
                    <button
                      onClick={() => navigateTo(result.url)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        i === selectedIndex
                          ? "bg-[#9474ff]/[0.08] text-[#9474ff]"
                          : "text-[#082033] hover:bg-[#082033]/[0.04]"
                      }`}
                    >
                      <FileText size={14} className="shrink-0 text-[#082033]/25" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold truncate">{result.title}</p>
                        <p className="text-[10px] font-medium text-[#082033]/45 truncate">
                          {result.category}
                        </p>
                      </div>
                      <ArrowRight size={12} className="shrink-0 text-[#082033]/15" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {!loading && !query && (
              <p className="py-6 text-center text-[12px] text-[#082033]/30">
                Type to search...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
