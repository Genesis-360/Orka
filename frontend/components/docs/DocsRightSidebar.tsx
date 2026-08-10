"use client";

import DocsToc, { TocItem } from "./DocsToc";
import { useState } from "react";

interface DocsRightSidebarProps {
  headings: TocItem[];
  slug: string;
}

export default function DocsRightSidebar({ headings, slug }: DocsRightSidebarProps) {
  const [helpful, setHelpful] = useState<"yes" | "no" | null>(null);

  return (
    <aside className="hidden w-[300px] shrink-0 border-l border-black/[0.06] bg-[#fffaf2] lg:block">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto py-8 pr-4 pl-5">
        {/* Table of Contents */}
        <div className="mb-6">
          <p className="mb-3 text-[11px] font-black uppercase text-[#082033]/60">
            On this page
          </p>
          <DocsToc headings={headings} />
        </div>

        {/* Last Updated */}
        <div className="border-t border-black/[0.06] pt-4 pb-2">
          <p className="text-[11px] font-medium text-[#082033]/50">
            Last Updated: Jul 2026
          </p>
        </div>

        {/* Was this helpful? */}
        <div className="my-4 rounded-xl border border-black/[0.06] bg-white p-4">
          <p className="text-[12px] font-bold text-[#082033]">Was this page helpful?</p>
          <p className="mt-0.5 text-[11px] text-[#082033]/60">
            Your feedback helps us improve.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setHelpful("yes")}
              className={`flex-1 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                helpful === "yes"
                  ? "border-[#22bd93] bg-[#22bd93]/10 text-[#22bd93]"
                  : "border-black/[0.1] text-[#082033]/60 hover:border-[#9474ff] hover:text-[#9474ff]"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setHelpful("no")}
              className={`flex-1 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                helpful === "no"
                  ? "border-[#ff8a22] bg-[#ff8a22]/10 text-[#ff8a22]"
                  : "border-black/[0.1] text-[#082033]/60 hover:border-[#9474ff] hover:text-[#9474ff]"
              }`}
            >
              No
            </button>
          </div>
          {helpful && (
            <p className="mt-2 text-[10px] text-[#22bd93]">Thanks for your feedback!</p>
          )}
        </div>

        {/* Contact Support */}
        <div className="my-4 rounded-xl border border-black/[0.06] bg-[#f7f8fc] p-4">
          <p className="text-[12px] font-bold text-[#082033]">Need help?</p>
          <p className="mt-0.5 text-[11px] text-[#082033]/60">
            Our support team is here to assist.
          </p>
          <a
            href="/contact"
            className="mt-3 flex items-center justify-center rounded-lg bg-[#9474ff] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#9474ff]/90"
          >
            Contact Support
          </a>
        </div>
      </div>
    </aside>
  );
}
