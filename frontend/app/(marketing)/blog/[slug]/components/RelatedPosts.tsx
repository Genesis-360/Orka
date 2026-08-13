import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blogs/types";
import AuthorAvatar from "../../components/AuthorAvatar";

export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="display text-2xl uppercase text-night sm:text-3xl">
          You might also like
        </h2>
        <Link
          href="/blog"
          className="hidden items-center gap-1.5 text-sm font-black text-night/50 transition-colors hover:text-violet sm:inline-flex"
        >
          View all posts <ArrowRight size={14} />
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border border-night/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-night/20 hover:shadow-[0_20px_50px_-14px_rgba(0,0,0,0.14)]"
          >
            <div
              className={`relative aspect-[3/2] overflow-hidden bg-gradient-to-br ${post.coverGradient}`}
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <FileText size={20} className="text-violet" />
                </div>
              )}
              <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2.5 py-1 text-2xs font-black uppercase tracking-wider text-white backdrop-blur-sm">
                {post.category}
              </span>
            </div>
            <div className="flex flex-col p-5">
              <h3 className="display text-lg uppercase leading-tight text-night transition-colors group-hover:text-violet line-clamp-2">
                {post.title}
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <AuthorAvatar
                  name={post.author.name}
                  initials={post.author.initials}
                  sizeClass="size-6"
                  sizePx={24}
                />
                <p className="min-w-0 flex-1 truncate text-xs font-bold text-night/60">
                  {post.author.name}
                </p>
                <p className="shrink-0 text-xs font-bold text-night/40">
                  {post.readingTime}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 border-t border-night/5 pt-3 text-sm font-black text-night/60 transition-colors group-hover:text-violet">
                Read Article{" "}
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
