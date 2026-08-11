import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { sequentialOnboarding } from "@/lib/docs/config";

interface SequentialNavProps {
  slug: string;
}

export default function SequentialNav({ slug }: SequentialNavProps) {
  const index = sequentialOnboarding.findIndex((item) => item.slug === slug);
  if (index === -1) return null;

  const step = index + 1;
  const total = sequentialOnboarding.length;
  const isLast = index === total - 1;

  return (
    <div className="mt-8 rounded-xl border border-[#9474ff]/15 bg-[#9474ff]/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9474ff]/60">
            Step {step} of {total}
          </p>
          {isLast ? (
            <p className="mt-1.5 text-[14px] font-bold text-[#082033]">
              You&apos;re all set! Start building with Orka.
            </p>
          ) : (
            <p className="mt-1.5 text-[14px] font-bold text-[#082033]">
              Next: {sequentialOnboarding[index + 1].title}
            </p>
          )}
        </div>
        {isLast ? (
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9474ff] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#9474ff]/90 hover:shadow-lg hover:shadow-[#9474ff]/20"
          >
            <BookOpen size={14} />
            Back to Docs
          </Link>
        ) : (
          <Link
            href={`/docs/${sequentialOnboarding[index + 1].slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#9474ff] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#9474ff]/90 hover:shadow-lg hover:shadow-[#9474ff]/20"
          >
            {sequentialOnboarding[index + 1].title}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
