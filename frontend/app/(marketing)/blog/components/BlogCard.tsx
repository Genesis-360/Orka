import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import type { BlogPost } from "./types";
import AuthorAvatar from "./AuthorAvatar";

const CAT_COLORS: Record<string, string> = {
  AI: "bg-violet-500",
  Agency: "bg-lime-500",
  Payments: "bg-teal-500",
  Contracts: "bg-orange-500",
  Escrow: "bg-teal-500",
  Guides: "bg-violet-400",
  Productivity: "bg-blue-500",
  "Client Management": "bg-sky-500",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[18px] border-2 border-night bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]"
    >
      <div
        className={`aspect-[3/2] bg-gradient-to-br ${post.coverGradient} p-5 transition-transform duration-500 group-hover:scale-[1.03] relative overflow-hidden`}
      >
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
            <FileText size={20} className="text-violet" />
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-night/8 px-3 py-1 text-2xs font-black uppercase tracking-wider text-night/60">
          <span className={`h-1.5 w-1.5 rounded-full ${CAT_COLORS[post.category] ?? "bg-night/30"}`} />
          {post.category}
        </span>
        <h3 className="text-lg uppercase font-black leading-tight text-night">
          {post.title}
        </h3>
        <p className="mt-2 text-base font-bold leading-5 text-night/55 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <AuthorAvatar
            name={post.author.name}
            initials={post.author.initials}
            sizeClass="size-8"
            sizePx={32}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-night truncate">{post.author.name}</p>
            <div className="mt-0.5 flex items-center gap-2 text-xs font-bold text-night/40">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {fmtDate(post.publishedAt)}
              </span>
              <span className="h-1 w-1 rounded-full bg-night/20" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-night/60 group-hover:text-violet">
          Read Article{" "}
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
