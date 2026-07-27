"use client";

import DocsToc, { TocItem } from "./DocsToc";

interface DocsRightSidebarProps {
  headings: TocItem[];
  slug: string;
}

export default function DocsRightSidebar({ headings, slug }: DocsRightSidebarProps) {
  return (
    <div className="hidden w-[300px] shrink-0 self-stretch lg:block">
      <div className="sticky top-[96px] space-y-8 py-8">
        <DocsToc headings={headings} />
      </div>
    </div>
  );
}
