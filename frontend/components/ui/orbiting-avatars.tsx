"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Styles = () => {
  const css = `
    @keyframes orbit {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes counter-orbit {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    .animate-orbit {
      animation: orbit var(--orbit-duration) linear infinite;
    }
    .animate-counter-orbit {
      animation: counter-orbit var(--orbit-duration) linear infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `
  return <style>{css}</style>
}

interface Avatar {
  src: string
  alt: string
}

export interface OrbitingAvatarsCTAProps {
  title: React.ReactNode
  description: React.ReactNode
  buttonText: React.ReactNode
  buttonProps?: React.ComponentPropsWithoutRef<typeof Button>
  secondaryButtonText?: React.ReactNode
  secondaryButtonProps?: React.ComponentPropsWithoutRef<typeof Button>
  avatars: Avatar[]
  className?: string
  orbitRadius?: number
  orbitDuration?: number
}

export const OrbitingAvatarsCTA = ({
  title,
  description,
  buttonText,
  buttonProps,
  secondaryButtonText,
  secondaryButtonProps,
  avatars,
  className,
  orbitRadius = 20,
  orbitDuration = 40,
}: OrbitingAvatarsCTAProps) => {
  const radiusInPx = orbitRadius * 16

  return (
    <>
      <Styles />
      <section
        className={cn(
          "relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg bg-background",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/40" />
          <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="max-w-md text-muted-foreground">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" {...buttonProps}>
              {buttonText}
            </Button>
            {secondaryButtonText && (
              <Button size="lg" variant="outline" {...secondaryButtonProps}>
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 z-0 animate-orbit"
          style={
            { "--orbit-duration": `${orbitDuration}s` } as React.CSSProperties
          }
        >
          {avatars.map((avatar, i) => {
            const angle = (i / avatars.length) * 2 * Math.PI
            const x = Math.cos(angle) * radiusInPx
            const y = Math.sin(angle) * radiusInPx

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div
                  className="relative h-14 w-14 animate-float"
                  style={{ animationDelay: `-${i * 0.8}s` }}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-full w-full animate-counter-orbit rounded-full object-cover shadow-md"
                    style={
                      {
                        "--orbit-duration": `${orbitDuration}s`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
