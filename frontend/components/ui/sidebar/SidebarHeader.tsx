"use client";

import Image from "next/image";
import Link from "next/link";

export function SidebarHeader() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5 px-6 py-5 transition-colors hover:bg-white/[0.04]"
      aria-label="ORKA home"
    >
      <Image
        src="/Logo/logo.svg"
        alt="ORKA"
        width={28}
        height={28}
        className="size-7 object-contain"
        priority
      />
      <span className="text-lg font-bold tracking-tight text-white">
        ORKA
      </span>
    </Link>
  );
}
