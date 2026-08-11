import Image from "next/image";
import { authorImageFor } from "@/lib/blog-data";

export default function AuthorAvatar({
  name,
  initials,
  sizeClass = "size-8",
  sizePx = 32,
}: {
  name: string;
  initials: string;
  sizeClass?: string;
  sizePx?: number;
}) {
  const src = authorImageFor(name);

  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full ${
        src ? "" : "bg-night/10 text-xs font-black text-night/60"
      } ${sizeClass}`}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={sizePx}
          height={sizePx}
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </span>
  );
}