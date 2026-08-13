import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { docsNavigation } from "./config";

export interface DocSearchEntry {
  id: string;
  title: string;
  category: string;
  sectionSlug: string;
  description: string;
  content: string;
  url: string;
  tags: string[];
}

const docsDir = path.join(process.cwd(), "content/docs");
const MAX_CONTENT_CHARS = 9000;

function stripMarkdown(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[A-Za-z][^>]*>/g, " ")
    .replace(/`([^`]*)`/g, " $1 ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, " $1 ")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/^[-*+]\s+/gm, " ")
    .replace(/^\d+\.\s+/gm, " ")
    .replace(/[|>]{1,}/g, " ")
    .replace(/[*_~-]{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveDocFile(sectionSlug: string, slug: string): string | null {
  const direct = path.join(docsDir, sectionSlug, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const overview = path.join(docsDir, sectionSlug, `${slug}/overview.mdx`);
  if (fs.existsSync(overview)) return overview;
  return null;
}

export function buildSearchIndex(): DocSearchEntry[] {
  const entries: DocSearchEntry[] = [];

  for (const section of docsNavigation) {
    for (const item of section.items) {
      const filePath = resolveDocFile(section.slug, item.slug);
      if (!filePath) continue;

      const raw = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(raw);
      const stripped = stripMarkdown(content || "");

      const title = (data as { title?: string }).title || item.title;
      const description =
        (data as { description?: string }).description || item.description || "";
      const tags = (data as { tags?: string[] }).tags || item.tags || [];

      const url = `/docs/${section.slug}/${item.slug}`;

      entries.push({
        id: url,
        title,
        category: section.title,
        sectionSlug: section.slug,
        description,
        content: stripped.slice(0, MAX_CONTENT_CHARS),
        url,
        tags,
      });
    }
  }

  return entries;
}