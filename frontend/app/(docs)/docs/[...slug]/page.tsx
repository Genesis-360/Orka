import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import {
  getAllDocSlugs,
  getDocBySlug,
  getParentSlug,
  getBreadcrumbPath,
} from "@/lib/docs/config";
import { renderMDX } from "@/lib/docs/mdx";
import DocsTopbar from "@/components/docs/DocsTopbar";
import DocsRightSidebar from "@/components/docs/DocsRightSidebar";
import PrevNextNav from "@/components/docs/PrevNextNav";
import CompletionSection from "@/components/docs/CompletionSection";
import RelatedArticles from "@/components/docs/RelatedArticles";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug: slug.split("/") }));
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(source: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "bg-[#22bd93]/10 text-[#22bd93]",
    Intermediate: "bg-[#3b82f6]/10 text-[#3b82f6]",
    Advanced: "bg-[#ff8a22]/10 text-[#ff8a22]",
    Mixed: "bg-[#9474ff]/10 text-[#9474ff]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colors[level] || colors.Beginner}`}>
      {level}
    </span>
  );
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
  const doc = getDocBySlug(slugPath);

  if (!doc) {
    notFound();
  }

  const docsDir = path.join(process.cwd(), "content/docs");
  
  let filePath = path.join(docsDir, `${slugPath}.mdx`);
  
  const parentSlug = getParentSlug(slugPath);
  if (!fs.existsSync(filePath) && parentSlug) {
    filePath = path.join(docsDir, `${slugPath}/overview.mdx`);
  }

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  const source = content || "";
  const headings = extractHeadings(source);
  const breadcrumbs = getBreadcrumbPath(slugPath);

  const readingTime = (data as any).readingTime || calculateReadingTime(source);
  const difficulty = (data as any).difficulty;
  const estimatedSetup = (data as any).estimatedSetup;
  const title = (data as any).title;

  const renderedContent = renderMDX(source);

  const titleId = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "";

  return (
    <div className="flex flex-col">
      <DocsTopbar breadcrumbs={breadcrumbs} />

      <div className="flex flex-1">
        <div className="flex-1 min-w-0 bg-[#fffaf2]">
          <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
            <div className="mb-6 flex items-center gap-3">
              {difficulty && <DifficultyBadge level={difficulty} />}
              <span className="text-[12px] font-medium text-[#5f6b86]">
                {readingTime} min read
              </span>
              {estimatedSetup && (
                <span className="text-[12px] text-[#5f6b86]/60">
                  · Setup: {estimatedSetup}
                </span>
              )}
            </div>

            {title && (
              <h1 id={titleId} className="mb-8 text-[2rem] font-black leading-tight tracking-tight text-[#082033] sm:text-[2.5rem]">
                {title}
              </h1>
            )}

            <article className="docs-content">
              {renderedContent}
            </article>

            <CompletionSection slug={slugPath} />

            <div className="mt-10 border-t border-black/[0.06] pt-6">
              <PrevNextNav slug={slugPath} />
            </div>

            <RelatedArticles slug={slugPath} />
          </div>
        </div>

        <DocsRightSidebar headings={headings} slug={slugPath} />
      </div>
    </div>
  );
}
