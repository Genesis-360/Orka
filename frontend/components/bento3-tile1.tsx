"use client";

import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({
  to,
  duration = 1.2,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(latest);
      },
    });

    return () => controls.stop();
  }, [count, duration, to]);

  return (
    <span>
      {prefix}
      {Math.round(display)}
      {suffix}
    </span>
  );
}

const inactiveFill = "color-mix(in oklab, var(--chart-1) 25%, transparent)";
const activeFill = "var(--chart-1)";

const staticRingBefore = [
  "m444.12 194.72c4.19-0.74 8.2 2.06 8.74 6.27 0.54 4.22-2.64 7.93-6.88 8.27l-42.24 3.4c-2.8 0.23-5.25-1.87-5.6-4.66-0.36-2.79 1.48-5.43 4.25-5.92z",
  "m437.1 168.52c4-1.45 8.43 0.6 9.69 4.66 1.27 4.06-1.22 8.27-5.33 9.34l-41.01 10.68c-2.72 0.71-5.49-0.93-6.33-3.61-0.84-2.69 0.51-5.61 3.16-6.57z",
  "m425.64 143.94c3.68-2.13 8.4-0.87 10.35 2.91 1.95 3.77 0.24 8.35-3.63 10.12l-38.53 17.64c-2.56 1.17-5.57 0.04-6.86-2.46-1.29-2.5-0.47-5.62 1.97-7.02z",
  "m410.08 121.72c3.26-2.73 8.13-2.32 10.7 1.06 2.58 3.39 1.68 8.19-1.82 10.6l-34.88 24.07c-2.31 1.59-5.48 1-7.18-1.23-1.71-2.24-1.44-5.45 0.72-7.26z",
  "m390.9 102.54c2.73-3.25 7.6-3.69 10.72-0.81 3.13 2.88 3.08 7.77 0.06 10.75l-30.18 29.76c-2 1.97-5.22 1.94-7.29 0.03-2.07-1.9-2.36-5.11-0.55-7.27z",
  "m368.68 86.98c2.13-3.68 6.84-4.95 10.42-2.66 3.58 2.3 4.38 7.12 1.92 10.58l-24.55 34.55c-1.63 2.29-4.8 2.82-7.17 1.3-2.37-1.52-3.21-4.63-1.81-7.07z",
  "m344.1 75.52c1.45-3.99 5.88-6.07 9.8-4.43 3.92 1.64 5.55 6.25 3.72 10.09l-18.17 38.28c-1.21 2.54-4.25 3.61-6.84 2.53-2.6-1.09-3.97-4-3-6.65z",
  "m317.9 68.5c0.74-4.18 4.73-7 8.88-6.06 4.15 0.93 6.55 5.19 5.42 9.28l-11.25 40.86c-0.75 2.71-3.55 4.29-6.3 3.67-2.74-0.61-4.6-3.25-4.11-6.02z",
  "m290.88 66.14c0-4.25 3.45-7.72 7.69-7.52 4.25 0.2 7.35 3.98 6.95 8.21l-3.98 42.19c-0.27 2.8-2.76 4.84-5.57 4.71-2.81-0.13-5.09-2.4-5.09-5.22z",
  "m263.86 68.5c-0.74-4.18 2.05-8.2 6.27-8.74 4.22-0.54 7.93 2.64 8.27 6.88l3.4 42.24c0.22 2.8-1.87 5.25-4.66 5.6-2.79 0.36-5.44-1.48-5.92-4.25z",
  "m237.66 75.52c-1.45-3.99 0.6-8.43 4.66-9.69 4.06-1.27 8.26 1.22 9.34 5.33l10.68 41.01c0.71 2.72-0.93 5.49-3.62 6.33-2.68 0.84-5.6-0.51-6.57-3.16z",
  "m213.08 86.98c-2.13-3.68-0.88-8.4 2.9-10.35 3.78-1.95 8.35-0.23 10.12 3.63l17.64 38.53c1.17 2.56 0.04 5.57-2.46 6.86-2.5 1.29-5.61 0.47-7.02-1.97z",
  "m190.86 102.54c-2.74-3.25-2.32-8.12 1.06-10.7 3.38-2.57 8.18-1.68 10.6 1.82l24.06 34.88c1.6 2.32 1.01 5.48-1.23 7.18-2.24 1.71-5.45 1.44-7.25-0.72z",
] as const;

const staticRingAfter =
  "m446.49 221.74c4.25 0 7.71 3.45 7.51 7.69-0.2 4.25-3.97 7.36-8.2 6.96l-42.19-3.99c-2.81-0.27-4.85-2.75-4.72-5.56 0.13-2.81 2.4-5.1 5.22-5.1z";

