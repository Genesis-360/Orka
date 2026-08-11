import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service · ORKA",
  description:
    "ORKA's plain-language product terms, covering accounts, workspaces, payments, third-party services, and acceptable use.",
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    content: (
      <>
        <p>
          By creating an ORKA account, creating or joining a workspace, or using
          our services, you agree to these Terms of Service and any policies
          referenced here. If you use ORKA on behalf of an organisation, you
          confirm that you have authority to accept these terms for that
          organisation.
        </p>
        <p>
          If you do not agree, please do not use the service. These terms apply
          to the ORKA website, workspace, client portal, and related features.
        </p>
      </>
    ),
  },
  {
    id: "accounts-workspaces",
    title: "Accounts and workspaces",
    content: (
      <>
        <p>
          Keep your account details accurate and your sign-in method secure. You
          are responsible for activity under your account and for the people you
          invite to a workspace.
        </p>
        <p>
          Workspace owners control access and should only grant permissions that
          are appropriate for the project. You must tell us promptly if you
          believe your account has been accessed without permission.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>Use ORKA lawfully and in a way that respects other people and systems.</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-orange">
          <li>Do not upload unlawful, deceptive, infringing, or harmful content.</li>
          <li>Do not attempt to bypass security, access another account, or disrupt the service.</li>
          <li>Do not use ORKA to facilitate fraud, money laundering, sanctions evasion, or other prohibited financial activity.</li>
          <li>Do not misrepresent project status, delivery evidence, payment status, or your authority to act for another party.</li>
        </ul>
      </>
    ),
  },
  {
    id: "clients-payments",
    title: "Client and payment responsibilities",
    content: (
      <>
        <p>
          Clients and service providers are responsible for the scope, pricing,
          deliverables, approvals, and disputes in their own projects. ORKA
          provides tools to record and manage those workflows; it does not become
          a party to the agreement between a client and a provider.
        </p>
        <p>
          Payment, escrow, currency conversion, or payout features may be subject
          to additional disclosures, verification requirements, limits, fees, and
          the terms of the providers that enable them. Only approve a payment or
          release when you have reviewed the relevant project information.
        </p>
      </>
    ),
  },
  {
    id: "blockchain-stellar",
    title: "Blockchain and Stellar network",
    content: (
      <>
        <p>
          ORKA uses the Stellar network to facilitate on-chain escrow, milestone
          verification, and payment settlements. Transactions on the Stellar
          network are public, irreversible once confirmed, and subject to network
          fees determined by the Stellar consensus protocol.
        </p>
        <p>
          You are responsible for selecting the correct network (testnet or
          mainnet), verifying transaction details before signing, and maintaining
          custody of your Stellar account keys, seed phrases, and any associated
          recovery mechanisms. ORKA cannot reverse, cancel, or modify a
          confirmed blockchain transaction.
        </p>
        <p>
          Smart contracts deployed by ORKA on the Stellar network are provided
          &ldquo;as is&rdquo; without warranty of merchantability or fitness for
          a particular purpose. Users should review contract source code
          independently before committing funds.
        </p>
      </>
    ),
  },
  {
    id: "ai-features",
    title: "AI-assisted features",
    content: (
      <>
        <p>
          ORKA may offer AI-assisted features — including suggestions for
          project descriptions, contract terms, scope breakdowns, and
          communications — to help you work more efficiently. These features are
          powered by third-party large language models and are provided as
          assistance only.
        </p>
        <p>
          AI-generated output may contain errors, omissions, or inaccuracies.
          You are solely responsible for reviewing, editing, and approving any
          AI-generated content before using it in a project, proposal, contract,
          invoice, or other professional context. Do not rely on AI output as
          legal, financial, tax, or investment advice.
        </p>
        <p>
          Prompts and context data submitted to AI features may be processed by
          third-party model providers. Do not submit sensitive personal
          information, trade secrets, or confidential data unless you are
          comfortable with such processing. ORKA does not use your workspace
          data to train or improve third-party models unless you explicitly opt in.
        </p>
      </>
    ),
  },
  {
    id: "third-parties-wallets",
    title: "Third-party services and wallets",
    content: (
      <>
        <p>
          ORKA may connect with third-party services, including payment providers,
          email providers, AI tools, and blockchain or wallet software. Those
          services are governed by their own terms and privacy practices.
        </p>
        <p>
          If you choose a self-custody wallet, you are responsible for your wallet,
          private keys, recovery phrase, network selections, and every transaction
          you approve. ORKA cannot recover a lost wallet or reverse an irreversible
          blockchain transaction.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          ORKA and its software, branding, and service materials are owned by
          ORKA or its licensors. We grant you a limited, non-exclusive,
          non-transferable right to use the service in accordance with these terms.
        </p>
        <p>
          You retain rights in the content you submit to ORKA. You give us the
          permission needed to host, process, and display that content only to
          provide, secure, and improve the service.
        </p>
      </>
    ),
  },
  {
    id: "availability-disclaimers",
    title: "Availability and disclaimers",
    content: (
      <>
        <p>
          We work to keep ORKA reliable, but the service may change, be interrupted,
          or contain errors. Features may be added, changed, paused, or removed as
          we develop the product.
        </p>
        <p>
          ORKA is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          basis to the extent permitted by applicable law. AI-generated suggestions
          are assistance, not professional, financial, legal, tax, or investment
          advice. Review important work, agreements, and payment decisions
          independently.
        </p>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, ORKA will not be
          liable for indirect, incidental, special, consequential, or punitive
          damages, or for lost profits, data, business opportunity, or goodwill
          arising from use of the service.
        </p>
        <p>
          Where liability cannot be excluded, it will be limited to the amount you
          paid to ORKA for the service during the twelve months before the event
          giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>
          You may stop using ORKA at any time. We may suspend or end access if we
          reasonably believe these terms have been violated, the service is being
          used unlawfully, or doing so is necessary to protect users, the service,
          or third parties.
        </p>
        <p>
          After termination, provisions that should reasonably continue—such as
          intellectual property, disclaimers, and limits of liability—will remain
          in effect.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <>
        <p>
          We may update these terms as ORKA evolves. If a change is material, we
          will take reasonable steps to provide notice through the service or by
          another appropriate method. Continued use after the updated effective
          date means you accept the revised terms.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about these terms? Visit our{" "}
        <Link
          href="/contact"
          className="font-semibold text-night underline decoration-orange decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
        >
          contact page
        </Link>{" "}
        and include &ldquo;Terms&rdquo; in your message so it reaches the right team.
      </p>
    ),
  },
] as const;

