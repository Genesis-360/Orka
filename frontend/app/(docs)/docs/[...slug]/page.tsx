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

  const renderedContent = renderMDX(source);
  const readingTime = calculateReadingTime(source);

  return (
    <div className="flex min-h-screen flex-col">
      <DocsTopbar breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 gap-0">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
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
