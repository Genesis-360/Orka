"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Check, ArrowRight, Clock } from "lucide-react";
import { useDocsProgress } from "@/lib/docs/progress";
import ConfettiCanvas from "./ConfettiCanvas";

interface CompletionSectionProps {
  slug: string;
  readingTime: number;
}

function getStoredFeedback(slug: string): "helpful" | "not-helpful" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`docs-feedback-${slug}`);
  if (stored === "helpful" || stored === "not-helpful") return stored;
  return null;
}

export default function CompletionSection({ slug, readingTime }: CompletionSectionProps) {
  const { markCompleted, isCompleted, getNextRecommended } = useDocsProgress();
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(
    () => getStoredFeedback(slug)
  );
  const [justCompleted, setJustCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const completed = isCompleted(slug);
  const nextDoc = getNextRecommended(slug);

  const handleFeedback = useCallback(
    (value: "helpful" | "not-helpful") => {
      setFeedback(value);
      localStorage.setItem(`docs-feedback-${slug}`, value);
    },
    [slug]
  );

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
        {/* Reading time + difficulty */}
        <div className="flex items-center gap-3 text-[12px] font-medium text-[#5f6b86]">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readingTime} min read
          </span>
          <span className="text-[#5f6b86]/30">·</span>
          <span>Beginner</span>
        </div>

        {/* Was this page helpful? */}
        {!feedback ? (
          <div className="rounded-xl border border-black/[0.06] p-5 text-center">
            <p className="text-[13px] font-bold text-[#082033]">
              Was this page helpful?
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <button
                onClick={() => handleFeedback("helpful")}
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.06] px-4 py-2 text-[12px] font-medium text-[#5f6b86] transition-all hover:border-[#22bd93] hover:text-[#22bd93]"
              >
                <ThumbsUp size={13} />
                Yes
              </button>
              <button
                onClick={() => handleFeedback("not-helpful")}
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.06] px-4 py-2 text-[12px] font-medium text-[#5f6b86] transition-all hover:border-[#ff4f42] hover:text-[#ff4f42]"
              >
                <ThumbsDown size={13} />
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#22bd93]/20 bg-[#22bd93]/[0.04] p-4 text-center">
            <p className="text-[13px] font-bold text-[#22bd93]">
              Thanks for your feedback!
            </p>
          </div>
        )}

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
