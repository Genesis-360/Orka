import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getAllSlugs } from "@/lib/blogs";

const BASE_URL = "https://orka.app";

function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && (e.name.endsWith(".mdx") || e.name.endsWith(".md")))
      out.push(full);
  }
  return out;
}

function docUrls(): string[] {
  const docsDir = path.join(process.cwd(), "content/docs");
  const urls: string[] = [];
  for (const file of walk(docsDir)) {
    const rel = path.relative(docsDir, file);
    const parts = rel.split(path.sep);
    const section = parts[0];
    let slug = parts[parts.length - 1].replace(/\.mdx?$/, "");
    if (slug === "overview") slug = parts[parts.length - 2];
    urls.push(`/docs/${section}/${slug}`);
  }
  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/pricing",
    "/blog",
    "/contact",
    "/changelog",
    "/docs",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const docEntries: MetadataRoute.Sitemap = docUrls().map((u) => ({
    url: `${BASE_URL}${u}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries, ...docEntries];
}
