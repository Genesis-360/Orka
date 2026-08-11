export default function AboutStats() {
  const stats = [
    { value: "50+", label: "Early Users", bg: "bg-violet", text: "text-white" },
    { value: "$120K+", label: "Value Locked (Testnet)", bg: "bg-teal", text: "text-night" },
    { value: "2.5K+", label: "Transactions", bg: "bg-orange", text: "text-white" },
    { value: "10+", label: "Integrations", bg: "bg-lime", text: "text-night" },
    { value: "2026", label: "Mainnet Vision", bg: "bg-coral", text: "text-white" },
  ];

  return (
    <section className="px-4 py-14 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-label text-violet">Orka in numbers</p>
          <h2 className="display mt-4 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Proof over{" "}
            <span className="text-violet">promises.</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map(({ value, label, bg, text }) => (
            <div
              key={label}
              className={`cut-corner rounded-[14px] p-5 shadow-hard transition-transform duration-300 hover:-translate-y-1 ${bg}`}
            >
              <p className={`display text-[34px] leading-none ${text}`}>
                {value}
              </p>
              <p className={`mt-2 text-[13px] font-bold uppercase tracking-wide leading-5 ${text}`}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}