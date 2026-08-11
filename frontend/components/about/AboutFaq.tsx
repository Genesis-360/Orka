import { Plus } from "lucide-react";
import { aboutFaqs } from "@/lib/content";

export default function AboutFaq() {
  return (
    <section className="px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="text-center lg:top-10 lg:self-start lg:text-left">
          <p className="section-label text-violet">About ORKA</p>
          <h2 className="display mt-3 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Questions
            <br />
            we get asked.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Straight answers about where ORKA is today, what we&apos;re
            building, and what our early community is already doing with it.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-border/60">
          {aboutFaqs.map(([question, answer]) => (
            <details key={question} className="group py-6 open:pb-8">
              <summary className="flex cursor-pointer items-start gap-4">
                <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-all duration-500 group-open:rotate-45 group-open:bg-violet">
                  <Plus size={24} className="transition-transform duration-200 group-hover:scale-110" />
                </span>
                <span className="display text-[22px] font-normal uppercase leading-7.5 text-foreground transition-colors duration-300 group-open:text-violet sm:text-[28px] sm:leading-9.75">
                  {question}
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-[18px] sm:leading-7">
                    {answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}