"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle2, ChevronRight, Circle, CircleCheck } from "lucide-react";
import { useRef } from "react";
import { CountUp } from "@/components/bento3-tile1";

const ease = [0.22, 1, 0.36, 1] as const;

function useInViewRef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return { ref, inView };
}

const kanban: { col: string; items: { title: string; meta: string; state?: string }[] }[] = [
  {
    col: "Backlog",
    items: [
      { title: "Brand refresh", meta: "2 tasks" },
      { title: "API docs v2", meta: "4 tasks" },
    ],
  },
  {
    col: "In progress",
    items: [{ title: "Escrow v2", meta: "3 of 5", state: "active" }],
  },
  {
    col: "Done",
    items: [
      { title: "Onboarding", meta: "5 tasks" },
      { title: "Payouts", meta: "3 tasks" },
    ],
  },
];

export function ProjectVisual() {
  const { ref, inView } = useInViewRef();

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-2.5 overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "72%" } : { width: "0%" }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="h-full rounded-full bg-chart-1"
          />
        </div>
        <span className="text-xs font-semibold tracking-tight text-foreground">
          <CountUp to={72} suffix="%" />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {kanban.map((column, ci) => (
          <div key={column.col} className="flex flex-col gap-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {column.col}
            </p>
            {column.items.map((item, ii) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: 0.35 + ci * 0.12 + ii * 0.08, ease }}
                className={`rounded-md border px-2 py-1.5 ${
                  item.state === "active"
                    ? "border-chart-1/30 bg-chart-1/10"
                    : "border-border/60 bg-muted/60"
                }`}
              >
                <p className="truncate text-[11px] font-medium tracking-tight text-foreground">
                  {item.title}
                </p>
                <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  {item.state === "active" ? (
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-chart-1 opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-chart-1" />
                    </span>
                  ) : (
                    <span className="size-1.5 rounded-full bg-muted-foreground/30" />
                  )}
                  {item.meta}
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const chat: { side: "in" | "out"; text: string }[] = [
  { side: "in", text: "Can we see milestone 2 progress?" },
  { side: "out", text: "Marked complete — payout released." },
  { side: "in", text: "Amazing, thank you!" },
];

export function PortalVisual() {
  const { ref, inView } = useInViewRef();

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          nova.orkafreelance.work
        </p>
        <span className="flex items-center gap-1.5 rounded-full border border-chart-3/30 bg-chart-3/10 px-2 py-0.5 text-[10px] font-semibold text-chart-3">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-chart-3 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-chart-3" />
          </span>
          Live
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {chat.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease }}
            className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[11px] font-medium tracking-tight ${
              message.side === "in"
                ? "self-start rounded-bl-sm border border-border/60 bg-muted/70 text-foreground"
                : "self-end rounded-br-sm border border-chart-1/25 bg-chart-1/10 text-foreground"
            }`}
          >
            {message.text}
          </motion.div>
        ))}
      </div>

      <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <CheckCircle2 size={11} className="text-chart-3" />
        Milestone updates streamed in real time — no back-and-forth emails.
      </p>
    </div>
  );
}

const terminal = [
  { prompt: "orka escrow deploy --milestone 2", ok: null },
  { prompt: null, ok: "Contract deployed on Soroban" },
  { prompt: "orka release --project nova", ok: null },
  { prompt: null, ok: "2,450 XLM released — tx a7f3…c1" },
];

export function ContractsVisual() {
  const { ref, inView } = useInViewRef();

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center overflow-hidden rounded-xl border border-border/60 bg-[#0b1c2e] shadow-inner"
    >
      <div className="flex w-full flex-col gap-1.5 px-4 py-3">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-chart-4/80" />
          <span className="size-2 rounded-full bg-chart-1/80" />
          <span className="size-2 rounded-full bg-chart-2/80" />
          <span className="ml-2 text-[10px] font-medium text-white/40">
            soroban · orka_escrow
          </span>
        </div>
        {terminal.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.22, ease }}
            className="flex items-center gap-2 font-mono text-[11px] tracking-tight"
          >
            {line.prompt !== null ? (
              <>
                <span className="shrink-0 text-chart-1">$</span>
                <span className="truncate text-white/85">{line.prompt}</span>
                {i === 0 && (
                  <motion.span
                    animate={inView ? { opacity: [1, 0, 1] } : { opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 1.4 }}
                    className="h-3.5 w-2 bg-chart-2/80"
                  />
                )}
              </>
            ) : (
              <>
                <ChevronRight size={11} className="shrink-0 text-chart-3" />
                <span className="truncate text-chart-3/90">{line.ok}</span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const invoice = [
  { item: "Design sprint", amount: 1200 },
  { item: "Dev milestone 2", amount: 2450, paid: true },
  { item: "Platform scoping", amount: 550 },
];

export function InvoicingVisual() {
  const { ref, inView } = useInViewRef();

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-1.5">
      {invoice.map((row, i) => (
        <motion.div
          key={row.item}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.15, ease }}
          className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/60 px-3 py-1.5"
        >
          <div className="flex items-center gap-2">
            {row.paid ? (
              <CircleCheck size={13} className="text-chart-3" />
            ) : (
              <Circle size={13} className="text-muted-foreground/40" />
            )}
            <p className="text-[11px] font-medium tracking-tight text-foreground">{row.item}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-semibold tracking-tight text-foreground">
              ${row.amount.toLocaleString()}
            </p>
            {row.paid && (
              <span className="rounded-full bg-chart-3/15 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-chart-3">
                Paid
              </span>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.75, ease }}
        className="flex items-center justify-between px-1 pt-1"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Total billed
        </p>
        <p className="text-sm font-bold tracking-tight text-foreground">
          <CountUp to={4200} prefix="$" />
        </p>
      </motion.div>
    </div>
  );
}

const bars = [34, 48, 40, 62, 56, 78, 100];

export function AnalyticsVisual() {
  const { ref, inView } = useInViewRef();

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Revenue · last 7 months
          </p>
          <p className="text-xl font-bold tracking-tight text-foreground">
            <CountUp to={128} prefix="$" suffix="k" />
            <span className="ml-2 rounded-full bg-chart-3/15 px-1.5 py-px text-[10px] font-bold text-chart-3">
              +34% YoY
            </span>
          </p>
        </div>
      </div>

      <div className="flex h-20 items-end gap-1.5">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease }}
            style={{ height: `${height}%`, transformOrigin: "bottom" }}
            className={`flex-1 rounded-t-md ${
              i === bars.length - 1 ? "bg-chart-1" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}