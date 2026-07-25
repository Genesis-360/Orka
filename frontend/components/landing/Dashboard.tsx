"use client";

import {
  FileText,
  Shield,
  CheckCircle,
  Wallet,
  TrendingUp,
  Users,
  Clock,
  Activity,
} from "lucide-react";

const workflowSteps = [
  {
    icon: FileText,
    label: "AI Proposal",
    status: "Completed",
    color: "text-violet",
    bg: "bg-violet/10",
    time: "2 min ago",
  },
  {
    icon: FileText,
    label: "Smart Contract",
    status: "Signed",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    time: "15 min ago",
  },
  {
    icon: Shield,
    label: "Escrow Funded",
    status: "$12,400",
    color: "text-teal",
    bg: "bg-teal/10",
    time: "1 hour ago",
  },
  {
    icon: CheckCircle,
    label: "Milestone Approved",
    status: "Phase 2/4",
    color: "text-orange",
    bg: "bg-orange/10",
    time: "3 hours ago",
  },
  {
    icon: Wallet,
    label: "Payment Released",
    status: "$6,200",
    color: "text-lime",
    bg: "bg-lime/10",
    time: "Just now",
  },
];

const activity = [
  { label: "New proposal drafted", time: "2m ago", type: "proposal" },
  { label: "Contract signed by client", time: "15m ago", type: "contract" },
  { label: "Escrow funded — $12,400", time: "1h ago", type: "escrow" },
  { label: "Milestone #2 submitted", time: "2h ago", type: "milestone" },
  { label: "Invoice paid — $6,200", time: "3h ago", type: "payment" },
];

export default function Dashboard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D2440]/90 shadow-2xl shadow-violet/5 backdrop-blur-xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-xs text-white/40">app.orka.io</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-48 border-r border-white/5 p-4 lg:block">
          <div className="mb-6 text-xs font-bold uppercase tracking-wider text-white/30">
            Workspace
          </div>
          <nav className="flex flex-col gap-1">
            {[
              "Dashboard",
              "Projects",
              "Contracts",
              "Milestones",
              "Escrow",
              "Payments",
              "Invoices",
              "AI Assistant",
              "Analytics",
            ].map((item, i) => (
              <span
                key={item}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${
                  i === 0
                    ? "bg-violet/15 font-semibold text-white"
                    : "text-white/40 hover:bg-white/5 hover:text-white/70"
                }`}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* Main panel */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Top bar */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Dashboard</h2>
              <p className="text-xs text-white/40">
                Welcome back, Acme Agency
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                All Systems Go
              </span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              {
                label: "Active Projects",
                value: "12",
                change: "+2",
                icon: TrendingUp,
                color: "text-violet",
              },
              {
                label: "In Escrow",
                value: "$48.2k",
                change: "+$12.4k",
                icon: Shield,
                color: "text-teal",
              },
              {
                label: "Pending Approval",
                value: "3",
                change: "-1",
                icon: Clock,
                color: "text-orange",
              },
              {
                label: "Team Members",
                value: "8",
                change: "+1",
                icon: Users,
                color: "text-lime",
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-white/40">{kpi.label}</span>
                  <kpi.icon size={14} className={kpi.color} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">
                    {kpi.value}
                  </span>
                  <span className="text-xs font-medium text-green-400">
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow + Activity */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Workflow timeline */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Recent Activity
              </h3>
              <div className="flex flex-col gap-0">
                {workflowSteps.map((step, i) => (
                  <div key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`grid size-7 shrink-0 place-items-center rounded-full ${step.bg}`}
                      >
                        <step.icon size={12} className={step.color} />
                      </div>
                      {i < workflowSteps.length - 1 && (
                        <div className="my-1 w-px flex-1 bg-white/5" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {step.label}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${step.bg} ${step.color}`}
                        >
                          {step.status}
                        </span>
                      </div>
                      <span className="text-xs text-white/30">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/30">
                Live Feed
              </h3>
              <div className="flex flex-col gap-3">
                {activity.map((a) => (
                  <div
                    key={a.time}
                    className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5"
                  >
                    <Activity size={12} className="text-white/30" />
                    <span className="flex-1 text-sm text-white/60">
                      {a.label}
                    </span>
                    <span className="text-xs text-white/30">{a.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-violet/5 px-3 py-2.5">
                <span className="text-xs font-medium text-violet">
                  AI Prediction: Next milestone payout in ~2 days
                </span>
                <span className="text-xs text-white/20">99% confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
