"use client"

import { IconCloud } from "@/components/ui/icon-cloud"
import { GitPullRequestArrow, Star } from "lucide-react"

const GITHUB_URL = "https://github.com/x0lg0n/Orka"

const techIcons = [
  "https://cdn.simpleicons.org/nextdotjs/eee",
  "https://cdn.simpleicons.org/react/61DAFB",
  "https://cdn.simpleicons.org/typescript/3178C6",
  "https://cdn.simpleicons.org/rust/DEA584",
  "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "https://cdn.simpleicons.org/supabase/3ECF8E",
  "https://cdn.simpleicons.org/nodedotjs/339933",
  "https://cdn.simpleicons.org/pnpm/F69220",
  "https://cdn.simpleicons.org/git/F05032",
  "https://cdn.simpleicons.org/docker/2496ED",
  "https://cdn.simpleicons.org/postgresql/4169E1",
  "https://cdn.simpleicons.org/redis/DC382D",
  "https://cdn.simpleicons.org/nginx/009639",
  "https://cdn.simpleicons.org/githubactions/2088FF",
  "https://cdn.simpleicons.org/visualstudiocode/007ACC",
  "https://cdn.simpleicons.org/eslint/4B32C3",
]

export default function OpenSource() {
  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-violet/20 bg-night lg:rounded-[36px]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:gap-14 md:px-14 md:py-20 lg:px-20">
          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <p className="section-label text-violet">Open Source</p>
            <h2 className="display mt-2 text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Help build ORKA.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-normal leading-7 text-white/60 sm:text-[18px] md:mx-0">
              ORKA is open source and community-driven. We welcome developers,
              designers, and writers to contribute — whether it&rsquo;s code,
              docs, ideas, or feedback. Every contribution makes ORKA better
              for everyone.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  window.open(GITHUB_URL, "_blank", "noopener,noreferrer")
                }
                className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-violet px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet/80"
              >
                <GitPullRequestArrow size={16} />
                Start contributing
              </button>
              <button
                onClick={() =>
                  window.open(GITHUB_URL, "_blank", "noopener,noreferrer")
                }
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/60 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                <Star size={16} />
                Star on GitHub
              </button>
            </div>
          </div>

          {/* ── Right: Icon Cloud ── */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <IconCloud images={techIcons} showControl={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