type BeamLineProps = {
  id: string;
  d: string;
  delay: number;
};

const beamDuration = 2.35;
const beamRepeatDelay = 1.2;
const SEGMENTS = 20;
const SEGMENT_SPACING = 0.008;

function BeamLine({ id, d, delay }: BeamLineProps) {
  const motionId = `${id}-motion-0`;
  const begin = `${delay}s; ${motionId}.end+${beamRepeatDelay}s`;

  return (
    <>
      <path
        d={d}
        className="fill-none stroke-foreground/20 [stroke-dasharray:4_4]"
        strokeWidth="0.5"
      />

      {Array.from({ length: SEGMENTS }).map((_, i) => {
        const t = i / (SEGMENTS - 1);
        const opacity = Math.pow(t, 2.2);
        const segDelay = SEGMENT_SPACING * (SEGMENTS - 1 - i);
        const segMotionId = `${id}-motion-${i}`;
        const segBegin =
          i === 0
            ? begin
            : `${delay + segDelay}s; ${motionId}.end+${beamRepeatDelay + segDelay}s`;

        return (
          <g key={i} opacity="0">
            <rect
              x="-3"
              y="-1"
              width="6"
              height="2"
              rx="1"
              className="fill-chart-2"
              fillOpacity={opacity}
            />
            <animateMotion
              id={segMotionId}
              dur={`${beamDuration}s`}
              begin={segBegin}
              fill="remove"
              path={d}
              rotate="auto"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.05;0.95;1"
              dur={`${beamDuration}s`}
              begin={segBegin}
              fill="remove"
            />
          </g>
        );
      })}

      <g opacity="0">
        <rect x="-4" y="-1.5" width="8" height="3" rx="1.5" className="fill-background" />
        <animateMotion
          id={motionId}
          dur={`${beamDuration}s`}
          begin={begin}
          fill="remove"
          path={d}
          rotate="auto"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.05;0.95;1"
          dur={`${beamDuration}s`}
          begin={begin}
          fill="remove"
        />
      </g>
    </>
  );
}


const activeParts = [
  {
    id: "countup-part-1",
    d: "m137.64 248.76c-4.19 0.74-8.2-2.05-8.74-6.27-0.54-4.21 2.64-7.93 6.87-8.27l42.24-3.4c2.81-0.22 5.25 1.87 5.61 4.66 0.36 2.79-1.48 5.44-4.25 5.93z",
  },
  {
    id: "countup-part-2",
    d: "m135.27 221.74c-4.25 0-7.71-3.44-7.51-7.69 0.2-4.25 3.97-7.35 8.2-6.95l42.19 3.99c2.8 0.26 4.85 2.75 4.72 5.56-0.14 2.81-2.41 5.09-5.22 5.09z",
  },
  {
    id: "countup-part-3",
    d: "m137.64 194.72c-4.19-0.74-7-4.73-6.07-8.88 0.94-4.14 5.19-6.55 9.29-5.42l40.86 11.25c2.71 0.75 4.29 3.55 3.67 6.3-0.62 2.75-3.25 4.6-6.02 4.11z",
  },
  {
    id: "countup-part-4",
    d: "m144.66 168.52c-4-1.45-6.07-5.88-4.43-9.8 1.64-3.92 6.24-5.54 10.08-3.72l38.29 18.18c2.54 1.2 3.61 4.24 2.52 6.83-1.08 2.6-4 3.97-6.64 3.01z",
  },
  {
    id: "countup-part-5",
    d: "m156.12 143.94c-3.68-2.13-4.96-6.84-2.66-10.42 2.29-3.58 7.12-4.38 10.58-1.92l34.54 24.55c2.3 1.63 2.82 4.81 1.3 7.17-1.52 2.37-4.62 3.21-7.06 1.81z",
  },
  {
    id: "countup-part-6",
    d: "m171.68 121.72c-3.26-2.73-3.7-7.6-0.81-10.72 2.88-3.12 7.76-3.08 10.75-0.05l29.75 30.17c1.98 2 1.95 5.22 0.04 7.29-1.91 2.07-5.11 2.36-7.27 0.55z",
  },
];

type RingSegment = {
  id: string;
  d: string;
};

// Progress fills clockwise from the left arc (bottom-left → up → over top → right).
const ringSegmentsInFillOrder: RingSegment[] = [
  ...activeParts.map((part) => ({
    id: part.id,
    d: part.d,
  })),
  ...[...staticRingBefore].reverse().map((d, index) => ({
    id: `ring-static-${index}`,
    d,
  })),
  {
    id: "ring-static-after",
    d: staticRingAfter,
  },
];

