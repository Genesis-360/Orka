import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, BookOpen } from "lucide-react";
import { learningPathFlows } from "@/lib/docs/config";

interface LearningPathNavProps {
  slug: string;
}

export default function LearningPathNav({ slug }: LearningPathNavProps) {
  const path = learningPathFlows.find((p) =>
    p.steps.some((step) => step.slug === slug)
  );
  if (!path) return null;

  const index = path.steps.findIndex((step) => step.slug === slug);
  if (index === -1) return null;

  const step = index + 1;
  const total = path.steps.length;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const prevStep = !isFirst ? path.steps[index - 1] : null;
  const nextStep = !isLast ? path.steps[index + 1] : null;

  return (
    <div className="mt-8 rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/[0.03] p-5">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#3b82f6]/60">
          {path.title} Path · Step {step} of {total}
        </p>
        <p className="mt-1 text-[13px] text-[#082033]/60">
          {path.description}
        </p>
      </div>

      {/* Progress dots */}
      <div className="mb-4 flex items-center gap-1.5">
        {path.steps.map((s, i) => (
          <Link
            key={s.slug}
            href={`/docs/${s.slug}`}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < index
                ? "bg-[#3b82f6]"
                : i === index
                  ? "bg-[#3b82f6]/70"
                  : "bg-[#3b82f6]/15"
            }`}
            title={s.title}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        {!isFirst ? (
          <Link
            href={`/docs/${prevStep!.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/[0.06] px-3.5 py-2 text-[12px] font-semibold text-[#082033]/60 transition-all hover:border-[#3b82f6]/20 hover:text-[#3b82f6]"
          >
            <ArrowLeft size={13} />
            {prevStep!.title}
          </Link>
        ) : (
          <div />
        )}

        {isLast ? (
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl bg-[#3b82f6] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#3b82f6]/90 hover:shadow-lg hover:shadow-[#3b82f6]/20"
          >
            <Check size={14} />
            Path Complete
          </Link>
        ) : (
          <Link
            href={`/docs/${nextStep!.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3b82f6] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#3b82f6]/90 hover:shadow-lg hover:shadow-[#3b82f6]/20"
          >
            {nextStep!.title}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
