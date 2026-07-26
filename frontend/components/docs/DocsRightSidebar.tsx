"use client";

import DocsToc, { TocItem } from "./DocsToc";
import Feedback from "./Feedback";

interface DocsRightSidebarProps {
  headings: TocItem[];
  slug: string;
}

export default function DocsRightSidebar({ headings, slug }: DocsRightSidebarProps) {
  return (
    <div className="hidden w-[300px] shrink-0 self-stretch lg:block">
      <div className="sticky top-[96px]">
        <DocsToc headings={headings} />
        <div className="mt-6 border-t border-night/10 pt-4">
          <Feedback slug={slug} />
        </div>
      </div>
    </div>
  );
}