export function Bento3Tile1({
  percentage = 30,
  label = "Accessibility rate",
  suffix = "%",
}: {
  percentage?: number;
  label?: string;
  suffix?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const filledSegments = useMemo(
    () => Math.max(1, Math.round((percentage / 100) * ringSegmentsInFillOrder.length)),
    [percentage],
  );

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <svg
        viewBox="0 0 560 408"
        width="560"
        height="408"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id="bento3-countup-clip-1">
            <path d="m268.88 334.42h50.56v34.87h-50.56z" />
          </clipPath>

          <filter
            id="bento3-countup-beam-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <BeamLine
          id="bento3-countup-beam-right"
          delay={0}
          d="m434.92 147.41h53.6c11.6 0 21 9.4 21 21v124.42c0 11.6-9.4 21-21 21h-86.24c-10.5 0-19.01 8.52-19.01 19.02 0 10.49-8.51 19.01-19.01 19.01h-57.47"
        />

        <BeamLine
          id="bento3-countup-beam-left"
          delay={1.1}
          d="m157.24 135.32h-69.77c-11.59 0-21 9.4-21 21v136.51c0 11.6 9.41 21 21 21h86.24c10.5 0 19.02 8.52 19.02 19.01 0 10.5 8.51 19.02 19.01 19.02h57.46"
        />

        {ringSegmentsInFillOrder.map((segment, index) => {
          const isFilled = index < filledSegments;

          return (
            <motion.path
              key={segment.id}
              d={segment.d}
              initial={{ fill: inactiveFill, scale: 1 }}
              animate={
                isInView
                  ? isFilled
                    ? { fill: activeFill, scale: [1, 1.04, 1] }
                    : { fill: inactiveFill, scale: 1 }
                  : { fill: inactiveFill, scale: 1 }
              }
              transition={{
                fill: {
                  duration: 0.22,
                  delay: isFilled ? index * 0.16 : 0,
                  ease: "easeOut",
                },
                scale: {
                  duration: 0.28,
                  delay: isFilled ? index * 0.16 : 0,
                  ease: "easeOut",
                },
              }}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
          );
        })}

        <g>
          <path
            className="fill-muted/50"
            d="m263.37 325.86h61.02c1.93 0 3.49 1.56 3.49 3.48v45.03c0 1.92-1.56 3.49-3.49 3.49h-61.02c-1.93 0-3.49-1.57-3.49-3.49v-45.03c0-1.92 1.56-3.48 3.49-3.48z"
          />
          <path
            className="fill-none stroke-border/50"
            strokeWidth="0.4"
            d="m263.37 326.07h61.02c1.81 0 3.27 1.47 3.27 3.27v45.03c0 1.8-1.46 3.27-3.27 3.27h-61.02c-1.81 0-3.27-1.47-3.27-3.27v-45.03c0-1.8 1.46-3.27 3.27-3.27z"
          />
          <g clipPath="url(#bento3-countup-clip-1)">
            <path
              className="fill-foreground"
              d="m290.38 334.42c4.26 0 7.71 3.38 7.72 7.54q-0.01 0.35-0.03 0.7h6.5c6.32 0 8.8 8.01 3.54 11.44l-6.88 4.48c-1.48 0.97-1.07 3.19 0.66 3.6 0.56 0.13 1.16 0.02 1.64-0.3l3.99-2.88q0.23-0.17 0.52-0.17h10.96c0.43 0 0.61 0.55 0.25 0.79l-11.6 8.05c-2.16 1.47-4.88 1.97-7.45 1.37-7.85-1.84-9.7-11.95-2.97-16.33l4.59-2.99h-11.55c-1.29 0-2.52-0.31-3.59-0.86 1.14 0.78 3.98 1.63 6.37 1.8 0.21 0 0.56 0.18 0.14 0.6l-14.46 14.29q-0.27 0.25-0.63 0.25h-8.78c-0.39 0-0.59-0.47-0.31-0.74l16.89-16.65c-2.08-1.37-3.45-3.7-3.45-6.34 0-4.22 3.5-7.65 7.82-7.65zm0.16 5.88c-1 0-1.81 0.53-1.81 1.18 0 0.54 0.55 0.99 1.3 1.13q0.11 0.05 0.24 0.05h0.54q0-0.01 0-0.02c0.87-0.09 1.53-0.57 1.53-1.16 0-0.65-0.81-1.18-1.8-1.18z"
            />
          </g>
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex translate-x-2 flex-col items-center text-center">
          <div className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            <CountUp to={percentage} suffix={suffix} />
          </div>
          <p className="mt-1 text-lg font-semibold tracking-tight text-muted-foreground md:text-xl">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}