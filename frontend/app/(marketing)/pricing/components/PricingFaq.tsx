import { Plus } from "lucide-react";

const pricingFaqs: [string, string][] = [
  [
    "Is the Starter plan really free?",
    "Yes — Starter is free forever. You get 1 workspace, up to 3 projects, and full on-chain escrow in USDC. No credit card required to sign up.",
  ],
  [
    "What fees are involved?",
    "ORKA charges no platform fees on escrow, proposals, or invoices. The only costs are nominal Stellar network fees for on-chain transactions (fractions of a cent).",
  ],
  [
    "How does billing work — monthly or yearly?",
    "Both. When you switch to Yearly you get 2 months free on Studio (billed annually at $290 instead of $348). You can switch or cancel anytime, and changes apply from your next cycle.",
  ],
  [
    "Can I pay with USDC?",
    "Yes — all funds move as USDC on Stellar. Clients fund escrow from their own wallets or via a client portal link; you withdraw to any Stellar wallet. There is no legacy banking rail required.",
  ],
  [
    "What happens after my Studio trial?",
    "You get a 30-day free trial of Studio on signup. If you don't upgrade, you keep the free Starter plan and your data stays intact — nothing is deleted.",
  ],
  [
    "Do you offer custom plans for agencies?",
    "Enterprise is designed for agencies with custom compliance, SSO, dedicated chain infrastructure, and white-glove onboarding. Talk to sales for a tailored quote.",
  ],
];

export default function PricingFaq() {
  return (
    <section id="faq" className="border-t border-border/60 px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="text-center lg:sticky lg:top-10 lg:self-start lg:text-left">
          <p className="section-label text-violet">FAQ</p>
          <h2 className="display mt-3 text-4xl uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Pricing questions, answered.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Everything you need to know about plans, billing, and on-chain
            escrow. Still unsure? Reach out — we answer fast.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block text-sm font-black uppercase tracking-wider text-violet underline-offset-4 transition-colors hover:text-night hover:underline"
          >
            Contact us →
          </a>
        </div>

        <div className="flex flex-col divide-y divide-border/60">
          {pricingFaqs.map(([question, answer]) => (
            <details key={question} className="group py-6 open:pb-8">
              <summary className="flex cursor-pointer items-start gap-4">
                <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-all duration-500 group-open:rotate-45 group-open:bg-violet">
                  <Plus
                    size={24}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                </span>
                <span className="display text-[22px] font-normal uppercase leading-7.5 text-foreground transition-colors duration-300 group-open:text-violet sm:text-[28px] sm:leading-9.75">
                  {question}
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-[18px] sm:leading-7">
                    {answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}