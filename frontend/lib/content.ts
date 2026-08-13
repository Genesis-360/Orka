export type Engine = {
  title: string;
  copy: string;
  color: string;
};

export type FlowActor = "Client" | "Freelancer" | "ORKA AI" | "Stellar";

export type MethodStep = {
  number: string;
  title: string;
  summary: string;
  phases?: string[][];
  flow: { actor: FlowActor; text: string }[];
  traditional: string;
  orka: string;
};

export type Faq = [string, string];

export const engines: Engine[] = [
  {
    title: "Agreement Engine",
    copy: "AI turns rough client briefs into scoped proposals, contracts, pricing, and fundable milestones.",
    color: "bg-orange",
  },
  {
    title: "Escrow & Settlement",
    copy: "Soroban smart contracts lock client funds and release them only when milestone conditions are met.",
    color: "bg-violet",
  },
  {
    title: "Verification Engine",
    copy: "AI checks GitHub, Figma, content, links, and delivery evidence before triggering payment release.",
    color: "bg-coral",
  },
  {
    title: "Email & Payouts",
    copy: "Automated invoices, multi-currency records, tax categories, and back-office reporting workflows.",
    color: "bg-violet",
  },
  {
    title: "Financial Ledger",
    copy: "Every transaction tracked, categorized, and ready for reporting — no spreadsheets needed.",
    color: "bg-teal",
  },
  {
    title: "Analytics & Reporting",
    copy: "Real-time dashboards for project health, cash flow, and team performance across borders.",
    color: "bg-night",
  },
];

export const steps: MethodStep[] = [
  {
    number: "01",
    title: "Proposal is generated",
    summary:
      "The service brief becomes a clear scope, timeline, agreement, and milestone schedule — ready for the client to approve.",
    phases: [
      ["Scope", "Timeline", "Agreement"],
      ["Milestones", "Pricing", "Deliverables"],
      ["Review", "Approve", "Sign"],
    ],
    flow: [
      {
        actor: "Freelancer",
        text: "Paste the client's rough brief or email into ORKA — no template required.",
      },
      {
        actor: "ORKA AI",
        text: "Drafts a scoped proposal, pricing, and fundable milestones in seconds.",
      },
      {
        actor: "Client",
        text: "Reviews, edits if needed, and approves from one link — no document ping-pong.",
      },
      {
        actor: "ORKA AI",
        text: "Generates a signed agreement and locks the milestone schedule.",
      },
    ],
    traditional:
      "You write the proposal in docs, chase approvals over email, price by gut, and hope the scope is clear. Weeks of back-and-forth before any work starts.",
    orka: "One brief in, a polished proposal and contract out in minutes. The client approves from a link, and scope, price, and milestones are agreed and locked.",
  },
  {
    number: "02",
    title: "Escrow is funded",
    summary:
      "Clients pay in a familiar checkout while ORKA handles the Stellar escrow infrastructure underneath.",
    flow: [
      {
        actor: "Client",
        text: "Pays by card or bank transfer in a normal checkout — no wallet, no crypto.",
      },
      {
        actor: "ORKA AI",
        text: "Locks the funds in a Soroban smart-contract escrow on Stellar.",
      },
      {
        actor: "Freelancer",
        text: "Sees a 'Funded' status and can start work with full confidence.",
      },
      {
        actor: "Stellar",
        text: "Holds the funds securely — nothing moves until the milestone rules are met.",
      },
    ],
    traditional:
      "You request a deposit over an invoice, trust the client to pay, or start work unpaid and hope. Chargebacks and non-payment are constant risks.",
    orka: "Money is locked the moment the client checks out. You start work knowing funds are secured on-chain and released only by rules — not by trust.",
  },
  {
    number: "03",
    title: "Work is verified",
    summary:
      "AI reviews the delivery evidence against each milestone and gives the client a clean, itemized review trail.",
    flow: [
      {
        actor: "Freelancer",
        text: "Connect GitHub or Figma, or drop links and files as milestones complete.",
      },
      {
        actor: "ORKA AI",
        text: "Checks the evidence against the agreed milestones automatically.",
      },
      {
        actor: "Client",
        text: "Gets a clear, itemized verification report and approves in one tap.",
      },
      {
        actor: "ORKA AI",
        text: "Records an immutable trail of what was delivered and approved.",
      },
    ],
    traditional:
      "You email 'done', the client goes silent, and you wait to get paid. Proof of work is scattered across a dozen tools.",
    orka: "Every delivery is checked against its milestone and shown to the client as clean evidence. Approval is one tap and the trail is automatic.",
  },
  {
    number: "04",
    title: "Payouts execute",
    summary:
      "Funds release, currency routes, invoices send, and the ledger updates — without a spreadsheet in sight.",
    flow: [
      {
        actor: "Stellar",
        text: "Releases escrow funds the instant the milestone is approved.",
      },
      {
        actor: "ORKA AI",
        text: "Routes the right currency to the freelancer — low-cost and cross-border.",
      },
      {
        actor: "ORKA AI",
        text: "Sends the invoice and writes the transaction to the ledger.",
      },
      {
        actor: "Freelancer",
        text: "Gets paid and receives a clean record — no manual bookkeeping.",
      },
    ],
    traditional:
      "You send an invoice, wait 30–60 days, reconcile payments across currencies in a spreadsheet, and do your own accounting.",
    orka: "Funds land the moment work is approved. Invoices and ledger entries are written for you, in every currency, automatically.",
  },
];

