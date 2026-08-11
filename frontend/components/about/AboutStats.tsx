export default function AboutStats() {
  const stats = [
    { value: "50+", label: "Early Users" },
    { value: "$120K+", label: "Value Locked (Testnet)" },
    { value: "2.5K+", label: "Transactions" },
    { value: "10+", label: "Integrations" },
    { value: "2026", label: "Mainnet Vision" },
  ];

  return (
    <section className="px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/50 bg-white shadow-sm">
        <div className="px-8 pt-8 pb-10 md:px-12">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
            Orka in Numbers
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center text-center ${
                  i < stats.length - 1
                    ? "border-r border-border/30 max-sm:border-r-0 max-sm:border-b max-sm:pb-6 max-sm:last:border-b-0 max-sm:last:pb-0 md:border-r md:last:border-r-0"
                    : ""
                }`}
              >
                <span className="display text-3xl text-night sm:text-4xl">
                  {value}
                </span>
                <span className="mt-1.5 text-xs text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
