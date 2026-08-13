"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackProps {
  slug: string;
}

function getStoredFeedback(slug: string): "helpful" | "not-helpful" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`docs-feedback-${slug}`);
  if (stored === "helpful" || stored === "not-helpful") return stored;
  return null;
}

export default function Feedback({ slug }: FeedbackProps) {
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(
    () => getStoredFeedback(slug)
  );

  const handleFeedback = (value: "helpful" | "not-helpful") => {
    setFeedback(value);
    localStorage.setItem(`docs-feedback-${slug}`, value);
  };

  if (feedback) {
    return (
      <div className="mt-8 rounded-xl border border-[#22bd93]/20 bg-[#22bd93]/[0.04] p-4 text-center">
        <p className="text-[13px] font-bold text-[#22bd93]">
          Thanks for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t border-black/[0.06] pt-6 text-center">
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
  );
}
