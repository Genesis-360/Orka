import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LegalToc from "@/components/LegalToc";

export const metadata: Metadata = {
  title: "Privacy Policy · ORKA",
  description:
    "ORKA's privacy policy, covering how we collect, use, and protect your information.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We collect information you provide when creating an account, setting up
          a workspace, or using ORKA features. This includes your name, email
          address, organisation name, workspace content, project information, and
          payment details.
        </p>
        <p>
          We also collect information automatically, such as browser type, device
          information, IP address, pages visited, and how you interact with the
          service. This helps us improve ORKA and keep it secure.
        </p>
        <p>
          When you use AI-assisted features, prompts and context data you submit
          may be collected and transmitted to third-party model providers. We
          minimise data shared to what is necessary for the specific request and
          do not use your workspace data to train or improve third-party models
          unless you explicitly opt in.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-teal">
          <li>Provide, operate, and maintain the ORKA service and workspace features.</li>
          <li>Process payments, escrow transactions, and related financial operations.</li>
          <li>Send service-related communications, such as payment confirmations, project updates, and security alerts.</li>
          <li>Respond to your support requests and questions.</li>
          <li>Improve and develop the product through analytics and usage patterns.</li>
          <li>Detect and prevent fraud, abuse, or unauthorised access.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "Data sharing and third parties",
    content: (
      <>
        <p>
          We do not sell your personal information to third parties. We may share
          your data with:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-teal">
          <li>Service providers who help us operate ORKA (hosting, payments, email, analytics).</li>
          <li>Workspace collaborators and clients you invite, as necessary for project operations.</li>
          <li>Third-party AI model providers, only for the purpose of generating responses to your explicit requests.</li>
          <li>Legal or regulatory authorities when required by applicable law or to protect rights.</li>
        </ul>
        <p>
          ORKA may connect with third-party services including payment providers,
          AI tools, and blockchain networks. Those services have their own privacy
          practices that you should review separately.
        </p>
        <p>
          Transactions on the Stellar network are public and recorded on a
          decentralised ledger. Information such as wallet addresses, transaction
          amounts, and memo data may be visible to anyone who inspects the
          network. ORKA does not control the Stellar network or any other
          blockchain you choose to use.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data security and retention",
    content: (
      <>
        <p>
          We implement reasonable technical and organisational measures to protect
          your data against unauthorised access, loss, or alteration. This includes
          encryption in transit and at rest, access controls, and regular security
          reviews.
        </p>
        <p>
          We retain your information for as long as your account is active or as
          needed to provide the service. When you delete your account, we will
          remove or anonymise your data within a reasonable period, unless legal
          obligations require us to keep certain records.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>
          Depending on your jurisdiction, you may have the right to access,
          correct, delete, or port your personal data. You may also have the right
          to restrict or object to certain processing activities.
        </p>
        <p>
          To exercise these rights, please contact us through our{" "}
          <Link
            href="/contact"
            className="font-semibold text-night underline decoration-orange decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            contact page
          </Link>{" "}
          with &ldquo;Privacy Request&rdquo; in your message. We will respond
          within the timeframe required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          ORKA uses cookies and similar technologies to authenticate sessions,
          remember preferences, and understand how the service is used. We use
          both session cookies (which expire when you close your browser) and
          persistent cookies (which remain for a set period or until deleted).
        </p>
        <p>
          We also use analytics cookies to understand aggregate usage patterns
          and improve the product. These are set by our analytics provider and
          do not identify you individually.
        </p>
        <p>
          You can control cookie settings through your browser preferences.
          Most browsers allow you to block or delete all cookies, or to receive
          a warning before a cookie is stored. Blocking certain cookies may
          affect the functionality of the service, particularly authentication
          and workspace features.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <>
        <p>
          We may update this privacy policy as ORKA evolves or as legal
          requirements change. If a change is material, we will provide notice
          through the service or by another appropriate method.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about this privacy policy or how we handle your data? Visit our{" "}
        <Link
          href="/contact"
          className="font-semibold text-night underline decoration-orange decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
        >
          contact page
        </Link>{" "}
        and include &ldquo;Privacy&rdquo; in your message so it reaches the right team.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="bg-paper overflow-hidden">
      <section className="relative overflow-hidden rounded-b-[42px] bg-night px-4 pb-12 pt-12 text-white md:rounded-b-[72px] md:px-8 md:pb-16 md:pt-16 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-60 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />

        <Image
          src="/Elements/star-violet.svg"
          alt=""
          aria-hidden
          width={40}
          height={40}
          className="pointer-events-none absolute right-[12%] top-[22%] hidden w-8 object-contain opacity-60 md:block lg:w-10 float-1"
        />
        <Image
          src="/Elements/plus-teal.svg"
          alt=""
          aria-hidden
          width={36}
          height={36}
          className="pointer-events-none absolute left-[10%] top-[30%] hidden w-7 object-contain opacity-50 md:block lg:w-9 float-2"
        />
        <Image
          src="/Elements/asterisk-orange.svg"
          alt=""
          aria-hidden
          width={30}
          height={30}
          className="pointer-events-none absolute right-[18%] top-[50%] hidden w-6 object-contain opacity-50 lg:block float-5"
        />
        <Image
          src="/Elements/plus-lime.svg"
          alt=""
          aria-hidden
          width={32}
          height={32}
          className="pointer-events-none absolute left-[6%] bottom-[28%] hidden w-7 object-contain opacity-40 sm:block float-4"
        />
        <Image
          src="/Elements/star-blue.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className="pointer-events-none absolute right-[8%] bottom-[22%] hidden w-6 object-contain opacity-40 sm:block float-3"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-widest">Legal</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
          <h1 className="display mt-5 text-5xl uppercase sm:text-6xl md:text-7xl">Privacy policy</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            How ORKA collects, uses, and protects your personal information.
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
            product privacy policy and should be reviewed by qualified legal counsel.
            It is not jurisdiction-specific legal advice.
          </aside>

          <div className="mt-12 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
            <LegalToc sections={sections} label="Privacy policy" />

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
