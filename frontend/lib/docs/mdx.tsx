import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Callout } from "@/components/docs/Callout";

const mdxComponents = {
  Callout,
  h1: ({ children, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className="mb-4 text-[2rem] font-black leading-tight tracking-tight text-[#082033] sm:text-[2.5rem]"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => {
    const text = typeof children === "string" ? children : "";
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return (
      <h2
        id={id}
        className="mb-4 mt-12 text-[1.5rem] font-black leading-tight text-[#082033] first:mt-0"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.ComponentProps<"h3">) => {
    const text = typeof children === "string" ? children : "";
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return (
      <h3
        id={id}
        className="mb-3 mt-8 text-[1.25rem] font-bold text-[#082033]"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: React.ComponentProps<"h4">) => {
    const text = typeof children === "string" ? children : "";
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return (
      <h4
        id={id}
        className="mb-2 mt-6 text-[1.1rem] font-bold text-[#082033]"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }: React.ComponentProps<"p">) => (
    <p className="mb-4 text-[15px] leading-7 text-[#082033]/80" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
    <ul className="mb-4 list-disc pl-6 space-y-2 text-[15px] leading-7 text-[#082033]/80" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
    <ol className="mb-4 list-decimal pl-6 space-y-2 text-[15px] leading-7 text-[#082033]/80" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentProps<"li">) => (
    <li className="font-medium" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-black/[0.06]">
      <table className="w-full border-collapse text-left text-[14px]" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.ComponentProps<"th">) => (
    <th className="border-b border-black/[0.06] bg-[#f7f8fc] px-4 py-3 text-[12px] font-bold uppercase text-[#5f6b86]" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.ComponentProps<"td">) => (
    <td className="border-b border-black/[0.06] px-4 py-3 text-[14px] font-medium text-[#082033]" {...props}>
      {children}
    </td>
  ),
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-[#082033] p-5 text-[13px] leading-6 text-white/90 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: React.ComponentProps<"code">) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="rounded-md bg-[#9474ff]/10 px-1.5 py-0.5 text-[13px] font-bold text-[#9474ff]" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-4 border-[#9474ff] bg-[#9474ff]/[0.04] py-3 pl-4 text-[#082033]/70 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }: React.ComponentProps<"a">) => (
    <a
      href={href}
      className="font-medium text-[#9474ff] underline decoration-[#9474ff]/30 underline-offset-2 transition-colors hover:decoration-[#9474ff]"
      {...props}
    >
      {children}
    </a>
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-8 border-t border-black/[0.06]" {...props} />
  ),
  strong: ({ children, ...props }: React.ComponentProps<"strong">) => (
    <strong className="font-bold text-[#082033]" {...props}>
      {children}
    </strong>
  ),
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  });
  return content;
}