export default function TermsPage() {
  return (
    <div className="bg-paper overflow-hidden">
      <section className="relative overflow-hidden rounded-b-[42px] bg-night px-4 pb-12 pt-12 text-white md:rounded-b-[72px] md:px-8 md:pb-16 md:pt-16 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />

        <Image
          src="/Elements/star-blue.svg"
          alt=""
          aria-hidden
          width={40}
          height={40}
          className="pointer-events-none absolute right-[14%] top-[20%] hidden w-8 object-contain opacity-60 md:block lg:w-10 float-1"
        />
        <Image
          src="/Elements/plus-teal.svg"
          alt=""
          aria-hidden
          width={36}
          height={36}
          className="pointer-events-none absolute left-[10%] top-[32%] hidden w-7 object-contain opacity-50 md:block lg:w-9 float-2"
        />
        <Image
          src="/Elements/asterisk-orange.svg"
          alt=""
          aria-hidden
          width={30}
          height={30}
          className="pointer-events-none absolute right-[8%] top-[52%] hidden w-6 object-contain opacity-50 lg:block float-5"
        />
        <Image
          src="/Elements/star-violet.svg"
          alt=""
          aria-hidden
          width={32}
          height={32}
          className="pointer-events-none absolute left-[6%] bottom-[25%] hidden w-7 object-contain opacity-40 sm:block float-4"
        />
        <Image
          src="/Elements/plus-lime.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className="pointer-events-none absolute right-[16%] bottom-[22%] hidden w-6 object-contain opacity-40 sm:block float-3"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-widest">Legal</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
          <h1 className="display mt-5 text-5xl uppercase sm:text-6xl md:text-7xl">Terms of service</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            These terms explain the ground rules for using ORKA&apos;s workspace,
            project, and payment-related services.
          </p>
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.12em] text-orange">
            Effective: July 22, 2026
          </p>
        </div>
      </section>

      <main className="px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <aside className="border-l-4 border-orange bg-bone px-5 py-4 text-sm leading-6 text-night/80" aria-label="Important legal notice">
            <span className="font-bold text-night">Important:</span> This is a clear
            product terms template and should be reviewed by qualified legal counsel
            before ORKA&apos;s production launch. It is not jurisdiction-specific legal advice.
          </aside>

          <div className="mt-12 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="Terms contents" className="min-w-0 lg:border-b-0 lg:pb-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">On this page</p>
              <ol className="mt-4 flex gap-x-5 gap-y-2 overflow-x-auto pb-4 lg:block lg:space-y-1">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-baseline gap-2 whitespace-nowrap py-1 text-sm leading-5 text-night/70 transition-colors hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet lg:whitespace-normal"
                    >
                      <span className="font-mono text-xs text-violet">{String(index + 1).padStart(2, "0")}</span>
                      <span className="group-hover:underline group-hover:decoration-orange group-hover:decoration-2 group-hover:underline-offset-4">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="max-w-[70ch] min-w-0">
              {sections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-8 border-b border-night/15 py-9 first:pt-0 last:border-b-0"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm font-bold text-violet">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="display text-3xl uppercase sm:text-4xl">{section.title}</h2>
                  </div>
                  <div className="mt-5 space-y-4 text-base leading-8 text-night/78">
                    {section.content}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