export const faqs: Faq[] = [
  ["Is ORKA officially live?", "Yes. ORKA is officially launched and production-ready for agencies and freelancers. Proposals, escrow, milestone verification, and payouts run on Stellar with open-source smart contracts — sign up and take your first engagement fully on-chain today."],
  ["Is ORKA a marketplace?", "No. ORKA starts after the sale, helping agencies and freelancers operate projects, escrow, verification, payouts, and finance — not find clients. It replaces the back-office glue that invoicing tools and spreadsheets can't: proposal, escrow, verification, payout, and ledger in one connected loop."],
  ["Do users need crypto wallets?", "No. ORKA is designed as a Web2 product experience, using Stellar and Soroban under the hood. You never touch a blockchain directly — funds move as USDC on Stellar in the background, so you pay and get paid in familiar terms."],
  ["Who is it for first?", "Digital agencies, global freelancers, and remote teams running milestone-based engagements — anyone tired of chasing payments across currencies and tools. 50+ agencies and freelancers already run escrow and payouts on ORKA."],
  ["How is ORKA different from invoicing tools?", "Invoicing tools send a bill and hope. ORKA handles the full loop: proposal → escrow → milestone verification → payout → invoice → ledger. Everything is automatic, cross-currency, and audit-ready."],
  ["How does milestone verification work?", "You define milestones in a proposal. When work is submitted, the client reviews it in a secure portal link and approves in one tap. ORKA automatically releases the escrowed funds to your account — no chasing payments."],
  ["What about fees and pricing?", "ORKA charges no platform fees on escrow, proposals, or invoices. Starter is free forever (1 workspace, up to 3 projects, on-chain USDC escrow). Studio is $29/month, or $290/year (2 months free). Enterprise is custom. The only costs are nominal Stellar network fees — fractions of a cent."],
  ["Is my data secure?", "Yes. Data is encrypted at rest and in transit and stored on Supabase, while escrow runs on open-source Stellar/Soroban smart contracts that anyone can audit. No one but you and your client can release or re-route funds."],
];

export const aboutFaqs: Faq[] = [
  ["Why did ORKA start?", "ORKA started from a simple frustration: managing projects and getting paid shouldn't require spreadsheets, scattered tools, and constant follow-ups. We wanted to make the financial side of service work feel as seamless as the work itself — and every release is tested with agencies running real engagements."],
  ["What does ORKA believe the future of service work looks like?", "We believe financial operations should become invisible — automated, transparent, and built directly into the way service businesses work. Today that means escrow, verification, and payouts in one loop."],
  ["Why is ORKA building on Stellar?", "Stellar gives us the infrastructure to build fast, low-cost, and borderless financial workflows that can work across markets — settlement in seconds, network fees in fractions of a cent, and USDC moving across 180+ countries."],
  ["What does \u201cfinancial operating system\u201d mean to ORKA?", "It means bringing the financial workflows around a project — from agreements and milestones to payments and settlement — into one connected system, with an open audit trail instead of a patchwork of tools."],
  ["What are you building toward with ORKA?", "A product that lets service businesses run their entire financial side automatically — milestones, escrow, payouts, invoices — no matter where their clients are."],
  ["What have you learned while building ORKA?", "That financial infrastructure has to be simple for the people using it. Powerful technology only matters when it removes complexity rather than adding to it — so every feature ships with feedback from agencies running real engagements on ORKA."],
  ["What's next for ORKA?", "Expanding milestone-escrow automation and verification, adding more automations, and opening onboarding to every agency and freelancer — starting with the free Starter plan."],
];

export const productLinks = [
  { label: "Engines", href: "/#engines" },
  { label: "Method", href: "/#method" },
  { label: "FAQ", href: "/#faq" },
];

export const resourcesLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];
