import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blogs/types";
import AuthorAvatar from "../../components/AuthorAvatar";

export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="display text-2xl uppercase text-night sm:text-3xl">
        You might also like
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-[18px] border-2 border-night bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]"
          >
            <div
              className={`aspect-[16/10] bg-gradient-to-br ${post.coverGradient} p-5 transition-transform duration-500 group-hover:scale-[1.03] relative overflow-hidden`}
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <FileText size={20} className="text-violet" />
                </div>
              )}
            </div>
            <div className="p-5">
              <span className="mb-2 inline-block rounded-full bg-night/5 px-3 py-1 text-2xs font-black uppercase tracking-wider text-night/60">
                {post.category}
              </span>
              <h3 className="display text-lg uppercase leading-tight text-night">
                {post.title}
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <AuthorAvatar
                  name={post.author.name}
                  initials={post.author.initials}
                  sizeClass="size-6"
                  sizePx={24}
                />
                <p className="text-xs font-bold text-night/40">
                  {post.readingTime}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-night/60 group-hover:text-violet">
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
