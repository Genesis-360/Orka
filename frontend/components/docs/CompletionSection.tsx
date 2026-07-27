"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useDocsProgress } from "@/lib/docs/progress";
import ConfettiCanvas from "./ConfettiCanvas";

interface CompletionSectionProps {
  slug: string;
}

export default function CompletionSection({ slug }: CompletionSectionProps) {
  const { markCompleted, isCompleted, getNextRecommended } = useDocsProgress();
  const [justCompleted, setJustCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const completed = isCompleted(slug);
  const nextDoc = getNextRecommended(slug);

  const handleMarkCompleted = useCallback(() => {
    if (completed) return;
    markCompleted(slug);
    setJustCompleted(true);
    setShowConfetti(true);
  }, [completed, markCompleted, slug]);

  return (
    <>
      <ConfettiCanvas
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <div className="mt-10 space-y-8">
        {/* Mark as Completed */}
        <div className="rounded-xl border border-black/[0.06] p-5 text-center">
          {completed ? (
            <div className="flex items-center justify-center gap-2 text-[13px] font-bold text-[#22bd93]">
              <Check size={16} />
              Completed
            </div>
          ) : (
            <button
              onClick={handleMarkCompleted}
              className="inline-flex items-center gap-2 rounded-xl border border-[#22bd93]/30 bg-[#22bd93]/[0.06] px-5 py-2.5 text-[13px] font-bold text-[#22bd93] transition-all hover:bg-[#22bd93]/[0.12] hover:shadow-md"
            >
              <Check size={14} />
              Mark as Completed
            </button>
          )}
        </div>

        {/* Next recommended */}
        {(justCompleted || completed) && nextDoc && (
          <div className="rounded-xl border border-[#9474ff]/20 bg-[#9474ff]/[0.04] p-5">
            <p className="text-[12px] font-bold text-[#9474ff]">
              {justCompleted ? "Nice work!" : "Next up"}
            </p>
            <p className="mt-1 text-[13px] font-bold text-[#082033]">
              Next Recommended
            </p>
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="mt-3 flex items-center justify-between rounded-lg border border-black/[0.06] bg-white p-3 transition-all hover:border-[#9474ff]/20 hover:shadow-md"
            >
              <div>
                <p className="text-[13px] font-bold text-[#082033] hover:text-[#9474ff]">
                  → {nextDoc.title}
                </p>
                {nextDoc.description && (
                  <p className="mt-0.5 text-[11px] text-[#5f6b86]">
                    {nextDoc.description}
                  </p>
                )}
              </div>
              <ArrowRight size={14} className="shrink-0 text-[#9474ff]" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
