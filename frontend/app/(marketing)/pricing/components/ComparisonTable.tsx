import { Check } from "lucide-react";

const comparisons = [
  ["Active workspaces", "1", "Unlimited", "Unlimited"],
  ["Projects", "Up to 3", "Unlimited", "Unlimited"],
  ["On-chain escrow (USDC)", "✓", "✓", "✓"],
  ["Client portal links", "✓", "✓", "✓"],
  ["Milestone automation", "—", "✓", "✓"],
  ["Proposals & invoices", "—", "✓", "✓"],
  ["Analytics dashboard", "—", "✓", "✓"],
  ["SSO & audit logs", "—", "—", "✓"],
  ["Dedicated chain infra", "—", "—", "✓"],
  ["White-glove onboarding", "—", "—", "✓"],
  ["Support", "Community", "Priority email", "Dedicated manager"],
];

const tierNames = ["Starter", "Studio", "Enterprise"];

export default function ComparisonTable() {
  return (
    <section className="px-4 pb-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="section-label text-center text-violet">Compare plans</p>
        <h2 className="display mt-3 text-center text-3xl uppercase text-night sm:text-4xl lg:text-5xl">
          Every plan, side by side.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          No asterisks, no fine print. What you see is what you get — on-chain
          and verifiable.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border-2 border-border bg-card transition-colors duration-500 hover:border-night/25">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Feature
                </th>
                {tierNames.map((name, i) => (
                  <th
                    key={name}
                    className={`px-5 py-4 text-center ${
                      i === 1 ? "bg-violet/5" : ""
                    }`}
                  >
                    <span className="display text-xl uppercase text-night">
                      {name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {comparisons.map(([feature, ...vals]) => (
                <tr
                  key={feature}
                  className="transition-colors duration-300 hover:bg-night/[0.02]"
                >
                  <td className="px-5 py-4 font-bold text-night/70">
                    {feature}
                  </td>
                  {vals.map((v, i) => {
                    const isCheck = v === "✓";
                    const isDash = v === "—";
                    return (
                      <td
                        key={i}
                        className={`px-5 py-4 text-center ${
                          i === 1 ? "bg-violet/[0.04]" : ""
                        }`}
                      >
                        {isCheck ? (
                          <span className="inline-flex items-center gap-1 text-teal">
                            <Check size={15} />
                          </span>
                        ) : isDash ? (
                          <span className="text-border">—</span>
                        ) : (
                          <span className="font-bold text-muted-foreground">
                            {v}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-right text-xs font-bold text-muted-foreground/50">
          * Contact sales for volume and enterprise pricing details.
        </p>
      </div>
    </section>
  );
}