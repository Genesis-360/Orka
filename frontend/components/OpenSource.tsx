"use client"

import { OrbitingAvatarsCTA } from "@/components/ui/orbiting-avatars"
import { GitPullRequestArrow, Star } from "lucide-react"

const avatars = [
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&q=80", alt: "Contributor" },
  { src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&q=80", alt: "Contributor" },
  { src: "https://images.unsplash.com/photo-1500649297466-74794c70acfc?w=96&q=80", alt: "Contributor" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80", alt: "Contributor" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=96&q=80", alt: "Contributor" },
  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80", alt: "Contributor" },
]

const GITHUB_URL = "https://github.com/x0lg0n/Orka"

export default function OpenSource() {
  return (
    <section className="px-4 py-16 md:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-border bg-card lg:rounded-[36px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,32,51,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,32,51,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        <OrbitingAvatarsCTA
          className="!h-auto min-h-[70vh] border-none rounded-none bg-transparent py-20"
          title={
            <span className="flex flex-col items-center gap-2">
              <span className="section-label text-lime">Open Source</span>
              <span className="display mt-2 text-4xl uppercase text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Help build ORKA.
              </span>
            </span>
          }
          description="ORKA is open source and community-driven. We welcome developers, designers, and writers to contribute — whether it&rsquo;s code, docs, ideas, or feedback."
          buttonText={
            <span className="inline-flex items-center gap-2">
              <GitPullRequestArrow size={16} />
              Start contributing
            </span>
          }
          buttonProps={{
            onClick: () => window.open(GITHUB_URL, "_blank", "noopener,noreferrer"),
          }}
          secondaryButtonText={
            <span className="inline-flex items-center gap-2">
              <Star size={16} />
              Star on GitHub
            </span>
          }
          secondaryButtonProps={{
            onClick: () => window.open(GITHUB_URL, "_blank", "noopener,noreferrer"),
          }}
          avatars={avatars}
          orbitRadius={18}
          orbitDuration={45}
        />
      </div>
    </section>
  )
}
