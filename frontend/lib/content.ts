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
  ["Is ORKA a marketplace?", "No. ORKA starts after the sale, helping agencies and freelancers operate projects, escrow, verification, payouts, and finance — not find clients."],
  ["Do users need crypto wallets?", "No. ORKA is designed as a Web2 product experience, using Stellar and Soroban under the hood. You never touch a blockchain directly."],
  ["Who is it for first?", "Mid-sized digital agencies, global freelancers, remote startups, and niche service marketplaces looking to automate back-office finance."],
  ["Is the product live?", "This landing page is for the early waitlist and design partners while the hackathon/pre-seed foundation is built. Sign up to get early access."],
  ["How is ORKA different from invoicing tools?", "Invoicing tools send a bill and hope. ORKA handles the full loop: proposal → escrow → milestone verification → payout → invoice → ledger. Everything is automatic, cross-currency, and audit-ready."],
  ["How does milestone verification work?", "You define milestones in a proposal. When work is submitted, the client reviews and approves. ORKA automatically releases escrowed funds to your account. No chasing payments."],
  ["What about fees and pricing?", "Pricing details are being finalized. We are designing for transparent, predictable fees — significantly lower than payment processors and cross-border wire fees."],
  ["Is my data secure?", "Yes. Data is encrypted at rest and in transit. We use Supabase for storage and Stellar for escrow. Smart contract logic is open-source and auditable."],
];

export const aboutFaqs: Faq[] = [
  ["Why did ORKA start?", "ORKA started from a simple frustration: managing projects and getting paid shouldn't require spreadsheets, scattered tools, and constant follow-ups. We wanted to make the financial side of service work feel as seamless as the work itself."],
  ["What does ORKA believe the future of service work looks like?", "We believe financial operations should become invisible — automated, transparent, and built directly into the way service businesses work."],
  ["Why is ORKA building on Stellar?", "Stellar gives us the infrastructure to build fast, low-cost, and borderless financial workflows that can work across markets."],
  ["What does \u201cfinancial operating system\u201d mean to ORKA?", "It means bringing the financial workflows around a project — from agreements and milestones to payments and settlement — into one connected system."],
  ["What are you building toward with ORKA?", "We're building toward a world where service businesses can manage their financial operations with far less manual work, regardless of where their clients are located."],
  ["What have you learned while building ORKA?", "That financial infrastructure has to be simple for the people using it. Powerful technology only matters when it removes complexity rather than adding to it."],
  ["What's next for ORKA?", "We're focused on expanding the product, improving automation, strengthening the infrastructure, and moving closer to our vision of a global financial operating system for service businesses."],
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
