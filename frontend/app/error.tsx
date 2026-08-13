"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ORKA] unhandled error:", error);
  }, [error]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-night px-6 text-white">
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-coral/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-violet/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="ORKA home">
            <Image src="/Logo/logo.svg" alt="" width={30} height={30} className="size-7" />
            <span className="text-lg font-bold tracking-[-0.04em]">ORKA</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <span className="display text-[6.5rem] uppercase leading-none text-white sm:text-[8rem]">
            5
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="display text-[6.5rem] uppercase leading-none text-coral sm:text-[8rem]"
          >
            0
          </motion.span>
          <span className="display text-[6.5rem] uppercase leading-none text-white sm:text-[8rem]">
            0
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-coral"
        >
          {error.digest ? `error_${error.digest}` : "system_error · unexpected"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.31, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="display mt-4 text-3xl uppercase leading-tight sm:text-4xl"
        >
          The chain hit a snag.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.37, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-4 max-w-md text-sm font-bold leading-6 text-white/60"
        >
          Something went wrong on our side — it&apos;s not you. Try again, or
          tell us about it on Discord so we can fix it fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.43, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-black uppercase text-night transition hover:bg-orange"
          >
            <RefreshCw size={15} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Back to ORKA
          </Link>
          <a
            href="https://discord.gg/KbW5pPCDyY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-violet/60 bg-violet/10 px-6 py-3 text-sm font-black uppercase text-violet transition hover:bg-violet/20"
          >
            <MessageSquare size={15} />
            Join Discord
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}