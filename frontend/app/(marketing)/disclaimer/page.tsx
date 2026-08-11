import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LegalToc from "@/components/LegalToc";

export const metadata: Metadata = {
  title: "Disclaimer · ORKA",
  description:
    "ORKA's disclaimer covering the informational nature of the product, digital assets, warranties, and limitations of liability.",
};

const sections = [
  {
    id: "informational",
    title: "Informational only",
    content: (
      <>
        <p>
          ORKA is a financial operating system for service businesses. Everything
          we publish — on this website, in documentation, in blog posts, or on
          social media — is provided for general informational purposes only.
          None of it is financial, investment, legal, or tax advice.
        </p>
        <p>
          Do not treat any ORKA marketing material, roadmap item, or community
          post as a recommendation to buy, sell, or hold any asset, or as a
          promise of any particular outcome for your business.
        </p>
      </>
    ),
  },
  {
    id: "product-status",
    title: "Product status",
    content: (
      <>
        <p>
          ORKA is production software that is continuously evolving. Features
          may change, be improved, or be retired as the product develops, and
          parts of the service may be updated without notice.
        </p>
        <p>
          Testnet environments, where used for development and experimentation,
          are separate from production: balances, transactions, or milestones
          shown on testnet are not real funds and may be reset or replaced
          without notice.
        </p>
      </>
    ),
  },
  {
    id: "digital-assets",
    title: "Digital asset risk",
    content: (
      <>
        <p>
          ORKA interacts with blockchain networks and digital assets. Such
          assets can be volatile, irreversible, and subject to technical
          failure, network congestion, or changes in protocol. You are solely
          responsible for understanding the technology and risks before using
          it.
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-orange">
          <li>Transactions on a blockchain are generally irreversible once confirmed.</li>
          <li>Loss of keys, seed phrases, or account access may result in permanent loss of assets.</li>
          <li>Regulatory environments for digital assets differ by jurisdiction and can change.</li>
        </ul>
      </>
    ),
  },
  {
    id: "no-warranty",
    title: "No warranty",
    content: (
      <>
        <p>
          ORKA is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          without warranties of any kind, whether express or implied, including
          implied warranties of merchantability, fitness for a particular
          purpose, or non-infringement.
        </p>
        <p>
          We do not warrant that the service will be uninterrupted, error-free,
          or secure, or that defects will be corrected. Any use of the service
          is at your own risk.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, ORKA and its
          founders, contributors, and affiliates will not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          for lost profits, data, business opportunity, or goodwill arising
          from your use of, or inability to use, the service.
        </p>
        <p>
          Where liability cannot be excluded, it will be limited to the amount
          you paid to ORKA for the service during the twelve months before the
          event giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services and links",
    content: (
      <>
        <p>
          ORKA may reference or link to third-party sites, tools, and services.
          We do not control them and are not responsible for their content,
          availability, or practices. Following such links is done at your own
          discretion and under the third party&apos;s own terms.
        </p>
        <p>
          Stellar, the Stellar Development Foundation, and other ecosystem
          participants are independent of ORKA and do not endorse or control
          this product.
        </p>
      </>
    ),
  },
  {
    id: "forward-looking",
    title: "Forward-looking statements",
    content: (
      <>
        <p>
          This website and related communications may contain forward-looking
          statements about planned features, milestones, launches, or growth.
          These are based on current expectations and are subject to significant
          risks and uncertainties. Actual results may differ materially.
        </p>
        <p>
          Roadmap timelines and targets are estimates, not commitments. We
          undertake no obligation to update any forward-looking statements.
        </p>
      </>
    ),
  },
  {
    id: "jurisdiction",
    title: "Jurisdiction and applicability",
    content: (
      <>
        <p>
          Access to and use of ORKA may be restricted or unsuitable in certain
          jurisdictions due to local laws or regulations. You are responsible
          for ensuring that your use of the service complies with the laws of
          your jurisdiction.
        </p>
        <p>
          If any part of this disclaimer is held to be invalid or unenforceable,
          the remaining parts will continue in full force and effect.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about this disclaimer? Visit our{" "}
        <Link
          href="/contact"
          className="font-semibold text-night underline decoration-orange decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
        >
          contact page
        </Link>{" "}
        and include &ldquo;Disclaimer&rdquo; in your message so it reaches the
        right team.
      </p>
    ),
  },
] as const;

export default function DisclaimerPage() {
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
          width={28}
          height={28}
          className="pointer-events-none absolute left-[6%] bottom-[24%] hidden w-6 object-contain opacity-50 sm:block float-3"
        />
        <Image
          src="/Elements/plus-lime.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className="pointer-events-none absolute right-[16%] bottom-[22%] hidden w-6 object-contain opacity-40 sm:block float-4"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-widest">Legal</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
          <h1 className="display mt-5 text-5xl uppercase sm:text-6xl md:text-7xl">Disclaimer</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            What ORKA is — and is not — so you can use the product with clear
            expectations.
          </p>
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.12em] text-orange">
            Effective: August 11, 2026
          </p>
        </div>
      </section>

      <main className="px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <aside className="border-l-4 border-orange bg-bone px-5 py-4 text-sm leading-6 text-night/80" aria-label="Important disclaimer notice">
            <span className="font-bold text-night">Important:</span> This disclaimer is a
            plain-language summary intended to help you understand the product. It is not
            legal advice and should be reviewed by qualified legal counsel.
          </aside>

          <div className="mt-12 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
            <LegalToc sections={sections} label="Disclaimer" />

            <article className="max-w-[70ch] min-w-0">
              {sections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-24 border-b border-night/15 py-9 first:pt-0 last:border-b-0 lg:scroll-mt-8"
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