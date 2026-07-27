"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { docsNavigation } from "@/lib/docs/config";

interface RelatedArticlesProps {
  slug: string;
}

export default function RelatedArticles({ slug }: RelatedArticlesProps) {
  // Find related articles from the same section
  const parts = slug.split("/");
  const sectionSlug = parts[0];
  const section = docsNavigation.find((s) => s.slug === sectionSlug);

  if (!section) return null;

  const related = section.items
    .filter((item) => {
      const itemPath = `${section.slug}/${item.slug}`;
      return itemPath !== slug;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-10 border-t border-black/[0.06] pt-8">
      <h3 className="text-[14px] font-bold text-[#082033]">Continue Reading</h3>
      <div className="mt-4 space-y-2">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/docs/${section.slug}/${item.slug}`}
            className="group flex items-center justify-between rounded-xl border border-black/[0.06] p-3.5 transition-all hover:border-[#9474ff]/20 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-[#9474ff]/10">
                <FileText size={14} className="text-[#9474ff]" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-[#082033] group-hover:text-[#9474ff]">
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-[11px] text-[#5f6b86]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <ArrowRight
              size={14}
              className="shrink-0 text-[#5f6b86]/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#9474ff]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
