"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentDocs } from "@/lib/docs/config";

interface PrevNextNavProps {
  slug: string;
}

export default function PrevNextNav({ slug }: PrevNextNavProps) {
  const { prev, next } = getAdjacentDocs(slug);

  if (!prev && !next) return null;

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-black/[0.06] pt-8">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-black/[0.06] p-4 transition-all hover:border-[#9474ff]/20 hover:shadow-md"
        >
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#5f6b86]">
            <ArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Previous
          </span>
          <span className="mt-1 text-[13px] font-bold text-[#082033] group-hover:text-[#9474ff]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-black/[0.06] p-4 text-right transition-all hover:border-[#9474ff]/20 hover:shadow-md"
        >
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#5f6b86]">
            Next
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
          <span className="mt-1 text-[13px] font-bold text-[#082033] group-hover:text-[#9474ff]">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
