import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import type { BlogPost } from "@/app/(marketing)/blog/components/types";
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

export default function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[20px] border-2 border-night bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]"
    >
      <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
        {/* Image */}
        <div
          className={`aspect-[3/2] bg-gradient-to-br ${post.coverGradient} p-8 transition-transform duration-500 group-hover:scale-[1.02] relative overflow-hidden`}
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
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/80 shadow-sm">
              <FileText size={24} className="text-violet" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 md:p-8">
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-night/8 px-3 py-1 text-xs font-black uppercase tracking-wider text-night/60">
            <span className={`h-1.5 w-1.5 rounded-full ${CAT_COLORS[post.category] ?? "bg-night/30"}`} />
            {post.category}
          </span>
          <h2 className="display text-2xl uppercase text-night sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-md font-bold leading-6 text-night/60">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <AuthorAvatar
              name={post.author.name}
              initials={post.author.initials}
              sizeClass="size-8"
              sizePx={32}
            />
            <div>
              <p className="text-base font-bold text-night">
                {post.author.name}
              </p>
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
          <span className="mt-5 inline-flex items-center gap-1.5 text-base font-black text-night/60 group-hover:text-violet">
            Read Article{" "}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
