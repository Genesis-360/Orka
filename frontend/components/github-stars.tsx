"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type GithubStarsDisplay = "icon" | "count" | "stars" | "repo";
export type GithubIconVariant = "default" | "mark" | "circle" | "fill" | "mono";
export type GithubStarsVariant =
  | "link"
  | "minimal"
  | "badge"
  | "pill"
  | "ghost"
  | "stat"
  | "outline"
  | "button";

export interface GithubStarsProps {
  repoUrl: string;
  starCount: string;
  repoName?: string;
  display?: GithubStarsDisplay;
  /** @deprecated Use `display="stars"` instead. */
  showCount?: boolean;
  icon?: GithubIconVariant;
  variant?: GithubStarsVariant;
  tooltip?: boolean;
  className?: string;
}

function parseStarCount(value: string): number {
  const trimmed = value.trim().toLowerCase();
  if (trimmed.endsWith("k")) {
    return Math.round(parseFloat(trimmed.slice(0, -1)) * 1000);
  }
  if (trimmed.endsWith("m")) {
    return Math.round(parseFloat(trimmed.slice(0, -1)) * 1_000_000);
  }
  return parseInt(trimmed.replace(/,/g, ""), 10) || 0;
}

export function formatStarCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}m`;
  if (count >= 10_000) return `${Math.round(count / 1000)}k`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toLocaleString();
}

const GithubMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const GithubMono = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function GithubIcon({
  variant = "default",
  className,
}: {
  variant?: GithubIconVariant;
  className?: string;
}) {
  switch (variant) {
    case "mark":
      return <GithubMark className={cn("size-4", className)} />;
    case "mono":
      return <GithubMono className={cn("size-4", className)} />;
    case "circle":
      return (
        <span
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-full bg-muted",
            className,
          )}
        >
          <GithubMono className="size-3.5" />
        </span>
      );
    case "fill":
      return (
        <span
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-md bg-foreground text-background",
            className,
          )}
        >
          <GithubMark className="size-3.5" />
        </span>
      );
    default:
      return <GithubMono className={cn("size-4", className)} />;
  }
}

const variantStyles: Record<
  GithubStarsVariant,
  { root: string; content: string; count?: string }
> = {
  link: {
    root: "inline-flex items-center text-muted-foreground transition-colors hover:text-foreground",
    content: "gap-2 text-sm",
  },
  minimal: {
    root: "inline-flex items-center text-muted-foreground transition-colors hover:text-foreground hover:underline",
    content: "gap-1.5 text-sm",
  },
  badge: {
    root: "inline-flex items-center rounded-md border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted",
    content: "gap-2 px-2.5 py-1 text-xs font-medium",
  },
  pill: {
    root: "inline-flex items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted/60",
    content: "gap-2 px-3 py-1 text-xs font-medium",
  },
  ghost: {
    root: "inline-flex items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
    content: "gap-2 px-2 py-1 text-xs",
  },
  stat: {
    root: "inline-flex items-center text-foreground",
    content: "gap-2 text-xs font-medium",
  },
  outline: {
    root: "inline-flex items-center justify-center rounded-md border border-input bg-background text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground",
    content: "text-xs font-medium",
  },
  button: {
    root: "",
    content: "gap-2 text-xs",
  },
};

const starIconClassName = "size-3 shrink-0 text-primary";

function GithubStarsTooltipContent({ starCount }: { starCount: string }) {
  return (
    <TooltipContent>
      <span className="flex items-center gap-1.5 text-xs font-medium tabular-nums">
        {starCount}
        <Star className="size-3 shrink-0 stroke-[1.5]" />
      </span>
    </TooltipContent>
  );
}

function wrapWithTooltip(anchor: React.ReactElement, starCount: string) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{anchor}</TooltipTrigger>
        <GithubStarsTooltipContent starCount={starCount} />
      </Tooltip>
    </TooltipProvider>
  );
}

function GithubStarsContent({
  mode,
  icon,
  starCount,
  repoName,
  countClassName,
}: {
  mode: GithubStarsDisplay;
  icon: GithubIconVariant;
  starCount: string;
  repoName?: string;
  countClassName?: string;
}) {
  return (
    <>
      <GithubIcon variant={icon} />
      {mode === "count" && (
        <span className={cn("font-medium tabular-nums", countClassName)}>
          {starCount}
        </span>
      )}
      {mode === "repo" && repoName && (
        <>
          <span className="text-muted-foreground">{repoName}</span>
          <span className={cn("font-medium tabular-nums", countClassName)}>
            {starCount}
          </span>
        </>
      )}
      {mode === "stars" && (
        <>
          <span className={cn("font-medium tabular-nums", countClassName)}>
            {starCount}
          </span>
          <Star className={starIconClassName} />
        </>
      )}
    </>
  );
}

function GithubStarsLink({
  repoUrl,
  mode,
  icon,
  starCount,
  repoName,
  variant,
  tooltip = false,
  className,
}: {
  repoUrl: string;
  mode: GithubStarsDisplay;
  icon: GithubIconVariant;
  starCount: string;
  repoName?: string;
  variant: GithubStarsVariant;
  tooltip?: boolean;
  className?: string;
}) {
  const styles = variantStyles[variant];

  const anchor = (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        styles.root,
        styles.content,
        mode === "icon" && variant === "outline" && "size-8 p-0",
        mode !== "icon" && variant === "outline" && "gap-2 px-3 py-1.5",
        className,
      )}
    >
      <GithubStarsContent
        mode={mode}
        icon={icon}
        starCount={starCount}
        repoName={repoName}
        countClassName={styles.count}
      />
    </a>
  );

  if (!tooltip) {
    return anchor;
  }

  return wrapWithTooltip(anchor, starCount);
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

export function GithubStars({
  repoUrl,
  starCount,
  repoName,
  display,
  showCount,
  icon = "default",
  variant = "link",
  tooltip = false,
  className,
}: GithubStarsProps) {
  const mode: GithubStarsDisplay = display ?? (showCount ? "stars" : "icon");

  const content =
    variant === "button" ? (
      <Button
        asChild
        variant="outline"
        size={mode === "icon" ? "icon" : "sm"}
        className={cn(
          mode === "icon" ? "size-8" : "flex items-center gap-2 text-xs",
          className,
        )}
      >
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center",
            mode === "icon" ? "justify-center" : "gap-2",
          )}
        >
          <GithubStarsContent
            mode={mode}
            icon={icon}
            starCount={starCount}
            repoName={repoName}
          />
        </a>
      </Button>
    ) : (
      <GithubStarsLink
        repoUrl={repoUrl}
        mode={mode}
        icon={icon}
        starCount={starCount}
        repoName={repoName}
        variant={variant}
        tooltip={tooltip}
        className={className}
      />
    );

  if (variant === "button" && tooltip) {
    return wrapWithTooltip(
      content as React.ReactElement,
      starCount,
    );
  }

  return content;
}

export function GithubStarsCountUp({
  repoUrl,
  starCount,
  display = "stars",
  variant = "stat",
  duration = 1200,
  className,
}: GithubStarsProps & { duration?: number }) {
  const target = parseStarCount(starCount);
  const count = useCountUp(target, true, duration);

  return (
    <GithubStars
      repoUrl={repoUrl}
      starCount={formatStarCount(count)}
      display={display}
      variant={variant}
      className={className}
    />
  );
}

export function GithubStarsExpand({
  repoUrl,
  starCount,
  className,
}: Pick<GithubStarsProps, "repoUrl" | "starCount" | "className">) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex h-8 items-center overflow-hidden rounded-full border border-border bg-muted/40 text-xs text-foreground transition-all duration-300 hover:bg-muted",
          hovered ? "gap-2 px-3" : "size-8 justify-center px-0",
          className,
        )}
      >
        <GithubMono className="size-4 shrink-0" />
        <span
          className={cn(
            "flex items-center gap-1.5 overflow-hidden whitespace-nowrap transition-all duration-300",
            hovered ? "max-w-24 opacity-100" : "max-w-0 opacity-0",
          )}
        >
            <span className="font-medium tabular-nums">{starCount}</span>
            <Star className={starIconClassName} />
        </span>
      </a>
    </div>
  );
}

export function GithubStarsCountUpHover({
  repoUrl,
  starCount,
  variant = "pill",
  duration = 900,
  className,
}: Pick<GithubStarsProps, "repoUrl" | "starCount" | "variant" | "className"> & {
  duration?: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  const target = parseStarCount(starCount);
  const count = useCountUp(target, hovered, duration);

  return (
    <div
      className="inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GithubStars
        repoUrl={repoUrl}
        starCount={hovered ? formatStarCount(count) : starCount}
        display={hovered ? "stars" : "icon"}
        variant={variant}
        className={className}
      />
    </div>
  );
}
