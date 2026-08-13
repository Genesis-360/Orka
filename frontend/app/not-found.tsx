"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MessageSquare } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-night px-6 text-white">
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-violet/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-orange/8 blur-3xl"
        aria-hidden="true"
      />

      <Image
        src="/Elements/star-violet.svg"
        alt=""
        aria-hidden
        width={40}
        height={40}
        className="pointer-events-none absolute right-[14%] top-[16%] hidden w-8 object-contain md:block lg:w-10 float-1"
      />
      <Image
        src="/Elements/plus-teal.svg"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="pointer-events-none absolute left-[12%] top-[26%] hidden w-7 object-contain md:block lg:w-9 float-2"
      />
      <Image
        src="/Elements/asterisk-orange.svg"
        alt=""
        aria-hidden
        width={30}
        height={30}
        className="pointer-events-none absolute right-[10%] top-[48%] hidden w-6 object-contain lg:block float-5"
      />
      <Image
        src="/Elements/star-blue.svg"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="pointer-events-none absolute bottom-[22%] left-[8%] hidden w-6 object-contain opacity-60 sm:block float-3"
      />
      <Image
        src="/Elements/plus-lime.svg"
        alt=""
        aria-hidden
        width={32}
        height={32}
        className="pointer-events-none absolute bottom-[30%] right-[16%] hidden w-7 object-contain opacity-60 sm:block float-4"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="ORKA home">
            <Image src="/Logo/logo.svg" alt="" width={30} height={30} className="size-7" />
            <span className="text-lg font-bold tracking-[-0.04em]">ORKA</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <span className="display text-[7rem] uppercase leading-none text-white sm:text-[9rem]">
            4
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block size-[5.5rem] rounded-full border-[10px] border-violet sm:size-[7rem]"
          />
          <span className="display text-[7rem] uppercase leading-none text-white sm:text-[9rem]">
            4
          </span>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-violet"
        >
          milestone_404 · route_not_found
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.26 }}
          className="display mt-4 text-3xl uppercase leading-tight sm:text-4xl"
        >
          This milestone does not exist.
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.32 }}
          className="mx-auto mt-4 max-w-md text-sm font-bold leading-6 text-white/60"
        >
          The ORKA route you opened isn&apos;t on this network. Head back to the
          landing page, explore the docs, or come say hi on Discord.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-black uppercase text-night transition hover:bg-orange"
          >
            Back to ORKA
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase text-white transition hover:border-white/40 hover:bg-white/5"
          >
            <BookOpen size={15} />
            Read the docs
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